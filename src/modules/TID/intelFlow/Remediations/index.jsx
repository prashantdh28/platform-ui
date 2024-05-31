import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneIcon from "@mui/icons-material/Tune";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Box, Button, MenuItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NextIcon } from "../../../../Assests/SVG/addIcon.svg";
import CustomChip from "../../../../Components/Custom/CustomChip";
import CustomPopover from "../../../../Components/Custom/CustomPopover";
import CustomSelect from "../../../../Components/Custom/CustomSelect";
import CutomNumberFiled from "../../../../Components/Custom/CutomNumberFiled";
import BackdropLoader from "../../../../Components/Loader/BackdropLoader";
import { useQuery } from "../../../../Hooks/useQuery";
import useToastify from "../../../../Hooks/useToastify";
import NoDataFound from "../../../../Pages/NoDataFound";
import {
    getThreatCoverageCompactData,
    getThreatCoverageLoading,
} from "../../../../redux/Slice/TID/ThreatCoverageSlice";
import {
    getTCCompactByTypeAndFilter,
    saveThreatCoverage,
} from "../../../../Services/TID/threatCoverage.service";
import "./remediations.css";
import RemediationsCountGraph from "./RemediationsCountGraph";
import RemediationsStateGraph from "./RemediationsStateGraph";
import RemediationsTable from "./RemediationsTable";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
const threatCoverageTypes = {
    controls: "CONTROL",
    defenses: "DEFENSE",
    mitigations: "MITIGATION",
};

