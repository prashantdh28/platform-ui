import React, { useCallback, useEffect, useState } from "react";
import DynamicButton from "../../../../Components/Button/ButtonBox";
// import { Data } from "../../TIDData/Data";
import { Button } from "@mui/material";
import CoaModal from "./TableModals/CoaModal";
import { useDispatch } from "react-redux";
// import SubControlModal from "./TableModals/SubControlModal";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./Trtd.css";
import { List, AutoSizer } from "react-virtualized";
import ThreatCoverageTableRow from "./ThreatCoverageTableRow";
import useToastify from "../../../../Hooks/useToastify";
import ThreatScoreModal from "./TableModals/ThreatScoreModal";
import { getPercentageColor } from "../../../../helper/percentageColorHelper";
import { updateThreatCoverage } from "../../../../Services/TID/threatCoverage.service";

const Trtd = ({
  title,
  type,
  setData,
  tableData,
  requestObject,
  threatScoreData,
  threatCoverageId,
  setRequestObject,
  updateThreatCoverageData,
  setThreateCoverageContentData,
  // onSaveClick
}) => {
    const dispatch = useDispatch();

    const { showToast } = useToastify();

    const [open, setOpen] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    // const [subControlModalOpen, setSubControlModalOpen] = useState(false);
    // const [selectedRowData, setSelectedRowData] = useState(null);

    // const flattenedData = tableData.reduce((acc, item) => {
    //     return acc.concat(item.rowData);
    // }, []);

    // const handleOpenSubControlModal = (rowData) => {
    //     setSubControlModalOpen(true);
    //     setSelectedRowData(rowData);
    // };

    // const handleCloseSubControlModal = () => {
    //     setSubControlModalOpen(false);
    // };

    const checkIsUpdated = useCallback(() => {
        const hasUpdates =
            requestObject &&
            (requestObject.mitigations.length !== 0 ||
                requestObject.controls.length !== 0 ||
                requestObject.defenses.length !== 0);
        setIsUpdated(hasUpdates);
    }, [requestObject]);

    useEffect(() => {
        checkIsUpdated();
    }, [checkIsUpdated]);

    const handleOpenCOA = () => {
        setOpen(true);
    };

    const handleCloseCOA = () => {
        setOpen(false);
    };

    const rowRenderer = ({ index, key, style }) => {
        const { row, ...rest } = tableData[index];
        return (
            <div key={key} style={style}>
                <ThreatCoverageTableRow
                    item={rest}
                    row={row}
                    title={title}
                    type={type}
                    updateThreatCoverageData={updateThreatCoverageData}
                    setData={setData}
                />
            </div>
        );
    };

    const onSaveClick = async () => {
        const response = await dispatch(updateThreatCoverage({ requestObject, threatCoverageId })).unwrap();
        if (response.content && response.content.length > 0) {
            await setThreateCoverageContentData(response);
            setRequestObject((pre) => {
                return { ...pre, mitigations: [], controls: [], defenses: [] };
            });
            showToast("Threat Coverage Data is updated", { type: "success" });
        }
    };

    return (
        <div className="Coa-grid-container">
            <div className="report-table-header">
                <div className="TID-COA-Header-Section">
                    <span
                        className="TID-COA-percentage"
                        style={{
                            color: getPercentageColor(threatScoreData?.coverage_score),
                        }}
                    >
                        {threatScoreData?.coverage_score}%
                    </span>
                    <span id="TID-COA-table-threatCoverage">Threat Coverage</span>
                    <ThreatScoreModal threatScoreData={threatScoreData}>
                        <AiOutlineInfoCircle
                            style={{
                                fontSize: "16px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "grey",
                            }}
                        />
                    </ThreatScoreModal>
                </div>
                <div className="TID-button-div">
                    <Button
                        variant="outlined"
                        onClick={handleOpenCOA}
                        style={{
                            padding: "8px 16px",
                            width: "13rem",
                            boxShadow: "none",
                            color: "var(--name-email)",
                            borderColor: "var(--name-email)",
                        }}
                    >
                        Add Product Stack
                    </Button>
                    {isUpdated ? (
                        <DynamicButton label="Save" onClick={onSaveClick} className="risk-score" />
                    ) : (
                        <DynamicButton label="RISK MATRIX" to="/tid/risk-score" className="risk-score" />
                    )}
                </div>
            </div>
            <div className="TID-table-header ">
                <span>Entities</span>
                <span>Technique</span>
                <span>{title}</span>
                <span colSpan="3">Details</span>
            </div>
            <div className="threatCoverage-child-headers TID-table-sub-header">
                <span />
                <span className="TID-SubHeaders-seperate" id="TID-SubHeaders-seperate-state">
                    State
                </span>
                <span id="TID-SubHeaders-seperate-comment" className="TID-SubHeaders-seperate">
                    Additional Comment
                </span>
                <span id="TID-SubHeaders-seperate-comment" className="TID-SubHeaders-seperate">
                    Supporting Product Stack
                </span>
            </div>
            <div style={{ height: "80vh", width: "calc(100% + 0.5rem)" }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={tableData.length}
                            rowHeight={200}
                            rowRenderer={rowRenderer}
                        />
                    )}
                </AutoSizer>
            </div>

            <CoaModal open={open} handleCloseCOA={handleCloseCOA} />
            {/* <SubControlModal
                open={subControlModalOpen}
                handleCloseSubControlModal={handleCloseSubControlModal}
                // rowData={selectedRowData}
            /> */}
            {/* <RichTextModal open={richTextModal} close={handleCloseTextEditor} /> */}
        </div>
    );
};

export default Trtd;
