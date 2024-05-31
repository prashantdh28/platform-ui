import { combineReducers } from "redux";
import actorReducer from "../redux/Slice/actorSlice"; // Import your theme reducer here
import themeReducer from "../redux/Slice/themeSlice"; // Import your theme reducer here
import activitySlice from "./Slice/activitySlice";
import chatReducer from "./Slice/chatSlice";
import coaSlice from "./Slice/coaSlice";
import dataCreationSlice from "./Slice/DataCreation/DataCreationSlice";
import enitityReducer from "./Slice/entitySlice";
import investigationReducer from "./Slice/investigationSlice";
import mitreSlice from "./Slice/mitreSlice";
import reportSlice from "./Slice/reportSlice";
import riskManagementApiSlice from "./Slice/riskManagementApiSlice";
import riskManagementSlice from "./Slice/riskManagementSlice";
import sharedInputSlice from "./Slice/sharedInputSlice";
import tabReducer from "./Slice/tabSlice";
import AttackMatrixSlice from "./Slice/TID/AttackMatrixSlice";
import detectionSlice from "./Slice/TID/DetectionSlice";
import entitySlice from "./Slice/TID/EntitySlice";
import recommendationsSlice from "./Slice/TID/RecommendationsSlice";
import riskMatrixSlice from "./Slice/TID/RiskMatrixSlice";
import threatCoverageSlice from "./Slice/TID/ThreatCoverageSlice";
import vocabularySlice from "./Slice/Vocabulary/vocabularySlice";
import authSlice from "./Slice/Auth/authSlice";
import myTasksSlice from "./Slice/TID/myTasksSlice";

export const rootReducer = combineReducers({
  theme: themeReducer,
  actor: actorReducer,
  activity: activitySlice,
  mitre: mitreSlice,
  courceOfAction: coaSlice,
  report: reportSlice,
  actorform: sharedInputSlice,
  tabs: tabReducer,
  entity: enitityReducer,
  investigation: investigationReducer,
  chat: chatReducer,
  risk: riskManagementSlice,
  TIDEntity: entitySlice,
  riskApi: riskManagementApiSlice,
  attackMatrix: AttackMatrixSlice,
  threatCoverage: threatCoverageSlice,
  detection: detectionSlice,
  recommendations: recommendationsSlice,
  myTasks: myTasksSlice,
  vocabulary: vocabularySlice,
  dataCreations: dataCreationSlice,
  riskMatrix: riskMatrixSlice,
  auth: authSlice,
});
