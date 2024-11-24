export interface Rating {
  userId: number;
  rating: number;
  comment?: string;  // Optional comment for the rating
}

export interface Kitchen {
  kitchenId: number;
  name: string;
  address: string;
  contactPhone?: string; // Optional contact number
  latitude?: number; // Optional, you could also make these required based on your requirements
  longitude?: number; // Optional, same as above
  rating: number;
  accessibilityFeatures: string;
  operatingHours: string;
  operationalStatus: 'OPEN' | 'CLOSED' | 'TEMPORARILY_CLOSED'; // Enum-like status
  ratings?: Rating[]; // Optional array of ratings for the kitchen
}

