import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const getCourceOfActionData = createAsyncThunk(
    "courceOfAction/getCourceOfActionData",
    async ({ selectedIds }, { rejectWithValue }) => {
        try {
            const requestIds =
                selectedIds && selectedIds.length > 0 && selectedIds.map((item) => item.actorId);
            const requestObject = { ids: requestIds };
            const response = await axiosWrapper.post("/actors/coa", requestObject);
            return response;
        } catch (error) {
            console.error(error.message, "Error message");
            return rejectWithValue(error.message);
        }
    }
);
