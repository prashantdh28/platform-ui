import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { MenuItem, Select } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import ButtonComponent from "../../../Components/Button/ButtonBox";
import { updateRisk } from "../../../redux/Slice/riskManagementApiSlice";
import { setForm2Data } from "../../../redux/Slice/riskManagementSlice";
import useToastify from "../../../Hooks/useToastify";
import "./stepper.css";

const Form2 = ({ handleBack, handleNext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToastify();
  const { riskProfileData, form2Data } = useSelector((state) => state.risk);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  // const [expandedAccordions, setExpandedAccordions] = useState(
  //   Array.from({ length: form2Data?.length - 1 }, () => false).concat(true)
  // );

  const [expandedAccordions, setExpandedAccordions] = useState(
    form2Data ? Array.from({ length: form2Data.length }, () => false) : []
  );

  const [nextButton, setnextButton] = useState(false);

  const initialValues = {
    business_objectives: form2Data,
  };

  console.log(
    nextButton,
    riskProfileData,
    form2Data,
    "form2Data",
    "riskProfileData",
    "nextButton"
  );

  //accordion ope close function
  const handleAccordionChange = (index) => {
    const expandedCopy = [...expandedAccordions];
    expandedCopy[index] = !expandedCopy[index];
    setExpandedAccordions(expandedCopy);
  };

  // submit form function
  const onSubmit = (values, onSubmitProps) => {
    if (nextButton) {
      dispatch(setForm2Data(values.business_objectives));
      const payload = { ...values, form_id: 1, ...riskProfileData };
      console.log(payload, "payloadpayloadpayloadpayloadpayload NextButton");
      dispatch(
        updateRisk(
          payload,
          id,
          navigate,
          showToast,
          "Risk Profile Updated Successfully",
          false,
          handleNext()
        )
      );
    } else {
      const payload = { ...values, form_id: 1, ...riskProfileData };
      console.log(payload, "payloadpayloadpayloadpayloadpayload NotNextButton");
      delete payload.checkboxValuese;
      if (id) {
        dispatch(
          updateRisk(
            payload,
            id,
            navigate,
            showToast,
            "Business Objectives Saved Successfully",
            true,
            handleNext()
          )
        );
      }
    }
  };

  //priorit dropdown option
  const priorityOptions = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
    { name: "5", value: "5" },
  ];

  //validation
  const validationSchema = yup.object({
    business_objectives: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Name is required"),
        description: yup.string().required("Department is required"),
      })
    ),
  });

  const handleAddObjectiv = ({ push }) => {
    const newArrey = expandedAccordions.map(() => false);
    setExpandedAccordions([...newArrey, true]);
    // Add a new accordion with the same state
    push({ name: "", description: "", priority: "" });
  };

  return (
    <div id="selectTrain" className="form2-main-container">
      <div style={{ width: "38%" }}>
        <p className="form2-header">Define Business Objectives</p>
        <p className="text-content">
          Business/mission objectives provide the necessary context for
          identifying and managing applicable cybersecurity risk mitigation
          pursuits. Clear and concise Business/Mission Objectives help to
          identify Key cybersecurity practices allowing Departments and
          Organisations to better prioritize actions and resources according to
          the user’s defined needs.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formik) => {
            console.log(formik.values, "Formik");
            return (
              <Form>
                <FieldArray name="business_objectives">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { business_objectives } = values;
                    return (
                      <div>
                        {business_objectives?.map((category, index) => (
                          <div className="accordion-div" key={index}>
                            <Accordion expanded={expandedAccordions[index]}>
                              <AccordionSummary
                                color="grey"
                                expandIcon={
                                  expandedAccordions[index] ? (
                                    <ClearIcon />
                                  ) : (
                                    <AddIcon />
                                  )
                                }
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                                onClick={() => handleAccordionChange(index)}
                              >
                                <Typography
                                  className="form2-accordion-header"
                                  style={{ color: "var(--name-email)" }}
                                >
                                  {category?.name}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  <div className="responsive-form">
                                    <div className="input-group">
                                      <label className="form-label">Name</label>
                                      <Field
                                        className="e-input from-input input-border"
                                        type="text"
                                        name={`business_objectives[${index}].name`}
                                      />
                                      <ErrorMessage
                                        name={`business_objectives[${index}].name`}
                                        component="div"
                                        className="Error"
                                      />
                                    </div>
                                    <div className="input-group">
                                      <label className="form-label">
                                        Description
                                      </label>
                                      <Field
                                        type="text"
                                        as="textarea"
                                        className="e-input form-textarea input-border"
                                        name={`business_objectives[${index}].description`}
                                        id={`business_objectives[${index}].description`}
                                      />

                                      <ErrorMessage
                                        name={`business_objectives[${index}].description`}
                                        component="div"
                                        className="Error"
                                      />
                                    </div>
                                    <div className="input-group">
                                      <FormControl
                                        variant="standard"
                                        sx={{ width: "100%" }}
                                      >
                                        <label className="form-label">
                                          Priority
                                        </label>
                                        <Select
                                          labelId="demo-select-small-label"
                                          id="select-box-font"
                                          name={`business_objectives[${index}].priority`}
                                          value={
                                            formik?.values?.business_objectives[
                                              index
                                            ]?.priority
                                          }
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          className="select-box input-border"
                                        >
                                          {priorityOptions?.map((option) => (
                                            <MenuItem
                                              key={option.value}
                                              value={option.value}
                                              className="drop-down-color"
                                            >
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>

                                      <ErrorMessage
                                        name={`business_objectives[${index}].priority`}
                                        component="div"
                                        className="Error"
                                      />
                                    </div>
                                    <div className="btn-container form2-btn-group">
                                      <button
                                        type="button"
                                        className="e-btn e-danger e-outline form1-delete-btn"
                                        onClick={() => {
                                          expandedAccordions.splice(index, 1);
                                          expandedAccordions[
                                            expandedAccordions?.length - 1
                                          ] = true;
                                          remove(index);
                                        }}
                                        disabled={
                                          business_objectives?.length <= 1
                                        }
                                      >
                                        DELETE
                                      </button>
                                      {business_objectives?.length >= 5 &&
                                      index === 4 ? (
                                        <p className="validation-msg">
                                          Maximum of 5 Business Objectives
                                        </p>
                                      ) : business_objectives?.length - 1 ===
                                          index &&
                                        business_objectives?.length < 5 ? (
                                        <button
                                          type="button"
                                          style={{
                                            color: BackgroundColor,
                                            borderColor: BackgroundColor,
                                          }}
                                          className="e-btn e-outline add-new-section"
                                          onClick={() =>
                                            handleAddObjectiv({ push })
                                          }
                                        >
                                          + Add New Objective
                                        </button>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <div className="btn-container form1-btn-group">
                  <div>
                    <button
                      type="button"
                      className="footer-back-btn"
                      onClick={() => {
                        handleBack();
                      }}
                    >
                      BACK
                    </button>
                  </div>
                  <div className="save-next-btn-group">
                    <button
                      type="submit"
                      id="save-btn"
                      className="e-btn e-outline save-btn"
                      style={{
                        borderRadius: "4px",
                        color: BackgroundColor,
                        borderColor: BackgroundColor,
                      }}
                    >
                      SAVE
                    </button>
                    <ButtonComponent
                      label="Next"
                      type="submit"
                      id="next-btn"
                      className="e-btn"
                      onClick={() => setnextButton(true)}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Form2;
