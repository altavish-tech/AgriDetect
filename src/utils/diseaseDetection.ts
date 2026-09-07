// Disease detection based on crop type
export interface DiseaseInfo {
  name: string;
  nameHi: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  severityHi: string;
  symptoms: string;
  symptomsHi: string;
  treatment: string;
  treatmentHi: string;
}

// Simulated AI disease detection based on crop type
export function detectDisease(cropType: string, imageUrl?: string): DiseaseInfo {
  const crop = cropType.toLowerCase();
  
  // Wheat diseases
  if (crop.includes('wheat') || crop.includes('गेहूं')) {
    return {
      name: 'Wheat Stem Rust',
      nameHi: 'गेहूं तना रतुआ',
      confidence: 87,
      severity: 'High',
      severityHi: 'उच्च',
      symptoms: 'Reddish-brown pustules on stems, leaves and grain heads. Can cause severe yield loss if not treated.',
      symptomsHi: 'तनों, पत्तियों और अनाज के सिरों पर लाल-भूरे रंग के दाने। यदि उपचार न किया जाए तो गंभीर उपज हानि हो सकती है।',
      treatment: 'Apply fungicide immediately. Remove infected plants. Use resistant varieties.',
      treatmentHi: 'तुरंत कवकनाशी लगाएं। संक्रमित पौधों को हटा दें। प्रतिरोधी किस्मों का उपयोग करें।'
    };
  }
  
  // Rice diseases
  if (crop.includes('rice') || crop.includes('धान') || crop.includes('चावल')) {
    return {
      name: 'Rice Blast',
      nameHi: 'धान ब्लास्ट',
      confidence: 91,
      severity: 'Critical',
      severityHi: 'गंभीर',
      symptoms: 'Diamond-shaped lesions on leaves with gray centers and brown borders. Can destroy entire crop.',
      symptomsHi: 'पत्तियों पर हीरे के आकार के घाव जिनमें भूरे केंद्र और भूरे किनारे होते हैं। पूरी फसल को नष्ट कर सकता है।',
      treatment: 'Apply Tricyclazole fungicide. Ensure proper spacing. Avoid excess nitrogen.',
      treatmentHi: 'ट्राइसाइक्लाज़ोल कवकनाशी लगाएं। उचित दूरी सुनिश्चित करें। अधिक नाइट्रोजन से बचें।'
    };
  }
  
  // Maize/Corn diseases
  if (crop.includes('maize') || crop.includes('corn') || crop.includes('मक्का')) {
    return {
      name: 'Maize Leaf Blight',
      nameHi: 'मक्का पत्ती झुलसा',
      confidence: 84,
      severity: 'High',
      severityHi: 'उच्च',
      symptoms: 'Long, grayish-green or tan lesions on leaves. Can reduce yield by 30-50%.',
      symptomsHi: 'पत्तियों पर लंबे, भूरे-हरे या तन के घाव। उपज में 30-50% की कमी कर सकता है।',
      treatment: 'Use resistant hybrids. Apply Mancozeb fungicide. Practice crop rotation.',
      treatmentHi: 'प्रतिरोधी संकर का उपयोग करें। मैनकोजेब कवकनाशी लगाएं। फसल चक्र अपनाएं।'
    };
  }
  
  // Tomato diseases (default/existing)
  if (crop.includes('tomato') || crop.includes('टमाटर')) {
    return {
      name: 'Tomato Early Blight',
      nameHi: 'टमाटर अर्ली ब्लाइट',
      confidence: 89,
      severity: 'High',
      severityHi: 'उच्च',
      symptoms: 'Dark spots with concentric rings on older leaves. Yellowing and leaf drop.',
      symptomsHi: 'पुरानी पत्तियों पर गोलाकार छल्लों के साथ गहरे धब्बे। पीलापन और पत्ती गिरना।',
      treatment: 'Apply Chlorothalonil fungicide. Remove infected leaves. Improve air circulation.',
      treatmentHi: 'क्लोरोथालोनिल कवकनाशी लगाएं। संक्रमित पत्तियों को हटा दें। हवा का संचार बढ़ाएं।'
    };
  }
  
  // Potato diseases
  if (crop.includes('potato') || crop.includes('आलू')) {
    return {
      name: 'Potato Late Blight',
      nameHi: 'आलू लेट ब्लाइट',
      confidence: 92,
      severity: 'Critical',
      severityHi: 'गंभीर',
      symptoms: 'Water-soaked lesions on leaves and stems. White fungal growth on undersides.',
      symptomsHi: 'पत्तियों और तनों पर पानी से भीगे घाव। निचली सतह पर सफेद कवक वृद्धि।',
      treatment: 'Apply Metalaxyl + Mancozeb. Destroy infected plants. Use certified seed.',
      treatmentHi: 'मेटालैक्सिल + मैनकोजेब लगाएं। संक्रमित पौधों को नष्ट करें। प्रमाणित बीज का उपयोग करें।'
    };
  }
  
  // Cotton diseases
  if (crop.includes('cotton') || crop.includes('कपास')) {
    return {
      name: 'Cotton Leaf Curl',
      nameHi: 'कपास पत्ती मरोड़',
      confidence: 86,
      severity: 'High',
      severityHi: 'उच्च',
      symptoms: 'Upward and downward curling of leaves. Stunted growth and reduced boll formation.',
      symptomsHi: 'पत्तियों का ऊपर और नीचे की ओर मुड़ना। रुकी हुई वृद्धि और कम बोल निर्माण।',
      treatment: 'Control whitefly vectors. Use virus-resistant varieties. Remove infected plants.',
      treatmentHi: 'सफेद मक्खी वाहकों को नियंत्रित करें। वायरस-प्रतिरोधी किस्मों का उपयोग करें। संक्रमित पौधों को हटाएं।'
    };
  }
  
  // Default fallback
  return {
    name: 'General Leaf Spot',
    nameHi: 'सामान्य पत्ती धब्बा',
    confidence: 75,
    severity: 'Medium',
    severityHi: 'मध्यम',
    symptoms: 'Circular or irregular spots on leaves. May cause premature leaf drop.',
    symptomsHi: 'पत्तियों पर गोलाकार या अनियमित धब्बे। समय से पहले पत्ती गिरना हो सकता है।',
    treatment: 'Apply broad-spectrum fungicide. Remove infected leaves. Ensure proper drainage.',
    treatmentHi: 'व्यापक-स्पेक्ट्रम कवकनाशी लगाएं। संक्रमित पत्तियों को हटाएं। उचित जल निकासी सुनिश्चित करें।'
  };
}

