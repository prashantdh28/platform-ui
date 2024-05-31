import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_CHAT || "https://api.unitedplatform.org";

// Slice initial state
const initialState = {
    allUsersForChat: [],
    user: [],
    chatsData: [],
    loading: false,
};

// Get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(`${BASE_URL}/chat/api/v1/user`);
        if (response.status === 200) {
            dispatch(allUsersGet(response.data));
        }
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false));
        }
        dispatch(loadingflag(false));
    }
};

// GET USERS FOR CHAT
export const getUsersForChat = (id) => async (dispatch) => {
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(`${BASE_URL}/chat/api/v1/user/1/chat`);
        if (response.status === 200) {
            dispatch(UserGet(response.data));
        }
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false));
        }
        dispatch(loadingflag(false));
    }
};

// get chats by user
export const getChatByUser = (id) => async (dispatch) => {
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(`${BASE_URL}/chat/api/v1/user/1/chat/${id}`);
        if (response.status === 200) {
            dispatch(ChatGet(response.data));
        }
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false));
        }
        dispatch(loadingflag(false));
    }
};

// Send a message
export const sendMessage = (data, id) => async (dispatch) => {
    try {
        // const response = await axios.post(
        //     `${BASE_URL}/chat/api/v1/user/chat/${id}`,
        //     data,
        //     {
        //         withCredentials: true,
        //         headers: {
        //             "Access-Control-Allow-Credentials": true,
        //         },
        //     }
        // );
        dispatch({
            type: "sendMessage",
            payload: { messageTopic: `/app/send-message/${id}`, messageData: data },
        });
        // if (response.status === 200) {
        //     // dispatch(NewGroupAdd(response.data));
        //     dispatch(getChatByUser(id));
        // }
    } catch (err) {
        console.error("Error adding comment:", err);
    }
};

export const addGroup = (name) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/chat/api/v1/group/add`, name);
        if (response.status === 200) {
            dispatch(NewGroupAdd(response.data));
            dispatch(getUsersForChat());
        }
    } catch (err) {
        console.error("Error adding comment:", err);
    }
};

export const connectStomp = () => ({ type: "connect" });

export const disconnectStomp = () => ({ type: "disconnect" });

export const subscribeToChat = (chatId) => async (dispatch) => {
    await dispatch({
        type: "subscribe",
        payload: {
            topic: `/user/${chatId}/public`,
        },
    });
};

export const unsubscribeFromChat = () => async (dispatch) => {
    dispatch({ type: "unsubscribe" });
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        loadingflag: (state, action) => {
            state.loading = action.payload;
        },
        allUsersGet: (state, action) => {
            state.allUsersForChat = action.payload;
        },
        UserGet: (state, action) => {
            state.user = action.payload;
        },
        ChatGet: (state, action) => {
            state.chatsData = action.payload;
        },
        ClearChat: (state, action) => {
            state.chatsData = [];
        },
        NewGroupAdd: (state, action) => {
            state.user = action.payload;
        },
        addChat: (state, action) => {
            state.chatsData.push(action.payload);
        },
    },
});
export const { loadingflag, allUsersGet, UserGet, ChatGet, ClearChat, NewGroupAdd, addChat } =
    chatSlice.actions;

export default chatSlice.reducer;
