import { createSlice } from "@reduxjs/toolkit";
import {
  getRiskProfile,
  getSunBurstGraph,
} from "../../../Services/TID/riskMatrix.service";
const initialState = {
  riskLoading: false,
  SunBurstGraphData: [],
  SunBurstError: null,
  riskProfileData: [],
};
const riskMatrixSlice = createSlice({
  name: "riskMatrix",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSunBurstGraph.pending, (state) => ({
        ...state,
        riskLoading: true,
        SunBurstError: null,
      }))
      .addCase(getSunBurstGraph.fulfilled, (state, action) => ({
        ...state,
        riskLoading: false,
        SunBurstGraphData: action.payload,
        SunBurstError: null,
      }))
      .addCase(getSunBurstGraph.rejected, (state, action) => ({
        ...state,
        riskLoading: false,
        SunBurstGraphData: [],
        SunBurstError: action.payload,
      }))
      .addCase(getRiskProfile.pending, (state) => ({
        ...state,
        riskLoading: true,
        SunBurstError: null,
      }))
      .addCase(getRiskProfile.fulfilled, (state, action) => ({
        ...state,
        riskLoading: false,
        riskProfileData: action.payload,
        SunBurstError: null,
      }))
      .addCase(getRiskProfile.rejected, (state, action) => ({
        ...state,
        riskLoading: false,
        riskProfileData: [],
        SunBurstError: action.payload,
      }));
  },
});

export default riskMatrixSlice.reducer;

export const getSunBurstData = (state) => state.riskMatrix.SunBurstGraphData;
export const getRiskProfileData = (state) => state.riskMatrix.riskProfileData;
export const getRiskLoading = (state) => state.riskMatrix.riskLoading;
