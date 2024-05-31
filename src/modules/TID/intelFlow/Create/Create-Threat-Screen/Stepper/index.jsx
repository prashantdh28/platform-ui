import React, { useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Element } from "react-scroll";
import { useFormValidationSchema } from "../../../../../../Hooks/TID/useFormValidationSchema";
import {
    getLoadingState,
    getSelectedEntity,
} from "../../../../../../redux/Slice/DataCreation/DataCreationSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Stepper } from "@mui/material";
import BackdropLoader from "../../../../../../Components/Loader/BackdropLoader";
import CustomLoadingButton from "../../../../../../Components/Custom/CustomLoadingButton";
const stepList = ["Describe", "Details", "Mitre Attack", "Association Form"];

// Lazy load form components
const DescribeForm = lazy(() => import("../Forms/DescribeForm"));
const DetailsForm = lazy(() => import("../Forms/DetailsForm/DetailsForm"));
const MitreAttackForm = lazy(() => import("../Forms/MitreAttackForm/MitreAttackForm"));
const AssociationsForm = lazy(() => import("../Forms/AssociationsForm/AssociationsForm"));
const PreviewForm = lazy(() => import("../Forms/PreviewForm"));

const StepperForDC = ({
    id,
    steps,
    activeStep,
    setActiveStep,
    completedStep,
    onBackClick,
    onDoneClick,
    onNextClick,
    handleStep,
    formikDescribeForm,
    setExpandMitre,
    expandMitre,
}) => {
    const selectedEntity = useSelector(getSelectedEntity);
    const loading = useSelector(getLoadingState);

    const { formikDetailsForm, formikMitreAttackForm, formikAssociationsForm } =
        useFormValidationSchema(onNextClick);

    const [isError, setIsError] = useState(false);

    const onFormValueChange = (filed, value, setValues) => {
        if (setValues) {
            setValues.setFieldValue(filed, value);
        }
    };

    const onFormValueBlur = (e, filed, setValues) => {
        if (setValues) {
            if (e.target.value) {
                setValues.setFieldTouched(filed, false, false);
            } else {
                onFormValueChange(filed, e.target.value, setValues);
                setValues.setFieldTouched(filed, true, false);
            }
        }
    };

    const expandOff = () => {
        setExpandMitre(false);
    };

    const handleSubmit = () => {
        switch (activeStep) {
            case 0:
                formikDescribeForm.handleSubmit();
                break;
            case 1:
                formikDetailsForm.handleSubmit();
                expandOff();
                break;
            case 2:
                formikMitreAttackForm.handleSubmit();
                expandOff();
                break;
            case 3:
                formikAssociationsForm.handleSubmit();
                expandOff();
                break;
            default:
                return;
        }
    };

    const formShow = (e) => {
        switch (e) {
            case 0:
                return (
                    <DescribeForm
                        onFormValueChange={onFormValueChange}
                        formik={formikDescribeForm}
                        setIsError={setIsError}
                        selectedEntity={selectedEntity}
                        id={id}
                    />
                );
            case 1:
                return (
                    <DetailsForm
                        selectedEntity={selectedEntity}
                        onFormValueChange={onFormValueChange}
                        formik={formikDetailsForm}
                    />
                );
            case 2:
                return (
                    <MitreAttackForm
                        formik={formikMitreAttackForm}
                        setExpandMitre={setExpandMitre}
                        expandMitre={expandMitre}
                        onFormValueChange={onFormValueChange}
                    />
                );
            case 3:
                return (
                    <AssociationsForm
                        onFormValueChange={onFormValueChange}
                        onFormValueBlur={onFormValueBlur}
                        formik={formikAssociationsForm}
                    />
                );
            case 4:
                return <PreviewForm setActiveStep={setActiveStep} selectedEntity={selectedEntity} />;
            default:
                return;
        }
    };

    return (
        <>
            <div className="stepper-Heading">
                <Suspense fallback={<div>Loading...</div>}>
                    <Stepper
                        activeStep={activeStep}
                        connector={<ArrowForwardIosIcon sx={{ fill: "#8E97A4", width: "1rem" }} />}
                    >
                        {steps?.map((label, index) => (
                            <Step
                                key={label}
                                completed={completedStep[index]}
                                style={{
                                    transition: "scale 0.4s ease 0.3s",
                                    scale: `${activeStep === index ? 1.1 : 1}`,
                                }}
                            >
                                <StepButton
                                    color="inherit"
                                    disableRipple
                                    disableTouchRipple
                                    disabled={!completedStep[index]}
                                    onClick={handleStep(index)}
                                >
                                    <StepLabel
                                        className={`stepper-Heading-box ${
                                            activeStep === index && "stepper-Heading-box-active"
                                        }`}
                                        sx={{
                                            "& .MuiStepLabel-iconContainer": {
                                                display: "none",
                                            },
                                            "& .MuiStepLabel-labelContainer": {
                                                color: "#8e97a4 !important",
                                            },
                                            "& .MuiStepLabel-label": {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            },
                                            "& .Mui-completed": {
                                                color: "#fff !important",
                                            },
                                            "& .Mui-active": {
                                                color: "#fff !important",
                                            },
                                        }}
                                    >
                                        {completedStep[index] && (
                                            <CheckCircleOutlineIcon sx={{ fill: "#54D387", width: "1rem" }} />
                                        )}
                                        {index + 1}.{label}
                                    </StepLabel>
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Suspense>
            </div>
            <div>
                <hr className="horizontal_line_threat" />
                <Element
                    className={activeStep >= 4 ? "stepper-secondary" : "stepper-main"}
                    id="containerElement"
                    style={{ position: "relative", width: `${expandMitre ? "95%" : "65%"}` }}
                >
                    {activeStep >= 4 ? null : (
                        <span style={{ fontSize: "1.5rem", paddingLeft: "7px" }}>{stepList[activeStep]}</span>
                    )}
                    {activeStep >= 4 ? null : <hr className="sub_horizontal_line_threat" />}
                    <Suspense fallback={<BackdropLoader loading={true} />}>{formShow(activeStep)}</Suspense>
                </Element>
            </div>
            <hr className="horizontal_line_threat" style={{ marginTop: "2rem" }} />
            <div className="DC-Btn_previous" style={{ marginTop: "4rem" }}>
                <div>
                    {activeStep !== 0 ? (
                        <Button
                            style={{
                                backgroundColor: "#2A3C57",
                                color: "white",
                                width: "8rem",
                            }}
                            disabled={activeStep === 0}
                            onClick={() => {
                                onBackClick();
                                expandOff();
                            }}
                        >
                            Previous
                        </Button>
                    ) : (
                        ""
                    )}
                </div>

                {activeStep === steps.length - 1 ? (
                    <>
                        {id ? (
                            <CustomLoadingButton
                                loading={loading}
                                onClick={() => onDoneClick("update")}
                                variant="contained"
                                style={{
                                    width: "7rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                Update
                            </CustomLoadingButton>
                        ) : (
                            <CustomLoadingButton
                                loading={false}
                                onClick={() => onDoneClick("add")}
                                variant="contained"
                                style={{
                                    width: "7rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                Done
                            </CustomLoadingButton>
                        )}
                    </>
                ) : (
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {activeStep === 3 ? (
                            <Button
                                variant="outlined"
                                style={{
                                    backgroundColor: "#0082F9",
                                    color: "white",
                                    width: "7rem",
                                    marginBottom: "1rem",
                                }}
                                disabled={activeStep === 0}
                                onClick={() => {
                                    onNextClick();
                                    expandOff();
                                }}
                            >
                                Skip
                            </Button>
                        ) : (
                            ""
                        )}
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#0082F9",
                                color: "white",
                                width: "7rem",
                                marginBottom: "1rem",
                            }}
                            disabled={isError}
                            onClick={handleSubmit}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default StepperForDC;