const Remediations = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const topRemediationsPopoverRef = useRef(null);

    const [threatCoverageType, setThreatCoverageType] = useState("controls");
    const [sortBy, setSortBy] = useState("PRIORITY");
    const [topRemediationsCount, setTopRemediationsCount] = useState(20);
    const [topRemediationsCountTextField, setTopRemediationsCountTextField] = useState(0);
    // const [textFieldFocused, setTextFieldFocused] = useState(false);
    const [stateGraphData, setStateGraphData] = useState([]);
    const [countGraphData, setCountGraphData] = useState([]);
    const [threatCoverageTableData, setThreatCoverageTableData] = useState([]);
    const [requestObject, setRequestObject] = useState({ ids: [] });
    // const [open, setOpen] = useState(false);
    // const [anchorEl, setAnchorEl] = React.useState(null);

    // const handlePopperClick = (event) => {
    //     setAnchorEl(anchorEl ? null : event.currentTarget);
    // };

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    const threatCoverageCompactData = useSelector(getThreatCoverageCompactData);
    const threatCoverageLoading = useSelector(getThreatCoverageLoading);

    const { threat_score, states, entities } = threatCoverageCompactData;

    const { showToast } = useToastify();

    let query = useQuery().get("type") || "controls";

    const changeThreatCoverageType = async (type) => {
        if (requestObject && Object.keys(requestObject).length >= 2) {
            await saveThreatCoverageData();
        }
        navigate(`/intel-flow/remediations?type=${type}`);
    };

    const getThreatCoverageCompactByTypeAndFilter = useCallback(async () => {
        if (entityIDs && entityIDs.length > 0 && query) {
            const response = await dispatch(
                getTCCompactByTypeAndFilter({
                    selectedIds: entityIDs,
                    type: threatCoverageTypes[query],
                    sortBy: sortBy.toLowerCase(),
                    top: topRemediationsCount === "All" ? "" : topRemediationsCount,
                })
            ).unwrap();
            if (response) {
                const { content, threat_score } = response;
                if (content && Array.isArray(content)) {
                    setThreatCoverageTableData(content);
                }
                setStateGraphData(threat_score[query]);
                setCountGraphData([
                    {
                        value: threat_score?.coverage_score,
                        name: "Average",
                        title: {
                            show: true,
                            offsetCenter: ["0%", "15%"],
                        },
                        detail: {
                            valueAnimation: true,
                            offsetCenter: ["0%", "-20%"],
                        },
                    },
                    {
                        value: threat_score?.control_coverage_score,
                        name: "Controls Coverage Score",
                        title: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                    },
                    {
                        value: threat_score?.defense_coverage_score,
                        name: "Defense Coverage Score",
                        title: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                    },
                    {
                        value: threat_score?.mitigation_coverage_score,
                        name: "Mitigation Coverage Score",
                        title: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                    },
                ]);
                setRequestObject((pre) => {
                    return { ids: pre.ids };
                });
            }
        }
    }, [dispatch, entityIDs, sortBy, query, topRemediationsCount]);

    const updateThreatCoverageData = useCallback(
        (typeId, field, updateValue, row) => {
            setThreatCoverageTableData((pre) => {
                const updatedData = pre.map((preData) => {
                    if (preData.id === typeId) {
                        return {
                            ...preData,
                            coverage: {
                                ...preData.coverage,
                                [field]: updateValue,
                            },
                        };
                    }
                    return { ...preData };
                });
                return updatedData;
            });
            setRequestObject((prevObject) => {
                const updatedObject = { ...prevObject };
                let typeArray = updatedObject[threatCoverageType];
                const newItem = {
                    id: row.id,
                    coverage: {
                        ...row.coverage,
                        [field]: updateValue,
                    },
                };
                if (!typeArray) {
                    typeArray = [];
                    updatedObject[threatCoverageType] = typeArray;
                }
                const itemIndex = typeArray.findIndex((item) => item.id === typeId);
                if (itemIndex === -1) {
                    typeArray.push(newItem);
                } else {
                    typeArray[itemIndex] = newItem;
                }
                return updatedObject;
            });
        },
        [threatCoverageType]
    );

    const saveThreatCoverageData = async () => {
        const response = await dispatch(
            saveThreatCoverage({
                requestObject,
                threatCoverageType: threatCoverageTypes[threatCoverageType],
            })
        ).unwrap();
        if (response.content && Array.isArray(response.content)) {
            // setThreatCoverageTableData(response?.content);
            setRequestObject((pre) => {
                return { ids: pre.ids };
            });
            getThreatCoverageCompactByTypeAndFilter();
            showToast("Threat coverage data has been successfully updated.", {
                type: "success",
            });
        }
    };

    const handleTopRemediationsClick = (e, value) => {
        setTopRemediationsCount(value);
        callCustomPopoverHandleClick();
    };

    const callCustomPopoverHandleClick = () => {
        if (topRemediationsPopoverRef.current) {
            topRemediationsPopoverRef.current.handleClick();
        }
    };

    useEffect(() => {
        if (entityIDs && entityIDs.length > 0 && query) {
            const requestIds = entityIDs.map((item) => item.id);
            setThreatCoverageType(query);
            getThreatCoverageCompactByTypeAndFilter();
            setRequestObject((pre) => {
                return { ...pre, ids: requestIds };
            });
        }
    }, [getThreatCoverageCompactByTypeAndFilter, query, entityIDs]);

    return (
        <>
            <div className="remediations-container">
                <div className="remediations-header">
                    <span>Remediations</span>
                    <div>
                        <CustomPopover
                            ref={topRemediationsPopoverRef}
                            popoverId="top-remediations-count"
                            hideHeader={true}
                            popOverElement={
                                <Box className="top-remedeation-drop-down-menu">
                                    <span>Top {topRemediationsCount} Remediations</span>
                                    <KeyboardArrowDownIcon
                                        sx={{ fill: "#fff" }}
                                        className={`${
                                            topRemediationsPopoverRef.current?.open
                                                ? "top-remedeation-drop-down-menu-rotated-icon"
                                                : ""
                                        }`}
                                    />
                                </Box>
                            }
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            title={`Top ${topRemediationsCount} Remediations`}
                        >
                            <MenuItem
                                value="all"
                                onClick={(e) => {
                                    handleTopRemediationsClick(e, "All");
                                }}
                            >
                                All
                            </MenuItem>
                            <MenuItem
                                value={10}
                                onClick={(e) => {
                                    handleTopRemediationsClick(e, e.target.value);
                                }}
                            >
                                Top 10 Remediations
                            </MenuItem>
                            <MenuItem
                                value={20}
                                onClick={(e) => {
                                    handleTopRemediationsClick(e, e.target.value);
                                }}
                            >
                                Top 20 Remediations
                            </MenuItem>
                            <MenuItem
                                value={50}
                                onClick={(e) => {
                                    handleTopRemediationsClick(e, e.target.value);
                                }}
                            >
                                Top 50 Remediations
                            </MenuItem>
                            <MenuItem
                                value={topRemediationsCountTextField}
                                onBlur={(e) => {
                                    setTopRemediationsCount(topRemediationsCountTextField);
                                }}
                            >
                                <CutomNumberFiled
                                    label="Custom Result"
                                    type="number"
                                    value={topRemediationsCountTextField}
                                    onChange={(value) => {
                                        setTopRemediationsCountTextField(value);
                                    }}
                                    min={1}
                                    variant="text"
                                />
                            </MenuItem>
                        </CustomPopover>
                    </div>
                </div>
                <Divider sx={{ borderBottom: "1px solid #1E2B40" }} />
                <div className="remediations-graph-section">
                    <div className="remediations-count">
                        <div className="remediations-count-section">
                            <div
                                className={`remediations-count-box ${
                                    threatCoverageType === "controls" ? "remediations-count-box-active" : ""
                                }`}
                                onClick={() => changeThreatCoverageType("controls")}
                            >
                                <div className="remediations-count-head">
                                    <span>Controls</span>
                                    <TuneIcon />
                                </div>
                                <div className="remediations-count-numbers">
                                    <span className="count-number">{threat_score?.total_controls}</span>
                                    {/* <span className="count-percentage">(25%)</span> */}
                                </div>
                            </div>
                            <div
                                className={`remediations-count-box ${
                                    threatCoverageType === "mitigations"
                                        ? "remediations-count-box-active"
                                        : ""
                                }`}
                                onClick={() => changeThreatCoverageType("mitigations")}
                            >
                                <div className="remediations-count-head">
                                    <span>Mitigations</span>
                                    <WarningAmberRoundedIcon />
                                </div>
                                <div className="remediations-count-numbers">
                                    <span className="count-number">{threat_score?.total_mitigations}</span>
                                </div>
                            </div>
                            <div
                                className={`remediations-count-box ${
                                    threatCoverageType === "defenses" ? "remediations-count-box-active" : ""
                                }`}
                                onClick={() => changeThreatCoverageType("defenses")}
                            >
                                <div className="remediations-count-head">
                                    <span>Defenses</span>
                                    <GppGoodOutlinedIcon />
                                </div>
                                <div className="remediations-count-numbers">
                                    <span className="count-number">{threat_score?.total_defenses}</span>
                                </div>
                            </div>
                        </div>
                        <div className="remediations-count-section">
                            <div className="remediations-count-percentage-box">
                                <div style={{ fontSize: "1.4rem" }}>Threat Coverage</div>
                                <div className="remediations-count-percentage-box-desc">
                                    This data shows the statistics of threat coverage.
                                </div>
                                <div className="count-percentage-box">
                                    <span className="remediations-count-percentage-text">Controls</span>
                                    <span
                                        className="remediations-count-percentage-chip"
                                        style={{
                                            color: "#92cb74",
                                            border: "1.5px solid #92cb74",
                                        }}
                                    >
                                        {threat_score?.control_coverage_score}%
                                    </span>
                                </div>
                                <div className="count-percentage-box">
                                    <span className="remediations-count-percentage-text">Mitigations</span>
                                    <span
                                        className="remediations-count-percentage-chip"
                                        style={{
                                            color: "#ee6666",
                                            border: "1.5px solid #ee6666",
                                        }}
                                    >
                                        {threat_score?.mitigation_coverage_score}%
                                    </span>
                                </div>
                                <div className="count-percentage-box">
                                    <span className="remediations-count-percentage-text">Defenses</span>
                                    <span
                                        className="remediations-count-percentage-chip"
                                        style={{
                                            color: "#fac858",
                                            border: "1.5px solid #fac858",
                                        }}
                                    >
                                        {threat_score?.defense_coverage_score}%
                                    </span>
                                </div>
                            </div>
                            <Divider
                                sx={{
                                    background: "#1E2B40",
                                    marginTop: "0.5rem",
                                    marginBottom: "0.5rem",
                                    borderWidth: "1px",
                                }}
                            />
                            <div style={{ width: "50%", height: "14rem" }}>
                                {countGraphData && countGraphData.length > 0 ? (
                                    <RemediationsCountGraph data={countGraphData} />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="remediations-graph">
                        <span>{threatCoverageTypes[query]} STATE</span>
                        {stateGraphData && stateGraphData.length > 0 ? (
                            <RemediationsStateGraph data={stateGraphData} />
                        ) : (
                            ""
                        )}
                    </div>
                    <div
                        className="tid-create-button"
                        style={{ height: "auto" }}
                        onClick={async () => {
                            if (requestObject && Object.keys(requestObject).length >= 2) {
                                saveThreatCoverageData();
                            }
                            navigate("/intel-flow/hunt-detect");
                        }}
                    >
                        <div className="tid-create-icon">
                            <NextIcon />
                            <span style={{ color: "#4a92b2" }}>DE&TH</span>
                        </div>
                        <div className="vector-ellipse vector-ellipse-risk" />
                    </div>
                </div>
                <div className="remediations-main-section">
                    <div className="remediations-main-section-header">
                        <div className="remediations-main-section-header-name">
                            <span>{`${query ? query.toUpperCase() : "Controls"}`}</span>
                            <div>
                                {entities && entities?.length > 0
                                    ? entities.map((chip, index) => {
                                          return (
                                              <CustomChip
                                                  key={index}
                                                  // onDelete={onDeleteTag}
                                                  data={{ label: chip?.name }}
                                                  borderstyle={chip?.color}
                                                  color={chip?.color}
                                              />
                                          );
                                      })
                                    : ""}
                            </div>
                        </div>
                        {/* <CustomTooltip title={"Sort by"}> */}
                        <div className="remediations-main-section-filter">
                            <CustomSelect
                                placeholder="Sort by"
                                menuItems={["PRIORITY", "TECHNIQUES", "ENTITIES"]}
                                selectedMenuItems={sortBy?.toUpperCase()}
                                handleChange={(event) => {
                                    const {
                                        target: { value },
                                    } = event;
                                    setSortBy(value?.toLowerCase());
                                }}
                            />
                            {requestObject && Object.keys(requestObject).length >= 2 && (
                                <Button variant="contained" onClick={saveThreatCoverageData}>
                                    Save
                                </Button>
                            )}
                        </div>
                        {/* </CustomTooltip> */}
                    </div>
                    <Divider
                        sx={{
                            background: "#1E2B40",
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                            borderWidth: "1px",
                        }}
                    />
                    <div className="remediations-table-container">
                        {threatCoverageTableData && threatCoverageTableData.length > 0 ? (
                            <>
                                <RemediationsTable
                                    updateThreatCoverageData={updateThreatCoverageData}
                                    tableData={threatCoverageTableData}
                                    states={states}
                                    query={query}
                                />
                            </>
                        ) : (
                            <NoDataFound />
                        )}
                    </div>
                </div>
            </div>
            <BackdropLoader loading={threatCoverageLoading} />
        </>
    );
};

export default Remediations;
