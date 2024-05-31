import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import React from "react";

const CustomLoadingButton = ({ children, ...rest }) => {
    return (
        <>
            <LoadingButton loadingIndicator={<CircularProgress size={20} />} variant="contained" {...rest}>
                {children}
            </LoadingButton>
        </>
    );
};

export default CustomLoadingButton;
