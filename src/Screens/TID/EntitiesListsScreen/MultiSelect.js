import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import React from "react";
import "./MultiSelect.css";

const MultiSelect = ({ label, options, menuClassName, selectedOption, handleChange, className, style }) => {
    //const [selectedItems, setSelectedItems] = useState([]);

    return (
        <FormControl
            sx={{
                m: 1,
                width: 200,
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--comment-border-bottom) !important",
                },
                "& .MuiSvgIcon-root": {
                    color: "var(--name-email) !important",
                },
                ...style,
            }}
        >
            <InputLabel
                id={`custom-dropdown-label-${label}`}
                style={{ color: "var(--name-email)", maxWidth: "80%" }}
            >
                {label}
            </InputLabel>
            <Select
                labelId={`custom-dropdown-label-${label}`}
                id={`custom-dropdown-${label}`}
                multiple
                value={selectedOption}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => selected.join(", ")}
                style={{ width: "100%" }}
                sx={{
                    "& .MuiSelect-select": {
                        color: "var(--name-email)",
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option}
                        className={`multi-select-item ${menuClassName}`}
                        style={{ maxHeight: "50px", color: "var(--name-email)" }}
                    >
                        <Checkbox
                            checked={selectedOption?.indexOf(option) > -1}
                            style={{
                                color: "var(--name-email)",
                            }}
                            sx={{
                                "& .Mui-checked": {
                                    color: "var(--name-email)",
                                },
                            }}
                        />
                        <ListItemText
                            primary={option}
                            className={className}
                            color="var(--name-email)"
                            style={{ color: "var(--name-email)" }}
                        />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelect;
