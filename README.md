# SharePlate

SharePlate is a React-based web application that helps users find and explore charity kitchens in their area. The platform provides accessibility information, operating hours, and AI-powered recommendations for users seeking food assistance services.

## Current Status 

Currently the application is fully functional with our backend service.

## Features

### 1. Kitchen Discovery
- **Explore View**: Browse top-rated charity kitchens
- **Nearby View**: Find kitchens close to your location
- **AI Recommendations**: Get personalized kitchen suggestions based on:
  - Location
  - Disability status
  - Preferred meal times

### 2. Kitchen Details
- Detailed information about each kitchen including:
  - Operating hours
  - Accessibility features
  - Contact information
  - Interactive Google Maps integration
  - Real-time operational status
  - Rating system

## Technical Implementation

### Authentication
User authentication is implemented using JWT tokens and managed through a Context API (UserContext). The authentication flow includes:
- Login/Signup functionality
- Token storage in localStorage
- Protected routes for authenticated users
- Automatic token validation

### APIs Integration

1. **Google Maps Platform**
- Places API for address autocomplete
- Maps Embed API for kitchen location visualization
- Geocoding API for coordinate conversion

2. **Backend API Integration**
- RESTful endpoints for kitchen data
- Authentication endpoints
- AI recommendation system


## Views

### 1. Home View
- Welcome page with service introduction
- Navigation to main features

### 2. Explore View (`/explore`)
- Leverages the `api/kitchens/top-rated` endpoint in backend
- Grid display of top-rated kitchens
- Protected route requiring authentication
- Kitchen cards with basic information

### 3. Nearby View (`/nearby`)
- Leverages the `api/kitchens/nearby` endpoint in backend
- Location-based kitchen search
- Google Maps integration
- Distance-based sorting

### 4. AI Recommendations View (`/recommendations`)
- Leverages the `api/reccomendation` endpoint in backend
- Interactive form for personalized suggestions
- Accessibility preferences
- Time-based recommendations

### 5. Kitchen Detail View (`/kitchen/:id`)
- Leverages the `api/kitchens/details` endpoint in backend
- Comprehensive kitchen information
- Interactive map
- Operating hours table
- Accessibility features list

## Authentication Flow

1. **Login/Signup**
- Leverages `api/users/add` and `api/users/login` endpoint
- JWT-based authentication, storing token in localStorage to reduce the amount of times a user has to log in

2. **Protected Routes**
- Authentication state management via Context
- Redirect to login for unauthorized access
- Automatic token refresh

## Environment Variables Required
1. `REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key`
2. `REACT_APP_BACKEND_URL=your_backend_api_url`

## Getting Started

1. Clone the repository
2. Install dependencies:`npm install`
3. Run a local instance: `npm run start`
4. Either use our backend server hosted on GCloud App Engine or also start a local instance of that and update the `REACT_APP_BACKEND_URL` in the `./env`

## Demo video

https://youtu.be/x8N4Gt3RoEg?si=0iKmTKkLT0AsJWlM


   
