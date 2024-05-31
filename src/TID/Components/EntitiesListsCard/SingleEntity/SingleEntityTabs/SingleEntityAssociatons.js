import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Sort } from "@syncfusion/ej2-react-grids";
import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as CampaignImage } from "../../../../../Assests/SVG/Campaign.svg";
import { ReactComponent as IntrusionImage } from "../../../../../Assests/SVG/IntrusionSet.svg";
import { ReactComponent as MalwareImage } from "../../../../../Assests/SVG/Malware.svg";
import { ReactComponent as ReportImage } from "../../../../../Assests/SVG/ReportIcon.svg";
import { ReactComponent as Threat } from "../../../../../Assests/SVG/ThreatActor.svg";
import { ReactComponent as ToolImage } from "../../../../../Assests/SVG/Tool.svg";
import CustomMarkdownTag from "../../../../../Components/Markdown/CustomMarkDown";

import { useNavigate } from "react-router-dom";

const SingleEntityAssociatons = ({ data }) => {
    const navigate = useNavigate();

    let gridReportData = [];
    if (Object.keys(data).length > 0) {
        for (let i = 0; i < Object.keys(data).length; i++) {
            const element = Object.keys(data)[i];

            if (data[element].length > 0) {
                for (let j = 0; j < data[element].length; j++) {
                    const typeData = data[element][j];
                    gridReportData.push({ ...typeData });
                }
            }
        }
    }

    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    return (
        <>
            <div className="SingleEntity-Report-table-bg">
                <div className="activity-text">
                    <h2 id="activity">Reports</h2>
                </div>

                <div className="custom-grid-container">
                    <GridComponent
                        dataSource={gridReportData}
                        allowPaging={true}
                        allowSorting={true}
                        className="custom-grid"
                        // enableVirtualization={true}
                        enableHover={false}
                        allowTextWrap={true}
                        allowSelection={false}
                    >
                        <ColumnsDirective className="grid-table-column">
                            <ColumnDirective
                                // field="Type"
                                //   headerText="Report Title"
                                width="20%"
                                textAlign="Left"
                                headerTextAlign="Left"
                                template={(props) => {
                                    return (
                                        <>
                                            {props.type === "tool" ? (
                                                <ToolImage className="profile-img-card" />
                                            ) : props.type === "campaign" ? (
                                                <CampaignImage className="profile-img-card" />
                                            ) : props.type === "malware" ? (
                                                <MalwareImage className="profile-img-card" />
                                            ) : props.type === "intrusion-set" ? (
                                                <IntrusionImage className="profile-img-card" />
                                            ) : props.type === "report" ? (
                                                <ReportImage className="profile-img-card" />
                                            ) : (
                                                <Threat className="profile-img-card profileCardImg" />
                                            )}
                                        </>
                                    );
                                }}
                            />

                            <ColumnDirective
                                field="name"
                                headerText="Entity Name"
                                width="20%"
                                textAlign="Left"
                                headerTextAlign="Left"
                                template={(props) => {
                                    const handleTitleClick = () => {
                                        setTimeout(() => {
                                            navigate(`/tid/${props?.id}`);
                                        }, 300);
                                    };
                                    return (
                                        <div
                                            style={{
                                                cursor: "pointer",
                                                color: BackgroundColor,
                                                textDecoration: "underline",
                                            }}
                                            onClick={handleTitleClick}
                                        >
                                            {props?.name}
                                        </div>
                                    );
                                }}
                            />
                            <ColumnDirective
                                field="attribution_type"
                                headerText="Relationship"
                                textAlign="Left"
                                width="20%"
                            />
                            <ColumnDirective
                                field="description"
                                headerText="Description"
                                headerTextAlign="Center"
                                textAlign="Left"
                                allowSorting={false}
                                template={(props) => {
                                    return <CustomMarkdownTag content={props.description} />;
                                }}
                            />
                        </ColumnsDirective>
                        <Inject services={[Sort]} />
                    </GridComponent>
                </div>
            </div>
        </>
    );
};

export default SingleEntityAssociatons;
