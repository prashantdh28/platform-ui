import React, { useState } from "react";
import NoDataFound from "../../../../../Pages/NoDataFound";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { renderNewIcon } from "../../../../../helper/IconRenderer";
import CustomTooltip from "../../../../../Components/Custom/CustomTooltip";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import RemediationsTablePagination from "../../Remediations/RemediationsTable/RemediationsTablePagination";
const rowsPerPage = 10;
const AssociationsTab = ({ data }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const handleTitleClick = (id) => {
    setTimeout(() => {
      navigate(`/intel-flow/${id}`);
    }, 300);
  };
  let AssociationsData = [];
  if (Object.keys(data).length > 0) {
    for (let i = 0; i < Object.keys(data).length; i++) {
      const element = Object.keys(data)[i];

      if (data[element].length > 0) {
        for (let j = 0; j < data[element].length; j++) {
          const typeData = data[element][j];
          AssociationsData.push({ ...typeData });
        }
      }
    }
  }
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = AssociationsData?.slice(startIndex, endIndex);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <>
      {data && Object.keys(data).length > 0 ? (
        <div className="report-tab-container">
          <div>Attributions</div>
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
                  <TableCell sx={{ borderRadius: "10px 0 0 10px" }}></TableCell>
                  <TableCell align="left">Entity Name</TableCell>
                  <TableCell align="left">Relationship</TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderRadius: "0 10px 10px 0" }}
                  >
                    Description
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPageData?.map((row, index) => {
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
                        //   sx={{ minWidth: "12rem" }}
                      >
                        <CustomTooltip title={row.type}>
                          <span key={index}> {renderNewIcon(row?.type)}</span>
                        </CustomTooltip>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          cursor: "pointer",
                          color: "green !important",
                          textDecoration: "underline",
                        }}
                        onClick={() => handleTitleClick(row.id)}
                      >
                        {row?.name}
                      </TableCell>

                      <TableCell align="left">
                        <div
                          className="report-tab-version"
                          style={{ textWrap: "nowrap" }}
                        >
                          {row?.attribution_type}
                        </div>
                      </TableCell>
                      <TableCell align="left">{row?.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <RemediationsTablePagination
              page={page}
              rowsPerPage={rowsPerPage}
              tableData={AssociationsData}
              handleChangePage={handleChangePage}
            />
          </TableContainer>
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default AssociationsTab;
