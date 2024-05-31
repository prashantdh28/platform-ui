import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DynamicButton from "../../../Components/Button/ButtonBox";
import Box from "@mui/material/Box";
import { getDetectionRulesById } from "../../../Services/TID/tid.service";
import { useDispatch, useSelector } from "react-redux";
import { resetDetectionRule } from "../../../redux/Slice/TID/EntitySlice";
import { AiOutlineClose } from "react-icons/ai";

const RuleDialog = ({ children, id }) => {
  const dispatch = useDispatch();

  const { detectionActualRuleData, detectionRulesLoading } = useSelector(
    (state) => state.TIDEntity
  );
  const theme = useSelector((state) => state.theme.theme);

  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    setTimeout(async () => {
      if (id) {
        await dispatch(getDetectionRulesById({ id }));
      }
    }, 100);
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(resetDetectionRule());
    }, 100);
  };

  return (
      <div>
          <div onClick={handleOpen}>{children}</div>
          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
              maxWidth="47.8125rem"
          >
              <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--name-email)" }}>Actual Rule</span>
                  {/* <span
                        className="e-icons e-close"
                        style={{ cursor: "pointer", color: "var(--grey-color)" }}
                        onClick={handleClose}
                    /> */}
                  <AiOutlineClose
                      className="TID-dialouge-close-icon"
                      id="TID-dialouge-close-icon-SIGMA"
                      onClick={handleClose}
                  />
              </DialogTitle>
              <DialogContent>
                  <Box style={{ width: "47.8125rem", height: "42.75rem" }}>
                      {detectionActualRuleData &&
                          Object.keys(detectionActualRuleData).length > 0 &&
                          detectionActualRuleData.content && (
                              // <div>
                              <Editor
                                  height="90%"
                                  width="100%"
                                  defaultLanguage="yaml"
                                  defaultValue={detectionActualRuleData.content}
                                  theme={`${theme === "dark-theme" ? "vs-dark" : "light"}`}
                                  options={{ readOnly: true }}
                              />
                              // </div>
                          )}
                      {!detectionRulesLoading && !detectionActualRuleData && (
                          <p className="noData">No Data Available</p>
                      )}
                  </Box>
              </DialogContent>
              <DialogActions
                  style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "20px",
                      borderRightColor: "red",
                  }}
              >
                  <ButtonComponent
                      cssClass="e-outline rule-dialog-buttons"
                      onClick={handleClose}
                      style={{ color: "var(--name-email)" }}
                  >
                      Cancel
                  </ButtonComponent>

                  <DynamicButton label="Save" onClick={handleClose} />
              </DialogActions>
              {/* </DialogComponent> */}
          </Dialog>
      </div>
  );
};

export default RuleDialog;
