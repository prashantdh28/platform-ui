import { createSlice } from "@reduxjs/toolkit";
import {
  getAttackMatrix,
  getAttackMatrixGraph,
  getEmptyAttackMatrix,
  getEntityGraphById,
} from "../../../Services/TID/attackMatrix.service";

const attackMatrixSlice = createSlice({
  name: "attackMatrix",
  initialState: {
    attackMatrixLoading: false,
    attackMatrixGraphLoading: false,
    entityGraphLoading: false,
    attackMatrixError: null,
    attackMatrixData: { entities: [], content: [] },
    entityGraphData: { nodes: [], connectors: [] },
    attackMatrixGraphData: { data: [] },
  },
  reducers: {
    resetAttackMatrixData: (state, action) => ({
      ...state,
      attackMatrixLoading: false,
      attackMatrixError: null,
      attackMatrixData: { entities: [], content: [] },
    }),
    resetGraphData: (state, action) => ({
      ...state,
      entityGraphLoading: false,
      attackMatrixError: null,
      entityGraphData: { nodes: [], connectors: [] },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmptyAttackMatrix.pending, (state) => ({
        ...state,
        attackMatrixLoading: true,
        attackMatrixError: null,
      }))
      .addCase(getEmptyAttackMatrix.fulfilled, (state, action) => ({
        ...state,
        attackMatrixLoading: false,
        attackMatrixData: action.payload,
        attackMatrixError: null,
      }))
      .addCase(getEmptyAttackMatrix.rejected, (state, action) => ({
        ...state,
        attackMatrixLoading: false,
        attackMatrixData: { entities: [], content: [] },
        attackMatrixError: action.payload,
      }))
      .addCase(getAttackMatrix.pending, (state) => ({
        ...state,
        attackMatrixLoading: true,
        attackMatrixError: null,
      }))
      .addCase(getAttackMatrix.fulfilled, (state, action) => ({
        ...state,
        attackMatrixLoading: false,
        attackMatrixData: action.payload,
        attackMatrixError: null,
      }))
      .addCase(getAttackMatrix.rejected, (state, action) => ({
        ...state,
        attackMatrixLoading: false,
        attackMatrixData: { entities: [], content: [] },
        attackMatrixError: action.payload,
      }))
      .addCase(getEntityGraphById.pending, (state) => ({
        ...state,
        entityGraphLoading: true,
        attackMatrixError: null,
      }))
      .addCase(getEntityGraphById.fulfilled, (state, action) => ({
        ...state,
        entityGraphLoading: false,
        entityGraphData: action.payload,
        attackMatrixError: null,
      }))
      .addCase(getEntityGraphById.rejected, (state, action) => ({
        ...state,
        entityGraphLoading: false,
        entityGraphData: { entities: [], content: [] },
        attackMatrixError: action.payload,
      }))

      .addCase(getAttackMatrixGraph.pending, (state) => ({
        ...state,
        attackMatrixGraphLoading: true,
        attackMatrixError: null,
      }))
      .addCase(getAttackMatrixGraph.fulfilled, (state, action) => ({
        ...state,
        attackMatrixGraphLoading: false,
        attackMatrixGraphData: action.payload,
        attackMatrixError: null,
      }))
      .addCase(getAttackMatrixGraph.rejected, (state, action) => ({
        ...state,
        attackMatrixGraphLoading: false,
        attackMatrixGraphData: { entities: [], content: [] },
      }));
  },
});
export const { resetAttackMatrixData, resetGraphData } =
  attackMatrixSlice.actions;
export default attackMatrixSlice.reducer;
