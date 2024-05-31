import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Input, TextField } from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import moment from "moment/moment";
import useToastify from "../../../../Hooks/useToastify";
import Picture from "../../../../../src/Assests/Img/eruka.png";
import {
    AddInvestigation,
    InvestigationGet,
    addInvestigationComment,
    updateInvestigationData,
} from "../../../../redux/Slice/investigationSlice";
import { useDispatch, useSelector } from "react-redux";
import "./RightBar.css";
import CustomDialog from "../../../../Components/Dialog/CustomeDialog";
import { updateInvestigationStatus } from "../../../../Services/investigation/investigation.service";
import * as htmlToImage from "html-to-image";


function RightBar({
    InvestigationData,
    commentText,
    setCommentText,
    commentError,
    setCommentError,
    matchingTab,
    isEditingFilename,
    setIsEditingFilename,
    setEditedFilename,
    editedFilename,
    isAccordionExpanded,
    setIsAccordionExpanded,
}) {
    const dispatch = useDispatch();

    const { showToast } = useToastify();

    const activeTabId = useSelector((state) => state.tabs.activeTabId);
    const tabsData = useSelector((state) => state.tabs.tabsData);
    const CommentsData = useSelector((state) => state.investigation?.comments);
    const AllInvestigationData = useSelector((state) => state.investigation?.allinvestigationsdata);

    const toggleAccordion = () => {
        setIsAccordionExpanded(!isAccordionExpanded);
        setIsEditingFilename(false);
    };

    const EditInvestigation = () => {
        setIsEditingFilename(true);
        setEditedFilename(InvestigationData?.name);
    };

    const handleCommentChange = (e) => {
        const newCommentText = e.target.value;

        if (newCommentText.length <= 100) {
            setCommentText(newCommentText);
            setCommentError("");
        } else {
            setCommentError("Comment cannot be more than 100 characters");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendComment();
        }
    };

    const handleSendComment = () => {
        const trimmedComment = commentText.trim();

        if (trimmedComment === "") {
            setCommentError("Comment cannot be empty");
            return;
        }

        if (trimmedComment.length > 100) {
            setCommentError("Comment cannot be more than 100 characters");
            return;
        }

        const payload = { comment: trimmedComment, user: "ram" };
        dispatch(addInvestigationComment(activeTabId, payload));

        setCommentText("");
        setCommentError("");
    };

    const captureScreenshot = async () => {
        const imageElement = document.getElementById("diagram"); // Replace 'yourImageId' with the actual ID of your image element
        const ss = htmlToImage
            .toPng(imageElement)
            .then((dataUrl) => {
                // Now you can save or display the image
                // Now you can save or display the image
                // console.log(dataUrl);
                // Now you can save or display the image
                // console.log(dataUrl);
                return dataUrl;
                //   return convertBase64ToImage(dataUrl)
            })
            .catch((error) => {
                console.error("Error capturing screenshot:", error);
            });
        return ss;
    };

    const UpdateInvestigation = async () => {
        const imgCap = await captureScreenshot();

        const payload = {
            name: isEditingFilename ? editedFilename : InvestigationData?.name,
            content: matchingTab ? JSON.stringify({ ...matchingTab, image: imgCap }) : null,
        };
        dispatch(updateInvestigationData(activeTabId, payload, showToast));
        setIsEditingFilename(false);
    };
    // const captureScreenshot = async () => {
    //     const screenshot = await html2canvas(document.getElementById('diagram'));
    //     return screenshot.toDataURL();
    //   };
    //   const captureScreenshot = async () => {
    //     try {
    //       const screenshot = await html2canvas(document.getElementById('diagram'));
    //       return screenshot.toDataURL();
    //     } catch (error) {
    //       console.error('Error capturing screenshot:', error);
    //       return null;
    //     }
    //   };

    const ADDInvestigation = () => {
        const payload = {
            name: isEditingFilename && editedFilename,
            createdBy: "ANISH",
            content: matchingTab ? JSON.stringify(matchingTab) : null,
        };
        dispatch(AddInvestigation(payload, showToast));
        setIsEditingFilename(false);
    };

    function formatTime(localDateTime) {
        const now = moment();
        const commentTime = moment(localDateTime);

        const diffInMinutes = now.diff(commentTime, "minutes");
        const diffInHours = now.diff(commentTime, "hours");
        const diffInDays = now.diff(commentTime, "days");

        if (diffInMinutes < 1) {
            return "Now";
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
        } else if (diffInDays === 1) {
            return "Yesterday";
        } else {
            return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
        }
    }

    const acrdnContent1 = () => {
        return (
            <>
                <div className="fcm">
                    <div className="fileinfo-container">
                        <div className="file_name">
                            <p className="filename">File Name</p>
                            <p className="field">
                                {isEditingFilename ? (
                                    <span>
                                        <Input
                                            value={editedFilename}
                                            onChange={(e) => setEditedFilename(e.target.value)}
                                        />
                                    </span>
                                ) : (
                                    <>
                                        {InvestigationData?.name}
                                        {/* Adjust the integration of MdModeEdit based on your project */}
                                        <MdModeEdit onClick={EditInvestigation} />
                                    </>
                                )}
                            </p>
                        </div>
                        <div className="file_name">
                            <p className="fieldname">Status</p>
                            <p className="field">{InvestigationData?.status}</p>
                        </div>
                        <div className="file_name">
                            <p className="fieldname">Author</p>
                            <p className="field">{InvestigationData?.createdBy}</p>
                        </div>
                        <div className="file_name">
                            <p className="fieldname">Created</p>
                            <p className="field">
                                {moment(InvestigationData?.createdDate).format("DD.MM.YYYY")}
                            </p>
                        </div>
                        <div className="file_name">
                            <p className="fieldname">Last Updated</p>
                            <p className="field">
                                {moment(InvestigationData?.lastUpdatedDate).format("DD.MM.YYYY")}
                            </p>
                        </div>
                        <div className="file_name">
                            <p className="fieldname">Last Updated By</p>
                            <p className="field">Name</p>
                        </div>
                        <div className="file_name">
                            <p className="fieldname">Version</p>
                            <p className="field">{InvestigationData?.version}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const onSendRivewClick = async ({ status }) => {
        const response = await updateInvestigationStatus(InvestigationData?.id, {
            status: status,
            reviewerName: "XYZ",
            reviewerId: "",
        });
        if (response.status === status) {
            dispatch(InvestigationGet(response));
        }
    };

    return (
        <>
            <div className="right_main">
                <div className="fileInfo">
                    <Accordion
                        className="fileInfo-accordion"
                        expanded={isAccordionExpanded}
                        style={{ boxShadow: "none" }}
                    >
                        <AccordionSummary
                            id="header_fileInfo"
                            className="fileInfo-accordion-header-container"
                            aria-controls="panel1a-content"
                            onClick={toggleAccordion}
                        >
                            <div className="rightBar-accordion-header">
                                <p className="rightbar-accordion-name">File Information</p>
                                <span
                                    className="accordion-icon"
                                    id="JJ"
                                    style={{ color: "var(--name-email)" }}
                                >
                                    {isAccordionExpanded ? (
                                        <span className="e-icons e-intermediate-state"></span>
                                    ) : (
                                        <span className="e-icons e-plus"></span>
                                    )}
                                </span>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails style={{ boxShadow: "none" }}>{acrdnContent1()}</AccordionDetails>
                    </Accordion>
                </div>
                <div className="rightSidebar-comments">
                    <h3 className="comments"> Comments</h3>
                    <div>
                        <div className="e-input-group">
                            <div className="e-input-in-wrap" id="commentBox">
                                <input
                                    className="e-input placeholderComment"
                                    name="comment"
                                    type="text"
                                    placeholder="Comment"
                                    value={commentText}
                                    onChange={handleCommentChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <IoSendSharp className="send" onClick={handleSendComment} />
                            </div>

                            {/* {/ <span className="e-icons e-input-group-icon e-input-popup-date" /> /} */}
                        </div>
                        {commentError && <div className="comment-error">{commentError}</div>}
                    </div>
                </div>
                <div style={{ maxHeight: "20rem", overflowY: "auto" }}>
                    {CommentsData &&
                        CommentsData?.slice()
                            .reverse()
                            .map((comment, index) => (
                                <div className="all_comments" key={index}>
                                    <div className="profileDetails">
                                        <div className="profileImg">
                                            <img src={Picture} className="img" alt="" />
                                        </div>
                                        <div className="profileName">
                                            {comment?.user}
                                            <div className="commented_time">
                                                {formatTime(comment?.localDateTime)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment_desc">{comment?.comment}</div>
                                </div>
                            ))}
                </div>
                {/* {InvestigationData?.status === "APPROVED" && (
                <div>
                <Button className="revoke" variant="outlined">
                Revoke
                </Button>
                </div>
            )} */}
            </div>
            <hr style={{ width: "88%", margin: "1rem" }} />
            <div className="button-container-review">
                <div className="save_review">
                    {!(InvestigationData?.status === "REVIEW") &&
                        !(InvestigationData?.status === "APPROVED") && (
                            <CustomDialog
                                style={{ gridColumn: "span 6" }}
                                title="Send for review"
                                Content={() => {
                                    return (
                                        <div style={{color:"var(--name-email)"}}>
                                            <p>Would you like to add a message?</p>
                                            <TextField
                                            style={{borderBottom:"1px solid var(--name-email)"}}
                                                variant="standard"
                                                label="Message"
                                                placeholder="Text"
                                                fullWidth
                                            />
                                        </div>
                                    );
                                }}
                                DialogAction={() => {
                                    return (
                                        <Button
                                            fullWidth
                                            onClick={() => onSendRivewClick({ status: "REVIEW" })}
                                            // style={{color:"var(--name-email)"}}
                                        >
                                            SEND FOR RIVIEW
                                        </Button>
                                    );
                                }}
                            >
                                <Button
                                    style={{ whiteSpace: "nowrap", border: "1px solid blue", width: "100%" }}
                                    className="sfr"
                                >
                                    Send for review
                                </Button>
                            </CustomDialog>
                        )}

                    {InvestigationData && AllInvestigationData ? (
                        <Button
                            id="update_on_changeTab"
                            className="updatebtn"
                            variant="outlined"
                            onClick={UpdateInvestigation}
                            disabled={tabsData.length === 0 && !isEditingFilename}
                            style={{
                                padding: "6px 42px",
                                width: "100%",
                                gridColumn: "span 6",
                            }}
                        >
                            Update
                        </Button>
                    ) : (
                        <Button
                            className="savebtn"
                            variant="outlined"
                            onClick={ADDInvestigation}
                            style={{ width: "50%" }}
                            disabled={matchingTab == null || !isEditingFilename}
                        >
                            Save
                        </Button>
                    )}
                    {/* </div>
                <div style={{ display: "flex", gap: "5px" }}> */}
                    {InvestigationData?.status === "REVIEW" &&
                        !(InvestigationData?.status === "APPROVED") && (
                            <>
                                <CustomDialog
                                    title={`Approve ${InvestigationData?.name}`}
                                    Content={() => {
                                        return (
                                            <div style={{color:"var(--name-email)"}}>
                                                <p>Would you like to add a message?</p>
                                                <TextField
                                                style={{borderBottom:"1px solid var(--name-email)"}}
                                                    variant="standard"
                                                    label="Version"
                                                    placeholder="Value"
                                                    fullWidth
                                                />
                                                <TextField
                                                style={{borderBottom:"1px solid var(--name-email)"}}
                                                    variant="standard"
                                                    label="Message"
                                                    placeholder="Text"
                                                    fullWidth
                                                />
                                            </div>
                                        );
                                    }}
                                    DialogAction={() => {
                                        return (
                                            <Button onClick={() => onSendRivewClick({ status: "APPROVED" })}>
                                                Approved
                                            </Button>
                                        );
                                    }}
                                >
                                    <Button className="approve" variant="outlined">
                                        Approved
                                    </Button>
                                </CustomDialog>
                            </>
                        )}
                    {InvestigationData?.status === "REVIEW" &&
                        !(InvestigationData?.status === "APPROVED") && (
                            <>
                                <CustomDialog
                                    title={`Amendment ${InvestigationData?.name}`}
                                    Content={() => {
                                        return (
                                            <div style={{color:"var(--name-email)"}}> 
                                                <p>Would you like to add a message?</p>
                                                <TextField
                                                style={{borderBottom:"1px solid var(--name-email)"}}
                                                    variant="standard"
                                                    label="Version"
                                                    placeholder="Value"
                                                    fullWidth
                                                />
                                                <TextField
                                                style={{borderBottom:"1px solid var(--name-email)"}}
                                                    variant="standard"
                                                    label="Message"
                                                    placeholder="Text"
                                                    fullWidth
                                                />
                                            </div>
                                        );
                                    }}
                                    DialogAction={() => {
                                        return (
                                            <Button onClick={() => onSendRivewClick({ status: "AMENDMENT" })}>
                                                Amendment
                                            </Button>
                                        );
                                    }}
                                >
                                    <Button color="info" variant="outlined" width="100%" style={{width:"110%"}}>
                                        Amendment
                                    </Button>
                                </CustomDialog>
                            </>
                        )}
                </div>
            </div>
        </>
    );
}

export default RightBar;
