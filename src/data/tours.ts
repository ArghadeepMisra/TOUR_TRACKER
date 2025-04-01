// src/data/tours.ts

// Use 'import type' for types used only during type checking in this file
import type { TourDetailsData, ActiveTour, TourCategory } from '../types';

// --- Centralized Tour Data Store ---
// This data structure maps tour IDs to their detailed information.
const allTourDetails: Record<string, TourDetailsData> = {
  "aurasoundx1": {
    id: "aurasoundx1",
    iemName: "AuraSound X1 Prototype",
    tourData: [
      { userId: "johndoe88", user: "John Doe", location: "New York, USA", arrivalDate: "2024-01-15", dispatchDate: "2024-01-25", conditionReported: "Good", reviewStatus: "Completed" },
      { userId: "smithy", user: "Jane Smith", location: "London, UK", arrivalDate: "2024-02-01", dispatchDate: "2024-02-10", conditionReported: "Good", reviewStatus: "Completed" },
      { userId: "kenji_t", user: "Kenji Tanaka", location: "Tokyo, JP", arrivalDate: "2024-02-18", dispatchDate: "2024-02-28", conditionReported: "Cosmetic Damage", reviewStatus: "Completed" },
      { userId: "m_garcia", user: "Maria Garcia", location: "Madrid, ES", arrivalDate: "2024-03-05", dispatchDate: "2024-03-15", conditionReported: "Cosmetic Damage", reviewStatus: "In Progress" },
      { userId: "anil_k", user: "Anil Kumar", location: "Mumbai, IN", arrivalDate: "2024-03-22", dispatchDate: null, conditionReported: "Not Reported Yet", reviewStatus: "Pending" }
    ]
  },
  "noble-katana": {
    id: "noble-katana",
    iemName: "Noble Audio Katana",
    tourData: [
      { userId: "user_de", user: "Hans Müller", location: "Berlin, DE", arrivalDate: "2024-03-01", dispatchDate: "2024-03-10", conditionReported: "Good", reviewStatus: "Completed" },
      { userId: "user_fr", user: "Sophie Dubois", location: "Paris, FR", arrivalDate: "2024-03-15", dispatchDate: "2024-03-25", conditionReported: "Good", reviewStatus: "Pending" },
      { userId: "user_it", user: "Luca Rossi", location: "Rome, IT", arrivalDate: "2024-04-01", dispatchDate: null, conditionReported: "Not Reported Yet", reviewStatus: "Pending" }
    ]
  },
  "moondrop-s8": {
    id: "moondrop-s8",
    iemName: "Moondrop S8",
    tourData: [
      { userId: "user_us_ca", user: "Mike Jones", location: "Los Angeles, CA", arrivalDate: "2024-02-20", dispatchDate: "2024-03-01", conditionReported: "Cosmetic Damage", reviewStatus: "Completed" },
      { userId: "user_ca_on", user: "Emily White", location: "Toronto, ON", arrivalDate: "2024-03-08", dispatchDate: null, conditionReported: "Not Reported Yet", reviewStatus: "Pending" }
    ]
  },
  "sony-ierz1r": {
    id: "sony-ierz1r",
    iemName: "Sony IER-Z1R",
    tourData: [] // Tour hasn't started
  },
  "hd800s-tour": { // Added detail data for headphones
    id: "hd800s-tour",
    iemName: "Sennheiser HD 800 S",
    tourData: [
        { userId: "user_us_ny", user: "Alice Brown", location: "New York, NY", arrivalDate: "2024-03-10", dispatchDate: null, conditionReported: "Not Reported Yet", reviewStatus: "Pending" }
    ]
  },
  "chord-mojo2": { // Added detail data for DAC
    id: "chord-mojo2",
    iemName: "Chord Mojo 2",
    tourData: [
        { userId: "user_gb_lon", user: "David Wilson", location: "London, UK", arrivalDate: "2024-03-15", dispatchDate: null, conditionReported: "Not Reported Yet", reviewStatus: "Pending" }
    ]
  },
  "ifi-gryphon": { // Added detail data for Amp
     id: "ifi-gryphon",
     iemName: "iFi xDSD Gryphon",
     tourData: [
        { userId: "user_de_ber", user: "Klaus Schmidt", location: "Berlin, DE", arrivalDate: "2024-03-20", dispatchDate: null, conditionReported: "Not Reported Yet", reviewStatus: "Pending" }
     ]
  },
  "astell-kern-sp2k": { // Added detail data for DAP
      id: "astell-kern-sp2k",
      iemName: "Astell&Kern SP2000T",
      tourData: [
        { userId: "user_kr_seo", user: "Min-jun Kim", location: "Seoul, KR", arrivalDate: "2024-03-25", dispatchDate: null, conditionReported: "Not Reported Yet", reviewStatus: "Pending" }
      ]
  }
};

