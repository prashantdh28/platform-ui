import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setActiveTab } from "./tabSlice";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_INVESTIGATION || "https://api.unitedplatform.org";

// Slice initial state
const initialState = {
    singleinvestigationsdata: [],
    addnewinvestigation: [],
    allinvestigationsdata: [],
    comments: [],
    openInvestigations: [],
    loading: false,
};

// Get Single Investigations
export const getSingleInvestigations = (activeTabId) => async (dispatch) => {
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(
            `${BASE_URL}/inv/api/v1/investigation/${activeTabId}?includeER=true&timestamp=${new Date().getTime()}`,
            {
                headers: {
                    // "Cache-Control": "no-cache",
                    // Vary: "Origin",
                },
            }
        );
        if (response.status === 200) {
            dispatch(InvestigationGet(response.data));
            dispatch(loadingflag(false));
        }
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false));
        }
        dispatch(loadingflag(false));
    }
};

// Get All Investigations
export const getAllInvestigations = () => async (dispatch) => {
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(
            `${BASE_URL}/inv/api/v1/investigation?timestamp=${new Date().getTime()}`,
            {
                headers: {
                    // "Cache-Control": "no-cache",
                    // Vary: "Origin",
                },
            }
        );
        if (response.status === 200) {
            const responseData = response && response.data ? response.data : [];
            const totalElements = response && response.data ? response.data.length : [].length;
            dispatch(AllInvestigation({ data: responseData, totalElements: totalElements }));
            dispatch(loadingflag(false));
        }
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false));
        }
        dispatch(loadingflag(false));
    }
};

// search Investigation
export const searchInvestigation =
    ({ search, status, createdDate, page = 0, size = 10 }) =>
    async (dispatch) => {
        try {
            const searchObject = {
                search: search || "",
                status: status || "",
            };
            if (createdDate) {
                searchObject["createdDate"] = createdDate;
            }

            dispatch(loadingflag(true));
            const response = await axios.post(
                `${BASE_URL}/inv/api/v1/investigation/search?page=${page}&size=${size}&sort='&timestamp=${new Date().getTime()}`,
                searchObject,
                {
                    headers: {
                        // "Cache-Control": "no-cache",
                        // Vary: "Origin",
                    },
                }
            );
            if (response.status === 200) {
                const responseData = response && response.data ? response.data?.content : [];
                dispatch(AllInvestigation({ data: responseData }));
                dispatch(loadingflag(false));
            }
        } catch (err) {
            if (err?.response?.status === 400 || err?.response?.status === 500) {
                dispatch(loadingflag(false));
            }
            dispatch(loadingflag(false));
        }
    };

// Add Investigation
export const AddInvestigation = (data, showToast) => async (dispatch) => {
    try {
        dispatch(loadingflag(true));

        const response = await axios.post(`${BASE_URL}/inv/api/v1/investigation`, data);
        if (response.status === 200) {
            dispatch(investigationDataAdded(response.data));
            dispatch(resetAllInvestigationData());

            dispatch(getAllInvestigations());
            dispatch(getSingleInvestigations(response?.data?.id));

            dispatch(loadingflag(false));

            showToast("Investigation Added successfully", {
                type: "success",
            });
        }
    } catch (err) {
        console.error("Error updating investigation data:", err);
        dispatch(loadingflag(false));
    }
};

