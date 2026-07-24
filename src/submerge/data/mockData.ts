import {
  OceanProfile,
  LiveTelemetry,
  WasteAnalytics,
  WasteMaterial,
  ChemicalAnalysis,
  HealthIndexData,
  RecoveryPlan,
  WaterReuseAssessment,
  PollutionSource,
  AIReport,
  Species,
  TimelineMilestone,
  GlobalStats
} from "../types";

export const oceanProfiles: OceanProfile[] = [
  {
    id: "pacific",
    name: "Pacific Ocean",
    areaKm2: 165250000,
    averageDepthM: 4000,
    deepestPointName: "Mariana Trench",
    deepestPointM: 10935,
    averageTempC: 3.5,
    salinityPpt: 34.7,
    marineSpeciesCount: 35000,
    protectedZones: 12,
    researchStations: 4
  },
  {
    id: "atlantic",
    name: "Atlantic Ocean",
    areaKm2: 106460000,
    averageDepthM: 3646,
    deepestPointName: "Puerto Rico Trench",
    deepestPointM: 8376,
    averageTempC: 4.2,
    salinityPpt: 35.5,
    marineSpeciesCount: 28000,
    protectedZones: 8,
    researchStations: 3
  },
  {
    id: "indian",
    name: "Indian Ocean",
    areaKm2: 70560000,
    averageDepthM: 3741,
    deepestPointName: "Sunda Trench",
    deepestPointM: 7450,
    averageTempC: 5.1,
    salinityPpt: 34.8,
    marineSpeciesCount: 21000,
    protectedZones: 6,
    researchStations: 2
  },
  {
    id: "arctic",
    name: "Arctic Ocean",
    areaKm2: 14060000,
    averageDepthM: 1205,
    deepestPointName: "Fram Basin",
    deepestPointM: 5608,
    averageTempC: -1.2,
    salinityPpt: 32.5,
    marineSpeciesCount: 5500,
    protectedZones: 4,
    researchStations: 5
  },
  {
    id: "southern",
    name: "Southern Ocean",
    areaKm2: 203270000,
    averageDepthM: 3270,
    deepestPointName: "South Sandwich Trench",
    deepestPointM: 7235,
    averageTempC: -0.5,
    salinityPpt: 33.9,
    marineSpeciesCount: 12000,
    protectedZones: 15,
    researchStations: 6
  }
];

export const liveTelemetries: LiveTelemetry[] = [
  {
    oceanId: "pacific",
    oceanHealth: 62,
    pollutionIndex: 78,
    waterTempC: 17.2,
    coralHealth: 55,
    plasticDensityPerKm2: 12400,
    marineLifeIndex: 71,
    biodiversityScore: 68,
    expeditionStatus: "active",
    lastUpdated: "SIMULATED LIVE",
    oceanHealthTrend: [58, 59, 61, 60, 62, 63, 62],
    pollutionIndexTrend: [82, 80, 81, 79, 78, 77, 78],
    waterTempCTrend: [16.8, 16.9, 17.1, 17.0, 17.2, 17.3, 17.2],
    coralHealthTrend: [58, 57, 56, 56, 55, 55, 55]
  },
  {
    oceanId: "atlantic",
    oceanHealth: 58,
    pollutionIndex: 82,
    waterTempC: 15.5,
    coralHealth: 48,
    plasticDensityPerKm2: 15200,
    marineLifeIndex: 64,
    biodiversityScore: 61,
    expeditionStatus: "maintenance",
    lastUpdated: "SIMULATED LIVE",
    oceanHealthTrend: [60, 59, 58, 59, 58, 57, 58],
    pollutionIndexTrend: [80, 81, 83, 82, 82, 81, 82],
    waterTempCTrend: [15.1, 15.2, 15.4, 15.5, 15.6, 15.5, 15.5],
    coralHealthTrend: [51, 50, 49, 48, 48, 47, 48]
  },
  {
    oceanId: "indian",
    oceanHealth: 68,
    pollutionIndex: 65,
    waterTempC: 22.4,
    coralHealth: 62,
    plasticDensityPerKm2: 9100,
    marineLifeIndex: 75,
    biodiversityScore: 72,
    expeditionStatus: "active",
    lastUpdated: "SIMULATED LIVE",
    oceanHealthTrend: [64, 65, 66, 67, 68, 69, 68],
    pollutionIndexTrend: [70, 68, 67, 66, 65, 64, 65],
    waterTempCTrend: [21.8, 22.0, 22.1, 22.3, 22.4, 22.5, 22.4],
    coralHealthTrend: [65, 64, 63, 62, 62, 61, 62]
  },
  {
    oceanId: "arctic",
    oceanHealth: 48,
    pollutionIndex: 52,
    waterTempC: 1.8,
    coralHealth: 30, // cold-water corals
    plasticDensityPerKm2: 4300,
    marineLifeIndex: 51,
    biodiversityScore: 49,
    expeditionStatus: "standby",
    lastUpdated: "SIMULATED LIVE",
    oceanHealthTrend: [52, 51, 50, 49, 48, 48, 48],
    pollutionIndexTrend: [48, 49, 50, 51, 52, 52, 52],
    waterTempCTrend: [1.2, 1.4, 1.5, 1.6, 1.8, 1.9, 1.8],
    coralHealthTrend: [35, 34, 32, 31, 30, 30, 30]
  },
  {
    oceanId: "southern",
    oceanHealth: 88,
    pollutionIndex: 18,
    waterTempC: -0.2,
    coralHealth: 85,
    plasticDensityPerKm2: 1200,
    marineLifeIndex: 91,
    biodiversityScore: 89,
    expeditionStatus: "active",
    lastUpdated: "SIMULATED LIVE",
    oceanHealthTrend: [86, 87, 87, 88, 88, 89, 88],
    pollutionIndexTrend: [21, 20, 19, 18, 18, 17, 18],
    waterTempCTrend: [-0.4, -0.3, -0.2, -0.2, -0.2, -0.1, -0.2],
    coralHealthTrend: [84, 84, 85, 85, 85, 86, 85]
  }
];

