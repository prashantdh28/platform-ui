import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const getRecommendations = createAsyncThunk(
    "recommendations/getRecommendations",
    async ({ selectedIds, top }, { rejectWithValue }) => {
        try {
            let requestURL = "/tid/recommendation";
            const requestIds = selectedIds && selectedIds.length > 0 && selectedIds.map((item) => item.id);
            const requestObject = { ids: requestIds };
            if (top) {
                requestURL = requestURL + "/top";
            }
            const response = await axiosWrapper.post(requestURL, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const sendMessageToSlack = createAsyncThunk(
    "recommendations/sendMessageToSlack",
    async ({ requestObject }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.post(`/tid/slack`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);
