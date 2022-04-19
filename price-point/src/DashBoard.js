import React, { useState } from "react";
import "./App.css";
import Map from "./Map";
import AreaListCard from "./AreaListCard";
import SearchPrice from "./SearchPrice";
import { Tab } from "semantic-ui-react";

const DashBoard = () => {
  const [mapData, setMapData] = useState([]);

  const handleMapData = (mdata) => {
    if (mdata) {
      // setMapData({ ...mapData, [mdata.areaCode]: mdata });
      setMapData([...mapData, mdata]);
    }
  };

  const panes = [
    {
      menuItem: "Mark The Price",
      render: () => (
        <Tab.Pane attached={false}>
          <div className="ui grid" style={{ marginLeft: "10px" }}>
            <div className="ui segment">
              <AreaListCard data={mapData} />
            </div>
            <div className="ui segment">
              <div className="twentyfive wide column"></div>
              <Map setData={handleMapData} />
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Show Marked Area",
      render: () => <Tab.Pane attached={false}> To do</Tab.Pane>,
    },
    {
      menuItem: "Search Price",
      render: () => (
        <Tab.Pane attached={false}>
          <SearchPrice data={mapData} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div
      className="container"
      style={{ marginLeft: "20px", marginTop: "50px", marginRight: "10px" }}
    >
      {/* <div className="ui grid" style={{ marginLeft: "10px" }}> */}
      {/* <div className="ui segment">
          <div className="column" style={{ width: "300px" }}>
            <div className="ten wide column">
              <AreaListCard data={mapData} />
            </div>
          </div>
        </div> */}

      <Tab menu={{ attached: false }} panes={panes}>
        {/* <Map setData={handleMapData} /> */}
      </Tab>
    </div>
    // </div>
  );
};

export default DashBoard;
