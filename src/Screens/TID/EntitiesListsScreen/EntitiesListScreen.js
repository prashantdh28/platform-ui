import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import { BiCurrentLocation, BiLocationPlus } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import { FaFilter, FaSearch } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { LiaIndustrySolid } from "react-icons/lia";
import { LuGoal } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import MultiAutoComplete from "../../../AutoComplete/MultiAutoComplete";
import DynamicButton from "../../../Components/Button/ButtonBox";
import InputChips from "../../../Components/Chips/InputChips/InputChips";
import DropDown from "../../../Components/DropDownTree/DropDownTree";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import SearchBar from "../../../Components/Searchbar/Searchbar";
import { useDebouncedValue } from "../../../Hooks/useDebouncedValue";
import useToastify from "../../../Hooks/useToastify";
import { getAllTIDEntity } from "../../../Services/TID/tid.service";
import {
    getEntityTypes,
    getMotivation,
    getRegions,
    getSectors,
    getSophistication,
} from "../../../Services/Vocabulary/vocabulary.service";
import EntitiesListsCard from "../../../TID/Components/EntitiesListsCard/EntitiesListsCard";
import { setEntityIDs, setFilterObject, setFilterOptionsList } from "../../../redux/Slice/TID/EntitySlice";
import "./EntitiesListsScreen.css";
import MultiSelect from "./MultiSelect";

const filterOptions = [
    { value: "source_region", label: "Source Region" },
    { value: "target_region", label: "Target Region" },
    { value: "targated_industries", label: "Targeted Industries" },
    { value: "filterByTypes", label: "Filter By Types" },
    { value: "motivation", label: "Motivation" },
    { value: "sophistication", label: "Sophistication" },
];

