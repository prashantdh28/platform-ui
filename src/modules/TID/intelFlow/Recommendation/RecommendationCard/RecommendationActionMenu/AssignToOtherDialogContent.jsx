import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../../../redux/Slice/Auth/authSlice";
import CustomAutocomplete from "../../../../../../Components/Custom/CustomAutocomplete";
import { assignTask } from "../../../../../../Services/TID/myTasks.service";
import useToastify from "../../../../../../Hooks/useToastify";
import RenderChips from "../../../../../../Components/Common/RenderChips";
import "../../recommendation.css";
const AssignToOtherDialogContent = ({
  handleClickDialog,
  setSelectedValue,
  setItem,
  data,
}) => {
  const { actionableItem, recommendation, mitigates } = data;

  const dispatch = useDispatch();

  const { showToast } = useToastify();

  const usersList = useSelector(getUsers);

  const [selectedUser, setSelectedUser] = useState([]);

  const onAssignClick = async () => {
    try {
      if (selectedUser && Object.keys(selectedUser).length > 0) {
        const requestObject = {
            control_id: data?.controlId,
            recommendation_id: data?.recommendationId,
            recommendation_name: data?.recommendation,
            assigned_action: {
                ...data?.actionableItem,
                status: "ASSIGNED",
                assigned_to: selectedUser?.email,
                assigned_username: selectedUser?.name,
            },
        };
        const response = await dispatch(
          assignTask({ requestObject: requestObject })
        ).unwrap();
        if (response) {
          showToast("The task has been assigned successfully.", {
              type: "success",
          });
          setItem(response?.assigned_action);
        }
        setSelectedValue("other");
        handleClickDialog();
      } else {
          showToast("Please select a user before proceeding.", {
              type: "error",
          });
      }
    } catch (error) {}
    setSelectedUser([]);
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
              Assign The Task to Other
              <CloseOutlinedIcon onClick={handleClickDialog} sx={{ cursor: "pointer", fill: "#8E97A4" }} />
          </DialogTitle>
          <Divider
              sx={{
                  background: "#2A3C57",
                  margin: "0.5rem 0rem",
                  borderWidth: "1px",
              }}
          />
          <DialogContent>
              <Box className="dialog-other-container">
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <span className="dialog-other-container-head-text">To</span>
                      <CustomAutocomplete
                          placeholder="name@gmail.com"
                          options={usersList.map((user) => ({ ...user, title: user.name }))}
                          getOptionLabel={(option) => option?.title || ""}
                          isOptionEqualToValue={(option, value) => option?.title === value?.title}
                          onChange={(e, value) => {
                              setSelectedUser(value);
                          }}
                          value={selectedUser}
                      />
                      {/* <CustomTextField
                            styleSx={{
                                border: "1px solid #1E2B40",
                                borderRadius: "6px",
                                height: "4rem",
                                padding: "0rem 1rem",
                                //   width: "30rem",
                                background: "#08172F",
                            }}
                            placeholder="name@gmail.com"
                            //     multiline
                            //     maxRows={6}
                            //     minRows={4}
                        /> */}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                      <div className="dialog-other-chip-section">
                          <span className="dialog-other-container-head-text">Recommendation</span>
                          <span className="dialog-other-container-value-text">{recommendation}</span>
                      </div>
                      {mitigates && mitigates.length > 0 && (
                          <>
                              <Divider
                                  sx={{
                                      background: "#2A3C57",
                                      margin: "0rem 1rem",
                                      borderWidth: "1px",
                                  }}
                              />
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
              </Box>
          </DialogContent>
          <DialogActions>
              <Button
                  onClick={onAssignClick}
                  // sx={{ "& .Mui-disabled": { color: "#FFFFFF14" } }}
                  // disabled={!selectedUser}
                  fullWidth
                  variant="contained"
              >
                  Assign
              </Button>
          </DialogActions>
      </>
  );
};

export default AssignToOtherDialogContent;
