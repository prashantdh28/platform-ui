import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
// import "./stepper.css";
import { FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getDescribeScReports } from "../../../../../../Services/Vocabulary/vocabulary.service";
import "../../../../../../../src/TID/Components/TIDTables/CoaTable/TableModals/RichTextModal.css";
import Button from "@mui/material/Button";
import CustomAutocomplete from "../../../../../../Components/Custom/CustomAutocomplete";
import CustomToggle from "../../../../../../Components/Custom/CustomToggle";
import CustomTextField from "../../../../../../Components/Custom/CustomTextField";
import CustomSelect from "../../../../../../Components/Custom/CustomSelect";
import CustomMarkdownEditor from "../../../../../../Components/Custom/CustomMarkdownEditor";
import {
  ALLIESES,
  REPORT_LIST,
  VARIANT,
} from "../../../../../../Constants/ValidEnttyTypesConstant";
import { getEntitiesByName } from "../../../../../../Services/TID/dataCreation.service";
import FieldByType from "./DetailsForm/FieldByType";
import "../../../intelFlow.css";

const DescribeForm = ({
  onFormValueChange,
  formik,
  setIsError,
  selectedEntity,
  id,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [foundElement, setFoundElement] = useState(null);
  const [report, setReport] = useState("");
  const [open, setOpen] = useState(false);

  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const reportsList = useSelector((state) => state.vocabulary.reports);

  const type =
    selectedEntity?.type?.charAt(0)?.toUpperCase() +
    selectedEntity?.type?.slice(1);

  const checkName = async (name) => {
    try {
      const response = await dispatch(getEntitiesByName({ name })).unwrap();
      if (response?.totalElements !== 0) {
        const searchLower = name.toLowerCase();
        let foundedElement = null;
        for (let i = 0; i < response.content.length; i++) {
          const element = response.content[i];
          if ("name" in element) {
            const elementLower = element["name"].toLowerCase();
            if (elementLower === searchLower) {
              foundedElement = element;
              break;
            } else if (element["aliases"] && element["aliases"].length > 0) {
              for (let j = 0; j < element["aliases"].length; j++) {
                const aliasElement = element["aliases"][j];
                if ("name" in aliasElement) {
                  const elementLower = aliasElement["name"].toLowerCase();
                  if (elementLower === searchLower) {
                    foundedElement = element;
                    break;
                  }
                }
              }
            } else {
              foundedElement = null;
            }
          }
        }
        if (foundedElement) {
          setFoundElement(foundedElement);
          return foundedElement;
        }
        return foundedElement;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error checking name:", error);
    }
    return "";
  };

  const onNameChange = async (e) => {
    const newName = e.target.value;
    onFormValueChange("name", newName, formik);
  };

  const onNameBlur = async (e) => {
    const newName = e.target.value;
    e.preventDefault();
    if (newName) {
      const isFound = await checkName(newName);
      if (isFound) {
        setOpen(true);
        formik.setFieldError(
          "name",
          "Name is already exists, Try with another name instead"
        );
        formik.setFieldTouched("name", true, false);
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getDescribeScReports());
  }, [dispatch]);

  return (
      <>
          <div>
              <div className="responsive-align">
                  <div className="responsive_form_text">
                      <div>
                          <label className="">{type} Name</label>
                          <CustomTextField
                              disabled={Boolean(id)}
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
                              placeholder={`Enter the name of ${type}`}
                              value={formik.values.name}
                              onChange={onNameChange}
                              onBlur={onNameBlur}
                              // error={formik.touched.name && Boolean(formik.errors.name)}
                              // helperText={formik.touched.name && formik.errors.name}
                          />
                          {formik.touched.name && Boolean(formik.errors.name) ? (
                              <FormHelperText error>
                                  {formik.touched.name && formik.errors.name}
                              </FormHelperText>
                          ) : (
                              ""
                          )}
                      </div>

                      <div className="custom_mark_describe">
                          <label className="">Description</label>
                          <CustomMarkdownEditor
                              className="text-editor"
                              name="description"
                              width="100%"
                              height={300}
                              value={formik.values.description}
                              onChange={(value) => {
                                  value = value || " ";
                                  if (value) {
                                      value = value.replace(/<p>/g, "").replace(/<\/p>/g, "");
                                  }
                                  onFormValueChange("description", value, formik);
                              }}
                          />
                          {formik.touched.description && Boolean(formik.errors.description) ? (
                              <FormHelperText error>
                                  {formik.touched.description && formik.errors.description}
                              </FormHelperText>
                          ) : (
                              ""
                          )}
                      </div>

                      <FieldByType validTypes={REPORT_LIST} type={selectedEntity?.type}>
                          <div className="input_Fields_describe">
                              <label className="label_details_form">Report Type</label>
                              <CustomSelect
                                  placeholder="Select Report Type"
                                  menuItems={reportsList}
                                  selectedMenuItems={report}
                                  setSelectedMenuItems={setReport}
                                  value={formik.values.report_type}
                                  handleChange={(e) => {
                                      e.target.value = e.target.value || "";
                                      onFormValueChange("report_type", e.target.value, formik);
                                  }}
                              />
                          </div>
                          {formik.touched.report_type && Boolean(formik.errors.report_type) ? (
                              <FormHelperText error>
                                  {formik.touched.report_type && formik.errors.report_type}
                              </FormHelperText>
                          ) : (
                              ""
                          )}
                      </FieldByType>

                      <FieldByType validTypes={VARIANT} type={selectedEntity?.type}>
                          <div className="">
                              <label className="label_details_form">Variant</label>
                              <CustomTextField
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
                                  onChange={(e) => {
                                      onFormValueChange("variant", e.target.value, formik);
                                  }}
                                  placeholder="Enter the Variant"
                                  value={formik.values.variant}
                              />
                          </div>
                          {formik.touched.variant && Boolean(formik.errors.variant) ? (
                              <FormHelperText error>
                                  {formik.touched.variant && formik.errors.variant}
                              </FormHelperText>
                          ) : (
                              ""
                          )}
                      </FieldByType>

                      <FieldByType validTypes={VARIANT} type={selectedEntity?.type}>
                          <div className="">
                              <label className="label_details_form">Version</label>
                              <CustomTextField
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
                                  onChange={(e) => {
                                      onFormValueChange("version", e.target.value, formik);
                                  }}
                                  placeholder="Enter the Version"
                                  value={formik.values.version}
                              />
                          </div>
                          {formik.touched.version && Boolean(formik.errors.version) ? (
                              <FormHelperText error>
                                  {formik.touched.version && formik.errors.version}
                              </FormHelperText>
                          ) : (
                              ""
                          )}
                      </FieldByType>

                      <FieldByType validTypes={ALLIESES} type={selectedEntity?.type}>
                          <div>
                              <label className="label_details_form">Alliases</label>
                              <div className="input_details_form">
                                  <CustomAutocomplete
                                      freeSolo
                                      multiple
                                      id="aliases-standard"
                                      getOptionLabel={(option) =>
                                          option && (typeof option === "string" ? option : option.title)
                                      }
                                      onChange={(e, value) => {
                                          const updatedTags = value.map((item) => {
                                              return {
                                                  name: item?.title ? item?.title : item,
                                              };
                                          });
                                          onFormValueChange("aliases", updatedTags, formik);
                                      }}
                                      value={formik.values?.aliases?.map((item) => ({
                                          title: item?.name,
                                      }))}
                                      renderInput={(params) => (
                                          <TextField
                                              {...params}
                                              variant="standard"
                                              placeholder="Write alliase name & hit enter"
                                          />
                                      )}
                                      Sx={{
                                          padding: "7px",
                                      }}
                                  />
                              </div>
                          </div>
                      </FieldByType>
                      <div style={{ display: "flex", alignItems: "center" }}>
                          <span>
                              <CustomToggle
                                  color="primary"
                                  inputProps={{ "aria-label": "controlled" }}
                                  name="isPublicityAvailable"
                                  checked={formik.values.open_source}
                                  onChange={(e) => {
                                      onFormValueChange("open_source", e.target.checked, formik);
                                  }}
                              />
                          </span>
                          <h5>&nbsp; Is Publicity Available</h5>
                      </div>
                  </div>
              </div>
          </div>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
          >
              <Box
                  sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "#1E2B40",
                      color: "#fff",
                      boxShadow: 24,
                      border: "1px solid #1E2B40",
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      ":focus-visible": {
                          borderColor: "#1E2B40",
                          outline: "none",
                      },
                  }}
              >
                  <AiOutlineClose style={{ cursor: "pointer" }} onClick={handleClose} />
                  <p id="parent-modal-description">
                      We found one or more entities with the name or alliases:{" "}
                      <span
                          style={{
                              cursor: "pointer",
                              color: BackgroundColor,
                              textDecoration: "underline",
                          }}
                          onClick={() => {
                              navigate(`/intel-flow/${foundElement?.id}`);
                          }}
                      >
                          {foundElement ? foundElement?.name : ""}
                      </span>
                  </p>
                  <p>We suggest you make changes to an existing entity instead of creating a new one.</p>
                  <Button label="Ok" style={{ colo: "" }} onClick={handleClose} />
              </Box>
          </Modal>
      </>
  );
};

export default DescribeForm;
