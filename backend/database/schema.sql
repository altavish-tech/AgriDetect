-- AgriDetect Database Schema

-- Users table (authentication)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    role TEXT NOT NULL CHECK(role IN ('farmer', 'expert', 'officer')),
    name TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Farmers table (extended profile)
CREATE TABLE IF NOT EXISTS farmers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    farm_id TEXT,
    farm_size REAL,
    primary_crops TEXT,
    latitude REAL,
    longitude REAL,
    district TEXT,
    state TEXT,
    language_preference TEXT DEFAULT 'en',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Experts table (extended profile)
CREATE TABLE IF NOT EXISTS experts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    specialization TEXT,
    qualification TEXT,
    experience_years INTEGER,
    certification TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Officers table (extended profile)
CREATE TABLE IF NOT EXISTS officers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    department TEXT,
    jurisdiction TEXT,
    district TEXT,
    state TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Crop reports (main disease/pest reports)
CREATE TABLE IF NOT EXISTS crop_reports (
    id TEXT PRIMARY KEY,
    farmer_id INTEGER NOT NULL,
    crop_type TEXT NOT NULL,
    crop_stage TEXT NOT NULL,
    scientific_name TEXT,
    location_name TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    sector TEXT,
    image_url TEXT NOT NULL,
    voice_note_url TEXT,
    description TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'analyzing', 'analyzed', 'pending_expert', 'verified', 'resolved')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id)
);

-- AI predictions
CREATE TABLE IF NOT EXISTS ai_predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id TEXT NOT NULL,
    primary_diagnosis TEXT NOT NULL,
    primary_confidence REAL NOT NULL,
    alternative_diagnosis TEXT,
    alternative_confidence REAL,
    severity TEXT CHECK(severity IN ('Low', 'Moderate', 'High', 'Critical')),
    symptoms TEXT,
    lesion_data TEXT, -- JSON array of detected lesions
    processing_time_ms INTEGER,
    model_version TEXT DEFAULT 'mock-v1',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES crop_reports(id)
);

-- Environmental data (for risk assessment)
CREATE TABLE IF NOT EXISTS environmental_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id TEXT NOT NULL,
    humidity REAL,
    humidity_status TEXT,
    temperature REAL,
    temperature_status TEXT,
    soil_moisture TEXT,
    soil_moisture_status TEXT,
    weather_conditions TEXT,
    rainfall_24h REAL,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES crop_reports(id)
);

-- Risk assessment
CREATE TABLE IF NOT EXISTS risk_assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id TEXT NOT NULL,
    risk_score REAL NOT NULL,
    risk_level TEXT NOT NULL CHECK(risk_level IN ('Low', 'Medium', 'High', 'Critical')),
    ai_confidence_factor REAL,
    weather_factor REAL,
    location_factor REAL,
    historical_factor REAL,
    severity_factor REAL,
    factors_explanation TEXT, -- JSON
    recommended_actions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES crop_reports(id)
);

-- Expert verifications
CREATE TABLE IF NOT EXISTS expert_verifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id TEXT NOT NULL,
    expert_id INTEGER NOT NULL,
    ai_diagnosis TEXT,
    ai_confidence REAL,
    expert_diagnosis TEXT NOT NULL,
    expert_comments TEXT,
    verification_status TEXT DEFAULT 'verified' CHECK(verification_status IN ('verified', 'corrected', 'needs_more_info')),
    confidence_level TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES crop_reports(id),
    FOREIGN KEY (expert_id) REFERENCES experts(id)
);

-- Advisories (treatment recommendations)
CREATE TABLE IF NOT EXISTS advisories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id TEXT NOT NULL,
    disease_pest TEXT NOT NULL,
    immediate_actions TEXT NOT NULL,
    prevention_tips TEXT,
    ipm_guidance TEXT,
    treatment_guidance TEXT,
    warnings TEXT,
    language TEXT DEFAULT 'en',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES crop_reports(id)
);

-- Follow-up reports (progress monitoring)
CREATE TABLE IF NOT EXISTS followup_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_report_id TEXT NOT NULL,
    farmer_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    notes TEXT,
    progress_status TEXT CHECK(progress_status IN ('improving', 'no_change', 'spreading', 'resolved')),
    recovery_percentage REAL,
    ai_comparison_result TEXT, -- JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (original_report_id) REFERENCES crop_reports(id),
    FOREIGN KEY (farmer_id) REFERENCES farmers(id)
);

-- Hotspots (geographic disease clusters)
CREATE TABLE IF NOT EXISTS hotspots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    disease_pest TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    sector TEXT NOT NULL,
    district TEXT,
    cases_count INTEGER DEFAULT 1,
    severity_level TEXT CHECK(severity_level IN ('Low', 'Medium', 'High', 'Critical')),
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'monitoring', 'resolved')),
    first_detected DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Early warnings (officer alerts)
CREATE TABLE IF NOT EXISTS early_warnings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    officer_id INTEGER,
    alert_level TEXT NOT NULL CHECK(alert_level IN ('CRITICAL', 'WARNING', 'INFO')),
    title TEXT NOT NULL,
    sector TEXT NOT NULL,
    district TEXT,
    cases_count TEXT,
    description TEXT NOT NULL,
    action_type TEXT,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'broadcast', 'resolved')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (officer_id) REFERENCES officers(id)
);

-- Broadcast history (SMS/notification logs)
CREATE TABLE IF NOT EXISTS broadcast_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    officer_id INTEGER NOT NULL,
    alert_id INTEGER,
    sector TEXT NOT NULL,
    message TEXT NOT NULL,
    recipients_count INTEGER DEFAULT 0,
    broadcast_type TEXT CHECK(broadcast_type IN ('sms', 'email', 'app_notification')),
    status TEXT DEFAULT 'sent' CHECK(status IN ('pending', 'sent', 'failed')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (officer_id) REFERENCES officers(id),
    FOREIGN KEY (alert_id) REFERENCES early_warnings(id)
);

-- Disease history (for risk assessment and trends)
CREATE TABLE IF NOT EXISTS disease_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    disease_pest TEXT NOT NULL,
    crop_type TEXT NOT NULL,
    location TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    severity TEXT,
    cases_count INTEGER DEFAULT 1,
    recorded_date DATE NOT NULL,
    season TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_crop_reports_farmer ON crop_reports(farmer_id);
CREATE INDEX IF NOT EXISTS idx_crop_reports_status ON crop_reports(status);
CREATE INDEX IF NOT EXISTS idx_crop_reports_location ON crop_reports(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_crop_reports_created ON crop_reports(created_at);

CREATE INDEX IF NOT EXISTS idx_ai_predictions_report ON ai_predictions(report_id);
CREATE INDEX IF NOT EXISTS idx_expert_verifications_report ON expert_verifications(report_id);
CREATE INDEX IF NOT EXISTS idx_expert_verifications_expert ON expert_verifications(expert_id);

CREATE INDEX IF NOT EXISTS idx_hotspots_location ON hotspots(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_hotspots_status ON hotspots(status);

CREATE INDEX IF NOT EXISTS idx_early_warnings_status ON early_warnings(status);
CREATE INDEX IF NOT EXISTS idx_followup_reports_original ON followup_reports(original_report_id);
