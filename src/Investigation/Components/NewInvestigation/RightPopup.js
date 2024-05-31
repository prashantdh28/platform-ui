import React, { useState } from "react";
import "./RightPopup.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import AddEntity from "./AddEntity";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import DropForm from "../../../Components/DropForm/DropForm";

const RightPopup = ({

    prevOffset,
    sourceId,
    setRightFormOpen,
    deleteEntity,
    setisExpand,
    setUpdatedComponents,
    updatedComponents,
    setIsFormOpen,
    diagramInstance,
    setPopupData,
    popupData,
    setEntityData,
    changeNodeData,
    diagramData,
    setDiagramData
    // nodedata,
}) => {
    const [isAddEntity, setIsAddEntity] = useState(false);
    const [isDeleteRelation, setIsDeleteRelation] = React.useState(false);

    const deleteCancel = (e) => {
        setIsDeleteRelation(false);
    };
    // const ExpandGraphHandler = () => {
    //     if (updatedComponents.length > 1) {
    //         setisExpand(true);
    //     }
    //     setRightFormOpen(false);
    // };
    const addEntityHandler = () => {
        // setRightFormOpen(false)
        setIsAddEntity(true);
    };

    const addProperties = () => {
        setIsFormOpen(true);
        setRightFormOpen(false);
    };

    return (
        <>
            <div className="main-popup-div">
                <div className="innerdiv">
                    <span className="e-icons e-zoom-in-2"></span>
                    <span className="spanname" onClick={addEntityHandler}>
                        Add Entity
                    </span>
                </div>
                <div className="innerdiv" onClick={addProperties}>
                    <DropForm popupData={popupData} diagramInstance={diagramInstance}>
                        <span className="e-icons e-zoom-in-2"></span>
                        <span className="spanname">Add Properties</span>
                    </DropForm>
                </div>
                <div
                    className="innerdiv"
                    // onClick={ExpandGraphHandler}
                >
                    <span className="e-icons e-refresh-2"></span>
                    <span className="spanname">Expand Graph</span>
                </div>
                <div className="innerdiv" onClick={addProperties}>
                    <DropForm popupData={popupData} diagramInstance={diagramInstance} sty="sty">
                        <span className="e-icons e-edit"></span>
                        <span className="spanname">Edit</span>
                    </DropForm>
                </div>
                <div
                    className="innerdiv"
                    onClick={() => {
                        setIsDeleteRelation(true);
                    }}
                >
                    <span className="e-icons e-trash"></span>
                </div>
                <div className="innerdiv">
                    <span
                        onClick={() => {
                            // setisExpand(false);

                            // Set the state with the updated array
                            setPopupData("");
                            // setRightFormOpen(false);
                            diagramInstance.clearSelection();
                        }}
                        className="e-icons e-small e-close"
                    ></span>
                </div>
            </div>
            {isDeleteRelation && (
                <div
                    className="popup"
                    style={{
                        position: "absolute",
                        width: "200px",
                        height: "170px",
                        top: "10rem",
                        left: "57%",
                        transform: "translate(-50%, -50%)",
                        background: "#fff",
                        padding: "16px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        borderRadius: "4px",
                    }}
                >
                    <div className="fileListMenu">
                        <div className="deletedesc">
                            <p style={{ margin: "0 0 0.5rem 0" }}>
                                {" "}
                                Are you sure you want to delete this entity from the workspace? All
                                relationships associated with it will also be removed.
                            </p>
                        </div>
                        <div className="cancle-delete" style={{ display: "flex", gap: "10px" }}>
                            <ButtonComponent
                                onClick={deleteCancel}
                                className="cancelbtn"
                                cssClass="e-outline"
                            >
                                Cancel{" "}
                            </ButtonComponent>
                            <ButtonComponent
                                className="deletebtn"
                                cssClass="e-outline"
                                onClick={() => {
                                    deleteEntity();
                                    setIsDeleteRelation(false);
                                    setRightFormOpen(false);
                                }}
                            >
                                Delete
                            </ButtonComponent>
                        </div>
                        {/* <div className='renameFile' onClick={renameHandling}><div>Rename</div><div ><MdModeEdit /></div> </div>

                            <div className='deleteFile'><div>Delete</div><div><MdDelete /></div></div> */}
                    </div>
                </div>
            )}
            {isAddEntity && (
                <div
                    id="addentity-container"
                    style={{
                        position: "absolute",
                        width: "19rem",
                        height: "441px",
                        top: "14rem",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        // background: "#fff",
                        padding: "20px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div
                            onClick={() => {
                                setIsAddEntity(false);
                                setRightFormOpen(true);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            {" "}
                            <span>
                                <IoIosArrowRoundBack />
                            </span>{" "}
                            Back
                        </div>
                        <div
                            onClick={() => setIsAddEntity(false)}
                            className="e-icons e-small e-close"
                            style={{ cursor: "pointer" }}
                        ></div>
                    </div>

                    <AddEntity
                        sourceId={sourceId}
                        prevOffset={prevOffset}
                        setDiagramData={setDiagramData}
                        diagramData={diagramData}
                        changeNodeData={changeNodeData}
                        diagramInstance={diagramInstance}
                    />
                </div>
            )}
        </>
    );
}

export default RightPopup;
