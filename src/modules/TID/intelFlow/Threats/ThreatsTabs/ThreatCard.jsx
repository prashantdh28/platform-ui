import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MyLocationTwoToneIcon from "@mui/icons-material/MyLocationTwoTone";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useToastify from "../../../../../Hooks/useToastify";
import RenderChips from "../../../../../Components/Common/RenderChips";
import { renderIcon } from "../../../../../helper/IconRenderer";
import CustomMarkdownTag from "../../../../../Components/Markdown/CustomMarkDown";
import {
  setEntityIDs,
  setFilterObject,
} from "../../../../../redux/Slice/TID/EntitySlice";
import AddTagPopover from "../../../../../Components/PopUp/AddTagPopover";
import RenderCountries from "../../../../../Components/Common/RenderCountries";
import moment from "moment/moment";
import {
  getAllTIDEntity,
  trackEntity,
} from "../../../../../Services/TID/tid.service";
import CustomTooltip from "../../../../../Components/Custom/CustomTooltip";

const ThreatCard = ({
  threatData,
  selectedEntityIds,
  tabType,
  isSelected,
  hideCheckBoxDiv,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToastify();
  const { filterObject } = useSelector((state) => state.TIDEntity);

  const [tagsData, setTagsData] = useState(threatData?.tags);
  const [isEntityTracked, setIsEntityTracked] = useState(
    threatData?.is_tracked || tabType === "track"
  );
  const handleClickEntity = (id) => {
    if (!hideCheckBoxDiv) {
      navigate(`${id}`);
    }
  };
  const onTrackClick = async () => {
    const response = await dispatch(
      trackEntity({ entityId: threatData?.id, track: !isEntityTracked })
    ).unwrap();
    if (response) {
      if (!isEntityTracked) {
          showToast("The entity has been successfully tracked.", {
              type: "success",
          });
      } else {
          showToast("The entity has been successfully untracked.", {
              type: "success",
          });
      }
      setIsEntityTracked(!isEntityTracked);
      if (tabType === "track") {
        dispatch(getAllTIDEntity({ type: tabType, page: 0 }));
      }
    }
  };

  const onTechniqueClick = async (data) => {
    const chipData = JSON.parse(JSON.stringify(data));
    let filteredTtps =
      filterObject?.selectedTTps && filterObject?.selectedTTps.length > 0
        ? [...filterObject?.selectedTTps]
        : [];
    let selectedTTPIndex =
      filterObject?.selectedTTps && filterObject?.selectedTTps.length > 0
        ? filterObject?.selectedTTps.findIndex(
            (item) => item?.id === chipData?.id
          )
        : -1;
    if (selectedTTPIndex !== -1) {
      filteredTtps = filterObject?.selectedTTps.filter(
        (item) => item?.id !== chipData?.id
      );
    } else {
      filteredTtps.push({ name: chipData?.name, id: chipData?.id });
    }
    dispatch(
      setFilterObject({
        ...filterObject,
        selectedTTps: [...filteredTtps],
        page: 0,
      })
    );
  };

  return (
      <div
          className={`tid-threat-card-main ${isSelected ? "tid-card-selected" : ""}`}
          style={{ marginTop: `${hideCheckBoxDiv ? 0 : "2rem"}` }}
      >
          <div className="tid-threat-card-title-section">
              <div className="title-head-section">
                  <div className="title-head-chips-container">
                      {Array.isArray(threatData?.aliases) && threatData?.aliases.length > 0 ? (
                          <>
                              <RenderChips title="Aliases" chipsData={threatData?.aliases} length={3} />
                          </>
                      ) : (
                          ""
                      )}
                  </div>
                  <div className="title-main-head">
                      <span className="title-icon">{renderIcon(threatData?.type)}</span>
                      <div className="title-main-text">
                          <span
                              className="title-text"
                              onClick={() => handleClickEntity(threatData?.id)}
                              style={{ cursor: hideCheckBoxDiv ? "" : "pointer" }}
                          >
                              {!hideCheckBoxDiv ? (
                                  <CustomTooltip title="You can click & see in detail-view">
                                      {threatData?.name}
                                  </CustomTooltip>
                              ) : (
                                  <span> {threatData?.name}</span>
                              )}
                          </span>
                          <span className="title-description" style={{ color: "" }}>
                              <CustomMarkdownTag content={threatData?.description} readMoreChars={500} />
                          </span>
                      </div>
                  </div>
              </div>
              <div className="title-main-section">
                  {hideCheckBoxDiv ? (
                      <div></div>
                  ) : (
                      <div className="title-head-action-container">
                          <ButtonGroup
                              variant="outlined"
                              className="group-button"
                              aria-label="Basic button group"
                          >
                              <CustomTooltip
                                  title={`${
                                      isEntityTracked
                                          ? "Click to de-activate tracking"
                                          : "Click to activate tracking"
                                  }`}
                              >
                                  <Button onClick={onTrackClick}>
                                      <VisibilityOutlinedIcon
                                          sx={{
                                              fill: `${isEntityTracked ? "#10B978" : ""}!important`,
                                          }}
                                      />
                                  </Button>
                              </CustomTooltip>
                              <Button
                                  onClick={() => {
                                      navigate(`create-threat/${threatData?.id}`);
                                  }}
                              >
                                  <BorderColorOutlinedIcon
                                      sx={{
                                          fill: "#0082F9 !important",
                                      }}
                                  />
                              </Button>
                          </ButtonGroup>
                          <Checkbox
                              className={`${isSelected ? "card-checkbox-selected" : "card-checkbox"}`}
                              checked={isSelected}
                              onChange={(e) => {
                                  const entityId = threatData?.id;
                                  const isChecked = e.target.checked;
                                  if (isChecked) {
                                      if (selectedEntityIds.length < 5) {
                                          dispatch(
                                              setEntityIDs([
                                                  ...selectedEntityIds,
                                                  { id: entityId, name: threatData?.name },
                                              ])
                                          );
                                      } else {
                                          showToast("You cannot select more than 5 entities.", {
                                              type: "error",
                                          });
                                      }
                                  } else {
                                      const updatedEntityIDs = selectedEntityIds.filter(
                                          (item) => item?.id !== entityId
                                      );
                                      dispatch(setEntityIDs(updatedEntityIDs));
                                  }
                              }}
                          />
                      </div>
                  )}
                  <div className="title-main-left-side">
                      <div className="title-left-side-element">
                          <AccessTimeOutlinedIcon />
                          Last Seen:{" "}
                          <span>
                              {threatData?.last_seen
                                  ? moment(threatData?.last_seen).format("DD-MM-YYYY")
                                  : ""}
                          </span>
                      </div>
                      <div className="title-left-side-element">
                          <AccessTimeOutlinedIcon />
                          First Seen:{" "}
                          <span>
                              {threatData?.first_seen
                                  ? moment(threatData?.first_seen).format("DD-MM-YYYY")
                                  : ""}
                          </span>
                      </div>
                  </div>
              </div>
          </div>
          <div className="tid-threat-card-bottom-section">
              <div className="tid-threat-card-section">
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <span className="section-title">Techniques</span>
                      {Array.isArray(threatData?.techniques) && threatData.techniques.length > 0 ? (
                          <div
                              style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexWrap: "wrap",
                              }}
                          >
                              <RenderChips
                                  title="Techniques"
                                  chipsData={
                                      threatData?.techniques && threatData?.techniques.length > 0
                                          ? threatData.techniques.map((chip) => {
                                                let isSelected =
                                                    filterObject?.selectedTTps &&
                                                    filterObject?.selectedTTps.length > 0
                                                        ? filterObject?.selectedTTps.findIndex(
                                                              (selectedChip) => selectedChip?.id === chip?.id
                                                          )
                                                        : -1;
                                                return {
                                                    ...chip,
                                                    isSelected: isSelected !== -1 ? true : false,
                                                };
                                            })
                                          : []
                                  }
                                  length={3}
                                  onTechniqueClick={onTechniqueClick}
                              />
                          </div>
                      ) : (
                          ""
                      )}
                  </div>
                  <Divider orientation="vertical" sx={{ height: "100%", background: "#1E2B40" }} />
              </div>
              <div className="tid-threat-card-section section-tags">
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <span className="section-title">Tags</span>
                      <div
                          style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                          }}
                      >
                          {/* {Array.isArray(tagsData) && tagsData.length > 0 ? (
                                <RenderChips title="Techniques" chipsData={tagsData} length={3} />
                            ) : (
                                // tagsData.slice(0, 3).map((item, index) => {
                                //       return <CustomChip key={index} data={{ label: item?.name }} />;
                                //   }

                                //   )
                                ""
                            )} */}
                          <AddTagPopover
                              setChipsData={setTagsData}
                              title="Tags"
                              threatData={threatData}
                              chipsData={tagsData}
                          />
                      </div>
                  </div>
                  <Divider orientation="vertical" sx={{ height: "100%", background: "#1E2B40" }} />
              </div>
              <div className="tid-threat-card-section section-region">
                  <div className="section-region-element">
                      <div className="section-region-element-header">
                          <LocationOnOutlinedIcon />
                          Source Region:
                      </div>
                      <div className="section-region-element-coutries">
                          {threatData?.located_at && threatData?.located_at.length > 0 ? (
                              <RenderCountries countries={threatData?.located_at} />
                          ) : (
                              ""
                          )}
                      </div>
                  </div>
                  <div className="section-region-element">
                      <div className="section-region-element-header">
                          <MyLocationTwoToneIcon />
                          Target Region:
                      </div>
                      <div className="section-region-element-coutries">
                          {threatData?.targets && threatData?.targets.length > 0 ? (
                              <RenderCountries countries={threatData?.targets} />
                          ) : (
                              ""
                          )}
                      </div>
                  </div>

                  {/* <span className="section-title">Techniques</span> */}
              </div>
          </div>
      </div>
  );
};

export default ThreatCard;
