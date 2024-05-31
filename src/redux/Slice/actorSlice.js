import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllActors, getSingleActor } from "../../Services/Actors/actors.service";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://api.unitedplatform.org";

//Slice initial state
const initialState = {
    actoresdata: [],
    getsingleTTPdata: {},
    loading: false,
    singleactorData: {},
    currentPage: 0,
    hasMore: true,
    size: 5,
};

// export const getAllActors = createAsyncThunk(
//   'actors/getAllActors',
//   async ({ page = 0, size = 5 }, { dispatch, rejectWithValue }) => {
//       try {
//           const response = await axios.get(`${BASE_URL}/actors?page=${page}&size=${size}`);
//           return response.data.content;
//       } catch (err) {
//           if (err?.response?.status === 400 || err?.response?.status === 500) {
//               // Handle specific error statuses if needed
//           }
//           return rejectWithValue(err.message || 'An error occurred');
//       }
//   }
// );

//Get Single Actor
// export const getSingleActors = (id) => async (dispatch) => {
//     try {
//         dispatch(loadingflag(true));
//         const response = await axios.get(`${BASE_URL}/actors/${id}`);

//         // if (response.status === 200) {
//         dispatch(SingleActorGet(response.data));
//         dispatch(loadingflag(false));

//         // }
//     } catch (err) {
//         if (err?.response?.status === 400 || err?.response?.status === 500) {
//             dispatch(loadingflag(false));
//         }
//         dispatch(loadingflag(false));
//     }
// };

//Get All TTPS
export const getSingleTtp = (id) => async (dispatch) => {
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(`${BASE_URL}/actors/${id}/attack-pattern`);

        // if (response.status === 200) {
        dispatch(SingleTTPGet(response.data));
        dispatch(loadingflag(false));

        // }
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false));
        }
        dispatch(loadingflag(false));
    }
};

const actorSlice = createSlice({
    name: "actor",
    initialState,
    reducers: {
        loadingflag: (state, action) => {
            state.loading = action.payload;
        },
        ActorGet: (state, action) => {
            state.actoresdata = action.payload;
        },
        SingleTTPGet: (state, action) => {
            state.getsingleTTPdata = action.payload;
        },
        resetState: (state) => {
            return {
                ...state,
                actoresdata: [],
                currentPage: 0,
                hasMore: true,
            };
        },
        updateActorData: (state, action) => {
            const { id: updateActorId, tags } = action.payload;
            const updatedActorData =
                state.actoresdata &&
                state.actoresdata.length > 0 &&
                state.actoresdata.map((actor) => {
                    if (actor.id === updateActorId) {
                        const updatedTags = [...tags];
                        return {
                            ...actor,
                            tags: updatedTags,
                        };
                    } else return { ...actor };
                });
            return {
                ...state,
                actoresdata: updatedActorData,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllActors.pending, (state) => ({
                ...state,
                loading: true,
                error: null,
            }))
            .addCase(getAllActors.fulfilled, (state, action) => {
                const uniqueActors = action.payload?.content.filter(
                    (actor) => !state?.actoresdata?.some((existingActor) => existingActor.id === actor.id)
                );

                return {
                    ...state,
                    actoresdata: [...state.actoresdata, ...uniqueActors],
                    loading: false,
                    size: action.payload.size,
                    currentPage:
                        Math.ceil([...state.actoresdata, ...uniqueActors].length / action.payload.size) - 1,

                    hasMore: !(
                        action.payload.totalElements === [...state.actoresdata, ...uniqueActors].length
                    ),
                };
            })
            .addCase(getAllActors.rejected, (state, action) => ({
                ...initialState,
                loading: false,
                error: action.payload || "An error occurred",
            }))
            .addCase(getSingleActor.pending, (state) => ({
                ...state,
                loading: true,
                error: null,
            }))
            .addCase(getSingleActor.fulfilled, (state, action) => ({
                ...state,
                singleactorData: action.payload,
                loading: false,
            }))
            .addCase(getSingleActor.rejected, (state, action) => ({
                ...state,
                loading: false,
                singleactorData: {},
                error: action.payload || "An error occurred",
            }));
    },
});

export const { loadingflag, ActorGet, SingleTTPGet, resetState, updateActorData } = actorSlice.actions;

export default actorSlice.reducer;

