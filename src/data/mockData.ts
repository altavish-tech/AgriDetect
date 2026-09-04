import { CropCase, CropOption, RegionalAlert, VillageRisk } from '../types';

export const CROPS: CropOption[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmyq2CPdXduj7lyIyuzEjIRPkkjwOrrYkHT9MG4B6fZP19EEIcVgB7S1j7eEcYQCPtBWdlnRLEkbcj3slKkyCeSv2ohcm2yVNOf8yNWAjGDRU3HSA82rk3aK8MJKgnPintuzQXL7niZekxIF8rx9zqB4rjs6VOX1_1xt_sITzQBj15NBQrLxIbuXg4Wc5gjU04JJW-64L_t91UUoc-i_MTqOns9WOORn8AdQOb6QcG00HJX-VREVFCLQ'
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHNnqrEoj60OQoWWPOfF4B33FlrZsMlf4_hMFntkiB1mMtNKjEZttpJ6gskO5ayCgRuNDiZjaodLIVpMJnwlIdRiNjejl5iAY9SgA5wJSoruDrefRvQkSvz8ptX2P8bBEXdYojuxEvb_F63QRZ1I5VmFaiMmBY7MPRgAz2vVn0KO0o4T1KyIoGbRxXHVC4TxZsO74Y9suXUWeDKCQRxULsGK81y2okeqPNE3l9L7YqSIclU8vPXV4jjg'
  },
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg3hEiMz7X7iBkCvO5JgeRs_dB43mkPR-b1G7yjqkkZkT1WWm3vKOeokubaLfcPvzo537IUR373wMB5C-mPgWqcQJCxnUZWRIES8kWyg8SQfoE7JrecoZlQyXQk50G4bfrCYZ6MMDU_wf1aby-ZHWREXUMueYi-Eny4mYfWVPhpnTc5I-ORILuxldcv76EKPwNpsjg4RapmIZL48V2QQpnNZsmgLV5nRbtan_3iPRYrrUlGAj_H9fcjA'
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqaMsm3b64FEJY7hzghlW9ARkGOrD9iOLAtXIYB_r5G9NeMzcssW07HhTn8yshArxihy3QnFmMThDrk6ZXVM573gMcPis0oEBc8apDBGeNW_hwnCM4V7r59CkTYq9ujOEuoaj41nEoUFBh0IBRPS0ADLfYMaJSH1VLJM3Ssc3AD5FJhoxmFzo7ZuXr0g0fCg2S5jwKagJByx-Xahg4V88h4ncxsdstzNZXkuOAXtr6fcXl-AUsrbrueQ'
  },
  {
    id: 'maize',
    name: 'Maize',
    scientificName: 'Zea mays',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN2OcfU8SqcoXZnypB1339KdH-K7N6dKBo94-P8p8fqnUIP34TqLXMA74LQwNfGjMfZwfGddPwQeKSVX0ATzFS3D8M9KDwwy0-Stn9jqFwfnRMY-4qUjO_vEEoJGUpLnwOt411uj39u3z6Z5F2URV-dU_9mfVIVtpLU_dyPz2QTAYBIMhkNd3puiEaIbDCWMpknQ6k8kUqZNn3VYZRUxk1dOY8Q3gjwenZczWXRDBZq0B0s9YKX3oPQA'
  }
];

