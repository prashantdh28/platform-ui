import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const assignTask = createAsyncThunk("myTasks/assignTask", async ({ requestObject }, { rejectWithValue }) => {
    try {
        const response = await axiosWrapper.post(`/tid/task`, requestObject);
        return response;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.message);
    }
});

export const getTasksList = createAsyncThunk("myTasks/getTasksList", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosWrapper.get(`/tid/task`);
        return response;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.message);
    }
});

export const updateTasks = createAsyncThunk(
    "myTasks/updateTasks",
    async ({ requestObject }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.put(`/tid/task`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const getProductBasedSuggestion = createAsyncThunk(
    "myTasks/getProductBasedSuggestion",
    async ({ requestObject }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.post(`/ai/product/feature/suggestion`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);
