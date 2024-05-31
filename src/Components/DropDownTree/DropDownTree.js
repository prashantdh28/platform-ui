import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import "./DropDownTree.css";

const DropDownTree = ({
    handleBlur,
    minwidth,
    label,
    options,
    menuClassName,
    menuItemId,
    handleChange,
    selectedOption,
    setSelectedOption,
    color,
    disabled,
    defaultValue,
    fullwidth,
    error,
}) => {
    const handleNoneOption = () => {
        if (typeof setSelectedOption === "function") {
            setSelectedOption("none"); // Resetting the selection to none
        }
    };

    return (
        <FormControl
            sx={{
                minWidth: minwidth ? "100%" : 200,
                cursor: disabled ? "not-allowed" : "pointer",
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--comment-border-bottom) !important",
                },
                "& .MuiSvgIcon-root": {
                    color: "var(--name-email) !important",
                },
            }}
            disabled={disabled ? true : false}
            size="large"
        >
            <InputLabel id="demo-select-small-label" style={{ color: "var(--name-email)", maxWidth: "80%" }}>
                {label}
            </InputLabel>

            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedOption}
                label={label}
                onChange={handleChange}
                onBlur={handleBlur}
                className="select"
                sx={{
                    "& .MuiSelect-select": {
                        color: "var(--name-email) !important",
                    },
                }}
                renderValue={(selected) => {
                    const selectedLabel = options.find((opt) => opt.value === selected)?.label;
                    return selectedLabel || "";
                }}
            >
                <MenuItem
                    value={null || "" || undefined}
                    onClick={handleNoneOption}
                    className={menuClassName}
                    id={menuItemId}
                    sx={{ color: "var(--name-email)" }}
                >
                    None
                </MenuItem>

                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option.value}
                        className={menuClassName}
                        id={menuItemId}
                        sx={{ color: "var(--name-email)" }}
                    >
                        {option?.label}
                    </MenuItem>
                ))}
            </Select>
            {error ? <div style={{ color: "red" }}> {`${error} `}</div> : ""}
        </FormControl>
    );
};

export default DropDownTree;
