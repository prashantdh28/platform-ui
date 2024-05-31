import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const getSunBurstGraph = createAsyncThunk(
    "riskMatrix/getSunBurstGraph",
    async ({ selectedIds }, { rejectWithValue }) => {
        try {
            const requestIds = selectedIds && selectedIds.length > 0 && selectedIds.map((item) => item.id);
            const requestObject = { ids: requestIds };
            const response = await axiosWrapper.post(`tid/risk-profile/sunburst`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const getRiskProfile = createAsyncThunk(
    "riskMatrix/getRiskProfile",
    async ({ selectedIds }, { rejectWithValue }) => {
        try {
            const requestIds = selectedIds && selectedIds.length > 0 && selectedIds.map((item) => item.id);
            const requestObject = { ids: requestIds };
            const response = await axiosWrapper.post(`tid/risk-profile`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const addControl = createAsyncThunk("riskMatrix/addControl", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosWrapper.post(`tid/threat-profile/baseline/add`, data);
        return response;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.message);
    }
});

export const removeControl = createAsyncThunk("riskMatrix/removeControl", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosWrapper.post(`tid/threat-profile/baseline/remove`, data);
        return response;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.message);
    }
});