// Get disease list by crop
export function getDiseasesByCrop(cropType: string): string[] {
  const crop = cropType.toLowerCase();
  
  if (crop.includes('wheat') || crop.includes('गेहूं')) {
    return ['Wheat Stem Rust', 'Wheat Leaf Rust', 'Powdery Mildew', 'Loose Smut'];
  }
  
  if (crop.includes('rice') || crop.includes('धान')) {
    return ['Rice Blast', 'Brown Spot', 'Sheath Blight', 'Bacterial Blight'];
  }
  
  if (crop.includes('maize') || crop.includes('मक्का')) {
    return ['Maize Leaf Blight', 'Common Rust', 'Gray Leaf Spot', 'Stalk Rot'];
  }
  
  if (crop.includes('tomato') || crop.includes('टमाटर')) {
    return ['Early Blight', 'Late Blight', 'Septoria Leaf Spot', 'Bacterial Spot'];
  }
  
  if (crop.includes('potato') || crop.includes('आलू')) {
    return ['Late Blight', 'Early Blight', 'Black Scurf', 'Common Scab'];
  }
  
  if (crop.includes('cotton') || crop.includes('कपास')) {
    return ['Leaf Curl Virus', 'Wilt', 'Boll Rot', 'Root Rot'];
  }
  
  return ['Leaf Spot', 'Fungal Infection', 'Bacterial Infection'];
}
