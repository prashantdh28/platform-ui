import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const getEmptyAttackMatrix = createAsyncThunk(
  "attackMatrix/getEmptyAttackMatrixData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosWrapper.get(`tid/entity/attack-matrix`);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getAttackMatrix = createAsyncThunk(
  "attackMatrix/getAttackMatrixData",
  async ({ selectedIds, compress = false }, { rejectWithValue }) => {
    try {
      const requestIds =
        selectedIds &&
        selectedIds.length > 0 &&
        selectedIds.map((item) => item.id);
      const requestObject = { ids: requestIds };
      const response = await axiosWrapper.post(
        `tid/entity/attack-matrix?compress=${compress}`,
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

export const getEntityGraphById = createAsyncThunk(
  "attackMatrix/getEntityGraphByIdData",
  async ({ entityId }, { rejectWithValue }) => {
    try {
      const response = await axiosWrapper.get(`tid/entity/graph/${entityId}`);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getAttackMatrixGraph = createAsyncThunk(
  "attackMatrix/getAttackMatrixGraphData",
  async ({ selectedIds }, { rejectWithValue }) => {
    try {
      const requestIds =
        selectedIds &&
        selectedIds.length > 0 &&
        selectedIds.map((item) => item.id);
      const requestObject = { ids: requestIds };
      const response = await axiosWrapper.post(
        `tid/entity/attack-matrix/graph`,
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
