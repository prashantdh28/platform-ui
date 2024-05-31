import React, { useCallback, useEffect, useState } from "react";
import BreadCrumbNavigator from "../../../../Components/BreadCrumb/BreadCrumbNavigator/BreadCrumbNavigator";
import { HiArrowSmLeft } from "react-icons/hi";
import "./CreateRuleScreen.css";
import CreateRuleLeftSideSection from "../../../../TID/Components/Detection/CreateRule/LeftSection/CreateRuleLeftSideSection";
import CreateRuleRightSideSection from "../../../../TID/Components/Detection/CreateRule/RightSection/CreateRuleRightSideSection";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoader from "../../../../Components/Loader/SpinnerLoader";
import { createDetectionRule, updateDetectionRule } from "../../../../Services/TID/tid.service";
import useToastify from "../../../../Hooks/useToastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const editorDetectionDefaultValue = `   
selection:

Image|endswith: hoami.exe

condition: selection`;

const CreateRuleScreen = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { showToast } = useToastify();

    const { loading } = useSelector((state) => state.TIDEntity);

    const [detectionRuleData, setDetectionRuleData] = useState({});
    // const [detectionRuleObject, setDetectionRuleObject] = useState({});

    const breadCrumbItems = [{ label: "Back", link: "/tid/detection", icon: HiArrowSmLeft }];

    const validationSchema = Yup.object({
        product: Yup.string().required("Product is required"),
        service: Yup.string().required("Service is required"),
        category: Yup.string().required("Category is required"),
        level: Yup.string().required("Level is required"),
        description: Yup.string().required("Description is required"),
        status: Yup.string().required("Status is required"),
        source: Yup.string().required("Source is required"),
        file_name: Yup.string().required("Title is required"),
        related_type: Yup.string().required("Related type is required"),
    });

    const formik = useFormik({
        initialValues: {
            product: null,
            service: null,
            category: null,
            level: "informational",
            id: detectionRuleData?.rule?.id,
            description: null,
            status: null,
            source: "sigma",
            file_name: null,
            technique_ids: null,
            content: null,
            related_type: null,
            detection: editorDetectionDefaultValue,
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const response = await dispatch(
                updateDetectionRule({
                    requestObject: { ...values, source: "sigma" },
                    ruleID: detectionRuleData?.rule?.id,
                })
            );
            if (response && !response?.error) {
                showToast("The detection rule was created successfully.", { type: "success" });
                navigate("/tid/detection");
            } else {
                showToast("Something went wrong", { type: "error" });
            }
        },
    });

    const createDetectionRuleObject = useCallback(async () => {
        const response = await dispatch(createDetectionRule()).unwrap();
        if (response) {
            setDetectionRuleData(response);
            // setDetectionRuleObject({ ...response?.rule, status: "stable", level: "informational" });
        }
    }, [dispatch]);

    const onCreatedDetectionRuleChange = async (filed, value) => {
        formik.setFieldValue(filed, value);
        // setDetectionRuleObject((preObject) => {
        //     return {
        //         ...preObject,
        //         [filed]: value,
        //     };
        // });
    };

    useEffect(() => {
        createDetectionRuleObject();
    }, [createDetectionRuleObject]);

    return (
        <>
            <div className="TID-CreateRule-MainScreen">
                <div className="TID-CreateRule-BreadCrumb">
                    <BreadCrumbNavigator items={breadCrumbItems} />
                </div>

                {loading && <SpinnerLoader />}

                {detectionRuleData && Object.keys(detectionRuleData).length > 0 && (
                    <div id="Create-Rule-Section-Parent">
                        <div className="TID-Create-Rule-LeftScreen">
                            <CreateRuleLeftSideSection
                                detectionRuleData={detectionRuleData}
                                values={formik.values}
                                formik={formik}
                                onCreatedDetectionRuleChange={onCreatedDetectionRuleChange}
                            />
                        </div>

                        <div className="TID-Create-Rule-RightScreen">
                            <CreateRuleRightSideSection
                                detectionRuleData={detectionRuleData}
                                values={formik.values}
                                formik={formik}
                                onCreatedDetectionRuleChange={onCreatedDetectionRuleChange}
                                onSaveClick={formik.handleSubmit}
                                editorDetectionDefaultValue={editorDetectionDefaultValue}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CreateRuleScreen;
