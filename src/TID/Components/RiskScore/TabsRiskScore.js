import { TabComponent } from "@syncfusion/ej2-react-navigations";
import React, { useCallback, useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
// import useToastify from "../../../Hooks/useToastify";
import { getRiskScoreByThreatCoverage } from "../../../Services/TID/tid.service";
import RiskScore from "../RiskScore/RiskScore";
import "./RiskScore.css";

const TabsRiskScore = () => {
    const dispatch = useDispatch();

    // const { showToast } = useToastify();

    const [tabsData, setTabsData] = useState([]);

    const threatCoverageID = useSelector((state) => state.threatCoverage.threatCoverageData).id;
    const { loading } = useSelector((state) => state.TIDEntity);

    const getRiskScoreByThreatCoverageData = useCallback(async () => {
        if (threatCoverageID) {
            const response = await dispatch(
                getRiskScoreByThreatCoverage({ threatCoverageID: threatCoverageID })
            ).unwrap();
            if (response) {
                let tabsData = {};
                // const business_objectives =
                //     response.business_objectives && response.business_objectives.length > 0
                //         ? response.business_objectives
                //         : [];
                // for (let i = 0; i < business_objectives.length; i++) {
                //     const objective = business_objectives[i];
                const objectiveFunction =
                    response.functions && response.functions.length > 0 ? response.functions : [];
                for (let j = 0; j < objectiveFunction.length; j++) {
                    const item = objectiveFunction[j];
                    if (tabsData[item["function"]]) {
                        // const { columns, data } = tabsData[item["function"]];
                        const { data } = tabsData[item["function"]];
                        const objectiveData =
                            item &&
                            item.categories.map((category, index) => {
                                const subcategories =
                                    category.subcategories && category.subcategories.length > 0
                                        ? category.subcategories
                                        : [];
                                const subcategoryData = subcategories.map((subcategory) => {
                                    return { ...subcategory };
                                });
                                return {
                                    ...data[index],
                                    subcategories: subcategoryData,
                                };
                            });
                        tabsData[item["function"]] = {
                            // columns: [...columns, { header: objective.name, key: objective.name }],
                            data: objectiveData,
                        };
                    } else {
                        const objectiveData =
                            item &&
                            item.categories.map((category) => {
                                const subcategories =
                                    category.subcategories && category.subcategories.length > 0
                                        ? category.subcategories
                                        : [];
                                const subcategoryData = subcategories.map((subcategory) => {
                                    return { ...subcategory };
                                });
                                return {
                                    name: category.name,
                                    description: category.description,
                                    subcategories: subcategoryData,
                                };
                            });
                        tabsData[item["function"]] = {
                            // columns: [{ header: objective.name, key: objective.name }],
                            data: objectiveData || [],
                        };
                    }
                }
                // }
                setTabsData(tabsData);
            }
        } else {
            // showToast("Please select Entity", { type: "warning" });
        }
    }, [threatCoverageID, dispatch]);

    useEffect(() => {
        if (threatCoverageID) {
            getRiskScoreByThreatCoverageData();
        } else {
            // showToast("Please generate threat coverage first", { type: "warning" });
        }
        return () => {
            // dispatch(resetThreatCoverageData());
        };
    }, [dispatch, threatCoverageID, getRiskScoreByThreatCoverageData]);

    return (
        <>
            {loading && <SpinnerLoader />}

            {!loading && tabsData && Object.keys(tabsData).length > 0 && (
                <TabComponent id="TID-tab-RiskScore" style={{ paddingTop: "2.5rem" }}>
                    <div className="e-tab-header" id="TID-riskscore-tab">
                        {tabsData &&
                            Object.keys(tabsData).length > 0 &&
                            Object.keys(tabsData).map((tab, index) => {
                                return (
                                    <div key={index} className="tab-header-icon">
                                        <div className="Riskscore-Header-names">
                                            {tab && tab.split(" ")[0]}
                                            <BsExclamationCircle id="tab-iconcolor" />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="e-content" id="TID-Tab-Content">
                        {tabsData &&
                            Object.keys(tabsData).length > 0 &&
                            Object.keys(tabsData).map((tab, index) => {
                                return (
                                    <div key={index}>
                                        <RiskScore data={tabsData[tab].data} />
                                    </div>
                                );
                            })}
                    </div>
                </TabComponent>
            )}
        </>
    );
};

export default TabsRiskScore;
