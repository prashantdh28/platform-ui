import ReactEcharts from "echarts-for-react";
import React, { useRef } from "react";
const SunBurstGraph = ({ data }) => {
    // const dispatch = useDispatch();
    const chartInstance = useRef(null);
    // const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);

    // const sunBurstData = useSelector(getSunBurstData);
    // useEffect(() => {
    //   dispatch(getSunBurstGraph({ selectedIds: entityIDs }));
    // }, [dispatch, entityIDs]);
    function transformData(data) {
        // Helper function to recursively transform the data
        function removeValueKey(obj) {
            const newObj = {};
            for (let key in obj) {
                if (key !== "value") {
                    newObj[key] = obj[key];
                }
            }
            return newObj;
        }
        function transform(node) {
            const newNode = removeValueKey(JSON.parse(JSON.stringify({ ...node })));
            //   const newNode = removeValueKey(node);
            if (newNode.children && newNode.children.length > 0) {
                // Recursively transform children
                newNode.children = newNode.children.map((child) => transform(child));
            } else {
                // Add value = 1 only to the last children
                newNode.value = 1;
            }
            return newNode;
        }

        // Map over each top-level object in the data and transform it
        return data.map(transform);
    }
    const transformedData = transformData(data);

  return (
    <div className="radial-graph-container" style={{ padding: "2rem" }}>
      <ReactEcharts
        ref={chartInstance}
        style={{ height: "69rem" }}
        option={{
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
          },
          series: {
            radius: ["15%", "80%"],
            type: "sunburst",
            sort: "asc",
            emphasis: {
              focus: "ancestor",
            },
            data: transformedData,
            label: {
              rotate: "radial",
            },
            levels: [
              {},
              {
                r0: "15%",
                r: "30%",
                itemStyle: {
                  color: "#0082F9",
                },
                label: {
                  rotate: "radial",
                  whiteSpace: "pre-wrap",
                },
              },
              {
                r0: "30%",
                r: "50%",
                itemStyle: {
                  color: "#2F4A64",
                },
                label: {
                  rotate: "radial",
                  fontSize: "10px",
                },
              },
              {
                r0: "50%",
                r: "67%",
                itemStyle: {
                  color: "#055FB0",
                },
                label: {
                  rotate: "radial",
                },
              },
              {
                r0: "68%",
                r: "69%",
                label: {
                  position: "outside",
                  padding: 3,
                  silent: false,
                  color: "white",
                  fontSize: "0.7rem",
                },
                itemStyle: {
                  color: "#2F4A64",
                  borderWidth: 2,
                },
              },
            ],
            itemStyle: {
              color: "#ddd",
              borderWidth: 2,
            },
          },
        }}
      />
    </div>
  );
};

export default SunBurstGraph;
