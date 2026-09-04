import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.env.DB_PATH || './database/agridetect.db';
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

let SQL;
let db;

export async function initializeDatabase() {
  // Initialize SQL.js
  SQL = await initSqlJs();
  
  // Ensure database directory exists
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Load existing database or create new one
  let buffer;
  if (fs.existsSync(DB_PATH)) {
    buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  
  // Read and execute schema
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(schema);
  
  // Save database to file
  saveDatabase();
  
  console.log('✅ Database initialized successfully');
  
  return createDbWrapper(db);
}

// Save database to file
function saveDatabase() {
  if (db) {
    const data = db.export();
    fs.writeFileSync(DB_PATH, data);
  }
}

// Create wrapper to make sql.js API compatible with better-sqlite3
function createDbWrapper(sqlDb) {
  return {
    prepare: (query) => {
      return {
        run: (...params) => {
          const stmt = sqlDb.prepare(query);
          stmt.bind(params);
          stmt.step();
          const lastInsertRowid = sqlDb.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] || 0;
          stmt.free();
          saveDatabase(); // Persist changes
          return { lastInsertRowid, changes: 1 };
        },
        get: (...params) => {
          const stmt = sqlDb.prepare(query);
          stmt.bind(params);
          const result = stmt.step() ? stmt.getAsObject() : null;
          stmt.free();
          return result;
        },
        all: (...params) => {
          const stmt = sqlDb.prepare(query);
          stmt.bind(params);
          const results = [];
          while (stmt.step()) {
            results.push(stmt.getAsObject());
          }
          stmt.free();
          return results;
        }
      };
    },
    exec: (query) => {
      sqlDb.exec(query);
      saveDatabase();
    },
    pragma: (pragma) => {
      // sql.js doesn't support pragmas in the same way, but we can ignore them
      console.log(`Note: pragma "${pragma}" not applicable to sql.js`);
    }
  };
}

