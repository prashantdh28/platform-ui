import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomOutlinedInput from "../../../../../Components/Custom/CustomOutlinedInput";
import "../searchModule.css";
import SavedAccordion from "./Accordions/SavedAccordion";
import WorkspaceAccordion from "./Accordions/WorkspaceAccordion";
import CommonWorkspace from "./CommonWorkspace";
import WorkspaceCard from "./WorkspaceCard";

const dummyworkspaceList = [1, 2, 3, 4, 5, 6, 7, 8];
const ShowResults = () => {
  const navigate = useNavigate();
  const [workspaceList, setWorkspaceList] = useState(dummyworkspaceList);

  const deleteWorkspace = (id) => {
    setWorkspaceList(workspaceList.filter((item) => item !== id));
  };

  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const handleClick = (item) => {
    if (item === selectedWorkspace) {
      setSelectedWorkspace(null); // Deselect if already selected
    } else {
      setSelectedWorkspace(item); // Select the clicked item
    }
  };
  return (
    <div className="result-work-main">
      <div>
        <div style={{ padding: "1rem" }}>
          <Button
            sx={{
              background: "rgb(17, 32, 56)",
              border: "1px solid rgb(30, 43, 64)",
            }}
            variant="contained"
            onClick={() => navigate(-1)}
            // onClick={() => navigate("/intel-flow")}
            startIcon={<ArrowBackIcon style={{ fill: "white" }} />}
          >
            Back
          </Button>
        </div>
      </div>
      <div className="result-work-container">
        {selectedWorkspace ? (
          <CommonWorkspace
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            workspaceList={workspaceList}
            selectedWorkspace={selectedWorkspace}
          />
        ) : (
          <div className="results-container">
            <div>
              <CustomOutlinedInput
                placeholder="Give me the threats prevalent in Europe in manufacturing Industry"
                //   className="header-search-input"
                //   onChange={handleOpenSerach}
                formSx={{ width: "100%" }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fill: "#8E97A4" }} />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="start">
                    <Button>
                      <BookmarkAddOutlinedIcon
                        sx={{ fill: "#8E97A4", marginRight: "-3rem" }}
                      />
                    </Button>
                  </InputAdornment>
                }
              />
            </div>
            <div className="flex-justify">
              <div
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.3rem",
                }}
              >
                Showing Top 20 Results
              </div>
              <div className="flex-align-gap">
                {" "}
                <input
                  type="date"
                  id="start"
                  name="start"
                  style={{
                    background: "#112038",
                    border: "1px solid #1E2B40",
                    borderRadius: "0.5rem",
                    color: "white",
                    padding: "0.5rem",
                    fill: "#8E97A4",
                    colorScheme: "dark",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  className="date-input"
                ></input>
                to
                <span>
                  {" "}
                  <input
                    type="date"
                    id="end"
                    name="end"
                    style={{
                      background: "#112038",
                      border: "1px solid #1E2B40",
                      borderRadius: "0.5rem",
                      color: "white",
                      padding: "0.5rem",
                      fill: "#8E97A4",
                      colorScheme: "dark",
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  ></input>
                </span>
              </div>
            </div>
            <div className="card-container-work">
              <div className="card-container-work-box">
                {workspaceList.map((item) => {
                  return (
                    <WorkspaceCard
                      key={item}
                      id={item}
                      onDelete={deleteWorkspace}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="works-container">
          <WorkspaceAccordion
            setSelectedWorkspace={setSelectedWorkspace}
            selectedWorkspace={selectedWorkspace}
            handleClick={handleClick}
          />
          <SavedAccordion />
        </div>
      </div>
    </div>
  );
};

export default ShowResults;
