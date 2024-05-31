// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosWrapper } from "../../helper";

// const BASE_URL = process.env.REACT_APP_API_BASE_URL_TID || "https://api.unitedplatform.org/tid";

export const getAllTIDEntity = createAsyncThunk(
    "TIDEntity/getAllTIDEntity",
    async (
        {
            searchValue,
            sourceRegion,
            targetRegion,
            targetedIndustries,
            entityType,
            motivation,
            sophistication,
            selectedTTps,
            page = 0,
            type,
        },
        { rejectWithValue, getState }
    ) => {
        try {
            let getType = "tid/entity";
            if (type) {
                getType = getType + `/${type}`;
            }
            let endPoint = `page=${page}&size=10`;
            if (searchValue) {
                endPoint = endPoint + `&text_filter=${searchValue}`;
            }
            if (sourceRegion && sourceRegion.length > 0) {
                endPoint = endPoint + `&source_region=${sourceRegion}`;
            }
            if (targetRegion && targetRegion.length > 0) {
                endPoint = endPoint + `&target_region=${targetRegion}`;
            }
            if (targetedIndustries && targetedIndustries.length > 0) {
                endPoint = endPoint + `&targated_industries=${targetedIndustries}`;
            }
            if (entityType && entityType.length > 0) {
                endPoint = endPoint + `&type=${entityType}`;
            }
            if (motivation) {
                endPoint = endPoint + `&motivation=${motivation}`;
            }
            if (sophistication) {
                endPoint = endPoint + `&sophistication=${sophistication}`;
            }
            if (selectedTTps && selectedTTps.length > 0) {
                endPoint = endPoint + `&ttps=${selectedTTps}`;
            }
            const response = await axiosWrapper.get(`${getType}?${endPoint}`);
            return { response, page, loadmore: page > 0 && response.content && response.content.length > 0 };
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const getTIDEntityByID = createAsyncThunk(
    "TIDEntity/getTIDEntityByID",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`tid/entity/${id}`);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const onEntityTagAdd = createAsyncThunk(
    "TIDEntity/entityTagAdd",
    async ({ requestObject }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.post(`entity/tags`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const onEntityTagDelete = createAsyncThunk(
    "TIDEntity/entityTagAdd",
    async ({ requestObject }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.request({
                url: "/entity/tags",
                method: "DELETE",
                data: requestObject,
            });
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const getTagsbyEntityId = createAsyncThunk(
    "TIDEntity/getTagsbyEntity",
    async (entityId, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`/tid/entity/${entityId}/tags`);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const getEntityCountGraph = createAsyncThunk(
    "TIDEntity/getEntityCountGraph",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`tid/entity/count`);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const trackEntity = createAsyncThunk(
    "TIDEntity/trackEntity",
    async ({ entityId, track }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`tid/entity/track/${entityId}?track=${track}`);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const saveFilter = createAsyncThunk(
    "TIDEntity/saveFilter",
    async ({ requestObject }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.post(`/tid/entity/filter`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const updateFilter = createAsyncThunk(
    "TIDEntity/updateFilter",
    async ({ requestObject, filterId }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.put(`/tid/entity/filter/${filterId}`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const deleteFilterByID = createAsyncThunk(
    "TIDEntity/deleteFilterByID",
    async ({ filterID }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.delete(`/tid/entity/filter/${filterID}`);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const getTIDFiltersByUserId = createAsyncThunk(
    "TIDEntity/getTIDFiltersByUserId",
    async ({ UserId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/tid/entity/filter`, {
                headers: {
                    user_id: `${UserId ? UserId : "a2f862c4-4996-44eb-8cc9-8c0e7775537e"}`,
                },
            });
            return response.data.content || [];
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const createDetectionRule = createAsyncThunk(
    "TIDEntity/createDetectionRule",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`tid/detection/empty`);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const updateDetectionRule = createAsyncThunk(
    "TIDEntity/createDetectionRule",
    async ({ requestObject, ruleID }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.put(`tid/detection/${ruleID}`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const getDetectionRulesByTechniqueId = createAsyncThunk(
    "TIDEntity/getDetectionRulesByTechniqueIdData",
    async ({ techniqueIds, page = 0 }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(
                `tid/detection/technique?techniqueIds=${techniqueIds}&page=${page}&size=20`
            );
            return { response, page, loadmore: page > 0 && response.content && response.content.length > 0 };
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const getDetectionRulesById = createAsyncThunk(
    "TIDEntity/getDetectionRulesByIdData",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`tid/detection/${id}`);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const downloadDetectionRules = async (techniqueIds) => {
    try {
        const response = await axiosInstance.get(`tid/detection/download?techniqueIds=${techniqueIds}`, {
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRiskScoreByThreatCoverage = createAsyncThunk(
    "TIDEntity/getRiskScoreByThreatCoverageData",
    async ({ threatCoverageID }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.get(`risk-management/risk-matrix/${threatCoverageID}`);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const getThreatCoverageReport = createAsyncThunk(
    "TIDEntity/getThreatCoverageReportData",
    async ({ selectedIds }, { rejectWithValue }) => {
        try {
            const requestIds = selectedIds && selectedIds.length > 0 && selectedIds.map((item) => item.id);
            const requestObject = { ids: requestIds };
            const response = await axiosWrapper.post(`tid/report?type=THREAT_COVERAGE`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const saveThreatCoverageReport = createAsyncThunk(
    "TIDEntity/saveThreatCoverageReportData",
    async ({ reportID, requestObject }, { rejectWithValue }) => {
        try {
            const response = await axiosWrapper.put(`tid/report/${reportID}`, requestObject);
            return response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const downloadThreatCoverageReportData = async (requestObject) => {
    try {
        const response = await axiosInstance.post(`tid/report/download`, requestObject, {
            // responseType: "blob",
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
