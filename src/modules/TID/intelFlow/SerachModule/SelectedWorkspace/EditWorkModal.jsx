import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import CustomOutlinedInput from "../../../../../Components/Custom/CustomOutlinedInput";

const EditWorkModal = ({ children }) => {
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
          <div>Edit workspace title</div>

          <div style={{ cursor: "pointer" }} onClick={handleClose}>
            <CloseIcon sx={{ color: "white" }} />
          </div>

          {/* </div> */}
        </DialogTitle>
        <DialogContent>
          <div className="hunt-result-main">
            <CustomOutlinedInput formSx={{ width: "100%" }} />
          </div>
          <Button className="add-work-btn" size="small" variant="contained">
            Update
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditWorkModal;
