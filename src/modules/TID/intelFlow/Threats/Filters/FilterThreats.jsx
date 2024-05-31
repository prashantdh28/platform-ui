import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAutocomplete from "../../../../../Components/Custom/CustomAutocomplete";
import CustomOutlinedInput from "../../../../../Components/Custom/CustomOutlinedInput";
import CustomSelect from "../../../../../Components/Custom/CustomSelect";
import { setFilterObject } from "../../../../../redux/Slice/TID/EntitySlice";

const FilterThreats = ({ toggleDrawer, handleFiltersClick, cleareFilterObject, onApplyFilterClick }) => {
    const dispatch = useDispatch();
    const {
        regions,
        sophistication: sophisticationData,
        motivation,
        entityTypes,
        sectors: sectorsData,
    } = useSelector((state) => state.vocabulary);

    const { filterObject, savedFiltersList } = useSelector((state) => state.TIDEntity);

    const [filterCriteria, setFilterCriteria] = useState({ ...filterObject });

    const handleFieldChange = (value, filed) => {
        setFilterCriteria({ ...filterCriteria, [filed]: value, page: 0 });
    };
    const handleSavedFilterChange = async (event) => {
        const {
            target: { value },
        } = event;
        const savedFilterOptions = await savedFiltersList?.find((filter) => filter?.name === value);
        const filterCriteria = { ...savedFilterOptions?.filter_criteria };

        setFilterCriteria({
            ...filterCriteria,
            selectedFilter: typeof value === "string" ? value.split(",") : value,
            searchValue: filterCriteria?.text_filter || "",
            sourceRegion: filterCriteria?.source_region || [],
            targetRegion: filterCriteria?.target_region || [],
            targetedIndustries: filterCriteria?.target_industry || [],
            entityType: filterCriteria?.type || [],
            motivation: filterCriteria?.motivation || "",
            sophistication: filterCriteria?.sophistication || "",
            selectedTTps: filterCriteria?.selectedTTps || [],
        });
    };

    return (
        <>
            <Box className="filter-main-section">
                <Box className="filter-header">
                    <span>Apply Filters</span>
                    <Box className="cross-btn" onClick={toggleDrawer(false)}>
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
                <Box className="filter-container">
                    <CustomSelect
                        menuItems={
                            savedFiltersList && savedFiltersList.length > 0
                                ? savedFiltersList.map((item) => item?.name)
                                : []
                        }
                        placeholder="Saved filter"
                        selectedMenuItems={filterCriteria.selectedFilter || []}
                        handleChange={handleSavedFilterChange}
                    />
                    {savedFiltersList && savedFiltersList.length > 0 ? (
                        <Button
                            variant="text"
                            className="save-filter-text"
                            sx={{
                                justifyContent: "flex-start",
                                color: "#0082F9 !important",
                            }}
                            onClick={() => handleFiltersClick("manageFilterDrawer")}
                        >
                            Manage saved filter
                        </Button>
                    ) : (
                        ""
                    )}
                    <CustomOutlinedInput
                        // className="tab-search-input"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fill: "#8E97A4" }} />
                            </InputAdornment>
                        }
                        value={filterCriteria?.searchValue}
                        onChange={(e) => {
                            handleFieldChange(e.target.value, "searchValue");
                        }}
                        fullwidth
                        placeholder="Search anything"
                    />
                    {/* {shouldRenderComponent(filterOptionsList, "Source Region") && ( */}
                    <CustomAutocomplete
                        placeholder="Source Region"
                        multiple
                        options={regions}
                        getOptionLabel={(option) => option?.title}
                        groupBy={(option) => option.groupBy}
                        isOptionEqualToValue={(option, value) => {
                            return option?.title === value?.title;
                        }}
                        onChange={(e, value) => {
                            // const sourceRegion =
                            //     value && value.length > 0 ? value.map((item) => {...item}) : [];
                            handleFieldChange(value, "sourceRegion");
                        }}
                        value={filterCriteria?.sourceRegion}
                    />
                    {/* )} */}
                    {/* {shouldRenderComponent(filterOptionsList, "Target Region") && ( */}
                    <CustomAutocomplete
                        placeholder="Target Region"
                        multiple
                        options={regions}
                        getOptionLabel={(option) => option?.title}
                        groupBy={(option) => option.groupBy}
                        isOptionEqualToValue={(option, value) => option?.title === value?.title}
                        onChange={(e, value) => {
                            // const targetRegion =
                            //     value && value.length > 0 ? value.map((item) => item?.title) : [];
                            handleFieldChange(value, "targetRegion");
                        }}
                        value={filterCriteria?.targetRegion}
                    />
                    {/* )} */}
                    {/* {shouldRenderComponent(filterOptionsList, "Targeted Industries") && ( */}
                    <CustomSelect
                        multiple
                        placeholder="Targated Industries"
                        menuItems={sectorsData}
                        handleChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            handleFieldChange(
                                typeof value === "string" ? value.split(",") : value,
                                "targetedIndustries"
                            );
                        }}
                        selectedMenuItems={filterCriteria?.targetedIndustries}
                        //   handleChange={handleFilterChange}
                    />
                    {/* )} */}
                    {/* {shouldRenderComponent(filterOptionsList, "Filter By Types") && ( */}
                    <CustomSelect
                        multiple
                        placeholder="Threat Type"
                        menuItems={entityTypes}
                        handleChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            handleFieldChange(
                                typeof value === "string" ? value.split(",") : value,
                                "entityType"
                            );
                        }}
                        selectedMenuItems={filterCriteria?.entityType || []}
                        //   handleChange={handleFilterChange}
                    />
                    {/* )} */}
                    {/* {shouldRenderComponent(filterOptionsList, "Motivation") && ( */}
                    <CustomSelect
                        placeholder="Motivation"
                        menuItems={motivation}
                        handleChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            handleFieldChange(
                                typeof value === "string" ? value.split(",") : value,
                                "motivation"
                            );
                        }}
                        selectedMenuItems={filterCriteria?.motivation}
                        //   selectedMenuItems={selectedFilterOptions}
                        //   handleChange={handleFilterChange}
                    />
                    {/* )} */}
                    {/* {shouldRenderComponent(filterOptionsList, "Sophistication") && ( */}
                    <CustomSelect
                        placeholder="Sophistication"
                        menuItems={sophisticationData}
                        handleChange={(event) => {
                            const {
                                target: { value },
                            } = event;
                            handleFieldChange(
                                typeof value === "string" ? value.split(",") : value,
                                "sophistication"
                            );
                        }}
                        selectedMenuItems={filterCriteria?.sophistication}
                        //   selectedMenuItems={selectedFilterOptions}
                        //   handleChange={handleFilterChange}
                    />
                    {/* )} */}
                </Box>
            </Box>

            <Box className="filter-bottom">
                <Button
                    variant="text"
                    onClick={() => {
                        handleFiltersClick("saveDrawer");
                        dispatch(setFilterObject({ ...filterCriteria }));
                    }}
                    // disabled={}
                    className="save-filter-text"
                >
                    Save Filter
                </Button>
                <Box className="cancle-box">
                    <Button
                        className="cancle-btn-filter"
                        size="small"
                        onClick={() => cleareFilterObject()}
                        variant="contained"
                    >
                        Reset
                    </Button>
                    <Button
                        className="apply-btn-filter"
                        size="small"
                        onClick={() => onApplyFilterClick(filterCriteria)}
                        variant="contained"
                    >
                        Apply
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default FilterThreats;
