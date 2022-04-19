import React, { useState } from "react";
import Modal from "./Modal";

const AddModal = ({ onClose, handler }) => {
  const [areaCode, setAreaCode] = useState("");
  const [label, setLabel] = useState("");
  const [cost, setCost] = useState();

  const handleAdd = () => {
    const data = {
      areaCode,
      label,
      cost,
    };
    return handler(data, false);
  };
  const renderContent = () => {
    return (
      <div style={{ alignItems: "center" }}>
        <div style={{ margin: "10px" }}>
          <div className="ui labeled input">
            <div className="ui label">Area Code:</div>
            <input
              type="text"
              placeholder="KTM-01"
              onChange={(e) => setAreaCode(e.target.value)}
            />
          </div>
        </div>
        <div style={{ margin: "10px" }}>
          <div className="ui labeled input">
            <div className="ui label">Label:</div>
            <input
              type="text"
              placeholder="Kathmandu"
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
        </div>
        <div style={{ margin: "10px" }}>
          <div className="ui labeled input">
            <div className="ui label">Delivery Cost:</div>
            <input
              type="text"
              placeholder="Rs. 0 /-"
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };
  const renderActions = () => {
    return (
      <>
        <button onClick={() => handleAdd()} className="ui primary button">
          Add
        </button>
        <button className="ui button" onClick={() => onClose(false)}>
          Cancel
        </button>
      </>
    );
  };

  return (
    <Modal
      title="Add Data"
      content={renderContent()}
      actions={renderActions()}
      // onDismiss={clo}
    />
  );
};

export default AddModal;