export const wasteAnalyticsData: WasteAnalytics[] = [
  {
    oceanId: "pacific",
    categories: [
      { name: "Plastic Bottles", percentage: 32, trend: "up", dailyTons: 140, weeklyTons: 980, monthlyTons: 4200, yearlyTons: 51100 },
      { name: "Ghost Fishing Nets", percentage: 24, trend: "stable", dailyTons: 105, weeklyTons: 735, monthlyTons: 3150, yearlyTons: 38300 },
      { name: "Industrial Discharge", percentage: 18, trend: "down", dailyTons: 78, weeklyTons: 546, monthlyTons: 2340, yearlyTons: 28500 },
      { name: "Oil Hydrocarbons", percentage: 12, trend: "stable", dailyTons: 52, weeklyTons: 364, monthlyTons: 1560, yearlyTons: 19000 },
      { name: "Medical Waste", percentage: 9, trend: "up", dailyTons: 39, weeklyTons: 273, monthlyTons: 1170, yearlyTons: 14200 },
      { name: "Electronics / E-Waste", percentage: 5, trend: "up", dailyTons: 22, weeklyTons: 154, monthlyTons: 660, yearlyTons: 8000 }
    ],
    timeSeries: [
      { label: "Jan", plastic: 8200, ghostNets: 6100, industrial: 4800, oilSpill: 3100, medical: 2100, eWaste: 1100 },
      { label: "Feb", plastic: 8400, ghostNets: 6150, industrial: 4700, oilSpill: 2900, medical: 2200, eWaste: 1200 },
      { label: "Mar", plastic: 8700, ghostNets: 6200, industrial: 4600, oilSpill: 3000, medical: 2350, eWaste: 1250 },
      { label: "Apr", plastic: 8900, ghostNets: 6050, industrial: 4400, oilSpill: 3200, medical: 2400, eWaste: 1300 },
      { label: "May", plastic: 9300, ghostNets: 6100, industrial: 4250, oilSpill: 3150, medical: 2500, eWaste: 1400 },
      { label: "Jun", plastic: 9600, ghostNets: 6200, industrial: 4100, oilSpill: 3100, medical: 2650, eWaste: 1450 },
      { label: "Jul", plastic: 9900, ghostNets: 6250, industrial: 3900, oilSpill: 3050, medical: 2800, eWaste: 1500 }
    ]
  },
  {
    oceanId: "atlantic",
    categories: [
      { name: "Plastic Bottles", percentage: 38, trend: "up", dailyTons: 190, weeklyTons: 1330, monthlyTons: 5700, yearlyTons: 69350 },
      { name: "Industrial Discharge", percentage: 22, trend: "up", dailyTons: 110, weeklyTons: 770, monthlyTons: 3300, yearlyTons: 40150 },
      { name: "Ghost Fishing Nets", percentage: 15, trend: "stable", dailyTons: 75, weeklyTons: 525, monthlyTons: 2250, yearlyTons: 27375 },
      { name: "Oil Hydrocarbons", percentage: 11, trend: "down", dailyTons: 55, weeklyTons: 385, monthlyTons: 1650, yearlyTons: 20075 },
      { name: "Medical Waste", percentage: 9, trend: "up", dailyTons: 45, weeklyTons: 315, monthlyTons: 1350, yearlyTons: 16425 },
      { name: "Electronics / E-Waste", percentage: 5, trend: "up", dailyTons: 25, weeklyTons: 175, monthlyTons: 750, yearlyTons: 9125 }
    ],
    timeSeries: [
      { label: "Jan", plastic: 9100, ghostNets: 4200, industrial: 5100, oilSpill: 3500, medical: 2400, eWaste: 1200 },
      { label: "Feb", plastic: 9350, ghostNets: 4150, industrial: 5300, oilSpill: 3400, medical: 2500, eWaste: 1300 },
      { label: "Mar", plastic: 9500, ghostNets: 4100, industrial: 5450, oilSpill: 3300, medical: 2650, eWaste: 1350 },
      { label: "Apr", plastic: 9800, ghostNets: 4250, industrial: 5600, oilSpill: 3250, medical: 2700, eWaste: 1400 },
      { label: "May", plastic: 10100, ghostNets: 4200, industrial: 5800, oilSpill: 3100, medical: 2900, eWaste: 1500 },
      { label: "Jun", plastic: 10500, ghostNets: 4300, industrial: 6050, oilSpill: 3000, medical: 3100, eWaste: 1600 },
      { label: "Jul", plastic: 10900, ghostNets: 4350, industrial: 6300, oilSpill: 2900, medical: 3200, eWaste: 1700 }
    ]
  }
];

