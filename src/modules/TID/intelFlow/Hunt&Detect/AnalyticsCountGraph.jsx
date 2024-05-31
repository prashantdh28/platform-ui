import React from "react";
import ReactECharts from "echarts-for-react";

const AnalyticsCountGraph = ({ data }) => {

  const graphData =
      data && Object.keys(data).length > 0
          ? Object.keys(data).map((item) => {
                let techniqueObject = {
                    SIGMA: 0,
                    SPLUNK: 0,
                    ES: 0,
                };
                data[item] &&
                    data[item].length > 0 &&
                    data[item].map((item) => {
                        return (techniqueObject[item.source] = item.count);
                    });
                return {
                    Technique: item,
                    ...techniqueObject,
                };
            })
          : [];

  return (
      <>
          <ReactECharts
              option={{
                  legend: {
                      right: 10,
                      textStyle: {
                          color: "#8E97A4", // Change this to the color you desire
                          fontWeight: "bold",
                      },
                      icon: "circle",
                  },
                  tooltip: {},
                  dataset: {
                      dimensions: ["Technique", "SIGMA", "SPLUNK", "ES"],
                      source: graphData,
                  },
                  xAxis: { type: "category" },
                  yAxis: {
                      splitLine: {
                          lineStyle: {
                              color: "#1E2B40",
                              type: "dashed",
                          },
                      },
                  },
                  series: [
                      {
                          type: "bar",
                          itemStyle: {
                              borderRadius: [4, 4, 0, 0],
                          },
                      },
                      {
                          type: "bar",
                          itemStyle: {
                              borderRadius: [4, 4, 0, 0],
                          },
                      },
                      {
                          type: "bar",
                          itemStyle: {
                              borderRadius: [4, 4, 0, 0],
                          },
                      },
                  ],
                  dataZoom: [
                      {
                          type: "slider",
                          show: true,
                          xAxisIndex: [0],
                          // start: 1,
                          // end: 35
                      },
                      {
                          type: "slider",
                          show: true,
                          yAxisIndex: [0],
                          left: "93%",
                          start: 0,
                          end: 10,
                      },
                  ],
              }}
          />
      </>
  );
};

export default AnalyticsCountGraph;
