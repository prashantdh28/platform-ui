import { Box, Dialog, DialogContent, DialogTitle, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CustomLoadingButton from "../../Components/Custom/CustomLoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { getProductBasedSuggestion } from "../../Services/TID/myTasks.service";
import { getAddUpdateTaskLoading } from "../../redux/Slice/TID/myTasksSlice";
import CustomMarkdownPreview from "../../Components/Custom/CustomMarkdownPreview";
import { renderTaskProduct } from "../../helper/tasksProductImageRenderer";
import "./myTask.css";
import CustomTooltip from "../../Components/Custom/CustomTooltip";

const ProductDialog = ({ productData, rowData }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [addContext, setAddContext] = useState("");
    const [suggestionData, setSuggestionData] = useState("");
    const tasksLoading = useSelector(getAddUpdateTaskLoading);

    const handleOpenClose = () => {
        setOpen(!open);
        setSuggestionData("");
    };

    const onProductBasedSuggestionClick = async () => {
        const requestObject = {
            control_id: rowData?.control_id,
            recommendation_name: rowData?.recommendation_name,
            sub_action: rowData?.assigned_action?.sub_action,
            associated_product: productData?.name,
            additional_context: addContext || "",
        };
        const response = await dispatch(getProductBasedSuggestion({ requestObject })).unwrap();
        if (response) {
            setSuggestionData(response);
        }
    };

    return (
        <>
            <CustomTooltip title={productData?.name}>
                <Box sx={{ cursor: "pointer" }} onClick={handleOpenClose}>
                    <img
                        src={renderTaskProduct(productData?.logo)}
                        alt={productData?.name}
                        style={{
                            height: "2rem",
                            width: "2rem",
                            // objectFit: "cover",
                            borderRadius: "0.5rem",
                        }}
                    />
                </Box>
            </CustomTooltip>
            <Dialog
                open={open}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                maxWidth={suggestionData ? "lg" : "sm"}
                id="rule-list-container"
                sx={{
                    "& .MuiPaper-root": {
                        background: "#112038 !important",
                        color: "#fff !important",
                        padding: "0.5rem 0.5rem !important",
                    },
                    "& .MuiTypography-root": {
                        color: "#fff !important",
                    },
                }}
            >
                <DialogTitle
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignrows: "center",
                        padding: "1.2rem",
                        color: "white",
                        fontWeight: "400",
                    }}
                >
                    <div>Understand how you can accomplish the given task.</div>
                    {/* {!loading && ( */}
                    <div style={{ cursor: "pointer" }} onClick={handleOpenClose}>
                        <CloseIcon sx={{ color: "white" }} />
                    </div>
                    {/* )} */}

                    {/* </div> */}
                </DialogTitle>
                <DialogContent>
                    <div className="product-box-main">
                        <Divider
                            sx={{
                                background: "#1E2B40",
                                borderWidth: "2px",
                            }}
                        />

                        <div className="product-text-top">Product Name</div>
                        <div
                            style={{
                                display: "flex",
                                //   gap: "1rem",
                                justifyContent: "space-between",
                                alignItems: "center",
                                //   flexDirection: "column",
                            }}
                        >
                            {productData?.name}
                            <img
                                src={renderTaskProduct(productData?.logo)}
                                alt={productData?.name}
                                style={{
                                    height: "4rem",
                                    width: "4rem",
                                    // objectFit: "cover",
                                    borderRadius: "0.5rem",
                                }}
                            />
                        </div>
                        <div className="product-box-task">
                            <div style={{ width: "50%" }}>
                                <div className="product-text-top">Task Infoformation</div>
                                <div className="product-tech-box">{rowData?.assigned_action?.sub_action}</div>
                            </div>
                            <Divider
                                orientation="vertical"
                                sx={{
                                    height: "auto",
                                    background: "#1E2B40",
                                    border: "1px solid #1E2B40",
                                    width: "1px",
                                }}
                            />
                            <div style={{ width: "50%" }}>
                                <div className="product-text-top">Related to</div>
                                <div className="product-tech-box">{rowData?.recommendation_name}</div>
                            </div>
                            {/* <div>
                                <div className="product-text-top">Platform (You can select platforms.)</div>
                                <div style={{ display: "flex", alignItems: "center" }}></div>
                            </div> */}
                        </div>
                        <div className="hunt-context-main">
                            <div
                                className="product-text-top"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <div>Provide Additional Context </div>
                                <InfoOutlinedIcon
                                    sx={{
                                        height: "1.2rem",
                                        color: "rgba(142, 151, 164, 1)",
                                        marginLeft: "0.4rem",
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    placeholder="Additional context..."
                                    variant="outlined"
                                    value={addContext}
                                    sx={{
                                        marginTop: "0.5rem",
                                        backgroundColor: "#08172F",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "0",
                                        },
                                        height: "6rem",
                                        width: "100% !important",
                                        borderRadius: "0.375rem !important",
                                        border: "1px solid #1E2B40 !important",
                                        "& .MuiInputBase-input": {
                                            color: "#fff !important",
                                        },
                                        "& .MuiInputBase-input::placeholder": {
                                            color: "#8E97A4",
                                        },
                                    }}
                                    onChange={(e) => setAddContext(e.target.value)}
                                />
                            </div>
                        </div>

                        {suggestionData && !tasksLoading && (
                            <div className="hunt-context-main">
                                <div className="product-text-top">Generated by AI </div>
                                {/* <div className="generated-detail-box"> */}
                                <CustomMarkdownPreview
                                    source={suggestionData}
                                    className="generated-detail-box"
                                    wrapperElement={{
                                        "data-color-mode": "dark",
                                    }}
                                />
                                {/* </div> */}
                            </div>
                        )}

                        <div>
                            <CustomLoadingButton
                                disabled={tasksLoading ? true : false}
                                loading={tasksLoading}
                                variant="contained"
                                size="medium"
                                fullWidth
                                onClick={onProductBasedSuggestionClick}
                            >
                                Get Product Based Suggestion
                            </CustomLoadingButton>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductDialog;
