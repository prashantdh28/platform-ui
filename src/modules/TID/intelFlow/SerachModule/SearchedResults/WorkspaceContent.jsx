import React from "react";
import CustomOutlinedInput from "../../../../../Components/Custom/CustomOutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import "../searchModule.css";
const WorkspaceContent = ({
  workspaces,
  setSelectedWorkspace,
  selectedWorkspace,
  handleClick,
}) => {
  return (
    <div className="hunt-result-main">
      <CustomOutlinedInput
        placeholder="Search Workspace"
        //   className="header-search-input"
        //   onChange={handleOpenSerach}
        formSx={{ width: "100%" }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ fill: "#8E97A4" }} />
          </InputAdornment>
        }
      />
      <div className="work-added-box">
        {workspaces.map((item) => {
          const isSelected = item === selectedWorkspace;
          return (
            <div
              className={`work-added ${isSelected ? "selected" : ""}`}
              onClick={() => (handleClick ? handleClick(item) : "")}
              style={{
                border: isSelected ? "2px solid #0082F9" : "none",
                padding: "10px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              Workspace {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkspaceContent;
