import React, { useState } from "react";
import TaskStatus from "../TaskStatus";
import RecommendationActionMenu from "./RecommendationActionMenu";
import { Divider } from "@mui/material";
import moment from "moment/moment";
import ProductDialog from "../../../../MyTasks/ProductDialog";

const ActionableRecommendations = ({
    actionableItem,
    recommendationData,
    index,
    actionableRecommendations,
}) => {
    const { control_id, recommendation_id, recommendation } = recommendationData;

    const [item, setItem] = useState(actionableItem);

    return (
        <>
            <div className="actionable_recommendations">
                <div>{`0${index + 1}`}</div>
                <div style={{ width: "70%" }}>{item?.sub_action}</div>
                <div
                    style={{
                        display: "flex",
                        gap: "0.8rem",
                    }}
                >
                    {item?.associated_products &&
                        item?.associated_products.length > 0 &&
                        item?.associated_products.map((associatedProduct, index) => {
                            return (
                                <ProductDialog
                                    key={index}
                                    productData={associatedProduct}
                                    rowData={{
                                        assigned_action: { ...item },
                                        control_id,
                                        recommendation_name: recommendation,
                                    }}
                                />
                            );
                        })}
                </div>
                {item?.assigned_username ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>{item?.assigned_username}</span>
                        <span style={{ color: "#8E97A4" }}>
                            {moment(item.lastUpdated).format("DD-MM-YYYY")}
                        </span>
                    </div>
                ) : (
                    <span style={{ color: "#8E97A4" }}>Not Assigned yet</span>
                )}
                {item?.status ? <TaskStatus type={item?.status} /> : ""}
                <RecommendationActionMenu
                    id={recommendationData?.recommendation + "-" + index}
                    data={{
                        actionableItem: { ...item },
                        controlId: control_id,
                        recommendationId: recommendation_id,
                        recommendation: recommendationData?.recommendation,
                        mitigates: recommendationData?.mitigates,
                    }}
                    setItem={setItem}
                />
            </div>
            {index === actionableRecommendations.length - 1 ? (
                ""
            ) : (
                <Divider
                    sx={{
                        borderBottom: "1px solid #1E2B40",
                        margin: "1rem 0rem",
                    }}
                />
            )}
        </>
    );
};

export default ActionableRecommendations;
