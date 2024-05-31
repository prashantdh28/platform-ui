import TextField from "@mui/material/TextField";
import React from "react";

const CustomTextField = ({
    label,
    multiline,
    rows,
    defaultValue,
    onChange,
    labelColor,
    textColor,
    className,
    style,
    variant,
    id,
    sx,
    disabled,
    ...rest
}) => {
    const inputLabelProps = {
        style: {
            color: "var(--name-email)",
        },
    };

    const inputProps = {
        style: {
            color: "var(--name-email)",
        },
    };

    return (
        <TextField
            id={id}
            label={label}
            multiline={multiline}
            rows={rows}
            defaultValue={defaultValue}
            onChange={onChange}
            className={className}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
            variant={variant}
            style={style}
            disabled={disabled}
            sx={{
                "& .MuiInput-root::after": {
                    borderBottom: "2px solid var(--comment-border-bottom) !important",
                },
                "& .MuiInput-root::before": {
                    borderBottom: "1px solid var(--comment-border-bottom) !important",
                },
                "& .MuiInputBase-root,.MuiInputBase-input": {
                    color: "var(--name-email) !important",
                },
                "& .MuiInputBase-input::placeholder": {
                    color: "var(--name-email) !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--comment-border-bottom) !important",
                },
                "& .MuiSvgIcon-root": {
                    color: "var(--name-email) !important",
                },
                "& .Mui-disabled": {
                    "-webkit-text-fill-color": "var(--name-email) !important",
                    opacity: "0.7 !important",
                },
                ...sx,
            }}
            {...rest}
        />
    );
};

export default CustomTextField;
