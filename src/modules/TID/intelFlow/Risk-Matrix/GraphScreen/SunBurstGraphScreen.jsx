import { Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSunBurstGraph } from "../../../../../Services/TID/riskMatrix.service";
import { getRiskLoading, getSunBurstData } from "../../../../../redux/Slice/TID/RiskMatrixSlice";
import GraphsTab from "./GraphsTab";
import SingleMatrixCard from "../SingleMatrixCard";
import BackdropLoader from "../../../../../Components/Loader/BackdropLoader";

const SunBurstGraphScreen = ({ onButtonClick }) => {
    const dispatch = useDispatch();

    const [tabValue, setTabValue] = useState(0);

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    const sunBurstData = useSelector(getSunBurstData);
    const riskProfileDataLoading = useSelector(getRiskLoading);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        dispatch(getSunBurstGraph({ selectedIds: entityIDs }));
    }, [dispatch, entityIDs]);

    return (
        <div className="mtr-graph-container">
            <BackdropLoader loading={riskProfileDataLoading} />

            <div className="mtr-graph">
                <GraphsTab onButtonClick={onButtonClick} handleChange={handleChange} tabValue={tabValue} />
            </div>
            <div className="mtr-remediation-container">
                <div className="mtr-graph-entity-box">
                    <Typography sx={{ fontWeight: "400", fontSize: "1.2rem" }}>
                        Top Risk Categories
                    </Typography>
                    <Divider sx={{ background: "rgba(30, 43, 64, 1)" }} />

                    {sunBurstData &&
                        sunBurstData[tabValue]?.top_categories?.map(
                            (value, index) => {
                                return (
                                    <SingleMatrixCard val={value} key={index} />
                                    // <div
                                    //   className="graph-entity-card"
                                    //   key={index}
                                    //   style={{ background: `${value.color}` }}
                                    // >
                                    //   <div>
                                    //     <Typography>{value?.id}</Typography>
                                    //     <Typography
                                    //       sx={{
                                    //         color: "rgba(142, 151, 164, 1)",
                                    //         fontWeight: "500",
                                    //       }}
                                    //     ></Typography>
                                    //   </div>
                                    // </div>
                                );
                            }
                            // value.top_categories &&
                            // value.top_categories.map((cat, catIndex) => (

                            // ))
                        )}
                </div>
            </div>
        </div>
    );
};

export default SunBurstGraphScreen;
