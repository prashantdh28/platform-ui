import React from "react";

import RightBar from "../Sidebars/RightSidebar/RightBar";
import "../investigation.css";

import LeftMid from "../Sidebars/LeftMid";

const NewInvestigation = ({
  activeDiv,
  isFormOpen,
  setIsFormOpen,
  isRighgtFormOpen,
  setRightFormOpen,
  isrelationForm,
  setIsrelationForm,
  isRightrelationPopup,
  setRightrelationPopup,
  isopenSearch,
  setIsopenSearch,
  InvestigationData,
  commentText,
  setCommentText,
  commentError,
  setCommentError,
  matchingTab,
  activeTabId,
  isEditingFilename,
  setIsEditingFilename,
  setEditedFilename,
  editedFilename,
  isAccordionExpanded,
  setIsAccordionExpanded,
  diagramData,
  setDiagramData
}) => {
    return (
        <div className="mainDiv">
            <div
                className="Container_left_mid"
                //  style={{ width: "82%", overflow: "hidden" }}
            >
                <LeftMid
                    activeDiv={activeDiv}
                    isFormOpen={isFormOpen}
                    setIsFormOpen={setIsFormOpen}
                    isRighgtFormOpen={isRighgtFormOpen}
                    setRightFormOpen={setRightFormOpen}
                    isrelationForm={isrelationForm}
                    setIsrelationForm={setIsrelationForm}
                    isRightrelationPopup={isRightrelationPopup}
                    setRightrelationPopup={setRightrelationPopup}
                    isopenSearch={isopenSearch}
                    setIsopenSearch={setIsopenSearch}
                    InvestigationData={InvestigationData}
                    matchingTab={matchingTab}
                    activeTabId={activeTabId}
                    diagramData={diagramData}
                    setDiagramData={setDiagramData}
                />
            </div>
            <div className="right-sidebar-pallete">
                <RightBar
                    InvestigationData={InvestigationData}
                    commentText={commentText}
                    setCommentText={setCommentText}
                    commentError={commentError}
                    setCommentError={setCommentError}
                    matchingTab={matchingTab}
                    isEditingFilename={isEditingFilename}
                    setIsEditingFilename={setIsEditingFilename}
                    editedFilename={editedFilename}
                    setEditedFilename={setEditedFilename}
                    isAccordionExpanded={isAccordionExpanded}
                    setIsAccordionExpanded={setIsAccordionExpanded}
                />
            </div>
        </div>
    );
};

export default NewInvestigation;
