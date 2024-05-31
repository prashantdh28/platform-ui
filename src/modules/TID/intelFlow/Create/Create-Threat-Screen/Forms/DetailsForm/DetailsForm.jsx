import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAutocomplete from "../../../../../../../Components/Custom/CustomAutocomplete";
import CustomToggle from "../../../../../../../Components/Custom/CustomToggle";
import CustomTextField from "../../../../../../../Components/Custom/CustomTextField";
import CustomSelect from "../../../../../../../Components/Custom/CustomSelect";
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
  REPORT_LIST,
  UNDER_ACTIVITY_LINK,
  UNDER_ACTIVITY_OBSERVE,
  AFFECTED_PLATFORM,
  CAPABILITIES,
} from "../../../../../../../Constants/ValidEnttyTypesConstant";
import {
  getMotivation,
  getRegions,
  getSophistication,
  getTags,
  getAffectedPlatformList,
  getCapabilities,
} from "../../../../../../../Services/Vocabulary/vocabulary.service";
import { FormHelperText } from "@mui/material";
import FieldByType from "./FieldByType";

const DetailsForm = ({ selectedEntity, formik, onFormValueChange }) => {
  const dispatch = useDispatch();
  const {
    regions,
    sophistication,
    motivation: motivationData,
    tags,
  } = useSelector((state) => state.vocabulary);

  const plateformList = useSelector((state) => state?.vocabulary?.plateforms);
  const capabilitiesList = useSelector(
    (state) => state?.vocabulary?.capabilitiesList
  );

  const handleDateChnage = (e, field) => {
    var dateWithoutTime = e.target.value; // Replace this with your actual date value

    // Get the current time in the desired format
    var currentTime = moment().format("HH:mm:ss.SSS");

    // Append the current time to the date string
    var dateTimeString = dateWithoutTime + "T" + currentTime + "Z";

    // Use Moment.js to format the date
    var formattedDate = moment(dateTimeString).format(
      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
    );
    onFormValueChange(field, formattedDate, formik);
  };

  useEffect(() => {
    if (
      [...TARGETS, ...LOCATED_AT, ...ORIGINATES_FROM].includes(
        selectedEntity?.type.toUpperCase()
      )
    ) {
      dispatch(getRegions());
    }
    if (SOPHISTICATION.includes(selectedEntity?.type.toUpperCase())) {
      dispatch(getSophistication());
    }
    if (
      [...SECONDARY_MOTIVATION, ...PRIMARY_MOTIVATION].includes(
        selectedEntity?.type.toUpperCase()
      )
    ) {
      dispatch(getMotivation());
    }
    if (TAGS.includes(selectedEntity?.type.toUpperCase())) {
      dispatch(getTags());
    }
    if (AFFECTED_PLATFORM.includes(selectedEntity?.type.toUpperCase())) {
      dispatch(getAffectedPlatformList());
    }
    if (CAPABILITIES.includes(selectedEntity?.type.toUpperCase())) {
      dispatch(getCapabilities());
    }
  }, [dispatch, selectedEntity]);

  return (
      <div style={{ display: "grid", gap: "1rem" }}>
          <FieldByType validTypes={TARGETS} type={selectedEntity?.type}>
              <div className="custom_css_details_form_grouping">
                  <label className="label_details_form">Target Region</label>
                  <CustomAutocomplete
                      multiple
                      name="targets"
                      id="tags-standard"
                      options={regions}
                      getOptionLabel={(option) => option?.title}
                      groupBy={(option) => option.groupBy}
                      isOptionEqualToValue={(option, value) => option?.title === value?.title}
                      onChange={(e, value) => {
                          const targets =
                              value && value.length > 0
                                  ? value.map((item) => ({ country: item?.title }))
                                  : [];
                          onFormValueChange("targets", targets, formik);
                      }}
                      value={
                          formik.values?.targets?.map((item) => ({
                              title: item?.country,
                          })) || []
                      }
                      renderInput={(params) => (
                          <TextField {...params} variant="outlined" placeholder="Target Region" />
                      )}
                      renderOption={(props, option, { selected }) => (
                          <li {...props}>
                              <Checkbox style={{ marginRight: 8 }} checked={selected} />
                              {option.title}
                          </li>
                      )}
                  />
              </div>
          </FieldByType>
          <FieldByType validTypes={LOCATED_AT} type={selectedEntity?.type}>
              <div className="custom_css_details_form_grouping">
                  <label className="label_details_form">Located At</label>
                  <CustomAutocomplete
                      multiple
                      name="located_at"
                      id="tags-standard"
                      options={regions}
                      getOptionLabel={(option) => option?.title}
                      groupBy={(option) => option.groupBy}
                      isOptionEqualToValue={(option, value) => option?.title === value?.title}
                      onChange={(e, value) => {
                          const locatedAt =
                              value && value.length > 0
                                  ? value.map((item) => ({ country: item?.title }))
                                  : [];
                          onFormValueChange("located_at", locatedAt, formik);
                      }}
                      value={
                          formik.values?.located_at?.map((item) => ({
                              title: item?.country,
                          })) || []
                      }
                      renderInput={(params) => (
                          <TextField {...params} variant="outlined" placeholder="Located At" />
                      )}
                      renderOption={(props, option, { selected }) => (
                          <li {...props}>
                              <Checkbox style={{ marginRight: 8 }} checked={selected} />
                              {option.title}
                          </li>
                      )}
                  />
              </div>
          </FieldByType>

          <FieldByType validTypes={ORIGINATES_FROM} type={selectedEntity?.type}>
              <div className="custom_css_details_form_grouping">
                  <label className="label_details_form">Originates From</label>
                  <CustomAutocomplete
                      multiple
                      name="originates_from"
                      id="tags-standard"
                      options={regions}
                      getOptionLabel={(option) => option?.title}
                      groupBy={(option) => option.groupBy}
                      isOptionEqualToValue={(option, value) => option?.title === value?.title}
                      onChange={(e, value) => {
                          const originates =
                              value && value.length > 0
                                  ? value.map((item) => ({ country: item?.title }))
                                  : [];
                          onFormValueChange("originates_from", originates, formik);
                      }}
                      value={
                          formik.values?.originates_from?.map((item) => ({
                              title: item?.country,
                          })) || []
                      }
                      renderInput={(params) => (
                          <TextField {...params} variant="outlined" placeholder="Select Originates From" />
                      )}
                      renderOption={(props, option, { selected }) => (
                          <li {...props}>
                              <Checkbox style={{ marginRight: 8 }} checked={selected} />
                              {option.title}
                          </li>
                      )}
                  />
              </div>
          </FieldByType>

          <FieldByType validTypes={AFFECTED_PLATFORM} type={selectedEntity?.type}>
              <div className="custom_css_details_form_grouping">
                  <label className="label_details_form">Affected Platform</label>
                  <CustomAutocomplete
                      freeSolo
                      multiple
                      id="platforms-standard"
                      options={plateformList?.map((item) => ({
                          title: item,
                      }))}
                      getOptionLabel={(option) => option?.title}
                      groupBy={(option) => option.groupBy}
                      isOptionEqualToValue={(option, value) => option?.title === value?.title}
                      onChange={(e, value) => {
                          const originates =
                              value && value.length > 0 ? value.map((item) => item?.title) : [];
                          onFormValueChange("platforms", originates, formik);
                      }}
                      value={
                          formik.values?.platforms?.map((item) => ({
                              title: item,
                          })) || []
                      }
                      renderInput={(params) => (
                          <TextField {...params} variant="outlined" placeholder="Select Affected Platform" />
                      )}
                      renderOption={(props, option, { selected }) => (
                          <li {...props}>
                              <Checkbox style={{ marginRight: 8 }} checked={selected} />
                              {option.title}
                          </li>
                      )}
                  />
              </div>
          </FieldByType>

          <FieldByType validTypes={SOPHISTICATION} type={selectedEntity?.type}>
              <div className="custom_css_details_form_grouping">
                  <label className="label_details_form">Sophistication</label>
                  <CustomSelect
                      placeholder="Select sophistication"
                      fullwidth="fullwidth"
                      menuItems={sophistication}
                      handleChange={(e) => {
                          e.target.value = e.target.value || "";
                          onFormValueChange("sophistication", { name: e.target.value }, formik);
                      }}
                      selectedMenuItems={formik.values.sophistication?.name}
                      // setSelectedMenuItems={setChildSophistication}
                      // value={formik.values.sophistication?.name}
                  />
              </div>
          </FieldByType>

          <FieldByType validTypes={FIRST_SEEN} type={selectedEntity?.type}>
              <div>
                  <label className="label_details_form">First Seen</label>
                  <div className="input_details_form">
                      <CustomTextField
                          name="first_Seen"
                          className="DC_input_style"
                          type="date"
                          onChange={(e) => {
                              handleDateChnage(e, "first_seen");
                          }}
                          sx={{
                              "& .MuiInputBase-input::-webkit-calendar-picker-indicator": {
                                  filter: "invert(1)",
                                  cursor: "pointer",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1E2B40 !important",
                              },
                              "& .MuiInputBase-input::placeholder": {
                                  color: "#fff !important",
                              },
                              "& .MuiInputBase-input": {
                                  color: "#fff !important",
                              },
                          }}
                          placeholder="Value"
                          value={moment(formik?.values?.first_seen).format("YYYY-MM-DD")}
                      />
                  </div>
              </div>
          </FieldByType>

          <FieldByType validTypes={LAST_SEEN} type={selectedEntity?.type}>
              <div>
                  <label className="label_details_form">Last Seen</label>
                  <div className="input_details_form">
                      <CustomTextField
                          name="Last seen"
                          className="DC_input_style"
                          type="date"
                          onChange={(e) => {
                              handleDateChnage(e, "last_seen");
                          }}
                          sx={{
                              "& .MuiInputBase-input::-webkit-calendar-picker-indicator": {
                                  filter: "invert(1)",
                                  cursor: "pointer",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1E2B40 !important",
                              },
                              "& .MuiInputBase-input::placeholder": {
                                  color: "#fff !important",
                              },
                              "& .MuiInputBase-input": {
                                  color: "#fff !important",
                              },
                          }}
                          value={moment(formik?.values?.last_seen).format("YYYY-MM-DD")}
                          placeholder="Value"
                      />
                  </div>
              </div>
          </FieldByType>

          <FieldByType validTypes={REPORT_LIST} type={selectedEntity?.type}>
              <div>
                  <label className="label_details_form">Report Date</label>
                  <div className="input_details_form">
                      <CustomTextField
                          name="Last seen"
                          className="DC_input_style"
                          type="date"
                          onChange={(e) => {
                              handleDateChnage(e, "report_date");
                          }}
                          sx={{
                              "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1E2B40 !important",
                              },
                              "& .MuiInputBase-input::-webkit-calendar-picker-indicator": {
                                  filter: "invert(1)",
                                  cursor: "pointer",
                              },
                              "& .MuiInputBase-input::placeholder": {
                                  color: "#fff !important",
                              },
                              "& .MuiInputBase-input": {
                                  color: "#fff !important",
                              },
                          }}
                          value={moment(formik?.values?.report_date).format("YYYY-MM-DD")}
                          placeholder="Value"
                      />
                  </div>
              </div>
              {formik.touched.report_date && Boolean(formik.errors.report_date) ? (
                  <FormHelperText error>
                      {formik.touched.report_date && formik.errors.report_date}
                  </FormHelperText>
              ) : (
                  ""
              )}
          </FieldByType>

          <FieldByType validTypes={PRIMARY_MOTIVATION} type={selectedEntity?.type}>
              <div className="custom_css_details_form_grouping">
                  <label className="label_details_form">Primary Motivation</label>
                  <CustomSelect
                      placeholder="Select Primary Motivation"
                      fullwidth="fullwidth"
                      menuItems={motivationData}
                      handleChange={(e) => {
                          e.target.value = e.target.value || "";
                          onFormValueChange("primary_motivation", { name: e.target.value }, formik);
                      }}
                      selectedMenuItems={formik.values.primary_motivation?.name}
                  />
              </div>
          </FieldByType>

          <FieldByType validTypes={SECONDARY_MOTIVATION} type={selectedEntity?.type}>
              <div className="custom_css_details_form_grouping">
                  <label className="label_details_form">Secondary Motivations</label>
                  <CustomAutocomplete
                      multiple
                      id="tags-standard"
                      name="secondary_motivations"
                      options={motivationData.map((item) => ({
                          title: item,
                      }))}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option?.title}
                      groupBy={(option) => option.groupBy}
                      isOptionEqualToValue={(option, value) => option?.title === value?.title}
                      onChange={(e, value) => {
                          const updatedSecondaryMotivations =
                              value && value.length > 0 ? value.map((item) => ({ name: item?.title })) : [];
                          onFormValueChange("secondary_motivations", updatedSecondaryMotivations, formik);
                      }}
                      value={
                          formik.values?.secondary_motivations?.map((item) => ({
                              title: item?.name,
                          })) || []
                      }
                      renderInput={(params) => (
                          <TextField {...params} variant="outlined" placeholder="Secondary Motivations" />
                      )}
                      renderOption={(props, option, { selected }) => (
                          <li {...props}>
                              <Checkbox style={{ marginRight: 8 }} checked={selected} />
                              {option.title}
                          </li>
                      )}
                  />
              </div>
          </FieldByType>

          <FieldByType validTypes={TAGS} type={selectedEntity?.type}>
              <div>
                  <label className="label_details_form">Tags</label>
                  <div className="input_details_form">
                      <CustomAutocomplete
                          freeSolo
                          multiple
                          id="tags-standard"
                          options={tags?.map((option) => {
                              return {
                                  title: option,
                              };
                          })}
                          getOptionLabel={(option) =>
                              option && (typeof option === "string" ? option : option.title)
                          }
                          onChange={(e, value) => {
                              const updatedTags = value.map((item) => {
                                  return {
                                      name: item?.title ? item?.title : item,
                                  };
                              });
                              onFormValueChange("tags", updatedTags, formik);
                          }}
                          value={formik.values?.tags?.map((item) => ({
                              title: item?.name,
                          }))}
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  variant="standard"
                                  placeholder="Write Tag name & hit enter"
                              />
                          )}
                          Sx={{
                              padding: "7px",
                              width: "98%",
                              height: "12vh",
                          }}
                      />
                  </div>
              </div>
          </FieldByType>

          <FieldByType validTypes={CVSS3SCORE} type={selectedEntity?.type}>
              <div className="input_details_form">
                  <label className="label_details_form">CVSS 3 Score</label>
                  <CustomTextField
                      name="CVSS 3 Score"
                      className="DC_input_style"
                      type="text"
                      onChange={(e) => {
                          onFormValueChange("cvss3_score", e.target.value, formik);
                      }}
                      variant="standard"
                      styleSx={{
                          width: "100%",
                          marginTop: "0.7rem",
                          border: "1px solid #1E2B40",
                          borderRadius: "6px",
                          "& .MuiInputBase-input": {
                              color: "#fff !important",
                              padding: "10.5px 14px !important",
                          },
                          "& .MuiInputBase-input::placeholder": {
                              padding: "0rem !important",
                          },
                      }}
                      value={formik.values?.cvss3_score || ""}
                      placeholder="Integer Value"
                  />
              </div>
          </FieldByType>
          <FieldByType validTypes={POC_EXIST} type={selectedEntity?.type}>
              <div>
                  <div className="Toggle-div-css">
                      <p>Poc Exists :</p>
                      <span className="mt_important">
                          <CustomToggle
                              patch_available
                              onChange={(e) => {
                                  onFormValueChange("poc_exists", e.target.checked, formik);
                              }}
                              color="primary"
                              inputProps={{ "aria-label": "controlled" }}
                              checked={formik.values?.poc_exists}
                          />
                      </span>
                  </div>
              </div>
          </FieldByType>
          <FieldByType validTypes={POC_LINK} type={selectedEntity?.type}>
              <div>
                  <label className="label_details_form">PoC Link</label>
                  <CustomTextField
                      name="PoC Link"
                      className="DC_input_style"
                      type="text"
                      onChange={(e) => {
                          onFormValueChange("poc_link", e.target.value, formik);
                      }}
                      placeholder="Enter PoC Link"
                      variant="standard"
                      value={formik.values?.poc_link || ""}
                      styleSx={{
                          width: "100%",
                          marginTop: "0.7rem",
                          border: "1px solid #1E2B40",
                          borderRadius: "6px",
                          "& .MuiInputBase-input": {
                              color: "#fff !important",
                              padding: "10.5px 14px !important",
                          },
                          "& .MuiInputBase-input::placeholder": {
                              padding: "0rem !important",
                          },
                      }}
                  />
              </div>
          </FieldByType>

          <FieldByType validTypes={PRODUCTIONIZED} type={selectedEntity?.type}>
              <div>
                  <div className="Toggle-div-css">
                      <p> Productised :</p>
                      <span>
                          <CustomToggle
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
          <FieldByType validTypes={PRODUCTION_LINK} type={selectedEntity?.type}>
              <div>
                  <label className="label_details_form">Production Link</label>
                  <CustomTextField
                      name="PoC Link"
                      className="DC_input_style"
                      type="text"
                      onChange={(e) => {
                          onFormValueChange("production_link", e.target.value, formik);
                      }}
                      placeholder="Enter Production Link"
                      variant="standard"
                      value={formik.values?.production_link || ""}
                      styleSx={{
                          width: "100%",
                          marginTop: "0.7rem",
                          border: "1px solid #1E2B40",
                          borderRadius: "6px",
                          "& .MuiInputBase-input": {
                              color: "#fff !important",
                              padding: "10.5px 14px !important",
                          },
                          "& .MuiInputBase-input::placeholder": {
                              padding: "0rem !important",
                          },
                      }}
                  />
              </div>
          </FieldByType>
          <FieldByType validTypes={PATCH} type={selectedEntity?.type}>
              <div>
                  <div className="Toggle-div-css">
                      <p>Patch Available :</p>
                      <span>
                          <CustomToggle
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
          <FieldByType validTypes={PATCH_LINK} type={selectedEntity?.type}>
              <div>
                  <label className="label_details_form">Patch Link</label>
                  <CustomTextField
                      name="Patch Link"
                      className="DC_input_style"
                      type="text"
                      variant="standard"
                      onChange={(e) => {
                          onFormValueChange("patch_link", e.target.value, formik);
                      }}
                      styleSx={{
                          width: "100%",
                          marginTop: "0.7rem",
                          border: "1px solid #1E2B40",
                          borderRadius: "6px",
                          "& .MuiInputBase-input": {
                              color: "#fff !important",
                              padding: "10.5px 14px !important",
                          },
                          "& .MuiInputBase-input::placeholder": {
                              padding: "0rem !important",
                          },
                      }}
                      placeholder="Enter Patch Link"
                      value={formik.values?.patch_link || ""}
                  />
              </div>
          </FieldByType>
          <FieldByType validTypes={UNDER_ACTIVITY_OBSERVE} type={selectedEntity?.type}>
              <div>
                  <div className="Toggle-div-css">
                      <p>Underground Activity Observed :</p>
                      <span>
                          <CustomToggle
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
          <FieldByType validTypes={UNDER_ACTIVITY_LINK} type={selectedEntity?.type}>
              <div>
                  <label className="label_details_form">Under Activity Link</label>
                  <div className="input_details_form">
                      <CustomAutocomplete
                          freeSolo
                          multiple
                          id="tags-standard"
                          options={[]}
                          getOptionLabel={(option) => {
                              return option;
                          }}
                          onChange={(e, value) => {
                              onFormValueChange("underground_activity_link", value, formik);
                          }}
                          value={formik.values?.underground_activity_link?.map((item) => item) || []}
                          Sx={{
                              padding: "7px",
                              width: "98%",
                              height: "12vh",
                          }}
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  variant="standard"
                                  placeholder="Enter Under Activity Link"
                              />
                          )}
                      />
                  </div>
              </div>
          </FieldByType>

          <FieldByType validTypes={CAPABILITIES} type={selectedEntity?.type}>
              <div>
                  <label className="label_details_form">Capabilities</label>
                  <div className="input_details_form">
                      <CustomAutocomplete
                          freeSolo
                          multiple
                          id="capabilities-standard"
                          options={capabilitiesList?.map((option) => {
                              return {
                                  title: option,
                              };
                          })}
                          getOptionLabel={(option) =>
                              option && (typeof option === "string" ? option : option.title)
                          }
                          onChange={(e, value) => {
                              const updatedTags = value.map((item) => {
                                  return item?.title ? item?.title : item;
                              });
                              onFormValueChange("capabilities", updatedTags, formik);
                          }}
                          value={formik.values?.capabilities?.map((item) => ({
                              title: item,
                          }))}
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  variant="standard"
                                  placeholder="Write Capabilities name & hit enter"
                              />
                          )}
                          Sx={{
                              padding: "7px",
                          }}
                      />
                  </div>
              </div>
          </FieldByType>
      </div>
  );
};

export default DetailsForm;
