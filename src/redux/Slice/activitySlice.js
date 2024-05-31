import { createSlice } from "@reduxjs/toolkit";
import { getActivity } from "../../Services/Activity/activity.service";

const activitySlice = createSlice({
    name: "activity",
    initialState: {
        activityLoading: false,
        activityError: null,
        activityData: [],
        currentPage: 0,
        hasMore: true,
        size: 5,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getActivity.pending, (state) => ({
                ...state,
                activityLoading: true,
                activityData: [],
                activityError: null,
            }))
            .addCase(getActivity.fulfilled, (state, action) => {
                const uniqueActivity = action.payload?.content.filter(
                    (activity) =>
                        !state?.activityData?.some(
                            (existingActivity) => existingActivity.topic_id === activity.topic_id
                        )
                );

                return {
                    ...state,
                    activityData: [...state.activityData, ...uniqueActivity],
                    activityLoading: false,
                    size: action.payload.size,
                    currentPage:
                        Math.ceil([...state.activityData, ...uniqueActivity].length / action.payload.size) -
                        1,

                    hasMore: !(
                        action.payload.totalElements === [...state.activityData, ...uniqueActivity].length
                    ),
                };
            })
            .addCase(getActivity.rejected, (state, action) => ({
                ...state,
                activityLoading: false,
                activityData: [],
                activityError: action.payload,
            }));
    },
});

export default activitySlice.reducer;
