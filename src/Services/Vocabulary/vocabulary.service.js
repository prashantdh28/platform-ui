import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const getRegions = createAsyncThunk("vocabulary/getRegionsData", async (__, { rejectWithValue }) => {
    try {
        const response = await axiosWrapper.get(`vocabulary/regions`);
        let flattenedArray = [];

        if (response) {
            for (let region in response) {
                if (response.hasOwnProperty(region)) {
                    flattenedArray = flattenedArray.concat(response[region]);
                }
            }
        }
        flattenedArray.sort();
        const regionsArray = [];
        response.Regions.forEach((region) => {
            regionsArray.push({
                groupBy: "Regions",
                title: region,
            });
        });

        response.Countries.forEach((country) => {
            regionsArray.push({
                groupBy: "Countries",
                title: country,
            });
        });
        return regionsArray;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getEntityTypes = createAsyncThunk(
    "vocabulary/getEntityTypesData",
    async (__, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`vocabulary/entities`);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getMotivation = createAsyncThunk(
    "vocabulary/getMotivationData",
    async (__, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`vocabulary/motivation`);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getSophistication = createAsyncThunk(
    "vocabulary/getSophisticationData",
    async (__, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`vocabulary/sophistication`);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getTags = createAsyncThunk("vocabulary/getTagsData", async (__, { rejectWithValue }) => {
    try {
        const response = await axiosWrapper.get(`vocabulary/tags`);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getSectors = createAsyncThunk("vocabulary/getSectorsData", async (__, { rejectWithValue }) => {
    try {
        const response = await axiosWrapper.get(`vocabulary/sectors`);
        let flattenedArray = [];

        if (response) {
            for (let sector in response) {
                if (response.hasOwnProperty(sector)) {
                    flattenedArray = flattenedArray.concat(response[sector]);
                }
            }
        }
        flattenedArray.sort();
        return flattenedArray;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const getActorType = createAsyncThunk(
    "vocabulary/getActorTypeData",
    async (__, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`vocabulary/actor-type`);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getRelationship = createAsyncThunk(
    "vocabulary/getRelationshipData",
    async (__, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`vocabulary/relationships`);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getDescribeScReports = createAsyncThunk(
    "vocabulary/reportsData",
    async (__, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`vocabulary/reports`);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAffectedPlatformList = createAsyncThunk(
    "vocabulary/platformsData",
    async (__, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`vocabulary/platform`);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCapabilities = createAsyncThunk(
    "vocabulary/capabilitiesData",
    async (__, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`vocabulary/malware-capabilities`);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
