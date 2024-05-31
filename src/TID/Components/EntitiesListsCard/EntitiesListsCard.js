import moment from "moment/moment";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCalendar, BiCurrentLocation, BiLocationPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// import Threat from "../../../Assests/SVG/ThreatActor.svg";
import { Tooltip } from "@mui/material";
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Threat } from "../../../Assests/SVG/ThreatActor.svg";
import ButtonChips from "../../../Components/Chips/ButtonChips/ButtonChips";
import InputChips from "../../../Components/Chips/InputChips/InputChips";
import CustomMarkdownTag from "../../../Components/Markdown/CustomMarkDown";
import PopUp from "../../../Components/PopUp/PopUp";
import TagPupUp from "../../../Components/PopUp/TagPupUp";
import useToastify from "../../../Hooks/useToastify";
import { setEntityIDs, setFilterObject } from "../../../redux/Slice/TID/EntitySlice";
// import { getAllTIDEntity } from "../../../Services/TID/tid.service";
import { ReactComponent as CampaignImage } from "../../../Assests/SVG/Campaign.svg";
import { ReactComponent as IntrusionImage } from "../../../Assests/SVG/IntrusionSet.svg";
import { ReactComponent as MalwareImage } from "../../../Assests/SVG/Malware.svg";
import { ReactComponent as ReportImage } from "../../../Assests/SVG/ReportIcon.svg";
import { ReactComponent as ToolImage } from "../../../Assests/SVG/Tool.svg";
import { getTagsbyEntityId, onEntityTagAdd, onEntityTagDelete } from "../../../Services/TID/tid.service";
import "./EntitiesListsCard.css";

