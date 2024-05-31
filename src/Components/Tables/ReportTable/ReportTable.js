import React, { useCallback, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";
import "./ReportTable.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReportData } from "../../../Services/Report/report.service";
import { format } from "../../../helper/dateFormater";
import SpinnerLoader from "../../Loader/SpinnerLoader";
import ButtonChips from "../../Chips/ButtonChips/ButtonChips";
import TagPupUp from "../../PopUp/TagPupUp";

const ReportTable = () => {
  const dispatch = useDispatch();
  const { actorId } = useParams();
  const { reportData = {}, reportLoading } = useSelector(
    (state) => state.report
  );
  const getReports = useCallback(async () => {
    if (actorId) {
      await dispatch(getReportData({ actorId }));
    }
  }, [actorId, dispatch]);

  useEffect(() => {
    getReports();
  }, [getReports]);

  const gridReportData =
    reportData &&
    reportData.length > 0 &&
    reportData.map((item) => {
      const {
        title,
        version,
        report_type,
        last_modified,
        tags,
        report_url: ReportURL,
      } = item;
      const { day, month, minutes, hours, daySuffix } = format(last_modified);
      const ReportDate = `${day}${daySuffix} ${month} ${hours}:${minutes}`;
      return {
        ReportTitle: title,
        version,
        ReportType: report_type,
        ReportDate,
        Tags: tags,
        ReportURL,
      };
    });
  const sortingOptions = {
    columns: [{ field: "ReportTitle", direction: "Ascending" }],
  };

  const loadingIndicator = { indicatorType: "Shimmer" };
  const onClick = (event, searchUrl) => {
    window.open(searchUrl);
  };
  return (
    <>
      <div className="table-bg">
        <div className="activity-text">
          <h2 id="activity">Reports</h2>
          {/* <div className="activity-text">
                      <Searchbar />
                      <DropDownTree />
                  </div> */}
        </div>

        {reportLoading && <SpinnerLoader />}
        {reportData && reportData.length > 0 ? (
          <div className="custom-grid-container">
            <GridComponent
              dataSource={gridReportData}
              allowPaging={false} // Disable pagination
              allowSorting={true}
              sortSettings={sortingOptions}
              className="custom-grid"
              loadingIndicator={loadingIndicator}
            >
              <ColumnsDirective className="grid-table-column">
                <ColumnDirective
                  field="ReportTitle"
                  headerText="Report Title"
                  width="30%"
                  textAlign="Left"
                  headerTextAlign="Left"
                  template={(props) => {
                    return (
                      <div
                        style={{
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={(e) => onClick(e, props.ReportURL)}
                      >
                        {props.ReportTitle}
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
                />
                <ColumnDirective
                  field="ReportType"
                  headerText="Report Type"
                  width="10%"
                  textAlign="Left"
                />
                <ColumnDirective
                  field="ReportDate"
                  headerText="Report Date"
                  width="10%"
                  format="yMd"
                  textAlign="Left"
                />
                <ColumnDirective
                  field="Tags"
                  headerText="Tags"
                  headerTextAlign="Left"
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
                          Tags.slice(0, 3).map((tag, index) => {
                            const { name } = tag;
                            const truncateName = name
                              ? name.slice(0, 10) + "..."
                              : null;
                            return (
                              <ButtonChips name={truncateName} key={index} />
                            );
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
        ) : (
          <p className="noData">No Data Found</p>
        )}
      </div>
    </>
  );
};

export default ReportTable;
