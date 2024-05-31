import React from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as KnightGaurd } from "../../../Assests/SVG/knight-gaurd.svg";
import CommonSearchHeader from "./CommonSearchHeader";
import "./intelFlow.css";

const IntelFlow = () => {
  return (
    <div className="tid-dashboard-container">
      {/* <HeaderIntelFlow /> */}
      <div className="tid-dashboard-header">
        <span className="header-title">
          {/* Threat Intel{" "}
                    <span style={{ color: "#4a92b2", textDecoration: "" }}>
                        <i>Operationalisation</i>
                    </span>{" "}
                    Platform */}
          <KnightGaurd style={{ width: "15rem", height: "3rem" }} />
        </span>
        {/* <div className="header-search-section"> */}
        <CommonSearchHeader />
        {/* <Button
                    sx={{
                        color: "#8e97a4",
                        background: "#091932",
                        marginRight: "2rem",
                        borderRadius: "0.375rem",
                        border: "1px solid #1e2b40",
                        width: "23.75rem",
                        justifyContent: "flex-start",
                        "&:hover": {
                            backgroundColor: "#091932",
                        },
                    }}
                    onClick={handleOpenSerach}
                    startIcon={
                        <InputAdornment position="start">
                            <SearchIcon sx={{ fill: "#8E97A4" }} />
                        </InputAdornment>
                    }
                    variant="contained"
                >
                    Search anything
                </Button> */}
        {/* </div> */}
        {/* <div className="header-search-section">
                    <CustomOutlinedInput
                        placeholder="Search anything"
                        className="header-search-input"
                        onChange={handleOpenSerach}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fill: "#8E97A4" }} />
                            </InputAdornment>
                        }
                    />
                </div> */}
      </div>
      {/* <SearchModal handleCloseSerach={handleCloseSerach} openSearch={openSearch} /> */}
      <Outlet />
    </div>
  );
};

export default IntelFlow;
