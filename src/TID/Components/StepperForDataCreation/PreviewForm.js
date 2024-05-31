import moment from "moment";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Element } from "react-scroll";
import InputChips from "../../../Components/Chips/InputChips/InputChips";
import { renderIcon } from "../../../helper/IconRenderer";
import { checkKeyHasValue } from "../../../helper/removeEmptyKeysHelper";
import { getRequestObject } from "../../../redux/Slice/DataCreation/DataCreationSlice";
import "./StepperForDC.css";

const PreviewForm = ({ setActiveStep, selectedEntity }) => {
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  // const allEntitiesTypesData = useSelector(getAllEntitiesTypes);
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
            {/* <span className="DC_input_lable">Object Type</span> */}
            <div className="Preview-Form-icon-Title">
              <span>{renderIcon(item?.type)}</span>
              <span className="previewForm-title">
                {item?.type?.toUpperCase()}
              </span>
            </div>
            <span className="DC_input_lable">Object Name</span>
            <span className="previewForm-title-Desc">{item?.name}</span>
            <span className="DC_input_lable">Relationship Type</span>
            <span className="previewForm-title-Desc">
              {item?.attribution_type}
            </span>
            <span className="DC_input_lable">Description</span>
            <span className="previewForm-title-Desc">
              {item?.description || ""}
            </span>
            {/* <span className="previewForm-title-Desc">External Reference</span>
                <span id="Preview-reference-link" style={{ color: BackgroundColor, cursor: "pointer" }}>
                    {" "}
                    https://
                </span> */}
          </React.Fragment>
        );
      });
    }
  };

  return (
    <div className="PreviewForm-Parent">
      <Element className="Preview-headers-section" name="object">
        <div className="Preview-Form-icon-Title-change">
          <div className="Preview-Form-icon-Title">
            <span>
              {selectedEntity && selectedEntity?.type
                ? renderIcon(selectedEntity?.type)
                : ""}
            </span>
            <span className="previewForm-title">
              {selectedEntity && selectedEntity?.type
                ? selectedEntity?.type?.toUpperCase()
                : ""}
            </span>
          </div>
          <span
            style={{ color: BackgroundColor, cursor: "pointer" }}
            onClick={() => onChangeClick(0)}
          >
            Change
          </span>
        </div>
        <span className="DC_input_lable">{selectedEntity?.description}</span>
      </Element>
      <Element name="description">
        <div className="Preview-Form-icon-Title-change">
          <span className="previewForm-title">Description</span>
          <span
            style={{ color: BackgroundColor, cursor: "pointer" }}
            onClick={() => onChangeClick(0)}
          >
            Change
          </span>
        </div>

        {/* <div className="preview-summary-desc">
              <span className="DC_input_lable">Summary</span>
              <span className="DC_input_lable">{requestObject?.description}</span>
          </div> */}
        <div className="Preview-headers-section">
          <div className="preview-summary-desc">
            <span className="DC_input_lable">Description</span>
            <span
              className="DC_input_lable"
              dangerouslySetInnerHTML={{ __html: requestObject?.description }}
            />
          </div>

          {checkKeyHasValue(requestObject, "aliases") ? (
            <>
              <span className="DC_input_lable">Aliases</span>
              <div className="Prview-InputChips">
                <InputChips
                  chipsData={requestObject?.aliases?.map((data, index) => {
                    return {
                      name: data?.name,
                      value: index,
                      color: "var(--button-tag-color)",
                    };
                  })}
                  onDelete={false}
                />
              </div>
            </>
          ) : (
            ""
          )}

          {checkKeyHasValue(requestObject, "open_source") ? (
            <>
              <div className="Preview-IsPublicly">
                <span className="previewForm-title-Desc">
                  Is Publicly Available
                </span>
                <AiOutlineInfoCircle
                  style={{
                    fontSize: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "grey",
                  }}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </Element>

      <Element className="Preview-headers-section" name="details">
        <div className="Preview-Form-icon-Title-change">
          <span className="previewForm-title">Details</span>
          <span
            style={{ color: BackgroundColor, cursor: "pointer" }}
            onClick={() => onChangeClick(1)}
          >
            Change
          </span>
        </div>

        {checkKeyHasValue(requestObject, "located_at") ? (
          <>
            <span className="DC_input_lable">LOCATED AT</span>
            {requestObject?.located_at.map((item, index) => {
              return (
                <span className="previewForm-title-Desc" key={index}>
                  {" "}
                  - {item?.country}
                </span>
              );
            })}
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "targets") ? (
          <>
            <span className="DC_input_lable">Target Region</span>
            {requestObject?.targets.map((item, index) => {
              return (
                <span className="previewForm-title-Desc" key={index}>
                  {" "}
                  - {item?.country}
                </span>
              );
            })}
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "originates_from") ? (
          <>
            <span className="DC_input_lable">Originates From</span>
            {requestObject?.originates_from.map((item, index) => {
              return (
                <span className="previewForm-title-Desc" key={index}>
                  {" "}
                  - {item?.country}
                </span>
              );
            })}
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "first_seen") ? (
          <>
            <span className="DC_input_lable">First Seen</span>
            <span className="previewForm-title-Desc">
              {moment(requestObject?.first_seen).format("YYYY-MM-DD")}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "last_seen") ? (
          <>
            <span className="DC_input_lable">Last Seen</span>
            <span className="previewForm-title-Desc">
              {moment(requestObject?.last_seen).format("YYYY-MM-DD")}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "primary_motivation") ? (
          <>
            <span className="DC_input_lable">Primary Motivation</span>

            <span className="previewForm-title-Desc">
              {requestObject?.primary_motivation}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "secondary_motivations") ? (
          <>
            <span className="DC_input_lable">Secondary Motivation</span>
            {requestObject?.secondary_motivations.map((item, index) => {
              return (
                <span className="previewForm-title-Desc" key={index}>
                  {" "}
                  - {item?.name}
                </span>
              );
            })}
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "tags") ? (
          <>
            <span className="DC_input_lable">Tags</span>
            <div className="Prview-InputChips">
              <InputChips
                chipsData={requestObject?.tags?.map((data, index) => {
                  return {
                    name: data?.name,
                    value: index,
                    color: "var(--button-tag-color)",
                  };
                })}
                onDelete={false}
              />
            </div>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "cvss3_score") ? (
          <>
            <span className="DC_input_lable">CVSS 3 Score</span>
            <span className="previewForm-title-Desc">
              {requestObject?.cvss3_score}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "poc_exists") ? (
          <>
            <span className="DC_input_lable">Poc Exists</span>
            <span className="previewForm-title-Desc">
              {requestObject?.poc_exists}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "poc_link") ? (
          <>
            <span className="DC_input_lable">PoC Link</span>
            <span className="previewForm-title-Desc">
              {requestObject?.poc_link}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "productionized") ? (
          <>
            <span className="DC_input_lable">Productised</span>
            <span className="previewForm-title-Desc">
              {requestObject?.productionized}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "production_link") ? (
          <>
            <span className="DC_input_lable">Production Link</span>
            <span className="previewForm-title-Desc">
              {requestObject?.production_link}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "patch_available") ? (
          <>
            <span className="DC_input_lable">Patch Available </span>
            <span className="previewForm-title-Desc">
              {requestObject?.patch_available}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "patch_link") ? (
          <>
            <span className="DC_input_lable">Patch Link</span>
            <span className="previewForm-title-Desc">
              {requestObject?.patch_link}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "underground_activity_observed") ? (
          <>
            <span className="DC_input_lable">
              Underground Activity Observed
            </span>
            <span className="previewForm-title-Desc">
              {requestObject?.underground_activity_observed}
            </span>
          </>
        ) : (
          ""
        )}

        {checkKeyHasValue(requestObject, "underground_activity_link") ? (
          <>
            <span className="DC_input_lable">Under Activity Link</span>
            <div className="Prview-InputChips">
              <InputChips
                chipsData={requestObject?.underground_activity_link?.map(
                  (data, index) => {
                    return {
                      name: data,
                      value: index,
                      color: "var(--button-tag-color)",
                    };
                  }
                )}
                onDelete={false}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </Element>

      <Element className="Preview-headers-section" name="mitreAttack">
        <div className="Preview-Form-icon-Title-change">
          <span className="previewForm-title">Mitre Attack</span>
          <span
            style={{ color: BackgroundColor, cursor: "pointer" }}
            onClick={() => onChangeClick(2)}
          >
            Change
          </span>
        </div>

        {checkKeyHasValue(requestObject, "techniques") ? (
          <>
            {requestObject?.techniques.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span className="Preview-MitreAttack-Heading">{`${item?.id} - ${item?.name}`}</span>
                  <span className="DC_input_lable">{item?.description}</span>
                </React.Fragment>
              );
            })}
          </>
        ) : (
          ""
        )}
      </Element>

      <Element className="Preview-headers-section" name="associations">
        <div className="Preview-Form-icon-Title-change">
          <span className="previewForm-title">Assocations</span>
          <span
            style={{ color: BackgroundColor, cursor: "pointer" }}
            onClick={() => onChangeClick(3)}
          >
            Change
          </span>
        </div>
        {checkKeyHasValue(requestObject, "attributions") ? (
          <>{renderAttributions()}</>
        ) : (
          <p className="noData">No Data Available</p>
        )}
      </Element>

      {checkKeyHasValue(requestObject, "reports") ? (
        <>
          <Element className="Preview-headers-section" name="reports">
            <div className="Preview-Form-icon-Title-change">
              <span className="previewForm-title">Reports</span>
              <span
                style={{ color: BackgroundColor, cursor: "pointer" }}
                onClick={() => onChangeClick(3)}
              >
                Change
              </span>
            </div>
            {requestObject?.reports.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span className="DC_input_lable">Title</span>
                  <div className="Preview-Form-icon-Title">
                    <span>{renderIcon("report")}</span>
                    <span className="previewForm-title">
                      {item?.title.toUpperCase()}
                    </span>
                  </div>
                  <span className="DC_input_lable">Report Url</span>
                  <span className="previewForm-title-Desc">
                    {item?.report_url}
                  </span>
                  <span className="DC_input_lable">Summary</span>
                  <span className="previewForm-title-Desc">
                    {item?.summary}
                  </span>
                </React.Fragment>
              );
            })}
          </Element>
        </>
      ) : (
        ""
      )}

      {/* <div className="Preview-headers-section">
                <div className="Preview-FirstName-Date">
                    <span className="DC_input_lable">Created Date</span>
                    <span className="previewForm-title-Desc">02.02.2023</span>
                </div>

                <div className="Preview-FirstName-Date">
                    <span className="DC_input_lable">Created By</span>
                    <span className="previewForm-title-Desc">Name</span>
                </div>
                <div className="Preview-FirstName-Date">
                    <span className="DC_input_lable">Last Modified Dat</span>
                    <span className="previewForm-title-Desc">Name</span>
                </div>

                <div className="Preview-FirstName-Date">
                    <span className="DC_input_lable">Version</span>
                    <span className="previewForm-title-Desc">04.17</span>
                </div>
            </div> */}
    </div>
  );
};

export default PreviewForm;
