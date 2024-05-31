import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import { Divider } from "@mui/material";
import CommonSearchHeader from "../TID/intelFlow/CommonSearchHeader";
const MyWorkspaceHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="workspace-main-container">
        <div className="my-workspaace-header">
          <div
            className="my-workspaace-header-text"
            onClick={() => navigate("/my-workspace")}
          >
            {" "}
            My Workspace
          </div>
          <CommonSearchHeader />
        </div>
        <Divider
          sx={{
            background: "#1E2B40",
            borderWidth: "1px",
          }}
        />
        <Outlet />
      </div>
    </>
  );
};

export default MyWorkspaceHeader;
