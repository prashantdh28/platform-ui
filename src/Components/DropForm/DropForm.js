import React, { useState } from "react";
import "./DropForm.css";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateSharedInput } from "../../redux/Slice/sharedInputSlice";
import moment from "moment";
import { updateTabsData } from "../../redux/Slice/tabSlice";

const DropForm = ({ setIsFormOpen, isFormOpen, children, popupData, diagramInstance ,sty}) => {
    const tabsData = useSelector((state) => state.tabs.tabsData) || [];
    const [open, setOpen] = useState(false);
    const FormData = useSelector((state) => state?.actorform?.data);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedFormData = {
            name: FormData.name || popupData.name,
            description: FormData.description || popupData.description,
            nodeType: popupData.nodeType,
            firstseen: moment(new Date()).format("YYYY-MM-DD HH:mm"),
            lastseen: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        };
        const updatedTab =
            tabsData &&
            tabsData.length > 0 &&
            tabsData.map((tab) => {
                const { nodes } = tab;
                const updatedNodes =
                    nodes &&
                    nodes.length > 0 &&
                    nodes.map((node) => {
                        if (node.data.nodeType === popupData.nodeType) {
                            diagramInstance.selectedItems.nodes[0].properties.data = {
                                ...formattedFormData,
                            };
                            return { ...node, data: { ...formattedFormData } };
                        } else {
                            return { ...node };
                        }
                    });
                return { ...tab, nodes: updatedNodes };
            });
        dispatch(updateTabsData(updatedTab));
        dispatch(resetForm());
        setOpen(false);
        // const updatedTab = {
        //     ...tabsData[existingTabIndex],
        //     nodes: updatedNodes,
        //     connectors: updatedConnectors,
        // };
        // dispatch(AddEntity(formattedFormData, showToast, setIsFormOpen));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateSharedInput({ ...FormData, [name]: value }));
    };

    return (
        <>
            <div style={{ position: "relative" }}>
                <div onClick={() => setOpen(!open)}>{children}</div>
                {open && (
                    <div style={{ position: "absolute", padding: "1rem" }} id={sty === "sty" ? "left_edit" : "add_prop"} >
                        <div className="form-container-entity">
                            <div className="form-container-header">
                                <h2>{popupData.nodeType ? popupData.nodeType : ""} </h2>
                                <span
                                    onClick={() => {
                                        setOpen(false);
                                        // diagramInstance.clearSelection();
                                        // dispatch(resetForm());
                                    }}
                                    className="e-icons e-small e-close"
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                            <form className="form-container-controlls">
                                <div className="outerdiv ">
                                    {/* <div className="innerdiv">
                                        <label style={{ fontSize: "12px" }}>ID</label>
                                        <br />
                                        <input
                                            className="e-input placeholderComment"
                                            name="id"
                                            type="text"
                                            //   value={FormData?.id}
                                            placeholder="Value"
                                            //   onChange={handleInputChange}
                                            style={{ width: "219px", marginTop: "2px" }}
                                            validationRules={{ required: true, id: true }}
                                        />
                                        <br />
                                    </div> */}
                                    <div>
                                        <label style={{ fontSize: "12px" }}>Name</label>
                                        <br />
                                        <input
                                            className="e-input  placeholderComment"
                                            name="name"
                                            type="text"
                                            value={FormData?.name || popupData.name}
                                            placeholder="Value"
                                            onChange={handleInputChange}
                                            style={{
                                                width: "219px",
                                                color: "black",
                                                marginTop: "2px",
                                                borderBottom:"1px solid"
                                            }}
                                            validationRules={{ required: true }}
                                            // ref={(formValidator) => (formValidator = formValidator)}
                                        />
                                    </div>
                                </div>

                                <div className="outerdiv">
                                    <div className="innerdiv">
                                        <label style={{ fontSize: "12px" }}>Description</label>
                                        <br />
                                        <input
                                            className="e-input placeholderComment"
                                            style={{
                                                width: "219px",
                                                color: "black",
                                                marginTop: "2px",borderBottom:"1px solid"
                                            }}
                                            name="description"
                                            value={FormData.description || popupData.description}
                                            onChange={handleInputChange}
                                            placeholder="Value"
                                            validationRules={{ required: true }}
                                            // ref={(formValidator) => (formValidator = formValidator)}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ fontSize: "12px" }}>nodeType</label>
                                        <br />
                                        <input
                                            className="e-input placeholderComment"
                                            style={{
                                                width: "219px",
                                                color: "black",
                                                marginTop: "2px",borderBottom:"1px solid"
                                            }}
                                            name="nodeType"
                                            readOnly
                                            value={popupData.nodeType}
                                            // onChange={handleInputChange}
                                            placeholder="Value"
                                            // ref={(formValidator) => (formValidator = formValidator)}
                                        />
                                    </div>
                                </div>

                                {/* <div className="outerdiv">
                                    <div className="innerdiv">
                                        <label style={{ fontSize: "12px" }}>First seen</label>
                                        <div style={{ position: "relative" }}>
                                            <input
                                                name="firstseen"
                                                type="date"
                                                className="e-input placeholderComment"
                                                style={{
                                                    width: "219px",
                                                    color: "black",
                                                    marginTop: "2px",
                                                }}
                                                readOnly
                                                value={FormData.firstseen}
                                                // onChange={handleInputChange}
                                                placeholder="Value"
                                            />
                                        </div>
                                    </div>

                                    <div className="innerdiv">
                                        <label style={{ fontSize: "12px" }}>Last seen</label>
                                        <br />
                                        <div style={{ position: "relative" }}>
                                            <input
                                                className="e-input placeholderComment"
                                                type="date"
                                                style={{
                                                    width: "219px",
                                                    color: "black",
                                                    marginTop: "2px",
                                                }}
                                                name="lastseen"
                                                // type="date"
                                                readOnly
                                                value={FormData.lastseen}
                                                // onChange={handleInputChange}
                                                placeholder="Value"
                                            />
                                        </div>
                                    </div>
                                </div> */}

                                <div style={{ marginLeft: "1px" }}>
                                    <button type="submit" className="donebtn" onClick={handleSubmit}>
                                        DONE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
        // </div>
    );
};

export default DropForm;
