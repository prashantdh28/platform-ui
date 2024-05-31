import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Slack } from "../../../../../../Assests/SVG/Slack1.svg";
import CustomLoadingButton from "../../../../../../Components/Custom/CustomLoadingButton";
import CustomTextField from "../../../../../../Components/Custom/CustomTextField";
import useToastify from "../../../../../../Hooks/useToastify";
import { getSlackLoading } from "../../../../../../redux/Slice/TID/RecommendationsSlice";
import { sendMessageToSlack } from "../../../../../../Services/TID/recommendation.service";
import RenderChips from "../../../../../../Components/Common/RenderChips";
import "../../recommendation.css";

const SlackDialogContent = ({ data, setSelectedValue, handleClickDialog }) => {
  const { actionableItem, recommendation, mitigates } = data;

  const dispatch = useDispatch();

  const { showToast } = useToastify();

  const slackLoading = useSelector(getSlackLoading);

  const [slackMessage, setSlackMessage] = useState("");

  const onSendClick = async () => {
    try {
      const requestMessage = `\n- *Control Id:* ${data?.controlId}\n- *Comments:* ${slackMessage} \n- *Status:* ${data?.actionableItem?.status}\n- *Sub Action:* ${data?.actionableItem?.sub_action} \n- *Recommendation:* ${data?.recommendation}`;
      const response = await dispatch(
        sendMessageToSlack({ requestObject: { text: requestMessage } })
      ).unwrap();
      if (response) {
          showToast("The message has been successfully sent.", {
              type: "success",
          });
      }
      setSelectedValue("slack");
      handleClickDialog();
    } catch (error) {
      showToast(error?.message, { type: "error" });
    }
  };

  return (
      <>
          <DialogTitle
              id="alert-dialog-title"
              sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
              }}
          >
              Send The Task In Slack
              <CloseOutlinedIcon onClick={handleClickDialog} sx={{ cursor: "pointer", fill: "#8E97A4" }} />
          </DialogTitle>
          <Divider
              sx={{
                  background: "#2A3C57",
                  margin: "0.5rem",
                  borderWidth: "1px",
              }}
          />
          <DialogContent>
              <Box className="dialog-other-container">
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                      <div className="dialog-other-chip-section">
                          <span className="dialog-other-container-head-text">Recommendation</span>
                          <span className="dialog-other-container-value-text">{recommendation}</span>
                      </div>
                      <Divider
                          sx={{
                              background: "#2A3C57",
                              margin: "0rem 1rem",
                              borderWidth: "1px",
                          }}
                      />
                      {mitigates && mitigates.length > 0 && (
                          <>
                              <div className="dialog-other-chip-section">
                                  <span className="dialog-other-container-head-text">Sequence</span>
                                  <span className="sequence-popup">
                                      <RenderChips
                                          title="Sequence"
                                          chipsData={mitigates?.map((row) => ({
                                              name: row?.id,
                                          }))}
                                          length={1}
                                      />
                                  </span>
                              </div>
                          </>
                      )}
                  </div>
                  <div className="dialog-other-chip-section">
                      <span className="dialog-other-container-head-text">Info.</span>
                      <span className="dialog-other-container-value-text">{actionableItem?.sub_action}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <span className="dialog-other-container-head-text">Slack Channel/ Direct Message</span>
                      <CustomTextField
                          styleSx={{
                              border: "1px solid #1E2B40",
                              borderRadius: "6px",
                              height: "3rem",
                              padding: "0rem 1rem",
                              //   width: "30rem",
                              background: "#08172F",
                              "& .MuiOutlinedInput-notchedOutline": {
                                  border: "0 !important",
                                  borderColor: "0 !important",
                              },
                          }}
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment position="start">
                                      <Slack style={{ fill: "#8E97A4", fontSize: "1rem" }} />
                                  </InputAdornment>
                              ),
                          }}
                          // placeholder="#assigned-tasks"
                          value="#assigned-tasks"
                          //     multiline
                          //     maxRows={6}
                          //     minRows={4}
                      />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <span className="dialog-other-container-head-text">Additional Comment</span>
                      <CustomTextField
                          styleSx={{
                              border: "1px solid #1E2B40",
                              borderRadius: "6px",
                              //   height: "4rem",
                              //   padding: "0rem 1rem",
                              //   width: "30rem",
                              background: "#08172F",
                          }}
                          value={slackMessage}
                          placeholder="Write comment here..."
                          onChange={(event) => {
                              setSlackMessage(event.target.value);
                          }}
                          multiline
                          maxRows={6}
                          minRows={4}
                      />
                  </div>
              </Box>
          </DialogContent>
          <DialogActions>
              <CustomLoadingButton loading={slackLoading} onClick={onSendClick} fullWidth variant="contained">
                  Send Now
              </CustomLoadingButton>
          </DialogActions>
      </>
  );
};

export default SlackDialogContent;
