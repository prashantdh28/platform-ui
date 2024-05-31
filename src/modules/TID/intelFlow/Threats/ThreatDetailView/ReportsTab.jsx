import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NoDataFound from "../../../../../Pages/NoDataFound";
import { Divider } from "@mui/material";

const ReportsTab = ({ entityID }) => {
    const ReportData = entityID?.reports;

    const handleTitleClick = (url) => {
        // Open the report URL in a new tab
        window.open(url, "_blank");
    };

    return (
        <div className="report-tab-container">
            {ReportData && ReportData.length > 0 ? (
                <>
                    <div>Reports</div>
                    <Divider
                        sx={{
                            background: "#1E2B40",
                            borderWidth: "1px",
                        }}
                    />
                    <TableContainer>
                        <Table aria-label="sigma table" size="small">
                            <TableHead>
                                <TableRow
                                    sx={{
                                        background: "#FFFFFF14 !important",
                                        "& th": {
                                            border: 0,
                                            color: "#8E97A4",
                                        },
                                    }}
                                >
                                    <TableCell sx={{ borderRadius: "10px 0 0 10px", width: "35%" }}>
                                        Report Title
                                    </TableCell>
                                    <TableCell align="left">Version</TableCell>
                                    <TableCell align="left" sx={{ borderRadius: "0 10px 10px 0" }}>
                                        Report Type
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ReportData?.map((row, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                                "& .MuiTableCell-body": {
                                                    borderBottom: "1px solid #1E2B40",
                                                    color: "#FFFFFF",
                                                },
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{
                                                    minWidth: "6rem",
                                                    cursor: "pointer",
                                                    color: "green !important",
                                                    textDecoration: "underline",
                                                }}
                                                onClick={() => handleTitleClick(row?.report_url)}
                                            >
                                                {row?.title}
                                            </TableCell>

                                            <TableCell align="left">
                                                <div className="report-tab-version">{row?.version}</div>
                                            </TableCell>
                                            <TableCell align="left">{row?.report_type}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : (
                <NoDataFound />
            )}
        </div>
    );
};

export default ReportsTab;
