// tabSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabsData: [],
  tabs: [
    {
      text: "Home",
      nodes: [],
      connectors: [],
      id: 0,
    },
    { text: "Investigation 1", nodes: [], connectors: [], id: 1 },
    { text: "Investigation 2", nodes: [], connectors: [], id: 2 },
    { text: "Investigation 3", nodes: [], connectors: [], id: 3 },
    { text: "Investigation 4", nodes: [], connectors: [], id: 4 },
    { text: "Investigation 5", nodes: [], connectors: [], id: 5 },
    { text: "Investigation 6", nodes: [], connectors: [], id: 6 },
    { text: "Investigation 7", nodes: [], connectors: [], id: 37 },
    { text: "Investigation 8", nodes: [], connectors: [], id: 38 },
    { text: "Investigation 9", nodes: [], connectors: [], id: 34 },
    { text: "Investigation 10", nodes: [], connectors: [], id: 40 },
  ],
  activeTabId: parseInt(localStorage.getItem("activeTabId")) || 0,
};

const tabSlice = createSlice({
  name: "tabs",
  initialState: initialState,
  reducers: {
    addTab: (state, action) => {
      const newTab = action.payload;
      state.tabs.push(newTab);
    },
    deleteTab: (state, action) => {
      const idToDelete = action.payload;
      const indexToDelete = state.tabs.findIndex(
        (tab) => tab.id === idToDelete
      );

      if (indexToDelete !== -1) {
        state.tabs.splice(indexToDelete, 1);

        if (state.activeTabId === idToDelete) {
          if (state.tabs.length > 0) {
            const previousTabIndex = indexToDelete > 0 ? indexToDelete - 1 : 0;
            state.activeTabId = state.tabs[previousTabIndex].id;
          } else {
            state.activeTabId = 0;
          }
        }

        state.tabsData = state.tabsData.filter(
          (tabData) => tabData.id !== idToDelete
        );
      }
    },
    setActiveTab: (state, action) => {
      state.activeTabId = action.payload;
      localStorage.setItem("activeTabId", action.payload);
    },
    updateTabsData: (state, action) => {
      const updatedData = action.payload;
      state.tabsData = updatedData;
    },
    // resetForm: (state) => {
    //   state.data = {};
    // },
  },
});

export const { addTab, deleteTab, setActiveTab, updateTabsData } =
  tabSlice.actions;
export default tabSlice.reducer;
