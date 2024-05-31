import React from "react";
import LensIcon from "@mui/icons-material/Lens";
import "./recommendation.css";

const TaskStatus = ({ type }) => {
  const STATUS_CONSTANT = {
    TO_DO: {
      lable: "Pending",
      color: "#D35472",
    },
    ASSIGNED: {
      lable: "Ongoing",
      color: "#F1C950",
    },
    COMPLETED: {
      lable: "Completed",
      color: "#66E297",
    },
  };
  return (
    <div
      className="status-recommendation"
      style={{ borderColor: `${STATUS_CONSTANT[type].color}` }}
    >
      <LensIcon
        sx={{ fill: `${STATUS_CONSTANT[type].color}`, fontSize: "0.9rem" }}
      />
      {STATUS_CONSTANT[type].lable ? STATUS_CONSTANT[type].lable : ""}
    </div>
  );
};

export default TaskStatus;
