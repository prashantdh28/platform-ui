/* eslint-disable react-hooks/exhaustive-deps */
import {
    DiagramComponent,
    Inject,
    Node,
    PrintAndExport,
    SelectorConstraints,
    UndoRedo
} from "@syncfusion/ej2-react-diagrams";
import * as React from "react";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useImageDisplay } from "../../../Hooks/useImageDisplay";
import { updateTabsData } from "../../../redux/Slice/tabSlice";
import SearchElement from "../Droppable/SearchElements/SearchElement";
import RelationshipForm from "../NewInvestigation/RelationshipForm";
import RightPopup from "../NewInvestigation/RightPopup";
import RightRelationPopup from "../NewInvestigation/RightRelationPopup";
import "../Sidebars/Leftsidebar/LeftsidePalet.css";
import "./LeftMid.css";
import LeftSidePalet from "./Leftsidebar/LeftsidePalet";
import { DisabledByDefault } from "@mui/icons-material";

let handles = [
    {
        name: "Clone",
        pathData:
            "M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z",
        tooltip: { content: "Clone" },
        visible: false,
        offset: 1,
        side: "Bottom",
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: "Delete",
        pathData:
            "M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z",
        tooltip: { content: "Delete" },
        visible: false,
        offset: 0,
        side: "Bottom",
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },

    {
        name: "Draw",
        pathData:
            "M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z",
        tooltip: { content: "Draw" },
        sourceDecorator: {
            shape: "Circle",
            style: { strokeColor: "blue", fill: "blue" },
        },
        targetDecorator: {
            shape: "OpenArrow",
            style: { strokeColor: "blue", fill: "blue" },
        },
        type: "Orthogonal",
        visible: false,
        offset: 0.5,
        side: "Right",
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: "Draw",
        pathData:
            "M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z",
        tooltip: { content: "22" },
        sourceDecorator: {
            shape: "Circle",
            style: { strokeColor: "blue", fill: "blue" },
        },
        targetDecorator: {
            shape: "OpenArrow",
            style: { strokeColor: "blue", fill: "blue" },
        },
        type: "Straight",
        visible: false,
        offset: 0.5,
        side: "Bottom",
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
        // pathData: 'M5,0 L5,5 L0,5 L10,10 L20,5 L15,5 L15,0 z',
        //  tooltip: { content: 'Straight (Bottom)' },
        // visible: true,
        // // type: "Straight",
        // offset: 0.5,
        // side: 'Bottom',
        // margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
];
let drawingNode;

let diagramInstance;
function LeftMid({
    activeDiv,
    isFormOpen,
    setIsFormOpen,
    isRighgtFormOpen,
    setRightFormOpen,
    isrelationForm,
    setIsrelationForm,
    isRightrelationPopup,
    setRightrelationPopup,
    isopenSearch,
    setIsopenSearch,
    matchingTab,
    activeTabId,
    // InvestigationData,
}) {
    const dispatch = useDispatch();

    const [getImage] = useImageDisplay();

    const InvestigationData = useSelector((state) => state.investigation?.singleinvestigationsdata);
    // const InvestigationDataNode =
    //   InvestigationData?.content && JSON.parse(InvestigationData?.content);
    const [diagramData, setDiagramData] = useState({ nodes: [], connectors: [] });
    const [popupData, setPopupData] = useState([]);
    const [prevOffset, setPrevOffset] = useState({});
    const [sourceId, setSourceId] = useState("");
    const tabsData = useSelector((state) => state.tabs.tabsData) || [];
    useEffect(() => {
        setTimeout(() => {
            const nodes = (InvestigationData?.content && JSON.parse(InvestigationData?.content)?.nodes) || [];
            const updatedNodes =
                nodes && nodes.length > 0
                    ? nodes.map((node) => {
                          //   console.log(node, "node?.data?.nodeType");
                          const image = getImage(node?.data?.nodeType);
                          //   console.log(image, "imageimageimage");
                          const shape = image ? image.shape : {};
                          return { ...node, shape };
                      })
                    : [];
            setDiagramData({
                nodes: updatedNodes || [],
                // nodes: (InvestigationData?.content && JSON.parse(InvestigationData?.content)?.nodes) || [],
                connectors:
                    (InvestigationData?.content && JSON.parse(InvestigationData?.content)?.connectors) || [],
            });
        }, 100);

        // dispatch(getAllEntityImg());
        // dispatch(getSingleInvestigations());
    }, [InvestigationData]);

    let connectorSymbols = [
        {
            id: "Link1",
            type: "Orthogonal",
            sourcePoint: { x: 0, y: 0 },
            targetPoint: { x: 60, y: 60 },
            sourceDecorator: {
                shape: "Circle",
                style: { strokeColor: "#3E6BF7", fill: "#3E6BF7" },
            },
            targetDecorator: {
                shape: "OpenArrow",
                style: { strokeColor: "#3E6BF7", fill: "#3E6BF7" },
            },
            style: { strokeWidth: 2, strokeColor: "#3E6BF7" },
        },
        {
            id: "Link2",
            type: "Straight",
            sourcePoint: { x: 0, y: 0 },
            targetPoint: { x: 60, y: 60 },
            sourceDecorator: {
                shape: "Circle",
                style: { strokeColor: "#3E6BF7", fill: "#3E6BF7" },
            },
            targetDecorator: {
                shape: "OpenArrow",
                style: { strokeColor: "#3E6BF7", fill: "#3E6BF7" },
            },
            style: { strokeWidth: 2, strokeColor: "#3E6BF7" },
        },
    ];

    useEffect(() => {
        if (tabsData && tabsData?.length > 0) {
            const currentTab = tabsData.filter((tab) => tab?.id === activeDiv)[0];
            if (currentTab) {
                setDiagramData({
                    nodes: currentTab?.nodes,
                    connectors: currentTab?.connectors,
                });
                // changeNodeData(diagramInstance?.saveDiagram());
            } else {
                diagramInstance?.clear();
            }
        }
        return () => {
            if (diagramInstance) {
                setDiagramData({ nodes: [], connectors: [] });
                // changeNodeData(diagramInstance?.saveDiagram());
            }
            diagramInstance?.clear();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeDiv]);

    useEffect(() => {
        rendereComplete();
    }, []);

    const searchHandler = (e) => {
        e.preventDefault(); // Prevent the default context menu behavior
        setIsopenSearch(!isopenSearch);
    };

    function rendereComplete() {
        addEvents();
        diagramInstance?.fitToPage();
    }

    // function getPorts() {
    //     let ports = [
    //         {
    //             id: "port1",
    //             shape: "Circle",
    //             offset: { x: 0, y: 0.5 },
    //             style: { width: 10, height: 10 },
    //         },
    //         {
    //             id: "port2",
    //             shape: "Circle",
    //             offset: { x: 0.5, y: 1 },
    //             style: { width: 10, height: 10 },
    //         },
    //         {
    //             id: "port3",
    //             shape: "Circle",
    //             offset: { x: 1, y: 0.5 },
    //             style: { width: 10, height: 10 },
    //         },
    //         {
    //             id: "port4",
    //             shape: "Circle",
    //             offset: { x: 0.5, y: 0 },
    //             style: { width: 10, height: 10 },
    //         },
    //     ];
    //     return ports;
    // }
    let isMobile;
    function addEvents() {
        isMobile = window.matchMedia("(max-width:550px)").matches;
        if (isMobile) {
            let paletteIcon = document.getElementById("palette-icon");
            if (paletteIcon) {
                paletteIcon.addEventListener("click", openPalette, false);
            }
        }
    }

    function openPalette() {
        // let paletteSpace = document.getElementById("palette-space");
        // isMobile = window.matchMedia("(max-width:550px)").matches;
        // if (isMobile) {
        //     if (!paletteSpace.classList.contains("sb-mobile-palette-open")) {
        //         paletteSpace.classList.add("sb-mobile-palette-open");
        //     } else {
        //         paletteSpace.classList.remove("sb-mobile-palette-open");
        //     }
        // }
    }

    // function printDiagram(args) {
    //     let options = {};
    //     options.mode = "Download";
    //     options.region = "Content";
    //     options.multiplePage = diagramInstance.pageSettings.multiplePage;
    //     options.pageHeight = diagramInstance.pageSettings.height;
    //     options.pageWidth = diagramInstance.pageSettings.width;
    //     diagramInstance.print(options);
    // }
    function enableItems() {
        // toolbarEditor.items[6].disabled = false;
        // toolbarEditor.items[7].disabled = false;
        // toolbarEditor.items[19].disabled = false;
        // toolbarEditor.items[20].disabled = false;
        // toolbarEditor.items[25].disabled = false;
        // toolbarEditor.items[29].disabled = false;
        // toolbarEditor.items[31].disabled = false;
    }
    function disableMultiselectedItems() {
        // toolbarEditor.items[22].disabled = true;
        // toolbarEditor.items[23].disabled = true;
        // toolbarEditor.items[27].disabled = true;
    }
    const deleteEntityClick = async (id) => {
        // const response = await deleteEntity(id);
        // if (response.entityId === id) {
        return diagramInstance?.remove();
        // }
    };

    // function lockObject(args) {
    //     for (let i = 0; i < diagramInstance?.selectedItems?.nodes?.length; i++) {
    //         let node = diagramInstance.selectedItems.nodes[i];
    //         if (node.constraints & NodeConstraints.Drag) {
    //             node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
    //         } else {
    //             node.constraints = NodeConstraints.Default;
    //         }
    //     }
    //     for (let j = 0; j < diagramInstance.selectedItems.connectors.length; j++) {
    //         let connector = diagramInstance.selectedItems.connectors[j];
    //         if (connector.constraints & ConnectorConstraints.Drag) {
    //             connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
    //         } else {
    //             connector.constraints = ConnectorConstraints.Default;
    //         }
    //     }
    //     diagramInstance.dataBind();
    // }

    useEffect(() => {
        // document.addEventListener('contextmenu', event => event.preventDefault())
        return () => {
            document.removeEventListener("contextmenu", (event) => event.preventDefault());
        };
    }, []);

    // const createEntityOnDrop = async (data) => {
    //     return await createEntity(InvestigationData?.id, { nodeType: data.nodeType });
    // };

    // const createRelationOnDrop = async (type) => {
    //     return await createRelation({ type });
    // };

    // const createRelationShipOnConnect = async ({ sourceEntityID, targetEntityId, relationShipId, type }) => {
    //     return await createRelationShip({ sourceEntityID, targetEntityId, relationShipId, type });
    // };

    // const dispatch = useDispatch();

    const changeNodeData = (data) => {
        const { nodes, connectors } = JSON.parse(data);

        const updatedNodes =
            nodes && nodes.length > 0
                ? nodes.map((node) => {
                      const { id, offsetX, offsetY, shape, height, data } = node;
                      return {
                          id,
                          height,
                          offsetX,
                          offsetY,
                          shape: { type: shape.type, source: shape.source },
                          data,
                      };
                  })
                : [];
        const updatedConnectors =
            connectors && connectors.length > 0
                ? connectors.map((connector) => {
                      const {
                          id,
                          sourceID,
                          targetID,
                          sourceDecorator,
                          targetDecorator,
                          style,
                          segments,
                          wrapper,
                          type,
                      } = connector;
                      return {
                          id,
                          sourceID,
                          targetID,
                          sourceDecorator: {
                              shape: sourceDecorator?.shape,
                              style: sourceDecorator?.style,
                              pivot: {
                                  x: sourceDecorator.pivot.x,
                                  y: sourceDecorator.pivot.y,
                              },
                          },

                          targetDecorator: {
                              shape: targetDecorator?.shape,
                              style: targetDecorator?.style,
                              pivot: {
                                  x: sourceDecorator.pivot.x,
                                  y: sourceDecorator.pivot.y,
                              },
                          },
                          style: style,
                          segments: {
                              type: segments.type,
                          },
                          offsetX: wrapper?.offsetX,
                          offsetY: wrapper?.offsetY,
                          type,
                      };
                  })
                : [];
        const existingTabIndex = tabsData?.findIndex((tab) => tab.id === activeDiv);

        if (existingTabIndex !== -1) {
            const updatedTab = {
                ...tabsData[existingTabIndex],
                nodes: updatedNodes,
                connectors: updatedConnectors,
            };
            const updatedData = [
                ...tabsData.slice(0, existingTabIndex),
                updatedTab,
                ...tabsData.slice(existingTabIndex + 1),
            ];
            // Dispatch the action to update the data in Redux
            dispatch(updateTabsData(updatedData));
            // const payload = {
            //   name: InvestigationData?.name,
            //   content: matchingTab && JSON.stringify(matchingTab),
            // };
            // dispatch(updateInvestigationData(activeTabId, payload));
        } else {
            const updatedData = [
                ...tabsData,
                {
                    id: activeDiv,
                    nodes: updatedNodes,
                    connectors: updatedConnectors,
                },
            ];

            // Dispatch the action to update the data in Redux
            dispatch(updateTabsData(updatedData));
            // const payload = {
            //   name: InvestigationData?.name,
            //   content: matchingTab && JSON.stringify(matchingTab),
            // };
            // dispatch(updateInvestigationData(activeTabId, payload));
            // setIsFormOpen(true);
        }
    };
    return (
        // For Left side and Wrokspace for drag and drop .
        <div className="palette-container">
            <div id="palette-space">
                <LeftSidePalet connectorSymbols={connectorSymbols} popupData={popupData} />
            </div>
            <div id="diagram-space" style={{ position: "relative" }}>
                {/* Droppable zone   */}
                <DiagramComponent
                    backgroundColor="var(--middlepart)"
                    overFlow="hidden"
                    id="diagram"
                    ref={(diagram) => (diagramInstance = diagram)}
                    className="DiagramComponentStyle"
                    // width={"103%"}
                    annotationTemplate={DisabledByDefault}
                    // height={"600px"}
                    selectedItems={{
                        handleSize: 6,   
                    }}
                    onUserHandleMouseDown={(args) => {
                        switch (args.element.name) {
                            case "Delete":
                                diagramInstance?.remove();
                                break;
                            case "Clone":
                                diagramInstance?.paste(diagramInstance?.selectedItems?.selectedObjects);
                                break;

                            case "Draw":
                                diagramInstance.drawingObject.shape = {};
                                diagramInstance.drawingObject.type = diagramInstance.drawingObject.type
                                    ? diagramInstance.drawingObject.type
                                    : "Orthogonal";
                                diagramInstance.drawingObject.sourceID = drawingNode.id;
                                diagramInstance.dataBind();
                                // console.log(diagramInstance.drawingObject.type);
                                break;
                            default:
                                break;
                        }
                    }}
                    drawingObject={[{ type: "Straight" }, { type: "Orthogonal" }]}
                    snapSettings={{ constraints: 0 }}
                    click={(args) => {
                        setSourceId(args?.element?.properties?.id);
                        setPrevOffset({
                            offsetX: args?.element?.properties?.offsetX,
                            offsetY: args?.element?.properties?.offsetY,
                        });

                        document.addEventListener("contextmenu", (event) => event.preventDefault());
                        if (args.element.propName === "nodes" && args.button === "Left") {
                            // setIsFormOpen(true);
                            setRightFormOpen(false);
                        }
                        if (args.element.propName === "nodes" && args.button === "Right") {
                            // setRightFormOpen(true);
                            const data = args.element.data || {};
                            setPopupData({ id: args.element.id, ...data });
                            setRightrelationPopup(false);
                            setIsrelationForm(false);
                            setIsFormOpen(false);
                            // document.addEventListener("contextmenu", (event) =>
                            //   event.preventDefault()
                            // );
                        }
                        if (args.element.propName === "connectors" && args.button === "Left") {
                            // setIsrelationForm(true);
                        }
                        if (args.element.propName === "connectors" && args.button === "Right") {
                            setRightrelationPopup(true);
                            setRightFormOpen(false);
                            setIsFormOpen(false);
                            // document.addEventListener("contextmenu", (event) =>
                            //   event.preventDefault()
                            // );
                        }
                    }}
                    nodes={diagramData.nodes}
                    connectors={diagramData.connectors} //Sets the default values of a node
                    getNodeDefaults={(node) => {
                        // setIsFormOpen(true);
                        // onclick = () => console.log("hello")
                        // setIsFormOpen(true)
                        node.width = 70;
                        node.height = 70;
                        if (node.width === undefined) {
                            node.width = 145;
                        }
                        // node.addEventListener("click",()=>{
                        //     console.log("Heeloo i am here");
                        // })
                        node.style = {
                            fill: "rgb(235,237,245)",
                            // opacity: "0.3",

                            strokeColor: "transparent",
                            backgroundColor: "red",
                            height: "50px",
                            width: "50px",
                        };
                        // for (let i = 0; i < node.annotations.length; i++) {
                            // node.style.fill = "#37909A";
                            // node. style.strokewidth = width;
                            // node.style. strokeColor = "#024249";
                            // node.annotations[i].offset = {
                            //     x: 0.5, y: 1.3, // Adjust the offset to position the title
                            // };
                            // node.annotations[i].style = {
                            //     color: 'black',
                            //     whiteSpace: 'nowrap',
                            //     width: "90px",
                            //     fill: '#3e6bf70d',
                            //     padding: '10px'
                            // };
                        // }
                        //Set ports
                        // node.changedProperties.height = 20;
                        // node.ports = getPorts();
                        return node;
                    }} //Sets the default values of a connector
                    getConnectorDefaults={(obj) => {
                        if (obj.id.indexOf("connector") !== -1) {
                            obj.targetDecorator = {
                                shape: "OpenArrow",
                                width: 10,
                                height: 10,
                            };
                        }
                    }}
                    scrollChange={(args) => {
                        if (args.panState !== "Start") {
                            // let zoomCurrentValue =
                            //     document.getElementById("btnZoomIncrement").ej2_instances[0];
                            // zoomCurrentValue.content =
                            //     Math.round(diagramInstance.scrollSettings.currentZoom * 100) + " %";
                        }
                    }}
                    // historyChange={(args) => {
                    //     historyChange(args);
                    // }}
                    connectionChange={async (args) => {
                        // if (args.state === "Changed") {
                        //     const connector = args.connector;
                        //     if (
                        //         connector.sourceID &&
                        //         connector.targetID &&
                        //         connector.properties &&
                        //         !connector.properties?.isCreated
                        //     ) {
                        //         const { relationShipId = "", type = "" } =
                        //             connector?.properties?.data || {};
                        //         let sourceEntityID = "";
                        //         let targetEntityId = "";
                        //         if (diagramInstance.nodes && diagramInstance.nodes.length > 0)
                        //             for (let i = 0; i < diagramInstance.nodes.length; i++) {
                        //                 const node = diagramInstance.nodes[i];
                        //                 if (node.id === connector.sourceID) {
                        //                     sourceEntityID = node.data ? node.data.entityId : "";
                        //                 }
                        //                 if (node.id === connector.targetID) {
                        //                     targetEntityId = node.data ? node.data.entityId : "";
                        //                 }
                        //             }
                        //         const response = await createRelationShipOnConnect({
                        //             sourceEntityID,
                        //             targetEntityId,
                        //             relationShipId,
                        //             type,
                        //         });
                        //         if (response && response.length > 0) {
                        //             diagramInstance.selectedItems.connectors[0].properties[
                        //                 "isCreated"
                        //             ] = true;
                        //             lockObject();
                        //         }
                        //     }
                        // }
                    }}
                    selectionChange={async (args) => {
                        if (args.state === "Changed") {
                            if (args.type === "Removal") {
                                setPopupData("");
                            }
                            let selectedItems = diagramInstance.selectedItems?.nodes;
                            selectedItems = selectedItems.concat(diagramInstance.selectedItems?.connectors);
                            if (selectedItems.length === 0) {
                            }
                            if (selectedItems.length === 1) {
                                enableItems();
                                disableMultiselectedItems(selectedItems);
                                if (
                                    selectedItems[0].children !== undefined &&
                                    selectedItems[0].children.length > 0
                                ) {
                                    // toolbarEditor.items[1].disabled = false;
                                    disableMultiselectedItems(selectedItems);
                                } else {
                                    // toolbarEditor.items[1].disabled = true;
                                }
                            }
                            if (selectedItems?.length > 1) {
                                enableItems();
                                // toolbarEditor.items[0].disabled = false;
                                // toolbarEditor.items[1].disabled = true;
                                disableMultiselectedItems(selectedItems);
                            }
                            if (args.newValue.length > 0 && args.newValue[0] instanceof Node) {
                                diagramInstance.selectedItems = {
                                    constraints: SelectorConstraints.All | SelectorConstraints.UserHandle,
                                    userHandles: handles,
                                };
                                if (diagramInstance.selectedItems?.nodes?.length > 0) {
                                    drawingNode =
                                        diagramInstance.selectedItems?.nodes[
                                            diagramInstance.selectedItems?.nodes?.length - 1
                                        ];
                                }
                            } else {
                                diagramInstance.selectedItems = {
                                    constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle,
                                };
                            }
                            changeNodeData(diagramInstance.saveDiagram());
                        }
                    }}
                    //Sets the Node style for DragEnter element.
                    dragOver={(args) => {}}
                    drop={async (args) => {
                        const obj = args.element;
                        if (obj?.propName === "nodes") {
                            // const entitiesdata = await createEntityOnDrop(obj?.data);
                            // diagramInstance.selectedItems.nodes[0].properties.data = {
                            //     ...obj.data,
                            //     ...entitiesdata,
                            // };
                        }
                        if (obj?.propName === "connectors") {
                            // const response = await createRelationOnDrop(obj.type);
                            // diagramInstance.selectedItems.connectors[0].properties["data"] = {
                            //     ...response,
                            // };
                            // diagramInstance
                        }
                    }}
                    dragEnter={(args) => {
                        // setIsFormOpen(true)

                        let obj = args.element;
                        if (obj instanceof Node) {
                            let oWidth = obj.width;
                            let oHeight = obj.height;
                            let ratio = 100 / obj.width;
                            obj.width = 100;
                            obj.height *= ratio;
                            obj.offsetX += (obj.width - oWidth) / 2;
                            obj.offsetY += (obj.height - oHeight) / 2;
                            obj.style = { fill: "#357BD2", strokeColor: "white" };
                        }
                    }}
                >
                    <Inject services={[PrintAndExport, UndoRedo]} />

                    {popupData && popupData.id && (
                        <>
                            <div
                                key={popupData.id}
                                className="rightpopup"
                                style={{
                                    position: "absolute",
                                    borderRadius: "10px",
                                    top: "20%",
                                    left: "55%",
                                    transform: "translate(-70%, -120%)",
                                    background: "#fff",
                                    padding: "5px",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                }}
                            >
                                <RightPopup
                                    prevOffset={prevOffset}
                                    sourceId={sourceId}
                                    setRightFormOpen={setRightFormOpen}
                                    deleteEntity={deleteEntityClick}
                                    setIsFormOpen={setIsFormOpen}
                                    diagramInstance={diagramInstance}
                                    setPopupData={setPopupData}
                                    popupData={popupData}
                                    setDiagramData={setDiagramData}
                                    diagramData={diagramData}
                                    changeNodeData={changeNodeData}
                                />
                            </div>
                        </>
                    )}
                    {/* relationship form  */}
                    {isrelationForm && (
                        <>
                            <div
                                className="leftMid-dragpopup"
                                style={{
                                    position: "absolute",
                                    width: "458px",
                                    height: "393px",
                                    top: "55%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    background: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h2>Relationship </h2>
                                    <span
                                        onClick={() => {
                                            setIsrelationForm(false);
                                            diagramInstance?.clearSelection();
                                        }}
                                        className="e-icons e-small e-close"
                                        style={{ cursor: "pointer" }}
                                    ></span>
                                </div>
                                <RelationshipForm />
                            </div>
                        </>
                    )}
                    {/* right click on relationship */}
                    {isRightrelationPopup && (
                        <>
                            {" "}
                            <div
                                className="rightpopup"
                                style={{
                                    position: "absolute",
                                    borderRadius: "10px",
                                    top: "33%",
                                    left: "53%",
                                    transform: "translate(-70%, -120%)",
                                    background: "#fff",
                                    padding: "5px",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                }}
                            >
                                <RightRelationPopup
                                    setRightrelationPopup={setRightrelationPopup}
                                    deleteEntity={deleteEntityClick}
                                    setIsrelationForm={setIsrelationForm}
                                    diagramInstance={diagramInstance}
                                    // setisExpand={setisExpand}
                                    // setUpdatedComponents={setUpdatedComponents}
                                    // setisExpandGraph={setisExpandGraph}
                                />
                            </div>
                        </>
                    )}
                </DiagramComponent>
                <div style={{ position: "fixed", bottom: "5%", right: "23%" }}>
                    <div className="search_icon" onClick={searchHandler}>
                        <IoSearchSharp />
                    </div>
                    {isopenSearch && (
                        <div
                            style={{
                                width: "320px",
                                height: "400px",
                                position: "absolute",
                                right: "26%",
                                transform: "translate(5%, -110%)",
                                background: "#fff",
                                zIndex: "1100",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    float: "right",
                                    margin: "15px 15px 0 0 ",
                                }}
                            >
                                <div onClick={() => setIsopenSearch(false)} className="serch_popup">
                                    <FaChevronDown />
                                </div>
                            </div>
                            <SearchElement />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default LeftMid;
