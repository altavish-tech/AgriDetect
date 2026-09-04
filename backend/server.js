import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { initializeDatabase, seedDemoData } from './database/init.js';
import { analyzeImage, compareImages } from './services/aiService.js';
import { calculateRiskScore } from './services/riskEngine.js';
import { generateAdvisory } from './services/advisoryService.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
let db;
(async () => {
  try {
    db = await initializeDatabase();
    seedDemoData(db);
    
    // Start server after database is initialized
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(60));
      console.log('🌾 AgriDetect Backend Server');
      console.log('='.repeat(60));
      console.log(`✅ Server running on: http://localhost:${PORT}`);
      console.log(`✅ API endpoint: http://localhost:${PORT}/api`);
      console.log(`✅ Database: ${process.env.DB_PATH || './database/agridetect.db'}`);
      console.log(`✅ Frontend: ${process.env.FRONTEND_URL || 'http://localhost:3001'}`);
      console.log('='.repeat(60) + '\n');
      console.log('📡 Available API Endpoints:');
      console.log('  GET    /api/health');
      console.log('  GET    /api/cases');
      console.log('  GET    /api/cases/:id');
      console.log('  POST   /api/cases');
      console.log('  PUT    /api/cases/:id/verify');
      console.log('  GET    /api/advisory/:caseId');
      console.log('  POST   /api/followup');
      console.log('  GET    /api/alerts');
      console.log('  POST   /api/alerts/broadcast');
      console.log('  GET    /api/hotspots');
      console.log('  GET    /api/analytics/dashboard');
      console.log('='.repeat(60) + '\n');
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
})();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'crop-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpeg, jpg, png) are allowed'));
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

// ============================================================================
// API ROUTES
// ============================================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: db ? 'connected' : 'disconnected'
  });
});

// ============================================================================
// CASES ROUTES
// ============================================================================

/**
 * GET /api/cases
 * Get all cases with optional filters
 */
