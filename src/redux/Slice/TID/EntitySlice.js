import { createSlice } from "@reduxjs/toolkit";
import {
    createDetectionRule,
    getAllTIDEntity,
    getDetectionRulesById,
    getDetectionRulesByTechniqueId,
    getEntityCountGraph,
    getRiskScoreByThreatCoverage,
    getTIDEntityByID,
    getTIDFiltersByUserId,
    getThreatCoverageReport,
    saveThreatCoverageReport,
} from "../../../Services/TID/tid.service";

const initialState = {
    loading: false,
    TIDEntityError: null,
    entityData: [],
    entityAllData: [],
    entityID: {},
    entityIDs: [],
    entityCount: {},
    graphLoading: false,
    detectionInfoError: null,
    createdDetectionRuleData: {},
    detectionRulesLoading: false,
    detectionRulesData: [],
    detectionActualRuleData: [],
    detectionRulesError: null,
    pagination: {
        currentPage: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        lastPage: false,
    },
    rulePagination: {
        currentPage: 0,
        pageSize: 20,
        totalElements: 0,
        totalPages: 0,
        lastPage: false,
    },
    riskScoreData: {},
    riskScoreError: null,
    threatCoverageReportData: {},
    filterObject: {
        page: 0,
        searchValue: "",
        sourceRegion: [],
        targetRegion: [],
        targetedIndustries: [],
        entityType: [],
        motivation: "",
        sophistication: "",
        selectedTTps: [],
        selectedTTpsName: [],
        selectedOption: [],
        selectedFilter: [],
    },
    savedFiltersList: [],
    filterOptionsList: [],
};

