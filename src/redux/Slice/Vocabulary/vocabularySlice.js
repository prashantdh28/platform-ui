import { createSlice } from "@reduxjs/toolkit";
import {
    getActorType,
    getEntityTypes,
    getMotivation,
    getRegions,
    getRelationship,
    getSectors,
    getSophistication,
    getTags,
    getDescribeScReports,
    getAffectedPlatformList,
    getCapabilities
} from "../../../Services/Vocabulary/vocabulary.service";

const vocabularySlice = createSlice({
    name: "vocabulary",
    initialState: {
        regions: [],
        entityTypes: [],
        motivation: [],
        sophistication: [],
        sectors: [],
        tags:[],
        actorTypes: [],
        relationships: [],
        reports: [],
        plateforms:[],
        capabilitiesList:[]
    },
    extraReducers: (builder) => {
        builder.addCase(getRegions.fulfilled, (state, action) => ({
            ...state,
            regions: action.payload,
        }));
        builder.addCase(getEntityTypes.fulfilled, (state, action) => ({
            ...state,
            entityTypes: action.payload,
        }));
        builder.addCase(getMotivation.fulfilled, (state, action) => ({
            ...state,
            motivation: action.payload,
        }));
        builder.addCase(getSophistication.fulfilled, (state, action) => ({
            ...state,
            sophistication: action.payload,
        }));
        builder.addCase(getSectors.fulfilled, (state, action) => ({
            ...state,
            sectors: action.payload,
        }));
        builder.addCase(getTags.fulfilled,(state, action) => ({
            ...state,
            tags : action.payload,
        }))
        builder.addCase(getActorType.fulfilled,(state, action) => ({
            ...state,
            actorTypes : action.payload,
        }))
        builder.addCase(getRelationship.fulfilled,(state, action) => ({
            ...state,
            relationships : action.payload,
        }))
        builder.addCase(getDescribeScReports.fulfilled,(state, action) => ({
            ...state,
            reports : action.payload,
        }))
        builder.addCase(getAffectedPlatformList.fulfilled,(state, action) => ({
            ...state,
            plateforms : action.payload,
        }))
        builder.addCase(getCapabilities.fulfilled,(state, action) => ({
            ...state,
            capabilitiesList : action.payload,
        }))
    },
});

export default vocabularySlice.reducer;
