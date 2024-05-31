import { Switch } from "@mui/material";
import React from "react";

const CustomSwitch = ({ sx, ...rest }) => {
    return (
        <Switch
            color="primary"
            inputProps={{ "aria-label": "controlled" }}
            sx={{
                "& .MuiSwitch-track": {
                    background: "var(--name-email)",
                },
                ...sx,
            }}
            {...rest}
        />
    );
};

export default CustomSwitch;
