import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // addTab,
  deleteTab,
  setActiveTab,
  updateTabsData,
} from "../../redux/Slice/tabSlice";
import { BiPlus, BiSolidHome, BiX } from "react-icons/bi";
import useToastify from "../../Hooks/useToastify";
import {
  AddInvestigation,
  // InvestigationGet,
  addNewTab,
  deleteInvestigationTab,
  // resetInvestigationData,
  updateInvestigationData,
} from "../../redux/Slice/investigationSlice";
import { v4 as uuidv4 } from "uuid";

const InvestigationTab = ({
  InvestigationData,
  matchingTab,
  isEditingFilename,
  setIsEditingFilename,
  editedFilename,
}) => {
  const dispatch = useDispatch();
  const { showToast } = useToastify();
  const tabsCount = useSelector((state) => {
    return state.investigation?.allinvestigationsdata || [];
  });

  const activeTabId = useSelector((state) => state.tabs.activeTabId);
  const tabsData = useSelector((state) => state.tabs.tabsData);

  const tabs = useSelector((state) => state.investigation?.openInvestigations);

  const MAX_TABS = 10;

  const addInvestigation = () => {
    const payload = {
      name: "",
      createdBy: "John",
      content: " {}",
    };
    if (tabs.length < MAX_TABS) {
      dispatch(AddInvestigation(payload, showToast));

      // setIsEditingFilename(false)
    } else {
      showToast("You have reached the maximum limit of tabs 10 ");
    }

    const newTabId =
      tabsCount.length > 0 ? tabsCount[tabsCount.length - 1].id + 1 : 0;

    // Check if the newTabId already exists
    const tabAlreadyExists = tabs.some((tab) => tab.id === newTabId);

    if (tabAlreadyExists) {
      showToast(
        `please first Complete this investigation and saved after you able to add New Investigation.`,
        {
          type: "warning",
        }
      );
      return;
    }

    const newItem = {
      text: `Investigation ${newTabId}`,
      nodes: [],
      connectors: [],
      id: newTabId,
    };

    const tabDataIndex = tabsData.findIndex((tab) => tab.id === newTabId);

    if (tabDataIndex !== -1) {
      dispatch(deleteTab(newTabId));
    }
    if (tabs.length < MAX_TABS) {
      dispatch(addNewTab(newItem));
      dispatch(updateTabsData([]));
      dispatch(setActiveTab(newTabId));
    }
  };

  const handleDivClick = async (tab) => {
    if (activeTabId === tab.id) {
      // deletedTab(tab.id);
    } else {
      AutoSaveData(activeTabId);
      // dispatch(resetInvestigationData())

      dispatch(updateTabsData([]));
      dispatch(setActiveTab(tab.id));
      //dispatch(OpenInvestigationsTab())
    }
  };

  const AutoSaveData = (activeTabId, tab) => {
    const switchtab = true;
    const payload = {
      name: isEditingFilename ? editedFilename : InvestigationData?.name,
      content: activeTabId ? JSON.stringify(matchingTab) : null,
    };
    dispatch(updateInvestigationData(activeTabId, payload, "", switchtab));
  };
  const deletedTab = (id) => {
    dispatch(deleteInvestigationTab(id));
  };

  return (
    <div style={{marginTop:"0.3rem"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "26px",
          overflowX: "auto",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          {/* Render Home Tab Separately */}
          <div
            id="investigation-tabcount"
            style={{ height: "100%" }}
            onClick={() => {
              handleDivClick({ id: 0 }); // You can pass a mock object for the home tab
            }}
            className={activeTabId === 0 ? "active" : ""}
          >
            <BiSolidHome className="hometabicon" size={20} />
          </div>

          {tabs &&
            tabs
              ?.filter((tab) => tab?.status !== "DELETED")
              ?.slice(0, MAX_TABS)
              ?.map((tab, index) => {
                const keyId = uuidv4();
                const label = `${
                  tab?.text ? tab?.text : "Investigation " + tab?.id
                }`;
                return (
                  <div
                    id="investigation-tabcount"
                    style={{ height: "100%" }}
                    onClick={() => {
                      handleDivClick(tab);
                      //AutoSaveData(activeTabId,tab);
                    }}
                    className={activeTabId === tab.id ? "active" : ""}
                    key={keyId}
                  >
                    {label}
                    {activeTabId === tab?.id && (
                      <BiX
                        className="crossbtn"
                        onClick={() => deletedTab(tab?.id)}
                      />
                    )}
                  </div>
                );
              })}
        </div>

        <div
          style={{
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            paddingRight: "2%",
            color: "var(--name-email)",
          }}
          onClick={() => addInvestigation()}
        >
          <div className="addtab">
            <BiPlus style={{ width: "25px", height: "20px",paddingTop:"0.1rem" }} /> NEW
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationTab;
