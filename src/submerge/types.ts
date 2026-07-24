export interface OceanProfile {
  id: string;
  name: string;
  areaKm2: number;
  averageDepthM: number;
  deepestPointName: string;
  deepestPointM: number;
  averageTempC: number;
  salinityPpt: number;
  marineSpeciesCount: number;
  protectedZones: number;
  researchStations: number;
}

export interface LiveTelemetry {
  oceanId: string;
  oceanHealth: number; // 0 - 100
  pollutionIndex: number; // 0 - 100
  waterTempC: number;
  coralHealth: number; // 0 - 100
  plasticDensityPerKm2: number;
  marineLifeIndex: number; // 0 - 100
  biodiversityScore: number; // 0 - 100
  expeditionStatus: "active" | "standby" | "maintenance";
  lastUpdated: string;
  oceanHealthTrend: number[];
  pollutionIndexTrend: number[];
  waterTempCTrend: number[];
  coralHealthTrend: number[];
}

export interface WasteCategory {
  name: string;
  percentage: number;
  trend: "up" | "down" | "stable";
  dailyTons: number;
  weeklyTons: number;
  monthlyTons: number;
  yearlyTons: number;
}

export interface WasteAnalytics {
  oceanId: string;
  categories: WasteCategory[];
  timeSeries: {
    label: string; // e.g. "Jan", "Feb" or "Mon", "Tue"
    plastic: number;
    ghostNets: number;
    industrial: number;
    oilSpill: number;
    medical: number;
    eWaste: number;
  }[];
}

export interface WasteMaterial {
  id: string;
  name: string;
  percentage: number;
  source: string;
  impact: string;
  decompositionTime: string;
}

export interface ChemicalAnalysis {
  id: string;
  name: string;
  formula: string;
  dangerLevel: "safe" | "moderate" | "warning" | "critical";
  currentLevel: number;
  safeLimit: number;
  unit: string;
  marineImpact: string;
  humanImpact: string;
}

export interface HealthIndexData {
  oceanId: string;
  waterQuality: number;
  coralHealth: number;
  biodiversity: number;
  chemicalRisk: number;
  pollutionLevel: number;
  oxygenLevel: number;
  overallScore: number;
  classification: "Healthy" | "Moderate" | "Critical";
}

export interface RecoveryPlan {
  oceanId: string;
  recoverable: boolean;
  estimatedRecoveryTimeYears?: number;
  requiredCleanupTons?: number;
  wasteReductionPercent?: number;
  conservationSteps?: string[];
  governmentMeasures?: string[];
  industrialRegulations?: string[];
  marineProtectionActions?: string[];
  expectedHealthImprovementPercent?: number;
  criticalWarning?: string;
  emergencyMeasures?: string[];
  longTermRecoveryPlan?: string;
  suggestedConservationZones?: string[];
  priorityRegions?: string[];
}

export interface WaterReuseAssessment {
  application: string; // e.g. "Marine Farming", "Groundwater Recharge"
  treatmentLevel: string;
  safetyRating: "Excellent" | "Good" | "Conditional" | "Unsafe";
  estimatedCostUsdPerM3: number;
  suitabilityScore: number; // 0 - 100
}

export interface PollutionSource {
  industry: string; // Sector name, e.g. "Textiles", "Commercial Fishing"
  confidencePercent: number;
  detectedWasteMatch: string;
  pollutionContributionPercent: number;
  environmentalImpact: string;
}

export interface AIReport {
  oceanId: string;
  condition: string;
  futurePrediction: string;
  mainPollutants: string[];
  chemicalRisks: string[];
  recoveryPossibility: string;
  biodiversityStatus: string;
  suggestedActions: string[];
}

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  category: "whales" | "sharks" | "deepsea" | "corals" | "other";
  imageUrl: string;
  depthRangeM: string;
  diet: string;
  habitat: string;
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered";
  threatLevel: "Low" | "Medium" | "High" | "Critical";
  facts: string[];
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  status: "completed" | "ongoing" | "future";
}

export interface GlobalStats {
  plasticRemovedKg: number;
  speciesProtected: number;
  ghostNetsFound: number;
  illegalFishingCasesReported: number;
  oilSpillsDetected: number;
  coralsRestored: number;
  marineMissionsCompleted: number;
}
