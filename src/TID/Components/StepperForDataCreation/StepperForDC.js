import { Step, StepLabel, Stepper, StepButton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DynamicButton from "../../../Components/Button/ButtonBox";
import { ColorOptions, TextColor } from "../../../Constants/Constant";
import { getSelectedEntity } from "../../../redux/Slice/DataCreation/DataCreationSlice";
import AssociationsForm from "./AssociationsForm/AssociationsForm";
import DescribeForm from "./DescribeForm";
import DetailsForm from "./DetailsForm/DetailsForm";
import MitreAttackForm from "./MitreAttackForm/MitreAttackForm";
import PreviewForm from "./PreviewForm";
import { useFormValidationSchema } from "../../../Hooks/TID/useFormValidationSchema";
import { Element } from "react-scroll";

//stepper header name
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
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    const { formikDetailsForm, formikMitreAttackForm, formikAssociationsForm } =
        useFormValidationSchema(onNextClick);

    const [isError, setIsError] = useState(false);

    const onFormValueChange = (filed, value, setValues) => {
        // dispatch(setRequestObject({ ...requestObject, [filed]: value }));
        if (setValues) {
            setValues.setFieldValue(filed, value);
            // setValues.setFieldTouched(filed, true, false);
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
            <div className="DC_stepper">
                <div style={{ position: "sticky", top: "0%" }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps?.map((label, index) => (
                            <Step
                                key={label}
                                completed={completedStep[index]}
                                style={{
                                    transition: "scale 0.5s ease 0.4s",
                                    scale: `${activeStep === index ? 1.2 : 1}`,
                                }}
                            >
                                {/* <StepButton color="inherit"> */}
                                <StepButton
                                    color="inherit"
                                    disableRipple
                                    disableTouchRipple
                                    disabled={!completedStep[index]}
                                    onClick={handleStep(index)}
                                >
                                    <StepLabel
                                        StepIconProps={{
                                            sx: {
                                                fill: BackgroundColor,
                                                color:
                                                    BackgroundColor === ColorOptions.YELLOW
                                                        ? TextColor.BLACK
                                                        : TextColor.WHITE,
                                            },
                                        }}
                                        sx={{
                                            "& .MuiStepIcon-text": {
                                                fill:
                                                    BackgroundColor === ColorOptions.YELLOW
                                                        ? TextColor.BLACK
                                                        : TextColor.WHITE,
                                            },
                                        }}
                                    >
                                        {label}
                                    </StepLabel>
                                </StepButton>

                                {/* </StepButton> */}
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <Element
                    className="DC_stepper_section"
                    id="containerElement"
                    style={{ position: "relative" }}
                >
                    {formShow(activeStep)}
                </Element>
                {/* {loading ? <SpinnerLoader className="spineer-loader" /> : formShow(activestep)} */}
            </div>
            <div className="DC_Btn_section">
                <div>
                    {activeStep !== 0 ? (
                        <button
                            type="button"
                            disabled={activeStep === 0}
                            className="DC_backBtn"
                            onClick={() => {
                                onBackClick();
                                expandOff();
                            }}
                        >
                            BACK
                        </button>
                    ) : (
                        ""
                    )}
                </div>

                {activeStep === steps.length - 1 ? (
                    <>
                        {id ? (
                            <DynamicButton label="Update" onClick={() => onDoneClick("update")} />
                        ) : (
                            <DynamicButton label="Done" onClick={() => onDoneClick("add")} />
                        )}
                    </>
                ) : (
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {activeStep === 3 ? (
                            <button
                                type="button"
                                disabled={activeStep === 0}
                                className="DC_backBtn"
                                onClick={() => {
                                    onNextClick();
                                    expandOff();
                                }}
                            >
                                Skip
                            </button>
                        ) : (
                            ""
                        )}
                        <DynamicButton label="NEXT" isDisabled={isError} onClick={handleSubmit} />
                    </div>
                )}
            </div>
        </>
    );
};

export default StepperForDC;
