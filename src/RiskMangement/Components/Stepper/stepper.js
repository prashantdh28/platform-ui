import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFlag } from "../../../redux/Slice/riskManagementSlice";
import GenerateReport from "../GenerateReport/generateReport";
import ManageControl from "../ManageControl/manageControl";
import Template from "../Template/template";
import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";
import Form4 from "./form4";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import { editReport } from "../../../redux/Slice/riskManagementApiSlice";

//stepper header name
const steps = [
  "Overview",
  "Business Objectives",
  "Security Framework",
  "Summary",
];

const StepperCOmponent = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.riskApi);
  const activestep = useSelector((state) => state.risk.activeTab);
  const { reportData } = useSelector((state) => state.risk);
  const Flag = useSelector((state) => state.risk.Flag);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const [manageControlflag, setmanageControlflag] = useState(
    Flag.manageControlflag
  );
  const [generateReportflag, setgenerateReportflag] = useState(
    Flag.generateReportflag
  );
  const [previewReportflag, setpreviewReportflag] = useState(
    Flag.previewReportflag
  );
  const [templateflag, settemplateflag] = useState(Flag.templateflag);
  const [activeStep, setActiveStep] = useState(activestep);
  // data store in redux
  useEffect(() => {
    dispatch(
      setFlag({
        manageControlflag,
        generateReportflag,
        previewReportflag,
        templateflag,
      })
    );
  }, [
    dispatch,
    manageControlflag,
    generateReportflag,
    previewReportflag,
    templateflag,
  ]);

  useEffect(() => {
    setActiveStep(activestep);
  }, [activestep]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // stepper form show function
  const formShow = (e) => {
    switch (e) {
      case 0:
        
        return <Form1 handleNext={handleNext} />;
      case 1:
        return <Form2 handleBack={handleBack} handleNext={handleNext} />;
      case 2:
        return <Form3 handleBack={handleBack} handleNext={handleNext} />;
      case 3:
        if (generateReportflag) {
          return (
            <GenerateReport
              setgenerateReportflag={setgenerateReportflag}
              setpreviewReportflag={setpreviewReportflag}
              previewReportflag={previewReportflag}
            />
          );
        } else {
          return (
            <Form4
              handleBack={handleBack}
              setmanageControlflag={setmanageControlflag}
              setgenerateReportflag={setgenerateReportflag}
              handleNext={handleNext}
            />
          );
        }
      default:
        return;
    }
  };

  return (
    <div>
      {manageControlflag ? (
        <ManageControl
          setActiveStep={setActiveStep}
          setmanageControlflag={setmanageControlflag}
        />
      ) : templateflag ? (
        <Template settemplateflag={settemplateflag} />
      ) : (
        <div className="e-card col-lg-12 control-section e-tab-section main-stepper-container">
          <div className="stepper-align">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div
              className={
                !previewReportflag ? "download-btn-div" : "preview-page-div"
              }
            >
              {activeStep === 3 && generateReportflag && !previewReportflag && (
                <button
                  type="button"
                  className="e-btn e-outline prieview-btn"
                  style={{
                    border: `1px solid ${BackgroundColor}`,
                    color: BackgroundColor,
                  }}
                  onClick={() => setpreviewReportflag(true)}
                >
                  PREVIEW
                </button>
              )}
              {activeStep === 3 && generateReportflag && (
                <button
                  type="button"
                  className="e-btn e-outline download-btn"
                  onClick={() => {
                    const peyload = {
                      content: reportData?.content,
                      report_type: "RISK_PROFILE",
                    };
                    dispatch(editReport(peyload, reportData?.id));
                    settemplateflag(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                  >
                    <path
                      d="M9.77789 5.5V9.7774H1.22309V5.5H0.000976562V9.7774C0.000976562 10.4496 0.550928 10.9995 1.22309 10.9995H9.77789C10.45 10.9995 11 10.4496 11 9.7774V5.5H9.77789ZM6.11155 5.90941L7.69418 4.33288L8.55577 5.19447L5.50049 8.24976L2.4452 5.19447L3.30679 4.33288L4.88943 5.90941V0.000488281H6.11155V5.90941Z"
                      className="svg-color-fill"
                      fill-opacity="0.87"
                    />
                  </svg>
                  <span className="dowmload-name">DOWNLOAD </span>
                </button>
              )}
            </div>
          </div>
          {loading ? (
            <SpinnerLoader className="spineer-loader" />
          ) : (
            formShow(activeStep)
          )}
        </div>
      )}
    </div>
  );
};
export default StepperCOmponent;
