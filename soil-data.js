/* ============================================================
   AgriConnect — Soil Intelligence data
   District → Soil → Crops / Biofertilizers / Management
   Static demo data for GitHub Pages (no backend).
   ============================================================ */

const SOIL_DISTRICTS = [
  {
    id: "ntr",
    name: "NTR",
    soils: [
      "dark-brown-clayey",
      "deep-reddish-brown",
      "shallow-gravelly-red",
      "calcareous-black",
      "deep-black-clayey",
      "dark-reddish-brown",
      "gravelly-red"
    ]
  },
  {
    id: "krishna",
    name: "Krishna",
    soils: ["black-clayey", "sandy-clay-loam", "red-loamy", "sandy"]
  },
  {
    id: "gudivada",
    name: "Gudivada",
    soils: ["black-clayey", "sandy-clay-loam", "red-loamy", "wet-silty"]
  },
  {
    id: "eluru",
    name: "Eluru",
    soils: [
      "deep-reddish-brown",
      "dark-brown-clayey",
      "deep-black-clayey",
      "calcareous-black",
      "shallow-gravelly-red",
      "calcareous-moist-clayey",
      "grassland",
      "dark-reddish-brown",
      "light-gray-deep-sandy"
    ]
  },
  {
    id: "guntur",
    name: "Guntur",
    soils: [
      "deep-reddish-brown",
      "dark-brown-clayey",
      "calcareous-black",
      "moderately-deep-black-clayey",
      "dark-reddish-brown",
      "shallow-gravelly-red",
      "wet-silty"
    ]
  }
];

