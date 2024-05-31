import React from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import { Box, Button } from "@mui/material";
import CustomTextField from "../../../Components/Custom/CustomTextField";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import { ReactComponent as Icon } from "../../../Assests/SVG/ChessIcon.svg";
const ChatSection = ({ expandChat, setExpandChat }) => {
  return (
    <div className="chat-box">
      <div className="flex-between">
        {expandChat ? (
          <CloseFullscreenRoundedIcon
            sx={{ color: "#8E97A4", cursor: "pointer" }}
            onClick={() => setExpandChat(!expandChat)}
          />
        ) : (
          <OpenInFullRoundedIcon
            sx={{ color: "#8E97A4", cursor: "pointer" }}
            onClick={() => setExpandChat(!expandChat)}
          />
        )}
        <div>
          <FileUploadOutlinedIcon
            sx={{ color: "#8E97A4", cursor: "pointer" }}
          />
        </div>
      </div>
      <div style={{ height: "100%" }}>
        <div
          style={{
            height: "91%",
            display: "flex",
            flexDirection: "column-reverse",
            gap: "1rem",
            margin: "1rem 0rem",
          }}
        >
          <div className="generated-msg-container">
            <div className="chess-icon">
              <Icon />
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip: ex ea commodo consequat: Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </div>
          </div>
          <div className="my-msg-box">
            Lorem ipsum dolor sit amet, consectetur
          </div>
        </div>
        <div>
          {" "}
          <Box
            sx={{
              border: "1px solid #1E2B40",
              backgroundColor: "#112038",
              borderRadius: "0.5rem",
              display: "flex",
              padding: "0.3rem",
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
                placeholder="Ask Questions"
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
              <Button
                variant="contained"
                sx={{
                  background: "#0082F9",
                  minWidth: "auto",
                  padding: "4px 6px",
                }}
                size="small"
              >
                <NorthRoundedIcon />
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
