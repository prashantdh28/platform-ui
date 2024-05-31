import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {
    ColumnDirective,
    ColumnsDirective,
    GridComponent,
    Inject,
    Resize,
    VirtualScroll,
} from "@syncfusion/ej2-react-grids";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import InputChips from "../../../Components/Chips/InputChips/InputChips";
import MarkDownDialogeBox from "../../../Components/Markdown/MarkDownDialogeBox";
import { downloadDetectionRules } from "../../../Services/TID/tid.service";
import "./DetectionTable.css";
import RulesListDialog from "./RulesListDialog";

const DetectionTable = ({ data }) => {
    const navigate = useNavigate();

    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    const onDownloadDetectionRules = async (techniqueIds, techniqueName) => {
        const response = await downloadDetectionRules(techniqueIds);
        const blob = new Blob([response], { type: "application/zip" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${techniqueIds}_${techniqueName}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleClick = async () => {
        navigate("/tid/create-rule");
    };

    return (
        <div className="detection-table-container">
            <GridComponent
                cssClass="detection-table"
                dataSource={data}
                allowTextWrap={true}
                allowSelection={false}
                gridLines="Default"
                id="TID-detection-table"
                enableHover={false}
                enableVirtualization={true}
                height={500}
            >
                <Inject services={[VirtualScroll]} />
                <ColumnsDirective>
                    <ColumnDirective
                        headerText="Entities"
                        field="entities"
                        headerTextAlign="Center"
                        // width="auto"
                        columnData={true}
                        // minWidth="450"
                        // autoFit={true}
                        template={(props) => {
                            return (
                                <div className="Detection-Table-Chips">
                                    <InputChips
                                        id="TID-Detection-inputChips"
                                        chipsData={props.entities}
                                        style={{ width: "auto" }}
                                    />
                                </div>
                            );
                        }}
                    />
                    <ColumnDirective
                        headerText="Technique"
                        headerTextAlign="Center"
                        textAlign="Center"
                        field="technique_name"
                        template={(props) => {
                            return (
                                <div className="detection-field">
                                    <span id="TID-ThreateCoverage-TechniqueID">{props.technique_id}</span>
                                    <span id="TID-ThreateCoverage-TechniqueName">
                                        {/* {props.technique_name} */}
                                        <MarkDownDialogeBox
                                            content={props?.technique_name}
                                            dailogContet={props?.technique_description}
                                            //   readMoreChars={50}
                                            customClassNames="TreatCoverage-Mitigation-Dialogebox"
                                            headerName={`${props?.technique_id} - ${props?.technique_name}`}
                                        />
                                    </span>

                                    {/* <MarkDownDialogeBox
                    content={props.technique_description}
                    headerName={`${props.technique_id} - ${props.technique_name}`}
                    customClassNames="TID-DetectionTable"
                    readMoreChars={150}
                  /> */}
                                </div>
                            );
                        }}
                    />
                    <ColumnDirective
                        headerText="Detection Details"
                        headerTextAlign="Center"
                        field="detection_info"
                        template={(props) => {
                            return (
                                <MarkDownDialogeBox
                                    content={props.detection_info}
                                    headerName={`${props.technique_id} - ${props.technique_name} `}
                                    readMoreChars={150}
                                    customClassNames="TreatCoverage-Mitigation-Dialogebox"
                                />
                            );
                        }}
                    />
                    <ColumnDirective
                        headerText="Platform"
                        headerTextAlign="Center"
                        textAlign="Center"
                        width="100"
                        field="platforms"
                        template={(props) => {
                            return (
                                <div className="detection-field">
                                    {props.platforms &&
                                        props.platforms.length > 0 &&
                                        props.platforms.map((platform, index) => (
                                            <div key={index}>{platform}</div>
                                        ))}
                                </div>
                            );
                        }}
                    />
                    <ColumnDirective
                        headerText="SIGMA"
                        headerTextAlign="Center"
                        textAlign="Center"
                        width="100"
                        field="#SIGMA"
                        template={(props) => {
                            const keyId = uuidv4();

                            const countData =
                                props.count &&
                                props.count.length > 0 &&
                                props.count.find((item) => item.source === "SIGMA");
                            return (
                                <RulesListDialog
                                    key={keyId}
                                    disabled={countData?.count ? false : true}
                                    techniqueId={props?.technique_id}
                                    headline="SIGMA"
                                    width="auto"
                                    fullWidth="auto"
                                >
                                    <div className="detection-field">
                                        <span className="link" style={{ color: BackgroundColor }}>
                                            {countData?.count ? countData?.count : "-"}
                                        </span>
                                    </div>
                                </RulesListDialog>
                            );
                        }}
                    />
                    ;
                    <ColumnDirective
                        headerText="Elastic Search"
                        headerTextAlign="Center"
                        textAlign="Center"
                        width="100"
                        field="ELASTIC_SEARCH"
                        template={(props) => {
                            const keyId = uuidv4();

                            const countData =
                                props.count &&
                                props.count.length > 0 &&
                                props.count.find((item) => item.source === "ES");
                            return (
                                <RulesListDialog
                                    key={keyId}
                                    disabled={countData?.count ? false : true}
                                    techniqueId={props?.technique_id}
                                >
                                    <div className="detection-field">
                                        <span className="link" style={{ color: BackgroundColor }}>
                                            {countData?.count ? countData?.count : "-"}
                                        </span>
                                    </div>
                                </RulesListDialog>
                            );
                        }}
                    />
                    ; ;
                    <ColumnDirective
                        headerText="Splunk"
                        headerTextAlign="Center"
                        textAlign="Center"
                        width="100"
                        field="#SIGMA3"
                        allowEditing="false"
                        template={(props) => {
                            const keyId = uuidv4();
                            const countData =
                                props.count &&
                                props.count.length > 0 &&
                                props.count.find((item) => item.source === "SPLUNK");
                            return (
                                <RulesListDialog
                                    key={keyId}
                                    disabled={countData?.count ? false : true}
                                    techniqueId={props?.technique_id}
                                >
                                    <div className="detection-field">
                                        <span className="link" style={{ color: BackgroundColor }}>
                                            {countData?.count ? countData?.count : "-"}
                                        </span>
                                    </div>
                                </RulesListDialog>
                            );
                        }}
                    />
                    ;
                    <ColumnDirective
                        headerText="Action"
                        headerTextAlign="Center"
                        textAlign="Center"
                        width="250"
                        template={(props) => {
                            return (
                                <div className="action-button-group">
                                    <ButtonComponent cssClass="e-outline create-rule-button">
                                        <FaPlus style={{ color: "var(--name-email)" }} />
                                        <span className="text" onClick={handleClick}>
                                            create rule
                                        </span>
                                    </ButtonComponent>
                                    <ButtonComponent
                                        cssClass="e-flat download-rule-button"
                                        iconCss="e-icons e-download"
                                        onClick={() =>
                                            onDownloadDetectionRules(
                                                props?.technique_id,
                                                props?.technique_name
                                            )
                                        }
                                    />
                                </div>
                            );
                        }}
                    />
                    ;
                </ColumnsDirective>
                <Inject services={[Resize]} />
            </GridComponent>
        </div>
    );
};

export default DetectionTable;
