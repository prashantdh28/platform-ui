import { TabComponent } from "@syncfusion/ej2-react-navigations";
import React from "react";
import { useSelector } from "react-redux";
import SpinnerLoader from "../../../../../Components/Loader/SpinnerLoader";
import MitreAttacks from "../../../../../Components/MitreAttacks/MitreAttacks";
import SingleEntityAssociatons from "./SingleEntityAssociatons";
import SingleEntityReport from "./SingleEntityReport";
import "./SingleEntityReport.css";

const SingleEntityTabs = ({ entityID }) => {
    const { attackMatrixData, attackMatrixLoading } = useSelector((state) => state.attackMatrix);
    const { content = [] } = attackMatrixData;

    const attributions = entityID?.attributions || {};

    return (
        <>
            <div className="TID-ThreatCoverage-ParentTabs">
                <TabComponent id="TID-tab">
                    <div className="e-tab-header" id="TID-Mitgation">
                        <div className="Tid-Header-names" id="TID-headers">
                            Reports
                        </div>
                        <div id="TID-headers" className="Tid-Header-names">
                            Attacks
                        </div>
                        <div id="TID-headers" className="Tid-Header-names">
                            Associations
                        </div>
                    </div>
                    <div className="e-content" id="TID-Tab-Content">
                        <div className="SingleEntity-Reports-Data">
                            <SingleEntityReport title="Reports" entityID={entityID} />
                        </div>
                        <div className="SingleEntity-Attacks-Data">
                            <div className="SingleEntity-Mitre-Data">
                                {attackMatrixLoading && <SpinnerLoader />}
                                {attackMatrixData &&
                                attackMatrixData.content &&
                                attackMatrixData.content.length > 0 ? (
                                    <MitreAttacks
                                        title="Attacks"
                                        data={content}
                                        isEntities={false}
                                        isSingle={true}
                                    />
                                ) : (
                                    <p className="noData">No Data Found</p>
                                )}
                            </div>
                        </div>
                        <div className="SingleEntity-Attacks-Data">
                            <div className="SingleEntity-Mitre-Data">
                                {attributions && Object.keys(attributions).length > 0 ? (
                                    <SingleEntityAssociatons data={attributions} />
                                ) : (
                                    <p className="noData">No Data Found</p>
                                )}
                            </div>
                        </div>
                    </div>
                </TabComponent>
            </div>
        </>
    );
};

export default SingleEntityTabs;
