import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete, Popper, TextField } from "@mui/material";
import Chip from "@mui/material/Chip";
import React, { useEffect, useState } from "react";

const CustomAutocomplete = ({ placeholder, Sx, value: propValue, onChange, optionLable, ...rest }) => {
    const [value, setValue] = useState(propValue || []);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        // If an onChange prop is provided, pass the new value
        if (onChange) {
            onChange(null, newValue);
        }
    };
    useEffect(() => {
        setValue(propValue);
    }, [propValue]);

    return (
        <>
            <Autocomplete
                options={[]}
                id="custom-autocomplete"
                size="small"
                sx={{
                    border: "1px solid #1E2B40",
                    background: "#08172F",
                    borderRadius: "0.375rem",
                    minHeight: "2.25rem",
                    color: "#FFFFFF",
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "0",
                    },
                    "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall ": {
                        padding: "6px 1rem 6px 6px ",
                    },
                    "& .MuiFormLabel-root": {
                        color: "#8E97A4 !important",
                        lineHeight: 1,
                    },
                    "& .MuiSvgIcon-root": {
                        color: "#8E97A4 !important",
                    },
                    "& .MuiInputBase-root": {
                        color: "#ffff !important",
                    },
                    "& .MuiPaper-root": {
                        background: "#08172F !important",
                    },
                    ...Sx,
                }}
                PopperComponent={(props) => (
                    <Popper
                        {...props}
                        sx={{
                            "& .MuiPaper-root": {
                                background: "#08172F !important",
                                border: "1px solid #1E2B40",
                            },
                            "& .MuiAutocomplete-listbox": {
                                background: "#08172F !important",
                            },
                            "& .MuiAutocomplete-option": {
                                background: "#08172F !important",
                                color: "#FFFFFF !important",
                            },
                            "& .MuiAutocomplete-groupLabel	": {
                                background: "#8E97A4 !important",
                                color: "#FFFFFF !important",
                            },
                            "& .MuiInputBase-input	": {
                                color: "#FFFFFF !important",
                            },

                            //     "& ..MuiAutocomplete-groupUl": {
                            //         background: "#FFFFFF1F !important",
                            //     },
                            "& .MuiAutocomplete-noOptions": {
                                color: "#fff !important",
                            },
                        }}
                    >
                        {props.children}
                    </Popper>
                )}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip
                            className="customChip"
                            sx={{
                                borderRadius: "0.25rem",
                                background: "#FFFFFF1F",
                                border: "1px solid #FFFFFF3D",
                                // border: `1px solid `,
                                margin: "0.5rem",
                                fontSize: "0.75rem",
                                fontWeight: "500",
                                lineHeight: "1.013rem",
                                "& .MuiChip-label": {
                                    color: "#FFFFFF",
                                },
                            }}
                            deleteIcon={
                                <CloseOutlinedIcon
                                    sx={{
                                        fill: "#fff",
                                    }}
                                />
                            }
                            label={option.title ? option.title : option[optionLable]}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderOption={(props, option) => {
                    if (value && value?.length > 0 && value?.find((item) => item?.title === option?.title)) {
                        return (
                            <li {...props} style={{ background: "#1E2B40" }}>
                                {option.title}
                            </li>
                        );
                    }
                    return <li {...props}>{option.title}</li>;
                }}
                popupIcon={<KeyboardArrowDownIcon sx={{ fill: "#8E97A4" }} />}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={placeholder}
                        sx={{
                            height: "inherit",
                            "& .MuiInputLabel-root": {
                                justifyContent: "flex-end", // Align input label to the right
                            },
                        }}
                    />
                )}
                value={value}
                onChange={(e, newValue) => handleValueChange(newValue)}
                {...rest}
            />
        </>
    );
};

export default CustomAutocomplete;
