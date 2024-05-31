import { createSlice } from "@reduxjs/toolkit";
import { createEntity, generateAIEntity, getEntityTypes, updateEntity } from "../../../Services/TID/dataCreation.service";

// Slice initial state
const initialState = {
    activeThreatStep: 0,
    completedThreatStep: {},
    selectedEntity: null,
    allEntitiesTypes: {},
    requestObject: {},
    loading: false,
    error: null,
    responseTime: ""
};

const DataCreationSlice = createSlice({
    name: "DataCreation",
    initialState,
    reducers: {
        setThreatActiveTab: (state, action) => {
            state.activeThreatStep = action.payload;
        },
        setCompletedThreatStep: (state, action) => {
            state.completedThreatStep = action.payload;
        },
        setSelectedEntity: (state, action) => {
            state.selectedEntity = action.payload;
        },
        setRequestObject: (state, action) => {
            state.requestObject = action.payload;
        },
        setResponseTime: (state, action) => {
            state.responseTime = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEntityTypes.pending, (state) => ({
                ...state,
                loading: true,
                allEntitiesTypes: null,
            }))
            .addCase(getEntityTypes.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                allEntitiesTypes: action.payload,
            }))
            .addCase(getEntityTypes.rejected, (state, action) => ({
                ...state,
                loading: false,
                allEntitiesTypes: {},
                error: action.payload,
            }))
            .addCase(generateAIEntity.pending, (state) => ({
                ...state,
                loading: true,
            }))
            .addCase(generateAIEntity.fulfilled, (state, action) => {
                const { responseTime, ...reqestObject } = action.payload
                return ({
                ...state,
                loading: false,
                requestObject: { ...reqestObject },
                responseTime: responseTime
            })})
            .addCase(generateAIEntity.rejected, (state, action) => ({
                ...state,
                loading: false,
                error: action.payload,
            }))
            .addCase(createEntity.pending, (state) => ({
                ...state,
                loading: true,
            }))
            .addCase(createEntity.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                requestObject: { ...action.payload },
            }))
            .addCase(createEntity.rejected, (state, action) => ({
                ...state,
                loading: false,
                error: action.payload,
            }))
            .addCase(updateEntity.pending, (state) => ({
                ...state,
                loading: true,
            }))
            .addCase(updateEntity.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                requestObject: { ...action.payload },
            }))
            .addCase(updateEntity.rejected, (state, action) => ({
                ...state,
                loading: false,
                error: action.payload,
            }));
    },
});

export const { setThreatActiveTab, setCompletedThreatStep, setSelectedEntity, setRequestObject, setResponseTime } =
    DataCreationSlice.actions;
export default DataCreationSlice.reducer;

export const getActiveThreatStep = (state) => state.dataCreations.activeThreatStep;
export const getLoadingState = (state) => state.dataCreations.loading;
export const getCompletedThreatStep = (state) => state.dataCreations.completedThreatStep;
export const getSelectedEntity = (state) => state.dataCreations.selectedEntity;
export const getAllEntitiesTypes = (state) => state.dataCreations.allEntitiesTypes;
export const getRequestObject = (state) => state.dataCreations.requestObject;
export const getResponseTime = (state) => state.dataCreations.responseTime;
