import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomLoadingButton from "../../../../../Components/Custom/CustomLoadingButton";
import CustomTextField from "../../../../../Components/Custom/CustomTextField";
import { sideBarListColor } from "../../../../../Constants/Constant";
import { useFormValidationSchema } from "../../../../../Hooks/TID/useFormValidationSchema";
import useToastify from "../../../../../Hooks/useToastify";
import { getTIDEntityByID } from "../../../../../Services/TID/tid.service";
import {
    getActiveThreatStep,
    getCompletedThreatStep,
    getLoadingState,
    getRequestObject,
    getResponseTime,
    setCompletedThreatStep,
    setRequestObject,
    setSelectedEntity,
    setThreatActiveTab,
} from "../../../../../redux/Slice/DataCreation/DataCreationSlice";
import {
    createEntity,
    generateAIEntity,
    updateEntity,
} from "../../../../../Services/TID/dataCreation.service";
import "../index.css";
import CreateThreatHeader from "./Header";
import StepperForDC from "./Stepper/index";
const steps = ["Describe", "Details", "Mitre Attack", "Associations", "Preview"];

const CreateThreat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [expandMitre, setExpandMitre] = useState(false);
    const [aiInputField, setAiInputField] = useState("");

    const { showToast } = useToastify();

    const activeThreatStep = useSelector(getActiveThreatStep);
    const completedThreatStep = useSelector(getCompletedThreatStep);
    const reqestObject = useSelector(getRequestObject);
    const loading = useSelector(getLoadingState);
    const responseTime = useSelector(getResponseTime);

    const [activeStep, setActiveStep] = useState(activeThreatStep);
    const [completed, setCompleted] = useState(completedThreatStep);

    const isCompleted = () => {
        return true;
    };

    const onBackClick = () => {
        setActiveStep((preStep) => preStep - 1);
        setCompleted((preCompleted) => {
            return {
                ...preCompleted,
                [activeStep - 1]: false,
            };
        });
    };

    const onDoneClick = async (flag) => {
        let response = {};
        if (flag === "update") {
            response = await dispatch(updateEntity({ reqestObject, id })).unwrap();
            showToast("The entity has been updated successfully.", {
                type: "success",
            });
        }
        if (flag === "add") {
            response = await dispatch(createEntity({ reqestObject })).unwrap();
            showToast("The entity has been created successfully.", {
                type: "success",
            });
        }
        if (response?.name) {
            setActiveStep(0);
            navigate("/intel-flow");
            setCompleted({});
            dispatch(setSelectedEntity({}));
            dispatch(setRequestObject({}));
        }
    };

    const onNextClick = () => {
        if (isCompleted()) {
            setActiveStep((preStep) => {
                if (preStep === steps.length - 1) {
                    return preStep;
                } else {
                    return preStep + 1;
                }
            });
            setCompleted((preCompleted) => {
                return {
                    ...preCompleted,
                    [activeStep]: true,
                };
            });
        }
    };

    const { formikDescribeForm } = useFormValidationSchema(onNextClick);

    const handleStep = (step) => () => {
        setActiveStep(step);
        setCompleted((preCompleted) => {
            const newCompleted = { ...preCompleted };
            Object.keys(newCompleted).forEach((key) => {
                if (parseInt(key) > step) {
                    newCompleted[key] = false;
                }
            });

            return newCompleted;
        });
    };

    const formatResponseTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        if (minutes > 0) {
            return `${minutes} m${minutes !== 1 ? "in" : ""} and ${seconds} s${seconds !== 1 ? "ec" : ""}`;
        } else {
            return `${seconds} s${seconds !== 1 ? "ec" : ""}`;
        }
    };

    const getUpdateData = useCallback(async () => {
        if (id && id !== "") {
            const response = await dispatch(getTIDEntityByID(id)).unwrap();
            if (response) {
                await dispatch(setRequestObject(response));
                await dispatch(setSelectedEntity({ name: response.type, type: response.type }));
            }
        }
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(setThreatActiveTab(activeStep));
        dispatch(setCompletedThreatStep(completed));
        return () => {
            dispatch(setThreatActiveTab(0));
            dispatch(setCompletedThreatStep({}));
        };
    }, [activeStep, completed, dispatch]);

    useEffect(() => {
        if (id && id !== "") {
            getUpdateData();
        }
        return () => {};
    }, [getUpdateData, id]);

    return (
        <>
            <Button
                className="back-to-threats"
                onClick={() => {
                    if (id) {
                        navigate("/intel-flow");
                    } else {
                        navigate("/intel-flow/select-threat");
                    }
                }}
                sx={{
                    borderRadius: "0.35rem",
                    height: "1.75rem",
                    width: "5.188rem",
                    color: sideBarListColor.TEXT,
                }}
            >
                <ArrowBackIcon
                    sx={{
                        fontSize: "1.25em",
                        fill: sideBarListColor.TEXT,
                    }}
                />
                Back
            </Button>
            <div className="bg_main_treat">
                <div className="tid-entity-card-main">
                    <CreateThreatHeader />
                    {activeStep === 0 ? (
                        <>
                            <div className="fakir_input_field">
                                <CustomTextField
                                    fullWidth
                                    disabled={Boolean(id)}
                                    className="input_field_report"
                                    placeholder="Paste your reports link here (Powered by FAKIR AI)"
                                    value={aiInputField}
                                    styleSx={{
                                        height: "3rem",
                                        width: "30rem",
                                        background: "transparent",
                                        paddingLeft: "0.9rem",
                                        paddingTop: "0.3rem",
                                        marginBottom: "0.5rem",
                                        "& .MuiInputBase-input::placeholder": {
                                            color: "#fff !important",
                                            opacity: 1,
                                            fontWeight: "300 !important",
                                        },
                                    }}
                                    onChange={(e) => {
                                        setAiInputField(e.target.value);
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {!aiInputField ? (
                                                    <InsertLinkIcon sx={{ color: "#fff !important" }} />
                                                ) : (
                                                    ""
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <CustomLoadingButton
                                    loading={loading}
                                    disabled={Boolean(id) || !aiInputField}
                                    onClick={async () => {
                                        const response = await dispatch(
                                            generateAIEntity({ url: aiInputField })
                                        ).unwrap();
                                        if (response?.name) {
                                            showToast("The data generation process completed successfully.", {
                                                type: "success",
                                            });
                                            setAiInputField("");
                                        }
                                    }}
                                    className={!aiInputField ? "fakir_btn_create" : ""}
                                    variant="contained"
                                    sx={{
                                        height: "2.1rem",
                                        marginTop: "0.45rem",
                                        marginRight: "0.6rem",
                                    }}
                                    startIcon={
                                        !loading ? (
                                            <AutoFixHighOutlinedIcon
                                                className="btn_link"
                                                sx={{
                                                    color: "#fff",
                                                }}
                                            />
                                        ) : (
                                            ""
                                        )
                                    }
                                >
                                    Extract
                                </CustomLoadingButton>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
                {responseTime && activeStep === 0 ? (
                    <div className="time_taken_fakir_ai_response">
                        <div className="stepper-Heading-box stepper-Heading-box-active">
                            {formatResponseTime(responseTime)}
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <hr className="horizontal_line_threat" />
                <div>
                    <div>
                        <div>
                            <StepperForDC
                                steps={steps}
                                activeStep={activeThreatStep}
                                setActiveStep={setActiveStep}
                                completedStep={completedThreatStep}
                                onBackClick={onBackClick}
                                onDoneClick={onDoneClick}
                                onNextClick={onNextClick}
                                handleStep={handleStep}
                                formikDescribeForm={formikDescribeForm}
                                setExpandMitre={setExpandMitre}
                                expandMitre={expandMitre}
                                id={id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateThreat;
