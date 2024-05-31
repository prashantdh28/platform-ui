import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import RiskMatrixCard from "./RiskMatrixCard";
import "./risk-matrix.css";
import { useDispatch, useSelector } from "react-redux";
import { getRiskLoading, getRiskProfileData } from "../../../../redux/Slice/TID/RiskMatrixSlice";
import { getRiskProfile } from "../../../../Services/TID/riskMatrix.service";
import { ReactComponent as ChangeIcon } from "../../../../Assests/SVG/sunburnSVG.svg";
import BackdropLoader from "../../../../Components/Loader/BackdropLoader";
import { Button } from "@mui/material";
import CustomTooltip from "../../../../Components/Custom/CustomTooltip";

const RiskMatrixViewScreen = ({ onButtonClick }) => {
    const dispatch = useDispatch();

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    const riskProfileData = useSelector(getRiskProfileData);
    const riskProfileDataLoading = useSelector(getRiskLoading);

    const [tabValue, setTabValue] = useState(1);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        dispatch(getRiskProfile({ selectedIds: entityIDs }));
    }, [dispatch, entityIDs]);

    return (
        <>
            <BackdropLoader loading={riskProfileDataLoading} />
            <div className="rsk-mtr-container">
                <TabContext value={tabValue}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "1rem 1rem",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: "#1E2B40",
                                width: "75%",
                                display: "flex",
                            }}
                        >
                            {riskProfileData?.functions?.map((tab, index) => (
                                <TabList onChange={handleChange} key={index}>
                                    <Tab
                                        className="tid-dashboard-tab"
                                        sx={{
                                            "& path": {
                                                stroke: `${tabValue === "1" ? "#0082F9" : "#fff"}`,
                                                fill: `${tabValue === "1" ? "#0082F9" : "#fff"}`,
                                            },
                                            color: "#fff",
                                        }}
                                        iconPosition="start"
                                        label={tab?.function}
                                        value={tab?.index}
                                    />
                                </TabList>
                            ))}
                        </Box>
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                            <CustomTooltip title="Compare existing Risk Coverage with your Target Risk Profile">
                                <Button variant="outlined">Compare</Button>
                            </CustomTooltip>
                            <div className="intel-connected-svg" onClick={() => onButtonClick()}>
                                <ChangeIcon />
                            </div>
                        </Box>
                    </div>
                    {riskProfileData?.functions?.map((tabpanel, index) => (
                        <TabPanel id value={tabpanel?.index} itemType={tabpanel?.type} key={index}>
                            <RiskMatrixCard data={tabpanel?.categories} />
                        </TabPanel>
                    ))}
                </TabContext>
            </div>
        </>
    );
};

export default RiskMatrixViewScreen;
