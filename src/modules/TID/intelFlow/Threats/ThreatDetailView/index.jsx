import React, { useEffect, useState } from "react";
import ThreatCard from "../ThreatsTabs/ThreatCard";
import { getTIDEntityByID } from "../../../../../Services/TID/tid.service";
import { getAttackMatrix } from "../../../../../Services/TID/attackMatrix.service";
import { resetAttackMatrixData } from "../../../../../redux/Slice/TID/AttackMatrixSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackdropLoader from "../../../../../Components/Loader/BackdropLoader";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import ReportsTab from "./ReportsTab";
import AttacksTab from "./AttacksTab";
import AssociationsTab from "./AssociationsTab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
const EntityScreenDetailed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { entityID, loading } = useSelector((state) => state.TIDEntity);
    const [tabValue, setTabValue] = useState("1");
    const attributions = entityID?.attributions || {};
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
        if (newValue === "1") {
            // setTabType("");
        }
        if (newValue === "2") {
            // setTabType("track");
        }
        if (newValue === "3") {
            // setTabType("private");
        }
    };
    useEffect(() => {
        dispatch(getTIDEntityByID(id));
        dispatch(getAttackMatrix({ selectedIds: [{ id }], compress: true }));
        return () => {
            dispatch(resetAttackMatrixData());
        };
    }, [dispatch, id]);
    return (
        <>
            <div className="back-for-entity-card">
                <Button
                    sx={{ background: "rgb(17, 32, 56)", border: "1px solid rgb(30, 43, 64)" }}
                    variant="contained"
                    onClick={() => navigate("/intel-flow")}
                    startIcon={<ArrowBackIcon style={{ fill: "white" }} />}
                >
                    Back
                </Button>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Button variant="outlined">Generate Report</Button>
                    <Button variant="outlined">Attack Scenario</Button>
                </Box>
            </div>
            {<BackdropLoader loading={loading} />}
            {entityID && Object.keys(entityID).length > 0 && (
                <>
                    <div>
                        <ThreatCard threatData={entityID} hideCheckBoxDiv={true} />
                    </div>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: "#1E2B40", width: "75%" }}>
                            <TabList onChange={handleChange}>
                                <Tab
                                    className="tid-dashboard-tab"
                                    //   icon={<DotIcon />}
                                    sx={{
                                        "& path": {
                                            stroke: `${tabValue === "1" ? "#0082F9" : "#fff"}`,
                                            fill: `${tabValue === "1" ? "#0082F9" : "#fff"}`,
                                        },
                                        color: "#fff",
                                    }}
                                    iconPosition="start"
                                    label="Reports"
                                    value="1"
                                />
                                <Tab
                                    //   icon={
                                    //       <FormatListBulletedIcon
                                    //           sx={{
                                    //               fill: `${tabValue === "2" ? "#0082F9" : "#fff"}`,
                                    //           }}
                                    //       />
                                    //   }
                                    sx={{
                                        color: "#fff",
                                    }}
                                    iconPosition="start"
                                    label="Attacks"
                                    value="2"
                                />
                                <Tab
                                    //   icon={<PrivateIcon />}
                                    sx={{
                                        "& path": {
                                            stroke: `${tabValue === "3" ? "#0082F9" : "#fff"}`,
                                            fill: `${tabValue === "3" ? "#0082F9" : "#fff"}`,
                                        },
                                        color: "#fff",
                                    }}
                                    iconPosition="start"
                                    label="Associations"
                                    value="3"
                                />
                            </TabList>
                        </Box>

                        <TabPanel id value="1" itemType="allThreats">
                            <ReportsTab entityID={entityID} />
                        </TabPanel>
                        <TabPanel value="2">
                            <AttacksTab />
                        </TabPanel>
                        <TabPanel value="3">
                            <AssociationsTab data={attributions} />
                        </TabPanel>
                    </TabContext>
                </>
            )}
        </>
    );
};

export default EntityScreenDetailed;
