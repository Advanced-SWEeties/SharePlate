import React, { useEffect, useRef, useState } from "react";
import { TextField, Stack, Fab } from "@mui/material"; // Import MUI TextField
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

let autoComplete;
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Your Google API Key

// Utility function to load the Google Maps script
const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.getElementsByTagName("head")[0].appendChild(script);
  });
};

const SearchLocationInput = ({ setSelectedLocation, handleSubmit, label}) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (setQuery, setSelectedLocation) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        componentRestrictions: { country: "US" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(setQuery, setSelectedLocation);
    });
  };

  const handlePlaceSelect = async (updateQuery, setSelectedLocation) => {
    const addressObject = await autoComplete.getPlace();
    const query = addressObject.formatted_address; // Get the address from the place

    updateQuery(query); // Update the query with the selected place

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    // Perform reverse geocoding to get the address from lat/lng
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
        const fullAddress = results[0].formatted_address;
        console.log("Full address:", fullAddress);
        setSelectedLocation({ latLng, address: fullAddress }); // Pass both latLng and address
      } else {
        console.error("Geocoder failed:", status);
      }
    });
  };

  useEffect(() => {
    const loadGoogleMapsAPI = async () => {
      try {
        await loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
        );
        handleScriptLoad(setQuery, setSelectedLocation); // Handle script load after it's done
      } catch (error) {
        console.error("Error loading Google Maps script:", error);
      }
    };

    loadGoogleMapsAPI();
  }); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div className="search-location-input">
    <Stack direction='row'  alignItems='center'>
    <TextField
      inputRef={autoCompleteRef} // Use the ref here
      className="form-control"
      onChange={(event) => setQuery(event.target.value)}
      label={label}
      value={query}
      variant="outlined"
      sx={{
        width: 500, // Set the width of the input field
        height: 56, // Set the height to match the FAB size
      }}
    />
    {handleSubmit && (
      <Fab
          color="primary"
          onClick={handleSubmit}
          sx={{
            marginLeft: 2, // Adds space between the search input and FAB
            height: 40, // Adjust height to match the size of the input field
            width: 40, // Make the FAB circular and match input size
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowForwardIcon />
      </Fab>
    )}
    
    </Stack>
    
  </div>
  );
};

export default React.memo(SearchLocationInput);
