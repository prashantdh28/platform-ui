import { createSlice } from "@reduxjs/toolkit";
import {
    assignTask,
    getProductBasedSuggestion,
    getTasksList,
    updateTasks,
} from "../../../Services/TID/myTasks.service";

const initialState = {
    tasksLoading: false,
    addUpdateLoading: false,
    tasksListData: [],
    taskListsError: null,
};

const myTasksSlice = createSlice({
    name: "myTasks",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(assignTask.pending, (state) => ({
                ...state,
                addUpdateLoading: true,
                taskListsError: null,
            }))
            .addCase(assignTask.fulfilled, (state) => ({
                ...state,
                addUpdateLoading: false,
                taskListsError: null,
            }))
            .addCase(assignTask.rejected, (state, action) => ({
                ...state,
                addUpdateLoading: false,
                taskListsError: action.payload,
            }))
            .addCase(getTasksList.pending, (state) => ({
                ...state,
                tasksLoading: true,
                taskListsError: null,
            }))
            .addCase(getTasksList.fulfilled, (state, action) => ({
                ...state,
                tasksLoading: false,
                tasksListData: action.payload,
                taskListsError: null,
            }))
            .addCase(getTasksList.rejected, (state, action) => ({
                ...state,
                tasksLoading: false,
                tasksListData: [],
                taskListsError: action.payload,
            }))
            .addCase(updateTasks.pending, (state) => ({
                ...state,
                addUpdateLoading: true,
                taskListsError: null,
            }))
            .addCase(updateTasks.fulfilled, (state, action) => ({
                ...state,
                addUpdateLoading: false,
                taskListsError: null,
            }))
            .addCase(updateTasks.rejected, (state, action) => ({
                ...state,
                addUpdateTaskLoading: false,
                taskListsError: action.payload,
            }))
            .addCase(getProductBasedSuggestion.pending, (state) => ({
                ...state,
                addUpdateLoading: true,
                taskListsError: null,
            }))
            .addCase(getProductBasedSuggestion.fulfilled, (state, action) => ({
                ...state,
                addUpdateLoading: false,
                taskListsError: null,
            }))
            .addCase(getProductBasedSuggestion.rejected, (state, action) => ({
                ...state,
                addUpdateTaskLoading: false,
                taskListsError: action.payload,
            }));
    },
});
export default myTasksSlice.reducer;

export const getTaskListData = (state) => state.myTasks.tasksListData;
export const getTasksLoading = (state) => state.myTasks.tasksLoading;
export const getAddUpdateTaskLoading = (state) => state.myTasks.addUpdateLoading;
