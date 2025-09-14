// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    // The translations
    resources: {
      en: {
        translation: {
          // English translations
          homeTitle: "Smart Tourist Safety System",
          homeSubtitle: "Select your role to continue",
          touristPortal: "Tourist Portal",
          touristPortalDesc: "Access your digital ID, safety score, and emergency services.",
          authorityDashboard: "Authority Dashboard",
          authorityDashboardDesc: "Monitor tourist activity, view alerts, and manage incidents.",
          safetyScoreTitle: "Your Safety Score",
          safetyScoreDesc: "This score is based on your itinerary and current location sensitivity. High score means you are in a safe zone.",
          panicButtonDesc: "Press in case of emergency. Your location will be shared instantly.",
        }
      },
      hi: {
        translation: {
          // Hindi translations
          homeTitle: "स्मार्ट टूरिस्ट सेफ्टी सिस्टम",
          homeSubtitle: "जारी रखने के लिए अपनी भूमिका चुनें",
          touristPortal: "पर्यटक पोर्टल",
          touristPortalDesc: "अपनी डिजिटल आईडी, सुरक्षा स्कोर और आपातकालीन सेवाओं तक पहुँचें।",
          authorityDashboard: "प्राधिकरण डैशबोर्ड",
          authorityDashboardDesc: "पर्यटक गतिविधि की निगरानी करें, अलर्ट देखें और घटनाओं का प्रबंधन करें।",
          safetyScoreTitle: "आपका सुरक्षा स्कोर",
          safetyScoreDesc: "यह स्कोर आपकी यात्रा योजना और वर्तमान स्थान की संवेदनशीलता पर आधारित है। उच्च स्कोर का मतलब है कि आप एक सुरक्षित क्षेत्र में हैं।",
          panicButtonDesc: "आपातकाल के मामले में दबाएँ। आपका स्थान तुरंत साझा किया जाएगा।",
        }
      }
    },
    fallbackLng: "en", // Use English if detected language is not available
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

export default i18n;