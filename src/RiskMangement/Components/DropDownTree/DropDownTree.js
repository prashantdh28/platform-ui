import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./DropDownTree.css";

const DropDownCOmponent = ({
  label,
  selectOption,
  handleChange,
  options,
  className,
  name,
  sx,
}) => {
  return (
    <FormControl className="main-select-div" sx={{ ...sx }}>
      <InputLabel id="select-small-label">{label}</InputLabel>
      <Select
        labelId="select-small-label"
        id="select-box-font"
        value={selectOption}
        onChange={handleChange}
        name={name}
        className={`select ${className}`}
        style={{ color: "var(--name-email)" }}
        sx={{ color: "var(--name-email)" }}
      >
        {options?.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            className="drop-down-color"
            color="var(--name-email)"
            style={{ colo: "var(--name-email)" }}
            sx={{ color: "var(--name-email)" }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownCOmponent;
