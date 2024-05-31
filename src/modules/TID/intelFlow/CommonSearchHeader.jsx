import React, { useState } from "react";
import { Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "./SerachModule/SearchModal";

const CommonSearchHeader = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSerach = () => {
    setOpenSearch(true);
  };
  const handleCloseSerach = () => {
    setOpenSearch(false);
  };
  return (
    <>
      <Button
        sx={{
          color: "#8e97a4",
          background: "#091932",
          marginRight: "2rem",
          borderRadius: "0.375rem",
          border: "1px solid #1e2b40",
          width: "23.75rem",
          justifyContent: "flex-start",
          "&:hover": {
            backgroundColor: "#091932",
          },
        }}
        onClick={handleOpenSerach}
        startIcon={
          <InputAdornment position="start">
            <SearchIcon sx={{ fill: "#8E97A4" }} />
          </InputAdornment>
        }
        variant="contained"
      >
        Search anything
      </Button>
      <SearchModal
        handleCloseSerach={handleCloseSerach}
        openSearch={openSearch}
      />
    </>
  );
};

export default CommonSearchHeader;
