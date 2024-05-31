import { createSlice } from "@reduxjs/toolkit";
import { getRecommendations, sendMessageToSlack } from "../../../Services/TID/recommendation.service";

const initialState = {
    loading: false,
    recommendationsData: {},
    recommendationsError: null,
    slackLoading: false,
    slackError: null,
};

const recommendationsSlice = createSlice({
    name: "recommendations",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getRecommendations.pending, (state) => ({
                ...state,
                loading: true,
                recommendationsError: null,
            }))
            .addCase(getRecommendations.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                recommendationsData: action.payload,
                recommendationsError: null,
            }))
            .addCase(getRecommendations.rejected, (state, action) => ({
                ...state,
                loading: false,
                recommendationsData: initialState.recommendationsData,
                recommendationsError: action.payload,
            }))
            .addCase(sendMessageToSlack.pending, (state) => ({
                ...state,
                slackLoading: true,
                slackError: null,
            }))
            .addCase(sendMessageToSlack.fulfilled, (state, action) => ({
                ...state,
                slackLoading: false,
                slackError: null,
            }))
            .addCase(sendMessageToSlack.rejected, (state, action) => ({
                ...state,
                slackLoading: false,
                slackError: action.payload,
            }));
    },
});

export default recommendationsSlice.reducer;

export const getRecommendationsData = (state) => state.recommendations.recommendationsData;
export const getRecommendationsLoading = (state) => state.recommendations.loading;
export const getSlackLoading = (state) => state.recommendations.slackLoading;
