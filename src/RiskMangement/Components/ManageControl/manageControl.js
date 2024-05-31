import * as React from "react";
import DropDownCOmponent from "../DropDownTree/DropDownTree";
import "./manageControl.css";

const ManageControl = ({ setActiveStep, setmanageControlflag }) => {
    const [modalData, setmodalData] = React.useState('IN_PLACE');

    // dropdown option
    const options = [
        { name: "In Place", value: "IN_PLACE" },
        { name: "In Progress", value: "IN_PROGRESS" },
        { name: "Under Consideration", value: "UNDER_CONSIDERATION" },
        { name: "N/A", value: "NOT_APPLICABLE" },
    ]

    const handleChange = (e) => {
        setmodalData(e.target.value)
    }

    return (
        <div className="e-card manage-control-container" >
            <div className='manage-control-header-container'>
                <button
                    className='back-btn'
                    onClick={() => {
                        setActiveStep(3)
                        setmanageControlflag(false)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11.3333 7.99998L4.66663 7.99998M4.66663 7.99998L7.33329 5.33331M4.66663 7.99998L7.33329 10.6666" className="svg-color-stroke" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Back</button>
                <p className="manage-control-header">Manage controls</p>
            </div>

            <table className="manage-control-table">
                <thead >
                    <tr>
                        <th className="table-header-contant" style={{ width: "20%", borderLeft: '1px solid rgba(0, 0, 0, 0.10' }} >CSF</th>
                        <th className="table-header-contant" style={{ width: "20%" }}>NIST 800-53 Control</th>
                        <th className="table-header-contant" style={{ width: "40%" }}>Control Statement</th>
                        <th className="table-header-contant" style={{ width: "20%" }}>Control Status</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    <tr>
                        <td>ID.AM-1: Physical devices and systems within the organization are inventoried</td>
                        <td style={{ padding: "10px" }}>CM-8 - SYSTEM COMPONENT INVENTORY</td>
                        <td style={{ padding: "10px" }}>a. Develop and document an inventory of system components that: 1. Accurately reflects the system; an inventory of system components that accurately reflects the system is developed and documented;
                            2. Includes all components within the system; an inventory of system components that includes all components within the system is developed and documented;
                            3. Does not include duplicate accounting of components or components assigned to any other system;
                            an inventory of system components that does not include duplicate accounting of components or components assigned to any other system is developed and documented;
                            4. Is at the level of granularity deemed necessary for tracking and reporting; and an inventory of system components that is at the level of granularity deemed necessary for tracking and reporting is developed and documented; 5. Includes the following information to achieve system component accountability</td>
                        <td style={{ padding: "10px" }}><DropDownCOmponent selectOption={modalData} handleChange={handleChange} options={options} className="manage-select" /></td>
                    </tr>
                </tbody>
            </table>
            {/* <div className="manage-btn-div">
                    <button
                        type="button"
                        id="sequrityFramework"
                        className="e-btn e-outline manage-save-btn"
                        style={{
                            borderRadius: "4px",
                            color: BackgroundColor,
                            borderColor: BackgroundColor
                        }}
                        onClick={() => {
                            setActiveStep(3)
                            setmanageControlflag(false)
                        }}
                    >
                        SAVE
                    </button>
                </div> */}
        </div>
    )
}

export default ManageControl