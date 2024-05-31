import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosWrapper } from "../../helper";


export const getAllActors = createAsyncThunk(
    "actors/getAllActors",
    async ({ page = 0, size = 10 }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`/actors?page=${page}&size=${size}`);
            return response;
        } catch (err) {
            if (err?.response?.status === 400 || err?.response?.status === 500) {
                // Handle specific error statuses if needed
            }
            return rejectWithValue(err.message || "An error occurred");
        }
    }
);

export const getSingleActor = createAsyncThunk("actors/getActor", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosWrapper.get(`/actors/${id}`);
        return response;
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            // Handle specific error statuses if needed
        }
        return rejectWithValue(err.message || "An error occurred");
    }
});

export const addActors = async (data) => {
    return axiosWrapper.post("/addactor", data);
};

export const addTag = async (data) => {
    try {
        const response = await axiosWrapper.post("/entity/tags", data);
        return response;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const deleteTag = async (data) => {
    try {
        const response = await axiosInstance.request({
            url: "/entity/tags",
            method: "DELETE",
            data: data,
        });
        // axiosWrapper.delete("/entity/tags", data);
        return response.data;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const getTagsById = async (id) => {
    try {
        const response = await axiosWrapper.get(`/actors/${id}/tags`);
        return response;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const createactor = async (data) => {
    try {
        const response = await axiosWrapper.post("/actors", data);
        return response;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};
export const getChannelsNameData = async () => {
    try {
        const response = await axiosWrapper.get("/channels/name");
        return response;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};
