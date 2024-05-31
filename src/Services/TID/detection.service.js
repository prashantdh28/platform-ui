import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const getDetectionInfo = createAsyncThunk(
  "detection/getDetectionInfoData",
  async ({ selectedIds }, { rejectWithValue }) => {
    try {
      const requestIds =
        selectedIds &&
        selectedIds.length > 0 &&
        selectedIds.map((item) => item.id);
      const requestObject = { ids: requestIds };
      const response = await axiosWrapper.post(
        `tid/detection/summary`,
        requestObject
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getDetectionCountPerTechnique = createAsyncThunk(
  "detection/getDetectionCountPerTechnique",
  async ({ selectedIds }, { rejectWithValue }) => {
    try {
      const requestIds =
        selectedIds &&
        selectedIds.length > 0 &&
        selectedIds.map((item) => item.id);
      const requestObject = { ids: requestIds };
      const response = await axiosWrapper.post(
        `/tid/detection/count`,
        requestObject
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getHuntQueries = createAsyncThunk(
  "detection/getHuntQueries",

  async ({ type, data }, { rejectWithValue }) => {
    try {
      let response = await axiosWrapper.post(`ai/hunt?type=${type}`, data);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getDetectionQueries = createAsyncThunk(
  "detection/getDetectionQueries",

  async ({ type, data }, { rejectWithValue }) => {
    try {
      let response = await axiosWrapper.post(
        `ai/detections?type=${type}`,
        data
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.message);
    }
  }
);
