/**
 * Multi-Source Risk Assessment Engine
 * 
 * Combines multiple factors to calculate overall risk:
 * - AI confidence score
 * - Weather conditions
 * - Location/historical data
 * - Crop stage vulnerability
 * - Disease severity
 */

export function calculateRiskScore(factors) {
  const {
    aiConfidence,
    severity,
    humidity,
    temperature,
    cropStage,
    historicalCases = 0,
    nearbyActiveCases = 0
  } = factors;

  let riskScore = 0;
  const weights = {
    aiConfidence: 0.25,
    severity: 0.25,
    weather: 0.20,
    historical: 0.15,
    nearby: 0.15
  };

  // AI Confidence Factor (inverse - lower confidence = higher risk)
  const confidenceFactor = 1 - (aiConfidence / 100);
  riskScore += confidenceFactor * 100 * weights.aiConfidence;

  // Severity Factor
  const severityScores = {
    'Low': 20,
    'Moderate': 50,
    'High': 75,
    'Critical': 95
  };
  riskScore += severityScores[severity] * weights.severity;

  // Weather Factor (high humidity = high risk for fungal diseases)
  let weatherRisk = 0;
  if (humidity > 80) weatherRisk = 90;
  else if (humidity > 70) weatherRisk = 60;
  else if (humidity > 60) weatherRisk = 30;
  else weatherRisk = 10;

  // Temperature factor
  if (temperature > 30 && temperature < 35) weatherRisk += 10;
  riskScore += weatherRisk * weights.weather;

  // Historical Factor
  const historicalRisk = Math.min(historicalCases * 5, 100);
  riskScore += historicalRisk * weights.historical;

  // Nearby Cases Factor
  const nearbyRisk = Math.min(nearbyActiveCases * 10, 100);
  riskScore += nearbyRisk * weights.nearby;

  // Crop Stage Vulnerability
  const vulnerableStages = ['Flowering', 'Fruiting'];
  if (vulnerableStages.includes(cropStage)) {
    riskScore += 10;
  }

  // Normalize to 0-100
  riskScore = Math.min(Math.max(riskScore, 0), 100);

  // Determine risk level
  let riskLevel;
  if (riskScore >= 75) riskLevel = 'Critical';
  else if (riskScore >= 60) riskLevel = 'High';
  else if (riskScore >= 40) riskLevel = 'Medium';
  else riskLevel = 'Low';

  // Build explanation
  const explanation = buildRiskExplanation({
    aiConfidence,
    severity,
    humidity,
    temperature,
    historicalCases,
    nearbyActiveCases,
    cropStage,
    riskLevel
  });

  return {
    risk_score: Math.round(riskScore),
    risk_level: riskLevel,
    factors: {
      ai_confidence_factor: Math.round(confidenceFactor * 100),
      weather_factor: Math.round(weatherRisk),
      location_factor: Math.round((historicalRisk + nearbyRisk) / 2),
      severity_factor: severityScores[severity]
    },
    explanation,
    recommended_actions: getRecommendedActions(riskLevel, severity)
  };
}

function buildRiskExplanation(data) {
  const reasons = [];

  if (data.aiConfidence < 70) {
    reasons.push({
      factor: 'AI Confidence',
      description: `Low AI confidence (${data.aiConfidence}%) increases uncertainty`,
      impact: 'high'
    });
  }

  if (data.humidity > 80) {
    reasons.push({
      factor: 'Weather Conditions',
      description: `High humidity (${data.humidity}%) favorable for disease spread`,
      impact: 'high'
    });
  }

  if (data.severity === 'Critical' || data.severity === 'High') {
    reasons.push({
      factor: 'Disease Severity',
      description: `${data.severity} severity level detected`,
      impact: 'high'
    });
  }

  if (data.nearbyActiveCases > 5) {
    reasons.push({
      factor: 'Regional Outbreak',
      description: `${data.nearbyActiveCases} active cases in nearby area`,
      impact: 'medium'
    });
  }

  if (data.historicalCases > 10) {
    reasons.push({
      factor: 'Historical Pattern',
      description: `Known hotspot area for this disease`,
      impact: 'medium'
    });
  }

  if (data.cropStage === 'Flowering' || data.cropStage === 'Fruiting') {
    reasons.push({
      factor: 'Crop Stage',
      description: `${data.cropStage} stage is particularly vulnerable`,
      impact: 'medium'
    });
  }

  return reasons;
}

function getRecommendedActions(riskLevel, severity) {
  const actions = {
    'Critical': [
      'Immediate intervention required',
      'Apply recommended treatment within 24 hours',
      'Isolate affected plants if possible',
      'Contact local agriculture office',
      'Monitor daily for spread'
    ],
    'High': [
      'Apply preventive measures immediately',
      'Follow expert advisory guidance',
      'Monitor affected area twice daily',
      'Prepare for potential treatment'
    ],
    'Medium': [
      'Regular monitoring recommended',
      'Follow preventive measures',
      'Maintain field hygiene',
      'Check weather forecast'
    ],
    'Low': [
      'Continue regular monitoring',
      'Maintain preventive practices',
      'Keep field clean and well-ventilated'
    ]
  };

  return actions[riskLevel] || actions['Medium'];
}
