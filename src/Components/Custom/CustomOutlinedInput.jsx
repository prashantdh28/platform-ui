import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import React from "react";

const CustomOutlinedInput = ({ placeholder, sx, formSx, ...rest }) => {
    return (
        <>
            <FormControl sx={{ ...formSx }} variant="outlined">
                <OutlinedInput
                    fullWidth
                    type="text"
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "0",
                        },
                        height: "2.25rem",
                        borderRadius: "0.375rem !important",
                        background: "#08172f",
                        border: "1px solid #1e2b40 !important",
                        "& .MuiInputBase-input": {
                            color: "#fff !important",
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "#8E97A4",
                        },
                        ...sx,
                    }}
                    placeholder={placeholder}
                    {...rest}
                />
            </FormControl>
        </>
    );
};

export default CustomOutlinedInput;
