import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";
import CustomOutlinedInput from "../../../../../Components/Custom/CustomOutlinedInput";
import { useDispatch, useSelector } from "react-redux";
import { getTIDFiltersByUserId, saveFilter } from "../../../../../Services/TID/tid.service";
import useToastify from "../../../../../Hooks/useToastify";

const SaveFilter = ({ handleFiltersClick, onApplyFilterClick }) => {
    const dispatch = useDispatch();
    const [filterName, setFilterName] = useState("");

    const { filterObject } = useSelector((state) => state.TIDEntity);

    const { showToast } = useToastify();

    const onSaveClick = async () => {
        const requestObject = {
            name: filterName,
            filter_criteria: {
                text_filter: filterObject?.searchValue || null,
                source_region: filterObject?.sourceRegion || null,
                target_region: filterObject?.targetRegion || null,
                target_industry: filterObject?.targetedIndustries || null,
                type: filterObject?.entityType || null,
                motivation: filterObject?.motivation || null,
                sophistication: filterObject?.sophistication || null,
                ttps: filterObject?.selectedTTps || null,
            },
        };
        const response = await dispatch(saveFilter({ requestObject })).unwrap();
        if (response?.id) {
            showToast("The filter has been saved successfully.", {
                type: "success",
            });
            handleFiltersClick("saveDrawer");
            onApplyFilterClick(filterObject);
            dispatch(getTIDFiltersByUserId({}));
        }
    };

    return (
        <>
            <Box className="filter-main-section">
                <Box className="filter-header">
                    <span>Save Filter</span>
                    <Box className="cross-btn" onClick={() => handleFiltersClick("saveDrawer")}>
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
                    <InputLabel
                        sx={{
                            color: "#8E97A4",
                            fontSize: "1rem",
                            fontWeight: "400",
                            lineHeight: "1.25rem",
                        }}
                    >
                        Filter name
                    </InputLabel>
                    <CustomOutlinedInput
                        placeholder="Filter name"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                    <Button variant="text" onClick={() => handleFiltersClick("manageFilterDrawer")}>
                        Manage saved filter
                    </Button>
                </Box>
            </Box>
            <Box className="filter-bottom" sx={{ justifyContent: "flex-end" }}>
                <Box className="cancle-box">
                    <Button
                        className="cancle-btn-filter"
                        size="small"
                        onClick={() => handleFiltersClick("saveDrawer")}
                        variant="contained"
                    >
                        Cancle
                    </Button>
                    <Button
                        className="apply-btn-filter"
                        size="small"
                        onClick={onSaveClick}
                        variant="contained"
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default SaveFilter;
