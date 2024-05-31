import Divider from "@mui/material/Divider";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NextIcon } from "../../../../Assests/SVG/addIcon.svg";
import CustomChip from "../../../../Components/Custom/CustomChip";
import CustomSelect from "../../../../Components/Custom/CustomSelect";
import BackdropLoader from "../../../../Components/Loader/BackdropLoader";
import useToastify from "../../../../Hooks/useToastify";
import NoDataFound from "../../../../Pages/NoDataFound";
import { getDetectionInformationData } from "../../../../redux/Slice/TID/DetectionSlice";
import { setEntityIDs } from "../../../../redux/Slice/TID/EntitySlice";
import { getDetectionCountPerTechnique, getDetectionInfo } from "../../../../Services/TID/detection.service";
import AnalyticsCard from "./AnalyticsCard";
import AnalyticsCountGraph from "./AnalyticsCountGraph";
import "./hunt-and-detect.css";
import HuntResult from "./ResultScreen/HuntResult";
import CustomLoadingButton from "../../../../Components/Custom/CustomLoadingButton";
import { CircularProgress } from "@mui/material";

const HuntAndDetect = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [platform, setPlatform] = useState("");
    const [detectionInfoContent, setDetectionInfoContent] = useState([]);
    const [visibleDetectionInfoData, setVisibleDetectionInfoData] = useState([]);
    const [loadCount, setLoadCount] = useState(10);
    const [detectionCount, setDetectionCount] = useState([]);
    const [openHuntResult, setOpenHuntResult] = useState(false);
    const [countLoading, setCountLoading] = useState(true);
    const { showToast } = useToastify();

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    // const loading = useSelector((state) => state.detection.loading);
    const detectionInfoData = useSelector(getDetectionInformationData);

    const entities = detectionInfoData.entities || [];
    const content = detectionInfoData.content || [];
    const platforms = detectionInfoData.platforms || [];

    const handleHuntResult = () => {
        setOpenHuntResult(!openHuntResult);
    };

    const getDetectionInfoData = useCallback(async () => {
        if (entityIDs && entityIDs.length > 0) {
            const response = await dispatch(getDetectionInfo({ selectedIds: entityIDs })).unwrap();
            const responseCount = await dispatch(
                getDetectionCountPerTechnique({ selectedIds: entityIDs })
            ).unwrap();
            if (response) {
                setDetectionInfoContent(response.content || []);
                setVisibleDetectionInfoData(response?.content.slice(0, loadCount));
                setPlatform("");
            }
            if (responseCount) {
                setDetectionCount(responseCount);
                setCountLoading(false);
            }
        }
    }, [entityIDs, loadCount, dispatch]);

    const loadMore = () => {
        setLoadCount((prevLoadCount) => prevLoadCount + 10);
        setVisibleDetectionInfoData(detectionInfoContent.slice(0, loadCount + 10));
    };

    useEffect(() => {
        if (entityIDs && entityIDs.length >= 1) {
            getDetectionInfoData();
        }
        return () => {
            // dispatch(resetDetectionInfoData());
        };
    }, [getDetectionInfoData, dispatch, entityIDs]);

    const onPlatformSelect = (e) => {
        setPlatform(e.target.value);
        if (e.target.value === "none" || !e.target.value) {
            return setDetectionInfoContent(content);
        }
        const updatedDetectionInfoData =
            content &&
            content.length > 0 &&
            content.filter((item) => {
                return (
                    item?.platforms && item?.platforms.length > 0 && item?.platforms.includes(e.target.value)
                );
            });
        setDetectionInfoContent(updatedDetectionInfoData || []);
    };

    const onDelet = ({ label: text }) => {
        if (entityIDs && entityIDs.length > 1) {
            const deleteItem =
                entityIDs && entityIDs.length > 0 && entityIDs.find((entity) => entity.name === text);
            const newEntityIDs = entityIDs.filter((entity) => entity?.id !== deleteItem?.id);
            dispatch(setEntityIDs(newEntityIDs));
            showToast("The entity has been successfully deleted.", {
                type: "success",
            });
        } else {
            showToast("You cannot delete more items.", {
                type: "error",
            });
        }
    };

    return (
        <>
            {<BackdropLoader loading={countLoading} />}
            {openHuntResult ? (
                <HuntResult handleHuntResult={handleHuntResult} />
            ) : (
                <div className="hunt-detect-container">
                    <div className="hunt-detect-top-section">
                        <div className="hunt-detect-graph">
                            Analytics Count by Technique
                            {detectionCount && Object.keys(detectionCount).length > 0 && (
                                <AnalyticsCountGraph data={detectionCount} />
                            )}
                        </div>
                        {/* <div className="hunt-detect-nav-button"> */}
                        <div
                            className="tid-create-button"
                            style={{ height: countLoading ? "20rem" : "auto", width: "13%" }}
                            onClick={() => navigate("/intel-flow/recommendation")}
                        >
                            <div className="tid-create-icon">
                                <NextIcon />
                                <span style={{ color: "#4a92b2" }}>Recommendation</span>
                            </div>
                            <div className="vector-ellipse vector-ellipse-risk" />
                        </div>
                        {/* </div> */}
                    </div>
                    {/* <div className="hunt-detect-main-section">Detailed Analytics</div> */}

                    <div className="death-main-section-header">
                        <div className="death-main-section-header-name">
                            <span>Detailed Analytics</span>
                            <div>
                                {entities && entities?.length > 0
                                    ? entities?.map((chip, index) => {
                                          return (
                                              <CustomChip
                                                  isDeletable={entities?.length > 1}
                                                  key={index}
                                                  onDelete={onDelet}
                                                  data={{ label: chip?.name }}
                                                  borderstyle={chip?.color}
                                                  color={chip?.color}
                                              />
                                          );
                                      })
                                    : ""}
                            </div>
                        </div>
                        <div className="remediations-main-section-filter">
                            <CustomSelect
                                placeholder="Filter By Platforms"
                                menuItems={platforms}
                                handleChange={onPlatformSelect}
                                selectedMenuItems={platform}
                                setSelectedMenuItems={setPlatform}
                                bordercolor="rgba(255, 255, 255, 0.24)"
                                placholderTextColor="#d2d2d2"
                            />
                        </div>
                    </div>
                    <Divider
                        sx={{
                            background: "#1E2B40",
                            borderWidth: "1px",
                        }}
                    />

                    <div>
                        {visibleDetectionInfoData ? (
                            visibleDetectionInfoData.length > 0 &&
                            visibleDetectionInfoData?.map((detection, index) => {
                                return (
                                    <AnalyticsCard
                                        key={index}
                                        data={detection}
                                        handleHuntResult={handleHuntResult}
                                    />
                                );
                            })
                        ) : (
                            <NoDataFound />
                        )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", padding: "1rem 0rem" }}>
                        {loadCount < detectionInfoContent.length && (
                            <CustomLoadingButton
                                size="small"
                                sx={{
                                    background: "#0082F91F",
                                    border: "1px solid #0082F9",
                                }}
                                loadingIndicator={<CircularProgress size={20} />}
                                onClick={loadMore}
                                // loading={loading}
                                variant="outlined"
                            >
                                Load More
                            </CustomLoadingButton>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default HuntAndDetect;