export function seedDemoData(db) {
  // Check if data already exists
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (userCount.count > 0) {
    console.log('📊 Demo data already exists, skipping seed');
    return;
  }

  console.log('🌱 Seeding demo data...');

  try {
    // Insert demo users
    const insertUser = db.prepare(`
      INSERT INTO users (email, role, name, phone, location)
      VALUES (?, ?, ?, ?, ?)
    `);

    // Farmer
    const farmer = insertUser.run(
      'ramesh.patel@farmer.com',
      'farmer',
      'Ramesh Patel',
      '+91-9876543210',
      'Siwan, Bihar'
    );

    // Expert
    const expert = insertUser.run(
      'dr.ramesh@expert.com',
      'expert',
      'Dr. Ramesh Kumar',
      '+91-9876543211',
      'Bihar Agricultural University'
    );

    // Officer
    const officer = insertUser.run(
      'admin@dao.bihar.gov.in',
      'officer',
      'Regional Admin',
      '+91-9876543212',
      'Siwan District'
    );

    // Insert farmer profile
    db.prepare(`
      INSERT INTO farmers (user_id, farm_id, farm_size, primary_crops, latitude, longitude, district, state, language_preference)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      farmer.lastInsertRowid,
      'BR-8921',
      5.5,
      'Tomato, Wheat, Rice',
      26.2196,
      84.3567,
      'Siwan',
      'Bihar',
      'hi'
    );

    // Insert expert profile
    db.prepare(`
      INSERT INTO experts (user_id, specialization, qualification, experience_years, certification)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      expert.lastInsertRowid,
      'Plant Pathology',
      'PhD in Agricultural Sciences',
      15,
      'ICAR Certified Expert'
    );

    // Insert officer profile
    db.prepare(`
      INSERT INTO officers (user_id, department, jurisdiction, district, state)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      officer.lastInsertRowid,
      'Department of Agriculture',
      'Siwan District',
      'Siwan',
      'Bihar'
    );

    // Insert sample crop reports
    const sampleReports = [
      {
        id: 'AD-7829-T',
        crop: 'Tomato',
        stage: 'Flowering',
        diagnosis: 'Early Blight',
        confidence: 58,
        severity: 'High',
        status: 'pending_expert'
      },
      {
        id: 'CA-8924',
        crop: 'Wheat',
        stage: 'Vegetative',
        diagnosis: 'Stem Rust',
        confidence: 94,
        severity: 'Critical',
        status: 'verified'
      },
      {
        id: 'CA-8925',
        crop: 'Maize',
        stage: 'Vegetative',
        diagnosis: 'Fall Armyworm',
        confidence: 88,
        severity: 'Critical',
        status: 'pending_expert'
      },
      {
        id: 'CA-8928',
        crop: 'Tomato',
        stage: 'Flowering',
        diagnosis: 'Early Blight',
        confidence: 65,
        severity: 'High',
        status: 'pending_expert'
      }
    ];

    const insertReport = db.prepare(`
      INSERT INTO crop_reports (id, farmer_id, crop_type, crop_stage, location_name, latitude, longitude, sector, image_url, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertAI = db.prepare(`
      INSERT INTO ai_predictions (report_id, primary_diagnosis, primary_confidence, severity)
      VALUES (?, ?, ?, ?)
    `);

    const insertEnv = db.prepare(`
      INSERT INTO environmental_data (report_id, humidity, humidity_status, temperature, temperature_status, soil_moisture, soil_moisture_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertRisk = db.prepare(`
      INSERT INTO risk_assessments (report_id, risk_score, risk_level, ai_confidence_factor, weather_factor, recommended_actions)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    sampleReports.forEach(report => {
      insertReport.run(
        report.id,
        1, // farmer_id
        report.crop,
        report.stage,
        'Siwan, Bihar',
        26.2196,
        84.3567,
        'Siwan District, Sector 4',
        'https://placehold.co/800x600/e74c3c/white?text=' + report.diagnosis.replace(' ', '+'),
        report.status
      );

      insertAI.run(
        report.id,
        report.diagnosis,
        report.confidence,
        report.severity
      );

      insertEnv.run(
        report.id,
        85,
        'High Risk',
        32,
        'Optimal',
        'LOW',
        'Low Risk'
      );

      const riskScore = report.confidence < 70 ? 84 : 45;
      const riskLevel = riskScore > 70 ? 'High' : riskScore > 50 ? 'Medium' : 'Low';

      insertRisk.run(
        report.id,
        riskScore,
        riskLevel,
        report.confidence / 100,
        0.85,
        'Apply preventive measures immediately'
      );
    });

    // Insert early warnings
    const insertWarning = db.prepare(`
      INSERT INTO early_warnings (officer_id, alert_level, title, sector, district, cases_count, description, action_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertWarning.run(
      1,
      'CRITICAL',
      'Fall Armyworm Outbreak',
      'North Valley Sector',
      'Siwan',
      '50+ new reports in last 24h',
      'Rapid spread detected in North Valley Sector. Immediate intervention required.',
      'broadcast'
    );

    insertWarning.run(
      1,
      'CRITICAL',
      'Tomato Late Blight Outbreak',
      'Village A Sector',
      'Siwan',
      '24 cases / 48h',
      'High humidity accelerating spore dispersion. Immediate intervention required.',
      'broadcast'
    );

    // Insert hotspots
    const insertHotspot = db.prepare(`
      INSERT INTO hotspots (disease_pest, latitude, longitude, sector, district, cases_count, severity_level, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertHotspot.run(
      'Fall Armyworm',
      26.25,
      84.40,
      'North Valley Sector',
      'Siwan',
      52,
      'Critical',
      'active'
    );

    insertHotspot.run(
      'Early Blight',
      26.18,
      84.30,
      'Village A Sector',
      'Siwan',
      24,
      'High',
      'active'
    );

    console.log('✅ Demo data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    throw error;
  }
}
