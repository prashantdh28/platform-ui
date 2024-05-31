import React from "react";
import FactoryIcon from "@mui/icons-material/Factory";
import FilterListIcon from "@mui/icons-material/FilterList";
import FlagIcon from "@mui/icons-material/Flag";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MyLocationTwoToneIcon from "@mui/icons-material/MyLocationTwoTone";
import PublicIcon from "@mui/icons-material/Public";
import { checkKeyHasValue } from "../../../../../helper/removeEmptyKeysHelper";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import CustomChip from "../../../../../Components/Custom/CustomChip";
import { setFilterObject } from "../../../../../redux/Slice/TID/EntitySlice";

const ThreatFilterList = ({ setSearchValue }) => {
    const dispatch = useDispatch();
    const { filterObject } = useSelector((state) => state.TIDEntity);
    const onTTpsDelet = (data) => {
        const updatedSelectedTTps = filterObject?.selectedTTps.filter((ttp) => {
            return ttp?.id !== data?.id;
        });
        dispatch(
            setFilterObject({
                ...filterObject,
                selectedTTps: updatedSelectedTTps,
                page: 0,
            })
        );
    };

    const onDeleteRegion = (value, filed) => {
        if (value?.title) {
            const updatedRegion = filterObject[filed].filter((item) => item?.title !== value?.title);
            return dispatch(setFilterObject({ ...filterObject, [filed]: updatedRegion, page: 0 }));
        }
        dispatch(setFilterObject({ ...filterObject, [filed]: "", page: 0 }));
    };

    const onDeleteFilterItem = (value, filed) => {
        if (value?.label) {
            const updatedRegion = filterObject[filed].filter((item) => item !== value?.label);
            return dispatch(setFilterObject({ ...filterObject, [filed]: updatedRegion, page: 0 }));
        }
        dispatch(setFilterObject({ ...filterObject, [filed]: "", page: 0 }));
    };

    return (
        <>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                {checkKeyHasValue(filterObject, "searchValue") ? (
                    <CustomChip
                        data={{ label: `${filterObject?.searchValue}` }}
                        onDelete={() => {
                            // dispatch(getAllTIDEntity({ ...filterObject, searchValue: "", page: 0 }));
                            setSearchValue("");
                            dispatch(setFilterObject({ ...filterObject, searchValue: "", page: 0 }));
                        }}
                        isDeletable
                    />
                ) : (
                    ""
                )}
                {checkKeyHasValue(filterObject, "selectedTTps")
                    ? filterObject?.selectedTTps.map((item, index) => (
                          <CustomChip
                              key={index}
                              data={{ label: `${item?.id}-${item?.name}`, ...item }}
                              onDelete={onTTpsDelet}
                              isDeletable
                          />
                      ))
                    : ""}
                {checkKeyHasValue(filterObject, "sourceRegion") ? (
                    <>
                        <Box className="filter-chips-container">
                            <LocationOnOutlinedIcon className="svg-icon-filter" />
                            <Box>
                                {filterObject?.sourceRegion.map((item, index) => (
                                    <CustomChip
                                        key={index}
                                        data={{ label: `${item?.title}`, ...item }}
                                        onDelete={(data) => onDeleteRegion(data, "sourceRegion")}
                                        isDeletable
                                    />
                                ))}
                            </Box>
                        </Box>
                    </>
                ) : (
                    ""
                )}
                {checkKeyHasValue(filterObject, "targetRegion") ? (
                    <>
                        <Box className="filter-chips-container">
                            <MyLocationTwoToneIcon className="svg-icon-filter" />
                            <Box>
                                {filterObject?.targetRegion.map((item, index) => (
                                    <CustomChip
                                        key={index}
                                        data={{ label: `${item?.title}`, ...item }}
                                        onDelete={(data) => onDeleteRegion(data, "targetRegion")}
                                        isDeletable
                                    />
                                ))}
                            </Box>
                        </Box>
                    </>
                ) : (
                    ""
                )}

                {checkKeyHasValue(filterObject, "targetedIndustries") ? (
                    <>
                        <Box className="filter-chips-container">
                            <FactoryIcon className="svg-icon-filter" />
                            <Box>
                                {filterObject?.targetedIndustries.map((item, index) => (
                                    <CustomChip
                                        key={index}
                                        data={{ label: `${item}` }}
                                        onDelete={(data) => onDeleteFilterItem(data, "targetedIndustries")}
                                        isDeletable
                                    />
                                ))}
                            </Box>
                        </Box>
                    </>
                ) : (
                    ""
                )}
                {checkKeyHasValue(filterObject, "entityType") ? (
                    <>
                        <Box className="filter-chips-container">
                            <FilterListIcon className="svg-icon-filter" />
                            <Box>
                                {filterObject?.entityType.map((item, index) => (
                                    <CustomChip
                                        key={index}
                                        data={{ label: `${item}` }}
                                        onDelete={(data) => onDeleteFilterItem(data, "entityType")}
                                        isDeletable
                                    />
                                ))}
                            </Box>
                        </Box>
                    </>
                ) : (
                    ""
                )}
                {checkKeyHasValue(filterObject, "motivation") ? (
                    <>
                        <Box className="filter-chips-container">
                            <FlagIcon className="svg-icon-filter" />
                            <Box>
                                {filterObject?.motivation.map((item, index) => (
                                    <CustomChip
                                        key={index}
                                        data={{ label: `${item}` }}
                                        onDelete={(data) => onDeleteFilterItem(data, "motivation")}
                                        isDeletable
                                    />
                                ))}
                            </Box>
                        </Box>
                    </>
                ) : (
                    ""
                )}
                {checkKeyHasValue(filterObject, "sophistication") ? (
                    <>
                        <Box className="filter-chips-container">
                            <PublicIcon className="svg-icon-filter" />
                            <Box>
                                {filterObject?.sophistication.map((item, index) => (
                                    <CustomChip
                                        key={index}
                                        data={{ label: `${item}` }}
                                        onDelete={(data) => onDeleteFilterItem(data, "sophistication")}
                                        isDeletable
                                    />
                                ))}
                            </Box>
                        </Box>
                    </>
                ) : (
                    ""
                )}
                {/* {Object.keys(removeEmptyKeysWithArray(filterObject)).length > 1 ? (
        <Button
            variant="text"
            className="save-filter-text"
            sx={{
                justifyContent: "flex-start",
                color: "#0082F9 !important",
            }}
            onClick={() => {
                cleareFilterObject();
            }}
        >
            Clear all
        </Button>
    ) : (
        ""
    )} */}
            </Box>
        </>
    );
};

export default ThreatFilterList;
