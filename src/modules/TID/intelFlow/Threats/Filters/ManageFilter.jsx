import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useSelector } from "react-redux";
import FilterField from "./FilterField";

const ManageFilter = ({ handleFiltersClick }) => {
    const { savedFiltersList } = useSelector((state) => state.TIDEntity);

    return (
        <>
            <Box className="filter-main-section">
                <Box className="filter-header">
                    <span>Manage Saved Filters</span>
                    <Box className="cross-btn" onClick={() => handleFiltersClick("manageFilterDrawer")}>
                        <CloseOutlinedIcon sx={{ fill: "#fff" }} />
                    </Box>
                </Box>
                <Divider
                    sx={{
                        background: "#1E2B40",
                        margin: "0rem 0rem 1rem",
                        borderWidth: "1px",
                    }}
                />
                <Box className="filter-container" sx={{ gap: "0.5rem" }}>
                    {savedFiltersList && savedFiltersList.length > 0
                        ? savedFiltersList.map((item, index) => {
                              return <FilterField key={index} item={item} />;
                          })
                        : ""}
                </Box>
            </Box>
            <Box className="filter-bottom" sx={{ justifyContent: "flex-end" }}>
                <Box className="cancle-box">
                    <Button
                        className="cancle-btn-filter"
                        size="small"
                        onClick={() => handleFiltersClick("manageFilterDrawer")}
                        variant="contained"
                    >
                        Cancle
                    </Button>
                    {/* <Button
                        className="apply-btn-filter"
                        size="small"
                        // onClick={onSaveClick}
                        variant="contained"
                    >
                        Save
                    </Button> */}
                </Box>
            </Box>
        </>
    );
};

export default ManageFilter;
