import React, { useState } from "react";
import "./index.css";
import { Divider } from "@mui/material";
import AllWorkspaceCard from "./AllWorkspaceCard";
import { useNavigate } from "react-router-dom";
const allWorkspace = ["01", "02", "03", "04", "05", "06", "07", "08"];
const MyWorkspace = () => {
  const navigate = useNavigate();
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const handleCardClick = (item) => {
    setSelectedWorkspace(item); // Select the clicked item
    navigate(`/my-workspace/workspace${item}`);
  };
  return (
    <div className="my-workspaace-container">
      <div className="my-workspaace-main-section">
        <div>All Workspace</div>
        <Divider
          sx={{
            background: "#1E2B40",
            marginTop: "1rem",
            marginBottom: "1rem",
            borderWidth: "1px",
          }}
        />
        <div className="all-work-card-conainer">
          {allWorkspace &&
            allWorkspace.map((item) => {
              return (
                <AllWorkspaceCard
                  key={item}
                  item={item}
                  isSelected={selectedWorkspace === item}
                  onClick={() => handleCardClick(item)}
                />
              );
            })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MyWorkspace;
