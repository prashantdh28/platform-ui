import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RiskTemplate from "../../../Assests/SVG/RiskTemplate.svg";
import ButtonComponent from "../../../Components/Button/ButtonBox";
import { useQuery } from "../../../Hooks/useQuery";
import "../../../RiskMangement/Components/Template/template.css";
import { downloadThreatCoverageReportData } from "../../../Services/TID/tid.service";
import { getTemplate } from "../../../redux/Slice/riskManagementApiSlice";
import { ClassNames } from "@emotion/react";

const TIDTemplate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const templateListData = useSelector((state) => state.riskApi.templateData);
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    // const { reportData } = useSelector((state) => state.risk);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    let type = useQuery().get("type");
    let id = useQuery().get("id");

    useEffect(() => {
        dispatch(getTemplate());
    }, [dispatch]);

    const downloadThreatCoverageReport = async () => {
        try {
            const response = await downloadThreatCoverageReportData({
                template_id: selectedTemplate.id,
                report_id: id,
            });
            // const element = document.createElement("div");
            // element.innerHTML = response;

            var opt = {
                margin: 1,
                filename: `${type}_report_${id}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            };
            html2pdf().from(response).set(opt).save();
        } catch (error) {
            console.error("Error downloading threat coverage report:", error);
        }
    };

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template === selectedTemplate ? null : template);
    };

    const BackNavigation = () => {
        navigate(`/tid/download?type=${type}`);
    };

    return (
        <>
            <ClassNames>
                {({ css, cx }) => (
                    <div className="e-card tapmlate-main-container">
                        <div className="teplate-header-container">
                            <button
                                className="back-btn"
                                onClick={() => {
                                    BackNavigation();
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M11.3333 7.99998L4.66663 7.99998M4.66663 7.99998L7.33329 5.33331M4.66663 7.99998L7.33329 10.6666"
                                        className="svg-color-stroke"
                                        stroke-opacity="0.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                Back
                            </button>
                            <p className="teplate-header">Choose a Template</p>
                        </div>
                        <div className="template-full-section">
                            <div className="template-section">
                                <p className="template-section-header">Reports</p>
                                <div className="template-container">
                                    {templateListData?.content?.map((template, index) => (
                                        <div
                                            className={cx(
                                                "getTemplate-card",
                                                template === selectedTemplate ? "selected-template" : "",
                                                css({
                                                    "&:hover,&:focus": {
                                                        boxShadow: `${BackgroundColor}66 0px 5px, ${BackgroundColor}4D 0px 10px, ${BackgroundColor}33 0px 15px, ${BackgroundColor}1A 0px 20px, ${BackgroundColor}0D 0px 25px;  border-radius: 10px`,
                                                        transform: "translate(0, -1rem)",
                                                    },
                                                    boxShadow:
                                                        template === selectedTemplate
                                                            ? `${BackgroundColor}66 0px 5px, ${BackgroundColor}4D 0px 10px, ${BackgroundColor}33 0px 15px, ${BackgroundColor}1A 0px 20px, ${BackgroundColor}0D 0px 25px;  border-radius: 10px`
                                                            : `2px 2px 2px 2px ${BackgroundColor}33`,
                                                    transform:
                                                        template === selectedTemplate
                                                            ? "translate(0, -1rem)"
                                                            : "",
                                                })
                                            )}
                                            onClick={() => handleTemplateClick(template)}
                                        >
                                            <img
                                                id="Template-logo-img"
                                                alt="Logo"
                                                onError={(e) => {
                                                    e.target.src = RiskTemplate;
                                                }}
                                                src={`data:image/png;base64,${template?.icon_base64?.replace(
                                                    /^"|"$/g,
                                                    ""
                                                )}`}
                                            />

                                            <div id="RiskManagment-template-name">{template?.name}</div>
                                        </div>
                                    ))}
                                </div>
                                <hr className="hr-class" />
                            </div>
                        </div>
                        <div className="temlplate-btn-container">
                            <ButtonComponent
                                type="button"
                                label="DOWNLOAD"
                                id="sequrityFramework"
                                className="e-btn create-btn"
                                onClick={downloadThreatCoverageReport}
                                isDisabled={!selectedTemplate}
                            />
                            {/* <button
          className="cancle-btn"
          onClick={() => {
          
          }}
        >
          CANCEL
        </button> */}
                        </div>
                    </div>
                )}
            </ClassNames>
        </>
    );
};

export default TIDTemplate;
