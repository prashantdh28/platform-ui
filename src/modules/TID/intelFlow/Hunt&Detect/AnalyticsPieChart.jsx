import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const AnalyticsPieChart = ({ graphData }) => {
    const [chartReady, setChartReady] = useState(false);

    function convertDataFormat(data) {
        return data?.map((item) => {
            return {
                value: item.count,
                name: item.source,
            };
        });
    }

    const newData = convertDataFormat(graphData);

    useEffect(() => {
        // Set a small delay to ensure the chart container has dimensions
        const timeout = setTimeout(() => {
            setChartReady(true);
        }, 100);

        // Cleanup function
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {chartReady && (
                <ReactECharts
                    style={{ height: "300px", width: "100%" }}
                    option={{
                        // Your chart options here
                        series: [
                            {
                                type: "pie",
                                radius: ["43%", "70%"],
                                avoidLabelOverlap: false,
                                itemStyle: {
                                    borderRadius: 2,
                                    borderColor: "transparent",
                                    borderWidth: 1,
                                },
                                label: {
                                    show: false,
                                    position: "center",
                                },
                                labelLine: {
                                    show: false,
                                },
                                data: newData,
                            },
                        ],
                    }}
                />
            )}
        </>
    );
};

export default AnalyticsPieChart;
