import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../../Hooks/useQuery";
import BackdropLoader from "../../../../Components/Loader/BackdropLoader";

const RiskMatrixViewScreen = lazy(() => import("./RiskMatrixViewScreen"));
const SunBurstGraphScreen = lazy(() => import("./GraphScreen/SunBurstGraphScreen"));

const RiskMatrixScreen = () => {
    let query = useQuery().get("type");

    const navigate = useNavigate();

    const onButtonClick = async (type) => {
        navigate(`/intel-flow/risk-matrix?type=${type}`);
        if (!type) {
            navigate(`/intel-flow/risk-matrix`);
        }
        // await getThreatCoverageReportData();
    };

    return (
        <Suspense fallback={<BackdropLoader loading={true} />}>
            {query === "matrix-view" ? (
                <RiskMatrixViewScreen onButtonClick={onButtonClick} />
            ) : (
                <SunBurstGraphScreen onButtonClick={onButtonClick} />
            )}
        </Suspense>
    );
};

export default RiskMatrixScreen;
