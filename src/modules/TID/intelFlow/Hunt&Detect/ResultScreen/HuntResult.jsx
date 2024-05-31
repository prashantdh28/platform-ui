import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderChips from "../../../../../Components/Common/RenderChips";
import CustomLoadingButton from "../../../../../Components/Custom/CustomLoadingButton";
import CustomTooltip from "../../../../../Components/Custom/CustomTooltip";
import CustomMarkdownTag from "../../../../../Components/Markdown/CustomMarkDown";
import { resetHuntQueryData } from "../../../../../redux/Slice/TID/DetectionSlice";
import CustomMarkdownPreview from "../../../../../Components/Custom/CustomMarkdownPreview";

const HuntResult = ({
    children,
    handleHuntResult,
    headline,
    submitBtnName,
    data,
    ThreatData,
    options,
    handleSubmitData,
    type,
}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [addContext, setAddContext] = useState("");
    const [selectPlatform, setSelectPlatform] = useState([]);
    const [queryData, setQueryData] = useState({
        technique: data.technique_id,
        entity_type: ThreatData?.type,
        entity_name: ThreatData?.name,
        technique_usage: ThreatData?.usage,
        detection: data?.detection_info,
        platforms: selectPlatform,
        // data_sources: "",
        additional_context: "",
    });

    const { huntQueryData, loading } = useSelector((state) => state.detection);
    const title = `By Providing Additional Context you can customise the response to your specific needs. For example: 
  If you want to generate a Detection Query for Technique ${data?.technique_id} - ${data.technique_name}, then, in additional context, you can type the following: 
  detect for the deletion of file: C:\\ProgramData\\importantfile.dll
`;

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        if (!loading) {
            setOpen(!open);
            setAddContext("");
            setSelectedOption();
            dispatch(resetHuntQueryData());
        }
    };

    const onSelectPlatform = (e) => {
        if (selectPlatform.includes(e.name)) {
            setSelectPlatform((prevState) => prevState.filter((item) => item !== e.name));
        } else {
            setSelectPlatform((prevState) => [...prevState, e.name]);
        }
    };
    useEffect(() => {
        setQueryData((prevQueryData) => ({
            ...prevQueryData,
            platforms: selectPlatform,
        }));
    }, [selectPlatform]);

    const handleChnage = (e) => {
        setAddContext(e.target.value);
        setQueryData({
            technique: data.technique_id,
            entity_type: ThreatData?.type,
            entity_name: ThreatData?.name,
            technique_usage: ThreatData?.usage,
            detection: data?.detection_info,
            platforms: selectPlatform,
            additional_context: e.target.value,
        });
    };

    const handleOptionClick = (option) => {
        if (selectedOption === option) {
            setSelectedOption(null);
        } else {
            setSelectedOption(option);
        }
    };
    return (
        <div>
            <div onClick={handleOpen}>{children}</div>
            {/* <BackdropLoader loading={loading} style={{ zIndex: "9000" }} /> */}
            <Dialog
                open={open}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                maxWidth={"xl"}
                id="rule-list-container"
            >
                <DialogTitle
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignrows: "center",
                        padding: "1.2rem",
                        color: "white",
                        fontWeight: "400",
                    }}
                >
                    <div>{headline}</div>
                    {!loading && (
                        <div style={{ cursor: "pointer" }} onClick={handleClose}>
                            <CloseIcon sx={{ color: "white" }} />
                        </div>
                    )}

                    {/* </div> */}
                </DialogTitle>
                <DialogContent>
                    <div className="hunt-result-main">
                        <Divider
                            sx={{
                                background: "#1E2B40",
                                borderWidth: "2px",
                            }}
                        />
                        <div className="hunt-result-btn-box">
                            {options.map((option, index) => (
                                <div
                                    className="hunt-kql-box"
                                    style={{
                                        background: selectedOption === option ? "#0082F9" : "",
                                        color: selectedOption === option ? "white" : "",
                                        textTransform: "uppercase",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleOptionClick(option)}
                                    key={index}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                        {(huntQueryData || loading) && (
                            <div className="hunt-text-generate">
                                {loading ? "Generating " : "Generated "}
                                {""}
                                <span style={{ textTransform: "uppercase" }}>{selectedOption}</span> {type}{" "}
                                Query for...
                            </div>
                        )}
                        <div className="tech-threat-behaviour-main">
                            <div>
                                <div className="hunt-text-top">Technique</div>
                                <div className="hunt-tech-box">{`${data?.technique_id} - ${data.technique_name} `}</div>
                            </div>
                            <Divider
                                orientation="vertical"
                                sx={{
                                    height: "auto",
                                    background: "#1E2B40",
                                    border: "1px solid #1E2B40",
                                    width: "1px",
                                }}
                            />
                            <div>
                                <div className="hunt-text-top">Threat</div>
                                <div className="hunt-tech-box">{ThreatData?.name}</div>
                            </div>
                            <Divider
                                orientation="vertical"
                                sx={{
                                    height: "auto",
                                    background: "#1E2B40",
                                    border: "1px solid #1E2B40",
                                    width: "1px",
                                }}
                            />
                            <div>
                                <div className="hunt-text-top">Platform (You can select platforms.)</div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <RenderChips
                                        title="Platforms"
                                        chipsData={data.platforms.map((item) => {
                                            let isSelected =
                                                selectPlatform && selectPlatform.length > 0
                                                    ? selectPlatform.findIndex(
                                                          (selectedChip) => selectedChip === item
                                                      )
                                                    : -1;
                                            return {
                                                name: item,
                                                isSelected: isSelected !== -1 ? true : false,
                                            };
                                        })}
                                        length={2}
                                        item={true}
                                        onTechniqueClick={(e) => onSelectPlatform(e)}
                                        //   name={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="hunt-text-top">Detection</div>
                            <div className="hunt-tech-box">
                                <CustomMarkdownTag content={data?.detection_info} readMoreChars={140} />
                            </div>
                        </div>
                        <div>
                            <div className="hunt-text-top">Behavior</div>
                            <div className="hunt-tech-box">
                                <CustomMarkdownTag content={ThreatData?.usage} readMoreChars={250} />
                            </div>
                        </div>
                        <div className="hunt-context-main">
                            <div className="hunt-text-top" style={{ display: "flex", alignItems: "center" }}>
                                <div>Provide Additional Context </div>
                                <CustomTooltip title={title} style={{ fontSize: "2rem" }}>
                                    <InfoOutlinedIcon
                                        sx={{
                                            height: "1.2rem",
                                            color: "rgba(142, 151, 164, 1)",
                                            marginLeft: "0.4rem",
                                        }}
                                    />
                                </CustomTooltip>
                            </div>
                            <div>
                                <TextField
                                    placeholder="Additional context..."
                                    variant="outlined"
                                    value={addContext}
                                    sx={{
                                        marginTop: "0.5rem",
                                        backgroundColor: "#08172F",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "0",
                                        },
                                        height: "6rem",
                                        width: "100% !important",
                                        borderRadius: "0.375rem !important",
                                        border: "1px solid #1E2B40 !important",
                                        "& .MuiInputBase-input": {
                                            color: "#fff !important",
                                        },
                                        "& .MuiInputBase-input::placeholder": {
                                            color: "#8E97A4",
                                        },
                                    }}
                                    onChange={(e) => handleChnage(e)}
                                />
                            </div>
                        </div>

                        {huntQueryData && !loading && (
                            <div className="hunt-context-main">
                                <div className="hunt-text-top">Generated by AI </div>
                                <div className="generated-detail-box">
                                    <CustomMarkdownPreview
                                        source={huntQueryData}
                                        className="generated-detail-box"
                                        wrapperElement={{
                                            "data-color-mode": "dark",
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <CustomLoadingButton
                                loadingIndicator={<CircularProgress size={20} />}
                                disabled={loading || !selectedOption ? true : false}
                                loading={loading}
                                variant="contained"
                                size="medium"
                                sx={{
                                    background: selectedOption && !loading ? "#0082F9" : "#FFFFFF1F",
                                    color:
                                        selectedOption && !loading
                                            ? "#ffff"
                                            : loading || !selectedOption
                                            ? "#8E97A4 !important"
                                            : "#8E97A4", // Change text color when disabled
                                    fontWeight: "400",
                                    textTransform: "none",
                                    cursor: selectedOption && !loading ? "pointer" : "not-allowed",
                                    "&:hover": {
                                        background: selectedOption && !loading ? "#0082F9" : "#FFFFFF1F",
                                    },
                                }}
                                fullWidth
                                onClick={() => handleSubmitData(selectedOption, queryData)}
                            >
                                {submitBtnName}
                            </CustomLoadingButton>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default HuntResult;