export const wasteMaterials: WasteMaterial[] = [
  {
    id: "bottle",
    name: "PET Plastic Bottles",
    percentage: 35,
    source: "Consumer Waste & Tourism",
    impact: "Breaks into lethal toxic microplastics, ingested by lower trophic levels, bioaccumulating.",
    decompositionTime: "450 Years"
  },
  {
    id: "nets",
    name: "Ghost Fishing Nets",
    percentage: 24,
    source: "Commercial Fishing Fleets",
    impact: "Uncontrolled continuous entrapment and suffocation of whales, sharks, and turtles.",
    decompositionTime: "600 Years"
  },
  {
    id: "micro",
    name: "Synthetic Microplastics",
    percentage: 18,
    source: "Industrial Runoffs & Textiles",
    impact: "Blocks cellular absorption in corals, disrupts enzyme structures, contaminates food chain.",
    decompositionTime: "Indefinite / Irreversible"
  },
  {
    id: "metal",
    name: "Heavy Industrial Cans / Metal Drums",
    percentage: 12,
    source: "Container Shipping & Dumping",
    impact: "Corrosive leaking of reactive chemical compounds into deep benthic sediments.",
    decompositionTime: "200 Years"
  },
  {
    id: "medical",
    name: "Syringes & Protective Gear",
    percentage: 6,
    source: "Coastal Medical Disposal Sites",
    impact: "Pathogen vectoring, chemical contamination, toxic ingestion risk for deep diving mammals.",
    decompositionTime: "300 Years"
  },
  {
    id: "ewaste",
    name: "Discarded Microcircuits / PCBs",
    percentage: 5,
    source: "E-Waste Maritime Shipping",
    impact: "Heavy metal leaching (Lead, Cadmium, Arsenic) directly poisoning deep-sea thermal zones.",
    decompositionTime: "800 Years"
  }
];

