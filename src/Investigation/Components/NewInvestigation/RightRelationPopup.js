import React from "react";
import "./RightPopup.css";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const RightRelationPopup = ({
  setRightrelationPopup,
  setisExpand,
  deleteEntity,
  setUpdatedComponents,
  setIsrelationForm,
  diagramInstance,
}) => {
  const [isDeleteRelation, setIsDeleteRelation] = React.useState(false);

  const deleteCancel = (e) => {
    setIsDeleteRelation(false);
  };

  const addRelation = () => {
    setIsrelationForm(true);
    setRightrelationPopup(false);
  };

  return (
    <>
      <div className="maindiv">
        <div className="innerdiv">
          <span className="e-icons e-zoom-in-2"></span>
          <span className="spanname" onClick={addRelation}>
            Relationship
          </span>
        </div>
        <div className="innerdiv">
          <span className="e-icons e-edit"></span>
          <span className="spanname">Edit</span>
        </div>
        <div
          className="innerdiv"
          onClick={() => {
            setIsDeleteRelation(true);

            // setRightrelationPopup(false);
            // setisExpand(false);
          }}
        >
          <span className="e-icons e-trash"></span>
          <span className="spanname">Delete</span>
        </div>
        <div className="innerdiv">
          <span
            onClick={() => {
              // setisExpand(false);
              setRightrelationPopup(false);
              diagramInstance.clearSelection();
            }}
            className="e-icons e-small e-close"
          ></span>
        </div>
        {isDeleteRelation && (
          <div
            className="popup"
            style={{
              position: "absolute",
              width: "200px",
              height: "100px",
              top: "7rem",
              left: "47%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              padding: "16px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              borderRadius: "4px",
            }}
          >
            <div className="fileListMenu">
              <div className="deletedesc">
                <p> Are you sure you want to delete this relationship?</p>
              </div>
              <div
                className="cancle-delete"
                style={{ display: "flex", gap: "10px" }}
              >
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
                    setRightrelationPopup(false);
                    // setisExpand(false);
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
      </div>
    </>
  );
};

export default RightRelationPopup;
