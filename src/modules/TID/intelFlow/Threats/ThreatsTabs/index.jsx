import ClearAllIcon from "@mui/icons-material/ClearAll";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SearchIcon from "@mui/icons-material/Search";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DotIcon } from "../../../../../Assests/SVG/DotsNine.svg";
import { ReactComponent as PrivateIcon } from "../../../../../Assests/SVG/privateIntel.svg";
import { ReactComponent as SettingIcon } from "../../../../../Assests/SVG/setting-4.svg";
import CustomOutlinedInput from "../../../../../Components/Custom/CustomOutlinedInput";
import CustomTooltip from "../../../../../Components/Custom/CustomTooltip";
import { sideBarListColor } from "../../../../../Constants/Constant";
import { useDebounce } from "../../../../../Hooks/useDebouncedValue";
import useToastify from "../../../../../Hooks/useToastify";
import { resetFilterObject, setEntityIDs, setFilterObject } from "../../../../../redux/Slice/TID/EntitySlice";
import FilterThreats from "../Filters/FilterThreats";
import ManageFilter from "../Filters/ManageFilter";
import SaveFilter from "../Filters/SaveFilter";
import ThreatFilterList from "./ThreatFilterList";
import ThreatsListTab from "./ThreatsListTab";

const ThreatsTabs = () => {
    const dispatch = useDispatch();

    const { showToast } = useToastify();

    const { entityAllData, filterObject } = useSelector((state) => state.TIDEntity);

    const [tabValue, setTabValue] = useState("1");
    // const [tabType, setTabType] = useState("");
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(filterObject?.searchValue);
    const [filterDrawers, seFilterDrawers] = useState({
        saveDrawer: false,
        manageFilterDrawer: false,
    });

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
        if (newValue === "1") {
            // setTabType("");
        }
        if (newValue === "2") {
            // setTabType("track");
        }
        if (newValue === "3") {
            // setTabType("private");
        }
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        if (!newOpen) {
            seFilterDrawers({
                saveDrawer: false,
                manageFilterDrawer: false,
            });
        }
    };

    const handleFiltersClick = (key) => {
        seFilterDrawers((pre) => {
            return {
                ...pre,
                [key]: !pre[key],
            };
        });
    };

    const cleareFilterObject = () => {
        setOpen(false);
        dispatch(resetFilterObject());
        dispatch(setEntityIDs([]));
        setSearchValue("");
        showToast("The filter has been reset successfully.", {
            type: "success",
        });        
    };

    const onApplyFilterClick = (filterCriteria) => {
        if (filterCriteria?.searchValue) {
            setSearchValue(filterCriteria.searchValue);
        }
        dispatch(setFilterObject({ ...filterCriteria }));
        setOpen(false);
    };

    const searchBarChange = useDebounce((e) => {
        dispatch(setFilterObject({ ...filterObject, searchValue: e.target.value, page: 0 }));
    }, 1000);

    return (
        <>
            <TabContext value={tabValue}>
                <Box className="tid-dashboard-tablist-cotainer">
                    <Box sx={{ borderBottom: 1, borderColor: "#1E2B40", width: "75%" }}>
                        <TabList onChange={handleChange}>
                            <Tab
                                className="tid-dashboard-tab"
                                icon={<DotIcon />}
                                sx={{
                                    "& path": {
                                        stroke: `${tabValue === "1" ? "#0082F9" : "#fff"}`,
                                        fill: `${tabValue === "1" ? "#0082F9" : "#fff"}`,
                                    },
                                    color: "#fff",
                                }}
                                iconPosition="start"
                                label="All Threats"
                                value="1"
                            />
                            <Tab
                                icon={
                                    <FormatListBulletedIcon
                                        sx={{
                                            fill: `${tabValue === "2" ? "#0082F9" : "#fff"}`,
                                        }}
                                    />
                                }
                                sx={{
                                    color: "#fff",
                                }}
                                iconPosition="start"
                                label="Monitored Threats"
                                value="2"
                            />
                            <Tab
                                icon={<PrivateIcon />}
                                sx={{
                                    "& path": {
                                        stroke: `${tabValue === "3" ? "#0082F9" : "#fff"}`,
                                        fill: `${tabValue === "3" ? "#0082F9" : "#fff"}`,
                                    },
                                    color: "#fff",
                                }}
                                iconPosition="start"
                                label="Private Intel"
                                value="3"
                            />
                        </TabList>
                    </Box>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <CustomOutlinedInput
                            className="tab-search-input"
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                searchBarChange(e);
                            }}
                            value={searchValue}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fill: "#8E97A4" }} />
                                </InputAdornment>
                            }
                            placeholder="Search"
                        />
                        <CustomTooltip title="Clear all filters">
                            <IconButton className="tab-filter-button" onClick={cleareFilterObject}>
                                <ClearAllIcon sx={{ fill: "#fff" }} />
                            </IconButton>
                        </CustomTooltip>
                        <CustomTooltip title="Filter the list">
                            <IconButton className="tab-filter-button" onClick={toggleDrawer(true)}>
                                <SettingIcon />
                            </IconButton>
                        </CustomTooltip>
                    </Box>

                    <Drawer
                        style={{ margin: "2rem" }}
                        id="tid-filter-drawer"
                        sx={{
                            "& .MuiPaper-root": {
                                backgroundColor: `${sideBarListColor.BACKGROUND_COLOR} !important`,
                                color: `${sideBarListColor.TEXT} !important`,
                                margin: "1rem",
                                border: "0.063rem solid #1E2B40",
                                borderRadius: "0.375rem",
                                height: "95%",
                                width: "20%",
                            },
                        }}
                        className="filter-drawer"
                        open={open}
                        anchor="right"
                        onClose={toggleDrawer(false)}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                            }}
                        >
                            {filterDrawers.manageFilterDrawer ? (
                                <ManageFilter handleFiltersClick={handleFiltersClick} />
                            ) : filterDrawers.saveDrawer ? (
                                <SaveFilter
                                    handleFiltersClick={handleFiltersClick}
                                    onApplyFilterClick={onApplyFilterClick}
                                />
                            ) : (
                                <FilterThreats
                                    toggleDrawer={toggleDrawer}
                                    handleFiltersClick={handleFiltersClick}
                                    onApplyFilterClick={onApplyFilterClick}
                                    cleareFilterObject={cleareFilterObject}
                                />
                            )}
                        </Box>
                    </Drawer>
                </Box>
                <ThreatFilterList setSearchValue={setSearchValue} />
                <TabPanel value="1" itemType="allThreats">
                    <ThreatsListTab tabType="" threatsListData={entityAllData} />
                </TabPanel>
                <TabPanel value="2">
                    {/* <ThreatFilterList setSearchValue={setSearchValue} /> */}
                    <ThreatsListTab tabType="track" threatsListData={entityAllData} />
                </TabPanel>
                <TabPanel value="3">
                    {/* <ThreatFilterList setSearchValue={setSearchValue} /> */}
                    <ThreatsListTab tabType="private" threatsListData={entityAllData} />
                </TabPanel>
            </TabContext>
        </>
    );
};

export default ThreatsTabs;
