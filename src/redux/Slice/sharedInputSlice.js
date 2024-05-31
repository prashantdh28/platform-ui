// sharedInputSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    name: "",
    id: "",
    description: "",
    threatTypes: "",
    aliases1: "",
    aliases2: "",
    firstseen: "",
    lastseen: "",
    roles: "",
    goals: "",
    sophistication: "",
    resourse: "",
    primary: "",
    secondary: "",
    language: "",
    score: "",
    imglink: "",
    Key: "",
    Value: "",
    Tagsearch: "",
  },
  relationData: {
    from: "ThreatActor",
    to: "ThreatActor",
    type: "",
    startDate: "02.02.2023",
    EndDate: "",
    additionallyKey: "",
    additionallyValue: "",
    tags: "",
  },
};

const sharedInputSlice = createSlice({
  name: "sharedInput",
  initialState: initialState,
  reducers: {
    updateSharedInput: (state, action) => {
      state.data = action.payload;
    },
    updateSharedRelationInput: (state, action) => {
      state.relationData = action.payload;
    },
    resetForm: (state) => {
      state.data = initialState.data;
    },
    resetRelationForm: (state) => {
      state.relationData = {};
    },
  },
});

export const {
  updateSharedInput,
  updateSharedRelationInput,
  resetForm,
  resetRelationForm,
} = sharedInputSlice.actions;
export default sharedInputSlice.reducer;