export const INITIAL_CASES: CropCase[] = [
  {
    id: 'AD-7829-T',
    farmerName: 'John Doe',
    crop: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    stage: 'Flowering',
    location: 'Siwan, Bihar',
    sector: 'Siwan District, Sector 4',
    date: 'Today, 2 hours ago',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUaNdTpQ2Z8HkVQsDwG0ESyli0_7TJUMS9x1_qGtqvquX5XvNfiwyNtrNvgYPyn4AVOXgmzLp0z7Go_22FHZULJhW9zCe_OWfsIYkJXsK1oU4Wzg5zb9S_7iwSJGq1yq_QZ7afmifK7KvQD9pa1Q6Sd3rFat6M4qApPt1mhSHElNzPDG-Btg_QF_UUASBBkfLmYtt_0J9AlMPKGBwYiKX9oZ8AJWNX5hXrKuWVpMvrE32w7r1hie0xZw',
    aiDiagnosis: 'Early Blight',
    aiConfidence: 58,
    aiAlternativeDiagnosis: 'Septoria Leaf Spot',
    aiAlternativeConfidence: 32,
    severity: 'High',
    status: 'pending_expert',
    environmentalData: {
      humidity: '85%',
      humidityStatus: 'High Risk',
      temperature: '32°C',
      temperatureStatus: 'Optimal',
      soilMoisture: 'LOW',
      soilMoistureStatus: 'Low Risk'
    },
    lesions: [
      { id: 'lesion-a', label: 'Lesion A', top: '30%', left: '40%', width: '64px', height: '64px' },
      { id: 'lesion-b', label: 'Lesion B', top: '60%', left: '20%', width: '48px', height: '48px' }
    ]
  },
  {
    id: 'CA-8924',
    farmerName: 'Ramesh Singh',
    crop: 'Wheat',
    stage: 'Vegetative',
    location: 'Siwan, Bihar',
    sector: 'East Sector',
    date: 'Oct 24, 09:15 AM',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHNnqrEoj60OQoWWPOfF4B33FlrZsMlf4_hMFntkiB1mMtNKjEZttpJ6gskO5ayCgRuNDiZjaodLIVpMJnwlIdRiNjejl5iAY9SgA5wJSoruDrefRvQkSvz8ptX2P8bBEXdYojuxEvb_F63QRZ1I5VmFaiMmBY7MPRgAz2vVn0KO0o4T1KyIoGbRxXHVC4TxZsO74Y9suXUWeDKCQRxULsGK81y2okeqPNE3l9L7YqSIclU8vPXV4jjg',
    aiDiagnosis: 'Rust (Severe)',
    aiConfidence: 94,
    severity: 'Critical',
    status: 'verified',
    expertDiagnosis: 'Stem Rust',
    expertComments: 'Confirmed severe stem rust. Apply propiconazole immediately.',
    environmentalData: {
      humidity: '78%',
      humidityStatus: 'Moderate',
      temperature: '26°C',
      temperatureStatus: 'Normal',
      soilMoisture: 'Adequate',
      soilMoistureStatus: 'Optimal'
    }
  },
  {
    id: 'CA-8925',
    farmerName: 'Vikram Patel',
    crop: 'Maize',
    stage: 'Vegetative',
    location: 'North Valley',
    sector: 'North Valley Sector',
    date: 'Oct 24, 09:42 AM',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_wE8GZ_cOfDo4m5lETikacIkgPhBKnHiuMMLkOeWAwQE0JOFamvjKNsv-gKgF2njQZ6RW4g-jpx388ya7Vcawy7cpgkDivCXfiTi5he8CBylc0cQXWhhPmHB2Wx32ct-B8i2sas4MBYASG-rXoXXahvOB4rKuC6_m24qFC7BmuCt4eXBNdpW4iMA68dM9E6MUSF9uPl5mO7xCf_R1Ba67Vz00BkbvXC1QIEhSxUw7ND7po7ynPuu2lQ',
    aiDiagnosis: 'Fall Armyworm',
    aiConfidence: 88,
    severity: 'Critical',
    status: 'pending_expert',
    environmentalData: {
      humidity: '72%',
      humidityStatus: 'Normal',
      temperature: '31°C',
      temperatureStatus: 'High',
      soilMoisture: 'Moderate',
      soilMoistureStatus: 'Normal'
    }
  },
  {
    id: 'CA-8928',
    farmerName: 'Anil Kumar',
    crop: 'Tomato',
    stage: 'Flowering',
    location: 'Village C',
    sector: 'Village C Sector',
    date: 'Oct 24, 10:05 AM',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCYJU9JFjL_Dof0tJYG5kIteTjcoTmraHTexpYSIRnD9Fyy8l0uk186dIFMwLfMUfNE-u3f3jkmdkmiHiHxkBRZoCXN0DcWcWJGQca27AhOw7Qvz_lX2h_Tbz9CJ6F4-5Xr3C5Wz2sBWhLm4Cp90SfDUpZiR-jFpewqujKmNfreiByhIEs1WF2x8uw6FLwUHczI6tAhL5v84MhfoD6SOaD2YRwkRJCRYPL3z_PG_slCC-wVOIF-nsT1Q',
    aiDiagnosis: 'Early Blight',
    aiConfidence: 65,
    severity: 'High',
    status: 'pending_expert',
    environmentalData: {
      humidity: '84%',
      humidityStatus: 'High Risk',
      temperature: '30°C',
      temperatureStatus: 'Optimal',
      soilMoisture: 'Low',
      soilMoistureStatus: 'Low Risk'
    }
  }
];

export const REGIONAL_ALERTS: RegionalAlert[] = [
  {
    id: 'alert-1',
    level: 'CRITICAL',
    title: 'Fall Armyworm Outbreak',
    sector: 'North Valley Sector',
    casesCount: '50+ new reports in last 24h',
    description: 'Rapid spread detected in North Valley Sector. Over 50 new reports in the last 24 hours. Immediate intervention required.',
    timeAgo: '10 mins ago',
    actionType: 'broadcast'
  },
  {
    id: 'alert-2',
    level: 'CRITICAL',
    title: 'Tomato Late Blight Outbreak',
    sector: 'Village A Sector',
    casesCount: '24 cases / 48h',
    description: 'Rapid spread detected across multiple adjacent farms. High humidity accelerating spore dispersion. Immediate intervention required to prevent total crop failure in the sector.',
    timeAgo: '45 mins ago',
    actionType: 'broadcast'
  },
  {
    id: 'alert-3',
    level: 'WARNING',
    title: 'Heavy Rainfall Expected',
    sector: 'Eastern District',
    description: 'Forecast indicates heavy rains in Eastern District. High risk of crop lodging and fungal spread.',
    timeAgo: '2 hrs ago'
  },
  {
    id: 'alert-4',
    level: 'INFO',
    title: 'New Reporting Guidelines',
    sector: 'District-wide',
    description: 'Updated protocols for logging soil moisture data are now available in the resource center.',
    timeAgo: 'Yesterday'
  }
];

export const VILLAGE_RISKS: VillageRisk[] = [
  { name: 'Green Valley', activeCases: 124, riskLevel: 'High', trend: '+12%', trendDirection: 'up' },
  { name: 'Sunny Ridge', activeCases: 45, riskLevel: 'Medium', trend: '-5%', trendDirection: 'down' },
  { name: 'Village A', activeCases: 89, riskLevel: 'High', trend: '+18%', trendDirection: 'up' },
  { name: 'Village C', activeCases: 38, riskLevel: 'Medium', trend: '+2%', trendDirection: 'up' },
  { name: 'Riverdale', activeCases: 12, riskLevel: 'Low', trend: '0%', trendDirection: 'neutral' }
];