const EntitiesList = () => {
    const dispatch = useDispatch();
    const { showToast } = useToastify();
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    const {
        entityAllData,
        loading,
        pagination: { currentPage, lastPage },
        filterObject,
        filterOptionsList,
    } = useSelector((state) => state.TIDEntity);
    const {
        regions,
        entityTypes,
        motivation: motivationData,
        sophistication: sophisticationData,
        sectors: sectorsData,
    } = useSelector((state) => state.vocabulary);

    const [searchValue, setSearchValue] = useState(filterObject?.searchValue);

    const debouncedSearchValue = useDebouncedValue(searchValue, 500);

    useEffect(() => {
        dispatch(getRegions());
        dispatch(getEntityTypes());
        dispatch(getMotivation());
        dispatch(getSophistication());
        dispatch(getSectors());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getAllTIDEntity({
                searchValue: debouncedSearchValue,
                sourceRegion: filterObject?.sourceRegion,
                targetRegion: filterObject?.targetRegion,
                targetedIndustries: filterObject?.targetedIndustries,
                entityType: filterObject?.entityType,
                motivation: filterObject?.motivation,
                sophistication: filterObject?.sophistication,
                selectedTTps: filterObject?.selectedTTps,
                page: filterObject?.page,
            })
        );
    }, [dispatch, debouncedSearchValue, filterObject]);

    const searchBarChange = (e) => {
        setSearchValue(e.target.value);
        dispatch(setFilterObject({ ...filterObject, searchValue: e.target.value, page: 0 }));
    };

    const handleChangemultSelect = (e) => {
        dispatch(setFilterOptionsList([...e.target.value]));
        // dispatch(setFilterObject({ ...filterObject, selectedOption: e.target.value, page: 0 }));
    };

    const handelmultiselect = (e, setData, filed) => {
        if (typeof setData === "function") {
            setData(e.target.value);
        }
        dispatch(setFilterObject({ ...filterObject, [filed]: e.target.value, page: 0 }));
    };

    const handleFilterReset = () => {
        dispatch(
            setFilterObject({
                page: 0,
                searchValue: "",
                sourceRegion: [],
                targetRegion: [],
                targetedIndustries: [],
                entityType: "",
                motivation: "",
                sophistication: "",
                selectedTTps: [],
                selectedTTpsName: [],
            })
        );
        dispatch(setEntityIDs([]));
        dispatch(setFilterOptionsList([]));
        setSearchValue("");
        showToast("Filter reset successfully!", {
            type: "success",
        });
    };

    const onLoadMore = () => {
        // setPage(currentPage + 1);
        dispatch(setFilterObject({ ...filterObject, page: currentPage + 1 }));
    };

    const onDelet = (value) => {
        const [id] = value.split("-");
        const updatedSelectedTTps = filterObject?.selectedTTps.filter((ttp) => ttp !== id);
        const updatedSelectedTTpsName = filterObject?.selectedTTps.filter((ttp) => ttp !== id);
        dispatch(
            setFilterObject({
                ...filterObject,
                selectedTTps: updatedSelectedTTps,
                selectedTTpsName: updatedSelectedTTpsName,
                page: 0,
            })
        );
    };

    const onSearchDelete = () => {
        setSearchValue("");
        dispatch(setFilterObject({ ...filterObject, searchValue: "", page: 0 }));
    };

    const onDeleteItem = (value, filed) => {
        if (value) {
            const updatedState = filterObject[filed].filter((item) => item !== value);
            return dispatch(setFilterObject({ ...filterObject, [filed]: updatedState, page: 0 }));
        }
        dispatch(setFilterObject({ ...filterObject, [filed]: "", page: 0 }));
    };
    const uniqueSelectedTTPs = [...new Set(filterObject?.selectedTTpsName)];

    return (
        <>
            <div className="Entities-parent-div">
                <div className="TID-Parent-Section">
                    <div className="TID-Search-Dropdown" style={{ flexWrap: "wrap" }}>
                        <SearchBar
                            id="custom-search-label"
                            label="Search"
                            className="custom-searchbar"
                            onchange={searchBarChange}
                            value={searchValue}
                            width="220px"
                            height="55px"
                        />

                        <MultiSelect
                            label="Filter Options"
                            options={filterOptions.map((option) => option?.label)}
                            handleChange={handleChangemultSelect}
                            selectedOption={filterOptionsList}
                        />
                        {filterOptionsList &&
                            filterOptionsList?.length > 0 &&
                            filterOptionsList?.find((option) => option === "Source Region") && (
                                <MultiAutoComplete
                                    multiple
                                    name="targets"
                                    id="Source Region"
                                    options={regions}
                                    getOptionLabel={(option) => option?.title}
                                    groupBy={(option) => option.groupBy}
                                    isOptionEqualToValue={(option, value) => option?.title === value?.title}
                                    onChange={(e, value) => {
                                        const targets =
                                            value && value.length > 0 ? value.map((item) => item?.title) : [];
                                        dispatch(
                                            setFilterObject({
                                                ...filterObject,
                                                sourceRegion: targets,
                                                page: 0,
                                            })
                                        );
                                    }}
                                    value={
                                        filterObject?.sourceRegion?.map((item) => ({
                                            title: item,
                                        })) || []
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            placeholder="Select Source Region"
                                            label="Select Source Region"
                                        />
                                    )}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                            {option.title}
                                        </li>
                                    )}
                                    sx={{ width: 200 }}
                                />
                                // <MultiSelect
                                //     label="Select Source Region"
                                //     options={regions?.map((country) => country)}
                                //     handleChange={(e) => handelmultiselect(e, "", "sourceRegion")}
                                //     selectedOption={filterObject?.sourceRegion}
                                // />
                            )}
                        {filterOptionsList &&
                            filterOptionsList?.length > 0 &&
                            filterOptionsList?.find((option) => option === "Target Region") && (
                                <MultiAutoComplete
                                    multiple
                                    name="targets"
                                    id="Source Region"
                                    options={regions}
                                    getOptionLabel={(option) => option?.title}
                                    groupBy={(option) => option.groupBy}
                                    isOptionEqualToValue={(option, value) => option?.title === value?.title}
                                    onChange={(e, value) => {
                                        const targets =
                                            value && value.length > 0 ? value.map((item) => item?.title) : [];
                                        dispatch(
                                            setFilterObject({
                                                ...filterObject,
                                                targetRegion: targets,
                                                page: 0,
                                            })
                                        );
                                    }}
                                    value={
                                        filterObject?.targetRegion?.map((item) => ({
                                            title: item,
                                        })) || []
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            placeholder="Select Target Region"
                                            label="Select Target Region"
                                        />
                                    )}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                            {option.title}
                                        </li>
                                    )}
                                    sx={{ width: 200 }}
                                />
                                // <MultiSelect
                                //     label="Select Target Region"
                                //     options={regions?.map((country) => country)}
                                //     handleChange={(e) => handelmultiselect(e, "", "targetRegion")}
                                //     selectedOption={filterObject?.targetRegion}
                                // />
                            )}
                        {filterOptionsList &&
                            filterOptionsList?.length > 0 &&
                            filterOptionsList?.find((option) => option === "Targeted Industries") && (
                                <MultiSelect
                                    label="Select Targeted Industries"
                                    options={sectorsData.map((sector) => sector)}
                                    handleChange={(e) => handelmultiselect(e, "", "targetedIndustries")}
                                    selectedOption={filterObject?.targetedIndustries}
                                />
                            )}
                        {filterOptionsList &&
                            filterOptionsList.length > 0 &&
                            filterOptionsList.find((option) => option === "Filter By Types") && (
                                <DropDown
                                    label="Filter By Types"
                                    options={entityTypes?.map((entity) => ({
                                        value: entity,
                                        label: entity,
                                    }))}
                                    handleChange={(e) => handelmultiselect(e, "", "entityType")}
                                    selectedOption={filterObject?.entityType}
                                    // setSelectedOption={setEntityType}
                                />
                            )}
                        {filterOptionsList &&
                            filterOptionsList.length > 0 &&
                            filterOptionsList.find((option) => option === "Motivation") && (
                                <DropDown
                                    label="Filter By Motivation"
                                    options={motivationData?.map((motivation) => ({
                                        value: motivation,
                                        label: motivation,
                                    }))}
                                    handleChange={(e) => handelmultiselect(e, "", "motivation")}
                                    selectedOption={filterObject?.motivation}
                                    // setSelectedOption={setMotivation}
                                />
                            )}
                        {filterOptionsList &&
                            filterOptionsList.length > 0 &&
                            filterOptionsList.find((option) => option === "Sophistication") && (
                                <DropDown
                                    label="Filter By Sophistication"
                                    options={sophisticationData?.map((sophistication) => ({
                                        value: sophistication,
                                        label: sophistication,
                                    }))}
                                    handleChange={(e) => handelmultiselect(e, "", "sophistication")}
                                    selectedOption={filterObject?.sophistication}
                                    // setSelectedOption={setSophistication}
                                />
                            )}
                        <BsFilter id="Tid-Entity-filter-icon" onClick={handleFilterReset} />
                    </div>
                    <div className="tid-parent-div" style={{ margin: "0.5rem" }}>
                        <DynamicButton label="+ CREATE" className="Attack-entities-btn" to="select-threat" />
                        <DynamicButton
                            label="ATT&CK Matrix"
                            className="Attack-entities-btn"
                            isDisabled={entityIDs?.length < 1}
                            to="attack"
                            tooltipMessage={(dataProp) => {
                                if (dataProp.length < 1) {
                                    return "Please select at least one entity.";
                                } else {
                                    return "";
                                }
                            }}
                            dataProp={entityIDs}
                        />
                    </div>
                </div>
                <div className="filter-list">
                    <ul>
                        {searchValue && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0 -2rem",
                                }}
                            >
                                <span id="EntityFilter-Search">
                                    <FaSearch
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                </span>
                                <div id="chip-avatar" className="chip-list ">
                                    <span className="chip">
                                        {searchValue}
                                        <span
                                            onClick={onSearchDelete}
                                            // onClick={onDeletValue}
                                            className="e-icons e-circle-close"
                                            style={{
                                                fontSize: "14px",
                                                color: "var(--cross-color)",
                                                cursor: "pointer",
                                            }}
                                        ></span>
                                    </span>
                                </div>
                            </div>
                        )}
                        {filterObject?.selectedTTpsName && filterObject?.selectedTTpsName?.length > 0 && (
                            <div style={{ margin: "0 -3rem" }}>
                                <InputChips
                                    chipsData={uniqueSelectedTTPs?.map((ttp, index) => {
                                        return {
                                            name: ttp,
                                            value: index,
                                            color: "var(--button-tag-color)",
                                        };
                                    })}
                                    onDelete={onDelet}
                                    deleteEnable={true}
                                    className="TTP-chips"
                                    id="TTP-chips"
                                    dialogNeeded={false}
                                />
                            </div>
                        )}
                        {filterObject?.sourceRegion && filterObject?.sourceRegion?.length > 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0 -2rem",
                                }}
                            >
                                <span id="EntityFilter-Search">
                                    <BiLocationPlus
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                </span>
                                <InputChips
                                    chipsData={filterObject?.sourceRegion?.map((sr, index) => {
                                        return {
                                            name: sr,
                                            value: index,
                                            color: "var(--button-tag-color)",
                                            // icon: "e-icons e-location",
                                        };
                                    })}
                                    onDelete={(value) => onDeleteItem(value, "sourceRegion")}
                                    deleteEnable={true}
                                    className="TTP-chips"
                                    id="TTP-chips"
                                    dialogNeeded={false}
                                />
                            </div>
                        )}
                        {filterObject?.targetRegion && filterObject?.targetRegion?.length > 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0 -2rem",
                                }}
                            >
                                <span id="EntityFilter-Search">
                                    <BiCurrentLocation
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                </span>
                                <InputChips
                                    chipsData={filterObject?.targetRegion?.map((tr, index) => {
                                        return {
                                            name: tr,
                                            value: index,
                                            color: "var(--button-tag-color)",
                                            // icon: "e-icons radio-button",
                                        };
                                    })}
                                    onDelete={(value) => onDeleteItem(value, "targetRegion")}
                                    deleteEnable={true}
                                    className="TTP-chips"
                                    id="TTP-chips"
                                    dialogNeeded={false}
                                />
                            </div>
                        )}
                        {filterObject?.targetedIndustries && filterObject?.targetedIndustries?.length > 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0 -2rem",
                                }}
                            >
                                <span id="EntityFilter-Search">
                                    <LiaIndustrySolid
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                </span>
                                <InputChips
                                    chipsData={filterObject?.targetedIndustries?.map((ti, index) => {
                                        return {
                                            name: ti,
                                            value: index,
                                            color: "var(--button-tag-color)",
                                            // icon: "e-icons e-home",
                                        };
                                    })}
                                    onDelete={(value) => onDeleteItem(value, "targetedIndustries")}
                                    deleteEnable={true}
                                    className="TTP-chips"
                                    id="TTP-chips"
                                    dialogNeeded={false}
                                />
                            </div>
                        )}
                        {filterObject?.entityType && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0 -2rem",
                                }}
                            >
                                <span id="EntityFilter-Search">
                                    <FaFilter
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                </span>
                                <div id="chip-avatar" className="chip-list ">
                                    <span className="chip">
                                        {filterObject?.entityType}
                                        <span
                                            onClick={() => onDeleteItem("", "entityType")}
                                            className="e-icons e-circle-close"
                                            style={{
                                                fontSize: "14px",
                                                color: "var(--cross-color)",
                                                cursor: "pointer",
                                            }}
                                        ></span>
                                    </span>
                                </div>
                            </div>
                        )}
                        {filterObject?.motivation && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0 -2rem",
                                }}
                            >
                                <span id="EntityFilter-Search">
                                    <LuGoal
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                </span>
                                <div id="chip-avatar" className="chip-list ">
                                    <span className="chip">
                                        {filterObject?.motivation}{" "}
                                        <span
                                            onClick={() => onDeleteItem("", "motivation")}
                                            className="e-icons e-circle-close"
                                            style={{
                                                fontSize: "14px",
                                                color: "var(--cross-color)",
                                                cursor: "pointer",
                                            }}
                                        ></span>
                                    </span>
                                </div>
                            </div>
                        )}
                        {filterObject?.sophistication && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0 -2rem",
                                }}
                            >
                                <span id="EntityFilter-Search">
                                    <FaEarthAsia
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                </span>
                                <div id="chip-avatar" className="chip-list ">
                                    <span className="chip">
                                        {filterObject?.sophistication}{" "}
                                        <span
                                            onClick={() => onDeleteItem("", "sophistication")}
                                            className="e-icons e-circle-close"
                                            style={{
                                                fontSize: "14px",
                                                color: "var(--cross-color)",
                                                cursor: "pointer",
                                            }}
                                        ></span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
            {Array.isArray(entityAllData) &&
                entityAllData.map((entity, index) => {
                    return (
                        <EntitiesListsCard
                            key={index}
                            entity={entity}
                            entityIDs={entityIDs}
                            // setSelectedTTps={setSelectedTTps}
                            selectedTTPs={filterObject?.selectedTTps}
                            selectedTTpsName={filterObject?.selectedTTpsName}
                            // setSelectedTTpsName={setSelectedTTpsName}
                        />
                    );
                })}
            {entityAllData.length === 0 && <p className="noData">No Data Available</p>}
            {!(lastPage || loading) && !(entityAllData.length === 0) && (
                <span className="load-more" onClick={onLoadMore}>
                    <span className="TID-load-more-text">Load More</span>
                    <span
                        className="e-icons e-chevron-down-thin"
                        style={{ fontSize: "small" }}
                        id="TID-load-more-icon"
                    />
                </span>
            )}
            {loading && !(entityAllData.length === 0) && (
                <SpinnerLoader className="entity-load-more-loadder" />
            )}
        </>
    );
};

export default EntitiesList;
