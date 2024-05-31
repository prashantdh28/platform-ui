import axios from "axios";
import { axiosWrapper } from "../../helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://api.unitedplatform.org";

export const getAllActors = async () => {
    try {
        let response = await axios.get(`${BASE_URL}/actors?page=1&size=10&sort=DESC`);

        return response.data;
    } catch (error) {
        console.error("error message ", error.message);
    }
};

export const addActors = async (data) => {
    try {
        await axios.post(`${BASE_URL}/addactor`, data);
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const getMitreData = createAsyncThunk(
    "mitre/getMitreData",
    async ({ selectedIds }, { rejectWithValue }) => {
        try {
            const requestIds =
                selectedIds && selectedIds.length > 0 && selectedIds.map((item) => item.actorId);
            const requestObject = { ids: requestIds };
            const response = await axiosWrapper.post("/actors/attack-pattern", requestObject);
            return response;
        } catch (error) {
            console.error(error.message, "Error message");
            return rejectWithValue(error.message);
        }
    }
);