export const chemicalsData: Record<string, ChemicalAnalysis[]> = {
  pacific: [
    { id: "hg", name: "Mercury", formula: "Hg", dangerLevel: "warning", currentLevel: 0.08, safeLimit: 0.01, unit: "mg/L", marineImpact: "Neurological disruption in apex cetaceans, halting coordination and navigation.", humanImpact: "Severe mercury poisoning, bioaccumulating through commercial seafood routes." },
    { id: "pb", name: "Lead", formula: "Pb", dangerLevel: "moderate", currentLevel: 0.04, safeLimit: 0.015, unit: "mg/L", marineImpact: "Disrupts hemoglobin production and bone growth cycles in juvenile pelagic fish.", humanImpact: "Heavy metal toxicity, kidney and brain function inhibition." },
    { id: "pfas", name: "PFAS (Forever Chemicals)", formula: "C8HF15O2", dangerLevel: "critical", currentLevel: 1.84, safeLimit: 0.05, unit: "µg/L", marineImpact: "Permanent molecular bioaccumulation in deep ocean predators, halting natural cell division.", humanImpact: "Immunotoxicological failures, liver damage, endocrine disruptions." },
    { id: "no3", name: "Nitrates", formula: "NO3", dangerLevel: "warning", currentLevel: 12.5, safeLimit: 2.0, unit: "mg/L", marineImpact: "Causes catastrophic hypoxic algal blooms, depleting dissolved oxygen from the surface layers.", humanImpact: "Harmful bacterial exposure, shell-fish safety shutdowns." }
  ],
  atlantic: [
    { id: "hg", name: "Mercury", formula: "Hg", dangerLevel: "critical", currentLevel: 0.12, safeLimit: 0.01, unit: "mg/L", marineImpact: "Devastates squid populations, causing permanent systemic cell decay.", humanImpact: "Extreme bioaccumulation in bluefin tuna, high toxicity risk." },
    { id: "pb", name: "Lead", formula: "Pb", dangerLevel: "warning", currentLevel: 0.09, safeLimit: 0.015, unit: "mg/L", marineImpact: "Saturates benthic sediments, poisoning deep coral clusters and sponges.", humanImpact: "Toxic risk via near-shore fisheries and recreational exposure." },
    { id: "pfas", name: "PFAS (Forever Chemicals)", formula: "C8HF15O2", dangerLevel: "critical", currentLevel: 2.11, safeLimit: 0.05, unit: "µg/L", marineImpact: "Stops coral reproduction cycles, calcification failure.", humanImpact: "Severe long-term exposure hazard." },
    { id: "no3", name: "Nitrates", formula: "NO3", dangerLevel: "warning", currentLevel: 15.8, safeLimit: 2.0, unit: "mg/L", marineImpact: "Creates vast dead-zones with sub-potable oxygen concentrations.", humanImpact: "Triggers lethal blue-green algae vectors." }
  ]
};

export const healthIndices: HealthIndexData[] = [
  { oceanId: "pacific", waterQuality: 64, coralHealth: 55, biodiversity: 68, chemicalRisk: 35, pollutionLevel: 22, oxygenLevel: 75, overallScore: 62, classification: "Moderate" },
  { oceanId: "atlantic", waterQuality: 52, coralHealth: 48, biodiversity: 61, chemicalRisk: 28, pollutionLevel: 18, oxygenLevel: 68, overallScore: 58, classification: "Critical" },
  { oceanId: "indian", waterQuality: 71, coralHealth: 62, biodiversity: 72, chemicalRisk: 48, pollutionLevel: 35, oxygenLevel: 82, overallScore: 68, classification: "Moderate" },
  { oceanId: "arctic", waterQuality: 42, coralHealth: 30, biodiversity: 49, chemicalRisk: 55, pollutionLevel: 48, oxygenLevel: 58, overallScore: 48, classification: "Critical" },
  { oceanId: "southern", waterQuality: 92, coralHealth: 85, biodiversity: 89, chemicalRisk: 88, pollutionLevel: 82, oxygenLevel: 94, overallScore: 88, classification: "Healthy" }
];

export const recoveryPlans: RecoveryPlan[] = [
  {
    oceanId: "pacific",
    recoverable: true,
    estimatedRecoveryTimeYears: 12,
    requiredCleanupTons: 420000,
    wasteReductionPercent: 65,
    conservationSteps: [
      "Launch a constellation of autonomous solar-powered filtration booms in the North Basin vortex.",
      "Expand biological marine protection zones around outer island chains by 40% immediately.",
      "Initiate bio-engineered macroalgae farms to naturally absorb dissolved nitrate surpluses."
    ],
    governmentMeasures: [
      "Enact strict maritime laws penalizing ghost-net abandonment with severe automatic GPS-linked tracing fines.",
      "Impose complete heavy-industry industrial bans within 100 nautical miles of the Mariana biological sanctuary."
    ],
    industrialRegulations: [
      "OceanPlast Industries and BlueWave Shipping must transition completely to GPS-tagged biological degradation materials.",
      "Mandate all cargo container shipping routes to integrate thermal discharge neutralizing exhaust systems."
    ],
    marineProtectionActions: [
      "Deploy localized remote camera networks to track illegal commercial fishing fleets in deep waters.",
      "Drop specialized deep-sea mineral restoration pods near fragile hydrothermal vent communities."
    ],
    expectedHealthImprovementPercent: 42
  },
  {
    oceanId: "atlantic",
    recoverable: true,
    estimatedRecoveryTimeYears: 18,
    requiredCleanupTons: 680000,
    wasteReductionPercent: 75,
    conservationSteps: [
      "Establish active drone-monitored corridor patrols spanning the Caribbean coral arches.",
      "Establish deep sediment filters targeting historical chemical deposits on the mid-ocean shelf.",
      "Fund massive local estuary preservation programs around commercial shipping outlets."
    ],
    governmentMeasures: [
      "Formally ratify the Atlantic Sanctuary Pact outlawing deep-benthic mining operations.",
      "Subsidize local fisheries that actively retrieve and log floating ocean garbage modules."
    ],
    industrialRegulations: [
      "AquaChem Corp and shipping groups must utilize advanced physical and thermal double-containment cells.",
      "Strict real-time chemical tracking of industrial runoffs from the eastern seaboard."
    ],
    marineProtectionActions: [
      "Deploy sound-dampening acoustic arrays to protect migration corridors from intense shipping noise.",
      "Establish micro-reserve regions surrounding deep cold-water Lophelia coral structures."
    ],
    expectedHealthImprovementPercent: 35
  },
  {
    oceanId: "arctic",
    recoverable: false,
    criticalWarning: "EMERGENCY: ICE RETREAT VECTOR HAS ACCELERATED BEYOND STABILIZATION LIMITS",
    emergencyMeasures: [
      "Deploy immediate satellite-guided containment networks targeting heavy microplastic flows.",
      "Suspend all commercial maritime traffic passing through high-density research channels during summer melting windows.",
      "Coordinate high-altitude heat-deflection testing to preserve core benthic cold-climes."
    ],
    longTermRecoveryPlan: "With the irreversible melting of multi-year pack ice, the Arctic basin is transitioning from a sub-zero cryospheric biome to an open pelagic basin. Long-term recovery is centered entirely on mitigating extreme toxic bioaccumulation during this severe ecosystem turnover.",
    suggestedConservationZones: [
      "Fram Strait Deep-Sea Migration Highway",
      "Lomonosov Ridge Cold-Seep Sanctuaries"
    ],
    priorityRegions: [
      "Beaufort Sea Core Sediment Layer",
      "Svalbard Inshore Cold Corals"
    ]
  }
];

