/**
 * Advisory Generation Service
 * Generates treatment recommendations based on diagnosis
 */

const ADVISORY_DATABASE = {
  'Early Blight': {
    immediate_actions: [
      'Remove and destroy severely affected leaves',
      'Maintain strict field hygiene',
      'Sanitize tools after pruning'
    ],
    prevention: [
      'Maintain adequate plant spacing (60 cm) for air circulation',
      'Monitor nearby plants twice weekly',
      'Avoid overhead irrigation during evenings'
    ],
    ipm: [
      'Use Trichoderma harzianum as biological control',
      'Apply neem-based organic sprays',
      'Introduce beneficial microorganisms'
    ],
    treatment: [
      'Apply Mancozeb 75% WP @ 2.5g per liter of water',
      'Spray during dry hours (morning preferred)',
      'Repeat application every 7-10 days',
      'Consult local agricultural extension office for approved products'
    ],
    warnings: [
      'Do not overhead irrigate during evenings',
      'Extended leaf wetness accelerates fungal spore germination',
      'Avoid working in wet fields to prevent spread'
    ]
  },
  'Late Blight': {
    immediate_actions: [
      'Remove all infected plants immediately',
      'Burn or bury infected material away from field',
      'Apply emergency treatment within 24 hours'
    ],
    prevention: [
      'Use resistant varieties when replanting',
      'Ensure proper drainage',
      'Monitor weather for high humidity periods'
    ],
    ipm: [
      'Copper-based organic fungicides',
      'Biological agents: Bacillus subtilis',
      'Crop rotation with non-host crops'
    ],
    treatment: [
      'Apply systemic fungicide (Metalaxyl + Mancozeb)',
      'Emergency treatment: 3 sprays at 5-day intervals',
      'Cover both upper and lower leaf surfaces'
    ],
    warnings: [
      'Extremely contagious - act immediately',
      'Can destroy entire crop within 7-10 days',
      'Notify neighboring farmers'
    ]
  },
  'Stem Rust': {
    immediate_actions: [
      'Scout all wheat fields immediately',
      'Remove volunteer wheat plants',
      'Apply fungicide if rust pustules visible'
    ],
    prevention: [
      'Plant rust-resistant varieties',
      'Adjust planting date to avoid peak rust season',
      'Maintain balanced fertilization'
    ],
    ipm: [
      'Monitor disease development stages',
      'Use weather-based forecasting',
      'Regional coordination for control'
    ],
    treatment: [
      'Apply Propiconazole @ 1ml per liter',
      'Or Tebuconazole @ 1ml per liter',
      'Apply at first sign of infection',
      'Repeat if new pustules appear'
    ],
    warnings: [
      'Can spread rapidly over large areas',
      'Wind-borne spores can travel long distances',
      'Critical during flowering stage'
    ]
  },
  'Fall Armyworm': {
    immediate_actions: [
      'Scout fields daily for egg masses and larvae',
      'Hand-pick and destroy larvae where feasible',
      'Apply biological control agents immediately'
    ],
    prevention: [
      'Deep plowing after harvest',
      'Plant early to avoid peak infestation',
      'Intercrop with non-host plants',
      'Install pheromone traps'
    ],
    ipm: [
      'Release Trichogramma wasps (egg parasitoids)',
      'Use Bacillus thuringiensis (Bt) based bioinsecticides',
      'Apply neem-based products',
      'Encourage natural predators (birds, beetles)'
    ],
    treatment: [
      'Apply Chlorantraniliprole @ 0.4ml per liter',
      'Or Emamectin benzoate @ 0.4g per liter',
      'Spray in evening hours when larvae are active',
      'Target whorl and leaf axils'
    ],
    warnings: [
      'Highly mobile pest - can migrate rapidly',
      'Multiple generations per season',
      'Develops resistance quickly - rotate insecticides'
    ]
  },
  'Septoria Leaf Spot': {
    immediate_actions: [
      'Remove lower infected leaves',
      'Improve air circulation',
      'Reduce leaf wetness duration'
    ],
    prevention: [
      'Use drip irrigation instead of overhead',
      'Mulch to prevent soil splash',
      'Practice crop rotation (3-year minimum)'
    ],
    ipm: [
      'Apply compost tea as foliar spray',
      'Use copper-based fungicides',
      'Maintain plant vigor with proper nutrition'
    ],
    treatment: [
      'Apply Azoxystrobin @ 1ml per liter',
      'Or Chlorothalonil @ 2g per liter',
      'Begin at first symptom appearance',
      'Continue at 14-day intervals'
    ],
    warnings: [
      'Overwinters in crop debris',
      'Favored by warm, humid conditions',
      'Can cause significant defoliation'
    ]
  }
};

export function generateAdvisory(diagnosis, crop, severity, language = 'en') {
  const advisory = ADVISORY_DATABASE[diagnosis] || getDefaultAdvisory(diagnosis);

  return {
    disease_pest: diagnosis,
    crop,
    severity,
    language,
    immediate_actions: advisory.immediate_actions.join('\n'),
    prevention: advisory.prevention.join('\n'),
    ipm_guidance: advisory.ipm.join('\n'),
    treatment_guidance: advisory.treatment.join('\n'),
    warnings: advisory.warnings.join('\n'),
    generated_at: new Date().toISOString()
  };
}

function getDefaultAdvisory(diagnosis) {
  return {
    immediate_actions: [
      'Isolate affected plants',
      'Remove and destroy infected plant parts',
      'Maintain field hygiene'
    ],
    prevention: [
      'Monitor crops regularly',
      'Maintain proper spacing',
      'Ensure good drainage and air circulation'
    ],
    ipm: [
      'Use biological control agents where available',
      'Apply organic treatments first',
      'Practice crop rotation'
    ],
    treatment: [
      'Consult local agricultural extension office',
      'Use recommended products for ' + diagnosis,
      'Follow label instructions carefully'
    ],
    warnings: [
      'Early detection is crucial',
      'Monitor weather conditions',
      'Coordinate with neighboring farmers'
    ]
  };
}
