import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Box, Button, CircularProgress, Divider } from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as CampeignIcon } from "../../../../../Assests/SVG/workspaceIcon.svg";
import CustomMarkDownDailogueBox from "../../../../../Components/Custom/CustomMarkDownDailogueBox";
import CustomTooltip from "../../../../../Components/Custom/CustomTooltip";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import "../searchModule.css";
import AddToWorkSpace from "./AddToWorkSpace";
import WorkReportModal from "../SelectedWorkspace/WorkReportModal";
const WorkspaceCard = ({ id, onDelete }) => {
  const [addedToWork, setAddedToWork] = useState(false);
  const handleWorkSpace = () => {
    setAddedToWork(true);
  };
  return (
    <div className="card-main-work">
      <div className="flex-justify">
        <div style={{ display: "flex", gap: "1rem" }}>
          {addedToWork ? (
            <Button
              style={{
                border: "1px solid #FFFFFF3D",
                backgroundColor: "#FFFFFF0F",
                color: "white",
                fontSize: "0.8rem",
                padding: "0.3rem 0.9rem",
                fontWeight: "normal",
                textTransform: "none",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <CheckCircleOutlineOutlinedIcon
                  sx={{ fill: "#54D387", fontSize: "1.2rem" }}
                />{" "}
                Added
              </span>
            </Button>
          ) : (
            <AddToWorkSpace
              addWork={handleWorkSpace}
              // handleSubmitData={handleSubmitHuntData}
            >
              <Button
                style={{
                  border: "1px solid #FFFFFF3D",
                  backgroundColor: "#FFFFFF0F",
                  color: "white",
                  fontSize: "0.8rem",
                  padding: "0.3rem 0.9rem",
                  fontWeight: "normal",
                  textTransform: "none",
                }}
              >
                <CustomTooltip title="Click to add in workspace">
                  <span>Add to workspace</span>
                </CustomTooltip>
              </Button>
            </AddToWorkSpace>
          )}

          <div className="card-relevancy">
            {" "}
            <Box sx={{ position: "relative", display: "flex" }}>
              <CircularProgress
                variant="determinate"
                sx={{
                  color: "#2A3C57",
                }}
                size={20}
                thickness={8}
                value={100}
              />
              <CircularProgress
                variant="determinate"
                sx={{
                  animationDuration: "550ms",
                  position: "absolute",
                  left: 0,
                  color: "#66E297",
                  // [`& .${circularProgressClasses.circle}`]: {
                  //     strokeLinecap: "round",
                  // },
                }}
                size={20}
                thickness={8}
                value={84}
              />
            </Box>
            <span>93% relevancy</span>
          </div>
        </div>
        <CustomTooltip title="Remove from results">
          <div className="remove-workspace" onClick={() => onDelete(id)}>
            {" "}
            -
          </div>
        </CustomTooltip>
      </div>

      <div className="flex">
        <div className="img-desc-box">
          <div className="icon-workspace">
            <CampeignIcon />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {" "}
              <CustomMarkDownDailogueBox
                ShowDes={true}
                textForOpenModal="...read more"
                content="Modification to the registry are normal and occur throughout typical use of the Windows operating system. Consider enabling registry auditing on spec"
                // headerName={`${row.id} - ${row.name} `}
                readMoreChars={100}
                customClassNames="control-desc"
                color="white"
                classForDailogueBox="control-desc-dailogue-box"
                classForDailogueContent="control-desc-dailogue-content"
              />
            </div>
            <WorkReportModal>
              <div
                style={{
                  textDecoration: "underline",
                  color: "#8E97A4",
                  fontWeight: 400,
                }}
              >
                Mandiant annual threat report 2024
              </div>
            </WorkReportModal>
          </div>
        </div>
        <Divider
          sx={{
            border: "1px solid #1E2B40",
            margin: "1rem 1rem",
            height: "3rem",
          }}
          orientation="vertical"
        />
        <div className="show-date">
          <CalendarMonthOutlinedIcon sx={{ color: "#8E97A4" }} />
          12-02-2024
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
