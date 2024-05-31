import { useLocation, useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import { ReactComponent as NextIcon } from "../../../Assests/SVG/addIcon.svg";
import { useQuery } from "../../../Hooks/useQuery";
import IntelFlowNavigators from "./IntelFlowNavigators";

const HeaderIntelFlow = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let query = useQuery().get("type");

    return (
        <>
            <div className="tid-dashboard-stepper-breadcrumb">
                <IntelFlowNavigators />
                {query === "attack" ? (
                    <div
                        className="mtr-graph-remediation-box-top"
                        onClick={() => navigate("/intel-flow/remediations")}
                    >
                        <div className="remediation-text-icon-top">
                            <NextIcon />
                            Remediations
                        </div>
                        <div className="vector-ellipse-remediations" />
                    </div>
                ) : (
                    ""
                )}
                {pathname && pathname.includes("recommendation") && (
                    <div
                        className="mtr-graph-remediation-box-top"
                        onClick={() => navigate("/intel-flow/risk-matrix")}
                    >
                        <div className="remediation-text-icon-top">
                            <NextIcon />
                            Risk Profile
                        </div>
                        <div className="vector-ellipse-remediations" />
                    </div>
                )}
            </div>
            <Outlet />
        </>
    );
};

export default HeaderIntelFlow;
