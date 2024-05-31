import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { TbDownload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DynamicButton from "../../../Components/Button/ButtonBox";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import RichTextEditor from "../../../Components/RichTextEditor/RichTextEditor";
import { useQuery } from "../../../Hooks/useQuery";
import useToastify from "../../../Hooks/useToastify";
import { getThreatCoverageReport, saveThreatCoverageReport } from "../../../Services/TID/tid.service";
import "./DownloadReport.css";

const buttonData = [
    {
        label: "Executive Summary",
        value: "ExecutiveSummary",
    },
    {
        label: "Threat Coverage",
        value: "ThreatCoverage",
    },
    {
        label: "Risk",
        value: "Risk",
    },
    {
        label: "Detection",
        value: "Detection",
    },
];

const DownloadReport = () => {
    const dispatch = useDispatch();

    let query = useQuery().get("type");

    const navigate = useNavigate();

    const { showToast } = useToastify();

    const [threatCoverageReport, setThreatCoverageReport] = useState({});

    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    const { threatCoverageReportData: data, loading } = useSelector((state) => state.TIDEntity);

    const onReportChange = (value) => {
        setThreatCoverageReport(value);
    };

    const onSaveReportClick = async () => {
        const requestObject = {
            content: threatCoverageReport,
            report_type: "THREAT_COVERAGE",
        };
        const response = await dispatch(
            saveThreatCoverageReport({ reportID: data.id, requestObject })
        ).unwrap();
        if (response && response.content) {
            showToast("Report saved successfully", { type: "success" });
        }
    };

    const handleClick = () => {
        navigate(`template?type=${query}&id=${data.id}`);
    };

    //   const downloadThreatCoverageReport = async () => {
    //     const response = await downloadThreatCoverageReportData({
    //       template_id: "template--41d30d74-2fb7-4675-8132-26d03de635b3",
    //       report_id: data.id,
    //     });
    //     const blob = new Blob([response], { type: "text/html" });
    //     const link = document.createElement("a");
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = "threat_coverage_report.html";
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   };

    const getThreatCoverageReportData = useCallback(async () => {
        if (entityIDs && entityIDs.length > 0) {
            const response = await dispatch(getThreatCoverageReport({ selectedIds: entityIDs })).unwrap();
            if (response) {
                setThreatCoverageReport(response.content || []);
            }
        }
    }, [entityIDs, dispatch]);

    const onButtonClick = async (type) => {
        navigate(`/tid/download?type=${type}`);
        // await getThreatCoverageReportData();
    };
    useEffect(() => {
        if (entityIDs && entityIDs.length >= 1 && query) {
            getThreatCoverageReportData();
        }
        return () => {
            // dispatch(resetDetectionInfoData());
        };
    }, [getThreatCoverageReportData, entityIDs, query]);

    return (
        <>
            <div id="TID-DOwnload-type-btn" style={{ height: `${query ? "100%" : "calc(100vh - 50vh)"}` }}>
                {buttonData &&
                    buttonData.length > 0 &&
                    buttonData.map((button, index) => {
                        if (!query) {
                            return (
                                <Button
                                    variant="outlined"
                                    style={{
                                        padding: "8px 22px 8px 22px",
                                        width: "auto",
                                        height: "auto",
                                        boxShadow: "none",
                                        color: BackgroundColor,
                                        borderColor: BackgroundColor,
                                    }}
                                    key={index}
                                    onClick={() => onButtonClick(button.value)}
                                >
                                    {button.label}
                                </Button>
                            );
                        } else {
                            if (query === button.value) {
                                return (
                                    <Button
                                        variant="outlined"
                                        style={{
                                            padding: "8px 22px 8px 22px",
                                            width: "auto",
                                            height: "auto",
                                            boxShadow: "none",
                                            color: "#FFFFFF",
                                            borderColor: BackgroundColor,
                                            background: BackgroundColor,
                                        }}
                                        key={index}
                                        onClick={() => onButtonClick(button.value)}
                                    >
                                        {button.label}
                                    </Button>
                                );
                            }
                        }
                        return null;
                    })}
            </div>
            {loading && <SpinnerLoader />}

            {query && threatCoverageReport && threatCoverageReport.length > 0 && (
                <div className="TID-finish-download">
                    <div id="TID-Download-SAVE-Preview">
                        <div className="TID-Preview-Download">
                            <Button
                                variant="outlined"
                                style={{
                                    padding: "8px 22px 8px 22px",
                                    width: "112px",
                                    height: "40px",
                                    boxShadow: "none",
                                    color: BackgroundColor,
                                    // && ColorOptions.YELLOW
                                    //   ? TextColor.BLACK
                                    //   : TextColor.WHITE,
                                    //   BackgroundColor === ColorOptions.YELLOW
                                    //     ? TextColor.BLACK
                                    //     : TextColor.WHITE,
                                    // borderColor: ColorOptions.YELLOW
                                    //   ? TextColor.BLACK
                                    //   : TextColor.WHITE,
                                    borderColor: BackgroundColor,
                                }}
                            >
                                PREVIEW
                            </Button>

                            <Button
                                variant="outlined"
                                // onClick={downloadThreatCoverageReport}
                                onClick={handleClick}
                                style={{
                                    padding: "8px, 22px, 8px, 22px",
                                    width: "142",
                                    height: "40px",
                                    boxShadow: "none",
                                    color: "var(--name-email)",
                                    borderColor: "var(--grey-color)",
                                    gap: "0px",
                                }}
                                startIcon={<TbDownload style={{ color: "var(--name-email)" }} />}
                            >
                                Download
                            </Button>
                        </div>
                    </div>

                    <RichTextEditor height="25rem" value={threatCoverageReport} onChange={onReportChange} />
                    <div id="TID-download-Goback">
                        <DynamicButton
                            className="Goback-button"
                            //   onClick={handleClick}
                            to="/tid/download"
                            label="Go Back"
                        />
                        <Button
                            variant="outlined"
                            onClick={onSaveReportClick}
                            style={{
                                padding: "8px 22px 8px 22px",
                                width: "112px",
                                height: "40px",
                                boxShadow: "none",
                                color: BackgroundColor,
                                //   BackgroundColor === ColorOptions.YELLOW
                                //     ? TextColor.BLACK
                                //     : TextColor.WHITE,
                                // borderColor: ColorOptions.YELLOW
                                //   ? TextColor.BLACK
                                //   : TextColor.WHITE,
                                borderColor: BackgroundColor,
                            }}
                        >
                            SAVE
                        </Button>
                    </div>
                </div>
            )}
            {!loading && (!threatCoverageReport || threatCoverageReport.length <= 0) && (
                <p className="noData">No Data Found</p>
            )}
        </>
    );
};

export default DownloadReport;
