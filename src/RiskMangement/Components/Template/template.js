import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../../Components/Button/ButtonBox";
import RiskTemplate from "../../../Assests/SVG/RiskTemplate.svg";
import {
  downloadReport,
  getTemplate,
} from "../../../redux/Slice/riskManagementApiSlice";
import "./template.css";
import { useNavigate } from "react-router";
const Template = ({ settemplateflag }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const templateListData = useSelector((state) => state.riskApi.templateData);
  const { reportData } = useSelector((state) => state.risk);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTemplate());
  }, [dispatch]);

  const handleCreate = async () => {
    if (selectedTemplate) {
      dispatch(
        downloadReport({
          template_id: selectedTemplate.id,
          report_id: reportData?.id,
        })
      );
    }
    navigate("/risk-management");
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template === selectedTemplate ? null : template);
  };

  return (
    <div className="e-card tapmlate-main-container">
      <div className="teplate-header-container">
        <button
          className="back-btn"
          onClick={() => {
            settemplateflag(false);
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
                className={`getTemplate-card ${
                  template === selectedTemplate ? "selected-template" : ""
                }`}
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
          onClick={handleCreate}
          isDisabled={!selectedTemplate}
        />
        <button
          className="cancle-btn"
          onClick={() => {
            settemplateflag(false);
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default Template;
