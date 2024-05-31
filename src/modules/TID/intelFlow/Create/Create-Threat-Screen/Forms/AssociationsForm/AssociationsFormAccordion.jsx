import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormHelperText, TextField, createFilterOptions } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAutocomplete from "../../../../../../../Components/Custom/CustomAutocomplete";
import CustomSelect from "../../../../../../../Components/Custom/CustomSelect";
import CustomTextField from "../../../../../../../Components/Custom/CustomTextField";
import { useDebounce } from "../../../../../../../Hooks/useDebouncedValue";
import { getEntitiesByName } from "../../../../../../../Services/TID/dataCreation.service";

const filter = createFilterOptions();

const AssociationsFormAccordion = ({
  deleteAccordion,
  onAccordionChange,
  index,
  expandedAccordion,
  formik,
  errors,
  touched,
  values,
  onFormValueChange,
  onFormValueBlur,
}) => {
  const dispatch = useDispatch();

  const [objectNameOptions, setObjectNameOptions] = useState([]);
  const [objectNameValue, setObjectNameValue] = useState(
    values.attributions[index].name
      ? { name: values.attributions[index].name }
      : null
  );

  const { entityTypes, relationships } = useSelector(
    (state) => state.vocabulary
  );


  const onObjectNameChange = useDebounce(async (event) => {
    event.preventDefault();
    if (event.target.value && values.attributions[index].type) {
      const response = await dispatch(
        getEntitiesByName({
          filter: {
            name: event.target.value,
            type: values.attributions[index].type,
          },
        })
      ).unwrap();
      setObjectNameOptions(response?.content);
    } else {
      setObjectNameOptions([]);
    }
  }, 1000);
  return (
    <div>
      <Accordion
        key={index}
        className="custom_accordion"
        onChange={() => onAccordionChange(index)}
        expanded={expandedAccordion[index]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: "var(--name-email)",
            },
          }}
        >
          Associations Form
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: "grid", gap: "1rem" }}>
            <label className="label_details_form">Object Type</label>
            <CustomSelect
              placeholder="Select Object Type"
              menuItems={entityTypes.map((item) => item.toUpperCase())}
              handleChange={(e) => {
                onFormValueChange(
                  `attributions[${index}].type`,
                  e.target.value.toLowerCase(),
                  formik
                );
                onFormValueChange(`attributions[${index}].name`, "", formik);
                onFormValueChange(`attributions[${index}].id`, "", formik);
                onFormValueChange(
                  `attributions[${index}].attribution_type`,
                  "",
                  formik
                );
                onFormValueChange(
                  `attributions[${index}].description`,
                  "",
                  formik
                );
                onFormValueChange(`attributions[${index}].title`, "", formik);
                onFormValueChange(
                  `attributions[${index}].report_url`,
                  "",
                  formik
                );
                onFormValueChange(`attributions[${index}].summary`, "", formik);
              }}
              handleBlur={(e) => {
                onFormValueBlur(e, `attributions[${index}].type`, formik);
              }}
              selectedMenuItems={
                values.attributions[index] && values.attributions[index].type
                  ? values.attributions[index].type.toUpperCase()
                  : ""
              }
            />
            {touched &&
              touched.attributions &&
              touched.attributions[index] &&
              touched.attributions[index].type &&
              errors.attributions &&
              errors.attributions[index] &&
              errors.attributions[index].type && (
                <div>
                  <FormHelperText error>
                    {touched.attributions[index].type &&
                      errors.attributions[index].type}
                  </FormHelperText>
                </div>
              )}

            {values?.attributions[index]?.type?.toLowerCase() === "report" ? (
              <>
                <label className="label_details_form">Title</label>
                <CustomTextField
                  placeholder="Enter Title"
                  styleSx={{
                    "& .MuiInputBase-input": {
                      color: "#fff !important",
                      padding: "0.5rem !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2a3c57 !important",
                      borderColor: "#2a3c57 !important",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      padding: "1 !important",
                    },
                  }}
                  disabled={values.attributions[index].type ? false : true}
                  value={values.attributions[index]?.title}
                  onChange={(e) => {
                    onFormValueChange(
                      `attributions[${index}].title`,
                      e.target.value,
                      formik
                    );
                  }}
                  onBlur={(e) => {
                    onFormValueBlur(e, `attributions[${index}].title`, formik);
                  }}
                />
                {touched &&
                  touched.attributions &&
                  touched.attributions[index] &&
                  touched.attributions[index].title &&
                  errors.attributions &&
                  errors.attributions[index] &&
                  errors.attributions[index].title && (
                    <div>
                      <FormHelperText error>
                        {touched.attributions[index].title &&
                          errors.attributions[index].title}
                      </FormHelperText>
                    </div>
                  )}
              </>
            ) : (
              <div className="custom_div_assoc_form">
                <label className="label_details_form">Object Name</label>
                <CustomAutocomplete
                  id="object-name"
                  getOptionLabel={(option) =>
                    option &&
                    (typeof option === "string" ? option : option.name)
                  }
                  filterOptions={(x) => x}
                  options={objectNameOptions}
                  disabled={values.attributions[index].type ? false : true}
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={objectNameValue}
                  noOptionsText="No Name"
                  onChange={(event, newValue) => {
                    setObjectNameValue(newValue);
                    onFormValueChange(
                      `attributions[${index}].name`,
                      newValue?.name,
                      formik
                    );
                    onFormValueChange(
                      `attributions[${index}].id`,
                      newValue?.id,
                      formik
                    );
                    onFormValueChange(
                      `attributions[${index}].attribution_type`,
                      "",
                      formik
                    );
                  }}
                  onBlur={(e) => {
                    onFormValueBlur(e, `attributions[${index}].name`, formik);
                  }}
                  renderInput={(params) => (
                    <TextField
                      onChange={onObjectNameChange}
                      {...params}
                      fullWidth
                      placeholder="Enter Object Name"
                    />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} style={{ background: "#1E2B40" }}>
                        {option?.name}
                      </li>
                    );
                  }}
                />

                {touched &&
                  touched.attributions &&
                  touched.attributions[index] &&
                  touched.attributions[index].name &&
                  errors.attributions &&
                  errors.attributions[index] &&
                  errors.attributions[index].name && (
                    <div>
                      <FormHelperText error>
                        {touched.attributions[index].name &&
                          errors.attributions[index].name}
                      </FormHelperText>
                    </div>
                  )}
              </div>
            )}
            {values?.attributions[index]?.type?.toLowerCase() === "report" ? (
              <>
                <label className="label_details_form">Report Url</label>
                <CustomTextField
                  placeholder="Enter Report Url"
                  styleSx={{
                    "& .MuiInputBase-input": {
                      color: "#fff !important",
                      padding: "0.5rem !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2a3c57 !important",
                      borderColor: "#2a3c57 !important",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      padding: "1 !important",
                    },
                  }}
                  id="TID-Dialoe-Text-Filed"
                  value={values.attributions[index]?.report_url}
                  onChange={(e) => {
                    onFormValueChange(
                      `attributions[${index}].report_url`,
                      e.target.value,
                      formik
                    );
                  }}
                  onBlur={(e) => {
                    onFormValueBlur(
                      e,
                      `attributions[${index}].report_url`,
                      formik
                    );
                  }}
                />
                {touched &&
                  touched.attributions &&
                  touched.attributions[index] &&
                  touched.attributions[index].report_url &&
                  errors.attributions &&
                  errors.attributions[index] &&
                  errors.attributions[index].report_url && (
                    <div>
                      <FormHelperText error>
                        {touched.attributions[index].report_url &&
                          errors.attributions[index].report_url}
                      </FormHelperText>
                    </div>
                  )}
              </>
            ) : (
              <>
                <label className="label_details_form">Relationship Type</label>
                <CustomAutocomplete
                  fullWidth
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      onFormValueChange(
                        `attributions[${index}].attribution_type`,
                        newValue,
                        formik
                      );
                    } else if (newValue && newValue.name) {
                      onFormValueChange(
                        `attributions[${index}].attribution_type`,
                        newValue.name,
                        formik
                      );
                    } else {
                      onFormValueChange(
                        `attributions[${index}].attribution_type`,
                        newValue,
                        formik
                      );
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.name
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push({
                        name: inputValue,
                        inputValue: `Add "${inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  onBlur={(e) => {
                    onFormValueBlur(
                      e,
                      `attributions[${index}].attribution_type`,
                      formik
                    );
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  options={relationships}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.name;
                    }
                    // Regular option
                    return option.name;
                  }}
                  renderOption={(props, option) => {
                    if (option.inputValue) {
                      return <li {...props}>{option.inputValue}</li>;
                    }
                    return <li {...props}>{option.name}</li>;
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="Select Relationship Type"
                    />
                  )}
                  freesolo
                  // filterOptions={(x) => x}
                  disabled={
                    values.attributions[index].type &&
                    values.attributions[index].name
                      ? false
                      : true
                  }
                  value={values.attributions[index].attribution_type}
                />
                {touched &&
                  touched.attributions &&
                  touched.attributions[index] &&
                  touched.attributions[index].attribution_type &&
                  errors.attributions &&
                  errors.attributions[index] &&
                  errors.attributions[index].attribution_type && (
                    <div>
                      <FormHelperText error>
                        {touched.attributions[index].attribution_type &&
                          errors.attributions[index].attribution_type}
                      </FormHelperText>
                    </div>
                  )}
              </>
            )}
            {values?.attributions[index]?.type?.toLowerCase() === "report" ? (
              <>
                <label className="label_details_form">summary</label>
                <CustomTextField
                  styleSx={{
                    "& .MuiInputBase-input": {
                      color: "#fff !important",
                      padding: "0.5rem !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2a3c57 !important",
                      borderColor: "#2a3c57 !important",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      padding: "1 !important",
                    },
                  }}
                  placeholder="Write Summary Here"
                  id="TID-Dialoe-Text-Filed"
                  focused={Boolean(values.attributions[index].summary)}
                  value={values.attributions[index].summary}
                  onChange={(e) => {
                    onFormValueChange(
                      `attributions[${index}].summary`,
                      e.target.value,
                      formik
                    );
                  }}
                  onBlur={(e) => {
                    onFormValueBlur(
                      e,
                      `attributions[${index}].summary`,
                      formik
                    );
                  }}
                />
                {touched &&
                  touched.attributions &&
                  touched.attributions[index] &&
                  touched.attributions[index].summary &&
                  errors.attributions &&
                  errors.attributions[index] &&
                  errors.attributions[index].summary && (
                    <div>
                      <FormHelperText error>
                        {touched.attributions[index].summary &&
                          errors.attributions[index].summary}
                      </FormHelperText>
                    </div>
                  )}
              </>
            ) : (
              <>
                <label className="label_details_form">Description</label>
                <CustomTextField
                  styleSx={{
                    "& .MuiInputBase-input": {
                      color: "#fff !important",
                      padding: "0.5rem !important",
                      paddingBottom: "4rem !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2a3c57 !important",
                      borderColor: "#2a3c57 !important",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      padding: "1 !important",
                    },
                  }}
                  id="TID-Dialoe-Text-Filed"
                  placeholder="Write Description Here"
                  disabled={
                    values.attributions[index].type &&
                    values.attributions[index].name
                      ? false
                      : true
                  }
                  value={values.attributions[index].description}
                  onChange={(e) => {
                    onFormValueChange(
                      `attributions[${index}].description`,
                      e.target.value,
                      formik
                    );
                  }}
                />
              </>
            )}
          </div>
          <div style={{ marginLeft: "auto" }} className="assoc_form_btn">
            {values.attributions.length > 1 && (
              <button
                type="button"
                className="assoc_form_btn_delete"
                onClick={() => deleteAccordion(index)}
              >
                Delete
              </button>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AssociationsFormAccordion;
