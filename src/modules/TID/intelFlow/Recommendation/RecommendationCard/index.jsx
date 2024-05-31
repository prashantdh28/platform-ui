import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import {
    AccordionDetails,
    AccordionSummary,
    Box,
    CircularProgress,
    Divider,
    Typography,
} from "@mui/material";
import React from "react";
import RenderChips from "../../../../../Components/Common/RenderChips";
import CustomAccordion from "../../../../../Components/Custom/CustomAccordion";
import ActionableRecommendations from "./ActionableRecommendations";

const RecommendationCard = ({ data }) => {
    return (
        <div className="recommendation-card">
            <div className="recommendation-card-top">
                <div className="recommendation-card-technique">
                    {`${data?.technique_id}-${data?.technique_name}`}
                    <Divider className="recommendation-card-divider" />
                </div>
                {/* <div className="recommendation-card-platforms">
                    <span>Platforms</span>
                    <div className="recommendation-card-used-by-chips">
                        {data?.platforms && data?.platforms.length > 0 && (
                            <RenderChips
                                title="Platforms"
                                chipsData={data?.platforms?.map((row) => ({
                                    name: row,
                                }))}
                                length={2}
                            />
                        )}
                    </div>
                </div> */}
                <div className="recommendation-card-used-by">
                    <span>Used By</span>
                    <div className="recommendation-card-used-by-chips">
                        {data?.entities && data?.entities.length > 0 && (
                            <RenderChips
                                title="Used By"
                                chipsData={data?.entities?.map((row) => ({
                                    name: row?.name,
                                }))}
                                length={2}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="recommendation-card-main">
                <div className="recommendation-card-main-accordion">
                    {data?.recommendations &&
                        data?.recommendations.length > 0 &&
                        data?.recommendations.map((item, index) => {
                            const { actionable_recommendations: actionableRecommendation, ...otherData } =
                                item;
                            return (
                                <CustomAccordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandCircleDownOutlinedIcon sx={{ fill: "#8E97A4" }} />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        sx={{
                                            borderBottom: "1px solid #1E2B40",
                                        }}
                                    >
                                        <>
                                            <div className="recommendation-card-main-accordion-header">
                                                <Typography
                                                    sx={{
                                                        color: "#0082F9",
                                                        textDecoration: "underline",
                                                    }}
                                                >
                                                    {otherData?.recommendation}
                                                </Typography>
                                                <div
                                                    className="accordion-header-left"
                                                    style={{ gap: "1rem" }}
                                                >
                                                    <div className="accordion-header-left">
                                                        <span className="head">Helps In:&nbsp; </span>
                                                        <span className="value">{otherData?.helps_in}</span>
                                                    </div>
                                                    <div
                                                        className="accordion-header-left"
                                                        style={{ gap: "0.5rem" }}
                                                    >
                                                        <Box
                                                            sx={{ position: "relative", marginTop: "0.4rem" }}
                                                        >
                                                            <CircularProgress
                                                                variant="determinate"
                                                                sx={{
                                                                    color: "#2A3C57",
                                                                }}
                                                                size={20}
                                                                thickness={8}
                                                                value={100}
                                                            />
                                                            <CircularProgress
                                                                variant="determinate"
                                                                sx={{
                                                                    animationDuration: "550ms",
                                                                    position: "absolute",
                                                                    left: 0,
                                                                    // [`& .${circularProgressClasses.circle}`]: {
                                                                    //     strokeLinecap: "round",
                                                                    // },
                                                                }}
                                                                size={20}
                                                                thickness={8}
                                                                value={otherData?.percentage_completed}
                                                            />
                                                        </Box>
                                                        <span>{otherData?.percentage_completed}% Done</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {actionableRecommendation &&
                                            actionableRecommendation.length > 0 &&
                                            actionableRecommendation.map((actionableItem, index) => {
                                                return (
                                                    <ActionableRecommendations
                                                        key={index}
                                                        actionableItem={actionableItem}
                                                        index={index}
                                                        recommendationData={otherData}
                                                        actionableRecommendations={actionableRecommendation}
                                                    />
                                                );
                                            })}
                                    </AccordionDetails>
                                </CustomAccordion>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard;
