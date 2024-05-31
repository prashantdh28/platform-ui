import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ReactEcharts from "echarts-for-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackdropLoader from "../../../../../Components/Loader/BackdropLoader";
import CustomMarkdownTag from "../../../../../Components/Markdown/CustomMarkDown";
import { getAttackMatrixGraph } from "../../../../../Services/TID/attackMatrix.service";
import "./../../intelFlow.css";
import NoDataFound from "../../../../../Pages/NoDataFound";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "rgba(17, 32, 56, 1)",
    color: "white",
    p: 3.2,
    borderRadius: "0.6rem",
    "&:focus-visible": {
        outline: "none !important",
    },
};

const RadialTree = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [techniquePopupdata, setTechniquePopupdata] = useState({
        name: "",
        description: "",
        shortName: "",
        usage: [],
    });
    // const [description, setDescription] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setTechniquePopupdata({ name: "", description: "", shortName: "" });
    };
    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);

    const { attackMatrixGraphData, attackMatrixGraphLoading } = useSelector((state) => state.attackMatrix);
    // const { top_techniques = [] } = attackMatrixGraphData;

    useEffect(() => {
        dispatch(getAttackMatrixGraph({ selectedIds: entityIDs }));
    }, [dispatch, entityIDs]);

    const chartInstance = useRef(null);

    const handleNodeClick = useCallback((params) => {
        handleOpen();
        setTechniquePopupdata({
            name: params.name,
            description: params.data.description,
            shortName: params.data.short_name,
            usage: params.data.usage,
        });
    }, []);

    useEffect(() => {
        if (attackMatrixGraphData) {
            const chart = chartInstance.current.getEchartsInstance();
            chart.off("click"); // remove previous event listeners
            chart.on("click", handleNodeClick);
        }
    }, [attackMatrixGraphData, handleNodeClick]);

    const convertData = (data) => {
        // Helper function to recursively build the tree
        const buildTree = (id) => {
            const node = data?.find((item) => item?.id === id);
            return {
                name: node?.name,
                description: node?.description,
                short_name: node?.short_name,
                usage: node?.usage,
                children: (data?.filter((item) => item?.parent === id) || []).map((child) =>
                    buildTree(child?.id)
                ),
            };
        };

        // Find the root node (parent is null)
        const rootNode = data?.find((item) => item?.parent === null);
        // Build the tree starting from the root node
        const result = buildTree(rootNode?.id);

        return result;
    };

    const data = convertData(attackMatrixGraphData?.data);

    return (
        <div className="radial-graph-container">
            {<BackdropLoader loading={attackMatrixGraphLoading} />}

            {data && Object.keys(data).length > 0 ? (
                <ReactEcharts
                    ref={chartInstance}
                    style={{ height: "52rem", color: "red" }}
                    option={{
                        tooltip: {
                            trigger: "item",
                            triggerOn: "mousemove",
                        },
                        series: [
                            {
                                type: "tree",
                                data: [data],
                                top: "9%",
                                bottom: "19%",
                                layout: "radial",
                                symbol: "emptyCircle",

                                symbolSize: 5,
                                initialTreeDepth: 2,
                                animationDurationUpdate: 750,
                                emphasis: {
                                    focus: "descendant",
                                },
                                label: {
                                    color: "white",
                                    fontSize: 13,
                                },
                                lineStyle: {
                                    color: "rgba(142, 151, 164, 1)",
                                    curveness: 0.5,
                                },
                                itemStyle: {
                                    color: "rgba(0, 130, 249, 1)",
                                },
                                leaves: {
                                    label: {
                                        // position: "right"
                                    },
                                },
                                // emphasis: {
                                //     focus: 'descendant',
                                //     itemStyle: {
                                //         borderColor: 'rgba(0,0,0,0.5)',
                                //         borderWidth: 1
                                //     }
                                // },
                            },
                        ],
                    }}
                />
            ) : (
                <NoDataFound />
            )}
            {techniquePopupdata?.description ? (
                <Modal
                    // sx={{ border: "1px solid red", borderRadius: "1rem" }}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                "&:focus-visible": {
                                    outline: "none",
                                },
                            }}
                        >
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                {techniquePopupdata?.name} - {techniquePopupdata?.shortName}
                            </Typography>
                            <Box className="cross-btn" onClick={handleClose}>
                                <CloseOutlinedIcon sx={{ fill: "rgba(142, 151, 164, 1)" }} />
                            </Box>
                        </Box>
                        <Typography sx={{ mt: 2, color: "rgba(142, 151, 164, 1)" }}>Description</Typography>
                        {/* <Typography className="tech-modal-decription" sx={{ mt: 1, p: 2, overflowY: "scroll", height: "6.7rem" }}> */}
                        {/* {techniquePopupdata?.description}  */}
                        <CustomMarkdownTag
                            expanded={true}
                            // readMoreChars={420}
                            colorForMarkDown={true}
                            customClassNames="ingraph-tech-desc"
                            content={techniquePopupdata?.description}
                        />
                        {/* </Typography> */}

                        <Typography sx={{ mt: 2, color: "rgba(142, 151, 164, 1)" }}>Usage</Typography>
                        <div className="ingraph-usage-desc-box">
                            {techniquePopupdata?.usage.map((use, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            style={{
                                                fontWeight: "700",
                                                marginBottom: "0.1rem",
                                            }}
                                        >
                                            {use?.name}:{" "}
                                        </div>
                                        <CustomMarkdownTag
                                            expanded={true}
                                            colorForMarkDown={true}
                                            content={use?.usage}
                                        />
                                    </div>
                                );

                                // <Typography className="tech-modal-decription" sx={{ mt: 1, p: 2, overflowY: "scroll", height: "7rem" }}>
                                //     {use?.usage}
                                //     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                // </Typography>
                            })}
                        </div>
                    </Box>
                </Modal>
            ) : (
                ""
            )}
        </div>
    );
};

export default RadialTree;
