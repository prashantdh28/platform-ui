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
import ActionableRecommendations from "../RecommendationCard/ActionableRecommendations";
import "../recommendation.css";
import { getRelevancyColor } from "../../Remediations/RemediationsDetail/RemedeationsDetailCoverageGraph";

const TopReccomendationsCard = ({ data }) => {
    const { actionable_recommendations: actionableRecommendation, ...otherData } = data;
    return (
        <>
            <CustomAccordion>
                <AccordionSummary
                    expandIcon={<ExpandCircleDownOutlinedIcon sx={{ fill: "#8E97A4" }} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{
                        borderBottom: "1px solid #1E2B40",
                    }}
                >
                    <>
                        <div
                            //     className="recommendation-card-main-accordion-header"
                            style={{
                                display: "flex",
                                width: "100%",
                                gap: "0.5rem",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                sx={{
                                    textDecoration: "underline",
                                    width: "30%",
                                    color: "#0082F9",
                                }}
                            >
                                {otherData?.recommendation}
                            </Typography>
                            {/* <div className="accordion-header-left" style={{ gap: "1rem" }}> */}
                            <div className="accordion-header-left" style={{ width: "25%" }}>
                                <span className="head">Helps In:&nbsp; </span>
                                <span className="value">{otherData?.helps_in}</span>
                            </div>
                            <div
                                className="accordion-header-left"
                                style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "14%" }}
                            >
                                <Box sx={{ position: "relative", marginTop: "0.4rem" }}>
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
                                            color: getRelevancyColor(otherData?.percentage_completed),
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

                            {otherData?.mitigates && otherData?.mitigates.length > 0 && (
                                <>
                                    <Divider
                                        sx={{
                                            border: "1px solid #1E2B40",
                                            margin: "1rem 1rem",
                                            // height: "100%",
                                        }}
                                        orientation="vertical"
                                    />
                                    <div style={{ display: "flex", flexDirection: "column", width: "38%" }}>
                                        <span className="head">Mitigates </span>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <RenderChips
                                                title="Mitigates"
                                                chipsData={otherData?.mitigates?.map((row) => ({
                                                    name: row?.id,
                                                }))}
                                                length={4}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
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
        </>
    );
};

export default TopReccomendationsCard;
