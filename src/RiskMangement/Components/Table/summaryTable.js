import React from "react";
import { useSelector } from "react-redux";
import { ColorOptions, TextColor } from "../../../Constants/Constant";
import "./securityFramework.css";

const Summarytable = ({ columns, data, tableData, isChecked }) => {
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  return (
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
                <td className="table-width-set">
                  {row[column?.key]?.map((innerRow, innerRowIndex) => {
                    const isInTableData = tableData?.some(
                      (item) =>
                        item.rowName === row["column1"] &&
                        item.columnName === column.header &&
                        item.name === innerRow.name &&
                        item.selected
                    );

                    return (
                      <tr key={innerRowIndex}>
                        <td
                          id="table-box-data"
                          style={{
                            color: !isChecked
                              ? isInTableData &&
                                BackgroundColor === ColorOptions.YELLOW &&
                                TextColor.BLACK
                              : innerRow.color === "#FFFF66"
                              ? TextColor.BLACK
                              : TextColor.WHITE,
                            backgroundColor: !isChecked
                              ? isInTableData && BackgroundColor
                              : innerRow.color,
                          }}
                        >
                          {innerRow.name}
                        </td>
                      </tr>
                    );
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </div>
    </table>
  );
};

export default Summarytable;