// Added New comment
export const addInvestigationComment = (activeTabId, comment) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/inv/api/v1/investigation/${activeTabId}/comment`,
            comment
        );
        if (response.status === 200) {
            dispatch(InvestigationCommentAdd(response.data));
            dispatch(getAllComments(activeTabId));
        }
    } catch (err) {
        console.error("Error adding comment:", err);
    }
};

// Delete Investigations
export const DeleteInvestigations = (Id, showToast) => async (dispatch) => {
    try {
        dispatch(loadingflag(true));
        const response = await axios.delete(`${BASE_URL}/inv/api/v1/investigation/${Id}`);
        if (response.status === 200) {
            dispatch(getAllInvestigations());
            showToast("Investigation Deleted successfully", {
                type: "success",
            });
        }
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false));
        }
        dispatch(loadingflag(false));
    }
};

// Get all the comments for investigation
export const getAllComments = (activeTabId) => async (dispatch) => {
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(`${BASE_URL}/inv/api/v1/investigation/${activeTabId}/comment`);
        if (response.status === 200) {
            dispatch(InvestigationComments(response.data));
            dispatch(loadingflag(false));
        }
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false));
        }
        dispatch(loadingflag(false));
    }
};

// Update Investigation Data
export const updateInvestigationData = (activeTabId, data, showToast, switchtab) => async (dispatch, getState) => {
    try {
        dispatch(loadingflag(true));
        let { openInvestigations } = getState()?.investigation;

        const response = await axios.put(`${BASE_URL}/inv/api/v1/investigation/${activeTabId}`, data);
        if (response.status === 200) {
            if (!switchtab) {
                dispatch(investigationDataUpdated(response.data));
                const updatedOpenInvestigationsdata = openInvestigations.filter(
                    (tab) => tab?.status !== "DELETED"
                );

                dispatch(OpenInvestigationsTab(updatedOpenInvestigationsdata));

                const updatedTab = updatedOpenInvestigationsdata?.map((tab) => {
                    if (tab.id === activeTabId) {
                        return {
                            ...tab,
                            text: `${response?.data?.name ? response?.data?.name : tab?.name}`,
                        };
                    }
                    return { ...tab };
                });
                dispatch(OpenInvestigationsTab(updatedTab));
            }

            showToast("Investigation Updated successfully", {
                type: "success",
            });
            dispatch(loadingflag(false));
        }
    } catch (err) {
        console.error("Error updating investigation data:", err);
        dispatch(loadingflag(false));
    }
};

// Add this new action to investigationSlice.js
export const deleteInvestigationTab = (tabId) => (dispatch) => {
    dispatch(removeInvestigationTab(tabId)); // dispatch removeInvestigationTab from investigationSlice
};

// Modify removeInvestigationTab function in investigationSlice.js
export const removeInvestigationTab = (tabId) => (dispatch, getState) => {
    const { openInvestigations } = getState().investigation;

    const indexToDelete = openInvestigations.findIndex((tab) => tab.id === tabId);
    if (indexToDelete !== -1) {
        const updatedTabs = openInvestigations.filter((tab) => tab.id !== tabId);
        const newActiveTabId = indexToDelete > 0 ? updatedTabs[indexToDelete - 1].id : 0;

        dispatch(OpenInvestigationsTab(updatedTabs));
        dispatch(setActiveTab(newActiveTabId));
    }
};

const investigationSlice = createSlice({
    name: "investigation",
    initialState,
    reducers: {
        loadingflag: (state, action) => {
            state.loading = action.payload;
        },

        InvestigationGet: (state, action) => {
            state.singleinvestigationsdata = action.payload;
        },
        investigationDataAdded: (state, action) => {
            state.addnewinvestigation = action.payload;
        },
        AllInvestigation: (state, action) => {
            state.allinvestigationsdata = action.payload.data;
            state.totalElements = action.payload.totalElements || state.totalElements;
        },
        InvestigationCommentAdd: (state, action) => {
            state.comments.push(action.payload);
        },
        InvestigationComments: (state, action) => {
            state.comments = action.payload;
        },
        investigationDataUpdated: (state, action) => {
            state.singleinvestigationsdata = action.payload;
        },
        resetInvestigationData: (state, action) => {
            state.singleinvestigationsdata = [];
        },
        resetAllInvestigationData: (state, action) => {
            state.allinvestigationsdata = [];
        },

        OpenInvestigationsTab: (state, action) => {
            state.openInvestigations = action.payload;
        },
        addNewTab: (state, action) => {
            const newTab = action.payload;
            state.openInvestigations.push(newTab);
        },
    },
});

export const {
    loadingflag,
    InvestigationGet,
    InvestigationCommentAdd,
    investigationDataUpdated,
    AllInvestigation,
    resetInvestigationData,
    resetAllInvestigationData,
    InvestigationComments,
    investigationDataAdded,
    OpenInvestigationsTab,
    addNewTab,
} = investigationSlice.actions;

export default investigationSlice.reducer;
