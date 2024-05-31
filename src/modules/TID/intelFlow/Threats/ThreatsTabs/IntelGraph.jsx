import { Divider } from "@mui/material";
import ReactECharts from "echarts-for-react";
import React from "react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../../../Pages/NoDataFound";

const IntelGraph = () => {
    const { entityCount } = useSelector((state) => state.TIDEntity);

    return (
        <>
            <h4 style={{ margin: "0px" }}>Threat Intel Entities</h4>
            <div>
                {entityCount && Object.keys(entityCount).length > 0 ? (
                    <div>
                        <ReactECharts
                            style={{ width: "100%" }}
                            option={{
                                tooltip: {
                                    trigger: "axis",
                                    axisPointer: {
                                        type: "shadow",
                                    },
                                },
                                legend: {},
                                grid: {
                                    top: "3%",
                                    left: "3%",
                                    right: "1%",
                                    height: "50%",
                                    width: "95%",
                                    containLabel: true,
                                },
                                xAxis: {
                                    type: "value",
                                    boundaryGap: [0, 0.01],
                                    splitLine: {
                                        // Set splitLine to false to remove the vertical lines
                                        show: false,
                                    },
                                },
                                yAxis: {
                                    type: "category",
                                    data: Object.keys(entityCount),
                                    axisLabel: {
                                        color: "#FFFF",
                                        fontSize: 16,
                                        margin: 10,
                                        padding: [0, 17, 0, 0],
                                    },
                                    axisLine: {
                                        // Remove the y-axis line
                                        show: false,
                                    },
                                    splitLine: {
                                        show: false,
                                    },
                                },
                                series: [
                                    {
                                        type: "bar",
                                        data: Object.values(entityCount),
                                        showBackground: true,
                                        backgroundStyle: {
                                            color: "#112038", // Example background color
                                        },
                                        label: {
                                            show: true,
                                            precision: 1,
                                            position: "right",
                                            valueAnimation: true,
                                            color: "#FFFF",
                                        },
                                        itemStyle: {
                                            color: function (params) {
                                                // You can specify individual colors or use a color array
                                                var colorList = [
                                                    "#D35472",
                                                    "#B254D3",
                                                    "#54C7EC",
                                                    "#5C54D3",
                                                    "#0082F9",
                                                    "#749f83",
                                                    "#ca8622",
                                                    "#bda29a",
                                                    "#6e7074",
                                                    "#546570",
                                                    "#c4ccd3",
                                                ];
                                                return colorList[params.dataIndex];
                                            },
                                            borderRadius: [4, 4, 4, 4],
                                        },
                                    },
                                ],
                            }}
                        />
                    </div>
                ) : (
                    <NoDataFound padding="7% 0px" />
                )}
            </div>

            <Divider />
        </>
    );
};

export default IntelGraph;
