export type UserRole = 'farmer' | 'expert' | 'officer';

export type Language = 'en' | 'hi';

export type CropStage = 'seedling' | 'vegetative' | 'flowering' | 'fruiting' | 'maturity';

export interface CropOption {
  id: string;
  name: string;
  image: string;
  scientificName?: string;
}

export interface LesionOverlay {
  id: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface CropCase {
  id: string;
  farmerName: string;
  crop: string;
  scientificName?: string;
  stage: string;
  location: string;
  sector: string;
  date: string;
  imageUrl: string;
  aiDiagnosis: string;
  aiConfidence: number;
  aiAlternativeDiagnosis?: string;
  aiAlternativeConfidence?: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  status: 'pending_expert' | 'verified' | 'auto_diagnosed';
  expertDiagnosis?: string;
  expertComments?: string;
  environmentalData: {
    humidity: string;
    humidityStatus: string;
    temperature: string;
    temperatureStatus: string;
    soilMoisture: string;
    soilMoistureStatus: string;
  };
  lesions?: LesionOverlay[];
}

export interface RegionalAlert {
  id: string;
  level: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  sector: string;
  casesCount?: string;
  description: string;
  timeAgo: string;
  actionType?: string;
}

export interface VillageRisk {
  name: string;
  activeCases: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
}
