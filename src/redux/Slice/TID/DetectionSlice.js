import { createSlice } from "@reduxjs/toolkit";
import {
  getDetectionInfo,
  getDetectionQueries,
  getHuntQueries,
} from "../../../Services/TID/detection.service";

const initialState = {
  loading: false,
  detectionInfoData: [],
  detectionError: null,
  huntQueryData: "",
  huntQueryError: null,
};

const detectionSlice = createSlice({
  name: "detection",
  initialState: initialState,
  reducers: {
    resetDetectionInfoData: (state, action) => ({
      ...state,
      loading: false,
      detectionInfoData: [],
      detectionInfoError: null,
    }),
    resetHuntQueryData: (state, action) => ({
      ...state,
      loading: false,
      huntQueryData: "",
      huntQueryError: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetectionInfo.pending, (state) => ({
        ...state,
        loading: true,
        detectionInfoError: null,
      }))
      .addCase(getDetectionInfo.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        detectionInfoData: action.payload,
        detectionInfoError: null,
      }))
      .addCase(getDetectionInfo.rejected, (state, action) => ({
        ...state,
        loading: false,
        detectionInfoData: [],
        detectionInfoError: action.payload,
      }))

      .addCase(getHuntQueries.pending, (state) => ({
        ...state,
        loading: true,
        huntQueryError: null,
      }))
      .addCase(getHuntQueries.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        huntQueryData: action.payload,
        huntQueryError: null,
      }))
      .addCase(getHuntQueries.rejected, (state, action) => ({
        ...state,
        loading: false,
        huntQueryData: "",
        huntQueryError: action.payload,
      }))

      .addCase(getDetectionQueries.pending, (state) => ({
        ...state,
        loading: true,
        huntQueryError: null,
      }))
      .addCase(getDetectionQueries.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        huntQueryData: action.payload,
        huntQueryError: null,
      }))
      .addCase(getDetectionQueries.rejected, (state, action) => ({
        ...state,
        loading: false,
        huntQueryData: "",
        huntQueryError: action.payload,
      }));
  },
});

export const { resetDetectionInfoData, resetHuntQueryData } =
  detectionSlice.actions;
export default detectionSlice.reducer;

export const getDetectionInformationData = (state) =>
  state.detection.detectionInfoData;
export const getDetectionLoading = (state) => state.detection.loading;
export const gethuntQueryData = (state) => state.detection.huntQueryData;
