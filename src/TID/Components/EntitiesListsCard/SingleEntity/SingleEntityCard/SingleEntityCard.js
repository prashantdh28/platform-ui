import React, { useCallback, useEffect, useState } from "react";
import { BiCurrentLocation, BiCalendar, BiLocationPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import moment from "moment/moment";
import { AiOutlineClockCircle } from "react-icons/ai";
import CustomMarkdownTag from "../../../../../Components/Markdown/CustomMarkDown";
// eslint-disable-next-line
import { Tooltip } from "@mui/material";
import ButtonChips from "../../../../../Components/Chips/ButtonChips/ButtonChips";
import InputChips from "../../../../../Components/Chips/InputChips/InputChips";
import PopUp from "../../../../../Components/PopUp/PopUp";
import TagPopUp from "../../../../../Components/PopUp/TagPupUp";
import { ReactComponent as Threat } from "../../../../../Assests/SVG/ThreatActor.svg";
import { ReactComponent as ToolImage } from "../../../../../Assests/SVG/Tool.svg";
import { ReactComponent as CampaignImage } from "../../../../../Assests/SVG/Campaign.svg";
import { ReactComponent as MalwareImage } from "../../../../../Assests/SVG/Malware.svg";
import { ReactComponent as ReportImage } from "../../../../../Assests/SVG/ReportIcon.svg";
import { ReactComponent as IntrusionImage } from "../../../../../Assests/SVG/IntrusionSet.svg";
import "./SingleEntityCard.css";
import useToastify from "../../../../../Hooks/useToastify";
import {
    getTagsbyEntityId,
    onEntityTagAdd,
    onEntityTagDelete,
} from "../../../../../Services/TID/tid.service";

const SingleEntityCard = ({ entityID }) => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const { showToast } = useToastify();

    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    const [tagsData, setTagsData] = useState(entityID?.tags);

    const onTagAdd = useCallback(
        async (tagName) => {
            if (tagName) {
                const response = await dispatch(
                    onEntityTagAdd({
                        requestObject: {
                            entity_type: entityID?.type,
                            entity_id: entityID?.id,
                            name: tagName,
                        },
                    })
                ).unwrap();
                if (response === "OK") {
                    const response = await dispatch(getTagsbyEntityId(entityID?.id)).unwrap();
                    setTagsData(response);
                    showToast("Tag added successfully", { type: "success" });
                }
            }
        },
        [showToast, dispatch, entityID]
    );

    const onDeleteTag = useCallback(
        async (tagName) => {
            if (tagName) {
                const response = await dispatch(
                    onEntityTagDelete({
                        requestObject: {
                            entity_type: entityID?.type,
                            entity_id: entityID?.id,
                            name: tagName,
                        },
                    })
                ).unwrap();
                if (response === "OK") {
                    const response = await dispatch(getTagsbyEntityId(entityID?.id)).unwrap();
                    // dispatch(updateActorData({ id: actorId, tags: response }));

                    setTagsData(response);
                    showToast("Tag Deleted successfully", { type: "success" });
                }
            }
        },
        [showToast, dispatch, entityID]
    );

    useEffect(() => {
        setTagsData(entityID?.tags);
    }, [entityID?.tags]);

    return (
        <>
            <div className="Parent-single-EntityScreen">
                <div className="cardContent">
                    <div className="leftContainer">
                        <div style={{ paddingBottom: "15px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "1rem",
                                    alignItems: "center",
                                }}
                            >
                                {entityID?.aliases &&
                                    entityID?.aliases.length > 0 &&
                                    entityID?.aliases?.slice(0, 3)?.map((alias, aliasIndex) => {
                                        if (alias) {
                                            return (
                                                <div
                                                    className="TID-allieses"
                                                    key={aliasIndex}
                                                    style={{
                                                        border: "1px solid",
                                                        borderColor: BackgroundColor,
                                                        color: "var(--name-email)",
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {alias?.name ? alias?.name : ""}
                                                </div>
                                            );
                                        } else {
                                            return "";
                                        }
                                    })}

                                {entityID?.aliases && entityID?.aliases.length > 3 && (
                                    <PopUp
                                        headName="Alliases"
                                        name={`+ ${entityID?.aliases.length - 3}`}
                                        buttonStyle={{
                                            border: "1px solid rgba(28, 28, 28, 0.1)",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        <InputChips chipsData={entityID?.aliases} deleteEnable={false} />
                                    </PopUp>
                                )}
                            </div>
                        </div>

                        <div id="Entity-img-info">
                            <div className="profileCardImg">
                                {entityID.type === "tool" ? (
                                    <ToolImage className="profile-img-card" />
                                ) : entityID.type === "campaign" ? (
                                    <CampaignImage className="profile-img-card" />
                                ) : entityID.type === "malware" ? (
                                    <MalwareImage className="profile-img-card" />
                                ) : entityID.type === "intrusion-set" ? (
                                    <IntrusionImage className="profile-img-card" />
                                ) : entityID.type === "report" ? (
                                    <ReportImage className="profile-img-card" />
                                ) : (
                                    <Threat className="profile-img-card profileCardImg" />
                                )}
                                {/* <img src={Threat} className="profileCardImg" alt="" /> */}
                            </div>
                            <div className="nameInfo">
                                <span className="TID-ProfileCard-name">{entityID?.name}</span>
                                <CustomMarkdownTag
                                    readMoreChars={420}
                                    customClassNames="Single-ProfileCard-desc"
                                    content={entityID?.description}
                                />
                            </div>
                        </div>
                        <div className="Single-Entity-details">
                            <div>
                                <div className="Entities-card-calendar">
                                    <BiCalendar
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />

                                    <span className="spanName">Published : </span>
                                    <span className="inner-text-color">
                                        {" "}
                                        {/*---------------> {entity.publishedDate}<------------------ */}
                                        {entityID.created
                                            ? moment(entityID.created).format("DD-MMMM-YYYY ")
                                            : ""}
                                    </span>
                                </div>
                                <div className="Entities-card-location" style={{}}>
                                    <BiLocationPlus
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                    <span className="spanName">Source Region : </span>
                                    <span className="inner-text-color">
                                        {entityID?.located_at && typeof entityID?.located_at === String
                                            ? entityID?.located_at
                                            : entityID?.located_at && entityID?.located_at.length > 0
                                            ? entityID?.located_at.map((item) => item?.country)
                                            : ""}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="Entities-card-clock">
                                    <AiOutlineClockCircle
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                    <span className="spanName">Last Activity : </span>
                                    <span className="inner-text-color">
                                        {" "}
                                        {moment(entityID?.last_modified).format("DD-MMMM-YYYY ")}
                                    </span>
                                </div>{" "}
                                <div className="Entities-card-currentLocation">
                                    <BiCurrentLocation
                                        style={{
                                            color: BackgroundColor,
                                            fontSize: "1.2em",
                                        }}
                                    />
                                    <span className="spanName">Target Region: </span>
                                    <span className="inner-text-color">
                                        {/* {targets && targets[0]
                        ? targets[0].region !== null
                          ? targets[0].region
                          : targets[0].country !== null
                          ? targets[0].country
                          : "Unknown"
                        : "Unknown"} */}
                                        {entityID?.targets && typeof entityID?.targets === String
                                            ? entityID?.targets
                                            : entityID?.targets && entityID?.targets.length > 0
                                            ? entityID?.targets.map((item) => item?.country)
                                            : ""}
                                        {/* {entityID?.targets} */}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="Entities-Card-Section-2">
                        <div className="Entities-Card-Tags-Parent">
                            <span className="tags">Tags</span>
                            <div
                                // cssClass="e-info"
                                className="entities-card-tags"
                            >
                                {tagsData &&
                                    tagsData.length > 0 &&
                                    tagsData?.slice(0, 3)?.map((tag, entityIndex) => {
                                        return (
                                            <ButtonChips
                                                key={entityIndex}
                                                name={tag?.name ? tag?.name : ""}
                                            />
                                        );
                                    })}
                                <TagPopUp
                                    key={entityID}
                                    onDelete={onDeleteTag}
                                    onAdd={onTagAdd}
                                    tags={tagsData}
                                    isAddable
                                />
                            </div>
                        </div>

                        <div className="Entities-Card-TTP">
                            <span className="tags">TTPS</span>
                            <div className="Entities-Card-tags">
                                {entityID.techniques &&
                                    entityID.techniques.length > 0 &&
                                    entityID?.techniques?.slice(0, 3)?.map((TTP, TTPIndex) => {
                                        if (TTP) {
                                            const TTPName = TTP
                                                ? `${TTP?.id ? TTP?.id : ""} : ${TTP?.name ? TTP?.name : " "}`
                                                : "NO Data";

                                            return (
                                                <Tooltip
                                                    key={TTPIndex}
                                                    title={
                                                        <CustomMarkdownTag
                                                            content={TTP?.usage}
                                                            customClassNames="Tooltipsize"
                                                        />
                                                    }
                                                    placement="bottom"
                                                >
                                                    <React.Fragment>
                                                        <ButtonChips name={TTPName} />
                                                    </React.Fragment>
                                                </Tooltip>
                                            );
                                        } else {
                                            return "";
                                        }
                                    })}

                                {entityID.techniques && entityID.techniques.length > 3 && (
                                    <PopUp
                                        headName="TTPS"
                                        name={`+ ${entityID.techniques.length - 3}`}
                                        buttonStyle={{
                                            border: "1px solid rgba(28, 28, 28, 0.1)",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        {entityID.techniques && entityID.techniques.length > 0 && (
                                            <Tooltip>
                                                <React.Fragment>
                                                    {entityID.techniques.map((TTP, TTPIndex) => (
                                                        <ButtonChips
                                                            key={TTPIndex}
                                                            name={
                                                                TTP
                                                                    ? `${TTP?.id ? TTP?.id : ""} : ${
                                                                          TTP?.name ? TTP?.name : " "
                                                                      }`
                                                                    : "NO Data"
                                                            }
                                                        />
                                                    ))}
                                                </React.Fragment>
                                            </Tooltip>
                                        )}
                                    </PopUp>
                                )}
                            </div>
                        </div>
                        {/* <div style={{ display: "flex", gap: "1%" }}>
              <span className="tags">Alliases</span>
              <div className="Entities-card-Alliases">
                {entityID.aliases &&
                  entityID.aliases.length > 0 &&
                  entityID?.aliases?.slice(0, 3)?.map((alias, aliasIndex) => {
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

                {entityID.aliases && entityID.aliases.length > 3 && (
                  <PopUp
                    headName="Alliases"
                    name={`+ ${entityID.aliases.length - 3}`}
                    buttonStyle={{
                      border: "1px solid rgba(28, 28, 28, 0.1)",
                      borderRadius: "4px",
                    }}
                  >
                    <InputChips
                      chipsData={entityID.aliases}
                      deleteEnable={false}
                    />
                  </PopUp>
                )}
              </div>
            </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleEntityCard;
