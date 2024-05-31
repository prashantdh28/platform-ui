import moment from "moment";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Element } from "react-scroll";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { renderIcon } from "../../../../../../helper/IconRenderer";
import { checkKeyHasValue } from "../../../../../../helper/removeEmptyKeysHelper";
import { getRequestObject } from "../../../../../../redux/Slice/DataCreation/DataCreationSlice";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import NoDataFound from "../../../../../../Pages/NoDataFound";

const PreviewForm = ({ setActiveStep, selectedEntity }) => {
  const requestObject = useSelector(getRequestObject);

  const onChangeClick = (index) => {
    setActiveStep(index);
  };

  const renderAttributions = () => {
    const values = requestObject?.attributions
      ? Object.values(requestObject.attributions)
      : [];
    const mergedAttributions = [].concat(...values);
    if (mergedAttributions.length > 0) {
      return mergedAttributions.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className={
                item
                  ? "PreviewForm_Icon_Title_campaign"
                  : "PreviewForm_Icon_Title"
              }
            >
              <span>{renderIcon(item?.type.toLowerCase())}</span>
              <span className="previewForm_title_Assoc_title">
                {item?.type?.toUpperCase()}
              </span>
            </div>
            <span className="previewform_input_table">Object Name</span>
            <MarkdownPreview
              source={item?.name}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
            <span className="previewform_input_table">Relationship Type</span>
            <MarkdownPreview
              source={item?.attribution_type}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
            <span className="previewform_input_table">Description</span>
            <MarkdownPreview
              source={item?.description}
              className="sub_preview_markdown "
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
            <hr className="horizontal_line_threat" />
          </React.Fragment>
        );
      });
    }
  };

  return (
    <div className="PreviewForm_Parent">
      <Element className="Previewform_headers_section" name="object">
        <div className="PreviewForm_icon_title_stepper_heading">
          <div className="PreviewForm_Icon_Title">
            <span>
              {selectedEntity && selectedEntity?.type
                ? renderIcon(selectedEntity?.type)
                : ""}
            </span>
            <span className="previewForm_title">
              {selectedEntity && selectedEntity?.type
                ? selectedEntity?.type?.toUpperCase()
                : ""}
            </span>
          </div>
          <BorderColorTwoToneIcon
            onClick={() => onChangeClick(0)}
            sx={{
              cursor: "pointer",
              color: "#0082F9",
            }}
          ></BorderColorTwoToneIcon>
        </div>
        <span className="previewform_input_table_header">
          {selectedEntity?.description}
        </span>
      </Element>
      <Element name="description">
        <div className="Previewform_headers_section">
          <div className="PreviewForm_icon_title_stepper_heading">
            <span className="previewForm_title">Description</span>
            <BorderColorTwoToneIcon
              onClick={() => onChangeClick(0)}
              sx={{
                cursor: "pointer",
                color: "#0082F9",
              }}
            ></BorderColorTwoToneIcon>
          </div>
          <hr className="horizontal_line_threat" />
          <div className="preview_detials_custom_css">
            {checkKeyHasValue(requestObject, "name") ? (
              <>
                <span className="previewform_input_table_aliases">
                  Group Name
                </span>
                <div>
                  <MarkdownPreview
                    source={requestObject?.name}
                    className="preview_markdown"
                    disableCopy
                    wrapperElement={{
                      "data-color-mode": "dark",
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
            {checkKeyHasValue(requestObject, "description") ? (
              <>
                <span className="previewform_input_table_aliases">
                  Description
                </span>
                <div>
                  <MarkdownPreview
                    source={requestObject?.description}
                    className="preview_markdown"
                    disableCopy
                    wrapperElement={{
                      "data-color-mode": "dark",
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
            {checkKeyHasValue(requestObject, "variant") ? (
              <>
                <span className="previewform_input_table_aliases">Variant</span>
                <div>
                  <MarkdownPreview
                    source={requestObject?.variant}
                    className="preview_markdown"
                    disableCopy
                    wrapperElement={{
                      "data-color-mode": "dark",
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
            {checkKeyHasValue(requestObject, "version") ? (
              <>
                <span className="previewform_input_table_aliases">Version</span>
                <div>
                  <MarkdownPreview
                    source={requestObject?.version}
                    className="preview_markdown"
                    disableCopy
                    wrapperElement={{
                      "data-color-mode": "dark",
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {checkKeyHasValue(requestObject, "report_type") ? (
              <>
                <span className="previewform_input_table margin-left-important">
                  Report Type
                </span>
                <div>
                  <MarkdownPreview
                    source={requestObject?.report_type}
                    className="preview_markdown"
                    disableCopy
                    wrapperElement={{
                      "data-color-mode": "dark",
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {checkKeyHasValue(requestObject, "aliases") ? (
              <>
                <span className="previewform_input_table_aliases">Aliases</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  {requestObject?.aliases.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <MarkdownPreview
                          source={item?.name}
                          className="preview_markdown"
                          disableCopy
                          wrapperElement={{
                            "data-color-mode": "dark",
                          }}
                        />
                      </React.Fragment>
                    );
                  })}
                </div>
              </>
            ) : (
              ""
            )}
            {checkKeyHasValue(requestObject, "open_source") ? (
              <>
                <div className="previewform_input_table_Is_Publicly">
                  <span>
                    Is Publicly{" "}
                    {requestObject?.open_source === false ? "Not" : ""}{" "}
                    Available
                  </span>
                  <AiOutlineInfoCircle
                    style={{
                      fontSize: "16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "grey",
                      padding: "4px",
                    }}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </Element>

      <Element className="Previewform_headers_section" name="details">
        <div className="PreviewForm_icon_title_stepper_heading">
          <span className="previewForm_title">Details</span>
          <BorderColorTwoToneIcon
            onClick={() => onChangeClick(1)}
            sx={{
              cursor: "pointer",
              color: "#0082F9",
            }}
          ></BorderColorTwoToneIcon>
        </div>
        <hr className="horizontal_line_threat" />
        {checkKeyHasValue(requestObject, "located_at") ? (
          <>
            <span className="previewform_input_table">LOCATED AT</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {requestObject?.located_at.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <MarkdownPreview
                      source={item?.country}
                      className="preview_markdown"
                      disableCopy
                      wrapperElement={{
                        "data-color-mode": "dark",
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "targets") ? (
          <>
            <span className="previewform_input_table">Target Region</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {requestObject?.targets.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <MarkdownPreview
                      source={item?.country}
                      className="preview_markdown"
                      disableCopy
                      wrapperElement={{
                        "data-color-mode": "dark",
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "originates_from") ? (
          <>
            <span className="previewform_input_table">Originates From</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {requestObject?.originates_from.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <MarkdownPreview
                      source={item?.country}
                      className="preview_markdown"
                      disableCopy
                      wrapperElement={{
                        "data-color-mode": "dark",
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "first_seen") ? (
          <>
            <span className="previewform_input_table">First Seen</span>
            <MarkdownPreview
              source={moment(requestObject?.first_seen).format("YYYY-MM-DD")}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "last_seen") ? (
          <>
            <span className="previewform_input_table">Last Seen</span>
            <MarkdownPreview
              source={moment(requestObject?.last_seen).format("YYYY-MM-DD")}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "primary_motivation") ? (
          <>
            <span className="previewform_input_table">Primary Motivation</span>
            <MarkdownPreview
              source={requestObject?.primary_motivation}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "secondary_motivations") ? (
          <>
            <span className="previewform_input_table">
              Secondary Motivation
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {requestObject?.secondary_motivations.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <MarkdownPreview
                      source={item?.name}
                      className="preview_markdown"
                      disableCopy
                      wrapperElement={{
                        "data-color-mode": "dark",
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "report_date") ? (
          <>
            <span className="previewform_input_table">Report Date</span>
            <MarkdownPreview
              source={moment(requestObject?.report_date).format("YYYY-MM-DD")}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "tags") ? (
          <>
            <span className="previewform_input_table">Tags</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {requestObject?.tags?.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <MarkdownPreview
                      source={data?.name}
                      className="preview_markdown"
                      disableCopy
                      wrapperElement={{
                        "data-color-mode": "dark",
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "capabilities") ? (
          <>
            <span className="previewform_input_table">Capabilities</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {requestObject?.capabilities?.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <MarkdownPreview
                      source={data}
                      className="preview_markdown"
                      disableCopy
                      wrapperElement={{
                        "data-color-mode": "dark",
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "platforms") ? (
          <>
            <span className="previewform_input_table">Affected Platform</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {requestObject?.platforms?.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <MarkdownPreview
                      source={data}
                      className="preview_markdown"
                      disableCopy
                      wrapperElement={{
                        "data-color-mode": "dark",
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "cvss3_score") ? (
          <>
            <span className="previewform_input_table">CVSS 3 Score</span>
            <MarkdownPreview
              source={requestObject?.cvss3_score}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}
        {checkKeyHasValue(requestObject, "poc_exists") ? (
          <>
            <span className="previewform_input_table">Poc Exists</span>
            <MarkdownPreview
              source={requestObject?.poc_exists === true ? "True" : "False"}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "poc_link") ? (
          <>
            <span className="previewform_input_table">PoC Link</span>
            <MarkdownPreview
              source={requestObject?.poc_link}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "productionized") ? (
          <>
            <span className="previewform_input_table">Productised</span>
            <MarkdownPreview
              source={requestObject?.productionized === true ? "True" : "False"}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "production_link") ? (
          <>
            <span className="previewform_input_table">Production Link</span>
            <MarkdownPreview
              source={requestObject?.production_link}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "patch_available") ? (
          <>
            <span className="previewform_input_table">Patch Available </span>
            <MarkdownPreview
              source={
                requestObject?.patch_available === true ? "True" : "False"
              }
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "patch_link") ? (
          <>
            <span className="previewform_input_table">Patch Link</span>
            <MarkdownPreview
              source={requestObject?.patch_link}
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "underground_activity_observed") ? (
          <>
            <span className="previewform_input_table">
              Underground Activity Observed
            </span>
            <MarkdownPreview
              source={
                requestObject?.underground_activity_observed === true
                  ? "True"
                  : "False"
              }
              className="preview_markdown"
              disableCopy
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "underground_activity_link") ? (
          <>
            <span className="previewform_input_table">Under Activity Link</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {requestObject?.underground_activity_link?.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <MarkdownPreview
                      source={data}
                      className="preview_markdown"
                      disableCopy
                      wrapperElement={{
                        "data-color-mode": "dark",
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </Element>

      <Element className="Previewform_headers_section" name="mitreAttack">
        <div className="PreviewForm_icon_title_stepper_heading">
          <span className="previewForm_title">Mitre Attack</span>
          {/* <span
            style={{ color: BackgroundColor, cursor: "pointer" }}
            onClick={() => onChangeClick(2)}
          >
            Change
          </span> */}
          <BorderColorTwoToneIcon
            onClick={() => onChangeClick(2)}
            sx={{
              cursor: "pointer",
              color: "#0082F9",
            }}
          ></BorderColorTwoToneIcon>
        </div>
        <hr className="horizontal_line_threat" />
        {checkKeyHasValue(requestObject, "techniques") ? (
          <>
            <span className="previewform_input_table">Techniques</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {requestObject?.techniques.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <MarkdownPreview
                      source={`${item?.id} - ${item?.name}`}
                      className="preview_markdown"
                      disableCopy
                      wrapperElement={{
                        "data-color-mode": "dark",
                      }}
                    />
                    {item?.description ? (
                      <span className="previewform_input_table">
                        Description
                      </span>
                    ) : (
                      ""
                    )}
                    {item?.description ? (
                      <MarkdownPreview
                        source={item?.description}
                        className="preview_markdown"
                        disableCopy
                        wrapperElement={{
                          "data-color-mode": "dark",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </Element>

      <Element className="Previewform_headers_section" name="associations">
        <div className="PreviewForm_icon_title_stepper_heading">
          <span className="previewForm_title">Assocations</span>
          <BorderColorTwoToneIcon
            onClick={() => onChangeClick(3)}
            sx={{
              cursor: "pointer",
              color: "#0082F9",
            }}
          ></BorderColorTwoToneIcon>
        </div>
        <hr className="horizontal_line_threat" />
        {checkKeyHasValue(requestObject, "attributions") ? (
          <>{renderAttributions()}</>
        ) : (
          <NoDataFound />
        )}
      </Element>

      {checkKeyHasValue(requestObject, "reports") ? (
        <>
          <Element className="Previewform_headers_section" name="reports">
            <div className="PreviewForm_icon_title_stepper_heading">
              <span className="previewForm_title">Reports</span>
              <BorderColorTwoToneIcon
                onClick={() => onChangeClick(3)}
                sx={{
                  cursor: "pointer",
                  color: "#0082F9",
                }}
              ></BorderColorTwoToneIcon>
            </div>
            <hr className="horizontal_line_threat" />
            {requestObject?.reports.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span className="previewform_input_table">Title</span>
                  <div className="PreviewForm_Icon_Title_campaign">
                    <span>{renderIcon("report")}</span>
                    <span className="previewForm_title_Assoc_title">
                      {item?.title.toUpperCase()}
                    </span>
                  </div>
                  <span className="previewform_input_table">Report Url</span>
                  <MarkdownPreview
                    source={item?.report_url}
                    className="preview_markdown"
                    disableCopy
                    wrapperElement={{
                      "data-color-mode": "dark",
                    }}
                  />
                  <span className="previewform_input_table">Summary</span>
                  <MarkdownPreview
                    source={item?.summary}
                    className="preview_markdown"
                    disableCopy
                    wrapperElement={{
                      "data-color-mode": "dark",
                    }}
                  />
                  <hr className="horizontal_line_threat" />
                </React.Fragment>
              );
            })}
          </Element>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PreviewForm;
