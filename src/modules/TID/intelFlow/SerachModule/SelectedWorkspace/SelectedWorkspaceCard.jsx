import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { ReactComponent as CampeignIcon } from "../../../../../Assests/SVG/workspaceIcon.svg";
import CustomMarkDownDailogueBox from "../../../../../Components/Custom/CustomMarkDownDailogueBox";
import WorkReportModal from "./WorkReportModal";
const SelectedWorkspaceCard = ({ isEdit, expandChat }) => {
  return (
    <div className="card-main-work">
      <div className="flex">
        <div
          className={
            expandChat ? "img-desc-edit-box-expand" : "img-desc-edit-box"
          }
        >
          <div className="icon-workspace">
            <CampeignIcon />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontWeight: "400",
            }}
          >
            <div>
              {" "}
              <CustomMarkDownDailogueBox
                key={expandChat ? "expanded" : "collapsed"}
                ShowDes={true}
                textForOpenModal="...read more"
                content="Modification to the registry are normal and occur throughout typical use of the Windows operating system. Consider enabling registry auditing on spec"
                // headerName={`${row.id} - ${row.name} `}
                readMoreChars={!expandChat ? 100 : 40}
                customClassNames="control-desc"
                color="white"
                classForDailogueBox="control-desc-dailogue-box"
                classForDailogueContent="control-desc-dailogue-content"
              />
            </div>
          </div>
        </div>
        {expandChat ? (
          <div>
            <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              // color="secondary"
              sx={{
                "& .MuiButton-outlined": {
                  borderWidth: "2px",
                  borderColor: "#1E2B40", // Custom border color for the buttons
                  color: "#8E97A4", // Custom text color for the buttons
                },
              }}
            >
              <Button>
                <DescriptionOutlinedIcon sx={{ color: "#8E97A4" }} />
              </Button>
              <Button>
                <CalendarMonthOutlinedIcon sx={{ color: "#8E97A4" }} />{" "}
              </Button>
            </ButtonGroup>
          </div>
        ) : (
          <div className="date-desc-right">
            <div
              style={{
                textDecoration: "underline",
                color: "#8E97A4",
                fontWeight: 400,
              }}
            >
              12-12-2024
            </div>
            <WorkReportModal>
              <div
                style={{
                  textDecoration: "underline",
                  color: "#8E97A4",
                  fontWeight: 400,
                  cursor: "pointer",
                }}
              >
                Mandiant annual threat report 2024
              </div>
            </WorkReportModal>
          </div>
        )}
        {isEdit ? (
          <div style={{ cursor: "pointer" }}>
            <CancelOutlinedIcon sx={{ color: "rgba(142, 151, 164, 1)" }} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SelectedWorkspaceCard;
