// src/data/users.ts
import { UserProfileData } from '../types';

const usersProfileData: Record<string, UserProfileData> = {
  "johndoe88": { id: "johndoe88", name: "Johnathan 'Audiophile' Doe", location: "New York, USA", profilePicUrl: "https://placehold.co/150x150/1e1e1e/e0e0e0?text=JD", headfiLink: "https://www.head-fi.org/members/johndoe.12345/", pastTours: [ { name: "AuraSound X1 Prototype", arrival: "2024-01-15", departure: "2024-01-25" }, { name: "Noble Audio Katana", arrival: "2023-11-01", departure: "2023-11-10" } ] },
  "smithy": { id: "smithy", name: "Jane Smith", location: "London, UK", profilePicUrl: "https://placehold.co/150x150/1e1e1e/e0e0e0?text=JS", headfiLink: "https://www.head-fi.org/members/smithy.67890/", pastTours: [ { name: "AuraSound X1 Prototype", arrival: "2024-02-01", departure: "2024-02-10" }, { name: "Fiio FH7", arrival: "2023-12-05", departure: "2023-12-15" } ] },
  "kenji_t": { id: "kenji_t", name: "Kenji Tanaka", location: "Tokyo, JP", profilePicUrl: "https://placehold.co/150x150/1e1e1e/e0e0e0?text=KT", headfiLink: "https://example-audio-forum.jp/users/kenji", pastTours: [ { name: "AuraSound X1 Prototype", arrival: "2024-02-18", departure: "2024-02-28" }, { name: "Sony IER-Z1R", arrival: "2023-10-15", departure: "2023-10-25" } ] },
  "m_garcia": { id: "m_garcia", name: "Maria Garcia", location: "Madrid, ES", profilePicUrl: null, headfiLink: null, pastTours: [ { name: "AuraSound X1 Prototype", arrival: "2024-03-05", departure: "2024-03-15" }, { name: "Moondrop Blessing 2", arrival: "2023-11-20", departure: "2023-11-30" } ] },
  "anil_k": { id: "anil_k", name: "Anil Kumar", location: "Mumbai, IN", profilePicUrl: "https://placehold.co/150x150/1e1e1e/e0e0e0?text=AK", headfiLink: "https://www.head-fi.org/members/anil_k.54321/", pastTours: [ { name: "AuraSound X1 Prototype", arrival: "2024-03-22", departure: null } ] },
  "user_de": { id: "user_de", name: "Hans Müller", location: "Berlin, DE", profilePicUrl: "https://placehold.co/150x150/1e1e1e/e0e0e0?text=HM", headfiLink: null, pastTours: [{ name: "Noble Audio Katana", arrival: "2024-03-01", departure: "2024-03-10" }] },
  "user_fr": { id: "user_fr", name: "Sophie Dubois", location: "Paris, FR", profilePicUrl: "https://placehold.co/150x150/1e1e1e/e0e0e0?text=SD", headfiLink: "https://www.head-fi.org/members/sophie.11223/", pastTours: [{ name: "Noble Audio Katana", arrival: "2024-03-15", departure: "2024-03-25" }] },
  "user_it": { id: "user_it", name: "Luca Rossi", location: "Rome, IT", profilePicUrl: null, headfiLink: null, pastTours: [{ name: "Noble Audio Katana", arrival: "2024-04-01", departure: null }] },
  "user_us_ca": { id: "user_us_ca", name: "Mike Jones", location: "Los Angeles, CA", profilePicUrl: "https://placehold.co/150x150/1e1e1e/e0e0e0?text=MJ", headfiLink: null, pastTours: [{ name: "Moondrop S8", arrival: "2024-02-20", departure: "2024-03-01" }] },
  "user_ca_on": { id: "user_ca_on", name: "Emily White", location: "Toronto, ON", profilePicUrl: "https://placehold.co/150x150/1e1e1e/e0e0e0?text=EW", headfiLink: "https://www.head-fi.org/members/emily.w.9876/", pastTours: [{ name: "Moondrop S8", arrival: "2024-03-08", departure: null }] },
};

export const getUserProfile = async (userId: string): Promise<UserProfileData | null> => {
  await new Promise(resolve => setTimeout(resolve, 150)); // Simulate network delay
  return usersProfileData[userId] || null;
};