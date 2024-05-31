import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DynamicButton from "../../../Components/Button/ButtonBox";
import InputChips from "../../../Components/Chips/InputChips/InputChips";
import DropDownTree from "../../../Components/DropDownTree/DropDownTree";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import MitreAttacks from "../../../Components/MitreAttacks/MitreAttacks";
import { getAttackMatrix, getEntityGraphById } from "../../../Services/TID/attackMatrix.service";
import ATTCKComparisonDiagram from "../../../TID/Components/ATTCKComparison/ATTCKComparisonDiagram";
import { resetAttackMatrixData, resetGraphData } from "../../../redux/Slice/TID/AttackMatrixSlice";
import { setEntityIDs } from "../../../redux/Slice/TID/EntitySlice";
import "./ATTCKComparisonScreen.css";

const ATTCKComparisonScreen = () => {
    const dispatch = useDispatch();

    const [selectedValue, setSelectedValue] = useState({ value: "", id: "" });
    const [isGraph, setIsGraph] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [domain, setDomain] = useState("");
    const [attackMatrixContent, setAttackMatrixContent] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [connectors, setConnectors] = useState([]);
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    // const [dropDownData] = useState([]);

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    const { attackMatrixData, attackMatrixLoading } = useSelector((state) => state.attackMatrix);
    const { entities = [], content = [], domains = [] } = attackMatrixData;

    const getMitreAttackData = useCallback(
        async ({ compress = false }) => {
            if (entityIDs && entityIDs.length > 0) {
                const response = await dispatch(
                    getAttackMatrix({ selectedIds: entityIDs, compress })
                ).unwrap();
                if (response) {
                    setAttackMatrixContent(response.content || []);
                }
            }
        },
        [entityIDs, dispatch]
    );

    const getEntityGraphByIdData = useCallback(
        async (id) => {
            const response = await dispatch(getEntityGraphById({ entityId: id })).unwrap();
            if (response) {
                setNodes(() => {
                    return response.nodes.map((node) => {
                        const annotations =
                            node.annotations && node.annotations.length > 0
                                ? node.annotations.map((annotation) => {
                                      return {
                                          content: annotation?.name,
                                          //   addInfo: { description: annotation?.description },
                                      };
                                  })
                                : [{ content: "", addInfo: "" }];
                        return { id: node?.id, annotations };
                    });
                });
                setConnectors(() => {
                    return response.connectors.map((connector) => {
                        return {
                            id: connector?.id,
                            sourceID: connector?.sourceId,
                            targetID: connector?.targetId,
                        };
                    });
                });
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if (entityIDs && entityIDs.length >= 1) {
            getMitreAttackData({ compress: isChecked });
        }
        return () => {
            dispatch(resetAttackMatrixData());
        };
    }, [getMitreAttackData, dispatch, entityIDs, isChecked]);

    const onEntitySelect = (value, selected) => {
        if (value && selected) {
            const id = entityIDs.find((entity) => entity.name === value)?.id;
            setSelectedValue({ value, id });
        } else {
            setSelectedValue({ value: "", id: "" });
        }
    };

    const onDelet = (text) => {
        if (entityIDs && entityIDs.length > 1) {
            const deleteItem =
                entityIDs && entityIDs.length > 0 && entityIDs.find((entity) => entity.name === text);
            const newEntityIDs = entityIDs.filter((entity) => entity.id !== deleteItem.id);
            dispatch(setEntityIDs(newEntityIDs));
            setDomain("");
        } else {
            alert("You cant delete more items");
        }
    };

    const onGraphClick = () => {
        setIsGraph(!isGraph);
        getEntityGraphByIdData(selectedValue?.id);
    };

    const handleCheckboxChange = (isChecked) => {
        setIsChecked(isChecked);
        setDomain("");
    };

    const onDomainSelect = async (e) => {
        setDomain(e.target.value);
        if (!e.target.value) {
            setAttackMatrixContent(content);
            return;
        }

        const updatedAttackMatrixData =
            content &&
            content.length > 0 &&
            content.map((item) => {
                const techniques = Array.isArray(item?.techniques)
                    ? item.techniques.filter((technique) => {
                          const isAvailable =
                              Array.isArray(technique.domains) && technique.domains.includes(e.target.value);
                          return isAvailable;
                      })
                    : [];

                return {
                    ...item,
                    techniques: techniques,
                };
            });

        setAttackMatrixContent(updatedAttackMatrixData);
    };

    return (
        <>
            <div className="compare-screen-main">
                <div className="mitre-table-container">
                    {!isGraph && !nodes.length > 0 && !connectors.length > 0 ? (
                        <>
                            <div className="report-table-header">
                                <div className="report-activity-text">
                                    <span className="ttp-defend-text">MITRE ATT&CK TTPs</span>
                                    <span id="TTP-chips" style={{ color: "red" }}>
                                        {entities && entities.length > 0 && (
                                            <div className="TTP-chips">
                                                <InputChips
                                                    chipsData={entities}
                                                    onDelete={onDelet}
                                                    deleteEnable={entities.length > 1}
                                                    className="TTP-chips"
                                                    id="TTP-chips"
                                                    onChipSelect={onEntitySelect}
                                                />
                                            </div>
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <DropDownTree
                                        label="Domains"
                                        options={domains.map((domain) => {
                                            return { value: domain, label: domain.toUpperCase() };
                                        })}
                                        handleChange={onDomainSelect}
                                        setSelectedOption={setDomain}
                                        selectedOption={domain}
                                    />
                                </div>
                                <div>
                                    <CheckBoxComponent
                                        className="compress-checkbox"
                                        label="Compress"
                                        checked={isChecked}
                                        onChange={(e) => handleCheckboxChange(e.target.checked)}
                                        style={{
                                            backgroundColor: isChecked ? BackgroundColor : "",
                                        }}
                                    />
                                </div>
                                <DynamicButton
                                    className="TID-COA-btn"
                                    label="Threat Coverage"
                                    to="/tid/threat-coverage"
                                />
                            </div>
                            {selectedValue?.value ? (
                                <div className="graph-link">
                                    <div onClick={onGraphClick}>
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="17"
                                                height="17"
                                                viewBox="0 0 17 17"
                                                fill="none"
                                            >
                                                <path
                                                    d="M15.5834 7.79167V2.125H10.625V4.25H6.37502V2.125H1.41669V7.79167H6.37502V5.66667H7.79169V12.75H10.625V14.875H15.5834V9.20833H10.625V11.3333H9.20835V5.66667H10.625V7.79167H15.5834Z"
                                                    fill="#3E6BF7"
                                                />
                                            </svg>
                                        </span>
                                        <span className="graph-link-text">
                                            See {selectedValue.value} Graph
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="mitre-attacks-table">
                                {attackMatrixLoading && <SpinnerLoader />}
                                {attackMatrixContent && attackMatrixContent.length > 0 && (
                                    <MitreAttacks data={attackMatrixContent} />
                                )}
                                {!attackMatrixLoading &&
                                    (!attackMatrixData ||
                                        !attackMatrixData.content ||
                                        attackMatrixData.content.length <= 0) && (
                                        <p className="noData">No Data Found</p>
                                    )}
                            </div>
                        </>
                    ) : (
                        <div className="graph-container">
                            <div className="graph-header">
                                <div
                                    className="graph-nav-link"
                                    onClick={() => {
                                        setIsGraph(!isGraph);
                                        dispatch(resetGraphData());
                                        setNodes([]);
                                        setConnectors([]);
                                    }}
                                >
                                    <FaArrowLeft />
                                    <span className="graph-nav-link-text">Back to ATT&CK Comparison</span>
                                </div>
                                <div className="graph-entity">{selectedValue.value}</div>
                            </div>
                            <div className="graph-body">
                                <ATTCKComparisonDiagram
                                    selectedValue={selectedValue.value}
                                    entityId={selectedValue?.id}
                                    nodes={nodes}
                                    connectors={connectors}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ATTCKComparisonScreen;
