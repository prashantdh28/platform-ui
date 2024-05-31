import React from "react";
import SingleMatrixCard from "./SingleMatrixCard";
import "./risk-matrix.css";

const RiskMatrixCard = ({ data }) => {
    return (
        <div className="intel-mtr-table">
            <div className="intel-mtr-main">
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        const { name } = item;

                        return (
                            <>
                                <div key={index}>
                                    <div className="mtr-header-name">
                                        <span className="mtr-tactic-name">{name}</span>
                                        <div className="tech"></div>
                                    </div>

                                    {item.subcategories &&
                                        item.subcategories.length > 0 &&
                                        item.subcategories?.map((val, index) => {
                                            return <SingleMatrixCard val={val} key={index} name={name} />;
                                        })}
                                </div>
                            </>
                        );
                    })}
            </div>
        </div>
    );
};

export default RiskMatrixCard;
