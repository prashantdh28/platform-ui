import React from "react";

import "./securityFramework.css";
import { ClassNames } from "@emotion/react";
import { Tooltip } from "@mui/material";
import CustomMarkdownTag from "../../../Components/Markdown/CustomMarkDown";
import SubcategoryDialoge from "./SubcategoryDialoge";

const RiskScore = ({ data }) => {
    return (
        <>
            <ClassNames>
                {({ css, cx }) => (
                    <div
                        className={cx(
                            "risk-score-container",
                            css({
                                gridTemplateColumns: `repeat(${data.length}, 1fr)`, // Dynamic number of columns
                            })
                        )}
                    >
                        {data.map((item, dataIndex) => {
                            return (
                                <div key={dataIndex} className={cx("risk-score-section", css({}))}>
                                    <div className="risk-score-section-head">
                                        <Tooltip
                                            title={
                                                // item?.description
                                                <CustomMarkdownTag
                                                    content={item.description}
                                                    customClassNames={cx(
                                                        "Tooltipsize",
                                                        css({
                                                            fontSize: "0.8rem",
                                                        })
                                                    )}
                                                />
                                            }
                                            placement="bottom"
                                        >
                                            <span className="head-text">{item.name}</span>
                                        </Tooltip>
                                    </div>
                                    <div className="subategory-container">
                                        {item?.subcategories &&
                                            item?.subcategories.map((subategory, index) => {
                                                return (
                                                    <SubcategoryDialoge data={subategory}>
                                                        <Tooltip
                                                            key={index}
                                                            title={
                                                                <CustomMarkdownTag
                                                                    content={subategory?.description}
                                                                    customClassNames={cx(
                                                                        "Tooltipsize",
                                                                        css({
                                                                            fontSize: "1rem",
                                                                        })
                                                                    )}
                                                                />
                                                            }
                                                            placement="bottom"
                                                        >
                                                            <div>
                                                                <div
                                                                    className={cx(
                                                                        "subategory-box",
                                                                        css({
                                                                            background: subategory.color,
                                                                        })
                                                                    )}
                                                                >
                                                                    {subategory.id}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </SubcategoryDialoge>
                                                );
                                            })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </ClassNames>
        </>
    );
};

export default RiskScore;
