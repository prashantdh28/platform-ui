import React, { useState } from "react";
import InputChips from "../../../../Components/Chips/InputChips/InputChips";
import RichTextModal from "./TableModals/RichTextModal";
import { BiExpandAlt } from "react-icons/bi";
import DropDownTree from "../../../../Components/DropDownTree/DropDownTree";
import { ThreatCoverageTableStatus } from "../../../../Constants/Constant";
import MarkDownDialogeBox from "../../../../Components/Markdown/MarkDownDialogeBox";
import "./Trtd.css";

const DropDownoptions = [
    { value: "Enterprise", label: "Enterprise" },
    { value: "Mobile", label: "Mobile" },
    { value: "ICS", label: "ICS" },
    { value: "NOT_SET", label: "NOT_SET" },
];

const state = [
  {
    name: "Not Applicable",
    color: ThreatCoverageTableStatus.NOTAPPLICABLE,
    value: "NOT_APPLICABLE",
  },
  {
    name: "in Place",
    color: ThreatCoverageTableStatus.INPLACE,
    value: "IN_PLACE",
  },
  {
    name: "In Progress",
    color: ThreatCoverageTableStatus.INPROGRESS,
    value: "IN_PROGRESS",
  },
  {
    name: "Not in Place",
    color: ThreatCoverageTableStatus.NOTINPLACE,
    value: "NOT_IN_PLACE",
  },
];
const ThreatCoverageTableRow = ({
  item,
  row,
  title,
  type,
  setData,
  updateThreatCoverageData,
}) => {
  const [selectedState, setSelectedState] = useState(row?.coverage?.state);
  const [commentValue, setSetCommentValue] = useState(row?.coverage?.comment);
  const [supportingProductStackValue, setSupportingProductStackValue] = useState(
      row?.coverage?.product_state
  );

  const onStateClick = (state) => {
    setSelectedState(state);
    updateThreatCoverageData(row?.id, type, "state", state, row, setData);
  };

  return (
      <>
          <div className="TID-table-header-data">
              <span className="TID-TCR-InputChips">
                  <InputChips
                      id="TID-Detection-inputChips"
                      chipsData={item?.entities?.map((entity, entityIndex) => ({
                          name: entity.name,
                          color: entity.color,
                          entityIndex: entityIndex,
                      }))}
                  />
              </span>
              <span className="TID-Table-technique-name">
                  <span id="TID-ThreateCoverage-TechniqueID-name">
                      <span id="TID-ThreateCoverage-TechniqueID">{item?.technique_id}</span>
                      {/* <span id="TID-ThreateCoverage-TechniqueID">{`${item?.technique_name} `}</span> */}
                      <span id="TID-ThreateCoverage-TechniqueName">
                          <MarkDownDialogeBox
                              content={item?.technique_name}
                              dailogContet={item?.technique_description}
                              //   readMoreChars={50}
                              customClassNames="TreatCoverage-Mitigation-Dialogebox"
                              headerName={`${item?.technique_id} - ${item?.technique_name}`}
                          />
                      </span>
                  </span>
              </span>
              <span className="TID-Table-technique-name">
                  <span id="TID-ThreateCoverage-TechniqueID-name">
                      <span id="TID-ThreateCoverage-TechniqueID">{row?.id} </span>
                      {/* <span id="TID-ThreateCoverage-TechniqueID"> {row?.name}</span> */}
                      <span id="TID-ThreateCoverage-TechniqueName">
                          <MarkDownDialogeBox
                              content={row?.name}
                              dailogContet={row?.description}
                              //   readMoreChars={50}
                              customClassNames="TreatCoverage-Mitigation-Dialogebox"
                              headerName={`${row?.id} - ${row?.name}`}
                          />
                      </span>
                  </span>
                  {title === "Controls" && (
                      <span
                          className="TID-sub-control"
                          //  onClick={() => handleOpenSubControlModal(item)}
                      >
                          Sub Controls
                      </span>
                  )}
              </span>
              <div className="threatCoverage-child-content">
                  <span className="TID-technique-name-state">
                      {state.map((stateItem, stateIndex) => (
                          <div
                              key={stateIndex}
                              className={`TID-COA-Data-Item-state ${
                                  stateItem.value === selectedState ? "selected" : ""
                              }`}
                              style={{
                                  backgroundColor:
                                      stateItem?.value === selectedState ? stateItem?.color : "transparent",
                              }}
                              onClick={() => onStateClick(stateItem?.value)}
                          >
                              {stateItem.name}
                          </div>
                      ))}
                  </span>
                  <span className="TID-technique-name-AdditionalComment">
                      <span id="TID-btn-expand">
                          <RichTextModal
                              comment={commentValue}
                              setData={setSetCommentValue}
                              id={row?.id}
                              type={type}
                              row={row}
                              setTabData={setData}
                              updateThreatCoverageData={updateThreatCoverageData}
                          >
                              <BiExpandAlt
                                  className="TID-btn-expand"
                                  // onClick={handleOpenTextEditor}
                              />
                          </RichTextModal>
                      </span>
                      <span className="TID-ThreatCoverage-AdditionalComment">
                          <div dangerouslySetInnerHTML={{ __html: commentValue }} />
                      </span>
                  </span>
                  <span className="TID-technique-name-dropdown">
                      <DropDownTree
                          label="Supporting-Product-Stack"
                          options={DropDownoptions}
                          handleChange={(e) => {
                              setSupportingProductStackValue(e.target.value);
                              updateThreatCoverageData(
                                  row?.id,
                                  type,
                                  "product_state",
                                  e.target.value,
                                  row,
                                  setData
                              );
                          }}
                          // setSelectedOption={setDomain}
                          selectedOption={supportingProductStackValue}
                      />
                  </span>
              </div>
          </div>
      </>
  );
};

export default ThreatCoverageTableRow;