const EntitySlice = createSlice({
    name: "TIDEntity",
    initialState,
    reducers: {
        TIDEntityGet: (state, action) => {
            state.entityData = action.payload;
        },
        getEntityAllData: (state, action) => {
            state.entityAllData = action.payload;
        },
        getEntityID: (state, action) => {
            state.entityID = action.payload;
        },
        loadingflag: (state, action) => {
            state.loading = action.payload;
        },
        setEntityIDs: (state, action) => {
            state.entityIDs = action.payload;
        },
        setFilterObject: (state, action) => {
            state.filterObject = action.payload;
        },
        setFilterOptionsList: (state, action) => {
            state.filterOptionsList = action.payload;
        },
        resetFilterObject: (state, action) => ({
            ...state,
            filterObject: initialState.filterObject,
            filterOptionsList: initialState.filterOptionsList,
        }),
        resetEntityListData: (state, action) => ({
            ...state,
            loading: false,
            entityAllData: [],
        }),
        resetDetectionRules: (state, action) => ({
            ...state,
            detectionRulesLoading: false,
            detectionRulesData: [],
            detectionRulesError: null,
            rulePagination: initialState.rulePagination,
        }),
        resetDetectionRule: (state, action) => ({
            ...state,
            detectionRulesLoading: false,
            detectionActualRuleData: [],
            detectionRulesError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTIDEntity.pending, (state) => ({
                ...state,
                loading: true,
                TIDEntityError: null,
            }))
            .addCase(getAllTIDEntity.fulfilled, (state, action) => {
                const { response, page, loadmore } = action.payload;
                return {
                    ...state,
                    loading: false,
                    entityAllData: loadmore
                        ? [...state.entityAllData, ...response.content]
                        : response.content,
                    TIDEntityError: null,
                    pagination: {
                        ...state.pagination,
                        currentPage: response?.number || page,
                        totalElements: response.totalElements,
                        totalPages: response.totalPages,
                        lastPage: response.last,
                    },
                };
            })
            .addCase(getAllTIDEntity.rejected, (state, action) => ({
                ...state,
                loading: false,
                entityAllData: [],
                TIDEntityError: action.payload,
            }))
            .addCase(getTIDEntityByID.pending, (state) => ({
                ...state,
                loading: true,
            }))
            .addCase(getTIDEntityByID.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                entityID: action.payload,
            }))
            .addCase(getTIDEntityByID.rejected, (state) => ({
                ...state,
                loading: false,
                entityID: {},
            }))
            .addCase(getEntityCountGraph.pending, (state) => ({
                ...state,
                graphLoading: true,
            }))
            .addCase(getEntityCountGraph.fulfilled, (state, action) => ({
                ...state,
                graphLoading: false,
                entityCount: action.payload,
            }))
            .addCase(getEntityCountGraph.rejected, (state) => ({
                ...state,
                graphLoading: false,
                entityCount: {},
            }))

            .addCase(createDetectionRule.pending, (state) => ({
                ...state,
                loading: true,
                detectionRulesError: null,
            }))
            .addCase(createDetectionRule.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                createdDetectionRuleData: action.payload,
                detectionRulesError: null,
            }))
            .addCase(createDetectionRule.rejected, (state, action) => ({
                ...state,
                loading: false,
                createdDetectionRuleData: {},
                detectionRulesError: action.payload,
            }))
            .addCase(getDetectionRulesByTechniqueId.pending, (state) => ({
                ...state,
                detectionRulesLoading: true,
                detectionRulesError: null,
            }))
            .addCase(getDetectionRulesByTechniqueId.fulfilled, (state, action) => {
                const { response, page, loadmore } = action.payload;
                return {
                    ...state,
                    detectionRulesLoading: false,
                    detectionRulesData: loadmore
                        ? [...state.detectionRulesData, ...response.content]
                        : response.content,
                    detectionRulesError: null,
                    rulePagination: {
                        ...state.rulePagination,
                        currentPage: page,
                        totalElements: response.totalElements,
                        totalPages: response.totalPages,
                        lastPage: response.last,
                    },
                };
            })
            .addCase(getDetectionRulesByTechniqueId.rejected, (state, action) => ({
                ...state,
                detectionRulesLoading: false,
                detectionRulesData: [],
                detectionRulesError: action.payload,
            }))
            .addCase(getDetectionRulesById.pending, (state) => ({
                ...state,
                detectionRulesLoading: true,
                detectionRulesError: null,
            }))
            .addCase(getDetectionRulesById.fulfilled, (state, action) => ({
                ...state,
                detectionRulesLoading: false,
                detectionActualRuleData: action.payload,
                detectionRulesError: null,
            }))
            .addCase(getDetectionRulesById.rejected, (state, action) => ({
                ...state,
                detectionRulesLoading: false,
                detectionActualRuleData: [],
                detectionRulesError: action.payload,
            }))
            .addCase(getRiskScoreByThreatCoverage.pending, (state) => ({
                ...state,
                loading: true,
                riskScoreError: null,
            }))
            .addCase(getRiskScoreByThreatCoverage.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                riskScoreData: action.payload,
                riskScoreError: null,
            }))
            .addCase(getRiskScoreByThreatCoverage.rejected, (state, action) => ({
                ...state,
                loading: false,
                riskScoreData: {},
                riskScoreError: action.payload,
            }))
            .addCase(getThreatCoverageReport.pending, (state) => ({
                ...state,
                loading: true,
                threatCoverageError: null,
            }))
            .addCase(getThreatCoverageReport.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageReportData: action.payload,
                threatCoverageError: null,
            }))
            .addCase(getThreatCoverageReport.rejected, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageReportData: {},
                threatCoverageError: action.payload,
            }))
            .addCase(saveThreatCoverageReport.pending, (state) => ({
                ...state,
                loading: true,
                threatCoverageError: null,
            }))
            .addCase(saveThreatCoverageReport.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageReportData: action.payload,
                threatCoverageError: null,
            }))
            .addCase(saveThreatCoverageReport.rejected, (state, action) => ({
                ...state,
                loading: false,
                threatCoverageReportData: {},
                threatCoverageError: action.payload,
            }))
            .addCase(getTIDFiltersByUserId.fulfilled, (state, action) => ({
                ...state,
                savedFiltersList: action.payload,
            }));
    },
});

export const {
    TIDEntityGet,
    loadingflag,
    getEntityAllData,
    getEntityID,
    setEntityIDs,
    setFilterObject,
    setFilterOptionsList,
    resetDetectionRules,
    resetDetectionRule,
    resetEntityListData,
    resetFilterObject,
} = EntitySlice.actions;

export default EntitySlice.reducer;
