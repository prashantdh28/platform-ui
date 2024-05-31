import TextField from "@mui/material/TextField";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ButtonComponent from "../../../Components/Button/ButtonBox";
import { updateTabsData } from "../../../redux/Slice/riskManagementSlice";
import DropDownCOmponent from "../DropDownTree/DropDownTree";
import "./securityFramework.css";

const SecurityTable = ({
  columns,
  data,
  tab,
  tabName,
  setupdatedData,
  tableData,
}) => {
  const dispatch = useDispatch();
  const selection_reasonRef = useRef("");
  const impact_reasonRef = useRef("");
  const [status, setStatus] = useState({ hideDialog: false });
  const [modalData, setmodalData] = useState({
    control_status: "",
    impact: "",
  });
  const [modalHeader, setmodalHeader] = useState("");
  const [modalReqestData, setModalReqestData] = useState({});
  const [selectedInnerRow, setSelectedInnerRow] = useState(null);
  // dropdown option
  const options = [
    { name: "In Place", value: "IN_PLACE" },
    { name: "In Progress", value: "IN_PROGRESS" },
    { name: "Under Consideration", value: "UNDER_CONSIDERATION" },
    { name: "N/A", value: "NOT_APPLICABLE" },
  ];

  // dropdown option
  const valueOptions = [
    { name: "High", value: "HIGH" },
    { name: "Medium", value: "MEDIUM" },
    { name: "Low", value: "LOW" },
  ];

  //modal close
  const dialogClose = () => {
    impact_reasonRef.current.value = "";
    selection_reasonRef.current.value = "";
    setmodalData({ control_status: "", impact: "" });
    setStatus({ hideDialog: false });
  };

  //modal header
  const header = () => {
    return (
      <div>
        <div
          title={modalHeader}
          className="e-icon-settings dlg-template table-modal-header"
        >
          {modalHeader}
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    setmodalData({ ...modalData, control_status: e.target.value });
  };

  const handleValueChange = (e) => {
    setmodalData({ ...modalData, impact: e.target.value });
  };

  const updateSubcategoryData = (selected, compareData) => {
    setupdatedData((pre) => {
      const updatedData = JSON.parse(JSON.stringify({ ...pre }));
      const updatedCategoryData = updatedData[tabName]["selectedTableData"].map(
        (item) => {
          if (
            item.id === compareData.id &&
            item.columnName === compareData.columnName &&
            item.rowName === compareData.rowName
          ) {
            if (modalData.control_status === "") {
              modalData.control_status = null;
            }
            if (modalData.impact === "") {
              modalData.impact = null;
            }
            const newSubcat = {
              ...item,
              ...modalData,
              impact_reason: impact_reasonRef.current.value,
              selection_reason: selection_reasonRef.current.value,
              selected: selected,
            };
            return newSubcat;
          }
          return { ...item };
        }
      );
      updatedData[tabName]["selectedTableData"] = [...updatedCategoryData];
      dispatch(updateTabsData(updatedData));
      return { ...updatedData };
    });
  };

  //modal done button
  const handleModalButton = () => {
    if (modalData.control_status === "") {
      modalData.control_status = null;
    }
    if (modalData.impact === "") {
      modalData.impact = null;
    }
    updateSubcategoryData(true, modalReqestData);
    setStatus({ hideDialog: false });
  };

  //modal open
  const handleSubcategoryData = (row, column, innerRow) => {
    //find data in tabledata
    const data = {
      rowName: row["column1"],
      columnName: column.header,
      Name: innerRow.name,
      tabName,
      ...innerRow,
    };
    setModalReqestData(data);
    setSelectedInnerRow(innerRow);
    const findData = tableData?.filter((item) => {
      return (
        item.rowName === data.rowName &&
        item.columnName === data.columnName &&
        item.name === data.Name
      );
    });

    //data set in modal
    if (findData?.length > 0) {
      const { control_status, impact, impact_reason, selection_reason } =
        findData[0];
      setmodalData({
        control_status: control_status ? control_status : "",
        impact: impact ? impact : "",
      });
      impact_reasonRef.current.value = impact_reason ? impact_reason : "";
      selection_reasonRef.current.value = selection_reason
        ? selection_reason
        : "";
    }
    setmodalHeader(innerRow.name);
    setStatus({ hideDialog: true });
  };

  return (
    <>
      <table className="table-container">
        <thead className="table-head">
          <div style={{ padding: "0px 32px" }}>
            <tr className="td-align">
              <th className="header-width-set"></th>
              {columns?.map((column, index) => (
                <th className="table-header-text header-width-set" key={index}>
                  {column.header}
                </th>
              ))}
            </tr>
          </div>
        </thead>
        <div style={{ padding: "0px 32px" }}>
          <tr className="td-align">
            <td className="catagory">Category</td>
            <td colSpan={columns?.length} className="subcategories">
              Subcategories
            </td>
          </tr>
        </div>
        <div className="table-body-div">
          <tbody className="form-table-body">
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex} className="td-align">
                <td className="table-width-set">{row["column1"]}</td>
                {columns?.map((column, columnIndex) => (
                  <td className="table-width-set" key={columnIndex}>
                    {row[column?.key]?.map((innerRow, innerRowIndex) => (
                      <>
                        <tr key={innerRowIndex} className="table-box">
                          <td
                            id="table-box-data"
                            onClick={() =>
                              handleSubcategoryData(row, column, innerRow)
                            }
                          >
                            <div
                              className="table-td-content"
                              style={{
                                "word-wrap": "break-word",
                                width: "160px",
                              }}
                            >
                              <div className="table-td-inner-div">
                                {tableData?.some(
                                  (item) =>
                                    item.rowName === row["column1"] &&
                                    item.columnName === column.header &&
                                    item.name === innerRow.name &&
                                    item.selected
                                ) && (
                                  <input
                                    className={`checkBox-height hover-position-fix
                                                                    ${
                                                                      tableData?.some(
                                                                        (
                                                                          item
                                                                        ) =>
                                                                          item.rowName ===
                                                                            row[
                                                                              "column1"
                                                                            ] &&
                                                                          item.columnName ===
                                                                            column.header &&
                                                                          item.name ===
                                                                            innerRow.name &&
                                                                          item.selected
                                                                      ) &&
                                                                      "position-fix"
                                                                    }`}
                                    type="checkbox"
                                    name={row["column1"]}
                                    id={column.header}
                                    defaultChecked={tableData?.some(
                                      (item) =>
                                        item.rowName === row["column1"] &&
                                        item.columnName === column.header &&
                                        item.name === innerRow.name &&
                                        item.selected
                                    )}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!e.target.checked) {
                                        const data = {
                                          rowName: row["column1"],
                                          columnName: column.header,
                                          Name: innerRow.name,
                                          ...innerRow,
                                        };
                                        updateSubcategoryData(false, data);
                                      }
                                    }}
                                  />
                                )}
                                <p className="table-data-name">
                                  {innerRow.name}
                                </p>
                              </div>
                              <p className="table-checkbox hover-text">
                                {innerRow?.description}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </div>
      </table>
      <div className="App" id={`dialog-target-${tab}`}>
        <DialogComponent
          header={header}
          showCloseIcon={true}
          width="500px"
          target={`#dialog-target-${tab}`}
          close={dialogClose}
          visible={status.hideDialog}
          isModal={true}
          position={{ X: "center", Y: "center" }}
          className="form-modal"
        >
          <div className="table-modal-container">
            <p>{selectedInnerRow?.description}</p>
            <DropDownCOmponent
              label="Control Status"
              selectOption={modalData.control_status}
              handleChange={handleChange}
              options={options}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--grey-color) !important",
                },
                "& .MuiSvgIcon-root": {
                  color: "var(--name-email) !important",
                },
                "& .MuiList-root": {
                  color: "var(--name-email) !important",
                },
              }}
            />
            <TextField
              id="outlined-multiline-flexible"
              // multiline
              // rows={4}
              label="Reason for selecting a subcategory"
              style={{ width: "100%" }}
              inputRef={selection_reasonRef}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--grey-color) !important",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DropDownCOmponent
              label="Impact Value"
              selectOption={modalData.impact}
              handleChange={handleValueChange}
              options={valueOptions}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--grey-color) !important",
                },
                "& .MuiSvgIcon-root": {
                  color: "var(--name-email) !important",
                },
                "& .MuiList-root": {
                  color: "var(--name-email) !important",
                },
              }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Reason for selecting the Impact value"
              // multiline
              // rows={4}
              inputRef={impact_reasonRef}
              style={{ width: "100%" }}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--grey-color) !important",
                },
              }}
            />
            <div className="modal-btn-group">
              <ButtonComponent
                type="button"
                label="DONE"
                className="e-btn form-next-btn"
                onClick={handleModalButton}
              />
            </div>
          </div>
        </DialogComponent>
      </div>
    </>
  );
};

export default SecurityTable;
