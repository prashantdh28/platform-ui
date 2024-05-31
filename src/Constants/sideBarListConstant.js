import { ReactComponent as ThreatList } from "../Assests/SVG/threatList.svg";
// import { ReactComponent as RiskManagementList } from "../Assests/SVG/RiskManagementList.svg";
import { ReactComponent as TaskList } from "../Assests/SVG/task-square.svg";
import { ReactComponent as Dashboard } from "../Assests/SVG/Dashboard.svg";
import { ReactComponent as IntelFlow } from "../Assests/SVG/IntelFlow.svg";
import { ReactComponent as Support } from "../Assests/SVG/message-question.svg";
import { ReactComponent as Setting } from "../Assests/SVG/setting.svg";
import { ReactComponent as MyWorkspace } from "../Assests/SVG/my-workspace.svg";
// import { ReactComponent as InvestigationIcon } from "../Assests/SVG/InvestigationIcon.svg";

export const sideBarList = [
    {
        header: "Threat Informed",
        headerIcon: <ThreatList />,
        href: "",
        children: [
            {
                header: "Dashboard",
                headerIcon: <Dashboard />,
                href: "dashboard",
            },
            {
                header: "Intel Flow",
                headerIcon: <IntelFlow />,
                href: "intel-flow",
            },
        ],
    },
    // {
    //     header: "Risk Management",
    //     headerIcon: <RiskManagementList />,
    //     href: "risk-management",
    //     children: [],
    // },
    // {
    //     header: "Investigation",
    //     headerIcon: <InvestigationIcon />,
    //     href: "investication",
    //     children: [],
    // },
    {
        header: "My Tasks",
        headerIcon: <TaskList />,
        href: "my-tasks",
        children: [],
    },
    {
        header: "My Workspace",
        headerIcon: <MyWorkspace />,
        href: "my-workspace",
        children: [],
    },
    {
        header: "Settings",
        headerIcon: <Setting />,
        href: "settings",
        children: [],
    },
    {
        header: "Support",
        headerIcon: <Support />,
        href: "support",
        children: [],
    },
];
