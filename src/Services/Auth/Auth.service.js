import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    confirmSignUp,
    signIn,
    signOut,
    signUp,
    resendSignUpCode,
    getCurrentUser,
    fetchAuthSession,
    verifyTOTPSetup,
    updateMFAPreference,
    confirmSignIn,
} from "aws-amplify/auth";
import { axiosWrapper } from "../../helper";

export const authSignUp = createAsyncThunk(
    "auth/signUp",
    async ({ name, password, email }, { rejectWithValue }) => {
        try {
            const resoponse = await signUp({
                username: email,
                password: password,
                options: {
                    userAttributes: {
                        email,
                        name: name,
                    },
                    autoSignIn: true,
                },
            });
            return resoponse;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const authSignUpConfirmation = createAsyncThunk(
    "auth/signUpConfirmation",
    async ({ email, confirmationCode }, { rejectWithValue }) => {
        try {
            const resoponse = await confirmSignUp({
                username: email,
                confirmationCode,
            });
            return resoponse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const authSignIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await signIn({ username: email, password: password });
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const handleTOTPVerification = createAsyncThunk(
    "auth/handleTOTPVerification",
    async ({ totpCode }, { rejectWithValue }) => {
        try {
            const resoponse = await verifyTOTPSetup({ code: totpCode });
            return resoponse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const handleSignInConfirmation = createAsyncThunk(
    "auth/handleSignInConfirmation",
    async ({ totpCode }, { rejectWithValue, dispatch }) => {
        try {
            const resoponse = await confirmSignIn({ challengeResponse: totpCode });
            const response = await dispatch(hadnleCheckEmailVerified()).unwrap();
            if (!response.verified) {
                return { ...resoponse, emailVerified: false, isSignedIn: false };
            }
            const userData = await getCurrentUser();
            const session = await fetchAuthSession();
            const { idToken } = session.tokens ?? {};
            return { ...resoponse, ...userData, name: idToken?.payload.name, emailVerified: true };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const hadnleCheckEmailVerified = createAsyncThunk(
    "auth/hadnleCheckEmailVerified",
    async (_, { rejectWithValue }) => {
        try {
            const resoponse = await axiosWrapper.get(`/user-service/users/user/email-verified`);
            return resoponse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const hadnleValidateVerificationCode = createAsyncThunk(
    "auth/hadnleCheckEmailVerified",
    async ({ verificationCode }, { rejectWithValue, getState }) => {
        try {
            const resoponse = await axiosWrapper.post(`user-service/users/user/${verificationCode}`);
            if (resoponse.verified) {
                const state = await getState();
                const userData = await getCurrentUser();
                const session = await fetchAuthSession();
                const { idToken } = session.tokens ?? {};
                return {
                    ...state?.auth?.user,
                    ...userData,
                    name: idToken?.payload.name,
                    emailVerified: true,
                    isSignedIn: true,
                };
            }
            return resoponse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const handleUpdateMFAPreference = createAsyncThunk(
    "auth/handleTOTPVerification",
    async (_, { rejectWithValue }) => {
        try {
            const resoponse = await updateMFAPreference({ totp: "PREFERRED" });
            return resoponse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const authResendSignUpCode = createAsyncThunk(
    "auth/resendSignUpCode",
    async ({ email }, { rejectWithValue }) => {
        try {
            const resoponse = await resendSignUpCode({ username: email });
            return resoponse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const authSignOut = createAsyncThunk("auth/signOut", async ({ _ }, { rejectWithValue }) => {
    try {
        const resoponse = await signOut();
        return resoponse;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getUserList = createAsyncThunk("auth/users", async (_, { rejectWithValue }) => {
    try {
        const resoponse = await axiosWrapper.get(`/user-service/users`);
        return resoponse;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
