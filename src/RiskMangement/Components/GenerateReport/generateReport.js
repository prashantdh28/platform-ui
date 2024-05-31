import Typography from "@mui/material/Typography";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportDataStore } from "../../../redux/Slice/riskManagementSlice";
import "./generateReport.css";
import {
  editReport,
  getReport,
} from "../../../redux/Slice/riskManagementApiSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useToastify from "../../../Hooks/useToastify";

const GenerateReport = ({
  setgenerateReportflag,
  setpreviewReportflag,
  previewReportflag,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reportData = useSelector((state) => state.risk.reportData);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const { showToast } = useToastify();
  const initialValues = {
    reportData: reportData?.content,
  };

  useEffect(() => {
    const data = {
      risk_profile_id: id,
      type: "RISK_PROFILE",
    };
    if (id) {
      dispatch(getReport(data));
    }
  }, [dispatch, id]);

  const onSubmit = (values, onSubmitProps) => {
    const peyload = {
      content: values?.reportData,
      report_type: "RISK_PROFILE",
    };
    dispatch(editReport(peyload, reportData?.id));
    setgenerateReportflag(false);
  };

  // editor toolbarsetting
  const toolbarSettings = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "FontName",
      "FontSize",
      "FontColor",
      "BackgroundColor",
      "LowerCase",
      "UpperCase",
      "|",
      "Formats",
      "Alignments",
      "OrderedList",
      "UnorderedList",
      "Outdent",
      "Indent",
      "|",
      "CreateLink",
      "SourceCode",
      "FullScreen",
      "|",
      "Undo",
      "Redo",
    ],
  };

  return (
    <>
      {previewReportflag ? (
        <div className="main-report-container">
          <div className="accordion-width margin-set">
            <div className="width-set">
              <div className="preview-header-container">
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => setpreviewReportflag(false)}
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
                <p className="manage-control-header">Preview</p>
              </div>
              <div>
                <div
                  className="accordian-contant accordian-scroll"
                  dangerouslySetInnerHTML={{ __html: reportData?.content }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formik) => {
            return (
              <Form className="form-margin">
                <div className="generate-report-container">
                  <div className="accordion-width">
                    <div>
                      <div className="accordion-header-div">
                        <Typography className="risk-accordion-header-name">
                          Report
                        </Typography>
                      </div>
                      <Field
                        name="name"
                        render={({ field }) => (
                          <RichTextEditorComponent
                            className="text-editor"
                            toolbarSettings={toolbarSettings}
                            width={680}
                            height={250}
                            value={reportData?.content}
                            change={(args) => {
                              dispatch(
                                reportDataStore({
                                  ...reportData,
                                  content: args.value,
                                })
                              );
                            }}
                          >
                            <Inject
                              services={[
                                Toolbar,
                                Image,
                                Link,
                                HtmlEditor,
                                QuickToolbar,
                              ]}
                            />
                          </RichTextEditorComponent>
                        )}
                      />
                    </div>
                  </div>

                  <div className="div-width">
                    <div className="back-btn-div">
                      <button
                        type="button"
                        className="back-btn"
                        onClick={() => {
                          setgenerateReportflag(false);
                          dispatch(reportDataStore({}));
                        }}
                      >
                        BACK
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        id="sequrityFramework"
                        className="e-btn e-outline save-btn"
                        style={{
                          borderRadius: "4px",
                          color: BackgroundColor,
                          borderColor: BackgroundColor,
                        }}
                        onClick={() => {
                          const peyload = {
                            content: initialValues.reportData,
                            report_type: "RISK_PROFILE",
                          };
                          dispatch(editReport(peyload, reportData?.id));
                          setgenerateReportflag(false);
                          showToast("Report saved successfully!", {
                            type: "success",
                          });
                        }}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};
export default GenerateReport;
