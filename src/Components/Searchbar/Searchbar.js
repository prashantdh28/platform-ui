import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Searchbar.css";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const Searchbar = ({ label = "Search", placeholder, className, id, onchange, width, value }) => {
    const [filedValue, setFiledValue] = useState(value);
    
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    useEffect(() => {
        setFiledValue(value);
        return () => {
            setFiledValue("");
        };
    }, [value]);
    
    return (
        <FormControl
            sx={{
                width: { width },
            }}
            // size="medium"
        >
            <TextField
                id={id}
                className={className}
                label={label}
                variant="outlined"
                placeholder={placeholder}
                value={filedValue}
                onChange={onchange}
                InputLabelProps={{
                    style: {
                        color: BackgroundColor || "var(--name-email)",
                    },
                    width: "100%",
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sx={{ color: "var(--name-email)" }}>
                            <AiOutlineSearch className="search-icon" />
                        </InputAdornment>
                    ),
                }}
            />
        </FormControl>
    );
};

export default Searchbar;
