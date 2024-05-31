import React, { useState } from "react";
import { Button } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./index.css";
import CommonWorkspace from "../TID/intelFlow/SerachModule/SearchedResults/CommonWorkspace";
import ChatSection from "./ChatSection/ChatSection";
const dummyworkspaceList = [1, 2, 3, 4, 5, 6, 7, 8];
const WorkspaceLists = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [workspaceList] = useState(dummyworkspaceList);
  const [expandChat, setExpandChat] = useState(false);
  return (
    <div>
      <Button
        sx={{
          background: "rgb(17, 32, 56)",
          border: "1px solid rgb(30, 43, 64)",
          margin: "0rem 1rem",
        }}
        variant="contained"
        onClick={() => navigate("/my-workspace")}
        startIcon={<ArrowBackIcon style={{ fill: "white" }} />}
      >
        Back
      </Button>
      <div className="worklist-chat-container">
        {/* <div className="work-list-container"> */}
        <CommonWorkspace
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          workspaceList={workspaceList}
          selectedWorkspace="02"
          expandChat={expandChat}
        />
        {/* </div> */}
        <div
          className={
            expandChat ? "chats-container-expanded" : "chats-container"
          }
        >
          <ChatSection setExpandChat={setExpandChat} expandChat={expandChat} />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLists;
