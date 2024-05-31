import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import ComingSoon from "../layout/ComingSoon";
import BackdropLoader from "../Components/Loader/BackdropLoader";
// import Appbar from "../Components/Appbar/Appbar";
// import MainScreen from "../Screens/ThreatActors/MainScreen/MainScreen";
// import SpinnerLoader from "../Components/Loader/SpinnerLoader";
// import SingleEntityScreen from "../Screens/TID/EntitiesListsScreen/SingleEntityScreen/SingleEntityScreen";
// import DataCreation from "../Screens/TID/DataCreation/DataCreationScreen";
// import CreateThreatScreen from "../Screens/TID/DataCreation/CreateNewThreat/CreateThreatScreen";
// import CreateRuleScreen from "../Screens/TID/Detection/CreateRule/CreateRuleScreen";
// import Investigation from "../Investigation/Components/Investigation";
// import CreateRisk from "../RiskMangement/CreateRisk/createRisk";
// import RiskManagement from "../RiskMangement/riskManagement";
// import SignUp from "../modules/auth/signUp";
import PrivateRoute from "../modules/auth/privateRoute/PrivateRoute";
// import RemediationsDetail from "../modules/TID/intelFlow/Remediations/RemediationsDetail";
// import SelectThreat from "../modules/TID/intelFlow/Create";
// import CreateThreat from "../modules/TID/intelFlow/Create/Create-Threat-Screen";
// import SignIn from "../modules/auth/signIn";
// import HeaderIntelFlow from "../modules/TID/intelFlow/HeaderIntelFlow";
// const TIDBreadCrumb = lazy(() => import("../TID/Components/TIDBreadCrumb/TIDBreadCrumb"));
// const EntitiesListScreen = lazy(() => import("../Screens/TID/EntitiesListsScreen/EntitiesListScreen"));
// const ATTCKComparisonScreen = lazy(() => import("../Screens/TID/ATT&CKComparison/ATTCKComparisonScreen"));
// const TIDTabs = lazy(() => import("../TID/Components/TIDTabs/TIDTabs"));
// const DetectionScreen = lazy(() => import("../Screens/TID/Detection/DetectionScreen"));
// const RiskScore = lazy(() => import("../Screens/TID/RiskScore/RiskScoreScreen"));
// const DownloadReport = lazy(() => import("../TID/Components/TIDDownloadReport/DownloadReport"));
// const TIDTemplate = lazy(() => import("../TID/Components/TIDTemplates/TIDTemplate"));
const SignUp = lazy(() => import("../modules/auth/signUp"));
const SignIn = lazy(() => import("../modules/auth/signIn"));
const IntelFlow = lazy(() => import("../modules/TID/intelFlow"));
const HeaderIntelFlow = lazy(() => import("../modules/TID/intelFlow/HeaderIntelFlow"));
const Threats = lazy(() => import("../modules/TID/intelFlow/Threats"));
const SelectThreat = lazy(() => import("../modules/TID/intelFlow/Create"));
const CreateThreat = lazy(() => import("../modules/TID/intelFlow/Create/Create-Threat-Screen"));
const EntityScreenDetailed = lazy(() => import("../modules/TID/intelFlow/Threats/ThreatDetailView"));
const MitreAttack = lazy(() => import("../modules/TID/intelFlow/Attacks-Matrix/MitreAttack"));
const Remediations = lazy(() => import("../modules/TID/intelFlow/Remediations"));
const RemediationsDetail = lazy(() => import("../modules/TID/intelFlow/Remediations/RemediationsDetail"));
const HuntAndDetect = lazy(() => import("../modules/TID/intelFlow/Hunt&Detect"));
const Recommendation = lazy(() => import("../modules/TID/intelFlow/Recommendation"));
const RiskMatrixScreen = lazy(() => import("../modules/TID/intelFlow/Risk-Matrix"));
const MyTaskScreen = lazy(() => import("../modules/MyTasks"));
const ShowResults = lazy(() => import("../modules/TID/intelFlow/SerachModule/SearchedResults"));
const MyWorkspace = lazy(() => import("../modules/myWorkspace"));
const WorkspaceLists = lazy(() => import("../modules/myWorkspace/WorkspaceLists"));
const MyWorkspaceHeader = lazy(() => import("../modules/myWorkspace/MyWorkspaceHeader"));

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <Suspense fallback={<BackdropLoader loading />}>
                <SignIn />
            </Suspense>
        ),
    },
    {
        path: "/signup",
        element: (
            <Suspense fallback={<BackdropLoader loading />}>
                <SignUp />
            </Suspense>
        ),
    },
    // {
    //     element:<PrivateRoute/>,
    //     children:[]
    // },
    // {
    //     path: "/",
    //     element: <PrivateRoute Component={Appbar} />,
    //     // errorElement: <NotFound />,
    //     children: [
    //         { path: "/", element: <MainScreen /> },
    //         // { path: "/newactor", element: <CreateActor /> },
    //         // { path: "/newactor/:id", element: <CreateActor /> },
    //         // {
    //         //     path: "/singlecard/:actorId",
    //         //     element: <SingleCard />,
    //         //     children: [
    //         //         // {
    //         //         //   path: "",
    //         //         //   // loader: <SpinnerLoader />,
    //         //         //   element: (
    //         //         //     <React.Suspense fallback={<SpinnerLoader />}>
    //         //         //       <Grid />
    //         //         //     </React.Suspense>
    //         //         //   ),
    //         //         // },
    //         //         {
    //         //             path: "", // This will match /SingleCard/:actorId by default
    //         //             element: (
    //         //                 <React.Suspense fallback={<SpinnerLoader />}>
    //         //                     <Activity />
    //         //                 </React.Suspense>
    //         //             ),
    //         //             children: [
    //         //                 {
    //         //                     path: "",
    //         //                     element: (
    //         //                         <React.Suspense fallback={<SpinnerLoader />}>
    //         //                             <ActivityTables />
    //         //                         </React.Suspense>
    //         //                     ),
    //         //                 },
    //         //                 {
    //         //                     path: "channal/:channelId",
    //         //                     element: <ActivityThreads />,
    //         //                     children: [
    //         //                         {
    //         //                             path: "",
    //         //                             element: (
    //         //                                 <React.Suspense fallback={<SpinnerLoader />}>
    //         //                                     <ActivityChannal />
    //         //                                 </React.Suspense>
    //         //                             ),
    //         //                         },
    //         //                         { path: "message", element: <SocialRead /> },
    //         //                     ],
    //         //                 },
    //         //             ],
    //         //         },
    //         //         {
    //         //             path: "mitre",
    //         //             // loader: <SpinnerLoader />,
    //         //             element: (
    //         //                 <React.Suspense fallback={<SpinnerLoader />}>
    //         //                     <TabMitreTable />
    //         //                 </React.Suspense>
    //         //             ),
    //         //         },
    //         //         {
    //         //             path: "report",
    //         //             element: (
    //         //                 <React.Suspense fallback={<SpinnerLoader />}>
    //         //                     <ReportTable />
    //         //                 </React.Suspense>
    //         //             ),
    //         //         },
    //         //     ],
    //         // },
    //         // { path: "/compare", element: <MitreAttackScreen /> },
    //         // { path: "/courseofaction", element: <Course /> },
    //         // { path: "/finish", element: <Finish /> },
    //         // {
    //         //     path: "/tid",
    //         //     element: (
    //         //         <Suspense fallback={<SpinnerLoader />}>
    //         //             <TIDBreadCrumb />
    //         //         </Suspense>
    //         //     ),
    //         //     children: [
    //         //         { path: "", element: <EntitiesListScreen />, exact: true },
    //         //         { path: "attack", element: <ATTCKComparisonScreen /> },
    //         //         { path: "threat-coverage", element: <TIDTabs /> },
    //         //         { path: "detection", element: <DetectionScreen /> },
    //         //         { path: "risk-score", element: <RiskScore /> },
    //         //         { path: "download", element: <DownloadReport /> },
    //         //         { path: "download/template", element: <TIDTemplate /> },
    //         //         // { path: "download", element: <Finish /> },
    //         //     ],
    //         // },
    //         // {
    //         //     path: "/tid/:id",
    //         //     element: <SingleEntityScreen />,
    //         // },
    //         // {
    //         //     path: "/tid/select-threat",
    //         //     element: <DataCreation />,
    //         //     // children: [{ path: "create-threat", element: <EntitiesListScreen /> }],
    //         // },
    //         // {
    //         //     path: "/tid/select-threat/create-threat",
    //         //     element: <CreateThreatScreen />,
    //         // },
    //         // {
    //         //     path: "/tid/select-threat/update-threat/:id",
    //         //     element: <CreateThreatScreen />,
    //         // },
    //         // {
    //         //     path: "/tid/create-rule",
    //         //     element: <CreateRuleScreen />,
    //         // },
    //         // {
    //         //     path: "/investigation",
    //         //     element: <Investigation />,
    //         // },
    //         // {
    //         //     path: "/risk-management",
    //         //     element: <RiskManagement />,
    //         // },
    //         // // {
    //         // //     path: "/create-risk",
    //         // //     element: <CreateRisk />,
    //         // // },
    //         // {
    //         //     path: "/create-risk/:id",
    //         //     element: <CreateRisk />,
    //         // },
    //     ],
    // },
    {
        path: "/",
        element: <PrivateRoute Component={Layout} />,
        children: [
            { path: "dashboard", element: <ComingSoon /> },
            { path: "risk-management", element: <ComingSoon /> },
            { path: "investication", element: <ComingSoon /> },
            {
                path: "my-tasks",
                element: (
                    <Suspense fallback={<BackdropLoader loading />}>
                        <MyTaskScreen />
                    </Suspense>
                ),
            },
            {
                path: "intel-flow",
                element: (
                    <Suspense fallback={<BackdropLoader loading />}>
                        <IntelFlow />
                    </Suspense>
                ),
                children: [
                    {
                        path: "",
                        element: <HeaderIntelFlow />,
                        children: [
                            {
                                path: "",
                                element: <Threats />,
                            },
                            {
                                path: "graphviews",
                                element: <MitreAttack />,
                            },
                            {
                                path: "remediations",
                                element: <Remediations />,
                            },
                            {
                                path: "remediations/:id",
                                element: <RemediationsDetail />,
                            },
                            {
                                path: "hunt-detect",
                                element: <HuntAndDetect />,
                            },
                            {
                                path: "recommendation",
                                element: <Recommendation />,
                            },
                            {
                                path: "risk-matrix",
                                element: <RiskMatrixScreen />,
                            },
                        ],
                    },
                    {
                        path: ":id",
                        element: <EntityScreenDetailed />,
                    },
                    {
                        path: "select-threat",
                        element: (
                            <Suspense fallback={<BackdropLoader loading />}>
                                <SelectThreat />
                            </Suspense>
                        ),
                    },
                    {
                        path: "create-threat",
                        element: (
                            <Suspense fallback={<BackdropLoader loading />}>
                                <CreateThreat />
                            </Suspense>
                        ),
                    },
                    {
                        path: "create-threat/:id",
                        element: (
                            <Suspense fallback={<BackdropLoader loading />}>
                                <CreateThreat />
                            </Suspense>
                        ),
                    },
                ],
            },
            { path: "settings", element: <ComingSoon /> },
            { path: "support", element: <ComingSoon /> },
            {
                path: "my-workspace",
                element: (
                    // <ComingSoon />
                    <Suspense fallback={<BackdropLoader loading />}>
                        <MyWorkspaceHeader />
                    </Suspense>
                ),
                children: [
                    {
                        path: "",
                        element: <MyWorkspace />,
                    },
                    {
                        path: ":id",
                        element: <WorkspaceLists />,
                    },
                ],
            },
            {
                path: "search-results",
                element: (
                    <Suspense fallback={<BackdropLoader loading />}>
                        <ShowResults />
                    </Suspense>
                ),
            },
        ],
    },
    // {
    //   path: "/entities",
    //   element: <Appbar />,
    //   children: [
    //     { path: "/entities", element: <EntitiesListScreen /> },
    //     //   { path: "/courseofaction", element: <Course /> },
    //     //   { path: "/finish", element: <Finish /> },
    //   ],
    // },

    // {
    //   path: "/risk-management",
    //   element: <Appbar />,
    //   children: [{ path: "", element: <RiskManagement /> }],
    // },
    // {
    //   path: "/createrisk",
    //   element: <Appbar />,
    //   children: [{ path: "", element: <CreateRisk /> }],
    // }
]);

export default router;
