import React, { useEffect } from "react";
import { ReactComponent as NextIcon } from "../../../../Assests/SVG/addIcon.svg";
import { ReactComponent as CreateIcon } from "../../../../Assests/SVG/createIcon.svg";
import ThreatsTabs from "./ThreatsTabs";
import IntelGraph from "./ThreatsTabs/IntelGraph";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getEntityTypes,
    getMotivation,
    getRegions,
    getSectors,
    getSophistication,
} from "../../../../Services/Vocabulary/vocabulary.service";
import { getEntityCountGraph, getTIDFiltersByUserId } from "../../../../Services/TID/tid.service";
import useToastify from "../../../../Hooks/useToastify";

const Threats = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showToast } = useToastify();

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);

    useEffect(() => {
        dispatch(getRegions());
        dispatch(getEntityTypes());
        dispatch(getMotivation());
        dispatch(getSophistication());
        dispatch(getSectors());
        dispatch(getEntityCountGraph());
        dispatch(getTIDFiltersByUserId({}));
    }, [dispatch]);
    return (
        <>
            <div className="tid-dashboard-graph-container">
                <div className="tid-intel-graph">
                    <IntelGraph />
                </div>
                <div className="tid-create-button" onClick={() => navigate("/intel-flow/select-threat")}>
                    <div className="tid-create-icon">
                        <CreateIcon className="next-icon-svg" style={{ width: "4rem", height: "4rem" }} />
                        Create
                    </div>
                    <div className="vector-ellipse vector-ellipse-risk-matrix" style={{}} />
                </div>
                <div
                    className="tid-create-button"
                    onClick={() => {
                        if (entityIDs?.length > 0) {
                            navigate("/intel-flow/graphviews");
                        } else {
                            showToast("Please select at least one entity before proceeding.", {
                                type: "error",
                            });
                        }
                    }}
                >
                    <div className="tid-next-icon">
                        <NextIcon className="next-icon-svg" />
                        <span style={entityIDs?.length > 0 ? { color: "#4a92b2" } : { color: "#8e97a4" }}>
                            ATT&CK Matrix
                        </span>
                    </div>
                    <div
                        className="vector-ellipse vector-ellipse-risk"
                        style={{
                            background: `${
                                entityIDs?.length > 0
                                    ? "linear-gradient(180deg,#4a92b2 0.73%,rgba(27, 58, 106, 0.58) 25.05%,rgba(23, 46, 80, 0.58) 49.37%,#111d2f 70.71%)"
                                    : "linear-gradient(180deg,#8e97a4 0.73%,rgba(27, 58, 106, 0.58) 25.05%,rgba(23, 46, 80, 0.58) 49.37%,#111d2f 70.71%)"
                            }`,
                        }}
                    />
                </div>
            </div>
            <div className="tid-threats-list-container">
                <ThreatsTabs />
            </div>
        </>
    );
};

export default Threats;