export const waterReuseAssessments: WaterReuseAssessment[] = [
  { application: "Agriculture & Crop Irrigation", treatmentLevel: "Tertiary Filtration & Activated Carbon", safetyRating: "Excellent", estimatedCostUsdPerM3: 0.42, suitabilityScore: 92 },
  { application: "Groundwater Recharge", treatmentLevel: "Reverse Osmosis & UV Desalination", safetyRating: "Excellent", estimatedCostUsdPerM3: 0.68, suitabilityScore: 88 },
  { application: "Industrial Cooling Loops", treatmentLevel: "Primary Filtration & Corrosive Neutralization", safetyRating: "Good", estimatedCostUsdPerM3: 0.15, suitabilityScore: 85 },
  { application: "Marine Aqua-Farming", treatmentLevel: "Heavy-Metal Precipitation & Deoxygenation", safetyRating: "Conditional", estimatedCostUsdPerM3: 0.55, suitabilityScore: 68 },
  { application: "Public Hydro-Cleaning", treatmentLevel: "Flocculation & Basic Sand Filtration", safetyRating: "Good", estimatedCostUsdPerM3: 0.22, suitabilityScore: 78 },
  { application: "Human Potable Consumption", treatmentLevel: "Advanced Multistage Membrane Distillation", safetyRating: "Excellent", estimatedCostUsdPerM3: 1.12, suitabilityScore: 95 }
];

