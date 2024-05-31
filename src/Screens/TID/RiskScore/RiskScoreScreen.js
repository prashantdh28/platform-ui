import { Button } from "@mui/material";
import React from "react";
import DynamicButton from "../../../Components/Button/ButtonBox";
import TabsRiskScore from "../../../TID/Components/RiskScore/TabsRiskScore";
import { ReactComponent as SquareIcon } from "../../../Assests/SVG/squer.svg";
import "./RiskScoreScreen.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRisk } from "../../../redux/Slice/riskManagementApiSlice";

const RIskScore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const riskScoreData = useSelector((state) => state.TIDEntity.riskScoreData);

    const handleClick = () => {
        navigate("/tid/download");
    };

    return (
        <>
            <div className="parent-div-risk-score">
                <div className="risk-score-button-div">
                    <div style={{ display: "flex", gap: "1rem", paddingLeft: "1rem" }}>
                        {riskScoreData &&
                            riskScoreData?.color_to_status_map &&
                            Object.keys(riskScoreData?.color_to_status_map).length > 0 &&
                            Object.keys(riskScoreData?.color_to_status_map).map((color, index) => {
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "0.2rem",
                                        }}
                                    >
                                        <SquareIcon fill={color} width="1rem" fontSize="1rem" />
                                        &nbsp;{riskScoreData?.color_to_status_map[color]}
                                    </div>
                                );
                            })}
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <Button variant="outlined" id="risk-score-download" onClick={handleClick}>
                            Download
                        </Button>
                        <DynamicButton
                            label="CREATE RISK PROFILE"
                            className="create-profile-button"
                            onClick={() => dispatch(addRisk({ form_id: 0 }, navigate))}
                        />
                    </div>
                </div>

                <div className="tabs-riskScore">
                    <TabsRiskScore />
                </div>
            </div>
        </>
    );
};

export default RIskScore;
