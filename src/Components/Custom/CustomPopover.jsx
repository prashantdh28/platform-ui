import React, { forwardRef, useImperativeHandle, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Divider, Popover, Typography } from "@mui/material";

const CustomPopover = forwardRef(
    ({ children, popoverId = "CustomPopover", popOverElement, sx, title, hideHeader, ...rest }, ref) => {
        const [anchorEl, setAnchorEl] = useState(null);

        const handleToggle = (event) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
        };

        const open = Boolean(anchorEl);
        const id = open ? popoverId : undefined;

        // Expose handleClick function via ref
        useImperativeHandle(ref, () => ({
            handleClick: () => {
                handleToggle(); // Call handleToggle to toggle popover
            },
            open: open,
        }));

        return (
            <>
                <span aria-describedby={id} style={{ cursor: "pointer" }} onClick={handleToggle}>
                    {popOverElement}
                </span>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleToggle}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    sx={{
                        "& .MuiPaper-root": {
                            background: "#112038 !important",
                            color: "#fff !important",
                        },
                        ...sx,
                    }}
                    {...rest}
                >
                    <Box sx={{ padding: "0.5rem" }}>
                        {!hideHeader ? (
                            <>
                                <div
                                    style={{
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
                                        {title ? title : ""}
                                    </Typography>

                                    <CloseOutlinedIcon
                                        onClick={handleToggle}
                                        sx={{ cursor: "pointer", fill: "#8E97A4" }}
                                    />
                                </div>
                                <Divider
                                    sx={{
                                        background: "#1E2B40",
                                        marginTop: "0.5rem",
                                        marginBottom: "0.5rem",
                                        borderWidth: "1px",
                                    }}
                                />{" "}
                            </>
                        ) : (
                            ""
                        )}

                        {children}
                    </Box>
                </Popover>
            </>
        );
    }
);

export default CustomPopover;
