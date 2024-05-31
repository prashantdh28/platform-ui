import React from "react";
import { Outlet } from "react-router-dom";

const TableWraper = () => {
  return (
      <div className="activity-container" style={{ height: "700px" }}>

          <Outlet />
      </div>
  );
};

export default TableWraper;
