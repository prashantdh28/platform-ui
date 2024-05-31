import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import "../searchModule.css";
import WorkspaceContent from "./WorkspaceContent";
const workspaces = [1, 2, 3];
const AddToWorkSpace = ({ children, addWork }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        maxWidth={"xl"}
        id="addto-workspace-container"
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignrows: "center",
            padding: "1.2rem",
            color: "white",
            fontWeight: "400",
          }}
        >
          <div>Add this result to a workspace</div>

          <div style={{ cursor: "pointer" }} onClick={handleClose}>
            <CloseIcon sx={{ color: "white" }} />
          </div>

          {/* </div> */}
        </DialogTitle>
        <DialogContent>
          <WorkspaceContent workspaces={workspaces} />
          {/* <div className="hunt-result-main">
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
                return <div className="work-added">Workspace {item}</div>;
              })}
            </div>
          </div> */}
          <Button
            className="add-work-btn"
            size="small"
            onClick={() => addWork()}
            variant="contained"
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddToWorkSpace;
