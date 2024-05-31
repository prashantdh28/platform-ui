import React from "react";
import ReactECharts from "echarts-for-react";

const RemediationsStateGraph = ({ data }) => {
    const stateLabels = {
        IN_PLACE: "In Place",
        IN_PROGRESS: "In Progress",
        NOT_IN_PLACE: "Not in Place",
        NOT_APPLICABLE: "Not Applicable",
    };

    // Initialize arrays for data
    let dataLabels = ["In Place", "Not in Place", "Not Applicable", "In Progress"];
    let dataCounts = [
        { value: 0, itemStyle: { color: "#66E297", borderRadius: [10, 10, 0, 0] } },
        { value: 0, itemStyle: { color: "#F1C950", borderRadius: [10, 10, 0, 0] } },
        { value: 0, itemStyle: { color: "#7C9AF3", borderRadius: [10, 10, 0, 0] } },
        { value: 0, itemStyle: { color: "#EB8383", borderRadius: [10, 10, 0, 0] } },
    ];

    // Populate dataCounts based on incoming props data
    data.forEach((item) => {
        const label = stateLabels[item.state];
        const index = dataLabels.indexOf(label);
        if (index !== -1) {
            dataCounts[index] = { ...dataCounts[index], value: item.count };
        }
    });

    return (
        <>
            <ReactECharts
                style={{ height: "90%", width: "100%" }}
                option={{
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    xAxis: {
                        type: "category",
                        data: dataLabels,
                    },
                    yAxis: {
                        type: "value",
                    },
                    series: [
                        {
                            data: dataCounts,
                            type: "bar",
                        },
                    ],
                }}
            />
        </>
    );
};

export default RemediationsStateGraph;
