import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiAutoComplete from "../../../../AutoComplete/MultiAutoComplete";
import CustomSwitch from "../../../../Components/Custom/CustomSwitch";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import DropDownTree from "../../../../Components/DropDownTree/DropDownTree";
import {
    CVSS3SCORE,
    FIRST_SEEN,
    LAST_SEEN,
    LOCATED_AT,
    ORIGINATES_FROM,
    PATCH,
    PATCH_LINK,
    POC_EXIST,
    POC_LINK,
    PRIMARY_MOTIVATION,
    PRODUCTIONIZED,
    PRODUCTION_LINK,
    SECONDARY_MOTIVATION,
    SOPHISTICATION,
    TAGS,
    TARGETS,
    UNDER_ACTIVITY_LINK,
    UNDER_ACTIVITY_OBSERVE,
} from "../../../../Constants/ValidEnttyTypesConstant";
import MultiSelect from "../../../../Screens/TID/EntitiesListsScreen/MultiSelect";
import {
    getMotivation,
    getRegions,
    getSophistication,
    getTags,
} from "../../../../Services/Vocabulary/vocabulary.service";
import "../StepperForDC.css";
import FieldByType from "./FieldByType";

const DetailsForm = ({ selectedEntity, formik, onFormValueChange }) => {
    const dispatch = useDispatch();

    const {
        regions,
        sophistication,
        motivation: motivationData,
        tags,
    } = useSelector((state) => state.vocabulary);

    const theme = useSelector((state) => state.theme.theme);

    const handleDateChnage = (e, field) => {
        var dateWithoutTime = e.target.value; // Replace this with your actual date value

        // Get the current time in the desired format
        var currentTime = moment().format("HH:mm:ss.SSS");

        // Append the current time to the date string
        var dateTimeString = dateWithoutTime + "T" + currentTime + "Z";

        // Use Moment.js to format the date
        var formattedDate = moment(dateTimeString).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        onFormValueChange(field, formattedDate, formik);
    };

    useEffect(() => {
        if ([...TARGETS, ...LOCATED_AT, ...ORIGINATES_FROM].includes(selectedEntity?.type.toUpperCase())) {
            dispatch(getRegions());
        }
        if (SOPHISTICATION.includes(selectedEntity?.type.toUpperCase())) {
            dispatch(getSophistication());
        }
        if ([...SECONDARY_MOTIVATION, ...PRIMARY_MOTIVATION].includes(selectedEntity?.type.toUpperCase())) {
            dispatch(getMotivation());
        }
        if (TAGS.includes(selectedEntity?.type.toUpperCase())) {
            dispatch(getTags());
        }
    }, [dispatch, selectedEntity]);

    return (
        <div style={{ display: "grid", gap: "2rem" }}>
            <FieldByType validTypes={TARGETS} type={selectedEntity.type}>
                <MultiAutoComplete
                    multiple
                    name="targets"
                    id="tags-standard"
                    options={regions}
                    getOptionLabel={(option) => option?.title}
                    groupBy={(option) => option.groupBy}
                    isOptionEqualToValue={(option, value) => option?.title === value?.title}
                    onChange={(e, value) => {
                        const targets =
                            value && value.length > 0 ? value.map((item) => ({ country: item?.title })) : [];
                        onFormValueChange("targets", targets, formik);
                    }}
                    value={
                        formik.values?.targets?.map((item) => ({
                            title: item?.country,
                        })) || []
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Target Region"
                            label="Target Region"
                        />
                    )}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox style={{ marginRight: 8 }} checked={selected} />
                            {option.title}
                        </li>
                    )}
                />
            </FieldByType>
            <FieldByType validTypes={LOCATED_AT} type={selectedEntity.type}>
                <MultiAutoComplete
                    multiple
                    name="located_at"
                    id="tags-standard"
                    options={regions}
                    getOptionLabel={(option) => option?.title}
                    groupBy={(option) => option.groupBy}
                    isOptionEqualToValue={(option, value) => option?.title === value?.title}
                    onChange={(e, value) => {
                        const locatedAt =
                            value && value.length > 0 ? value.map((item) => ({ country: item?.title })) : [];
                        onFormValueChange("located_at", locatedAt, formik);
                    }}
                    value={
                        formik.values?.located_at?.map((item) => ({
                            title: item?.country,
                        })) || []
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Located At"
                            label="Located At"
                        />
                    )}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox style={{ marginRight: 8 }} checked={selected} />
                            {option.title}
                        </li>
                    )}
                />
            </FieldByType>

            <FieldByType validTypes={ORIGINATES_FROM} type={selectedEntity.type}>
                <MultiAutoComplete
                    multiple
                    name="originates_from"
                    id="tags-standard"
                    options={regions}
                    getOptionLabel={(option) => option?.title}
                    groupBy={(option) => option.groupBy}
                    isOptionEqualToValue={(option, value) => option?.title === value?.title}
                    onChange={(e, value) => {
                        const originates =
                            value && value.length > 0 ? value.map((item) => ({ country: item?.title })) : [];
                        onFormValueChange("originates_from", originates, formik);
                    }}
                    value={
                        formik.values?.originates_from?.map((item) => ({
                            title: item?.country,
                        })) || []
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Originates From"
                            label="Originates From"
                        />
                    )}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox style={{ marginRight: 8 }} checked={selected} />
                            {option.title}
                        </li>
                    )}
                />
                {/* <MultiSelect
                    style={{ width: "100%", margin: "" }}
                    options={regions?.map((item) => item)}
                    name="originates_from"
                    label="Originates From"
                    handleChange={(e) => {
                        const originates =
                            e.target.value && e.target.value.length > 0
                                ? e.target.value.map((item) => ({ country: item }))
                                : [];
                        onFormValueChange("originates_from", originates, formik);
                    }}
                    selectedOption={formik.values?.originates_from?.map((item) => item?.country) || []}
                /> */}
            </FieldByType>

            <FieldByType validTypes={SOPHISTICATION} type={selectedEntity.type}>
                <DropDownTree
                    minwidth="true"
                    fullwidth="fullwidth"
                    label="Sophistication"
                    options={sophistication?.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    handleChange={(e) =>
                        onFormValueChange("sophistication", { name: e.target.value }, formik)
                    }
                    selectedOption={formik.values?.sophistication?.name}
                />
            </FieldByType>

            <FieldByType validTypes={FIRST_SEEN} type={selectedEntity.type}>
                <div>
                    <label className="DC_input_lable">First Seen</label>
                    <CustomTextField
                        name="first_Seen"
                        className="DC_input_style"
                        type="date"
                        onChange={(e) => {
                            handleDateChnage(e, "first_seen");
                        }}
                        sx={{
                            "& .MuiInputBase-input::-webkit-calendar-picker-indicator": {
                                filter: `${theme === "dark-theme" ? "invert(1)" : "invert(0)"}`,
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--comment-border-bottom) !important",
                            },
                        }}
                        //   style={{ borderBottom: "1px solid var(--comment-border-bottom)" }}
                        placeholder="Value"
                        value={moment(formik?.values?.first_seen).format("YYYY-MM-DD")}
                        // ref={(formValidator) => (formValidator = formValidator)}
                    />
                </div>
            </FieldByType>

            <FieldByType validTypes={LAST_SEEN} type={selectedEntity.type}>
                <div>
                    <label className="DC_input_lable">Last Seen</label>
                    <CustomTextField
                        name="Last seen"
                        className="DC_input_style"
                        type="date"
                        onChange={(e) => {
                            handleDateChnage(e, "last_seen");
                        }}
                        sx={{
                            "& .MuiInputBase-input::-webkit-calendar-picker-indicator": {
                                filter: `${theme === "dark-theme" ? "invert(1)" : "invert(0)"}`,
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--comment-border-bottom) !important",
                            },
                        }}
                        value={moment(formik?.values?.last_seen).format("YYYY-MM-DD")}
                        placeholder="Value"
                    />
                </div>
            </FieldByType>

            <FieldByType validTypes={PRIMARY_MOTIVATION} type={selectedEntity.type}>
                <DropDownTree
                    minwidth="true"
                    fullwidth="fullwidth"
                    label="Primary Motivation"
                    name="primary_motivation"
                    options={motivationData?.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    handleChange={(e) =>
                        onFormValueChange("primary_motivation", { name: e.target.value }, formik)
                    }
                    selectedOption={formik.values?.primary_motivation?.name}
                />
            </FieldByType>

            <FieldByType validTypes={SECONDARY_MOTIVATION} type={selectedEntity.type}>
                <MultiSelect
                    style={{ width: "100%", margin: "" }}
                    label="Secondary Motivation"
                    name="secondary_motivations"
                    options={motivationData?.map((item) => item)}
                    handleChange={(e) => {
                        const updatedSecondaryMotivations =
                            e.target.value && e.target.value.length > 0
                                ? e.target.value.map((item) => ({ name: item }))
                                : [];
                        onFormValueChange("secondary_motivations", updatedSecondaryMotivations, formik);
                    }}
                    selectedOption={formik.values?.secondary_motivations?.map((item) => item?.name) || []}
                />
            </FieldByType>

            <FieldByType validTypes={TAGS} type={selectedEntity.type}>
                <div>
                    <label className="DC_input_lable">Tags</label>
                    <div>
                        <MultiAutoComplete
                            freeSolo
                            multiple
                            id="tags-standard"
                            options={tags?.map((option) => option)}
                            getOptionLabel={(option) => option}
                            onChange={(e, value) => {
                                const updatedTags = value.map((item) => ({ name: item }));
                                onFormValueChange("tags", updatedTags, formik);
                            }}
                            value={formik.values?.tags?.map((item) => item?.name) || []}
                            renderInput={(params) => (
                                <TextField {...params} variant="standard" placeholder="Tags" />
                            )}
                        />
                    </div>
                </div>
            </FieldByType>

            <FieldByType validTypes={CVSS3SCORE} type={selectedEntity.type}>
                <label className="DC_input_lable">CVSS 3 Score</label>
                <CustomTextField
                    name="CVSS 3 Score"
                    className="DC_input_style"
                    type="text"
                    onChange={(e) => {
                        onFormValueChange("cvss3_score", e.target.value, formik);
                    }}
                    variant="standard"
                    sx={{
                        "& .MuiInput-root::after": {
                            borderBottom: "2px solid var(--comment-border-bottom) !important",
                        },
                        "& .MuiInput-root::before": {
                            borderBottom: "1px solid var(--comment-border-bottom) !important",
                        },
                    }}
                    value={formik.values?.cvss3_score || ""}
                    placeholder="Integer Value"
                />
            </FieldByType>
            <FieldByType validTypes={POC_EXIST} type={selectedEntity.type}>
                <div>
                    <div className="DC_Toggle_div">
                        <p className="DC_Toggle_name">Poc Exists :</p>
                        <span>
                            <CustomSwitch
                                patch_available
                                onChange={(e) => {
                                    onFormValueChange("poc_exists", e.target.checked, formik);
                                }}
                                color="primary" // Change the color of the switch
                                inputProps={{ "aria-label": "controlled" }}
                                checked={formik.values?.poc_exists}
                            />
                        </span>
                    </div>
                </div>
            </FieldByType>
            <FieldByType validTypes={POC_LINK} type={selectedEntity.type}>
                <div>
                    <label className="DC_input_lable">PoC Link</label>
                    <CustomTextField
                        name="PoC Link"
                        className="DC_input_style"
                        type="text"
                        // value={FormData.EndDate}
                        onChange={(e) => {
                            onFormValueChange("poc_link", e.target.value, formik);
                        }}
                        placeholder="Link"
                        variant="standard"
                        value={formik.values?.poc_link || ""}

                        // ref={(formValidator) => (formValidator = formValidator)}
                    />
                </div>
            </FieldByType>

            <FieldByType validTypes={PRODUCTIONIZED} type={selectedEntity.type}>
                <div>
                    <div className="DC_Toggle_div">
                        <p className="DC_Toggle_name"> Productised :</p>
                        <span>
                            <CustomSwitch
                                onChange={(e) => {
                                    onFormValueChange("productionized", e.target.checked, formik);
                                }}
                                color="primary" // Change the color of the switch
                                inputProps={{ "aria-label": "controlled" }}
                                checked={formik.values?.productionized}
                            />
                        </span>
                    </div>
                </div>
            </FieldByType>
            <FieldByType validTypes={PRODUCTION_LINK} type={selectedEntity.type}>
                <div>
                    <label className="DC_input_lable">Production Link</label>
                    <CustomTextField
                        name="PoC Link"
                        className="DC_input_style"
                        type="text"
                        // value={FormData.EndDate}
                        onChange={(e) => {
                            onFormValueChange("production_link", e.target.value, formik);
                        }}
                        placeholder="Link"
                        variant="standard"
                        value={formik.values?.production_link || ""}
                        // ref={(formValidator) => (formValidator = formValidator)}
                    />
                </div>
            </FieldByType>
            <FieldByType validTypes={PATCH} type={selectedEntity.type}>
                <div>
                    <div className="DC_Toggle_div">
                        <p className="DC_Toggle_name">Patch Available :</p>
                        <span>
                            <CustomSwitch
                                onChange={(e) => {
                                    onFormValueChange("patch_available", e.target.checked, formik);
                                }}
                                color="primary"
                                inputProps={{ "aria-label": "controlled" }}
                                checked={formik.values?.patch_available}
                            />
                        </span>
                    </div>
                </div>
            </FieldByType>
            <FieldByType validTypes={PATCH_LINK} type={selectedEntity.type}>
                <div>
                    <label className="DC_input_lable">Patch Link</label>
                    <CustomTextField
                        name="Patch Link"
                        className="DC_input_style"
                        type="text"
                        variant="standard"
                        onChange={(e) => {
                            onFormValueChange("patch_link", e.target.value, formik);
                        }}
                        placeholder="Link"
                        value={formik.values?.patch_link || ""}
                    />
                </div>
            </FieldByType>
            <FieldByType validTypes={UNDER_ACTIVITY_OBSERVE} type={selectedEntity.type}>
                <div>
                    <div className="DC_Toggle_div">
                        <p className="DC_Toggle_name">Underground Activity Observed :</p>
                        <span>
                            <CustomSwitch
                                onChange={(e) => {
                                    onFormValueChange(
                                        "underground_activity_observed",
                                        e.target.checked,
                                        formik
                                    );
                                }}
                                color="primary" // Change the color of the switch
                                inputProps={{ "aria-label": "controlled" }}
                                checked={formik.values?.underground_activity_observed}
                            />
                        </span>
                    </div>
                </div>
            </FieldByType>
            <FieldByType validTypes={UNDER_ACTIVITY_LINK} type={selectedEntity.type}>
                <div>
                    <label className="DC_input_lable">Under Activity Link</label>
                    <MultiAutoComplete
                        freeSolo
                        multiple
                        id="tags-standard"
                        options={[]?.map((option) => option)}
                        getOptionLabel={(option) => option}
                        onChange={(e, value) => {
                            const updated_activity_link = value.map((item) => item);
                            onFormValueChange("underground_activity_link", updated_activity_link, formik);
                        }}
                        value={formik.values?.underground_activity_link?.map((item) => item) || []}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                placeholder="Under Activity Link"
                                // InputProps={{ style: { color: "green" } }}
                            />
                        )}
                    />
                </div>
            </FieldByType>
        </div>
    );
};

export default DetailsForm;
