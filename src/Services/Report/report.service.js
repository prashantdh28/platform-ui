import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const getReportData = createAsyncThunk(
    "mitre/getReportData",
    async ({ actorId }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`actors/${actorId}/reports`);
            return response;
        } catch (error) {
            console.error(error.message, "Error message");
            return rejectWithValue(error.message);
        }
    }
);
