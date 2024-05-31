import React, { useState } from "react";

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Resize,
} from "@syncfusion/ej2-react-grids";
import RuleDialog from "./RuleDialog";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { getDetectionRulesByTechniqueId } from "../../../Services/TID/tid.service";
import { resetDetectionRules } from "../../../redux/Slice/TID/EntitySlice";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineClose } from "react-icons/ai";
import "./RulesListDialog.css";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";

const RulesListDialog = ({ children, disabled, techniqueId, headline }) => {
    const dispatch = useDispatch();
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    const {
        detectionRulesData,
        detectionRulesLoading,
        rulePagination: { currentPage, lastPage },
    } = useSelector((state) => state.TIDEntity);
    // const { content = [] } = detectionRulesData;

    const [open, setOpen] = useState(false);
    const [modalData] = useState([
        {
            id: "1",
            ruleName: "Loading...",
            ruleEngine: "Loading...",
            AssociatedTechniqueIdName: "Loading...",
        },
        {
            id: "2",
            ruleName: "Loading...",
            ruleEngine: "Loading...",
            AssociatedTechniqueIdName: "Loading...",
        },
        {
            id: "3",
            ruleName: "Loading...",
            ruleEngine: "Loading...",
            AssociatedTechniqueIdName: "Loading...",
        },
        {
            id: "4",
            ruleName: "Loading...",
            ruleEngine: "Loading...",
            AssociatedTechniqueIdName: "Loading...",
        },
    ]);

    const handleOpen = async () => {
        if (!disabled) {
            setOpen(true);
            setTimeout(async () => {
                if (techniqueId) {
                    await dispatch(getDetectionRulesByTechniqueId({ techniqueIds: techniqueId }));
                }
            }, 100);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            dispatch(resetDetectionRules());
        }, 100);
    };

    const onLoadMore = () => {
        setTimeout(async () => {
            if (techniqueId) {
                await dispatch(
                    getDetectionRulesByTechniqueId({ techniqueIds: techniqueId, page: currentPage + 1 })
                );
            }
        }, 100);
    };

    return (
        <div>
            <div onClick={handleOpen}>{children}</div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                maxWidth={"md"}
            >
                <DialogTitle
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span style={{ color: "var(--name-email)" }}>{headline}</span>
                    {/* <span
            className="e-icons e-close"
            style={{ cursor: "pointer", color: "var(--grey-color)" }}
            onClick={handleClose}
          /> */}

                    <AiOutlineClose
                        className="TID-dialouge-close-icon"
                        id="TID-dialouge-close-icon-SIGMA"
                        onClick={handleClose}
                    />
                </DialogTitle>

                {detectionRulesData && detectionRulesData.length > 0 ? (
                    <>
                        <DialogContent>
                            {/* {detectionRulesLoading && <SpinnerLoader />} */}
                            {/* {content && content.length > 0 && ( */}
                            <div id="TID-Dialogoxbox">
                                <Box>
                                    <GridComponent
                                        dataSource={detectionRulesData}
                                        className="TID-RuleList"
                                        enableHover={false}
                                        allowTextWrap={true}
                                        autoFitColumns={true}
                                        autoFit={true}
                                        width="auto"
                                        allowSelection={false}
                                    >
                                        <ColumnsDirective>
                                            <ColumnDirective
                                                headerText="Rule Id"
                                                field="id"
                                                headerTextAlign="Center"
                                                textAlign="Center"
                                            />
                                            <ColumnDirective
                                                headerText="Rule Name"
                                                field="fileName"
                                                headerTextAlign="Center"
                                                textAlign="Center"
                                                template={(props) => {
                                                    const keyId = uuidv4();
                                                    return (
                                                        <RuleDialog key={keyId} id={props.id}>
                                                            <div className="detection-field">
                                                                <span
                                                                    className="link"
                                                                    style={{ color: BackgroundColor }}
                                                                >
                                                                    {props.file_name}
                                                                </span>
                                                            </div>
                                                        </RuleDialog>
                                                    );
                                                }}
                                            />

                                            <ColumnDirective
                                                headerText="Rule Engine"
                                                field="source"
                                                headerTextAlign="Center"
                                                textAlign="Center"
                                                allowTextWrap={true}
                                                autoFitColumns={true}
                                            />
                                            <ColumnDirective
                                                headerText="Associated TechniqueId and Name"
                                                field="technique_ids"
                                                headerTextAlign="Center"
                                                textAlign="Center"
                                                allowTextWrap={true}
                                                autoFitColumns={true}
                                            />
                                        </ColumnsDirective>
                                        <Inject services={[Resize]} />
                                    </GridComponent>
                                </Box>
                            </div>
                            {detectionRulesLoading && <SpinnerLoader />}
                            {!(lastPage || detectionRulesLoading) && !(detectionRulesData.length === 0) && (
                                <span className="load-more" onClick={onLoadMore}>
                                    <span className="TID-load-more-text">Load More</span>
                                    <span
                                        className="e-icons e-chevron-down-thin"
                                        style={{ fontSize: "small" }}
                                        id="TID-load-more-icon"
                                    />
                                </span>
                            )}
                            {/* )} */}
                        </DialogContent>
                    </>
                ) : (
                    <>
                        <DialogContent>
                            {/* {detectionRulesLoading && <SpinnerLoader />} */}
                            {/* {content && content.length > 0 && ( */}
                            <div id="TID-Dialogoxbox">
                                <Box>
                                    <GridComponent
                                        dataSource={modalData}
                                        className="TID-RuleList"
                                        enableHover={false}
                                        allowTextWrap={true}
                                        autoFitColumns={true}
                                        autoFit={true}
                                        width="auto"
                                    >
                                        <ColumnsDirective>
                                            <ColumnDirective
                                                headerText="Rule Id"
                                                field="id"
                                                headerTextAlign="Center"
                                                textAlign="Center"
                                            />
                                            <ColumnDirective
                                                headerText="Rule Name"
                                                field="ruleName"
                                                headerTextAlign="Center"
                                                textAlign="Center"
                                                template={(props) => {
                                                    return (
                                                        <RuleDialog>
                                                            <div className="detection-field">
                                                                <span
                                                                    className="link"
                                                                    style={{ color: "var(--name-email)" }}
                                                                >
                                                                    Loading...
                                                                </span>
                                                            </div>
                                                        </RuleDialog>
                                                    );
                                                }}
                                            />
                                            <ColumnDirective
                                                headerText="Rule Engine"
                                                field="ruleEngine"
                                                headerTextAlign="Center"
                                                textAlign="Center"
                                            />
                                            <ColumnDirective
                                                headerText="Associated TechniqueId and Name"
                                                field="AssociatedTechniqueIdName"
                                                headerTextAlign="Center"
                                                textAlign="Center"
                                            />
                                        </ColumnsDirective>
                                        <Inject services={[Resize]} />
                                    </GridComponent>
                                </Box>
                            </div>
                            {/* )} */}
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default RulesListDialog;