const SOIL_TYPES = {
  "black-clayey": {
    id: "black-clayey",
    name: "Black / Black Clayey Soil",
    category: "Black Soil",
    description: "Deep black clayey soils with high clay content and excellent moisture retention. Common in Krishna and Gudivada regions.",
    waterRetention: "High",
    drainage: "Moderate to Poor",
    management: "Good moisture retention; avoid prolonged waterlogging except where paddy is intended.",
    crops: ["Paddy", "Cotton", "Maize", "Sugarcane", "Pulses", "Groundnut"],
    biofertilizers: ["Azospirillum / Azotobacter", "Rhizobium (for pulses)", "PSB", "KSB", "AMF"]
  },
  "calcareous-black": {
    id: "calcareous-black",
    name: "Calcareous Black Soil",
    category: "Black Soil",
    description: "Black soils with significant calcium carbonate that can influence nutrient availability.",
    waterRetention: "High",
    drainage: "Moderate",
    management: "Nutrient availability can be affected by high calcium/carbonate conditions. Soil testing is important.",
    crops: ["Paddy", "Cotton", "Maize", "Pulses", "Groundnut", "Chillies"],
    biofertilizers: ["PSB", "KSB", "Rhizobium", "Azospirillum", "AMF"]
  },
  "deep-reddish-brown": {
    id: "deep-reddish-brown",
    name: "Red Loamy / Deep Reddish-Brown Soil",
    category: "Red Soil",
    description: "Deep reddish-brown loamy to clayey soils with generally better drainage.",
    waterRetention: "Moderate",
    drainage: "Good",
    management: "Generally better drained. Organic matter and moisture management are important.",
    crops: ["Groundnut", "Pulses", "Maize", "Cotton", "Chillies", "Vegetables"],
    biofertilizers: ["Rhizobium", "PSB", "KSB", "AMF", "Azospirillum"]
  },
  "dark-brown-clayey": {
    id: "dark-brown-clayey",
    name: "Dark-Brown Clayey Soil",
    category: "Brown Soil",
    description: "Dark-brown clayey to gravelly-clayey soils common in several coastal Andhra districts.",
    waterRetention: "High",
    drainage: "Moderate",
    management: "Crop choice should follow drainage and irrigation conditions.",
    crops: ["Paddy", "Maize", "Cotton", "Pulses"],
    biofertilizers: ["Azospirillum", "Rhizobium", "PSB", "KSB"]
  },
  "sandy-clay-loam": {
    id: "sandy-clay-loam",
    name: "Sandy Clay-Loam Soil",
    category: "Loamy Soil",
    description: "Sandy clay-loam soils offering a balance of water retention and drainage.",
    waterRetention: "Moderate",
    drainage: "Moderate to Good",
    management: "Moderate water retention and drainage. Organic matter can improve soil quality.",
    crops: ["Paddy", "Maize", "Groundnut", "Pulses", "Vegetables"],
    biofertilizers: ["Azospirillum", "Rhizobium", "PSB", "KSB"]
  },
  "shallow-gravelly-red": {
    id: "shallow-gravelly-red",
    name: "Shallow Gravelly Red Soil",
    category: "Red Soil",
    description: "Shallow gravelly red soils with limited effective depth.",
    waterRetention: "Low to Moderate",
    drainage: "Good to Excessive",
    management: "Usually lower effective soil depth. Moisture conservation is important.",
    crops: ["Groundnut", "Pulses", "Millets"],
    biofertilizers: ["Rhizobium", "PSB", "AMF", "Azospirillum"]
  },
  "sandy": {
    id: "sandy",
    name: "Sandy Soil",
    category: "Sandy Soil",
    description: "Well-drained sandy soils with low water-holding capacity.",
    waterRetention: "Low",
    drainage: "Excellent",
    management: "Low water-holding capacity. Organic matter and irrigation management are important.",
    crops: ["Groundnut", "Vegetables", "Pulses"],
    biofertilizers: ["Azotobacter / Azospirillum", "PSB", "KSB", "AMF"]
  },
  "wet-silty": {
    id: "wet-silty",
    name: "Wet Silty / Alluvial-Type Soil",
    category: "Alluvial Soil",
    description: "Local alluvial and deltaic agricultural soils, often silty and associated with irrigated areas.",
    waterRetention: "High",
    drainage: "Variable",
    management: "Manage drainage and avoid nutrient losses in flooded or highly irrigated fields.",
    crops: ["Paddy", "Pulses", "Vegetables"],
    biofertilizers: ["Azospirillum", "Rhizobium", "PSB"]
  },
  "dark-reddish-brown": {
    id: "dark-reddish-brown",
    name: "Dark Reddish-Brown Soil",
    category: "Red Soil",
    description: "Dark reddish-brown soils found across multiple districts in the region.",
    waterRetention: "Moderate",
    drainage: "Good",
    management: "Organic matter addition and balanced nutrient management support productivity.",
    crops: ["Groundnut", "Pulses", "Maize", "Cotton", "Chillies"],
    biofertilizers: ["Rhizobium", "PSB", "KSB", "AMF", "Azospirillum"]
  },
  "deep-black-clayey": {
    id: "deep-black-clayey",
    name: "Deep Black Clayey Soil",
    category: "Black Soil",
    description: "Deep black clayey soils with strong moisture-holding properties.",
    waterRetention: "Very High",
    drainage: "Poor to Moderate",
    management: "Suitable for moisture-loving crops; manage waterlogging carefully.",
    crops: ["Paddy", "Cotton", "Maize", "Sugarcane", "Pulses"],
    biofertilizers: ["Azospirillum", "Rhizobium", "PSB", "KSB", "AMF"]
  },
  "gravelly-red": {
    id: "gravelly-red",
    name: "Gravelly Red Soil",
    category: "Red Soil",
    description: "Gravelly red soils with variable depth and drainage.",
    waterRetention: "Low to Moderate",
    drainage: "Good",
    management: "Moisture conservation and organic matter are key for better yields.",
    crops: ["Groundnut", "Pulses", "Millets"],
    biofertilizers: ["Rhizobium", "PSB", "AMF"]
  },
  "calcareous-moist-clayey": {
    id: "calcareous-moist-clayey",
    name: "Calcareous Moist Clayey Soil",
    category: "Black Soil",
    description: "Calcareous clayey soils that remain moist for longer periods.",
    waterRetention: "High",
    drainage: "Moderate",
    management: "Monitor nutrient availability; soil testing recommended.",
    crops: ["Paddy", "Cotton", "Maize", "Pulses"],
    biofertilizers: ["PSB", "KSB", "Rhizobium", "Azospirillum"]
  },
  "grassland": {
    id: "grassland",
    name: "Grassland Soil",
    category: "Other",
    description: "Soils associated with grassland areas; suitability depends on local conditions.",
    waterRetention: "Variable",
    drainage: "Variable",
    management: "Assess local conditions and prefer drought-tolerant or adapted crops.",
    crops: ["Millets", "Pulses", "Groundnut"],
    biofertilizers: ["Rhizobium", "PSB", "AMF"]
  },
  "light-gray-deep-sandy": {
    id: "light-gray-deep-sandy",
    name: "Light-Gray Deep Sandy Soil",
    category: "Sandy Soil",
    description: "Light-gray deep sandy soils with good drainage but lower fertility and water retention.",
    waterRetention: "Low",
    drainage: "Excellent",
    management: "Focus on organic matter, irrigation, and nutrient management.",
    crops: ["Groundnut", "Vegetables", "Pulses"],
    biofertilizers: ["Azotobacter / Azospirillum", "PSB", "KSB"]
  },
  "moderately-deep-black-clayey": {
    id: "moderately-deep-black-clayey",
    name: "Moderately Deep Black Clayey Soil",
    category: "Black Soil",
    description: "Moderately deep black clayey soils common in parts of Guntur.",
    waterRetention: "High",
    drainage: "Moderate",
    management: "Good for a range of field crops; manage irrigation carefully.",
    crops: ["Paddy", "Cotton", "Maize", "Pulses", "Chillies"],
    biofertilizers: ["Azospirillum", "Rhizobium", "PSB", "KSB"]
  },
  "red-loamy": {
    id: "red-loamy",
    name: "Red Loamy Soil",
    category: "Red Soil",
    description: "Red loamy soils with moderate fertility and good workability.",
    waterRetention: "Moderate",
    drainage: "Good",
    management: "Organic matter and balanced fertilization improve performance.",
    crops: ["Groundnut", "Pulses", "Maize", "Cotton", "Chillies", "Vegetables"],
    biofertilizers: ["Rhizobium", "PSB", "KSB", "AMF", "Azospirillum"]
  }
};

const SOIL_DISCLAIMER =
  "These recommendations are general guidelines based on soil type and regional agricultural information. Actual crop and biofertilizer suitability may vary depending on soil pH, salinity, nutrient status, irrigation, climate and local conditions. For more accurate recommendations, farmers should use a soil test and consult appropriate agricultural experts.";