// --- Data for the Main Tour List Page ---
// This array holds summary information for tours displayed on the landing page.
const activeTours: ActiveTour[] = [
  { tourId: "aurasoundx1", iemName: "AuraSound X1 Prototype", category: "IEM", imageUrl: "https://placehold.co/400x250/1e1e1e/e0e0e0?text=AuraSound+X1", currentLocation: "India", countries: ["US", "GB", "JP", "ES", "IN"] },
  { tourId: "noble-katana", iemName: "Noble Audio Katana", category: "IEM", imageUrl: "https://placehold.co/400x250/1e1e1e/e0e0e0?text=Noble+Katana", currentLocation: "Italy", countries: ["DE", "FR", "IT", "CH", "GB"] },
  { tourId: "moondrop-s8", iemName: "Moondrop S8", category: "IEM", imageUrl: "https://placehold.co/400x250/1e1e1e/e0e0e0?text=Moondrop+S8", currentLocation: "Canada", countries: ["US", "CA", "MX"] },
  { tourId: "sony-ierz1r", iemName: "Sony IER-Z1R", category: "IEM", imageUrl: null, currentLocation: "Not Started", countries: ["AU", "NZ", "SG", "MY"] },
  { tourId: "hd800s-tour", iemName: "Sennheiser HD 800 S", category: "Headphone", imageUrl: "https://placehold.co/400x250/1e1e1e/e0e0e0?text=HD+800S", currentLocation: "USA", countries: ["US", "CA"] },
  { tourId: "chord-mojo2", iemName: "Chord Mojo 2", category: "DAC", imageUrl: "https://placehold.co/400x250/1e1e1e/e0e0e0?text=Mojo+2", currentLocation: "UK", countries: ["GB", "DE", "FR"] },
  { tourId: "ifi-gryphon", iemName: "iFi xDSD Gryphon", category: "Amp", imageUrl: "https://placehold.co/400x250/1e1e1e/e0e0e0?text=Gryphon", currentLocation: "Germany", countries: ["DE", "PL", "CZ"] },
  { tourId: "astell-kern-sp2k", iemName: "Astell&Kern SP2000T", category: "DAP", imageUrl: "https://placehold.co/400x250/1e1e1e/e0e0e0?text=SP2000T", currentLocation: "South Korea", countries: ["KR", "JP", "SG"] },
];

// --- Simulated API Fetching Functions ---

// Simulates fetching the list of active tours for the main page.
export const getActiveTours = async (): Promise<ActiveTour[]> => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 150));
  // Return a copy to prevent accidental mutation if this were real state
  return [...activeTours];
};

// Simulates fetching the detailed data for a specific tour.
export const getTourDetails = async (tourId: string): Promise<TourDetailsData | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 150));
  // Find the details; return a copy or null if not found
  const details = allTourDetails[tourId];
  return details ? { ...details, tourData: [...details.tourData] } : null;
};

// --- Helper Data ---

// Mapping of ISO 3166-1 alpha-2 country codes to flag emojis.
export const countryFlags: Record<string, string> = {
    'US': '🇺🇸', 'GB': '🇬🇧', 'JP': '🇯🇵', 'ES': '🇪🇸', 'IN': '🇮🇳',
    'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'CH': '🇨🇭', 'CA': '🇨🇦',
    'MX': '🇲🇽', 'AU': '🇦🇺', 'NZ': '🇳🇿', 'SG': '🇸🇬', 'MY': '🇲🇾',
    'PL': '🇵🇱', 'CZ': '🇨🇿', 'KR': '🇰🇷',
    // Add more country codes and flags as needed for your tours
};