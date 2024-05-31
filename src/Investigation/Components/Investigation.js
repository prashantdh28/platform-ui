// Investigation.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InvestigationTab from "./InvestigationTab";
import NewInvestigation from "./NewInvestigation/NewInvestigation";
import InvestigationsList from "./InvestigationList/InvestigationsList";
import ChatToggle from "../../Chat/ChatToggle";
import {
  getAllComments,
  getSingleInvestigations,
  resetInvestigationData,
} from "../../redux/Slice/investigationSlice";

function Investigation() {
  const dispatch = useDispatch();
  const InvestigationData = useSelector(
    (state) => state.investigation?.singleinvestigationsdata
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRighgtFormOpen, setRightFormOpen] = useState(false);
  const [isrelationForm, setIsrelationForm] = useState(false);
  const [isRightrelationPopup, setRightrelationPopup] = useState(false);
  const [isopenSearch, setIsopenSearch] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [defaultTabData, setDefaultTabData] = useState({
    nodes: [],
    connectors: [],
  });
  const [isEditingFilename, setIsEditingFilename] = useState(false);
  const [editedFilename, setEditedFilename] = useState(InvestigationData?.name);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(true);
  const [diagramData, setDiagramData] = useState({ nodes: [], connectors: [] });

  const closeClick = () => {
    setIsChatOpen(false);
  };

  const activeTabId = useSelector((state) => state.tabs.activeTabId);
  // const activeTab = useSelector((state) =>
  //   state.tabs.tabs.find((tab) => tab?.id === activeTabId)
  // );

  useEffect(() => {
    setDefaultTabData({
      nodes:
        InvestigationData?.content &&
        JSON.parse(InvestigationData?.content)?.nodes,
      connectors:
        InvestigationData?.content &&
        JSON.parse(InvestigationData?.content)?.connectors,
    });
  }, [InvestigationData]);
  const tabsData = useSelector((state) => state.tabs.tabsData);
  let matchingTab =
    tabsData && tabsData.length > 0
      ? tabsData.find((tab) => tab?.id === activeTabId)
      : InvestigationData?.content
      ? JSON.parse(InvestigationData?.content)
      : null;

  useEffect(() => {
    setIsFormOpen(false);
    setRightFormOpen(false);
    setIsrelationForm(false);
    setRightrelationPopup(false);
    setIsopenSearch(false);
    setIsEditingFilename(false);
    setIsAccordionExpanded(true);
    setCommentText("");
    setCommentError("");
    setDiagramData({ nodes: [], connectors: [] });

    activeTabId !== 0 && dispatch(getAllComments(activeTabId));
  }, [activeTabId, dispatch]);

  useEffect(() => {
    //dispatch(resetInvestigationData());
    setTimeout(() => {
      activeTabId !== 0 && dispatch(getSingleInvestigations(activeTabId));
    setDiagramData({ nodes: [], connectors: [] });
      
    }, 200);    

    return () => {
      dispatch(resetInvestigationData());
    };
  }, [dispatch, activeTabId]);

  return (
    <>
      <div className="topdiv">
        <InvestigationTab
          isEditingFilename={isEditingFilename}
          setIsEditingFilename={setIsEditingFilename}
          InvestigationData={InvestigationData}
          matchingTab={matchingTab}
          editedFilename={editedFilename}
        />
      </div>

      {activeTabId === 0 ? (
        <InvestigationsList />
      ) : (
        <NewInvestigation
          activeDiv={activeTabId}
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
          commentText={commentText}
          setCommentText={setCommentText}
          commentError={commentError}
          setCommentError={setCommentError}
          matchingTab={matchingTab}
          defaultTabData={defaultTabData}
          activeTabId={activeTabId}
          isEditingFilename={isEditingFilename}
          setIsEditingFilename={setIsEditingFilename}
          editedFilename={editedFilename}
          setEditedFilename={setEditedFilename}
          isAccordionExpanded={isAccordionExpanded}
          setIsAccordionExpanded={setIsAccordionExpanded}
          diagramData={diagramData}
          setDiagramData={setDiagramData}
        />
      )}

      {isChatOpen && (
        <div style={{ position: "absolute" }}>
          <ChatToggle
            set={setIsChatOpen}
            isOpen={isChatOpen}
            onClose={closeClick}
            showBackdrop={true}
            sidebarObj={React.createRef()}
          />
        </div>
      )}
    </>
  );
}

export default Investigation;
