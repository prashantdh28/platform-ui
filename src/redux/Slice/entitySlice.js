import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetForm } from "./sharedInputSlice";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_INVESTIGATION || "https://api.unitedplatform.org";

//Slice initial state
const initialState = {
  entitiesdata: [],
  allEntityimg: [],
  loading: false,
};

// Get All Actors
export const getAllEntities = (activeTabId) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.get(`${BASE_URL}/inv/api/v1/entity/${activeTabId}`);
    if (response.status === 200) {
      dispatch(EntityGet(response.data));
    }
  } catch (err) {
    if (err?.response?.status === 400 || err?.response?.status === 500) {
      dispatch(loadingflag(false));
    }
    dispatch(loadingflag(false));
  }
};
// Get all Entity for Left palet
export const getAllEntityImg = () => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.get(`${BASE_URL}/inv/api/v1/entity/images?bucketName=static-up-assets`);
    if (response.status === 200) {
      const entitiesData =
          response.data &&
          response.data.length > 0 &&
          response.data.map((entity) => {
              const images =
                  entity &&
                  entity?.images?.length > 0 &&
                  entity.images.map((image) => {
                      const { id, shape, nodeType } = image;
                      return {
                          id,
                          shape,
                          data: { nodeType },
                      };
                  });
                  return { ...entity, images };
                });
                dispatch(AllEntityGet(entitiesData));
                dispatch(loadingflag(false));
    }
  } catch (err) {
    if (err?.response?.status === 400 || err?.response?.status === 500) {
      dispatch(loadingflag(false));
    }
    dispatch(loadingflag(false));
  }
};

// Add Entity
export const AddEntity =
  (data, showToast, setIsFormOpen) => async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/inv/api/v1/entity`, data);
      if (response.status === 200) {
        dispatch(EntityGet(response.data));
        dispatch(resetForm());
        setIsFormOpen(false);
        showToast("Entity Added successfully", {
          type: "success",
        });
      }
    } catch (err) {
      console.error("Error updating Entity data:", err);
    }
  };

// Relationship

// GET RELATION
// export const getRelation = () => async (dispatch) => {
//   try {
//     dispatch(loadingflag(true));
//     const response = await axios.get(
//       `${BASE_URL}/inv/api/v1/entity/images?bucketName=static-up-assets`
//     );
//     if (response.status === 200) {
//       // dispatch(AllEntityGet(response.data));
//     }
//   } catch (err) {
//     if (err?.response?.status === 400 || err?.response?.status === 500) {
//       dispatch(loadingflag(false));
//     }
//     dispatch(loadingflag(false));
//   }
// };
export const SearchEntity = (searchParams) => async (dispatch) => {
  try {
    dispatch(loadingflag(true));
    const response = await axios.post(
        `${BASE_URL}/inv/api/v1/entity/search?page=${0}&size=${10}&sort=${"asc"}`,
        searchParams
    );
    if (response.status === 200) {
      dispatch(EntityGet(response.data));
    }
  } catch (err) {
    console.error("Error searching Entity data:", err);
  } finally {
    dispatch(loadingflag(false));
  }
};

const entitySlice = createSlice({
  name: "entity",
  initialState,
  reducers: {
    loadingflag: (state, action) => {
      state.loading = action.payload;
    },
    EntityGet: (state, action) => {
      state.entitiesdata = action.payload;
    },
    AllEntityGet: (state, action) => {
      state.allEntityimg = action.payload;
    },
  },
});

export const { loadingflag, EntityGet, AllEntityGet } = entitySlice.actions;

export default entitySlice.reducer;
