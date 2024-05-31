import { fetchAuthSession } from "aws-amplify/auth";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URL;
export const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(async (config) => {
    const { idToken, accessToken } = (await fetchAuthSession()).tokens ?? {};
    config.headers["access-token"] = accessToken;
    config.headers["Authorization"] = `Bearer ${idToken}`;
    return config;
});

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    function (error) {
        if (error?.response?.status === 401) {
            toast("You are not authorized", { type: "error" });
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = `/login`;
        }
        return Promise.reject(error);
    }
);

export const axiosWrapper = {
    get: axiosGet,
    post: axiosPost,
    put: axiosPut,
    delete: axiosDelete,
};

async function axiosGet(url) {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

async function axiosPost(url, body) {
    try {
        const response = await axiosInstance.post(url, body);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

async function axiosPut(url, body) {
    try {
        const response = await axiosInstance.put(url, body);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

async function axiosDelete(url) {
    try {
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

function handleError(error) {
    if (error.response) {
        // The request was made, but the server responded with an error status code
        return Promise.reject(error.response.data);
    } else if (error.request) {
        // The request was made, but no response was received
        return Promise.reject("No response from the server");
    } else {
        // Something happened in setting up the request that triggered an error
        return Promise.reject("Request error: " + error.message);
    }
}
