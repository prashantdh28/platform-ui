import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BackdropLoader from "../../../../../Components/Loader/BackdropLoader";
import { getThreatCoverageCompactData } from "../../../../../redux/Slice/TID/ThreatCoverageSlice";
import "../remediations.css";
import CustomChip from "../../../../../Components/Custom/CustomChip";
// import CustomMarkdownPreview from "../../../../../Components/Custom/CustomMarkdownPreview";
import CustomMarkdownTag from "../../../../../Components/Markdown/CustomMarkDown";
import { borderColor } from "../RemediationsTable/RemediationsTableRow";
import RemedeationsDetailCoverageGraph from "./RemedeationsDetailCoverageGraph";
import RenderChips from "../../../../../Components/Common/RenderChips";
import CustomTooltip from "../../../../../Components/Custom/CustomTooltip";
import { renderNewIcon } from "../../../../../helper/IconRenderer";
import TopReccomendationsCard from "../../Recommendation/TopRecommendationsCard";
import { Box, IconButton } from "@mui/material";
import NoDataFound from "../../../../../Pages/NoDataFound";
import { useQuery } from "../../../../../Hooks/useQuery";

const RemediationsDetail = () => {
    const navigate = useNavigate();

    let query = useQuery().get("type") || "controls";

    const threatCoverageCompactData = useSelector(getThreatCoverageCompactData);
    const { content = [] } = threatCoverageCompactData;

    const [remediationsDetail, setRemediationsDetail] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const getRemedeationsDetail = useCallback(async () => {
        try {
            if (content && Array.isArray(content) && id) {
                const remediationDetail = await content.find((item) => item.id === id);
                setRemediationsDetail(remediationDetail);
            }
        } catch (error) {
            setLoading(false);
            setRemediationsDetail("");
        } finally {
            setLoading(false);
        }
    }, [content, id]);

    useEffect(() => {
        if (id) {
            getRemedeationsDetail();
        }
    }, [id, getRemedeationsDetail]);

    return (
        <>
            <BackdropLoader loading={loading} />
            {remediationsDetail && Object.keys(remediationsDetail).length > 0 && (
                <div className="remediations-detail-container">
                    <div className="remediations-detail-header">
                        <h4 className="remediations-header-title">
                            {`${query ? query.toUpperCase() : "CONTROLS"}`} INFORMATION
                        </h4>
                        <IconButton onClick={() => navigate(`/intel-flow/remediations?type=${query}`)}>
                            <CloseOutlinedIcon sx={{ fill: "#8E97A4" }} />
                        </IconButton>
                    </div>
                    {/* <hr style={{ border: "1px solid #1E2B40" }} /> */}
                    <div className="remediations-detail-top">
                        <div className="remediations-detail-graph-main">
                            <div className="remediations-detail-title">
                                <div className="remediations-detail-priority-container">
                                    <span>{remediationsDetail?.id}</span>
                                    <span className="remediations-detail-priority">
                                        {remediationsDetail?.priority}
                                    </span>
                                </div>
                                <CustomChip
                                    data={{
                                        label: remediationsDetail?.coverage?.state_info,
                                    }}
                                    sx={{
                                        background: "transparent",
                                        width: "fit-content",
                                        height: "2.5rem",
                                        fontSize: "1rem",
                                        margin: "0",
                                    }}
                                    borderstyle={borderColor(remediationsDetail?.coverage?.state_info)}
                                    color="#FFFFFF"
                                />
                            </div>
                            <div className="remediations-detail-graph">
                                <RemedeationsDetailCoverageGraph
                                    percentageCompleted={remediationsDetail?.percentage_completed}
                                    query={query}
                                />
                            </div>
                        </div>
                        <div className="remediations-detail-description">
                            <span className="remediations-detail-description-title">
                                {`${query ? query.toUpperCase() : "CONTROLS"}`} DESCRIPTION
                            </span>
                            {/* <CustomMarkdownPreview
                                className="remediations-detail-description-content"
                                source={remediationsDetail?.description}
                            /> */}
                            <CustomMarkdownTag
                                containerClass="remediations-detail-description-container"
                                content={remediationsDetail?.description}
                                customClassNames="remediations-detail-description-content"
                            />
                        </div>
                    </div>
                    <div className="remediations-detail-middle">
                        <div className="remediations-detail-technique">
                            <span className="remediations-detail-description-title">Relevant Technique</span>
                            <div className="remediations-detail-technique-main">
                                {remediationsDetail?.techniques &&
                                remediationsDetail?.techniques.length > 0 ? (
                                    <RenderChips
                                        title="Relevant Technique"
                                        chipsData={remediationsDetail?.techniques?.map((row) => ({
                                            name: row?.id,
                                        }))}
                                        length={3}
                                    />
                                ) : (
                                    <span className="remediations-detail-description-title">
                                        No data Availble
                                    </span>
                                )}
                            </div>
                        </div>
                        <hr
                            style={{
                                margin: "0",
                                border: "0",
                                width: "0px",
                                borderLeft: "1px solid #2A3C57",
                            }}
                        />
                        <div className="remediations-detail-technique">
                            <span className="remediations-detail-description-title">Relevant Threats</span>
                            <div className="remediations-detail-technique-main">
                                {remediationsDetail?.entities && remediationsDetail?.entities.length > 0 ? (
                                    remediationsDetail?.entities.map((entity, index) => {
                                        return (
                                            <CustomTooltip title={entity.type} key={index}>
                                                <div className="remediations-detail-threat">
                                                    <span>{renderNewIcon(entity?.type)}</span>
                                                    {entity?.name}
                                                </div>
                                            </CustomTooltip>
                                        );
                                    })
                                ) : (
                                    <span className="remediations-detail-description-title">
                                        No data Availble
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="remediations-detail-bottom">
                        <span className="remediations-detail-description-title">Recommendations</span>
                        {remediationsDetail?.recommendations &&
                        remediationsDetail?.recommendations.length > 0 ? (
                            <Box
                                className="remediations-detail-recommendations"
                                sx={{
                                    "& .MuiAccordion-root": {
                                        background: "#FFFFFF14 !important",
                                        border: "0 !important",
                                        borderRadius: "0.375rem !important",
                                        color: "#FFFFFF !important",
                                    },
                                    "& .MuiCollapse-root": {
                                        background: "#08172F !important",
                                    },
                                    "& .MuiPaper-root": {
                                        border: "0 !important",
                                    },
                                }}
                            >
                                {remediationsDetail?.recommendations.map((recommendation, index) => {
                                    return (
                                        <TopReccomendationsCard
                                            key={index}
                                            data={{
                                                ...recommendation,
                                                actionable_recommendations: recommendation?.sub_actions,
                                                recommendation: recommendation?.action_description,
                                                helps_in: remediationsDetail?.name,
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        ) : (
                            <NoDataFound />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default RemediationsDetail;
