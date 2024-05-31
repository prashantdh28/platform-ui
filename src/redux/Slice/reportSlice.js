import { createSlice } from "@reduxjs/toolkit";
import { getReportData } from "../../Services/Report/report.service";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reportLoading: false,
    reportError: null,
    reportData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReportData.pending, (state) => ({
        ...state,
        reportLoading: true,
        reportData: {},
        reportError: null,
      }))
      .addCase(getReportData.fulfilled, (state, action) => ({
        ...state,
        reportLoading: false,
        reportData: action.payload,
        reportError: null,
      }))
      .addCase(getReportData.rejected, (state, action) => ({
        ...state,
        reportLoading: false,
        reportData: {},
        reportError: action.payload,
      }));
  },
});

export default reportSlice.reducer;
