import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";
import { useDispatch } from "react-redux";
import RenderChips from "../../../../Components/Common/RenderChips";
import CustomMarkDownDailogueBox from "../../../../Components/Custom/CustomMarkDownDailogueBox";
import CustomTooltip from "../../../../Components/Custom/CustomTooltip";
import CustomMarkdownTag from "../../../../Components/Markdown/CustomMarkDown";
import useToastify from "../../../../Hooks/useToastify";
import { getDetectionQueries, getHuntQueries } from "../../../../Services/TID/detection.service";
import { downloadDetectionRules } from "../../../../Services/TID/tid.service";
import AnalyticsPieChart from "./AnalyticsPieChart";
import HuntResult from "./ResultScreen/HuntResult";
import RulesListDailogue from "./RulesListDailogue";
import { ReactComponent as Hunt } from "../../../../Assests/SVG/hunt.svg";
import { ReactComponent as Detect } from "../../../../Assests/SVG/detect.svg";

const AnalyticsCard = ({ data, handleHuntResult }) => {
    const { showToast } = useToastify();
    const dispatch = useDispatch();
    const borderColorForNumber = (type) => {
        switch (type) {
            case "SIGMA":
                return "rgba(0, 130, 249, 1)";
            case "SPLUNK":
                return "rgba(102, 226, 151, 1)";
            case "ES":
                return "rgba(241, 201, 80, 1)";

            default:
                return null;
        }
    };
    const onDownloadDetectionRulesChange = async (techniqueIds, techniqueName) => {
        const response = await downloadDetectionRules(techniqueIds);
        const blob = new Blob([response], { type: "application/zip" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${techniqueIds}_${techniqueName}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("The download process has been completed successfully.", {
            type: "success",
        });
    };
    const handleSubmitHuntData = (type, data) => {
        dispatch(getHuntQueries({ type, data }));
    };
    const handleSubmitDetectionData = (type, data) => {
        dispatch(getDetectionQueries({ type, data }));
    };

    return (
        <div className="analytics-card-container">
            <div className="left-part-analytics-card">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <div className="left-part-analytics-header">
                        <CustomMarkDownDailogueBox
                            ShowDes={false}
                            textForOpenModal={`${data?.technique_id} - ${data?.technique_name} `}
                            content={data?.technique_description}
                            headerName={`${data?.technique_id} - ${data?.technique_name} `}
                            readMoreChars={200}
                            customClassNames="control-desc-hunt"
                            color="rgba(142, 151, 164, 1)"
                            classForDailogueBox="control-desc-dailogue-box"
                            classForDailogueContent="control-desc-dailogue-content-hunt"
                        />
                        {/* <div
                        style={{ textDecoration: "underline", fontWeight: "400" }}
                    >{`${data?.technique_id} - ${data?.technique_name} `}</div> */}
                        <CustomTooltip title="Download">
                            <IconButton
                                onClick={() =>
                                    onDownloadDetectionRulesChange(data?.technique_id, data?.technique_name)
                                }
                            >
                                <FileDownloadOutlinedIcon
                                    sx={{
                                        border: "2px solid rgba(255, 255, 255, 0.24)",
                                        borderRadius: "6px",
                                        fill: "#fff",
                                        fontSize: "1.5rem",
                                        padding: "0.2rem",
                                    }}
                                />
                            </IconButton>
                        </CustomTooltip>
                    </div>
                    <div className="left-card-content">
                        <div className="left-card-content-graph">
                            <AnalyticsPieChart graphData={data?.count} />
                        </div>
                        <div className="left-card-content-names">
                            {data?.count?.length > 0 &&
                                data?.count?.map((src, index) => (
                                    <span className="names-and-count" key={index}>
                                        {src.source}{" "}
                                        <RulesListDailogue
                                            techniqueId={data?.technique_id}
                                            headline={src?.source}
                                            width="auto"
                                            fullWidth="auto"
                                        >
                                            <CustomTooltip title={`View RuleList of ${src.source}`}>
                                                <span
                                                    className="num-of-analytics"
                                                    style={{
                                                        borderColor: borderColorForNumber(src.source),
                                                    }}
                                                >
                                                    {src.count}
                                                </span>
                                            </CustomTooltip>
                                        </RulesListDailogue>
                                    </span>
                                ))}
                            {data?.count?.length < 1 && (
                                <>
                                    <span className="names-and-count">
                                        SIGMA
                                        <span className="num-of-analytics">0</span>
                                    </span>
                                    <span className="names-and-count">
                                        SPLUNK
                                        <span className="num-of-analytics">0</span>
                                    </span>
                                    <span className="names-and-count">
                                        ES
                                        <span className="num-of-analytics">0</span>
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="names-for-detection">Platforms</div>
                    {data?.platforms && data?.platforms.length > 0 ? (
                        <div style={{ marginLeft: "-0.6rem" }}>
                            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <RenderChips
                                    title="Platforms"
                                    chipsData={data?.platforms.map((item) => ({ name: item }))}
                                    length={3}
                                    item={true}
                                />
                            </div>
                        </div>
                    ) : (
                        <span className="names-for-detection"> No data Availble</span>
                    )}
                </div>
            </div>
            <div className="right-part-analytics-card">
                <div className="platforms-container">
                    {/* <div>
                      <div className="names-for-detection">Platforms</div>
                      <div style={{ marginLeft: "-0.6rem" }}>
                          <>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                  <RenderChips
                                      title="Platforms"
                                      chipsData={data?.platforms.map((item) => ({ name: item }))}
                                      length={3}
                                      item={true}
                                  />
                              </div>
                          </>
                      </div>
                  </div> */}

                    <div>
                        <h4 className="names-for-detection">Detection Details</h4>
                        {data?.detection_info ? (
                            <div className="tech-usage-card-desc">
                                <CustomMarkDownDailogueBox
                                    ShowDes={true}
                                    textForOpenModal="...read more"
                                    content={data?.detection_info}
                                    headerName={`${data?.technique_id} - ${data?.technique_name} `}
                                    readMoreChars={300}
                                    customClassNames="control-desc"
                                    color="rgba(142, 151, 164, 1)"
                                    classForDailogueBox="control-desc-dailogue-box"
                                    classForDailogueContent="control-desc-dailogue-content-hunt"
                                />
                            </div>
                        ) : (
                            <span className="names-for-detection"> No data Availble</span>
                        )}
                    </div>
                    <div>
                        <div className="names-for-detection">Data Source</div>
                        {data?.data_source && data?.data_source.length > 0 ? (
                            <div style={{ marginLeft: "-0.6rem" }}>
                                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                    <RenderChips
                                        title="Data Source"
                                        chipsData={data?.data_source.map((item) => ({ name: item }))}
                                        length={2}
                                        item={true}
                                    />
                                </div>
                            </div>
                        ) : (
                            <span className="names-for-detection"> No data Availble</span>
                        )}
                    </div>
                </div>
                <div>
                    <Divider
                        orientation="vertical"
                        sx={{
                            height: "85%",
                            margin: "1rem 0rem 1rem 0rem",
                            width: "2px",
                            background: "#1E2B40",
                        }}
                    />
                </div>
                <div style={{ padding: "1rem 1rem 0rem", width: "60%" }}>
                    {/* <div className="names-for-detection">
                        Technique usage
                        <CustomTooltip title="Technique Usage">
                            <InfoOutlinedIcon
                                sx={{ color: "rgba(142, 151, 164, 1)", marginLeft: "0.4rem" }}
                            />
                        </CustomTooltip>
                    </div> */}
                    <div
                        style={{
                            maxHeight: "20rem",
                            overflow: "auto",
                        }}
                    >
                        {data?.usage && data?.usage.length > 0 ? (
                            data?.usage?.map((use, index) => {
                                return (
                                    <div className="tech-usage-card" key={index}>
                                        <div className="tech-usage-card-header">
                                            <div>{use.name}</div>
                                            <div className="tech-usage-card-header-hunt-detect">
                                                <HuntResult
                                                    headline="Choose the most appropriate Query Language"
                                                    submitBtnName="Generate HUNT Query"
                                                    data={data}
                                                    ThreatData={use}
                                                    options={["kql", "aql", "fql"]}
                                                    type="Hunt"
                                                    handleSubmitData={handleSubmitHuntData}
                                                >
                                                    <CustomTooltip title="Generate Hunt Queries">
                                                        {/* <div>Hunt</div> */}
                                                        <Hunt style={{ width: "1.5rem", height: "1.5rem" }} />
                                                    </CustomTooltip>
                                                </HuntResult>

                                                <HuntResult
                                                    headline="Please Select the DETECTION Query Format"
                                                    submitBtnName="Generate DETECTION Query"
                                                    data={data}
                                                    ThreatData={use}
                                                    options={["sigma", "elesticsearch", "splunk"]}
                                                    type="Detection"
                                                    handleSubmitData={handleSubmitDetectionData}
                                                >
                                                    <CustomTooltip title="Generate Detect Queries">
                                                        <Detect
                                                            style={{ width: "1.5rem", height: "1.5rem" }}
                                                        />
                                                    </CustomTooltip>
                                                </HuntResult>
                                            </div>
                                        </div>
                                        <div className="tech-usage-card-desc">
                                            <CustomMarkdownTag content={use?.usage} readMoreChars={200} />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <span className="names-for-detection"> No data Availble</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCard;
