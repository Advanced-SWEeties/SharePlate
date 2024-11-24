export const mockKitchens = [
  {
    kitchenId: 1,
    name: "The Giving Kitchen",
    address: "123 Charity St, New York, NY 10001",
    contactPhone: "+1 555-123-4567",
    latitude: 40.7128,
    longitude: -74.0060,
    rating: 4.5,
    accessibilityFeatures: "Wheelchair accessible, Elevator, Braille signage",
    operatingHours: "Mon-Fri: 9 AM - 5 PM, Sat: 10 AM - 4 PM, Sun: Closed",
    operationalStatus: "OPEN"
  },
  {
    kitchenId: 2,
    name: "Hope Kitchen",
    address: "456 Hope Ave, Brooklyn, NY 11201",
    contactPhone: "+1 555-234-5678",
    latitude: 40.6782,
    longitude: -73.9442,
    rating: 3.8,
    accessibilityFeatures: "Wheelchair accessible, Accessible restrooms",
    operatingHours: "Mon-Fri: 10 AM - 6 PM, Sat: 12 PM - 4 PM, Sun: Closed",
    operationalStatus: "CLOSED"
  },
  {
    kitchenId: 3,
    name: "Kindness Kitchen",
    address: "789 Kind Rd, Los Angeles, CA 90001",
    contactPhone: "+1 555-345-6789",
    latitude: 34.0522,
    longitude: -118.2437,
    rating: 4.7,
    accessibilityFeatures: "Wheelchair accessible, Elevator, Sign language interpreters available",
    operatingHours: "Mon-Sun: 8 AM - 8 PM",
    operationalStatus: "OPEN"
  },
  {
    kitchenId: 4,
    name: "Care Kitchen",
    address: "321 Care Blvd, San Francisco, CA 94102",
    contactPhone: "+1 555-456-7890",
    latitude: 37.7749,
    longitude: -122.4194,
    rating: 4.2,
    accessibilityFeatures: "Wheelchair accessible, Ramp, Large print menus",
    operatingHours: "Mon-Fri: 9 AM - 5 PM, Sat-Sun: Closed",
    operationalStatus: "TEMPORARILY_CLOSED"
  },
  {
    kitchenId: 5,
    name: "Sunshine Kitchen",
    address: "555 Sun St, Austin, TX 73301",
    contactPhone: "+1 555-567-8901",
    latitude: 30.2672,
    longitude: -97.7431,
    rating: 5.0,
    accessibilityFeatures: "Wheelchair accessible, Audio guides available",
    operatingHours: "Mon-Sun: 7 AM - 7 PM",
    operationalStatus: "OPEN"
  }
];

// Example of how to access a kitchen's information:
console.log(mockKitchens[0].name);  // Output: "The Giving Kitchen"
console.log(mockKitchens[2].rating);  // Output: 4.7
console.log(mockKitchens[4].operationalStatus);  // Output: "OPEN"
