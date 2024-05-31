import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Divider, Popper, Typography } from "@mui/material";
import React from "react";

const CustomPopper = ({ children, popperElement, sx, popperId = "CustomPopper", title, ...rest }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? popperId : undefined;
    return (
        <>
            <span aria-describedby={id} onClick={handleClick}>
                {popperElement}
            </span>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
                disablePortal={false}
                modifiers={[
                    {
                        name: "flip",
                        enabled: true,
                        options: {
                            altBoundary: true,
                            rootBoundary: "document",
                            padding: 8,
                        },
                    },
                    {
                        name: "preventOverflow",
                        enabled: true,
                        options: {
                            altAxis: true,
                            altBoundary: true,
                            tether: true,
                            rootBoundary: "document",
                            padding: 8,
                        },
                    },
                    {
                        name: "arrow",
                        enabled: false,
                    },
                ]}
                sx={{
                    background: "#112038 !important",
                    color: "#fff !important",
                    ...sx,
                }}
                {...rest}
            >
                <Box sx={{ padding: "0.5rem" }}>
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
                            onClick={handleClick}
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
                    />
                    {children}
                </Box>
            </Popper>
        </>
    );
};

export default CustomPopper;
