import { createSlice } from "@reduxjs/toolkit";
import {
    getTCCompactByTypeAndFilter,
    getThreatCoverage,
    saveThreatCoverage,
    updateThreatCoverage,
} from "../../../Services/TID/threatCoverage.service";

const initialState = {
    loading: false,
    threatCoverageData: [],
    threatCoverageCompactData: [],
    threatCoverageError: null,
};

const threatCoverageSlice = createSlice({
    name: "threatCoverage",
    initialState: initialState,
    reducers: {
        resetThreatCoverageData: (state) => ({
            ...state,
            loading: false,
            threatCoverageData: initialState.threatCoverageData,
            threatCoverageError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getThreatCoverage.pending, (state) => ({
                ...state,
                loading: true,
                threatCoverageError: null,
            }))
            .addCase(getThreatCoverage.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageData: action.payload,
                threatCoverageError: null,
            }))
            .addCase(getThreatCoverage.rejected, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageData: [],
                threatCoverageError: action.payload,
            }))
            .addCase(updateThreatCoverage.pending, (state) => ({
                ...state,
                loading: true,
                threatCoverageError: null,
            }))
            .addCase(updateThreatCoverage.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageData: action.payload,
                threatCoverageError: null,
            }))
            .addCase(updateThreatCoverage.rejected, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageData: [],
                threatCoverageError: action.payload,
            }))
            .addCase(getTCCompactByTypeAndFilter.pending, (state) => ({
                ...state,
                loading: true,
                threatCoverageError: null,
            }))
            .addCase(getTCCompactByTypeAndFilter.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageCompactData: action.payload,
                threatCoverageError: null,
            }))
            .addCase(getTCCompactByTypeAndFilter.rejected, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageCompactData: [],
                threatCoverageError: action.payload,
            }))
            .addCase(saveThreatCoverage.pending, (state) => ({
                ...state,
                loading: true,
            }))
            .addCase(saveThreatCoverage.fulfilled, (state, action) => ({
                ...state,
                loading: false,
            }))
            .addCase(saveThreatCoverage.rejected, (state, action) => ({
                ...state,
                loading: false,
            }));
    },
});
export const { resetThreatCoverageData } = threatCoverageSlice.actions;
export default threatCoverageSlice.reducer;

export const getThreatCoverageCompactData = (state) => state.threatCoverage.threatCoverageCompactData;
export const getThreatCoverageLoading = (state) => state.threatCoverage.loading;