export const pollutionSourcesData: Record<string, PollutionSource[]> = {
  pacific: [
    { industry: "Plastic Manufacturing", confidencePercent: 94, detectedWasteMatch: "High-Density PET bottles, microplastics, food containers", pollutionContributionPercent: 35, environmentalImpact: "Severe benthic blockage. Microplastics ingested by filter feeders, halting calcium synthesis." },
    { industry: "Commercial Fishing", confidencePercent: 88, detectedWasteMatch: "Nylon ghost nets, heavy traps, biological dredging cables", pollutionContributionPercent: 24, environmentalImpact: "Active physical entrapment of whales, dolphins, and sharks. Devastating reef fracturing." },
    { industry: "Shipping & Freight", confidencePercent: 85, detectedWasteMatch: "Acoustic noise, container loss debris, metal canisters", pollutionContributionPercent: 18, environmentalImpact: "Acoustic disruptions causing marine mammal disorientations. Mechanical shoreline scouring." },
    { industry: "Oil & Gas Exploration", confidencePercent: 92, detectedWasteMatch: "Crude hydrocarbons, hydraulic fract-fluid residues", pollutionContributionPercent: 12, environmentalImpact: "Chemical toxicity poisoning plankton communities. Lethal respiratory barrier on cetaceans." },
    { industry: "Chemical Industry", confidencePercent: 90, detectedWasteMatch: "PFAS compounds, Lead particulates, Cadmium traces", pollutionContributionPercent: 11, environmentalImpact: "Permanent carcinogenic bioaccumulation at higher trophic layers." }
  ],
  atlantic: [
    { industry: "Shipping & Freight", confidencePercent: 96, detectedWasteMatch: "Thermal exhausts, toxic container loss scrap, cargo residue", pollutionContributionPercent: 32, environmentalImpact: "Extreme acoustic stress vectors. Nearshore chemical contamination." },
    { industry: "Plastic Manufacturing", confidencePercent: 91, detectedWasteMatch: "Polystyrene containers, synthetic fibers, chemical additives", pollutionContributionPercent: 28, environmentalImpact: "Massive plastic mass accumulation in the Sargasso convergence zones." },
    { industry: "Chemical Industry", confidencePercent: 94, detectedWasteMatch: "Lead particulates, Mercury salts, Nitrate runoffs", pollutionContributionPercent: 22, environmentalImpact: "Hypoxic water layer depletion causing massive pelagic suffocation." },
    { industry: "Commercial Fishing", confidencePercent: 82, detectedWasteMatch: "Longlines, monofilament nets, lead weights", pollutionContributionPercent: 12, environmentalImpact: "Bycatch depletion of critically endangered Atlantic sea turtles." },
    { industry: "Coastal Tourism", confidencePercent: 78, detectedWasteMatch: "Suntan oil components, micro-debris, sanitary wastes", pollutionContributionPercent: 6, environmentalImpact: "Destruction of shallow coastal nurseries, accelerating coral bleaching." }
  ]
};

export const aiReports: Record<string, AIReport> = {
  pacific: {
    oceanId: "pacific",
    condition: "The Pacific Basin is experiencing a high-density waste concentration vector, primarily focused in the North Pacific Subtropical Gyre. While deep benthic layers remain relatively temperature-stable, the epipelagic layer shows unprecedented chemical load spikes.",
    futurePrediction: "Without autonomous microplastic filtration intervention, pelagic trophic systems risk collapse within 25 years. Coral calcification in the southern margins will decline by an estimated 42%.",
    mainPollutants: ["High-Density PET Bottle Fragments", "GPS-Untraceable Nylon Ghost Nets", "Forever Chemicals (PFAS)"],
    chemicalRisks: ["Mercury concentration in apex fish species is 8x safe limits", "PFAS compounds disrupting hormonal development in cetaceans"],
    recoveryPossibility: "HIGH. If waste-generation input is reduced by 65% and solar-filtration arrays are deployed within 36 months, the ecosystem is projected to recover completely within 12 years.",
    biodiversityStatus: "Critically compromised in transition corridors, yet highly resilient in deep abyssal hydrothermal trenches.",
    suggestedActions: [
      "Execute rapid deploy sequence for solar filtration booms in sector 4.",
      "Enforce automatic GPS-tracking transponders on all commercial fishing nets.",
      "Sponsor localized mineral-drip deployments near damaged shallow coral networks."
    ]
  },
  atlantic: {
    oceanId: "atlantic",
    condition: "The Atlantic Ocean is undergoing severe structural stress. High shipping traffic density is creating extreme acoustic disturbances, whilst industrial chemical runoff from coastal boundaries has saturated mid-depth pelagic zones.",
    futurePrediction: "Acoustic navigation corridors for blue whales will be entirely disrupted by 2032. Benthic deep water coral clusters will face a 55% mortality rate from sediment chemical toxicity.",
    mainPollutants: ["Industrial Heavy Chemical Leaches", "Monofilament Ghost Trawling Lines", "Polystyrene Micro-particles"],
    chemicalRisks: ["Nitrate dead-zones expanding across 15,000 sq km", "Lead sedimentation poisoning core deep reef zones"],
    recoveryPossibility: "MODERATE. Heavy ship sound-dampening modifications combined with strict industrial effluent regulation will yields a 35% improvement index over 18 years.",
    biodiversityStatus: "Severe depletion in commercial species, but key micro-refuges are thriving along the Mid-Atlantic Ridge.",
    suggestedActions: [
      "Instate acoustic shipping speed-limits across migration paths.",
      "Deploy deep sediment carbon-filters targeting major estuarine outfalls.",
      "Instate complete moratoriums on commercial bottom-trawling along active banks."
    ]
  }
};

