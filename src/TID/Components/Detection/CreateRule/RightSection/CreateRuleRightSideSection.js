import React from "react";
import { Editor } from "@monaco-editor/react";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import "./CreateRuleRightSideSection.css";
import { useDebouncedValue } from "../../../../../Hooks/useDebouncedValue";
import moment from "moment";

const CreateRuleRightSideSection = ({
    onSaveClick,
    values,
    onCreatedDetectionRuleChange,
    editorDetectionDefaultValue,
}) => {
    const theme = useSelector((state) => state.theme.theme);
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    const editorYAML = `
    Title: ${values?.file_name ? values?.file_name : "Enter the title of the rule"}
    
    Id: ${values?.id ? values?.id : "30fb5b6d-3c6d-444b-8d6b-5b0909aa3426"}
    
    Status: ${values?.status ? values?.status : "stable"}
    
    Description: ${values?.description ? values?.description : "Enter a description for the rule"}

    Date : ${moment(new Date().toISOString()).format("DD.MM.YYYY")}

    Level : ${values?.level ? values?.level : "informational"}

    tags : ${values?.tags && values?.tags.length > 0 ? values?.tags.map((tag) => `-${tag}\n`) : ""}

    False Positives : ${
        values?.false_positives && values?.false_positives.length > 0
            ? +values?.false_positives.map((item) => `-${item}\n`)
            : ""
    }

    Reference : ${
        values?.reference && values?.reference.length > 0 ? values?.reference.map((item) => `-${item}\n`) : ""
    }

    Category : ${values?.category ? values?.category : ""}

    Related Type :${values?.related_type ? values?.related_type : ""}

    Product :  ${values?.product ? values?.product : ""}

    Service : ${values?.service ? values?.service : ""}
    `;
    const debouncedEditorValue = useDebouncedValue(editorYAML, 500);

    return (
        <>
            <div className="TID-CreateRule-Parent">
                <div id="TID-CreateRule-Parent-HE">
                    <span className="CreateRule-Header-Name">Sigma HQ Rule Creation</span>
                    <div id="TID-RightSide-DetectionHeader">Detection</div>

                    <div className="Detection-CodeEditor">
                        <Box
                            style={{
                                width: "95%",
                                // height: "22vh",
                            }}
                        >
                            <Editor
                                height="25vh"
                                width="100%"
                                defaultLanguage="yaml"
                                theme={`${theme === "dark-theme" ? "vs-dark" : "light"}`}
                                defaultValue={editorDetectionDefaultValue}
                                onChange={(value) => onCreatedDetectionRuleChange("detection", value)}
                            />
                        </Box>
                    </div>

                    <div id="TID-RightSide-DetectionHeader">Sigma YAML Output</div>

                    <Box style={{ width: "95%" }}>
                        <Editor
                            height="25vh"
                            width="100%"
                            defaultLanguage="yaml"
                            theme={`${theme === "dark-theme" ? "vs-dark" : "light"}`}
                            // value={debouncedEditorValue}
                            value={debouncedEditorValue}
                            options={{ readOnly: true }}
                            onChange={(value) => onCreatedDetectionRuleChange("content", value)}
                        />
                    </Box>

                    <div className="TID-CreateRule-button-Parent">
                        <Button
                            variant="outlined"
                            style={{
                                padding: "8px 16px",
                                boxShadow: "none",
                                borderColor: BackgroundColor,
                                color: BackgroundColor,
                            }}
                            onClick={onSaveClick}
                        >
                            Save Rule
                        </Button>
                        <Button
                            variant="outlined"
                            style={{
                                padding: "8px 16px",
                                boxShadow: "none",
                                borderColor: BackgroundColor,
                                color: BackgroundColor,
                            }}
                        >
                            VALIDATE SIGMA RULE
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateRuleRightSideSection;
