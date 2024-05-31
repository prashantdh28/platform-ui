import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, TableCell, TableRow } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomLoadingButton from "../../Components/Custom/CustomLoadingButton";
import CustomMarkdownEditor from "../../Components/Custom/CustomMarkdownEditor";
import CustomSelect from "../../Components/Custom/CustomSelect";
import { sideBarListColor } from "../../Constants/Constant";
import { getAddUpdateTaskLoading } from "../../redux/Slice/TID/myTasksSlice";
import { updateTasks } from "../../Services/TID/myTasks.service";
import TaskStatus from "../TID/intelFlow/Recommendation/TaskStatus";
import CommentsModal from "./CommentsModal";
import "./myTask.css";
import moment from "moment";
import useToastify from "../../Hooks/useToastify";
import CustomTooltip from "../../Components/Custom/CustomTooltip";
import ProductDialog from "./ProductDialog";

const statusList = {
    Pending: "TO_DO",
    Ongoing: "ASSIGNED",
    Completed: "COMPLETED",
};

const TasksTableRow = ({ row, index }) => {
    const dispatch = useDispatch();

    const { showToast } = useToastify();

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [rowTaskData, setRowTaskData] = useState({ ...row });
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState(
        Object.keys(statusList).find((item) => statusList[item] === rowTaskData?.assigned_action?.status) ||
            ""
    );

    const tasksLoading = useSelector(getAddUpdateTaskLoading);

    const handleModal = () => {
        setOpenModal(!openModal);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleUpdate = async () => {
        const { recommendation_id, control_id, assigned_action, recommendation_name } = row;
        const response = await dispatch(
            updateTasks({
                requestObject: {
                    ...row,
                    recommendation_id,
                    control_id,
                    recommendation_name,
                    assigned_action: {
                        ...assigned_action,
                        status: statusList[status],
                    },
                    comments: [comment],
                },
            })
        ).unwrap();
        if (response) {
            showToast("Task updated successfully.", {
                type: "success",
            });
            setRowTaskData(response);
            setComment("");
            toggleDrawer();
        }
    };

    useEffect(() => {
        setRowTaskData(row);
    }, [row]);

    return (
        <>
            <TableRow
                sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "& .MuiTableCell-body": {
                        borderBottom: "1px solid #1E2B40",
                        color: "#FFFFFF",
                        padding: "0.5rem",
                    },
                }}
            >
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell scope="row" sx={{ width: "24rem" }}>
                    {rowTaskData.assigned_action.sub_action}
                </TableCell>
                <TableCell
                    // align="left"
                    sx={{
                        color: "#0082F9 !important",
                        textDecoration: "underline",
                        width: "16rem",
                        cursor: "pointer",
                    }}
                    onClick={handleModal}
                >
                    <CustomTooltip title="show comments">{rowTaskData.recommendation_name}</CustomTooltip>
                </TableCell>
                <TableCell //  align="left"
                >
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        {rowTaskData?.associated_products &&
                            rowTaskData?.associated_products.length > 0 &&
                            rowTaskData?.associated_products.map((item, index) => {
                                return <ProductDialog key={index} productData={item} rowData={rowTaskData} />;
                            })}
                    </Box>
                    {/* <MessageOutlinedIcon sx={{ fill: "white", cursor: "pointer" }} onClick={handleModal} /> */}
                </TableCell>
                {openModal ? <CommentsModal handleModal={handleModal} data={rowTaskData?.comments} /> : ""}

                <TableCell
                // align="left"
                >
                    {rowTaskData.assigned_on && moment(rowTaskData.assigned_on).format("DD-MM-YY hh:mm A")}
                </TableCell>
                <TableCell
                    align="left"
                    className="render-new-icon-box"
                    sx={{ padding: "3rem 0.5rem !important" }}
                >
                    {rowTaskData?.completed_on && moment(rowTaskData.completed_on).format("DD-MM-YY hh:mm A")}
                </TableCell>
                <TableCell>
                    {rowTaskData?.assigned_action?.status ? (
                        <TaskStatus type={rowTaskData?.assigned_action?.status} />
                    ) : (
                        ""
                    )}
                </TableCell>
                <TableCell>
                    <div className="more-icon" onClick={toggleDrawer}>
                        <MoreHorizIcon sx={{ fill: "white" }} />
                    </div>
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
                onClose={toggleDrawer}
            >
                <Box className="filter-header">
                    <span>Actions</span>
                    <Box className="cross-btn" onClick={toggleDrawer}>
                        <CloseOutlinedIcon sx={{ fill: "#fff" }} />
                    </Box>
                </Box>
                <CustomSelect
                    placeholder="Select your status"
                    menuItems={Object.keys(statusList)}
                    selectedMenuItems={status}
                    handleChange={(event) => {
                        const {
                            target: { value },
                        } = event;
                        setStatus(value);
                    }}
                    bordercolor="rgba(30, 43, 64, 1)"
                />
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        gap: "0.5rem",
                        flexDirection: "column",
                    }}
                >
                    <Box>Additional commments</Box>

                    <CustomMarkdownEditor
                        defaultValue={comment}
                        placeholder="Write comment here..."
                        onChange={(value) => {
                            setComment(value);
                        }}
                        height="12rem"
                    />
                </Box>
                <Box sx={{ marginTop: "auto", marginLeft: "auto" }}>
                    <Box className="cancle-box">
                        <CustomLoadingButton
                            className="cancle-btn-filter"
                            size="small"
                            onClick={() => {
                                handleUpdate();
                                // toggleDrawer(false);
                            }}
                            variant="contained"
                            loading={tasksLoading}
                        >
                            save
                        </CustomLoadingButton>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default TasksTableRow;
