import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setTableData,
  reportDataStore,
  reSetData,
} from "./riskManagementSlice";
import html2pdf from "html2pdf.js";

// Slice initial state
const initialState = {
  loading: false,
  riskData: {},
  riskAllData: [],
  singleRiskData: {},
  sourceProfileData: [],
  compareRiskData: {},
  templateData: [],
};

// get all risk api
export const getAllRisk = (page) => async (dispatch, getState) => {
  let { riskAllData } = getState()?.riskApi;

  try {
    dispatch(loadingflag(true));
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management?page=${page}&size=9`
    );
    if (response.status === 200) {
      if (page !== 0) {
        dispatch(getAllRiskData([...riskAllData, ...response.data.content]));
      } else {
        dispatch(getAllRiskData(response.data.content));
      }
      dispatch(getRisk(response.data));
      dispatch(loadingflag(false));
    }
  } catch (err) {
    dispatch(loadingflag(false));
  }
};

// get singal risk api
export const getSingleRisk = (id) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/${id}`
    );
    if (response.status === 200) {
      dispatch(getsinagleRiskData(response.data));
      dispatch(setTableData(response.data.business_objectives));
      dispatch(loadingflag(false));
    }
  } catch (err) {
    dispatch(loadingflag(false));
  }
};

// get report api
export const getReport = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/report`,
      data
    );
    if (response.status === 200) {
      dispatch(reportDataStore(response.data));
    }
  } catch (err) {}
};

// edit report api
export const editReport = (data, reportId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/report/${reportId}`,
      data
    );
    if (response.status === 200) {
      dispatch(reportDataStore(response.data));
    }
  } catch (err) {}
};

// get report api
export const downloadReport = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/report/download`,
      data,
      { responseType: "blob" }
    );
    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "text/html" });
      const reader = new FileReader();
      reader.readAsText(blob);

      reader.onload = function (event) {
        const blobContent = event.target.result;
        const options = {
          filename: "Risk_Profile_Report.pdf",
          margin: 10,
          html2canvas: { scale: 2 },
          enableLinks: true,
        };

        // html2pdf(blobContent).set(options).save();
        html2pdf().from(blobContent).set(options).save();
      };

      return response.data;
    }
  } catch (err) {
    console.log("error", err);
  }
};

// export const downloadReport = (data, navigate) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/report/download`,
//       data,
//       { responseType: "blob" }
//     );
//     if (response.status === 200) {
//       const blob = new Blob([response.data], { type: "text/html" });
//       const url = URL.createObjectURL(blob);
//       const reader = new FileReader();
//       reader.readAsText(blob);
//       reader.onload = function (event) {
//         const blobContent = event.target.result;
//         html2pdf(blobContent)
//           .from(url)
//           .set({
//             margin: 40,
//             after: [],
//             mode: ["avoid-all", "css", "legacy"],
//           })
//           .save();
//       };

//       return response.data;
//     }
//   } catch (err) {
//     console.log("error", err);
//   }
// };

// get source profile
export const getSourceProileRisk = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/profiles?profileType=source`
    );
    if (response.status === 200) {
      dispatch(getSourceProfileRiskData(response.data));
    }
  } catch (err) {}
};

//add duplicate risk api
export const duplicateRiskPRofile = (id, navigate) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/duplicate/${id}`
    );
    if (response.status === 200) {
      navigate(`/create-risk/${response?.data?.id}`);
      // dispatch(getAllRisk(0))
    }
  } catch (err) {
    console.error("Error adding comment:", err);
    dispatch(loadingflag(false));
  }
};

//create risk api
export const addRisk = (data, navigate) => async (dispatch) => {
  try {
    // dispatch(loadingflag(true));
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management`,
      data
    );
    if (response.status === 200) {
      // showToast(massage, { type: "success" });
      navigate(`/create-risk/${response.data.id}`);
    }
  } catch (err) {
    console.error("Error adding comment:", err);
    // dispatch(loadingflag(false));
  }
};

//compare risk api
export const compareRiskProfile = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/compare/${id}`
    );
    if (response.status === 200) {
      dispatch(setTableData(response.data.businessObjectives));
      dispatch(getCompareRisk(response.data));
    }
  } catch (err) {
    console.error("Error adding comment:", err);
    dispatch(loadingflag(false));
  }
};

//update risk api
export const updateRisk =
  (data, id, navigate, showToast, massage, flag, handleNext) =>
  async (dispatch) => {
    try {
      // dispatch(loadingflag(true));
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/${id}`,
        data
      );
      if (response.status === 200) {
        if (!flag) {
          dispatch(setTableData(response.data.business_objectives));
          handleNext();
        }
        if (flag) {
          showToast(massage, { type: "success" });
          dispatch(reSetData());
          navigate("/risk-management");
        }
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      // dispatch(loadingflag(false));
    }
  };

// Delete risk api
export const deleteRisk = (id, navigate) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/risk-management/${id}`
    );
    if (response.status === 200) {
      navigate("/risk-management");
    }
  } catch (err) {
    dispatch(loadingflag(false));
  }
};

// Get Template API
export const getTemplate = (navigate) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL_RISK_MANAGEMENT}/template?is_public=true`
    );
    if (response.status === 200) {
      dispatch(getTemplateList(response.data));
    }
  } catch (err) {
    dispatch(loadingflag(false));
  }
};

const riskManagementApiSlice = createSlice({
  name: "riskManagement",
  initialState,
  reducers: {
    loadingflag: (state, action) => {
      state.loading = action.payload;
    },
    getRisk: (state, action) => {
      state.riskData = action.payload;
    },
    getAllRiskData: (state, action) => {
      state.riskAllData = action.payload;
    },
    getsinagleRiskData: (state, action) => {
      state.singleRiskData = action.payload;
    },
    getSourceProfileRiskData: (state, action) => {
      state.sourceProfileData = action.payload;
    },
    getCompareRisk: (state, action) => {
      state.compareRiskData = action.payload;
    },
    getTemplateList: (state, action) => {
      state.templateData = action.payload;
    },
  },
});

export const {
  loadingflag,
  getRisk,
  getAllRiskData,
  getsinagleRiskData,
  getSourceProfileRiskData,
  getCompareRisk,
  getTemplateList,
} = riskManagementApiSlice.actions;

export default riskManagementApiSlice.reducer;
