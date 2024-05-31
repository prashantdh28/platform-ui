import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { resetDetectionRules } from "../../../redux/Slice/TID/EntitySlice";
// import { v4 as uuidv4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDetectionRulesByTechniqueId } from "../../../../Services/TID/tid.service";
import { resetDetectionRules } from "../../../../redux/Slice/TID/EntitySlice";

import RenderChips from "../../../../Components/Common/RenderChips";
// import BackdropLoader from "../../../../Components/Loader/BackdropLoader";
import CustomLoadingButton from "../../../../Components/Custom/CustomLoadingButton";
import CustomTooltip from "../../../../Components/Custom/CustomTooltip";
import RuleDailogue from "./RuleDailogue";
// import Drawer from "@mui/material/Drawer";
// import { Button } from "@mui/material";

const dummy = [1, 2, 3, 4, 5];
const RulesListDailogue = ({ children, disabled, techniqueId, headline }) => {
    const dispatch = useDispatch();

    const {
        detectionRulesData,
        detectionRulesLoading,
        rulePagination: { currentPage, lastPage },
    } = useSelector((state) => state.TIDEntity);
    // const { content = [] } = detectionRulesData;

    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        if (!disabled) {
            setOpen(true);
            setTimeout(async () => {
                if (techniqueId) {
                    await dispatch(getDetectionRulesByTechniqueId({ techniqueIds: techniqueId }));
                }
            }, 100);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            dispatch(resetDetectionRules());
        }, 100);
    };

    const onLoadMore = () => {
        setTimeout(async () => {
            if (techniqueId) {
                await dispatch(
                    getDetectionRulesByTechniqueId({
                        techniqueIds: techniqueId,
                        page: currentPage + 1,
                    })
                );
            }
        }, 100);
    };

    return (
        <>
            <div>
                <div onClick={handleOpen}>{children}</div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                    maxWidth={"lg"}
                    id="rule-list-container"
                >
                    <DialogTitle
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignrows: "center",
                            padding: "1rem 2rem",
                        }}
                    >
                        <span style={{ color: "white" }}>Detection Analytics</span>
                        <CloseIcon sx={{ color: "white", cursor: "pointer" }} onClick={handleClose} />
                    </DialogTitle>

                    <DialogContent sx={{ padding: "0px 2rem" }}>
                        <TableContainer>
                            <Table aria-label="sigma table" size="small">
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
                                        <TableCell sx={{ borderRadius: "10px 0 0 10px" }}>Rule ID</TableCell>
                                        <TableCell align="left">Rule Name</TableCell>
                                        <TableCell align="left">Rule Engine</TableCell>
                                        <TableCell align="left" sx={{ borderRadius: "0 10px 10px 0" }}>
                                            Associated Techniques ID
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detectionRulesData?.map((row, index) => {
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
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    sx={{ minWidth: "10rem" }}
                                                >
                                                    {row.id}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    style={{ background: "blue !important" }}
                                                >
                                                    <RuleDailogue
                                                        // key={keyId}
                                                        id={row.id}
                                                    >
                                                        <div
                                                            style={{
                                                                color: "rgb(32, 164, 39)",
                                                                cursor: "pointer",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            <CustomTooltip title="View actual rule">
                                                                {row.file_name}
                                                            </CustomTooltip>
                                                        </div>
                                                    </RuleDailogue>
                                                </TableCell>
                                                <TableCell align="left">{row.source}</TableCell>
                                                <TableCell align="left">
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        {row?.technique_ids?.length > 0 ? (
                                                            <>
                                                                <RenderChips
                                                                    title="Associated Techniques ID"
                                                                    chipsData={row?.technique_ids?.map(
                                                                        (row) => ({
                                                                            name: row,
                                                                        })
                                                                    )}
                                                                    length={2}
                                                                />
                                                            </>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                    {detectionRulesLoading &&
                                        dummy.map((val) => {
                                            return (
                                                <TableRow
                                                    sx={{
                                                        "&:last-child td, &:last-child th": { border: 0 },
                                                        "& .MuiTableCell-body": {
                                                            borderBottom: "1px solid #1E2B40",
                                                            color: "#FFFFFF",
                                                        },
                                                    }}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        sx={{ minWidth: "10rem" }}
                                                    >
                                                        Loading...
                                                    </TableCell>

                                                    <TableCell
                                                        align="left"
                                                        style={{ background: "blue !important" }}
                                                    >
                                                        Loading...
                                                    </TableCell>
                                                    <TableCell align="left"> Loading...</TableCell>
                                                    <TableCell align="left">Loading...</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                            {!(lastPage || detectionRulesLoading) && !(detectionRulesData.length === 0) && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <CustomLoadingButton
                                        size="small"
                                        sx={{
                                            background: "#0082F91F",
                                            border: "1px solid #0082F9",
                                        }}
                                        loadingIndicator={<CircularProgress size={20} />}
                                        onClick={onLoadMore}
                                        // loading={loading}
                                        variant="outlined"
                                    >
                                        Load More
                                    </CustomLoadingButton>
                                </Box>
                            )}
                        </TableContainer>
                    </DialogContent>
                </Dialog>
                {/* {<BackdropLoader loading={detectionRulesLoading} />} */}
            </div>
        </>
    );
};

export default RulesListDailogue;
