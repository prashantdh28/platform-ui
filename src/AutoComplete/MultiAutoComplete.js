import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const MultiAutoComplete = ({ placeHolder, sx, ...props }) => {
    return (
        <Autocomplete
            fullWidth
            id="tags-filled"
            // options={[].map((option) => option.title)}
            sx={{
                "& .MuiInput-root::after": {
                    borderBottom: "2px solid var(--comment-border-bottom) !important",
                },
                "& .MuiInput-root::before": {
                    borderBottom: "1px solid var(--comment-border-bottom) !important",
                },
                "& .MuiInput-root,.MuiInputBase-root": {
                    color: "var(--button-tag-text-color) !important",
                    "& .MuiAutocomplete-endAdornment": {
                        "& .MuiSvgIcon-root": {
                            color: "var(--button-tag-text-color) !important",
                        },
                    },
                },
                "& .MuiAutocomplete-tag": {
                    color: "var(--name-email) !important",
                    background: "var(--button-tag-color) !important",
                    "& .MuiSvgIcon-root": {
                        color: "var(--desc-color) !important",
                    },
                },
                "& .MuiAutocomplete-popper": {
                    color: "var(--name-email) !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--comment-border-bottom) !important",
                },
                "& .MuiFormLabel-root": {
                    color: "var(--name-email) !important",
                },
                "& .Mui-disabled": {
                    WebkitTextFillColor: "var(--name-email) !important",
                    opacity: "0.7 !important",
                },
                ...sx,
            }}
            renderInput={(params) => <TextField {...params} variant="filled" placeholder={placeHolder} />}
            {...props}
        />
    );
};

export default MultiAutoComplete;
