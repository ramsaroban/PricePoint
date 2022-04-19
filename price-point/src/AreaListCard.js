import React from "react";

const AreaListCard = ({ data }) => {
  const renderAreaList = () => {
    return data.map((d) => (
      <div
        className="item"
        key={d.areaCode}
        onClick={() => {
          console.log(d);
        }}
      >
        <i className="map marker icon"></i>
        <div className="content">
          <div className="right floated content">Rs. {d.cost}</div>
          <div className="header">{d.areaCode}</div>
          <div className="description">{d.label}</div>
        </div>
      </div>
    ));
  };
  return (
    <div className="ui card" style={{ width: "300px" }}>
      <div className="content">
        <div className="header">Areas </div>
      </div>
      <div className="content">
        <div className="ui list divided ">
          {data.length > 0 ? renderAreaList() : <>No Area</>}
        </div>
      </div>
    </div>
  );
};

export default AreaListCard;
