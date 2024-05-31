import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({ fieldVariant, styleSx, variant, ...rest }) => {
    return (
        <>
            <TextField
                id="text-field"
                type="text"
                autoComplete="off"
                sx={{
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    lineHeight: "1.25rem",

                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #1E2B40 !important",
                        borderColor: "#1E2B40 !important",
                    },
                    "& .MuiInputBase-input": {
                        color: "#fff !important",
                        padding: "0.5rem !important",
                    },
                    "& .MuiInputBase-root": {
                        height: "inherit",
                    },
                    "& .MuiInputBase-input::placeholder": {
                        color: "#8E97A4",
                        fontSize: "0.75rem",
                    },
                    "& .Mui-disabled": {
                        "-webkit-text-fill-color": "#455062 !important",
                        opacity: 1,
                        fontWeight: "400 !important",
                    },
                    "&:internal-autofill-selected": {},
                    ...styleSx,
                }}
                //   variant={fieldVariant}
                {...rest}
            />
        </>
    );
};

export default CustomTextField;
