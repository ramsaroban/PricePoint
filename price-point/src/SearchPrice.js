import React, { useState } from "react";
import SearchOnMap from "./SearchOnMap";
// var pointInPolygon = require("point-in-polygon");
import Inside from "./Test";

const SearchPrice = ({ data }) => {
  const [areaCode, setAreaCode] = useState("");
  const [place, setPlace] = useState("");
  const [cost, setCost] = useState(0);
  // console.log(coordData);
  // useEffect(() => {
  // console.log("I am redddddd");
  // }, [coordData]);
  const getCostData = (result) => {
    if (result) {
      var point = result.center;
      console.log(point);
      var cost = 0;
      for (var i = 0; i < data.length; i++) {
        if (Inside(data[i].coords, point)) {
          setAreaCode(data[i].areaCode);
          setCost(data[i].cost);
          setPlace(result.place_name);
          break;
        }
      }
      return cost;
    }
    return 0;
  };
  return (
    <div className="ui card" style={{ width: "100%" }}>
      <div className="content">
        <div className="right floated content">{place}</div>
        <div className="header">
          Calculated Price: Rs. {cost} [Area: {areaCode}]/-
        </div>
      </div>
      {/* <div className="content"> */}
      {/* {coordData ? <></> : <SearchOnMap setData={setCoordData} />} */}
      <SearchOnMap data={data} handler={getCostData} />
      {/* </div> */}
    </div>
  );
};

export default SearchPrice;
