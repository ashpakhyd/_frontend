"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import CustomButton from "../Button/Button";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Airport Appliances Dublin Store
const initialCenter = {
  lat: 37.70485,
  lng: -121.9266747,
};

// Declare the libraries array outside of the component
const libraries = ["places"];

const GoogleMapsComponent = ({
  onChange,
  isInvalid,
  errorMessage,
  coordinates,
}) => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState();

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const lat = place.geometry?.location.lat();
      const lng = place.geometry?.location.lng();
      const address = place.formatted_address || "Selected Location";

      if (lat && lng) {
        setAddress(address);
        setMarkerPosition({ lat, lng });
        map.panTo({ lat, lng });

        // Send the lat/lng to the parent component
        onChange({ lat, lng });
      } else {
        setMarkerPosition(null);
        console.log("Invalid location or address");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const resetMap = () => {
    if (map) {
      map.panTo(initialCenter);
      map.setZoom(20);
      setMarkerPosition(null);
    }
  };

  const reverseGeocode = (lat, lng) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not loaded");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        console.log(results);
        if (results[0]) {
          const address = results[0].formatted_address;
          setAddress(address);
          if (autocomplete) {
            autocomplete.set("place", results[0]);
          }
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search for a location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid ${isInvalid ? "red" : "transparent"}`,
            width: `100%`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            marginBottom: isInvalid ? "4px" : "12px",
          }}
        />
      </Autocomplete>

      {isInvalid && (
        <p style={{ color: "red", fontSize: "12px", marginBottom: "12px" }}>
          {errorMessage}
        </p>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition || initialCenter}
        zoom={20}
        onLoad={(mapInstance) => setMap(mapInstance)}
        options={{
          streetViewControl: false,
        }}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>

      <CustomButton
        onClick={resetMap}
        style={{
          marginTop: "12px",
        }}
      >
        Reset Map
      </CustomButton>
    </LoadScript>
  );
};

export default GoogleMapsComponent;
