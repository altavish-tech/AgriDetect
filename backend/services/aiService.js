/**
 * AI Service - Disease/Pest Detection
 * 
 * This is a mock implementation that can be easily replaced with a real AI model.
 * 
 * To integrate a real AI model:
 * 1. Set AI_API_URL and AI_API_KEY in .env
 * 2. Replace the mock logic in analyzeImage() with API calls
 * 3. Keep the same return structure
 */

const DISEASE_DATABASE = {
  Tomato: {
    'Early Blight': {
      symptoms: 'Concentric rings on leaves, yellowing, dark lesions',
      severity: ['High', 'Critical'],
      confidence_range: [55, 95],
      alternatives: ['Septoria Leaf Spot', 'Late Blight']
    },
    'Late Blight': {
      symptoms: 'Water-soaked lesions, white mold, rapid spread',
      severity: ['Critical'],
      confidence_range: [70, 98],
      alternatives: ['Early Blight', 'Bacterial Canker']
    },
    'Septoria Leaf Spot': {
      symptoms: 'Small dark spots with light centers, yellowing',
      severity: ['Moderate', 'High'],
      confidence_range: [60, 90],
      alternatives: ['Early Blight']
    }
  },
  Wheat: {
    'Stem Rust': {
      symptoms: 'Orange-red pustules on stems and leaves',
      severity: ['Critical'],
      confidence_range: [80, 98],
      alternatives: ['Leaf Rust', 'Yellow Rust']
    },
    'Leaf Rust': {
      symptoms: 'Orange pustules primarily on leaves',
      severity: ['High'],
      confidence_range: [75, 95],
      alternatives: ['Stem Rust']
    },
    'Powdery Mildew': {
      symptoms: 'White powdery coating on leaves',
      severity: ['Moderate', 'High'],
      confidence_range: [70, 92],
      alternatives: []
    }
  },
  Maize: {
    'Fall Armyworm': {
      symptoms: 'Irregular holes in leaves, frass, caterpillar presence',
      severity: ['Critical'],
      confidence_range: [85, 98],
      alternatives: ['Common Armyworm']
    },
    'Corn Blight': {
      symptoms: 'Long elliptical lesions on leaves',
      severity: ['High'],
      confidence_range: [70, 92],
      alternatives: ['Gray Leaf Spot']
    }
  },
  Rice: {
    'Blast Disease': {
      symptoms: 'Diamond-shaped lesions, withering',
      severity: ['Critical'],
      confidence_range: [75, 96],
      alternatives: ['Brown Spot']
    },
    'Bacterial Blight': {
      symptoms: 'Water-soaked lesions, yellowing',
      severity: ['High'],
      confidence_range: [70, 93],
      alternatives: []
    }
  },
  Potato: {
    'Late Blight': {
      symptoms: 'Dark water-soaked lesions, white mold',
      severity: ['Critical'],
      confidence_range: [80, 97],
      alternatives: ['Early Blight']
    },
    'Early Blight': {
      symptoms: 'Concentric ring patterns on leaves',
      severity: ['High'],
      confidence_range: [65, 90],
      alternatives: ['Late Blight']
    }
  }
};

/**
 * Mock AI Analysis
 * In production, this would call a real ML model/API
 */
export async function analyzeImage(imageBuffer, metadata) {
  const { crop, cropStage, location } = metadata;

  // Simulate processing time
  const startTime = Date.now();
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  // Get diseases for this crop
  const cropDiseases = DISEASE_DATABASE[crop] || DISEASE_DATABASE.Tomato;
  const diseaseNames = Object.keys(cropDiseases);

  // Randomly select primary disease
  const primaryDisease = diseaseNames[Math.floor(Math.random() * diseaseNames.length)];
  const diseaseInfo = cropDiseases[primaryDisease];

  // Generate confidence based on range
  const [minConf, maxConf] = diseaseInfo.confidence_range;
  const primaryConfidence = minConf + Math.random() * (maxConf - minConf);

  // Select severity
  const severity = diseaseInfo.severity[
    Math.floor(Math.random() * diseaseInfo.severity.length)
  ];

  // Generate alternative diagnosis
  let alternativeDiagnosis = null;
  let alternativeConfidence = null;

  if (diseaseInfo.alternatives.length > 0 && Math.random() > 0.3) {
    alternativeDiagnosis = diseaseInfo.alternatives[0];
    alternativeConfidence = primaryConfidence * (0.3 + Math.random() * 0.4);
  }

  // Generate mock lesion detections
  const lesionCount = Math.floor(Math.random() * 3) + 1;
  const lesions = Array.from({ length: lesionCount }, (_, i) => ({
    id: `lesion-${String.fromCharCode(97 + i)}`,
    label: `Lesion ${String.fromCharCode(65 + i)}`,
    top: `${20 + Math.random() * 60}%`,
    left: `${15 + Math.random() * 70}%`,
    width: `${48 + Math.random() * 32}px`,
    height: `${48 + Math.random() * 32}px`,
    confidence: 0.7 + Math.random() * 0.28
  }));

  const processingTime = Date.now() - startTime;

  return {
    primary_diagnosis: primaryDisease,
    primary_confidence: Math.round(primaryConfidence * 100) / 100,
    alternative_diagnosis: alternativeDiagnosis,
    alternative_confidence: alternativeConfidence ? Math.round(alternativeConfidence * 100) / 100 : null,
    severity,
    symptoms: diseaseInfo.symptoms,
    lesions,
    processing_time_ms: processingTime,
    model_version: 'mock-v1.0',
    metadata: {
      crop,
      cropStage,
      location
    }
  };
}

/**
 * Compare follow-up image with original
 * In production, this would use image comparison ML
 */
export async function compareImages(originalImageUrl, followupImageBuffer) {
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock comparison result
  const outcomes = [
    { status: 'improving', recovery: 65, description: 'Lesion area reduced by 30%' },
    { status: 'improving', recovery: 45, description: 'Slight improvement observed' },
    { status: 'no_change', recovery: 0, description: 'No significant change' },
    { status: 'spreading', recovery: -20, description: 'Lesion area increased' }
  ];

  const result = outcomes[Math.floor(Math.random() * outcomes.length)];

  return {
    progress_status: result.status,
    recovery_percentage: result.recovery,
    comparison_details: {
      description: result.description,
      lesion_count_before: 3,
      lesion_count_after: result.status === 'improving' ? 2 : result.status === 'spreading' ? 4 : 3,
      affected_area_change: result.recovery
    }
  };
}

/**
 * Real AI Integration Template
 * Uncomment and modify when integrating actual AI API
 */
/*
import fetch from 'node-fetch';

export async function analyzeImageWithRealAI(imageBuffer, metadata) {
  const formData = new FormData();
  formData.append('image', new Blob([imageBuffer]));
  formData.append('crop', metadata.crop);
  formData.append('stage', metadata.cropStage);
  formData.append('location', metadata.location);

  const response = await fetch(process.env.AI_API_URL + '/analyze', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.AI_API_KEY}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('AI API request failed');
  }

  const result = await response.json();

  // Transform API response to our format
  return {
    primary_diagnosis: result.diagnosis,
    primary_confidence: result.confidence,
    alternative_diagnosis: result.alternatives?.[0]?.diagnosis,
    alternative_confidence: result.alternatives?.[0]?.confidence,
    severity: calculateSeverity(result.confidence, result.risk_factors),
    symptoms: result.symptoms || '',
    lesions: result.detections || [],
    processing_time_ms: result.processing_time,
    model_version: result.model_version
  };
}
*/
