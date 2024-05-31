import React from "react";
import { Divider } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const AllWorkspaceCard = ({ item, isSelected, onClick }) => {
  return (
    <div
      className="all-work-card"
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? "#0082F9" : "",
        cursor: "pointer",
      }}
    >
      <div className="work-name">Workspace {item}</div>
      <div
        className="work-total-saved"
        style={{ color: isSelected ? "#FFFFFF99" : "" }}
      >
        {" "}
        Total 20 results saved
      </div>
      <Divider
        sx={{
          background: isSelected ? "#FFFFFF29" : "#374151",
          // marginTop: "0.5rem",
          // marginBottom: "0.5rem",
          borderWidth: "1px",
        }}
      />
      <div
        className="date-icon-date"
        style={{ color: isSelected ? "#FFFFFF99" : "" }}
      >
        <div style={{ display: "flex" }}>
          <CalendarMonthOutlinedIcon
            sx={{ color: isSelected ? "#FFFFFF99" : "#8E97A4" }}
          />
        </div>
        <div>Date Created:</div>{" "}
        <div style={{ color: "white" }}>08-01-2024</div>
      </div>
    </div>
  );
};

export default AllWorkspaceCard;
