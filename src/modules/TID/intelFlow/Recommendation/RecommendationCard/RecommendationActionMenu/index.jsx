import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Dialog, MenuItem } from "@mui/material";
import React, { Suspense, useState } from "react";
import { ReactComponent as Slack } from "../../../../../../Assests/SVG/Slack1.svg";
import CustomPopover from "../../../../../../Components/Custom/CustomPopover";

const AssignToSelfDialogContent = React.lazy(() => import("./AssignToSelfDialogContent"));
const AssignToOtherDialogContent = React.lazy(() => import("./AssignToOtherDialogContent"));
const SlackDialogContent = React.lazy(() => import("./SlackDialogContent"));

const RecommendationActionMenu = ({ id, data, setItem }) => {
    const [assignTo, setAssignTo] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickDialog = () => {
        setOpenDialog(!openDialog);
    };

    const handleMenuClick = (event, value) => {
        if (value === null) {
            setSelectedValue(null);
            setOpenDialog(false);
            setAssignTo(null);
        } else {
            setAssignTo(value);
            setOpenDialog(true);
        }
    };

    const assignToOptions = [
        { header: "None", value: null },
        {
            header: "Assign to My Self",
            Icon: PersonOutlineOutlinedIcon,
            value: "self",
        },
        { header: "Assign to Other", Icon: GroupOutlinedIcon, value: "other" },
        { header: "Send in Slack", Icon: Slack, value: "slack" },
    ];

    const DialogContentComponent = {
        self: AssignToSelfDialogContent,
        other: AssignToOtherDialogContent,
        slack: SlackDialogContent,
    }[assignTo];

    return (
        <>
            <CustomPopover
                popOverElement={
                    <div className="more-icon">
                        <MoreHorizIcon sx={{ fill: "#ffff" }} />
                    </div>
                }
                popoverId={id}
                title={"Assign To"}
            >
                {assignToOptions.map((option, index) => {
                    const { header, value, Icon } = option;
                    return (
                        <MenuItem
                            key={index}
                            selected={value === selectedValue}
                            onClick={(event) => handleMenuClick(event, value)}
                            sx={{
                                "& .Mui-selected": {
                                    backgroundColor: `${value === selectedValue ? "#0082F9 !important" : ""}`,
                                },
                                color: `${value === selectedValue ? "#ffff" : "#8E97A4"} !important`,
                                display: "flex",
                                gap: "1rem",
                                // justifyContent: "space-around",
                            }}
                        >
                            <span>
                                {Icon ? (
                                    <Icon
                                        fill={`${value === selectedValue ? "#ffff" : "#8E97A4"}`}
                                        sx={{
                                            fill: `${
                                                value === selectedValue ? "#ffff" : "#8E97A4"
                                            } !important`,
                                        }}
                                        style={{
                                            fill: `${value === selectedValue ? "#ffff" : "#8E97A4"}`,
                                            width: "1.5rem",
                                        }}
                                    />
                                ) : (
                                    ""
                                )}
                            </span>
                            &nbsp; {header}
                        </MenuItem>
                    );
                })}
            </CustomPopover>
            <Dialog
                open={openDialog}
                onClose={handleClickDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiPaper-root": {
                        background: "#112038 !important",
                        color: "#fff !important",
                        padding: "0.5rem 0.5rem !important",
                    },
                    "& .MuiTypography-root": {
                        color: "#fff !important",
                    },
                }}
            >
                {DialogContentComponent && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <DialogContentComponent
                            data={data}
                            setItem={setItem}
                            setSelectedValue={setSelectedValue}
                            handleClickDialog={handleClickDialog}
                        />
                    </Suspense>
                )}
            </Dialog>
        </>
    );
};

export default RecommendationActionMenu;
