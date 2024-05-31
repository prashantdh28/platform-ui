import React, { memo, useCallback, useEffect, useState } from "react";
import "./profilecard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { BiCalendar, BiCurrentLocation, BiLocationPlus } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import Threat from "../../Assests/SVG/ThreatActor.svg";
import PopUp from "../PopUp/PopUp";
import InputChips from "../Chips/InputChips/InputChips";
import ButtonChips from "../Chips/ButtonChips/ButtonChips";
import TagPupUp from "../PopUp/TagPupUp";
import {
  addTag,
  deleteTag,
  getTagsById,
} from "../../Services/Actors/actors.service";
import useToastify from "../../Hooks/useToastify";
import CustomMarkdownTag from "../Markdown/CustomMarkDown";

function ProfileCard({
  handleCardSelection,
  actorId,
  name,
  description,
  created,
  locatedAt,
  lastModified,
  // tags: tagsData,
  tags,
  targets,
  techniques,
  aliases,
  type,
  actorIds,
}) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [tagsData, setTagsData] = useState(tags);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const { showToast } = useToastify();

  useEffect(() => {
    setTagsData(tags);
  }, [tags]);

  const handleActorClick = (id) => {
    const encryptedID = id;
    navigate(`singlecard/${encryptedID}`);
  };

  const onAddTag = useCallback(
    async (tagName) => {
      if (tagName) {
        const response = await addTag({
          entity_type: type,
          entity_id: actorId,
          name: tagName,
        });
        if (response === "OK") {
          const response = await getTagsById(actorId);
          setTagsData(response);
          // dispatch(updateActorData({ id: actorId, tags: response }));
          showToast("Tag added successfully", { type: "success" });
        }
      }
    },
    [actorId, type, showToast]
  );

  const onDeleteTag = useCallback(
    async (tagName) => {
      if (tagName) {
        const response = await deleteTag({
          entity_type: type,
          entity_id: actorId,
          name: tagName,
        });
        if (response === "OK") {
          const response = await getTagsById(actorId);
          // dispatch(updateActorData({ id: actorId, tags: response }));

          setTagsData(response);
          showToast("Tag Deleted successfully", { type: "success" });
        }
      }
    },
    [actorId, type, showToast]
  );

  const onCardSelection = useCallback(
    (e) => {
      e.preventDefault();
      handleCardSelection(e, actorId, name);
    },
    [handleCardSelection, actorId, name]
  );

  return (
    <>
      <div className="Container">
        <div className="cardContent">
          <div className="leftContainer">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div className="checkIcon">
                <span>
                  <input
                    // name="actorField"
                    id={actorId}
                    type="checkbox"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: BackgroundColor,
                      cursor: "pointer",
                      marginRight: "10px",
                      outline: "none",
                      border: "1px solid red",
                    }}
                    checked={actorIds.some((obj) => obj.actorId === actorId)}
                    onChange={onCardSelection}
                  />
                </span>
              </div>
              <div className="profileCardImg">
                {actorId?.image_id !== "" && (
                    <img
                      src={actorId?.image_id}
                      className="profileCardImg"
                      alt=""
                    />
                  ) && <img src={Threat} className="profileCardImg" alt="" />}
              </div>
              <div className="nameInfo">
                <span
                  className="ProfileCard-name"
                  onClick={() => handleActorClick(actorId)}
                >
                  {name}
                </span>

                <CustomMarkdownTag content={description} readMoreChars={200} customClassNames="profileCard-desc"/>
              </div>
            </div>
            <div className="detail">
              <div>
                <div
                  style={{
                    paddingTop: "10px",
                    gap: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <BiCalendar
                    style={{
                      color: BackgroundColor,
                      fontSize: "1.2em",
                    }}
                  />

                  <span className="spanName">Published : </span>

                  <span className="inner-text-color">
                    {moment(created).format("DD-MMMM-YYYY ")}
                  </span>
                </div>
                <div
                  style={{
                    paddingTop: "23px",
                    gap: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "21rem",
                    flexWrap: "wrap",
                  }}
                >
                  <BiLocationPlus
                    style={{
                      color: BackgroundColor,
                      fontSize: "1.2em",
                    }}
                  />
                  <span className="spanName">Source Region : </span>
                  <span className="inner-text-color">
                    {locatedAt && locatedAt !== null
                      ? locatedAt.map((each, index) => {
                          const isLastItem = index === locatedAt.length - 1;
                          return each !== null
                            ? `${each?.region}${isLastItem ? "" : ","}`
                            : "unknown";
                        })
                      : "unknown"}

                    {/* {locatedAt && locatedAt[0]
                      ? locatedAt.region !== null
                        ? locatedAt[0].region
                        : locatedAt[0].country !== null
                        ? locatedAt[0].country
                        : "Unknown"
                      : "Unknown"} */}
                  </span>
                </div>
              </div>
              <div>
                <div
                  style={{
                    paddingTop: "10px",
                    gap: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AiOutlineClockCircle
                    style={{
                      color: BackgroundColor,
                      fontSize: "1.2em",
                    }}
                  />
                  <span className="spanName">Last Activity : </span>
                  <span className="inner-text-color">
                    {moment(lastModified).format("DD-MMMM-YYYY")}
                  </span>
                </div>{" "}
                <div
                  style={{
                    paddingTop: "23px",
                    gap: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "21rem",
                    flexWrap: "wrap",
                  }}
                >
                  <BiCurrentLocation
                    style={{
                      color: BackgroundColor,
                      fontSize: "1.2em",
                    }}
                  />
                  <span className="spanName">Target Region: </span>
                  <span className="inner-text-color">
                    {targets && targets !== null
                      ? targets.map((each, index) => {
                          const isLastItem = index === targets.length - 1;
                          return each !== null
                            ? `${each?.region}${isLastItem ? "" : ","}`
                            : "unknown";
                        })
                      : "unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              padding: "10px",
              display: "grid",
              alignContent: "center",
              gap: "26px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "5%",
              }}
            >
              <span className="tags">Tags</span>
              <div
                // cssClass="e-info"
                style={{
                  gap: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {tagsData &&
                  tagsData.length > 0 &&
                  tagsData.slice(0, 3).map((tag, tagIndex) => {
                    return (
                      <ButtonChips
                        key={tagIndex}
                        name={tag?.name ? tag?.name : ""}
                      />
                    );
                  })}
                <TagPupUp
                  key={actorId}
                  tags={tagsData}
                  onAdd={onAddTag}
                  onDelete={onDeleteTag}
                  isAddable
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "5%" }}>
              <span className="tags">TTP</span>
              <div
                style={{
                  gap: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {techniques &&
                  techniques.length > 0 &&
                  techniques.slice(0, 3).map((TTP, TTPIndex) => {
                    if (TTP) {
                      const TTPName = TTP
                        ? `${TTP?.id ? TTP?.id : ""} : ${
                            TTP?.name ? TTP?.name : " "
                          }`
                        : "";

                      return <ButtonChips key={TTPIndex} name={TTPName} />;
                    } else {
                      return "";
                    }
                  })}

                {techniques && techniques.length > 3 && (
                  <PopUp
                    headName="TTP"
                    name={`+ ${techniques.length - 3}`}
                    buttonStyle={{
                      border: "1px solid rgba(28, 28, 28, 0.1)",
                      borderRadius: "4px",
                    }}
                  >
                    <InputChips chipsData={techniques} deleteEnable={false} />
                  </PopUp>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: "1%" }}>
              <span className="tags">Alliases</span>
              <div
                style={{
                  gap: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {aliases &&
                  aliases.length > 0 &&
                  aliases.slice(0, 3).map((alias, aliasIndex) => {
                    if (alias) {
                      return (
                        <ButtonChips
                          key={aliasIndex}
                          name={alias?.name ? alias?.name : ""}
                        />
                      );
                    } else {
                      return "";
                    }
                  })}

                {aliases && aliases.length > 3 && (
                  <PopUp
                    headName="Alliases"
                    name={`+ ${aliases.length - 3}`}
                    buttonStyle={{
                      border: "1px solid rgba(28, 28, 28, 0.1)",
                      borderRadius: "4px",
                    }}
                  >
                    <InputChips chipsData={aliases} deleteEnable={false} />
                  </PopUp>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ProfileCard);
