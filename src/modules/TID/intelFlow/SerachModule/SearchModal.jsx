import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../../Components/Custom/CustomTextField";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const SearchModal = ({ openSearch, handleCloseSerach }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/search-results");
    handleCloseSerach();
  };

  return (
    <>
      <Modal
        open={openSearch}
        onClose={handleCloseSerach}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0%)",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Box
            sx={{
              border: "1px solid #1E2B40",
              backgroundColor: "#112038",
              borderRadius: "0.5rem",
              display: "flex",
              padding: "1rem",
              // width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <CustomTextField
                placeholder="Search anything"
                fullWidth
                styleSx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: 0,
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#8E97A4",
                    fontSize: "1rem",
                  },
                }}
              />
            </Box>
            <Box>
              <Button variant="contained">Serach</Button>
            </Box>
          </Box>
          <Box
            sx={{
              color: "#8E97A4",
              background: "#112038",
              border: "1px solid #1E2B40",
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #1E2B40",
                padding: "1rem 0rem",
                cursor: "pointer",
              }}
              onClick={handleSearch}
            >
              <span>
                Give me the threats prevalent in Europe in manufacturing
                Industry
              </span>
              <ArrowOutwardIcon sx={{ fill: "#8E97A4" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #1E2B40",
                padding: "1rem 0rem",
                cursor: "pointer",
              }}
              onClick={handleSearch}
            >
              <span>
                Give me the threats prevalent in Europe in manufacturing
                Industry
              </span>
              <ArrowOutwardIcon sx={{ fill: "#8E97A4" }} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SearchModal;
