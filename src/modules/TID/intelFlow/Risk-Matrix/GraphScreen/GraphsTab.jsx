import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as MatrixViewIcon } from "../../../../../Assests/SVG/MatrixViewIcon.svg";
import { getSunBurstGraph } from "../../../../../Services/TID/riskMatrix.service";
import { getSunBurstData } from "../../../../../redux/Slice/TID/RiskMatrixSlice";
import SunBurstGraph from "./SunBurst-Graph";
import CustomTooltip from "../../../../../Components/Custom/CustomTooltip";
import { Button } from "@mui/material";

const GraphsTab = ({ onButtonClick, tabValue, handleChange }) => {
    const dispatch = useDispatch();
    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);

    const sunBurstData = useSelector(getSunBurstData);
    useEffect(() => {
        dispatch(getSunBurstGraph({ selectedIds: entityIDs }));
    }, [dispatch, entityIDs]);

    return (
        <>
            <div>
                <TabContext value={tabValue}>
                    {" "}
                    {/* Convert tabValue to string */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
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
                            {sunBurstData?.map((tab, index) => (
                                <TabList onChange={handleChange} key={index}>
                                    <Tab
                                        className="tid-dashboard-tab"
                                        sx={{
                                            "& path": {
                                                stroke: `${tabValue === 1 ? "#0082F9" : "#fff"}`,
                                                fill: `${tabValue === 1 ? "#0082F9" : "#fff"}`,
                                            },
                                            color: "#fff",
                                        }}
                                        iconPosition="start"
                                        label={tab?.name}
                                        value={index}
                                    />
                                </TabList>
                            ))}
                        </Box>
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                            <CustomTooltip title="Compare existing Risk Coverage with your Target Risk Profile">
                                <Button variant="outlined">Compare</Button>
                            </CustomTooltip>
                            <div className="intel-connected-svg" onClick={() => onButtonClick("matrix-view")}>
                                <MatrixViewIcon />
                            </div>
                        </Box>
                    </div>
                    {sunBurstData?.map((tabpanel, index) => (
                        <TabPanel
                            id
                            value={index} // Convert index to string
                            key={index}
                            sx={{ padding: "0" }}
                        >
                            <SunBurstGraph data={tabpanel?.children} />
                        </TabPanel>
                    ))}
                </TabContext>
            </div>
        </>
    );
};

export default GraphsTab;
