import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

const CustomChip = ({
    data,
    isDeletable = false,
    onDelete,
    borderstyle = "#FFFFFF3D",
    color = "#fff",
    onClick,
    sx,
    ...rest
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDelete = (event) => {
        if (typeof onDelete === "function" && isDeletable) {
            handleClick(event);
            // onDelete(data?.label);
        }
    };

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleChipClick = (event) => {
        if (typeof onClick === "function") {
            onClick(data);
            // onDelete(data?.label);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? "delete-popover" : undefined;

    return (
        <>
            <Chip
                // className="customChip"
                sx={{
                    borderRadius: "0.25rem",
                    background: "#FFFFFF1F",
                    // border: "1px solid #FFFFFF3D",
                    border: `2px solid ${borderstyle}`,
                    margin: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    lineHeight: "1.013rem",
                    "& .MuiChip-label": {
                        // color: "#FFFFFF",
                        color: `${color}`,
                    },
                    ...sx,
                }}
                deleteIcon={
                    <CloseOutlinedIcon
                        sx={{
                            fill: "#fff",
                        }}
                    />
                }
                label={data?.label}
                onDelete={isDeletable ? handleDelete : undefined}
                onClick={handleChipClick}
                {...rest}
            />
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                disablePortal={true}
                sx={{
                    zIndex: "1",
                }}
            >
                <Box
                    sx={{
                        width: "12.938rem",
                        height: "9.5rem",
                        borderRadius: "0.375rem 0px 0px 0px",
                        border: "1px solid #1E2B40",
                        background: "#112038",
                        boxShadow: "3px 4px 18px 2px #0A081178",
                        padding: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "space-between",
                            fontSize: "0.75rem",
                            fontWeight: "500",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontSize: "0.875rem", fontWeight: "500" }}
                            color="#fff"
                        >
                            Delete {data?.label}
                        </Typography>
                        <CloseOutlinedIcon
                            onClick={handleClick}
                            sx={{ cursor: "pointer", fill: "#8E97A4" }}
                        />
                    </Box>
                    <Divider
                        sx={{
                            background: "#1E2B40",
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                            borderWidth: "1px",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "80%",
                        }}
                    >
                        <div>
                            <Chip
                                className="customChip"
                                sx={{
                                    borderRadius: "0.25rem",
                                    background: "#FFFFFF1F",
                                    border: "1px solid #FFFFFF3D",
                                    margin: "0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "500",
                                    lineHeight: "1.013rem",
                                    "& .MuiChip-label": {
                                        color: "#FFFFFF",
                                    },
                                }}
                                label={data?.label}
                            />
                        </div>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0.5rem 0rem",
                            }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    color: "#fff",
                                    borderColor: "#fff",
                                    borderRadius: "0.375rem",
                                    height: "1.75rem",
                                }}
                                onClick={handleClick}
                            >
                                Cancle
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{
                                    borderRadius: "0.375rem",
                                    height: "1.75rem",
                                    background: "#DB3960",
                                }}
                                onClick={(e) => {
                                    onDelete(data);
                                    handleClick(e);
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Popper>
        </>
    );
};

export default CustomChip;
