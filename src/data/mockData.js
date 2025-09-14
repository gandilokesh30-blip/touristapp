// src/data/mockData.js
export const singleTourist = {
  id: "T12345",
  name: "Alice Johnson",
  kyc: "Passport: XZ987654",
  nationality: "USA",
  entryDate: "2023-11-15",
  exitDate: "2023-11-30",
  itinerary: ["Guwahati", "Shillong", "Cherrapunji"],
  emergencyContacts: [
    { name: "Bob Johnson (Husband)", phone: "+1-555-1234" },
    { name: "US Embassy", phone: "+91-11-2419-8000" },
  ],
  safetyScore: 85,
  currentLocation: { lat: 26.1445, lng: 91.7362 }, // Guwahati
  status: "Safe",
  isTrackingOn: true,
};

export const allTourists = [
  singleTourist,
  { id: "T67890", name: "Carlos Rossi", status: "Safe", safetyScore: 92, currentLocation: { lat: 25.5788, lng: 91.8933 } }, // Shillong
  { id: "T13579", name: "Mei Lin", status: "Alert", safetyScore: 45, currentLocation: { lat: 25.3006, lng: 91.7323 } }, // Cherrapunji (high-risk area)
  { id: "T24680", name: "John Smith", status: "Missing", safetyScore: 20, currentLocation: { lat: 26.18, lng: 91.75 } },
];

export const incidents = [
  { id: "I001", touristId: "T13579", type: "Geo-fence Breach", timestamp: "2023-11-18 14:30", location: "25.3006, 91.7323", status: "Pending" },
  { id: "I002", touristId: "T24680", type: "Prolonged Inactivity", timestamp: "2023-11-18 10:00", location: "26.18, 91.75", status: "Investigation Open" },
  { id: "I003", touristId: "T67890", type: "Panic Button", timestamp: "2023-11-17 18:00", location: "25.5788, 91.8933", status: "Resolved" },
];

export const highRiskZones = [
    { name: "Restricted Forest Area", center: { lat: 25.27, lng: 91.73 }, radius: 2000 },
    { name: "Landslide Prone Zone", center: { lat: 25.31, lng: 91.71 }, radius: 1500 },
];