const EntitiesListsCard = ({ entity, entityIDs, selectedTTPs, selectedTTpsName }) => {
    const dispatch = useDispatch();

    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    const { filterObject } = useSelector((state) => state.TIDEntity);

    const navigate = useNavigate();
    const { showToast } = useToastify();

    const [tagsData, setTagsData] = useState(entity?.tags);

    const onTagAdd = useCallback(
        async (tagName) => {
            if (tagName) {
                const response = await dispatch(
                    onEntityTagAdd({
                        requestObject: { entity_type: entity?.type, entity_id: entity?.id, name: tagName },
                    })
                ).unwrap();
                if (response === "OK") {
                    const response = await dispatch(getTagsbyEntityId(entity?.id)).unwrap();
                    setTagsData(response);
                    showToast("Tag added successfully", { type: "success" });
                }
            }
        },
        [showToast, dispatch, entity]
    );

    const onDeleteTag = useCallback(
        async (tagName) => {
            if (tagName) {
                const response = await dispatch(
                    onEntityTagDelete({
                        requestObject: { entity_type: entity?.type, entity_id: entity?.id, name: tagName },
                    })
                ).unwrap();
                if (response === "OK") {
                    const response = await dispatch(getTagsbyEntityId(entity?.id)).unwrap();
                    // dispatch(updateActorData({ id: actorId, tags: response }));

                    setTagsData(response);
                    showToast("Tag Deleted successfully", { type: "success" });
                }
            }
        },
        [showToast, dispatch, entity]
    );

    const onTTPClick = async (name, ___, value) => {
        let filteredTtps = [];
        let filteredData = [];
        if (selectedTTPs.includes(value)) {
            filteredTtps = await selectedTTPs.filter((item) => item !== value);
        } else {
            filteredTtps = await [...selectedTTPs, value];
        }
        const index = selectedTTpsName.findIndex((item) => item === value + "-" + name);
        if (index !== -1) {
            // If it exists, remove it
            filteredData = selectedTTpsName.filter((_, i) => i !== index);
        } else {
            // If it doesn't exist, add it
            filteredData = [...selectedTTpsName, value + "-" + name];
        }

        dispatch(
            setFilterObject({
                ...filterObject,
                selectedTTps: [...filteredTtps],
                selectedTTpsName: [...filteredData],
                page: 0,
            })
        );
    };

    useEffect(() => {
        setTagsData(entity?.tags);
    }, [entity?.tags]);

    return (
        <>
            <div className="Container">
                <div className="cardContent">
                    <div className="leftContainer">
                        <div style={{ padding: "0.9rem 2rem" }}>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "1rem",
                                    alignItems: "center",
                                }}
                            >
                                {entity.aliases &&
                                    entity.aliases.length > 0 &&
                                    entity?.aliases?.slice(0, 3)?.map((alias, aliasIndex) => {
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

                                {entity.aliases && entity.aliases.length > 3 && (
                                    <PopUp
                                        headName="Alliases"
                                        name={`+ ${entity.aliases.length - 3}`}
                                        buttonStyle={{
                                            border: "1px solid rgba(28, 28, 28, 0.1)",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        <InputChips chipsData={entity.aliases} deleteEnable={false} />
                                    </PopUp>
                                )}
                            </div>
                        </div>
                        <div className="TID-checkicon-gap">
                            <div className="checkIcon">
                                <span>
                                    <input
                                        type="checkbox"
                                        className="checkbox-Entitieslists"
                                        style={{
                                            backgroundColor: BackgroundColor,
                                        }}
                                        checked={entityIDs.some((obj) => obj?.id === entity?.id)}
                                        onChange={(e) => {
                                            const entityId = entity?.id;
                                            const isChecked = e.target.checked;

                                            if (isChecked) {
                                                if (entityIDs.length < 5) {
                                                    dispatch(
                                                        setEntityIDs([
                                                            ...entityIDs,
                                                            { id: entityId, name: entity?.name },
                                                        ])
                                                    );
                                                } else {
                                                    // Show toast message if more than 5 checkboxes are selected
                                                    showToast("Cannot select more than 5 Entities", {
                                                        type: "error",
                                                    });
                                                }
                                            } else {
                                                // If checkbox is unchecked, remove from selectedCheckboxes
                                                const updatedEntityIDs = entityIDs.filter(
                                                    (item) => item?.id !== entityId
                                                );
                                                dispatch(setEntityIDs(updatedEntityIDs));
                                            }
                                        }}
                                    />
                                </span>
                            </div>
                            <div className="profileCardImg">
                                <span className="profileCardImg">
                                    {entity.type === "tool" ? (
                                        <ToolImage className="profile-img-card" />
                                    ) : entity.type === "campaign" ? (
                                        <CampaignImage className="profile-img-card" />
                                    ) : entity.type === "malware" ? (
                                        <MalwareImage className="profile-img-card" />
                                    ) : entity.type === "intrusion-set" ? (
                                        <IntrusionImage className="profile-img-card" />
                                    ) : entity.type === "report" ? (
                                        <ReportImage className="profile-img-card" />
                                    ) : (
                                        <Threat className="profile-img-card profileCardImg" />
                                    )}
                                </span>
                            </div>
                            <div className="nameInfo">
                                <span
                                    className="TID-ProfileCard-name"
                                    onClick={() => {
                                        navigate(`/tid/${entity?.id}`);
                                    }}
                                >
                                    {entity?.name}
                                </span>
                                <CustomMarkdownTag
                                    readMoreChars={200}
                                    customClassNames="profileCard-desc"
                                    content={entity.description}
                                />
                            </div>
                        </div>
                        <div className="detail">
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
                                        {/*---------------> {entity.publishedDate}<------------------ */}
                                        {moment(entity.created).format("DD-MMMM-YYYY ")}
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

                                    <span className="inner-text-color">{entity.locatedAt}</span>
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
                                        {moment(entity.last_modified).format("DD-MMMM-YYYY ")}
                                    </span>
                                    {/* <span className="inner-text-color">
                      {moment(lastModified).format("DD MMMM ")}
                    </span> */}
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
                                        {entity.locatedAt}
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
                                <TagPupUp onAdd={onTagAdd} onDelete={onDeleteTag} tags={tagsData} isAddable />
                            </div>
                        </div>

                        <div className="Entities-Card-TTP">
                            <span className="tags">TTPS</span>
                            <div className="Entities-Card-tags">
                                {entity.techniques &&
                                    entity.techniques.length > 0 &&
                                    entity?.techniques?.slice(0, 3)?.map((TTP, TTPIndex) => {
                                        if (TTP) {
                                            const TTPName = TTP
                                                ? `${TTP?.id ? TTP?.id : ""} : ${TTP?.name ? TTP?.name : " "}`
                                                : "NO Data";

                                            return (
                                                <Tooltip
                                                    key={TTPIndex}
                                                    title={
                                                        <CustomMarkdownTag
                                                            content={TTP?.usage
                                                                .map(({ usage }) => usage)
                                                                .join()}
                                                            customClassNames="Tooltipsize"
                                                        />
                                                    }
                                                    placement="bottom"
                                                    //   onClick={() => onTTPClick(TTP?.name, null, TTP?.id)}
                                                >
                                                    <div
                                                        id="Entities-buttonChips-filter-div"
                                                        onClick={() => onTTPClick(TTP?.name, null, TTP?.id)}
                                                    >
                                                        <ButtonChips
                                                            // onClick={() => onTTPClick(TTP?.name, null, TTP?.id)}
                                                            name={TTPName}
                                                            selectedTTPs={selectedTTPs}
                                                            TTP={TTP}
                                                        />
                                                    </div>
                                                </Tooltip>
                                            );
                                        } else {
                                            return "";
                                        }
                                    })}

                                {entity.techniques && entity.techniques.length > 3 && (
                                    <PopUp
                                        headName="TTPS"
                                        name={`+ ${entity.techniques.length - 3}`}
                                        buttonStyle={{
                                            border: "1px solid rgba(28, 28, 28, 0.1)",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        {/* <Tooltip> */}
                                        {/* <InputChips
                       chipsData={entity.techniques && entity.techniques.length > 3 && entity.techniques?.map((TTP) => ({
                        id: TTP.id,
                        name: `${TTP.id} : ${TTP.name}`,
                      }))}
                    
                    //   chipsData={entity.techniques}
                      deleteEnable={false}
                      entity={entity.techniques}
                      onChipSelect={onTTPClick}
                    /> */}
                                        {entity.techniques &&
                                            entity.techniques.length > 0 &&
                                            entity?.techniques?.map((TTP, TTPIndex) => {
                                                if (TTP) {
                                                    const TTPName = TTP
                                                        ? `${TTP?.id ? TTP?.id : ""} : ${
                                                              TTP?.name ? TTP?.name : " "
                                                          }`
                                                        : "NO Data";

                                                    return (
                                                        <Tooltip
                                                            key={TTPIndex}
                                                            title={
                                                                <CustomMarkdownTag
                                                                    content={TTP?.usage
                                                                        .map(({ usage }) => usage)
                                                                        .join()}
                                                                    customClassNames="Tooltipsize"
                                                                />
                                                            }
                                                            placement="bottom"
                                                        >
                                                            <div
                                                                id="Entities-buttonChips-filter-div"
                                                                onClick={() =>
                                                                    onTTPClick(TTP?.name, null, TTP?.id)
                                                                }
                                                            >
                                                                <ButtonChips
                                                                    name={TTPName}
                                                                    selectedTTPs={selectedTTPs}
                                                                    TTP={TTP}
                                                                />
                                                            </div>
                                                        </Tooltip>
                                                    );
                                                } else {
                                                    return "";
                                                }
                                            })}
                                        {/* </Tooltip> */}
                                    </PopUp>
                                )}
                            </div>
                        </div>
                        {/* <div style={{ display: "flex", gap: "1%" }}>
                            <span className="tags">Alliases</span>
                            <div className="Entities-card-Alliases">
                                {entity.aliases &&
                                    entity.aliases.length > 0 &&
                                    entity?.aliases?.slice(0, 3)?.map((alias, aliasIndex) => {
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

                                {entity.aliases && entity.aliases.length > 3 && (
                                    <PopUp
                                        headName="Alliases"
                                        name={`+ ${entity.aliases.length - 3}`}
                                        buttonStyle={{
                                            border: "1px solid rgba(28, 28, 28, 0.1)",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        <InputChips chipsData={entity.aliases} deleteEnable={false} />
                                    </PopUp>
                                )}
                            </div>
                        </div> */}
                    </div>
                    <div className="Entity-edit-icon">
                        <BsPencilSquare
                            id="TID-edit-button"
                            onClick={async (e) => {
                                // if (entity?.id && entity?.id !== "") {
                                //     const response = await dispatch(getTIDEntityByID(entity?.id)).unwrap();
                                //     if (response) {
                                //         await dispatch(setRequestObject(response));
                                //         await dispatch(
                                //             setSelectedEntity({ name: response.type, type: response.type })
                                //         );
                                //     }
                                // }
                                navigate(`/tid/select-threat/update-threat/${entity?.id}`);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EntitiesListsCard;