export const speciesData: Species[] = [
  {
    id: "sperm_whale",
    name: "Sperm Whale",
    scientificName: "Physeter macrocephalus",
    category: "whales",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBijx3FkTUCUqgiGgWmx9W9cOmxI4IbS3vo87_RyPYsLNHAS2yxObG94j56Ap0coboE6RY98SrCnnWILvtLTBc0KE3CdALEHVzQyfCQXgc133tLmd_qCspWmBVrPQSCc7X_JpXaZ2vs8lzCQRuKr4sOzFSrEgjDfrLiWZNImKvaHYHmJrj7y_1HHtCRYrU9jgckTLLcpYNf-ycxHwwwvkgENF1KooJ7ivCbODnsmOi1xIAdGLofNUqO",
    depthRangeM: "0 - 2,250m",
    diet: "Giant Squid, Octopus, Deep-Sea Benthic Fish",
    habitat: "Global Pelagic Waters, Deep Ocean Canyons",
    conservationStatus: "Vulnerable",
    threatLevel: "Medium",
    facts: [
      "Possesses the largest brain of any creature to ever exist on Earth, weighing up to 9 kilograms.",
      "Communicates via 'codas'—complex clicking patterns that function as distinct cultural dialects.",
      "Can hold its breath for over 90 minutes to hunt deep within the bathypelagic zone."
    ]
  },
  {
    id: "whale_shark",
    name: "Whale Shark",
    scientificName: "Rhincodon typus",
    category: "sharks",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Vc6yWMk9qaQxVJiNPErStOOJGKyqFmXqqbYN1DEH-SR0hkpKpJ3OcDQd71fCz7VOnW5ewNyWm_5pnt0upTRWiwMsp8Qtg9ugHjFHLOEOBIWj0km98_xb7uFoAmpsmNBl2Imx0y-Qb9mgmOXdcZ8ktCVoEmBNOtm1CFAw8eTqjSJ1dzEinZEAzteyl5JkbrEGdlK6WsvQZN9ISKVf_arv1-nAKmEZKzVyxf61lD7ZuzfOF8868oMe",
    depthRangeM: "0 - 1,900m",
    diet: "Plankton, Krill, Small Nektonic Fish, Squid",
    habitat: "Warm Tropical Oceans, Coastal Feeding Channels",
    conservationStatus: "Endangered",
    threatLevel: "High",
    facts: [
      "The largest living fish species in the world, growing up to 18.8 meters in length.",
      "Each individual has a completely unique pattern of white spots, functioning like a human fingerprint.",
      "Despite their colossal size, their throats are only the size of a quarter, feeding purely via passive filtration."
    ]
  },
  {
    id: "atolla_jelly",
    name: "Midnight Pulsar",
    scientificName: "Atolla wyvillei",
    category: "deepsea",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw--UASnsvon79csJa0tfJs_9VHQfI0YXMgz3klOSLlwJCaYAjp1S60lsqQlUlljbv6hmBWwsmSSJcSOuq5wTbAoUvcuv3Pv3_6nnN0JZbMWYTGPUXH92y8Ji5Vg19B2n_Bexz5IxY7zIr2au0M36hd-KClcMzIyNmDnMSM0gghUyABvGlUEdWKrmKZ8Jg0XqwOvdLf-9S5pzoVi1CoVRya-synWmB_MWKVLV7L9TjrM-qbSIxoRSA",
    depthRangeM: "1,000 - 4,000m",
    diet: "Small Crustaceans, Plankton, Marine Snow",
    habitat: "Bathypelagic & Abyssal Dark Zones",
    conservationStatus: "Least Concern",
    threatLevel: "Low",
    facts: [
      "Emits an intense bioluminescent 'burglar alarm' flash when captured, meant to attract larger predators to eat its attacker.",
      "Has one single long trailing tentacle used exclusively to snare passing deep-sea prey.",
      "Resides in the absolute darkness of the midnight zone where it is invisible to non-bioluminescent organisms."
    ]
  },
  {
    id: "ghost_coral",
    name: "Deep Sea Ghost Coral",
    scientificName: "Lophelia pertusa",
    category: "corals",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcR_kZ50FOFMwIz2T21AapzTLdiq0iwVbrAkgaWELZ_C_kul3XItjDcS0-ZC1BjNLpAlDTUPTIwbbneL_pUB2Ug2tI3WnX9deBNXuv3swtN9XbMTODB_dY9Ss6ep-KTje4G4BOztNNLirfsIpJuAbBH7xLH2MGUG_3iRJyuOJu_TLYhDSKlPX0wpbcQ9wqdoWyKnJaXdUm4sNJ9kgk_w59jwAHAcv4g6y7pFNEUGbjrqrZXaPe3mSp",
    depthRangeM: "200 - 1,500m",
    diet: "Organic Detritus, Zooplankton",
    habitat: "Cold Bathyal Sills, Rocky Deep Ocean Slabs",
    conservationStatus: "Vulnerable",
    threatLevel: "Critical",
    facts: [
      "Cold-water corals that thrive in complete darkness, lacking any symbiotic algae (zooxanthellae).",
      "Grows at an extremely slow rate of 4-10 millimeters per year; some colonies are over 6,000 years old.",
      "Highly susceptible to ocean acidification, which literally dissolves their skeletal structure."
    ]
  },
  {
    id: "great_white",
    name: "Great White Shark",
    scientificName: "Carcharodon carcharias",
    category: "sharks",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2hbkHrPyAqsFjpQfidhmz_hMyB-qmLBgePQJW4uDLxqFuxsA1G6CHOld-5iqmmGveSbpUPgCZUb8-7r37hJt6zgObuZQqsL3yckZC5PtkJcD7Q3P-LQWkr9TewRYwy-OKc4D19pxQLLYzcp_rTvobuT3RQrNqmM8WznJAi_GfJ1RZQc5naokXL92PMry2gV7_lI0eCd7PfAobaOcTf3hILDTD-VBsHC6EMg5UUthpMvAply_-DR6o",
    depthRangeM: "0 - 1,200m",
    diet: "Seals, Sea Lions, Tuna, Smaller Cetaceans",
    habitat: "Temperate Inshore Coastal Waters, Open Sea",
    conservationStatus: "Vulnerable",
    threatLevel: "Medium",
    facts: [
      "Equipped with the Ampullae of Lorenzini, electroreceptors that can detect a heartbeat from miles away.",
      "Can accelerate up to 40 miles per hour and breach completely out of the water while hunting.",
      "Maintains a body temperature warmer than the surrounding water, allowing high-performance hunting in cold depths."
    ]
  },
  {
    id: "giant_squid",
    name: "Giant Squid",
    scientificName: "Architeuthis dux",
    category: "deepsea",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgAYW4HMQI7jUfHSEDFwYoyNV5-Ct609UwhBp_Lu-ExNBO1akmrFBi71qHd2xyjHg4u6pHbWRd8O_nS3C1tIT8optkG2uZJ6Ozg2gYa1rGS9ZBK3srrWEh2FFZ5e28wJcOwrE_t0nHMGh5rfEQEOfbe5lWMW8OlD-XJINcarxKbHDtYjly-annur-5SzRXf3cyRjQ_wD-438qRBQU0fGHtkG_n0p3KSSQECc4V6FVv7oRCw7Up_k3u",
    depthRangeM: "300 - 1,000m",
    diet: "Deep-Sea Fish, Other Squid",
    habitat: "Continental Slopes & Pelagic Ocean Depths",
    conservationStatus: "Least Concern",
    threatLevel: "Low",
    facts: [
      "Possesses the largest eyes in the animal kingdom, measuring up to 27 centimeters across to detect bioluminescent flashes.",
      "Fierce combatant of the sperm whale; squid sucker scars are commonly found on whale hide.",
      "Uses a razor-sharp beak capable of shredding thick biological tissue effortlessly."
    ]
  }
];

