import { createSlice } from "@reduxjs/toolkit";

// Slice initial state
const initialState = {
  riskProfileData: {
    name: '',
    description: '',
    department_name: "",
    checkboxValues: false,
    is_public: false,
    profile_type: "",
    source_profile: ""
  },
  form2Data: [{ name: '', description: "", priority: "" }],
  reportData: {},
  activeTab: 0,
  Flag: {
    manageControlflag: false,
    generateReportflag: false,
    previewReportflag: false,
    templateflag: false
  },
  formatAllData: {},
  tableData:[],
  tabData:{}
};

const riskManagementSlice = createSlice({
  name: "riskManagement",
  initialState,
  reducers: {
    riskProfile: (state, action) => {
      state.riskProfileData = action.payload;
    },
    reportDataStore: (state, action) => {
      state.reportData = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setForm2Data: (state, action) => {
      state.form2Data = action.payload;
    },
    setFlag: (state, action) => {
      state.Flag = action.payload;
    },
    formatData: (state, action) => {
      state.formatAllData = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    updateTabsData: (state, action) => {
      state.tabData = action.payload;
    },
    reSetData: (state, action) => {
      state.riskProfileData = {
        name: '',
        description: '',
        department_name: "",
        checkboxValues: false,
        is_public: false,
        profile_type: "",
        source_profile: ""
      };
      state.form2Data = [{ name: '', id: '', description: "", priority: "" }];
      state.reportData = '';
      state.activeTab = 0;
      state.Flag = {
        manageControlflag: false,
        generateReportflag: false,
        previewReportflag: false,
        templateflag: false
      };
      state.tabData = {};
      state.formatAllData = {};
      state.tableData = [];
    },
  },
});

export const {
  riskProfile,
  reportDataStore,
  setActiveTab,
  setForm2Data,
  setFlag,
  formatData,
  reSetData,
  setTableData,
  updateTabsData
} = riskManagementSlice.actions;

export default riskManagementSlice.reducer;