/* eslint-disable no-unused-vars */
import {
    ConnectorConstraints,
    DiagramComponent,
    HierarchicalTree,
    Inject,
    NodeConstraints,
    SelectorConstraints,
} from "@syncfusion/ej2-react-diagrams";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ATTACKComparisonDiagram.css";
import { getEntityGraphById } from "../../../Services/TID/attackMatrix.service";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";

let diagramInstance;

const ATTCKComparisonDiagram = ({ entityId, nodes, connectors }) => {
    const dispatch = useDispatch();

    // const [nodes, setNodes] = useState([]);
    // const [connectors, setConnectors] = useState([]);

    const { entityGraphLoading } = useSelector((state) => state.attackMatrix);

    // const getEntityGraphByIdData = useCallback(
    //     async (id) => {
    //         const response = await dispatch(getEntityGraphById({ entityId: id })).unwrap();
    //         if (response) {
    //             if (response?.nodes && response?.nodes.length > 0) {
    //                 setNodes(() => {
    //                     return response.nodes.map((node) => {
    //                         const annotations =
    //                             node.annotations && node.annotations.length > 0
    //                                 ? node.annotations.map((annotation) => {
    //                                       return {
    //                                           content: annotation?.name,
    //                                           addInfo: { description: annotation?.description },
    //                                       };
    //                                   })
    //                                 : [{ content: "", addInfo: "" }];
    //                         return { id: node?.id, annotations };
    //                     });
    //                 });
    //             }
    //             if (response?.connectors && response?.connectors.length > 0) {
    //                 setConnectors(() => {
    //                     return response.connectors.map((connector) => {
    //                         return {
    //                             id: connector?.id,
    //                             sourceID: connector?.sourceId,
    //                             targetID: connector?.targetId,
    //                         };
    //                     });
    //                 });
    //             }
    //         }
    //     },
    //     [dispatch]
    // );

    // useEffect(() => {
    //     getEntityGraphByIdData(entityId);
    //     return () => {};
    // }, [dispatch, entityId, getEntityGraphByIdData]);
    return (
        <>
            {entityGraphLoading && <SpinnerLoader />}
            {nodes.length > 0 && connectors.length > 0 && (
                <DiagramComponent
                    id="TID-diagram-connect"
                    ref={(diagram) => (diagramInstance = diagram)}
                    width={"100%"}
                    height={580}
                    nodes={nodes}
                    backgroundColor="transparent"
                    connectors={connectors}
                    selectedItems={{
                        constraints:
                            SelectorConstraints.ConnectorSourceThumb |
                            SelectorConstraints.ConnectorTargetThumb,
                    }}
                    //Configrues hierarchical tree layout
                    layout={{
                        type: "HierarchicalTree",
                        orientation: "LeftToRight",
                        verticalSpacing: 120,
                        margin: { left: 30, right: 0, top: 0, bottom: 0 },
                    }}
                    snapSettings={{ constraints: 0 }}
                    //Sets the default values of nodes
                    getNodeDefaults={(node) => {
                        node.shape = {
                            type: "Basic",
                            shape: "Rectangle",
                            cornerRadius: 5,
                        };
                        node.width = 180;
                        node.style.strokeWidth = 2;
                        node.style.backgroundColor = "var(--graph-link-connector-color)";
                        node.style.strokeColor = "var(--graph-link-connector-color)";
                        node.height = 60;
                        node.constraints &= ~(
                            NodeConstraints.Resize |
                            NodeConstraints.Rotate |
                            NodeConstraints.Drag
                        );
                        node.constraints |= NodeConstraints.ReadOnly;
                    }}
                    //Sets the default values of connector
                    getConnectorDefaults={(connector) => {
                        connector.type = "Bezier";
                        connector.style.strokeColor = "var(--graph-link-connector-color)";
                        connector.style.strokeWidth = 2;
                        connector.targetDecorator = {
                            shape: "OpenArrow",
                            style: {
                                strokeColor: "var(--graph-link-connector-color)",
                                fill: "var(--graph-link-connector-color)",
                                strokeWidth: 2,
                            },
                        };
                        connector.constraints &= ~(
                            ConnectorConstraints.PointerEvents |
                            ConnectorConstraints.Select |
                            ConnectorConstraints.Drag
                        );
                        connector.constraints |= ConnectorConstraints.ReadOnly;
                    }}
                >
                    <Inject services={[HierarchicalTree]} />
                </DiagramComponent>
            )}
        </>
    );
};

export default ATTCKComparisonDiagram;
