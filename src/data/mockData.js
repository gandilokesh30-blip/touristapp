// src/data/mockData.js

// --- Local Image Imports ---
import pangongLakeImg from '../assets/lak.png';
import valleyOfFlowersImg from '../assets/flowers.png';
import goldenTempleImg from '../assets/goden.png';
import gatewayOfIndiaImg from '../assets/gate.png';
import keralaBackwatersImg from '../assets/waters.png'; 

// --- Data for Tourist Dashboard ---
export const singleTourist = {
  id: "T12345",
  name: "Alice Johnson",
  kyc: "Passport: XZ987654",
  nationality: "USA",
  itinerary: ["Guwahati", "Shillong", "Kaziranga National Park"], 
  emergencyContacts: [
    { name: "Bob Johnson (Husband)", phone: "+1-555-1234" },
    { name: "US Embassy", phone: "+91-11-2419-8000" },
  ],
  safetyScore: 85,
  currentLocation: { lat: 26.1445, lng: 91.7362 }, // Guwahati
  status: "Safe",
  isTrackingOn: true,
};

// --- Data for Police Dashboard ---
export const allTourists = [
  singleTourist,
  { id: "T67890", name: "Carlos Rossi", status: "Safe", safetyScore: 92, currentLocation: { lat: 25.5788, lng: 91.8933 } },
  { id: "T13579", name: "Mei Lin", status: "Alert", safetyScore: 45, currentLocation: { lat: 25.3006, lng: 91.7323 } },
  { id: "T24680", name: "John Smith", status: "Missing", safetyScore: 20, currentLocation: { lat: 26.18, lng: 91.75 } },
];

export const incidents = [
  { id: "I001", touristId: "T13579", type: "Geo-fence Breach", timestamp: "2023-11-18 14:30", location: "25.3006, 91.7323", status: "Pending", priority: "High" },
  { id: "I002", touristId: "T24680", type: "Prolonged Inactivity", timestamp: "2023-11-18 10:00", location: "26.18, 91.75", status: "Acknowledged", priority: "Medium" },
  { id: "I003", touristId: "T67890", type: "Panic Button", timestamp: "2023-11-17 18:00", location: "25.5788, 91.8933", status: "Resolved", priority: "Critical" },
];

// === THIS IS THE MISSING PART THAT FIXES THE ERROR ===
// Ensure this variable exists and has the 'export' keyword.
export const highRiskZones = [
    { name: "Restricted Forest Area", center: { lat: 25.27, lng: 91.73 }, radius: 2000 },
    { name: "Landslide Prone Zone", center: { lat: 25.31, lng: 91.71 }, radius: 1500 },
];
// =======================================================

// --- Data for Explore Page ---
export const destinations = [
  { id: 1, name: "Taj Mahal", location: "Agra, Uttar Pradesh", description: "An immense mausoleum of white marble, a monument of love.", imageUrl: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg", coords: { lat: 27.1751, lng: 78.0421 }, queryTerm: "Taj Mahal Agra India" },
  { id: 2, name: "Pangong Lake", location: "Ladakh", description: "A stunning high-altitude lake that changes colors with the sky.", imageUrl: pangongLakeImg, coords: { lat: 33.7535, lng: 78.6633 }, queryTerm: "Pangong Lake Ladakh" },
  { id: 3, name: "Kerala Backwaters", location: "Kerala", description: "A serene network of lagoons, lakes, and canals.", imageUrl: keralaBackwatersImg, coords: { lat: 9.9700, lng: 76.2800 }, queryTerm: "Kerala Backwaters houseboat" },
  { id: 4, name: "Valley of Flowers", location: "Uttarakhand", description: "A vibrant national park, known for its meadows of endemic alpine flowers.", imageUrl: valleyOfFlowersImg, coords: { lat: 30.7266, lng: 79.6053 }, queryTerm: "Valley of Flowers National Park Uttarakhand" },
  { id: 5, name: "Golden Temple", location: "Amritsar, Punjab", description: "The holiest Gurdwara and the most important pilgrimage site of Sikhism.", imageUrl: goldenTempleImg, coords: { lat: 31.6200, lng: 74.8765 }, queryTerm: "Golden Temple Amritsar" },
  { id: 6, name: "Gateway of India", location: "Mumbai, Maharashtra", description: "An arch-monument built in the early 20th century, located on the waterfront.", imageUrl: gatewayOfIndiaImg, coords: { lat: 18.9220, lng: 72.8347 }, queryTerm: "Gateway of India Mumbai" }
];

// --- Data for New Tourist Dashboard Features ---
export const emergencyContactsDb = {
  "Guwahati": [
    { name: "Tourist Police Guwahati", phone: "1800-345-3123" },
    { name: "Guwahati Medical College Hospital", phone: "+91-361-245-0567" },
    { name: "State Disaster Management", phone: "1077" }
  ],
  "Shillong": [
    { name: "Tourist Police Shillong", phone: "1800-345-3124" },
    { name: "NEIGRIHMS Hospital", phone: "+91-364-253-8012" },
    { name: "Meghalaya State Emergency", phone: "108" }
  ]
};

export const culturalTipsDb = {
  "Assam": {
    greeting: "Namaskar",
    etiquette: "It is polite to remove your shoes before entering someone's home. A small gift is often appreciated when visiting.",
    dressCode: "Modest clothing is recommended, especially when visiting religious sites like temples (Sattras)."
  },
  "Meghalaya": {
    greeting: "Kumno?",
    etiquette: "Respect for elders is highly valued. The Khasi society is matrilineal, with lineage and inheritance traced through women.",
    dressCode: "While modern in cities, conservative dress is appreciated in rural villages. Carry a shawl for versatility."
  }
};