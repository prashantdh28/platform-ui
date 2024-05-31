import React, { memo, useState } from "react";
import Threat from "../../Assests/SVG/ThreatActor.svg";
import Accordion from "../Accordion/Accordion";
import { useSelector } from "react-redux";
import { BiCalendar, BiCurrentLocation, BiLocationPlus } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import InputChips from "../Chips/InputChips/InputChips";
import ButtonChips from "../Chips/ButtonChips/ButtonChips";
import TagPupUp from "../PopUp/TagPupUp";
import PopUp from "../PopUp/PopUp";
import "./ProfileCardThread.css";
import moment from "moment";
import {
  addTag,
  deleteTag,
  getTagsById,
} from "../../Services/Actors/actors.service";
import useToastify from "../../Hooks/useToastify";
import CustomMarkdownTag from "../Markdown/CustomMarkDown";

const ProfileCardThread = ({ SingleActorData }) => {
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

  const [tagsData, setTagsData] = useState(SingleActorData?.tags);

  const { showToast } = useToastify();

  const onAddTag = async (tagName) => {
    if (tagName) {
      const response = await addTag({
        entity_type: SingleActorData?.type,
        entity_id: SingleActorData?.id,
        name: tagName,
      });
      if (response === "OK") {
        const response = await getTagsById(SingleActorData?.id);
        setTagsData(response);
        showToast("Tag added successfully", { type: "success" });
      }
    }
  };

  const onDeleteTag = async (tagName) => {
    if (tagName) {
      const response = await deleteTag({
        entity_type: SingleActorData?.type,
        entity_id: SingleActorData?.id,
        name: tagName,
      });
      if (response === "OK") {
        const response = await getTagsById(SingleActorData?.id);
        setTagsData(response);
        showToast("Tag Deleted successfully", { type: "success" });
      }
    }
  };

  return (
    <>
      <div className="thread-card-main">
        <div className="thread-card">
          <div className="card-container-thread">
            <div
              style={{
                display: "flex",
                padding: "1% 2%",
                gap: "25px",
                flexDirection: "row",
              }}
            >
              <div className="profileImg">
                {SingleActorData?.image_id !== "" || (
                  <img
                    src={SingleActorData?.image_id}
                    className="img-actor"
                    alt=""
                  />
                )}
                {SingleActorData?.image_id !== "" && (
                  <img src={Threat} className="img-actor" alt="" />
                )}
              </div>

              <div className="nameInfo">
                <h2 id="name">{SingleActorData?.name}</h2>
                <CustomMarkdownTag readMoreChars={650} customClassNames= "profileCard-thread-desc" content={SingleActorData.description || "" }/>
                {/*} <Markdown
                  className="profileCard-thread-desc"
                  style={{
                    color:
                      BackgroundColor === ColorOptions.YELLOW
                        ? TextColor.BLACK
                        : BackgroundColor,
                  }}
                >
             {expandedDescription
                    ? SingleActorData?.description
                    : SingleActorData?.description?.slice(0, 1000)}
                    </Markdown> */}
              </div>
            </div>
            <div className="bottom-options">
              <div className="thread-detail">
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
                      {" "}
                      {moment(SingleActorData?.created).format("DD-MMMM-YYYY")}
                    </span>
                  </div>
                  <div
                    style={{
                      paddingTop: "23px",
                      gap: "5px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "14rem",
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
                      {" "}
                      {/* {SingleActorData &&
                      SingleActorData.located_at &&
                      SingleActorData.located_at[0]
                        ? SingleActorData.located_at[0].region !== null
                          ? SingleActorData.located_at[0].region
                          : SingleActorData.located_at[0].country !== null
                          ? SingleActorData.located_at[0].country
                          : "Unknown"
                        : "Unknown"} */}
                      {SingleActorData.located_at &&
                      SingleActorData.located_at !== null
                        ? SingleActorData.located_at.map((each, index) => {
                            const isLastItem =
                              index === SingleActorData.located_at.length - 1;
                            return each !== null
                              ? `${each?.region}${isLastItem ? "" : ","}`
                              : "unknown";
                          })
                        : "unknown"}
                    </span>
                  </div>{" "}
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
                      {" "}
                      {moment(SingleActorData.last_modified).format(
                        "DD-MMMM-YYYY "
                      )}
                    </span>
                  </div>{" "}
                  <div
                    style={{
                      paddingTop: "23px",
                      gap: "5px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "14rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <BiCurrentLocation
                      style={{
                        color: BackgroundColor,
                        fontSize: "1.2em",
                      }}
                    />
                    <span className="spanName">Target Region : </span>
                    <span className="inner-text-color">
                      {" "}
                      {SingleActorData.targets &&
                      SingleActorData.targets !== null
                        ? SingleActorData.targets.map((each, index) => {
                            const isLastItem =
                              index === SingleActorData.targets.length - 1;
                            return each !== null
                              ? `${each?.region}${isLastItem ? "" : ","}`
                              : "unknown";
                          })
                        : "unknown"}
                    </span>
                  </div>
                </div>
              </div>

              {/* TTPS */}
              <div
                style={{
                  width: "48%",
                  display: "grid",
                  alignContent: "center",
                  gap: "25px",
                  padding: "2% 0% 0% 1%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "25px",
                    alignItems: "center",
                  }}
                >
                  <span className="tags">Tags</span>
                  <div
                    className="e-info"
                    style={{
                      flexWrap: "wrap",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {tagsData &&
                      tagsData?.length > 0 &&
                      tagsData?.slice(0, 3).map((tag, tagIndex) => {
                        return (
                          <ButtonChips
                            key={tagIndex}
                            name={tag?.name ? tag?.name : ""}
                          />
                        );
                      })}
                    <TagPupUp
                      tags={tagsData}
                      isAddable
                      onAdd={onAddTag}
                      onDelete={onDeleteTag}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "30px",
                  }}
                >
                  <span className="tags">TTP </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {SingleActorData?.techniques &&
                      SingleActorData?.techniques?.length > 0 &&
                      SingleActorData?.techniques
                        ?.slice(0, 2)
                        .map((TTP, TTPIndex) => {
                          if (TTP) {
                            return (
                              <ButtonChips
                                key={TTPIndex}
                                name={TTP?.name ? TTP?.name : ""}
                              />
                            );
                          } else {
                            return "";
                          }
                        })}

                    {SingleActorData?.techniques &&
                      SingleActorData?.techniques?.length > 0 &&
                      SingleActorData?.techniques?.length > 2 && (
                        <PopUp
                          headName="TTP"
                          name={`+ ${SingleActorData?.techniques?.length - 2}`}
                          buttonStyle={{
                            border: "1px solid rgba(28, 28, 28, 0.1)",
                            borderRadius: "4px",
                          }}
                        >
                          <InputChips
                            chipsData={SingleActorData?.techniques}
                            deleteEnable={false}
                          />
                        </PopUp>
                      )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "5px",
                  }}
                >
                  <span className="tags">Alliases</span>
                  <div
                    style={{
                      display: " inline-flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {SingleActorData?.aliases &&
                      SingleActorData?.aliases?.length > 0 &&
                      SingleActorData?.aliases
                        ?.slice(0, 3)
                        .map((aliase, aliasIndex) => {
                          if (aliase) {
                            return (
                              <ButtonChips
                                key={aliasIndex}
                                name={aliase?.name ? aliase?.name : ""}
                              />
                            );
                          } else {
                            return "";
                          }
                        })}

                    {SingleActorData?.aliases &&
                      SingleActorData?.aliases?.length > 0 &&
                      SingleActorData?.aliases?.length > 3 && (
                        <PopUp
                          headName="Alliases"
                          name={`+ ${SingleActorData?.aliases?.length - 3}`}
                          buttonStyle={{
                            border: "1px solid rgba(28, 28, 28, 0.1)",
                            borderRadius: "4px",
                          }}
                        >
                          <InputChips
                            chipsData={SingleActorData?.aliases}
                            deleteEnable={false}
                          />
                        </PopUp>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Accordion SingleActorData={SingleActorData} />
        </div>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
};

export default memo(ProfileCardThread);
