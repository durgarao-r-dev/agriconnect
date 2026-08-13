/* ============================================================
   AgriConnect — shared demo data
   In a real backend this would come from a database/API.
   Stored in localStorage so "admin edits" persist for the demo.
   ============================================================ */

const CROPS = [
  { id: "wheat", name: "Wheat", icon: "🌾", season: "Rabi (Oct–Mar)", soil: "Loamy, well-drained", water: "Medium", desc: "Staple cereal crop; needs cool growing season and warm, dry weather at harvest." },
  { id: "rice", name: "Rice", icon: "🌱", season: "Kharif (Jun–Nov)", soil: "Clayey, water-retentive", water: "High", desc: "Thrives in standing water; requires high humidity and a long frost-free period." },
  { id: "sugarcane", name: "Sugarcane", icon: "🎋", season: "Year-round (12–18 mo)", soil: "Deep, fertile loam", water: "High", desc: "Long-duration cash crop needing consistent irrigation and warm temperatures." },
  { id: "cotton", name: "Cotton", icon: "☁️", season: "Kharif (Apr–May sow)", soil: "Black cotton soil", water: "Medium", desc: "Cash crop sensitive to frost; needs a long, warm growing period with moderate rain." },
  { id: "maize", name: "Maize", icon: "🌽", season: "Kharif & Rabi", soil: "Well-drained loamy", water: "Medium", desc: "Versatile cereal grown in two seasons; sensitive to waterlogging." },
  { id: "tomato", name: "Tomato", icon: "🍅", season: "Year-round (zone dep.)", soil: "Sandy loam", water: "Medium", desc: "High-value vegetable crop; benefits from staking and consistent watering." },
  { id: "onion", name: "Onion", icon: "🧅", season: "Rabi & Kharif", soil: "Sandy loam, neutral pH", water: "Medium-Low", desc: "Bulb crop sensitive to day-length; stores well after proper curing." },
  { id: "potato", name: "Potato", icon: "🥔", season: "Rabi (Oct–Nov sow)", soil: "Loose, well-drained loam", water: "Medium", desc: "Tuber crop preferring cool weather; hilling protects tubers from sunlight." },
  { id: "soybean", name: "Soybean", icon: "🫘", season: "Kharif (Jun–Jul sow)", soil: "Well-drained loamy", water: "Medium", desc: "Nitrogen-fixing legume; good rotation crop for soil health." },
  { id: "groundnut", name: "Groundnut", icon: "🥜", season: "Kharif & summer", soil: "Sandy loam", water: "Low-Medium", desc: "Oilseed crop that fixes nitrogen; needs well-drained soil to prevent pod rot." },
];

const MARKET_PRICES = [
  { crop: "Wheat", market: "Pune APMC", price: 2380, trend: "up", updated: "Today, 7:10 AM" },
  { crop: "Rice (Basmati)", market: "Karnal Mandi", price: 4120, trend: "up", updated: "Today, 6:45 AM" },
  { crop: "Onion", market: "Lasalgaon Mandi", price: 1850, trend: "down", updated: "Today, 7:00 AM" },
  { crop: "Tomato", market: "Pune APMC", price: 1420, trend: "down", updated: "Today, 7:10 AM" },
  { crop: "Potato", market: "Agra Mandi", price: 1180, trend: "flat", updated: "Today, 6:30 AM" },
  { crop: "Cotton", market: "Nagpur Mandi", price: 6850, trend: "up", updated: "Today, 6:50 AM" },
  { crop: "Soybean", market: "Indore Mandi", price: 4690, trend: "up", updated: "Today, 7:05 AM" },
  { crop: "Maize", market: "Davangere Mandi", price: 2010, trend: "flat", updated: "Yesterday, 5:40 PM" },
  { crop: "Groundnut", market: "Rajkot Mandi", price: 5980, trend: "down", updated: "Today, 6:55 AM" },
  { crop: "Sugarcane", market: "Kolhapur Mandi", price: 320, trend: "flat", updated: "Today, 7:00 AM" },
];

/* Services — each has an action type:
   "internal"  -> scrolls/navigates within the portal
   "external"  -> opens a real external resource in a new tab
*/
const SERVICES = [
  { name: "Weather Advisory", icon: "🌦️", desc: "Local forecasts to plan sowing, spraying, and harvest.", type: "external", target: "https://mausam.imd.gov.in/" },
  { name: "Soil Intelligence", icon: "🌱", desc: "District-wise soil types, crops, and biofertilizer guidance (farmer login).", type: "internal", target: "farmer-dashboard.html#soil" },
  { name: "Soil Health Card", icon: "🧪", desc: "Check or apply for your government soil health report.", type: "external", target: "https://soilhealth.dac.gov.in/" },
  { name: "Crop Insurance (PMFBY)", icon: "🛡️", desc: "Enroll in or check status of crop insurance schemes.", type: "external", target: "https://pmfby.gov.in/" },
  { name: "Government Schemes", icon: "🏛️", desc: "Subsidies, loans, and schemes for registered farmers.", type: "external", target: "https://www.myscheme.gov.in/" },
  { name: "Market Prices", icon: "📊", desc: "Jump to today's live mandi rates on this portal.", type: "internal", target: "#market" },
  { name: "Crop Directory", icon: "🌾", desc: "Browse sowing windows and soil needs by crop.", type: "internal", target: "#crops" },
  { name: "Farmer Helpline", icon: "📞", desc: "Talk to a support agent about any portal issue.", type: "internal", target: "#contact" },
  { name: "Soil Testing Labs", icon: "🔬", desc: "Find an accredited soil-testing lab near your district.", type: "external", target: "https://soilhealth.dac.gov.in/test-status" },
];
