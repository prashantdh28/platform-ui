import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWrapper } from "../../helper";

export const getActivity = createAsyncThunk(
    "activity/getActivity",
    async ({ id, page = 0, size = 4, sort = "last_activity%2CDESC" }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(
                `actors/${id}/activity?page=${page}&size=${size}&sort=${sort}`
            );
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getChannal = async (id) => {
  try {
      const response = await axiosWrapper.get(`channels/${id}`);
      return response;
  } catch (error) {
      console.error(error.message, "Error message");
  }
};

export const getChannalMessages = async (id) => {
  try {
      const response = await axiosWrapper.get(`channels/${id}/messages`);
      return response;
  } catch (error) {
      console.error(error.message, "Error message");
  }
};

export const getChannalMessage = async (id) => {
  try {
      const response = await axiosWrapper.get(`messages/${id}`);
      return response;
  } catch (error) {
      console.error(error.message, "Error message");
  }
};

export const getSophisticationData = async (id) => {
    try {
        const response = await axiosWrapper.get(`actors/sophistication`);
        return response;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const getThreatActorTypesData = async (id) => {
    try {
        const response = await axiosWrapper.get(`actors/actor-type`);
        return response;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};

export const getMotivationsData = async (id) => {
    try {
        const response = await axiosWrapper.get(`actors/motivation`);
        return response;
    } catch (error) {
        console.error(error.message, "Error message");
    }
};