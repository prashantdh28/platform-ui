import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TidNavigator } from "../../../Constants/TidNavigatorConstant";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useSelector } from "react-redux";
import useToastify from "../../../Hooks/useToastify";

const IntelFlowNavigators = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useToastify();

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);

    const [isActiveIndex, setIsActiveIndex] = useState(0);
    // const [lastIndex, setLastIndex] = useState(0);
    const lastIndex = TidNavigator.length - 1;

    useEffect(() => {
        const activeIndex = TidNavigator.findIndex((navigator) => navigator.pathname === location.pathname);
        setIsActiveIndex(activeIndex);
        // setLastIndex((prevIndex) =>
        //     TidNavigator.length - 1 === activeIndex ? activeIndex : activeIndex + 1
        // );
        if (
            !entityIDs?.length > 0 &&
            location.pathname !== "/intel-flow" &&
            location?.state !== "/intel-flow"
        ) {
            showToast("Please select at least one entity before proceeding.", {
                type: "error",
            });
            navigate("/intel-flow");
        }
    }, [location, entityIDs, navigate, showToast]);

    const renderedNavigators = TidNavigator.map((navigator, index) => {
        const isActive = isActiveIndex === index;
        // if (index <= lastIndex) {
        return (
            <div
                key={index}
                className="tid-navigator-section"
                onClick={() => {
                    if (entityIDs?.length > 0) {
                        if (!isActive) {
                            navigate(navigator.pathname);
                        }
                    } else {
                        showToast("Please select at least one entity before proceeding.", {
                            type: "error",
                        });
                        navigate("/intel-flow");
                    }
                }}
            >
                {/* <span
                        className={`tid-navigator-box ${
                            isActive || index < lastIndex ? "active-navigator-box" : ""
                        }`}
                    >
                        {!isActive && index < lastIndex ? (
                            <CheckCircleOutlineOutlinedIcon sx={{ fill: "#54D387", fontSize: "1.2rem" }} />
                        ) : (
                            ""
                        )}
                        {navigator.header}
                    </span>
                    {index < lastIndex ? <hr className="tid-navigator-box-connector" /> : ""} */}
                <span
                    className={`tid-navigator-box ${
                        isActive || index < isActiveIndex ? "active-navigator-box" : ""
                    }`}
                >
                    {index < isActiveIndex ? (
                        <CheckCircleOutlineOutlinedIcon sx={{ fill: "#54D387", fontSize: "1.2rem" }} />
                    ) : (
                        ""
                    )}
                    {navigator.header}
                </span>
                {index < lastIndex ? (
                    <hr
                        className={`tid-navigator-box-connector ${
                            isActive || index < isActiveIndex ? "active-tid-navigator-box-connector " : ""
                        }`}
                    />
                ) : (
                    ""
                )}
            </div>
        );
        // }
        // return null;
    });

    return <div className="tid-navigator-container">{renderedNavigators}</div>;
};

export default IntelFlowNavigators;
