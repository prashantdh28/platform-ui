import { createSlice } from "@reduxjs/toolkit";
import { getMitreData } from "../../Services/Mitre/mitreAttack.service";

const mitreSlice = createSlice({
    name: "mitre",
    initialState: {
        mitreLoading: false,
        mitreError: null,
        mitreData: { entities: [], content: [] },
    },
    reducers: {
        resetMitreAttackData: (state, action) => ({
            ...state,
            mitreLoading: false,
            mitreError: null,
            mitreData: { entities: [], content: [] },
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMitreData.pending, (state) => ({
                ...state,
                mitreLoading: true,
                mitreError: null,
            }))
            .addCase(getMitreData.fulfilled, (state, action) => ({
                ...state,
                mitreLoading: false,
                mitreData: action.payload,
                mitreError: null,
            }))
            .addCase(getMitreData.rejected, (state, action) => ({
                ...state,
                mitreLoading: false,
                mitreData: { entities: [], content: [] },
                mitreError: action.payload,
            }));
    },
});
export const { resetMitreAttackData } = mitreSlice.actions;
export default mitreSlice.reducer;
