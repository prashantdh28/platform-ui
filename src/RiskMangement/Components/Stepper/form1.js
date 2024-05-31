// import { MenuItem, Select } from "@mui/material";
// import FormControl from '@mui/material/FormControl';
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
// import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ButtonComponent from "../../../Components/Button/ButtonBox";
import { riskProfile, setForm2Data } from "../../../redux/Slice/riskManagementSlice";
import DropDownCOmponent from "../DropDownTree/DropDownTree";
import "./stepper.css";
import {
  getSourceProileRisk,
  deleteRisk,
  updateRisk,
} from "../../../redux/Slice/riskManagementApiSlice";
import useToastify from "../../../Hooks/useToastify";

const Form1 = ({ handleNext }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToastify();
  const profileData = useSelector((state) => state.risk.riskProfileData);
  const { sourceProfileData } = useSelector((state) => state.riskApi);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [curentProfile, setcurentProfile] = useState("");
  // for modal
  const [status, setStatus] = useState({ hideDialog: false });
  const [formData, setformData] = useState();

  useEffect(() => {
    setCheckboxValue(profileData.profile_type === "TARGET");
    setcurentProfile(profileData?.source_profile);
    setIsPublic(profileData?.is_public);
  }, [profileData]);

  useEffect(() => {
    dispatch(getSourceProileRisk());
  }, [dispatch]);

  const dialogClose = () => {
    setStatus({ hideDialog: false });
  };

  //validation
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    department_name: yup.string().required("Department is required"),
  });

  const initialValues = {
    name: profileData.name,
    description: profileData.description,
    department_name: profileData.department_name,
  };

  //profile dropdown option
  const options = sourceProfileData?.map((data) => {
    return {
      name: data.name,
      value: data.id,
    };
  });

  //profile dropdown function
  const handleChange = (event) => {
    setcurentProfile(event.target.value);
  };

  //chechbox function
  const handleCheckBox = (e) => {
    setCheckboxValue(e.target.checked);
    if (!e.target.checked) {
      setcurentProfile("");
    }
  };

  const handleIsPublic = (e) => {
    setIsPublic(e.target.checked);
  };

  //form submit function
  const onSubmit = (values, onSubmitProps) => {
    values.checkboxValues = checkboxValue;
    values.is_public = isPublic;
    values.profile_type = checkboxValue ? "TARGET" : "SOURCE";
    values.source_profile = curentProfile;
    setformData(values);
    if (
      checkboxValue &&
      (curentProfile === "" || curentProfile === undefined)
    ) {
      setStatus({ hideDialog: true });
    } else {
      delete values.checkboxValues;
      dispatch(
        updateRisk(
          { form_id: 0, status: "DRAFT", ...values },
          id,
          navigate,
          showToast,
          "Risk Profile Updated Successfully",
          false,
          handleNext()
        )
      );
      const selectedObject = sourceProfileData?.find((item) => item.id === curentProfile);
      const from2Data = selectedObject?.business_objectives?.map((objective) => {
          return {
              name: objective?.name,
              description: objective?.description,
              priority: objective?.priority,
          };
      });
      dispatch(setForm2Data(from2Data ? from2Data : [{ name: "", description: "", priority: "" }]));
      dispatch(riskProfile(values));
    }
  };

  return (
    <div id="booking" className="form1-main-cointainer">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <div className="responsive-align">
                <div className="responsive-form">
                  <div className="input-group">
                    <label className="form-label">Name</label>
                    <Field
                      className="e-input from-input input-border"
                      type="text"
                      name="name"
                      id="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="Error"
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label">Description</label>
                    <Field
                      type="text"
                      as="textarea"
                      className="e-input form-textarea input-border"
                      name="description"
                      id="description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="Error"
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label">Department</label>
                    <Field
                      type="text"
                      className="e-input from-input input-border"
                      name="department_name"
                      id="department_name"
                    />
                    <ErrorMessage
                      name="department_name"
                      component="div"
                      className="Error"
                    />
                  </div>
                  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 form-label check-box-div">
                    <CheckBoxComponent
                      checked={checkboxValue}
                      label="Is Target Profile"
                      onChange={handleCheckBox}
                    />
                    <CheckBoxComponent
                      checked={isPublic}
                      label="Is Public Profile"
                      onChange={handleIsPublic}
                    />
                  </div>
                  {checkboxValue && (
                    <div>
                      <DropDownCOmponent
                        label="Choose Current Profile"
                        selectOption={curentProfile}
                        handleChange={handleChange}
                        options={options}
                        className="select-box"
                      />
                    </div>
                  )}
                </div>
                <div className="btn-container form1-btn-group">
                  <button
                    type="button"
                    className="e-btn e-danger e-outline form1-delete-btn"
                    onClick={() => dispatch(deleteRisk(id, navigate))}
                  >
                    DELETE
                  </button>
                  <ButtonComponent
                    label="NEXT"
                    type="submit"
                    className="e-btn form-next-btn"
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      {/* modal code */}
      <div className="App" id="dialog-target">
        <DialogComponent
          className="form-modal"
          width="260px"
          target="#dialog-target"
          close={dialogClose}
          visible={status.hideDialog}
          isModal={true}
          position={{ X: "center", Y: "center" }}
        >
          <div className="form1-modal-container">
            <p className="form1-modal-content">
              You havn’t selected a Current Profile. Does you wish to continue?
            </p>
            <div className="modal-btn-group">
              <button
                className="e-flat e-outline custom-outline-button"
                onClick={() => setStatus({ hideDialog: false })}
              >
                NO
              </button>
              <ButtonComponent
                label="Yes"
                className="e-btn form-next-btn"
                onClick={() => {
                  dispatch(riskProfile(formData));
                  // delete formData.checkboxValues
                  dispatch(
                    updateRisk(
                      { form_id: 0, status: "DRAFT", ...formData },
                      id,
                      navigate,
                      showToast,
                      "Risk Profile Updated Successfully",
                      false,
                      handleNext()
                    )
                  );
                  setStatus({ hideDialog: false });
                }}
              />
            </div>
          </div>
        </DialogComponent>
      </div>
    </div>
  );
};
export default Form1;
