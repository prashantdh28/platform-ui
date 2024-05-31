import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const getThreatCoverage = createAsyncThunk(
    "threatCoverageData/getThreatCoverageData",
    async ({ selectedIds }, { rejectWithValue }) => {
        try {
            const requestIds = selectedIds && selectedIds.length > 0 && selectedIds.map((item) => item.id);
            const requestObject = { ids: requestIds };
            let response = await axiosWrapper.post(`tid/entity/threat-coverage`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const updateThreatCoverage = createAsyncThunk(
    "threatCoverageData/updateThreatCoverageData",
    async ({ requestObject, threatCoverageId }) => {
        try {
            let response = await axiosWrapper.put(
                `tid/entity/threat-coverage/${threatCoverageId}`,
                requestObject
            );
            return response;
        } catch (error) {
            // if (!error.response) {
            throw error;
            // }
        }
    }
);

export const getTCCompactByTypeAndFilter = createAsyncThunk(
    "threatCoverageData/getTCCompactByTypeAndFilter",
    async ({ selectedIds, top, type = "CONTROL", sortBy = "techniques" }, { rejectWithValue }) => {
        try {
            let requestUrl = `tid/entity/threat-coverage-compact?type=${type}&sort_by=${sortBy}`;
            if (top) {
                requestUrl = requestUrl + `&top=${top}`;
            }
            const requestIds = selectedIds && selectedIds.length > 0 && selectedIds.map((item) => item.id);
            const requestObject = { ids: requestIds };
            let response = await axiosWrapper.post(requestUrl, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const saveThreatCoverage = createAsyncThunk(
    "threatCoverageData/saveThreatCoverage",
    async ({ requestObject, threatCoverageType }) => {
        try {
            let response = await axiosWrapper.put(
                `tid/entity/threat-coverage?type=${threatCoverageType}`,
                requestObject
            );
            return response;
        } catch (error) {
            // if (!error.response) {
            throw error;
            // }
        }
    }
);