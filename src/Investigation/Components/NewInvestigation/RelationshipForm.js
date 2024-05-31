import React from "react";
import "./RelationshipForm.css";
import Chips from "../../../Components/DropForm/Chips";
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRelationForm,
  updateSharedRelationInput,
} from "../../../redux/Slice/sharedInputSlice";

const RelationshipForm = () => {
  const FormData = useSelector((state) => state?.actorform?.relationData);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (FormData.from && FormData.to && FormData.type) {
      dispatch(resetRelationForm());
    } else {
      // console.log("Form validation failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateSharedRelationInput({ ...FormData, [name]: value }));
  };
  // const formValidator = React.createRef();

  return (
    // <div className="form-container">
    <>
      <form id="myForm" onSubmit={handleSubmit}>
        <div className="form-container">
          <div style={{ display: "flex" }}>
            <div>
              <div className="outerdiv ">
                <div className="innerdiv">
                  <label style={{ fontSize: "15px", marginRight: "50px" }}>
                    From
                  </label>
                  <input
                    className="e-input placeholderComment"
                    name="from"
                    type="text"
                    value={FormData.from}
                    readOnly
                    placeholder="ThreatActor"
                    // onChange={handleInputChange}
                    style={{ width: "80px", borderBottom: "aliceblue" }}
                    validationRules={{ required: true, id: true }}
                  />
                  <br />
                </div>
              </div>
              <div className="outerdiv ">
                <div className="innerdiv">
                  <label style={{ fontSize: "15px", marginRight: "50px" }}>
                    To
                  </label>
                  <input
                    className="e-input placeholderComment"
                    name="to"
                    type="text"
                    value={FormData.to}
                    readOnly
                    placeholder="ThreatActor"
                    // onChange={handleInputChange}
                    style={{
                      width: "80px",
                      marginLeft: "18px",
                      borderBottom: "aliceblue",
                    }}
                    validationRules={{ required: true, id: true }}
                  />
                  <br />
                </div>
              </div>

              <div className="outerdiv">
                <div className="innerdiv">
                  <label style={{ fontSize: "15px" }}>Type</label>
                  <br />
                  <input
                    className="e-input placeholderComment"
                    style={{ width: "180px", color: "black" }}
                    name="type"
                    value={FormData.type}
                    onChange={handleInputChange}
                    placeholder="Value"
                    validationRules={{ required: true }}
                    // ref={(formValidator) => (formValidator = formValidator)}
                  />
                </div>
              </div>

              <div className="outerdiv ">
                <div className="innerdiv">
                  <label style={{ fontSize: "15px", marginRight: "20px" }}>
                    Start Date
                  </label>
                  <input
                    className="e-input placeholderComment"
                    name="startDate"
                    type="text"
                    value={FormData.startDate}
                    readOnly
                    placeholder="02.02.2023"
                    onChange={handleInputChange}
                    style={{ width: "80px" }}
                    validationRules={{ required: true, id: true }}
                  />
                  <br />
                </div>
              </div>

              <div className="outerdiv ">
                <div className="innerdiv">
                  {/* <DatePickerComponent
                    className="e-input placeholderComment"
                    name="EndDate"
                    id="datepicker"
                    value={FormData.EndDate}
                    placeholder="End date"
                    // onChange={handleInputChange}
                    // style={{ marginTop: "2px" }}
                  /> */}
                  <input
                    name="EndDate"
                    className="e-input placeholderComment"
                    style={{ width: "185px" }}
                    type="date"
                    value={FormData.EndDate}
                    onChange={handleInputChange}
                    placeholder="Value"
                    validationRules={{ required: true }}
                    // ref={(formValidator) => (formValidator = formValidator)}
                  />
                  <br />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "5px" }}>
              {" "}
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                Additionally
              </span>
              <div className="outerdiv">
                <div className="innerdiv">
                  <label style={{ fontSize: "15px" }}>Key</label>
                  <br />
                  <input
                    className="e-input placeholderComment"
                    style={{ width: "180px", color: "black" }}
                    name="additionallyKey"
                    value={FormData.additionallyKey}
                    onChange={handleInputChange}
                    placeholder="Key"
                    validationRules={{ required: true }}
                    // ref={(formValidator) => (formValidator = formValidator)}
                  />
                </div>
              </div>
              <div className="outerdiv">
                <div className="innerdiv">
                  <label style={{ fontSize: "15px" }}>Value</label>
                  <br />
                  <input
                    className="e-input placeholderComment"
                    style={{ width: "180px", color: "black" }}
                    name="additionallyValue"
                    value={FormData.additionallyValue}
                    onChange={handleInputChange}
                    placeholder="Value"
                    validationRules={{ required: true }}
                    // ref={(formValidator) => (formValidator = formValidator)}
                  />
                </div>
              </div>
              <div className="outerdiv">
                <div className="innerdiv">
                  <label style={{ fontSize: "15px" }}>Tags Search</label>
                  <br />
                  <input
                    className="e-input placeholderComment"
                    style={{ width: "180px", color: "black" }}
                    name="tags"
                    value={FormData.tags}
                    onChange={handleInputChange}
                    placeholder="Text"
                    validationRules={{ required: true }}
                    // ref={(formValidator) => (formValidator = formValidator)}
                  />
                  <Chips />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "8px" }}>
          <button type="submit" className="donebtn">
            DONE
          </button>
        </div>
      </form>
    </>
    // </div>
  );
};

export default RelationshipForm;
