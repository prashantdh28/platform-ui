import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import React from "react";

const RemediationsTablePagination = ({ tableData, handleChangePage, rowsPerPage, page }) => {
    return (
        <>
            <Stack
                spacing={2}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem 1rem 0.5rem 0.5rem",
                }}
            >
                <Pagination
                    onChange={handleChangePage}
                    count={Math.ceil(tableData.length / rowsPerPage)}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    sx={{
                        color: "white !important",
                        "& .MuiPaginationItem-icon": {
                            color: "white",
                        },
                        "& .Mui-selected": {
                            backgroundColor: "rgba(0, 130, 249, 1) !important",
                        },
                        "& .MuiPaginationItem-rounded": {
                            color: "white !important",
                            borderColor: "rgba(30, 43, 64, 1) !important",
                            height: "2.5rem !important",
                            width: "2.5rem !important",
                        },
                    }}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                            }}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </>
    );
};

export default RemediationsTablePagination;
