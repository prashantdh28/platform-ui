import React, { useState } from "react";
import RichTextEditor from "../../../../../Components/RichTextEditor/RichTextEditor";
import { Dialog } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import DynamicButton from "../../../../../Components/Button/ButtonBox";
import "./RichTextModal.css";

const RichTextModal = ({
  children,
  comment,
  setData,
  setTabData,
  updateThreatCoverageData,
  id,
  type,
  row,
}) => {
  const [open, setOpen] = useState(false);

  const onCommentChange = (value) => {
    setData(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // updateThreatCoverageData(id, setData, "comment", commentValue);
  };

  const handleDone = () => {
    handleClose();
    updateThreatCoverageData(id, type, "comment", comment, row, setTabData);
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>
      <div className="TID-expandModal-Parent">
        <Dialog
          open={open}
          // onClose={handleCloseTextEditor}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          fullWidth
        >
          <div className="RichText-Modal-TID-sub-control-close-icon">
            <AiOutlineClose
              className="TID-dialouge-close-icon"
              onClick={handleClose}
            />
          </div>
          <div id="TID-Modal-Open-RichText">
            <RichTextEditor
              className="TID-ExpandModal"
              value={comment}
              onChange={onCommentChange}
            />
          </div>
          <span className="TID-RichTextModal-Done-btn" onClick={handleDone}>
            <DynamicButton label="DONE" />
          </span>
        </Dialog>
      </div>
    </>
  );
};

export default RichTextModal;
