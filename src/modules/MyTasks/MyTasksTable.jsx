import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TasksTableRow from "./TasksTableRow";
import RemediationsTablePagination from "../TID/intelFlow/Remediations/RemediationsTable/RemediationsTablePagination";
import "./myTask.css";
const rowsPerPage = 5;

const MyTasksTable = ({ tableData }) => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = stableSort(tableData, getComparator(order, orderBy));
  const currentPageData = sortedData.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="task table">
          <TableHead>
            <TableRow
              sx={{
                background: "#FFFFFF14",
                "& th": {
                  border: 0,
                  color: "#8E97A4",
                },
              }}
            >
              <TableCell sx={{ borderRadius: "10px 0 0 10px" }}></TableCell>
              <TableCell align="left" sx={{ padding: "0.4rem" }}>
                <TableSortLabel
                  style={{ color: "#8E97A4" }}
                  active={orderBy === "sub_action"}
                  direction={orderBy === "sub_action" ? order : "asc"}
                  onClick={() => handleRequestSort("sub_action")}
                  //   className="table-lable-sort"
                  className={orderBy === "sub_action" ? "table-lable-sort" : ""}
                >
                  Task Information
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" sx={{ padding: "0.4rem" }}>
                {/* <TableSortLabel
                  style={{ color: "#8E97A4" }}
                  active={orderBy === "relatedTo"}
                  direction={orderBy === "relatedTo" ? order : "asc"}
                  onClick={() => handleRequestSort("relatedTo")}
                > */}
                Related to
                {/* </TableSortLabel> */}
              </TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left" sx={{ padding: "0.4rem" }}>
                <TableSortLabel
                  style={{ color: "#8E97A4" }}
                  active={orderBy === "assigned_on"}
                  direction={orderBy === "assigned_on" ? order : "asc"}
                  onClick={() => handleRequestSort("assigned_on")}
                >
                  Assigned On
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" sx={{ padding: "0.4rem" }}>
                <TableSortLabel
                  style={{ color: "#8E97A4" }}
                  active={orderBy === "completed_on"}
                  direction={orderBy === "completed_on" ? order : "asc"}
                  onClick={() => handleRequestSort("completed_on")}
                >
                  Completed On
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" sx={{ padding: "0.4rem" }}>
                <TableSortLabel
                  style={{ color: "#8E97A4" }}
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={() => handleRequestSort("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" sx={{ borderRadius: "0 10px 10px 0" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => (
              <TasksTableRow key={index} row={row} index={index} />
            ))}
          </TableBody>
        </Table>
        <RemediationsTablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          tableData={tableData}
          handleChangePage={handleChangePage}
        />
      </TableContainer>
    </>
  );
};

export default MyTasksTable;

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  if (orderBy === "sub_action") {
    return order === "desc"
      ? (a, b) =>
          descendingComparator(
            a.assigned_action.sub_action,
            b.assigned_action.sub_action
          )
      : (a, b) =>
          -descendingComparator(
            a.assigned_action.sub_action,
            b.assigned_action.sub_action
          );
  } else if (orderBy === "assignedOn" || orderBy === "completedOn") {
    return order === "desc"
      ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
      : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
  } else if (orderBy === "status") {
    return order === "desc"
      ? (a, b) =>
          descendingComparator(
            a.assigned_action.status,
            b.assigned_action.status
          )
      : (a, b) =>
          -descendingComparator(
            a.assigned_action.status,
            b.assigned_action.status
          );
  } else {
    return order === "desc"
      ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
      : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
  }
}

function descendingComparator(a, b) {
  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}
