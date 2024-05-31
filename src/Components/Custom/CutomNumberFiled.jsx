import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

const CutomNumberFiled = ({
    fieldVariant,
    styleSx,
    variant,
    label,
    value,
    onChange,
    min = false,
    ...rest
}) => {
    const handleIncrease = () => {
        onChange(parseInt(value) + 1);
    };

    const handleDecrease = () => {
        onChange(parseInt(value) - 1);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                gap: "0.5rem",
            }}
        >
            <label style={{ color: "#8E97A4" }}>{label}</label>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    justifyContent: "space-between",
                    border: "1px solid #1E2B40",
                    borderRadius: "6px",
                    width: "100%",
                }}
            >
                <TextField
                    id="text-field"
                    type="text"
                    autoComplete="off"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        lineHeight: "1.25rem",
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "0",
                        },
                        "& .MuiInputBase-input": {
                            color: "#fff !important",
                            padding: "0 !important",
                            width: "4rem",
                            textAlign: "center",
                        },
                        "& .MuiInputBase-root": {
                            height: "inherit",
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "#8E97A4",
                            fontSize: "0.75rem",
                        },
                        "&:internal-autofill-selected": {},
                        ...styleSx,
                    }}
                    min={min ? min : ""}
                    {...rest}
                />
                <Divider
                    orientation="vertical"
                    sx={{
                        borderColor: "#1E2B40",
                    }}
                    variant="middle"
                    flexItem
                />
                <IconButton onClick={handleIncrease} size="small">
                    <AddIcon sx={{ fill: "#ffff" }} />
                </IconButton>
                <Divider
                    orientation="vertical"
                    sx={{
                        borderColor: "#1E2B40",
                    }}
                    variant="middle"
                    flexItem
                />
                <IconButton disabled={value <= min ? true : false} onClick={handleDecrease} size="small">
                    <RemoveIcon sx={{ fill: "#ffff" }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CutomNumberFiled;
