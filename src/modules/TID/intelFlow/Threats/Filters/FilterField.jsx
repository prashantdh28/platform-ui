import React, { useRef } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Divider, IconButton, InputAdornment, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomOutlinedInput from "../../../../../Components/Custom/CustomOutlinedInput";
import {
    deleteFilterByID,
    getTIDFiltersByUserId,
    updateFilter,
} from "../../../../../Services/TID/tid.service";
import useToastify from "../../../../../Hooks/useToastify";

const FilterField = ({ item }) => {
    const dispatch = useDispatch();
    const { showToast } = useToastify();
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterName, setFilterName] = useState(item?.name || "");
    const [isDisabled, setIsDisabled] = useState(true);
    const inputRef = useRef(null); // Ref for the input field

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onDeleteFilterClick = async () => {
        const response = await dispatch(deleteFilterByID({ filterID: item?.id }));
        if (response?.meta?.requestStatus === "fulfilled") {
            dispatch(getTIDFiltersByUserId({}));
            handleClose();
        }
    };

    const onUpdateFilterBlur = async () => {
        const response = await dispatch(
            updateFilter({ requestObject: { ...item, name: filterName }, filterId: item?.id })
        );
        if (response?.meta?.requestStatus === "fulfilled") {
            // dispatch(getTIDFiltersByUserId({}));
            showToast("The filter has been successfully updated.", {
                type: "success",
            });
            handleClose();
            setIsDisabled(true);
        }
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <CustomOutlinedInput
                sx={{
                    background: "#112038",
                    "& .Mui-disabled": {
                        "-webkit-text-fill-color": " #FFFFFF",
                    },
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleClick}>
                            <MoreHorizIcon sx={{ fill: "#8E97A4" }} />
                        </IconButton>
                    </InputAdornment>
                }
                onChange={(e) => {
                    setFilterName(e.target.value);
                }}
                onBlur={onUpdateFilterBlur}
                disabled={isDisabled}
                value={filterName}
                inputRef={inputRef}
            />
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                sx={{
                    "& .MuiMenu-list": {
                        background: "#112038 !important",
                    },
                    "& .MuiMenu-paper": {
                        background: "#112038 !important",
                        borderRadius: "0.8rem !important",
                    },
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: 48 * 4.5,
                            width: "9.313rem",
                            //     height: "3.25rem",
                            borderRadius: "0.8rem !important",
                        },
                    },
                }}
            >
                <MenuItem
                    sx={{
                        color: "#fff",
                        justifyContent: "center ",
                    }}
                    onClick={() => {
                        setIsDisabled(false);
                        if (inputRef.current) {
                            setTimeout(() => {
                                // inputRef.current.focus();
                                inputRef.current.select();
                            }, 100);
                        }
                        handleClose();
                    }}
                >
                    Rename
                </MenuItem>
                <Divider sx={{ border: "1px solid #FFFFFF1F", margin: 0 }} />
                <MenuItem
                    sx={{
                        color: "#DB3960",
                        justifyContent: "center ",
                    }}
                    onClick={onDeleteFilterClick}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default FilterField;
