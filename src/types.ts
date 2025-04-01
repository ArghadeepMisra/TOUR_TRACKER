// src/types.ts

export interface PastTour {
    name: string;
    arrival: string | null;
    departure: string | null;
  }
  
  export interface UserProfileData {
    id: string; // Added unique ID matching the key in data source
    name: string;
    location: string | null;
    profilePicUrl: string | null;
    headfiLink: string | null;
    pastTours: PastTour[];
  }
  
  export interface TourStop {
    userId: string | null; // Can be null if user unknown/placeholder
    user: string | null;
    location: string | null;
    arrivalDate: string | null;
    dispatchDate: string | null;
    conditionReported: string | null;
    reviewStatus: string | null;
  }
  
  export interface TourDetailsData {
    id: string; // Added unique ID matching the key in data source
    iemName: string;
    tourData: TourStop[];
  }
  
  export interface ActiveTour {
    tourId: string;
    iemName: string;
    imageUrl: string | null;
    currentLocation: string | null;
    countries: string[]; // ISO 3166-1 alpha-2 codes
  }
  
  // Type for location state passed via React Router Link
  export interface ProfileLinkState {
      fromTourId?: string;
  }

  export type TourCategory = 'IEM' | 'Headphone' | 'Amp' | 'DAC' | 'DAP';

export interface ActiveTour {
  tourId: string;
  iemName: string; // Maybe rename this to itemName for generality? Let's keep for now.
  category: TourCategory; // <-- ADD THIS LINE
  imageUrl: string | null;
  currentLocation: string | null;
  countries: string[]; // ISO 3166-1 alpha-2 codes
}