import { TabComponent } from "@syncfusion/ej2-react-navigations";
import React, { useEffect, useRef, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import SecurityTable from "../Table/securityFramework";
import Summarytable from "../Table/summaryTable";
import "./tab.css";
import { updateTabsData } from "../../../redux/Slice/riskManagementSlice";

const Tabs = ({ step, isChecked }) => {
    const tabRef = useRef(null);
    const dispatch = useDispatch()
    const { tableData, tabData } = useSelector((state) => state.risk)
    const [columns, setColumns] = useState([])
    const [updatedData, setupdatedData] = useState(tabData)


    // set tab
    useEffect(() => {
        const formattedData = {};
        const updatedColum = []
        tableData?.forEach((businessObj, index) => {
            businessObj.functions.forEach(func => {
                if (!formattedData[func.function]) {
                    formattedData[func.function] = {
                        tableData : [],
                        selectedTableData:[]
                    };
                }
                func.categories.forEach(category => {
                    const existingCategory = formattedData[func.function].tableData.find(item => item.column1 === category.name);
                    if (!existingCategory) {
                        formattedData[func.function].tableData.push({
                            column1: category.name,
                            column2: [],
                            column3: [],
                            column4: [],
                            column5: [],
                            column6: [],
                        });
                    }
                });
            });
            updatedColum.push({ header: businessObj.name, key: `column${index + 2}` })
        });
        setColumns(updatedColum)

        tableData?.forEach((businessObj, index) => {
            businessObj.functions.forEach((func) => {
                func.categories.forEach((category) => {
                    const columnIndex = formattedData[func.function].tableData.findIndex(item => item.column1 === category.name);
                    if (columnIndex !== -1) {
                        const subcategoryNames = category.subcategories.map(subcat => ({ name: subcat.id, ...subcat, rowName: category.name, columnName: businessObj?.name, tabName:func.function }));
                        if (updatedColum[index]?.header === businessObj?.name) {
                            formattedData[func.function]["tableData"][columnIndex][`column${index + 2}`]?.push(...subcategoryNames);
                            formattedData[func.function]["selectedTableData"].push(...subcategoryNames);
                        }
                    }
                });
            });
        });
        setupdatedData(formattedData)
        dispatch(updateTabsData(formattedData))
    }, [dispatch,tableData])

    return (
        <div className="control-pane">
            {updatedData && Object.keys(updatedData).length > 0 && (
                <>
                    <TabComponent ref={tabRef} defaultSelected={2}>
                        <div className="e-tab-header tab-header-align">
                            {Object.keys(updatedData).map((tabName, index) => {
                                return (
                                    <div key={index} className="form3-Riskscore-Header-names">
                                        {tabName} <BsExclamationCircle id="tab-icon-color" />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="e-content" id="TID-Tab-Content">
                            {Object.keys(updatedData).map((tabName, index) => (
                                <React.Fragment key={index}>
                                    {step === 2 ? (
                                        <div>
                                            <SecurityTable
                                                columns={columns}
                                                data={updatedData[tabName]["tableData"]}
                                                tableData={updatedData[tabName]["selectedTableData"]}
                                                setupdatedData={setupdatedData}
                                                tab={index + 1}
                                                tabName={tabName}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <Summarytable
                                                columns={columns}
                                                data={updatedData[tabName]["tableData"]}
                                                tableData={updatedData[tabName]["selectedTableData"]}
                                                tab={index + 1}
                                                isChecked={isChecked}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </TabComponent>
                </>
            )}
        </div>
    );
};

export default Tabs;
