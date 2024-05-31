import React from "react";
import ReactECharts from "echarts-for-react";

const RemediationsCountGraph = ({ data }) => {
    return (
        <div style={{ width: "90%" }}>
            <ReactECharts
                //     style={{ height: "20rem", width: "" }}
                option={{
                    tooltip: {
                        trigger: "item",
                        triggerOn: "mousemove",
                    },
                    darkMode: true,
                    series: [
                        {
                            type: "gauge",
                            startAngle: 90,
                            endAngle: -270,
                            radius: "75%",
                            center: ["55%", "40%"],
                            pointer: {
                                show: false,
                            },
                            progress: {
                                show: true,
                                overlap: false,
                                roundCap: true,
                                clip: false,
                                itemStyle: {
                                    borderWidth: 1,
                                    borderColor: "#464646",
                                },
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 20,
                                    color: [[1, "#2A3C57"]],
                                },
                            },
                            splitLine: {
                                show: false,
                                distance: 0,
                                length: 10,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                show: false,
                                distance: 100,
                            },
                            data: data,
                            title: {
                                fontSize: 15,
                                color: "#8E97A4",
                            },
                            detail: {
                                width: 15,
                                height: 9,
                                fontSize: 30,
                                color: "inherit",
                                formatter: "{value}%",
                            },
                            itemStyle: {
                                color: function (params) {
                                    // You can specify individual colors or use a color array
                                    var colorList = ["#5370c6", "#92cb74", "#fac858", "#ee6666"];
                                    return colorList[params.dataIndex];
                                },
                                barBorderRadius: [4, 4, 4, 4],
                            },
                        },
                    ],
                }}
            />
        </div>
    );
};

export default RemediationsCountGraph;
