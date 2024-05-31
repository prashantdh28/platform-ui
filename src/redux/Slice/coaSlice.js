import { createSlice } from "@reduxjs/toolkit";
import { getCourceOfActionData } from "../../Services/COA/coa.service";

const courceOfActionSlice = createSlice({
    name: "courceOfAction",
    initialState: {
        courceOfActionLoading: false,
        courceOfActionError: null,
        courceOfActionData: {},
    },
    reducers: {
        resetCourceOfActionData: (state, action) => ({
            ...state,
            courceOfActionLoading: false,
            courceOfActionError: null,
            courceOfActionData: {},
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourceOfActionData.pending, (state) => ({
                ...state,
                courceOfActionLoading: true,
                courceOfActionData: {},
                courceOfActionError: null,
            }))
            .addCase(getCourceOfActionData.fulfilled, (state, action) => ({
                ...state,
                courceOfActionLoading: false,
                courceOfActionData: action.payload,
                courceOfActionError: null,
            }))
            .addCase(getCourceOfActionData.rejected, (state, action) => ({
                ...state,
                courceOfActionLoading: false,
                courceOfActionData: {},
                courceOfActionError: action.payload,
            }));
    },
});

export const { resetCourceOfActionData } = courceOfActionSlice.actions;
export default courceOfActionSlice.reducer;
