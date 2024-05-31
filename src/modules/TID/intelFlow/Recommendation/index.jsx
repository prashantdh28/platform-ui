import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Button, CircularProgress, Divider, InputAdornment } from "@mui/material";
import Badge from "@mui/material/Badge";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomOutlinedInput from "../../../../Components/Custom/CustomOutlinedInput";
import BackdropLoader from "../../../../Components/Loader/BackdropLoader";
import { useDebounce } from "../../../../Hooks/useDebouncedValue";
import { useQuery } from "../../../../Hooks/useQuery";
import { getUserList } from "../../../../Services/Auth/Auth.service";
import { getRecommendations } from "../../../../Services/TID/recommendation.service";
import {
    getRecommendationsData,
    getRecommendationsLoading,
} from "../../../../redux/Slice/TID/RecommendationsSlice";
import RecommendationCard from "./RecommendationCard";
import TopReccomendationsCard from "./TopRecommendationsCard";
import "./recommendation.css";
import NoDataFound from "../../../../Pages/NoDataFound";
import CustomLoadingButton from "../../../../Components/Custom/CustomLoadingButton";

const Recommendation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let query = useQuery().get("all") || false;

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    const recommendationsData = useSelector(getRecommendationsData);
    const recommendationsLoading = useSelector(getRecommendationsLoading);

    const [showAllRecommendations, setShowAllRecommendations] = useState(query);
    const [filteredRecommendationsData, setFilteredRecommendationsData] = useState(recommendationsData || []);
    const [visibleRecommendationsData, setVisibleRecommendationsData] = useState([]);
    const [loadCount, setLoadCount] = useState(5);

    const getRecommendation = useCallback(async () => {
        if (entityIDs && entityIDs.length > 0) {
            setFilteredRecommendationsData({});
            const response = await dispatch(
                getRecommendations({ selectedIds: entityIDs, top: !showAllRecommendations })
            ).unwrap();
            setFilteredRecommendationsData(response);
            if (showAllRecommendations && response.recommendations && response.recommendations.length) {
                setVisibleRecommendationsData(response?.recommendations.slice(0, 5));
            }
        }
    }, [dispatch, showAllRecommendations, entityIDs]);

    const searchTechniquesAndEntities = useDebounce((e) => {
        const results = [];
        let searchValue = e.target?.value?.toLowerCase();
        if (searchValue) {
            recommendationsData?.recommendations.forEach((entry) => {
                entry.entities.forEach((entity) => {
                    if (entity.name.toLowerCase().includes(searchValue)) {
                        results.push(entry);
                    }
                });

                if (entry.technique_name.toLowerCase().includes(searchValue)) {
                    results.push(entry);
                }
            });
            setFilteredRecommendationsData({ recommendations: results });
        } else {
            setFilteredRecommendationsData(recommendationsData);
        }
        // return results;
    }, 1500);

    const loadMore = () => {
        setLoadCount((prevLoadCount) => prevLoadCount + 5);
        setVisibleRecommendationsData(recommendationsData?.recommendations.slice(0, loadCount + 5));
    };

    const getUsers = useCallback(async () => {
        await dispatch(getUserList());
    }, [dispatch]);

    useEffect(() => {
        getRecommendation();
        getUsers();
    }, [getRecommendation, getUsers]);

    return (
        <>
            <BackdropLoader loading={recommendationsLoading} />
            <div className="recommendation-container">
                <div className="recommendation-header">
                    <span>{!showAllRecommendations && "Top "}Recommendation</span>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {showAllRecommendations ? (
                            <CustomOutlinedInput
                                className="tab-search-input"
                                onChange={searchTechniquesAndEntities}
                                // value={searchValue}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ fill: "#8E97A4" }} />
                                    </InputAdornment>
                                }
                                placeholder="Search"
                            />
                        ) : (
                            ""
                        )}
                        <Badge
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: `${showAllRecommendations ? "#D35472" : ""}`,
                                },
                            }}
                            badgeContent={`${showAllRecommendations ? 5 : ""}`}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    color: "#ffff",
                                    background: "#0082F91F",
                                }}
                                startIcon={<AutoAwesomeMotionOutlinedIcon sx={{ fill: "#fff" }} />}
                                onClick={() => {
                                    setShowAllRecommendations(!showAllRecommendations);
                                    navigate(`/intel-flow/recommendation?all=${!showAllRecommendations}`);
                                }}
                            >
                                {showAllRecommendations ? "Top " : "All "} Recommendations
                            </Button>
                        </Badge>
                    </div>
                </div>
                <Divider sx={{ borderBottom: "1px solid #1E2B40", margin: "1rem 0rem" }} />
                <div className="recommendation-main">
                    {showAllRecommendations ? (
                        visibleRecommendationsData && visibleRecommendationsData.length > 0 ? (
                            <>
                                {visibleRecommendationsData.map((recommendation, index) => {
                                    return <RecommendationCard key={index} data={recommendation} />;
                                })}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        padding: "1rem 0rem",
                                    }}
                                >
                                    {loadCount < recommendationsData?.recommendations.length && (
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
                            </>
                        ) : (
                            <NoDataFound />
                        )
                    ) : filteredRecommendationsData && filteredRecommendationsData.length > 0 ? (
                        filteredRecommendationsData.map((recommendation, index) => {
                            return <TopReccomendationsCard key={index} data={recommendation} />;
                        })
                    ) : (
                        <NoDataFound />
                    )}
                </div>
            </div>
        </>
    );
};

export default Recommendation;
