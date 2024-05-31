import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./myTask.css";
const TaskFilters = ({ toggleDrawer }) => {
    return (
        <>
            <Box className="filter-header">
                <span>Apply Filters</span>
                <IconButton className="cross-btn" onClick={toggleDrawer}>
                    <CloseOutlinedIcon sx={{ fill: "#fff" }} />
                </IconButton>
            </Box>
            <Box sx={{ marginTop: "auto", marginLeft: "auto" }}>
                {/* <Box className="cancle-box"> */}
                <Button
                    className="cancle-btn-filter"
                    size="small"
                    onClick={() => {
                        // handleUpdate(); className="cancle-btn-filter"
                        toggleDrawer();
                    }}
                    variant="contained"
                >
                    save
                </Button>
                {/* </Box> */}
            </Box>
        </>
    );
};

export default TaskFilters;
