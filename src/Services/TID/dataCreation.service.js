import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";
import { removeEmptyKeys, removeEmptyKeysWithArray } from "../../helper/removeEmptyKeysHelper";

export const getEntityTypes = createAsyncThunk(
    "dataCreation/getEntityTypesData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`/tid/entity/types`);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const generateAIEntity = createAsyncThunk(
    "dataCreation/generateAIEntity",
    async (reqestObject, { rejectWithValue }) => {
        try {
            const startTime = Date.now();
            const response = await axiosWrapper.post(`/ai`, reqestObject);
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            const customeResponse = await removeEmptyKeys(response);
            return { ...customeResponse, responseTime };
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const getEntitiesByName = createAsyncThunk(
    "dataCreation/getEntitiesByName",
    async ({ name, filter }, { rejectWithValue }) => {
        try {
            let endpoints = `/tid/entity`;
            if (name) {
                endpoints = endpoints + `?name=${name}&summary=true`;
            }
            if (filter && Object.keys(filter).length > 0) {
                endpoints = endpoints + `?type=${filter?.type}&name=${filter?.name}`;
            }
            const response = await axiosWrapper.get(endpoints);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const createEntity = createAsyncThunk(
    "dataCreation/createEntity",
    async ({ reqestObject }, { rejectWithValue }) => {
        try {
            const data = await removeEmptyKeys(reqestObject);
            const cleanReqestObject = await removeEmptyKeysWithArray(data);
            const response = await axiosWrapper.post(`tid/entity/private`, cleanReqestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.error);
        }
    }
);

export const updateEntity = createAsyncThunk(
    "dataCreation/updateEntity",
    async ({ reqestObject, id }, { rejectWithValue }) => {
        try {
            const data = await removeEmptyKeys(reqestObject);
            const response = await axiosWrapper.put(`tid/entity/${id}`, data);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.error);
        }
    }
);