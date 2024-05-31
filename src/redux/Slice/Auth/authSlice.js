import { createSlice } from "@reduxjs/toolkit";
import {
    authSignIn,
    authSignOut,
    authSignUp,
    getUserList,
    hadnleValidateVerificationCode,
    handleSignInConfirmation,
} from "../../../Services/Auth/Auth.service";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        users: [],
        userError: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authSignIn.pending, (state) => ({
                ...state,
                loading: true,
                userError: null,
            }))
            .addCase(authSignIn.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                userError: null,
            }))
            .addCase(authSignIn.rejected, (state, action) => ({
                ...state,
                loading: false,
                userError: action.payload,
            }))
            .addCase(handleSignInConfirmation.pending, (state) => ({
                ...state,
                loading: true,
                userError: null,
                user: {},
            }))
            .addCase(handleSignInConfirmation.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                userError: null,
                user: action.payload,
            }))
            .addCase(handleSignInConfirmation.rejected, (state, action) => ({
                ...state,
                loading: false,
                userError: action.payload,
            }))
            .addCase(hadnleValidateVerificationCode.pending, (state) => ({
                ...state,
                loading: true,
                userError: null,
            }))
            .addCase(hadnleValidateVerificationCode.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    userError: null,
                    user: { ...state.user, ...action.payload },
                };
            })
            .addCase(hadnleValidateVerificationCode.rejected, (state, action) => ({
                ...state,
                loading: false,
                userError: action.payload,
            }))
            .addCase(authSignUp.pending, (state) => ({
                ...state,
                loading: true,
                user: {},
            }))
            .addCase(authSignUp.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                user: action.payload,
            }))
            .addCase(authSignUp.rejected, (state, action) => ({
                ...state,
                loading: false,
                userError: action.payload,
            }))
            .addCase(getUserList.pending, (state) => ({
                ...state,
                loading: true,
                users: [],
            }))
            .addCase(getUserList.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                users: action.payload,
            }))
            .addCase(getUserList.rejected, (state, action) => ({
                ...state,
                loading: false,
                userError: action.payload,
            }))
            .addCase(authSignOut.fulfilled, (state, action) => ({
                ...state,
                user: {},
            }));
    },
});

export default authSlice.reducer;

export const getUser = (state) => state.auth.user;
export const getUsers = (state) => state.auth.users;
export const getUserError = (state) => state.auth.userError;
export const getLoading = (state) => state.auth.loading;
