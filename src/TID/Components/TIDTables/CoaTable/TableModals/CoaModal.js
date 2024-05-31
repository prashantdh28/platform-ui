import React from "react";
import DynamicButton from "../../../../../Components/Button/ButtonBox";
import Dialog from "@mui/material/Dialog";
import { AiOutlineClose } from "react-icons/ai";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import DropDownTree from "../../../../../Components/DropDownTree/DropDownTree";
import FileUploader from "../../../../../Components/FileUploader/FileUploader";
import "./CoaModal.css";

const CoaModal = ({ open, handleCloseCOA }) => {
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

  const DropDownoptions = [
    { value: 10, label: "Enterprise" },
    { value: 20, label: "Mobile" },
    { value: 30, label: "ICS" },
  ];

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseCOA}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        maxWidth="47.8125rem"
      >
        <div id="TID-Jira-Popup">
          <div className="TID-COA-header-close">
            <p className="TID-slack-message" style={{ color: BackgroundColor }}>
              Add a new Product stack
            </p>
            <AiOutlineClose
              className="TID-dialouge-close-icon"
              onClick={handleCloseCOA}
            />
          </div>

          <div className="TID-Parent-text-filed">
            <TextField
              label="Vendor"
              id="TID-Dialoe-Text-Filed"
              defaultValue="Value"
              variant="standard"
            />

            <TextField
              label="Product"
              id="TID-Dialoe-Text-Filed"
              defaultValue="Value"
              variant="standard"
            />

            <TextField
              label="Version"
              id="TID-Dialoe-Text-Filed"
              defaultValue="Value"
              variant="standard"
            />

            <FileUploader />

            <DropDownTree
              menuClassName="TID-Dialoge-DropDown"
              label="Phase"
              options={DropDownoptions}
            />
          </div>

          <div className="TID-Dialoge-btn">
            <Button
              variant="text"
              style={{ color: BackgroundColor }}
              onClick={handleCloseCOA}
            >
              Cancel
            </Button>
            <DynamicButton
              label="add"
              style={{ padding: "8px 22px" }}
            ></DynamicButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CoaModal;
