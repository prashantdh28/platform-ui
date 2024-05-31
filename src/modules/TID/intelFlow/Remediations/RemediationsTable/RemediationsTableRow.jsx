import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, CircularProgress, TableCell, TableRow } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import RenderChips from "../../../../../Components/Common/RenderChips";
import CustomMarkDownDailogueBox from "../../../../../Components/Custom/CustomMarkDownDailogueBox";
import CustomMarkdownEditor from "../../../../../Components/Custom/CustomMarkdownEditor";
import CustomSelect from "../../../../../Components/Custom/CustomSelect";
import CustomTooltip from "../../../../../Components/Custom/CustomTooltip";
import { sideBarListColor } from "../../../../../Constants/Constant";
import { renderNewIcon } from "../../../../../helper/IconRenderer";
import { useDebounce } from "../../../../../Hooks/useDebouncedValue";
import CustomChip from "../../../../../Components/Custom/CustomChip";
import { useNavigate } from "react-router-dom";

export const borderColor = (type) => {
    switch (type) {
        case "NOT_IN_PLACE":
            return "rgba(235, 131, 131, 1)";
        case "IN_PROGRESS":
            return "rgba(241, 201, 80, 1)";
        case "IN_PLACE":
            return "rgba(102, 226, 151, 1)";
        case "NOT_APPLICABLE":
            return "rgba(124, 154, 243, 1)";
        default:
            return null;
    }
};
const RemediationsTableRow = ({ row, states, query, updateThreatCoverageData }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const updateComment = useDebounce(
        (value) => updateThreatCoverageData(row?.id, "comment", value, row),
        500
    );

    return (
        <>
            <TableRow
                key={row.name}
                sx={{
                    // "&:last-child td, &:last-child th": { border: 0 },
                    "& .MuiTableCell-body": {
                        borderBottom: "1px solid #1E2B40",
                        color: "#FFFFFF",
                        padding: "0.5rem",
                    },
                }}
            >
                <TableCell component="th" scope="row">
                    <Box
                        sx={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <span>{row.priority}</span>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                width: "3rem",
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <CircularProgress
                                    variant="determinate"
                                    sx={{
                                        color: "#2A3C57",
                                    }}
                                    size={20}
                                    thickness={8}
                                    value={100}
                                />
                                <CircularProgress
                                    variant="determinate"
                                    sx={{
                                        animationDuration: "550ms",
                                        position: "absolute",
                                        left: 0,
                                        // [`& .${circularProgressClasses.circle}`]: {
                                        //     strokeLinecap: "round",
                                        // },
                                    }}
                                    size={20}
                                    thickness={8}
                                    value={row?.percentage_completed}
                                />
                            </Box>
                            <span>{row?.percentage_completed}%</span>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell
                    scope="row"
                    sx={{ width: "8rem", cursor: "pointer" }}
                    onClick={() => {
                        navigate(`${row.id}?type=${query}`);
                    }}
                >
                    {row.id}
                    <Box
                        sx={{
                            color: "rgba(142, 151, 164, 1)",
                            textDecoration: "underline",
                        }}
                    >
                        {row.name}
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <CustomMarkDownDailogueBox
                        ShowDes={true}
                        textForOpenModal="...read more"
                        content={row.description}
                        headerName={`${row.id} - ${row.name} `}
                        readMoreChars={150}
                        customClassNames="control-desc"
                        color="rgba(142, 151, 164, 1)"
                        classForDailogueBox="control-desc-dailogue-box"
                        classForDailogueContent="control-desc-dailogue-content"
                    />
                </TableCell>
                <TableCell align="left">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {row?.techniques?.length > 0 ? (
                            <>
                                <RenderChips
                                    title="Associated Techniques"
                                    chipsData={row?.techniques}
                                    length={2}
                                    name={true}
                                />
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </TableCell>
                <TableCell
                    align="left"
                    className="render-new-icon-box"
                    sx={{ padding: "3rem 0.5rem !important" }}
                >
                    <div className="render-new-icon-box">
                        {row.entities && row.entities.length > 0
                            ? row?.entities?.map((icon, index) => (
                                  <CustomTooltip title={icon.type} key={index}>
                                      <span>{renderNewIcon(icon?.type)}</span>
                                  </CustomTooltip>
                              ))
                            : ""}
                    </div>
                </TableCell>
                <TableCell align="left">
                    <CustomChip
                        data={{
                            label: row?.coverage?.state_info,
                        }}
                        sx={{
                            background: "transparent",
                            width: "100%",
                        }}
                        borderstyle={borderColor(row?.coverage?.state_info)}
                        color="#FFFFFF"
                    />
                    {/* <CustomSelect
                        placeholder=""
                        menuItems={states}
                        selectedMenuItems={row?.coverage?.state_info}
                        handleChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            updateThreatCoverageData(row?.id, "state_info", value, row);
                            // setControlStatus(value);
                        }}
                        bordercolor={borderColor(row?.coverage?.state_info)}
                        sx={{
                            width: "10rem",
                            "& .MuiInputBase-input": {
                                fontSize: "0.8rem",
                            },
                        }}
                    /> */}
                </TableCell>
                <TableCell align="left">
                    {/* <div className="more-icon" onClick={toggleDrawer(true)}>
                        <MoreHorizIcon sx={{ fill: "white" }} />
                    </div> */}
                </TableCell>
            </TableRow>
            <Drawer
                style={{ margin: "2rem" }}
                id="tid-filter-drawer"
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: `${sideBarListColor.BACKGROUND_COLOR} !important`,
                        color: `${sideBarListColor.TEXT} !important`,
                        margin: "1rem",
                        border: "0.063rem solid #1E2B40",
                        borderRadius: "0.375rem",
                        height: "89%",
                        width: "16%",
                        padding: "1.4rem",
                    },
                }}
                className="filter-drawer"
                open={open}
                anchor="right"
                onClose={toggleDrawer(false)}
            >
                <Box className="filter-header">
                    <span>Actions</span>
                    <Box className="cross-btn" onClick={toggleDrawer(false)}>
                        <CloseOutlinedIcon sx={{ fill: "#fff" }} />
                    </Box>
                </Box>
                <Box className="filter-container">
                    <CustomSelect
                        placeholder="Supporting Product Stack"
                        menuItems={states}
                        selectedMenuItems={row?.coverage?.state_info}
                        handleChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            updateThreatCoverageData(row?.id, "state_info", value, row);
                        }}
                        bordercolor="rgba(30, 43, 64, 1)"
                    />
                    <Box>
                        <CustomMarkdownEditor
                            defaultValue={row?.coverage?.comment ? row?.coverage?.comment : ""}
                            placeholder="Write comment here..."
                            onChange={(value) => {
                                updateComment(value);
                            }}
                            height="12rem"
                        />
                    </Box>
                </Box>
                <Box sx={{ marginTop: "auto", marginLeft: "auto" }}>
                    <Box className="cancle-box">
                        <Button
                            className="cancle-btn-filter"
                            size="small"
                            onClick={toggleDrawer(false)}
                            variant="contained"
                        >
                            cancle
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default RemediationsTableRow;
