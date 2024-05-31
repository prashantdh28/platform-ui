import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import RemediationsTablePagination from "./RemediationsTablePagination";
import RemediationsTableRow from "./RemediationsTableRow";

const rowsPerPage = 5;

const RemediationsTable = ({ tableData, states, updateThreatCoverageData, query }) => {
    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = tableData.slice(startIndex, endIndex);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <TableContainer>
                <Table aria-label="simple table">
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
                            <TableCell sx={{ borderRadius: "10px 0 0 10px" }}>PRIORITY</TableCell>
                            <TableCell align="left">
                                {`${query ? query.toUpperCase() : "CONTROLS"}`} NAME
                            </TableCell>
                            <TableCell align="left">
                                {`${query ? query.toUpperCase() : "CONTROLS"}`} DESCRIPTION
                            </TableCell>
                            <TableCell align="left">ASSOCIATED TECHNIQUES</TableCell>
                            <TableCell align="left">THREATS</TableCell>
                            <TableCell align="left">
                                {`${query ? query.toUpperCase() : "CONTROLS"}`} STATUS
                            </TableCell>
                            <TableCell align="left" sx={{ borderRadius: "0 10px 10px 0" }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPageData.map((row, index) => (
                            <RemediationsTableRow
                                key={index}
                                row={row}
                                states={states}
                                query={query}
                                updateThreatCoverageData={updateThreatCoverageData}
                            />
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

export default RemediationsTable;
