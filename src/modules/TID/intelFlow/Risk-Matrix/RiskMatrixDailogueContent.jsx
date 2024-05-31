import React, { useRef } from "react";
import CustomMarkDownDailogueBox from "../../../../Components/Custom/CustomMarkDownDailogueBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Divider, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import {
  addControl,
  removeControl,
} from "../../../../Services/TID/riskMatrix.service";
import useToastify from "../../../../Hooks/useToastify";
import CustomPopover from "../../../../Components/Custom/CustomPopover";
import CustomStatus from "../../../../Components/Custom/CustomStatus";

const RiskMatrixDailogueContent = ({ value, name }) => {
  const dispatch = useDispatch();
  const { showToast } = useToastify();

  const customPopoverRef = useRef(null);
  // Function to call handleClick of CustomPopover
  const callCustomPopoverHandleClick = () => {
    // Check if ref is initialized
    if (customPopoverRef.current) {
      customPopoverRef.current.handleClick(); // Call handleClick function of CustomPopover
    }
  };

  return (
      <div>
          <div>
              <CustomMarkDownDailogueBox
                  ShowDes={true}
                  textForOpenModal="...read more"
                  content={value.description}
                  headerName={`${value.id}`}
                  readMoreChars={50}
                  customClassNames="control-desc"
                  color="rgba(142, 151, 164, 1)"
                  classForDailogueBox="desc-dailogue-box"
                  classForDailogueContent="desc-content"
              />
              <Divider
                  sx={{
                      background: "#1E2B40",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      height: "2px",
                  }}
              />
          </div>
          <TableContainer>
              <Table aria-label="risk table" size="small">
                  <TableHead>
                      <TableRow
                          sx={{
                              background: "#FFFFFF14 !important",
                              "& th": {
                                  border: 0,
                                  color: "#8E97A4",
                              },
                          }}
                      >
                          <TableCell sx={{ borderRadius: "10px 0 0 10px", width: "4rem" }}>Control</TableCell>
                          <TableCell align="left">Description</TableCell>
                          <TableCell align="left">Status</TableCell>
                          {/* <TableCell align="left"></TableCell> */}
                          <TableCell align="left" sx={{ borderRadius: "0 10px 10px 0" }}></TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {value?.control_color?.map((row, index) => {
                          return (
                              <TableRow
                                  key={index}
                                  sx={{
                                      "&:last-child td, &:last-child th": { border: 0 },
                                      "& .MuiTableCell-body": {
                                          borderBottom: "1px solid #1E2B40",
                                          color: "#FFFFFF",
                                      },
                                  }}
                              >
                                  <TableCell component="th" scope="row" sx={{ width: "20rem" }}>
                                      {row?.control?.id}
                                      <div style={{ color: "#8E97A4" }}>{row?.control.name}</div>
                                  </TableCell>

                                  <TableCell
                                      align="left"
                                      style={{ background: "blue !important", width: "30rem" }}
                                  >
                                      <CustomMarkDownDailogueBox
                                          ShowDes={true}
                                          textForOpenModal="...read more"
                                          content={row?.control?.description}
                                          headerName={`${row?.control?.id}`}
                                          readMoreChars={40}
                                          customClassNames="control-desc"
                                          color="rgba(142, 151, 164, 1)"
                                          classForDailogueBox="desc-dailogue-box"
                                          classForDailogueContent="desc-content"
                                      />
                                  </TableCell>
                                  <TableCell align="left">
                                      <CustomStatus type={row.control.status}>
                                          {row.control.status}
                                      </CustomStatus>
                                  </TableCell>
                                  {/* <TableCell align="left"></TableCell> */}
                                  <TableCell align="left">
                                      <CustomPopover
                                          ref={customPopoverRef}
                                          hideHeader={true}
                                          popoverId={`baseline-${index}`}
                                          popOverElement={
                                              <div className="more-icon">
                                                  <MoreHorizIcon sx={{ fill: "white" }} />
                                              </div>
                                          }
                                      >
                                          <MenuItem
                                              sx={{
                                                  color: "#fff",
                                                  justifyContent: "center ",
                                              }}
                                              onClick={() => {
                                                  if (row?.control) {
                                                      dispatch(addControl(row.control));
                                                      showToast("Successfully added to baseline.", {
                                                          type: "success",
                                                      });                                                    
                                                  }
                                                  callCustomPopoverHandleClick();
                                              }}
                                          >
                                              Add To Baseline
                                          </MenuItem>
                                          <Divider sx={{ border: "1px solid #FFFFFF1F", margin: 0 }} />
                                          <MenuItem
                                              sx={{
                                                  color: "#DB3960",
                                                  justifyContent: "center ",
                                              }}
                                              onClick={() => {
                                                  if (row?.control) {
                                                      dispatch(removeControl(row.control));
                                                      showToast("Successfully removed from the baseline.", {
                                                          type: "success",
                                                      });                                                    
                                                  }
                                                  callCustomPopoverHandleClick();
                                              }}
                                          >
                                              Remove From baseline
                                          </MenuItem>
                                      </CustomPopover>
                                  </TableCell>
                              </TableRow>
                          );
                      })}
                  </TableBody>
              </Table>
          </TableContainer>
      </div>
  );
};

export default RiskMatrixDailogueContent;
