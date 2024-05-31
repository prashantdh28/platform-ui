import { ClassNames } from "@emotion/react";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useCallback, useEffect, useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Link } from "react-scroll";
import remarkGfm from "remark-gfm";
import BreadCrumbNavigator from "../../../../Components/BreadCrumb/BreadCrumbNavigator/BreadCrumbNavigator";
import CustomTextField from "../../../../Components/CustomTextField/CustomTextField";
import { useFormValidationSchema } from "../../../../Hooks/TID/useFormValidationSchema";
import useToastify from "../../../../Hooks/useToastify";
import { createEntity, generateAIEntity, updateEntity } from "../../../../Services/TID/dataCreation.service";
import { getTIDEntityByID } from "../../../../Services/TID/tid.service";
import StepperForDC from "../../../../TID/Components/StepperForDataCreation/StepperForDC";
import { checkKeyHasValue } from "../../../../helper/removeEmptyKeysHelper";
import {
    getActiveThreatStep,
    getCompletedThreatStep,
    getLoadingState,
    getRequestObject,
    getSelectedEntity,
    setCompletedThreatStep,
    setRequestObject,
    setSelectedEntity,
    setThreatActiveTab,
} from "../../../../redux/Slice/DataCreation/DataCreationSlice";
import "./CreateThreatScreen.css";
const steps = ["Describe", "Details", "Mitre Attack", "Associations", "Preview"];
const navigationStep = [
    { lable: "Type of object", id: "object" },
    { lable: "Description", id: "description" },
    { lable: "Details", id: "details" },
    { lable: "Mitre Attack", id: "mitreAttack" },
    { lable: "Associations", id: "associations" },
];

const CreateThreatScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    // console.log(id, "createThreatScreen");
    const requestObject = useSelector(getRequestObject);

    const [expandMitre, setExpandMitre] = useState(false);
    const [aiInputField, setAiInputField] = useState("");

    const { showToast } = useToastify();

    const activeThreatStep = useSelector(getActiveThreatStep);
    const completedThreatStep = useSelector(getCompletedThreatStep);
    const selectedEntity = useSelector(getSelectedEntity);
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    const reqestObject = useSelector(getRequestObject);
    const loading = useSelector(getLoadingState);

    const [activeStep, setActiveStep] = useState(activeThreatStep);
    const [completed, setCompleted] = useState(completedThreatStep);

    const breadcrumbItemsCustom = [
        { label: "Back", link: `${id ? "/tid" : "/tid/select-threat"}`, icon: HiArrowSmLeft },
    ];

    const isCompleted = () => {
        return true;
    };

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
            showToast("Entity has been updated successfully", { type: "success" });
        }
        if (flag === "add") {
            response = await dispatch(createEntity({ reqestObject })).unwrap();
            showToast("Entity has been created successfully", { type: "success" });
        }
        if (response?.name) {
            setActiveStep(0);
            navigate("/tid");
            setCompleted({});
            dispatch(setSelectedEntity({}));
            dispatch(setRequestObject({}));
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

    const { formikDescribeForm } = useFormValidationSchema(onNextClick);

    useEffect(() => {
        dispatch(setThreatActiveTab(activeStep));
        dispatch(setCompletedThreatStep(completed));
        return () => {
            dispatch(setThreatActiveTab(0));
            dispatch(setCompletedThreatStep({}));
            // dispatch(setRequestObject({}));
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
            <ClassNames>
                {({ css, cx }) => (
                    <>
                        <div className="TID-SingleEntity-Back-BreadCrumb">
                            <BreadCrumbNavigator items={breadcrumbItemsCustom} />
                        </div>
                        <div className="DC_main-card">
                            <div className="DC_heading">
                                <h3>
                                    {id ? "Update" : "Create a New"} {selectedEntity?.name} Object
                                </h3>
                                {activeStep === 0 ? (
                                    <div className="create_new_box">
                                        <CustomTextField
                                            fullWidth
                                            disabled={Boolean(id)}
                                            className="AI_Input_Box"
                                            placeholder="Extract Data from Unstructured Reports using FAKIR AI"
                                            value={aiInputField}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <LoadingButton
                                                            loading={loading}
                                                            disabled={Boolean(id)}
                                                            sx={{
                                                                "& .MuiLoadingButton-loadingIndicator": {
                                                                    color: "var(--name-email)",
                                                                },
                                                            }}
                                                            onClick={async () => {
                                                                const response = await dispatch(
                                                                    generateAIEntity({ url: aiInputField })
                                                                ).unwrap();
                                                                if (response?.name) {
                                                                    showToast(
                                                                        "Data has been generated successfully",
                                                                        {
                                                                            type: "success",
                                                                        }
                                                                    );
                                                                    setAiInputField("");
                                                                }
                                                            }}
                                                        >
                                                            {loading ? (
                                                                ""
                                                            ) : (
                                                                <RiLightbulbFlashFill
                                                                    fill={BackgroundColor}
                                                                    style={{ fontSize: "2rem" }}
                                                                />
                                                            )}
                                                        </LoadingButton>
                                                    </InputAdornment>
                                                ),
                                                style: { color: "var(--name-email)" },
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "var(--comment-border-bottom) !important",
                                                },
                                                "& .MuiInputBase-input": {
                                                    color: "var(--name-email) !important",
                                                },
                                                "& .MuiInputBase-input::placeholder": {
                                                    color: "var(--name-email) !important",
                                                },
                                            }}
                                            onChange={(e) => {
                                                setAiInputField(e.target.value);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <hr />
                            <div className={expandMitre ? "DC_container_for_expanded_mitre" : "DC_container"}>
                                {activeStep === steps.length - 1 ? (
                                    <div className="DC_navigate_item">
                                        <h3> Navigation </h3>
                                        {navigationStep.map((val, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    activeClass="DC_navigation_active_items"
                                                    className="DC_navigation_items"
                                                    to={val?.id}
                                                    spy={true}
                                                    smooth={true}
                                                    duration={250}
                                                    containerId="containerElement"
                                                >
                                                    {/* <div
                                            style={{
                                                color: activeIndex === index ? BackgroundColor : "",
                                                borderLeft:
                                                    activeIndex === index
                                                        ? `4px solid  ${BackgroundColor}`
                                                        : "none",
                                            }}
                                            className={
                                                activeIndex === index
                                                    ? "DC_navigation_active_items"
                                                    : "DC_navigation_items"
                                            }
                                            key={index}
                                            onClick={() => handleScrollToSection(index, val.id)}
                                        > */}
                                                    {val.lable}
                                                    {/* </div> */}
                                                </Link>
                                            );
                                        })}
                                        {checkKeyHasValue(requestObject, "reports") ? (
                                            <>
                                                <Link
                                                    activeClass="DC_navigation_active_items"
                                                    className="DC_navigation_items"
                                                    to="reports"
                                                    spy={true}
                                                    smooth={true}
                                                    duration={250}
                                                    containerId="containerElement"
                                                >
                                                    Reports
                                                </Link>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ) : (
                                    <div className={expandMitre ? "DC_tell_more" : ""}>
                                        <h3>Tell us more about the {selectedEntity?.name} </h3>

                                        <div
                                            style={{
                                                height: "75vh",
                                                overflow: "auto",
                                                wordBreak: "break-word",
                                                width: "28rem",
                                            }}
                                        >
                                            <Markdown remarkPlugins={[remarkGfm]}>
                                                {formikDescribeForm?.values?.description
                                                    .replace(/<p>/g, "")
                                                    .replace(/<\/p>/g, "")}
                                            </Markdown>
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={
                                        expandMitre
                                            ? "DC_container_Section_for_expanded_mitre"
                                            : "DC_container_Section"
                                    }
                                    // ref={typeOfObjectRef}
                                >
                                    <div className="DC_stepper_container">
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
                )}
            </ClassNames>
        </>
    );
};

export default CreateThreatScreen;