app.get('/api/cases', (req, res) => {
  try {
    const { status, role, farmer_id } = req.query;
    
    let query = `
      SELECT 
        cr.*,
        ai.primary_diagnosis as ai_diagnosis,
        ai.primary_confidence as ai_confidence,
        ai.alternative_diagnosis as ai_alternative_diagnosis,
        ai.alternative_confidence as ai_alternative_confidence,
        ai.severity,
        ai.symptoms,
        ai.lesion_data,
        env.humidity,
        env.humidity_status,
        env.temperature,
        env.temperature_status,
        env.soil_moisture,
        env.soil_moisture_status,
        risk.risk_score,
        risk.risk_level,
        f.farm_id as farmer_name,
        ev.expert_diagnosis,
        ev.expert_comments,
        ev.verification_status
      FROM crop_reports cr
      LEFT JOIN ai_predictions ai ON cr.id = ai.report_id
      LEFT JOIN environmental_data env ON cr.id = env.report_id
      LEFT JOIN risk_assessments risk ON cr.id = risk.report_id
      LEFT JOIN farmers f ON cr.farmer_id = f.id
      LEFT JOIN expert_verifications ev ON cr.id = ev.report_id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (status) {
      query += ' AND cr.status = ?';
      params.push(status);
    }
    
    if (role === 'expert') {
      query += ' AND (cr.status = ? OR cr.status = ?)';
      params.push('pending_expert', 'verified');
    }
    
    if (farmer_id) {
      query += ' AND cr.farmer_id = ?';
      params.push(farmer_id);
    }
    
    query += ' ORDER BY cr.created_at DESC';
    
    const cases = db.prepare(query).all(...params);
    
    // Parse JSON fields
    cases.forEach(c => {
      if (c.lesion_data) {
        try {
          c.lesions = JSON.parse(c.lesion_data);
        } catch (e) {
          c.lesions = [];
        }
      }
      
      // Format environmental data
      c.environmentalData = {
        humidity: c.humidity + '%',
        humidityStatus: c.humidity_status,
        temperature: c.temperature + '°C',
        temperatureStatus: c.temperature_status,
        soilMoisture: c.soil_moisture,
        soilMoistureStatus: c.soil_moisture_status
      };
    });
    
    res.json(cases);
  } catch (error) {
    console.error('Error fetching cases:', error);
    res.status(500).json({ error: 'Failed to fetch cases' });
  }
});

/**
 * GET /api/cases/:id
 * Get single case by ID
 */
app.get('/api/cases/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const caseData = db.prepare(`
      SELECT 
        cr.*,
        ai.primary_diagnosis as ai_diagnosis,
        ai.primary_confidence as ai_confidence,
        ai.alternative_diagnosis as ai_alternative_diagnosis,
        ai.alternative_confidence as ai_alternative_confidence,
        ai.severity,
        ai.symptoms,
        ai.lesion_data,
        env.humidity,
        env.humidity_status,
        env.temperature,
        env.temperature_status,
        env.soil_moisture,
        env.soil_moisture_status,
        risk.risk_score,
        risk.risk_level,
        risk.factors_explanation,
        ev.expert_diagnosis,
        ev.expert_comments
      FROM crop_reports cr
      LEFT JOIN ai_predictions ai ON cr.id = ai.report_id
      LEFT JOIN environmental_data env ON cr.id = env.report_id
      LEFT JOIN risk_assessments risk ON cr.id = risk.report_id
      LEFT JOIN expert_verifications ev ON cr.id = ev.report_id
      WHERE cr.id = ?
    `).get(id);
    
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }
    
    // Parse JSON fields
    if (caseData.lesion_data) {
      try {
        caseData.lesions = JSON.parse(caseData.lesion_data);
      } catch (e) {
        caseData.lesions = [];
      }
    }
    
    caseData.environmentalData = {
      humidity: caseData.humidity + '%',
      humidityStatus: caseData.humidity_status,
      temperature: caseData.temperature + '°C',
      temperatureStatus: caseData.temperature_status,
      soilMoisture: caseData.soil_moisture,
      soilMoistureStatus: caseData.soil_moisture_status
    };
    
    res.json(caseData);
  } catch (error) {
    console.error('Error fetching case:', error);
    res.status(500).json({ error: 'Failed to fetch case' });
  }
});

/**
 * POST /api/cases
 * Create new case with AI analysis
 */
app.post('/api/cases', upload.single('image'), async (req, res) => {
  try {
    const { crop, cropStage, location, latitude, longitude, sector, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
    
    // Generate case ID
    const caseId = 'AD-' + Date.now().toString().slice(-6) + '-' + crop.charAt(0);
    
    // Image URL (served from /uploads)
    const imageUrl = `/uploads/${req.file.filename}`;
    
    // Insert crop report
    db.prepare(`
      INSERT INTO crop_reports (id, farmer_id, crop_type, crop_stage, location_name, latitude, longitude, sector, image_url, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      caseId,
      1, // Default farmer_id for demo
      crop,
      cropStage,
      location,
      latitude || 26.2196,
      longitude || 84.3567,
      sector || 'Siwan District',
      imageUrl,
      description || null,
      'analyzing'
    );
    
    // Perform AI analysis
    const aiResult = await analyzeImage(req.file.buffer, {
      crop,
      cropStage,
      location
    });
    
    // Store AI prediction
    db.prepare(`
      INSERT INTO ai_predictions (report_id, primary_diagnosis, primary_confidence, alternative_diagnosis, alternative_confidence, severity, symptoms, lesion_data, processing_time_ms, model_version)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      caseId,
      aiResult.primary_diagnosis,
      aiResult.primary_confidence,
      aiResult.alternative_diagnosis,
      aiResult.alternative_confidence,
      aiResult.severity,
      aiResult.symptoms,
      JSON.stringify(aiResult.lesions),
      aiResult.processing_time_ms,
      aiResult.model_version
    );
    
    // Mock environmental data
    const envData = {
      humidity: 75 + Math.random() * 15,
      temperature: 28 + Math.random() * 8,
      soilMoisture: ['LOW', 'ADEQUATE', 'HIGH'][Math.floor(Math.random() * 3)]
    };
    
    db.prepare(`
      INSERT INTO environmental_data (report_id, humidity, humidity_status, temperature, temperature_status, soil_moisture, soil_moisture_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      caseId,
      envData.humidity,
      envData.humidity > 80 ? 'High Risk' : envData.humidity > 70 ? 'Moderate' : 'Normal',
      envData.temperature,
      envData.temperature > 32 ? 'High' : envData.temperature < 20 ? 'Low' : 'Optimal',
      envData.soilMoisture,
      envData.soilMoisture === 'LOW' ? 'Low Risk' : 'Optimal'
    );
    
    // Calculate risk score
    const riskResult = calculateRiskScore({
      aiConfidence: aiResult.primary_confidence,
      severity: aiResult.severity,
      humidity: envData.humidity,
      temperature: envData.temperature,
      cropStage,
      historicalCases: 5,
      nearbyActiveCases: 3
    });
    
    db.prepare(`
      INSERT INTO risk_assessments (report_id, risk_score, risk_level, ai_confidence_factor, weather_factor, location_factor, factors_explanation, recommended_actions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      caseId,
      riskResult.risk_score,
      riskResult.risk_level,
      riskResult.factors.ai_confidence_factor / 100,
      riskResult.factors.weather_factor / 100,
      riskResult.factors.location_factor / 100,
      JSON.stringify(riskResult.explanation),
      riskResult.recommended_actions.join('\n')
    );
    
    // Generate advisory
    const advisory = generateAdvisory(
      aiResult.primary_diagnosis,
      crop,
      aiResult.severity
    );
    
    db.prepare(`
      INSERT INTO advisories (report_id, disease_pest, immediate_actions, prevention_tips, ipm_guidance, treatment_guidance, warnings, language)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      caseId,
      advisory.disease_pest,
      advisory.immediate_actions,
      advisory.prevention,
      advisory.ipm_guidance,
      advisory.treatment_guidance,
      advisory.warnings,
      advisory.language
    );
    
    // Determine final status
    const finalStatus = aiResult.primary_confidence < 70 ? 'pending_expert' : 'analyzed';
    
    db.prepare('UPDATE crop_reports SET status = ? WHERE id = ?').run(finalStatus, caseId);
    
    // Return complete case data
    res.status(201).json({
      id: caseId,
      status: finalStatus,
      aiResult,
      riskResult,
      advisory,
      imageUrl,
      needsExpertVerification: finalStatus === 'pending_expert'
    });
    
  } catch (error) {
    console.error('Error creating case:', error);
    res.status(500).json({ error: 'Failed to create case: ' + error.message });
  }
});

/**
 * PUT /api/cases/:id/verify
 * Expert verification of a case
 */
app.put('/api/cases/:id/verify', (req, res) => {
  try {
    const { id } = req.params;
    const { expertDiagnosis, expertComments, expertId = 1 } = req.body;
    
    // Get AI prediction
    const aiPrediction = db.prepare('SELECT primary_diagnosis, primary_confidence FROM ai_predictions WHERE report_id = ?').get(id);
    
    // Insert expert verification
    db.prepare(`
      INSERT INTO expert_verifications (report_id, expert_id, ai_diagnosis, ai_confidence, expert_diagnosis, expert_comments, verification_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      expertId,
      aiPrediction?.primary_diagnosis,
      aiPrediction?.primary_confidence,
      expertDiagnosis,
      expertComments,
      'verified'
    );
    
    // Update case status
    db.prepare('UPDATE crop_reports SET status = ? WHERE id = ?').run('verified', id);
    
    // If diagnosis changed, regenerate advisory
    if (expertDiagnosis !== aiPrediction?.primary_diagnosis) {
      const caseData = db.prepare('SELECT crop_type, ai.severity FROM crop_reports cr LEFT JOIN ai_predictions ai ON cr.id = ai.report_id WHERE cr.id = ?').get(id);
      
      const advisory = generateAdvisory(
        expertDiagnosis,
        caseData.crop_type,
        caseData.severity
      );
      
      db.prepare(`
        UPDATE advisories 
        SET disease_pest = ?, immediate_actions = ?, prevention_tips = ?, ipm_guidance = ?, treatment_guidance = ?, warnings = ?
        WHERE report_id = ?
      `).run(
        advisory.disease_pest,
        advisory.immediate_actions,
        advisory.prevention,
        advisory.ipm_guidance,
        advisory.treatment_guidance,
        advisory.warnings,
        id
      );
    }
    
    res.json({
      success: true,
      message: 'Case verified successfully',
      caseId: id,
      expertDiagnosis
    });
    
  } catch (error) {
    console.error('Error verifying case:', error);
    res.status(500).json({ error: 'Failed to verify case' });
  }
});

// ============================================================================
// ADVISORY ROUTES
// ============================================================================

/**
 * GET /api/advisory/:caseId
 * Get advisory for a case
 */
app.get('/api/advisory/:caseId', (req, res) => {
  try {
    const { caseId } = req.params;
    
    const advisory = db.prepare('SELECT * FROM advisories WHERE report_id = ?').get(caseId);
    
    if (!advisory) {
      return res.status(404).json({ error: 'Advisory not found' });
    }
    
    res.json(advisory);
  } catch (error) {
    console.error('Error fetching advisory:', error);
    res.status(500).json({ error: 'Failed to fetch advisory' });
  }
});

// ============================================================================
// FOLLOW-UP ROUTES
// ============================================================================

/**
 * POST /api/followup
 * Submit follow-up photo for progress monitoring
 */
app.post('/api/followup', upload.single('image'), async (req, res) => {
  try {
    const { originalReportId, notes, farmerId = 1 } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    
    // Get original case
    const originalCase = db.prepare('SELECT image_url FROM crop_reports WHERE id = ?').get(originalReportId);
    
    if (!originalCase) {
      return res.status(404).json({ error: 'Original case not found' });
    }
    
    // Compare images
    const comparisonResult = await compareImages(originalCase.image_url, req.file.buffer);
    
    // Insert follow-up report
    db.prepare(`
      INSERT INTO followup_reports (original_report_id, farmer_id, image_url, notes, progress_status, recovery_percentage, ai_comparison_result)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      originalReportId,
      farmerId,
      imageUrl,
      notes,
      comparisonResult.progress_status,
      comparisonResult.recovery_percentage,
      JSON.stringify(comparisonResult.comparison_details)
    );
    
    res.status(201).json({
      success: true,
      imageUrl,
      comparisonResult
    });
    
  } catch (error) {
    console.error('Error creating follow-up:', error);
    res.status(500).json({ error: 'Failed to create follow-up' });
  }
});

// ============================================================================
// ALERTS & WARNINGS ROUTES
// ============================================================================

/**
 * GET /api/alerts
 * Get all early warnings
 */
app.get('/api/alerts', (req, res) => {
  try {
    const alerts = db.prepare(`
      SELECT * FROM early_warnings 
      WHERE status = 'active' 
      ORDER BY 
        CASE alert_level 
          WHEN 'CRITICAL' THEN 1 
          WHEN 'WARNING' THEN 2 
          ELSE 3 
        END,
        created_at DESC
    `).all();
    
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

/**
 * POST /api/alerts/broadcast
 * Broadcast alert to farmers
 */
app.post('/api/alerts/broadcast', (req, res) => {
  try {
    const { sector, message, officerId = 1, alertId } = req.body;
    
    // In production, this would trigger SMS/email notifications
    // For now, just log to broadcast history
    
    db.prepare(`
      INSERT INTO broadcast_history (officer_id, alert_id, sector, message, recipients_count, broadcast_type, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      officerId,
      alertId || null,
      sector,
      message,
      50, // Mock recipient count
      'app_notification',
      'sent'
    );
    
    res.json({
      success: true,
      message: 'Alert broadcast successfully',
      sector,
      recipients: 50
    });
    
  } catch (error) {
    console.error('Error broadcasting alert:', error);
    res.status(500).json({ error: 'Failed to broadcast alert' });
  }
});

// ============================================================================
// HOTSPOTS ROUTES
// ============================================================================

/**
 * GET /api/hotspots
 * Get active disease hotspots
 */
app.get('/api/hotspots', (req, res) => {
  try {
    const hotspots = db.prepare(`
      SELECT * FROM hotspots 
      WHERE status = 'active' 
      ORDER BY severity_level DESC, cases_count DESC
    `).all();
    
    res.json(hotspots);
  } catch (error) {
    console.error('Error fetching hotspots:', error);
    res.status(500).json({ error: 'Failed to fetch hotspots' });
  }
});

// ============================================================================
// ANALYTICS ROUTES
// ============================================================================

/**
 * GET /api/analytics/dashboard
 * Get dashboard statistics
 */
app.get('/api/analytics/dashboard', (req, res) => {
  try {
    const stats = {
      totalReports: db.prepare('SELECT COUNT(*) as count FROM crop_reports').get().count,
      pendingExpert: db.prepare("SELECT COUNT(*) as count FROM crop_reports WHERE status = 'pending_expert'").get().count,
      verified: db.prepare("SELECT COUNT(*) as count FROM crop_reports WHERE status = 'verified'").get().count,
      activeHotspots: db.prepare("SELECT COUNT(*) as count FROM hotspots WHERE status = 'active'").get().count,
      criticalAlerts: db.prepare("SELECT COUNT(*) as count FROM early_warnings WHERE alert_level = 'CRITICAL' AND status = 'active'").get().count,
      
      // Disease distribution
      diseaseDistribution: db.prepare(`
        SELECT primary_diagnosis, COUNT(*) as count 
        FROM ai_predictions 
        GROUP BY primary_diagnosis 
        ORDER BY count DESC 
        LIMIT 5
      `).all(),
      
      // Severity distribution
      severityDistribution: db.prepare(`
        SELECT severity, COUNT(*) as count 
        FROM ai_predictions 
        GROUP BY severity
      `).all()
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: err.message || 'Internal server error'
  });
});

// ============================================================================
// SERVER STARTUP IS HANDLED IN DATABASE INITIALIZATION BLOCK ABOVE
// ============================================================================

export default app;
