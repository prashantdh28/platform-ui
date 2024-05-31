import React from "react";
import ReactECharts from "echarts-for-react";

export const getRelevancyColor = (value) => {
    if (value >= 0 && value <= 30) {
        return "#EF7464";
    } else if (value > 30 && value <= 60) {
        return "#F1C950";
    } else if (value > 60 && value <= 100) {
        return "#66E297";
    } else {
        return null; // or some default color
    }
};

const RemedeationsDetailCoverageGraph = ({ percentageCompleted, query }) => {
    const releventColor = getRelevancyColor(percentageCompleted);

    return (
        <ReactECharts
            style={{
                userSelect: "none",
                WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                position: "relative",
                // padding: "0 10px",
                boxSizing: "border-box",
                width: "100%",
                // height: "17rem",
            }}
            option={{
                tooltip: {
                    trigger: "item",
                    triggerOn: "mousemove",
                },
                series: [
                    {
                        type: "gauge",
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 100,
                        center: ["50%", "65%"],
                        splitNumber: 10,
                        itemStyle: {
                            color: releventColor,
                            height: 200,
                        },
                        progress: {
                            show: true,
                            width: 30,
                        },
                        pointer: {
                            icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
                            length: "75%",
                            width: 10,
                            color: "#FFFFFF",
                            offsetCenter: [0, "5%"],
                            itemStyle: {
                                color: "#ffffff",
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30,
                            },
                        },
                        axisTick: {
                            show: false,
                            splitNumber: 2,
                            lineStyle: {
                                width: 2,
                                color: "#999",
                            },
                        },
                        splitLine: {
                            show: false,
                            length: 12,
                            lineStyle: {
                                width: 3,
                                color: "#8E97A4",
                            },
                        },
                        axisLabel: {
                            distance: -45,
                            color: "#8E97A4",
                            fontSize: 12,
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {
                                value: percentageCompleted,
                                name: `${query ? query.toUpperCase() : "CONTROLS"} COVERAGE`,
                                title: {
                                    show: true,
                                    offsetCenter: ["0%", "-150%"],
                                    color: "#8E97A4",
                                    fontSize: "1.2rem",
                                },
                            },
                        ],
                    },
                ],
            }}
        />
    );
};

export default RemedeationsDetailCoverageGraph;
