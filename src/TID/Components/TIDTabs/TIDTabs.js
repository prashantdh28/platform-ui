import React, { useCallback, useEffect, useState } from "react";
import { TabComponent } from "@syncfusion/ej2-react-navigations";
import { useDispatch, useSelector } from "react-redux";
import "./TIDTabs.css";
import Trtd from "../TIDTables/CoaTable/Trtd";
// import { resetThreatCoverageData } from "../../../redux/Slice/TID/EntitySlice";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import { getThreatCoverage } from "../../../Services/TID/threatCoverage.service";

const TIDTabs = () => {
    const dispatch = useDispatch();

    const [mitigationsData, setMitigationsData] = useState([]);
    const [defensesData, setDefensesData] = useState([]);
    const [controlsData, setControlsData] = useState([]);
    const [selectedTab, setselectedTab] = useState(0);
    const [requestObject, setRequestObject] = useState({
        ids: [],
        mitigations: [],
        controls: [],
        defenses: [],
    });

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    const { threatCoverageData, loading } = useSelector((state) => state.threatCoverage);

    const setThreateCoverageContentData = useCallback((response) => {
        const mitigationsAraay = [];
        const defensesArray = [];
        const controlsArray = [];
        if (response.content && response.content.length > 0) {
            response.content.forEach((content) => {
                const { controls = [], defenses = [], mitigations = [], ...rest } = content;
                if (mitigations && mitigations.length > 0) {
                    mitigations.forEach((miti) => {
                        mitigationsAraay.push({
                            row: { ...miti },
                            ...rest,
                        });
                    });
                    // mitigationsAraay.push({
                    //     rowData: mitigations,
                    //     ...rest,
                    // });
                }
                if (defenses && defenses.length > 0) {
                    defenses.forEach((defens) => {
                        defensesArray.push({
                            row: { ...defens },
                            ...rest,
                        });
                    });
                    // defensesArray.push({
                    //     rowData: defenses,
                    //     ...rest,
                    // });
                }
                if (controls && controls.length > 0) {
                    controls.forEach((control) => {
                        controlsArray.push({
                            row: { ...control },
                            ...rest,
                        });
                    });
                    // controlsArray.push({
                    //     rowData: controls,
                    //     ...rest,
                    // });
                }
            });
        }
        setMitigationsData(mitigationsAraay);
        setDefensesData(defensesArray);
        setControlsData(controlsArray);
    }, []);

    const getThreatCoverageData = useCallback(async () => {
        if (entityIDs && entityIDs.length > 0) {
            const response = await dispatch(getThreatCoverage({ selectedIds: entityIDs })).unwrap();
            await setThreateCoverageContentData(response);
        }
    }, [entityIDs, dispatch, setThreateCoverageContentData]);

    const updateThreatCoverageData = useCallback(
        (typeId, type, field, updateValue, row, setData) => {
            setData((pre) => {
                const updatedData = pre.map((preData) => {
                    if (preData.row.id === typeId) {
                        return {
                            ...preData,
                            row: {
                                ...preData.row,
                                coverage: {
                                    ...preData.row.coverage,
                                    [field]: updateValue,
                                },
                            },
                        };
                    }
                    return { ...preData };
                });
                return updatedData;
            });
            setRequestObject((prevObject) => {
                const updatedObject = { ...prevObject };
                let typeArray = updatedObject[type];
                if (!typeArray) {
                    typeArray = [];
                    updatedObject[type] = typeArray;
                }
                const itemIndex = typeArray.findIndex((item) => item.id === typeId);
                const newItem = {
                    id: row.id,
                    coverage: {
                        ...row.coverage,
                        [field]: updateValue,
                    },
                };
                if (itemIndex === -1) {
                    typeArray.push(newItem);
                } else {
                    typeArray[itemIndex] = newItem;
                }
                return updatedObject;
            });
        },
        [setRequestObject]
    );

    const onTabClick = (id) => {
        setselectedTab(id);
    };

    useEffect(() => {
        if (entityIDs && entityIDs.length >= 1) {
            const requestIds = entityIDs.map((item) => item.id);
            getThreatCoverageData();
            setRequestObject((pre) => {
                return { ...pre, ids: requestIds };
            });
        }
        return () => {
            // dispatch(resetThreatCoverageData());
        };
    }, [getThreatCoverageData, dispatch, entityIDs]);

    return (
        <>
            <div className="TID-ThreatCoverage-ParentTabs">
                {loading && <SpinnerLoader />}

                {!loading && Object.keys(threatCoverageData).length > 1 && (
                    <TabComponent id="TID-tab-threat" selectedItem={selectedTab}>
                        <div className="e-tab-header" id="TID-Mitgation">
                            <div id="TID-headers" className="Tid-Header-names" onClick={() => onTabClick(0)}>
                                Mitigation
                            </div>
                            <div className="Tid-Header-names" id="TID-headers" onClick={() => onTabClick(1)}>
                                Defenses
                            </div>
                            <div className="Tid-Header-names" id="TID-headers" onClick={() => onTabClick(2)}>
                                Controls
                            </div>
                        </div>

                        <div className="e-content" id="TID-Tab-Content">
                            <div>
                                {!loading && (!mitigationsData || mitigationsData.length <= 0) && (
                                    <p className="noData">No Data Found</p>
                                )}
                                {mitigationsData && mitigationsData.length > 0 && (
                                    <Trtd
                                        title="Mitigation"
                                        tableData={mitigationsData}
                                        type="mitigations"
                                        updateThreatCoverageData={updateThreatCoverageData}
                                        requestObject={requestObject}
                                        threatCoverageId={threatCoverageData?.id}
                                        setRequestObject={setRequestObject}
                                        setData={setMitigationsData}
                                        threatScoreData={threatCoverageData.threat_score}
                                        setThreateCoverageContentData={setThreateCoverageContentData}
                                    />
                                )}
                            </div>
                            <div>
                                {!loading && (!defensesData || defensesData.length <= 0) && (
                                    <p className="noData">No Data Found</p>
                                )}
                                {defensesData && defensesData.length > 0 && (
                                    <Trtd
                                        title="Defenses"
                                        tableData={defensesData}
                                        type="defenses"
                                        updateThreatCoverageData={updateThreatCoverageData}
                                        requestObject={requestObject}
                                        threatCoverageId={threatCoverageData?.id}
                                        setRequestObject={setRequestObject}
                                        setData={setDefensesData}
                                        threatScoreData={threatCoverageData.threat_score}
                                        setThreateCoverageContentData={setThreateCoverageContentData}
                                    />
                                )}
                            </div>
                            <div>
                                {!loading && (!controlsData || controlsData.length <= 0) && (
                                    <p className="noData">No Data Found</p>
                                )}
                                {controlsData && controlsData.length > 0 && (
                                    <Trtd
                                        title="Controls"
                                        tableData={controlsData}
                                        type="controls"
                                        updateThreatCoverageData={updateThreatCoverageData}
                                        requestObject={requestObject}
                                        threatCoverageId={threatCoverageData?.id}
                                        setRequestObject={setRequestObject}
                                        setData={setControlsData}
                                        threatScoreData={threatCoverageData.threat_score}
                                        setThreateCoverageContentData={setThreateCoverageContentData}
                                    />
                                )}
                            </div>
                        </div>
                    </TabComponent>
                )}
            </div>

            {!loading && Object.keys(threatCoverageData).length === 0 && (
                <p className="noData">No Data Found</p>
            )}
        </>
    );
};

export default TIDTabs;
