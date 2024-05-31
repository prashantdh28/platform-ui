import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Sort } from "@syncfusion/ej2-react-grids";
import React from "react";
import { useSelector } from "react-redux";
import TagPupUp from "../../../../../Components/PopUp/TagPupUp";
import "./SingleEntityReport.css";

const SingleEntityReport = ({ entityID }) => {
  const gridReportData = entityID?.reports;
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

  return (
    <>
      {" "}
      <div className="SingleEntity-Report-table-bg">
        <div className="activity-text">
          <h2 id="activity">Reports</h2>
          {/* <div className="activity-text">
            <DropDownTree options={options} />
          </div> */}
        </div>

        <div className="custom-grid-container">
          <GridComponent
            dataSource={gridReportData}
            allowPaging={true}
            allowSorting={true}
            className="custom-grid"
            // enableVirtualization={true}
            enableHover={false}
            allowTextWrap={true}
            allowSelection={false}
          >
            <ColumnsDirective className="grid-table-column">
              <ColumnDirective
                field="ReportTitle"
                headerText="Report Title"
                width="30%"
                textAlign="Left"
                headerTextAlign="Left"
                template={(props) => {
                  const handleTitleClick = () => {
                    // Open the report URL in a new tab
                    window.open(props?.report_url, "_blank");
                  };
                  return (
                    <div
                      style={{
                        cursor: "pointer",
                        color: BackgroundColor,
                        textDecoration: "underline",
                      }}
                      onClick={handleTitleClick}
                    >
                      {props?.title}
                    </div>
                  );
                }}
              />

              <ColumnDirective
                field="version"
                headerText="Version"
                width="10%"
                textAlign="Left"
                headerTextAlign="Left"
                template={(props) => {
                  return (
                    <div
                      style={{
                        cursor: "pointer",
                        color: "var(--name-email)",
                      }}
                    >
                      {props?.version}
                    </div>
                  );
                }}
              />
              <ColumnDirective
                field="ReportType"
                headerText="Report Type"
                width="10%"
                textAlign="Left"
                template={(props) => {
                  return (
                    <div
                      style={{
                        cursor: "pointer",
                        color: "var(--name-email)",
                      }}
                    >
                      {props?.report_type}
                    </div>
                  );
                }}
              />
              {/* <ColumnDirective
                field="ReportDate"
                headerText="Report Date"
                width="10%"
                format="yMd"
                textAlign="Left"
              /> */}
              <ColumnDirective
                field="Tags"
                headerText="Tags"
                headerTextAlign="Center"
                width="20%"
                textAlign="Left"
                allowSorting={false}
                cssClass="chips"
                className="chips"
                template={(props) => {
                  const { Tags } = props;
                  return (
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {Tags &&
                        Tags.length > 0 &&
                        // eslint-disable-next-line
                        Tags.slice(0, 3).map((tag, index) => {
                          const { name } = tag;
                          // eslint-disable-next-line
                          const truncateName = name
                            ? name.slice(0, 10) + "..."
                            : null;
                          return {
                            /* <ButtonChips name={truncateName} key={index} /> */
                          };
                        })}
                      <TagPupUp tags={Tags} />
                    </div>
                  );
                }}
              />
            </ColumnsDirective>
            <Inject services={[Sort]} />
          </GridComponent>
        </div>
      </div>
    </>
  );
};

export default SingleEntityReport;