export const globalStats: GlobalStats = {
  plasticRemovedKg: 14205842,
  speciesProtected: 124050,
  ghostNetsFound: 38405,
  illegalFishingCasesReported: 912,
  oilSpillsDetected: 147,
  coralsRestored: 245000,
  marineMissionsCompleted: 154
};

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "2020",
    title: "ABYSS Foundation",
    description: "ABYSS Deep Sea Exploration Co. founded by marine scientists and roboticists to design deep-ocean biological monitoring systems.",
    status: "completed"
  },
  {
    year: "2021",
    title: "Mariana Sweep Node 1",
    description: "Deployed the first active deep-sea sonar surveillance node at 8,200m depth, sending real-time thermal telemetry.",
    status: "completed"
  },
  {
    year: "2022",
    title: "Project GhostNet Launch",
    description: "Partnered with coastal communities to locate, retrieve, and recycle 15,000 tons of abandoned commercial ghost fishing gear.",
    status: "completed"
  },
  {
    year: "2024",
    title: "AI Synthesis Integration",
    description: "Integrated the ABYSS Intelligence Core to automatically ingest telemetry, chemical logs, and predict benthic recovery patterns.",
    status: "ongoing"
  },
  {
    year: "2026",
    title: "Autonomous Micro-Filtration Fleet",
    description: "Deploying 120 autonomous solar-filtration booms into the Pacific gyre convergence points to absorb floating micro-resins.",
    status: "ongoing"
  },
  {
    year: "2028",
    title: "Global Ocean Sanctuary Protocol",
    description: "Aiming to formalize binding international satellite-enforced protections over all 5 core deep-sea basins.",
    status: "future"
  }
];
