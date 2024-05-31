import React from "react";
import WorkspaceContent from "../WorkspaceContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import "../../searchModule.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CustomAccordion from "../../../../../../Components/Custom/CustomAccordion";
import { Typography } from "@mui/material";
const WorkspaceAccordion = ({
  setSelectedWorkspace,
  selectedWorkspace,
  handleClick,
}) => {
  const workspaces = [1, 2, 3];
  return (
    <>
      <CustomAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: "white",
            },
            color: "white",
          }}
        >
          Workspace
        </AccordionSummary>
        {/* <Divider
          sx={{
            border: "1px solid #1E2B40",
            margin: "1rem 1rem",
          }}
          orientation="horizontal"
        /> */}
        <AccordionDetails>
          <WorkspaceContent
            workspaces={workspaces}
            setSelectedWorkspace={setSelectedWorkspace}
            selectedWorkspace={selectedWorkspace}
            handleClick={handleClick}
          />
          <div className="create-new-work-div">
            <div>
              <AddCircleOutlineOutlinedIcon
                sx={{ color: "rgba(142, 151, 164, 1)" }}
              />
            </div>
            <div>
              <Typography
                sx={{ color: "rgba(142, 151, 164, 1)", fontWeight: "500" }}
              >
                Create New Workspace
              </Typography>
            </div>
          </div>
        </AccordionDetails>
      </CustomAccordion>
    </>
  );
};

export default WorkspaceAccordion;
