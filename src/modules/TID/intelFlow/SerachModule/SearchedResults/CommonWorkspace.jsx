import React from "react";
import "../searchModule.css";
import SelectedWorkspaceCard from "../SelectedWorkspace/SelectedWorkspaceCard";
import { Button, ButtonGroup, Divider } from "@mui/material";
import EditWorkModal from "../SelectedWorkspace/EditWorkModal";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CustomTooltip from "../../../../../Components/Custom/CustomTooltip";
const CommonWorkspace = ({
  isEdit,
  setIsEdit,
  workspaceList,
  selectedWorkspace,
  expandChat,
}) => {
  return (
    <div className="select-work-container">
      <div className="select-work-numbers">
        <div className="flex-align-gap">
          {isEdit ? "Edit Your " : ""}
          Workspace {selectedWorkspace}{" "}
          <span>
            {isEdit ? (
              <EditWorkModal>
                <CustomTooltip title="Edit workspace name">
                  <BorderColorOutlinedIcon
                    sx={{ color: "#0082F9" }}
                    onClick={() => setIsEdit(true)}
                  />
                </CustomTooltip>
              </EditWorkModal>
            ) : (
              ""
            )}
          </span>
        </div>
        <div className="flex-align-gap">
          {/* <div className="edit-dlt-btns">
                  {" "}
                  {isEdit ? (
                    ""
                  ) : (
                    <CustomTooltip title="Edit workspace ">
                      <BorderColorOutlinedIcon
                        sx={{ color: "#0082F9" }}
                        onClick={() => setIsEdit(true)}
                      />
                    </CustomTooltip>
                  )}
                  <DeleteOutlineOutlinedIcon sx={{ color: "#8E97A4" }} />
                </div> */}

          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            sx={{
              "& .MuiButton-outlined": {
                borderWidth: "2px",
                borderColor: "#1E2B40", // Custom border color for the buttons
              },
            }}
          >
            {isEdit ? (
              ""
            ) : (
              <CustomTooltip title="Edit workspace ">
                <Button onClick={() => setIsEdit(true)}>
                  <BorderColorOutlinedIcon sx={{ color: "#0082F9" }} />
                </Button>
              </CustomTooltip>
            )}
            <Button>
              <DeleteOutlineOutlinedIcon sx={{ color: "#8E97A4" }} />
            </Button>
          </ButtonGroup>
          {isEdit ? (
            <Button
              className="save-work-btn"
              size="small"
              variant="contained"
              onClick={() => setIsEdit(false)}
            >
              Save
            </Button>
          ) : (
            <div className="share-btn-work">
              <FileUploadOutlinedIcon sx={{ color: "#8E97A4" }} />
              Share
            </div>
          )}
        </div>
      </div>
      <Divider
        sx={{
          background: "#1E2B40",
          borderWidth: "2px",
          // margin: "-0.9rem 1.2rem",
        }}
      />
      <div className="card-container-work-select">
        <div className="card-container-work-box">
          {workspaceList.map((item) => {
            return (
              <SelectedWorkspaceCard isEdit={isEdit} expandChat={expandChat} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommonWorkspace;
