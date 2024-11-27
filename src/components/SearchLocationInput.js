import React, { useEffect, useRef, useState } from "react";
import { TextField, Stack, Fab } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

let autoComplete;
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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
    
    if (!addressObject || !addressObject.formatted_address) {
      console.error("Place object is missing the formatted_address");
      return;
    }
  
    const query = addressObject.formatted_address;
  
    updateQuery(query);
  
    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };
  
    if (!latLng.lat || !latLng.lng) {
      console.error("Place object does not contain valid latitude or longitude");
      return;
    }
  
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
        const fullAddress = results[0].formatted_address;
        console.log(fullAddress)
        setSelectedLocation({ latLng, address: fullAddress });
      } else {
        console.error("Geocoder failed:", status);
      }
    });
  };
  

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //   }
  // };

  useEffect(() => {
    const loadGoogleMapsAPI = async () => {
      try {
        await loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
        );
        handleScriptLoad(setQuery, setSelectedLocation);
      } catch (error) {
        console.error("Error loading Google Maps script:", error);
      }
    };

    loadGoogleMapsAPI();
  });

  return (
    <div className="search-location-input">
      <Stack direction='row' alignItems='center'>
        <TextField
          inputRef={autoCompleteRef}
          className="form-control"
          onChange={(event) => setQuery(event.target.value)}
          label={label}
          value={query}
          variant="outlined"
          sx={{
            width: 500,
            height: 56,
          }}
          // onKeyDown={handleKeyDown}
        />
        {handleSubmit && (
          <Fab
            color="primary"
            onClick={handleSubmit}
            sx={{
              marginLeft: 2,
              height: 40,
              width: 40,
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
