import React, { useState } from "react";
import MapGL from "react-map-gl";
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
} from "react-map-gl-draw";

import AddModal from "./AddModal";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFtc2Fyb2JhbiIsImEiOiJjbDI0OTZzcGMwMjFlM2ZwNnhyc2kycGI1In0.jVGmnllt3jCpmz_hYmPgoA";

const MODES = [
  { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
  { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
  { id: "editing", text: "Edit Feature", handler: EditingMode },
];

const DEFAULT_VIEWPORT = {
  width: 800,
  height: 600,
  longitude: 85.324,
  latitude: 27.7172,
  zoom: 14,
};
const Map = ({ setData }) => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [modeId, setModeId] = useState(null);
  const [modeHandler, setModeHandler] = useState(null);
  const [polygonData, setPolygonData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const updatePolyData = (data) => {
    if (data) {
      setPolygonData([...polygonData, [data[0], data[1]]]);
    }
    if (data === undefined) {
      setShowModal(true);
    }
  };
  const SwitchMode = (evt) => {
    evt.preventDefault();
    const modeID = evt.target.value === modeId ? null : evt.target.value;
    const mode = MODES.find((m) => m.id === modeID);
    const mode_Handler = mode ? new mode.handler() : null;
    setModeId(modeId);
    console.log(mode_Handler);
    setModeHandler(mode_Handler);
  };

  const RenderToolbar = () => {
    return (
      <div
        style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}
      >
        <select onChange={(e) => SwitchMode(e)}>
          <option value="">--Please choose a draw mode--</option>
          {MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.text}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const UpdateViewport = (viewport) => {
    setViewport(viewport);
  };

  const handleAddData = (data, modal) => {
    if (data) {
      const mapData = {
        ...data,
        coords: polygonData,
      };
      setData(mapData);
    }
    setPolygonData([]);
    setShowModal(modal);
  };

  return (
    <div style={{ height: 400, width: 800 }}>
      {showModal ? (
        <AddModal onClose={setShowModal} handler={handleAddData} />
      ) : (
        <></>
      )}
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/mapbox/outdoors-v11"}
        onViewportChange={UpdateViewport}
      >
        <Editor
          // to make the lines/vertices easier to interact with
          clickRadius={12}
          mode={modeHandler}
          onSelect={(a) => updatePolyData(a.mapCoords)}
        />
        {RenderToolbar()}
      </MapGL>
    </div>
  );
};

export default Map;
