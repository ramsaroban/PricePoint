import React, { useState, useRef, useCallback } from "react";
import MapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFtc2Fyb2JhbiIsImEiOiJjbDI0OTZzcGMwMjFlM2ZwNnhyc2kycGI1In0.jVGmnllt3jCpmz_hYmPgoA";

const SearchOnMap = ({ handler }) => {
  const [lat, setLat] = useState(85.324);
  const [long, setLong] = useState(27.7172);
  const [viewport, setViewport] = useState({
    longitude: 85.324,
    latitude: 27.7172,
    zoom: 14,
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <div style={{ height: "400px" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapStyle={"mapbox://styles/mapbox/outdoors-v11"}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          marker={true}
          onResult={(d) => {
            setLat(d.result.center[1]);
            setLong(d.result.center[0]);
            handler(d.result);
          }}
        />
        <Marker longitude={long} latitude={lat} anchor="bottom">
          <i className="big bordered blue map marker alternate icon"></i>
        </Marker>
      </MapGL>
    </div>
  );
};

export default SearchOnMap;
