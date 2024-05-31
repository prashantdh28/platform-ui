import React from "react";
import BreadCrumb from "../../../Components/BreadCrumb/BreadCrumb";
import download from "../../../Assests/SVG/download.svg";
import { useNavigate } from "react-router-dom";
import DynamicButton from "../../../Components/Button/ButtonBox";
import "./Finish.css";

const Finish = () => {
  const navigate = useNavigate();

  
  const handleClick = () => {
    navigate("/courseofaction");
  };

  return (
    <>
      <div className="main-screen">
        <div className="finish-bradcrumb">
          <BreadCrumb />
        </div>

        <div className="finish-download">
          <div className="finish-square-download">
            <div className="download-icon">
              <img src={download} alt="download" />
            </div>
          </div>
          <span className="ttp-desc">
            Your TTP and Defend Data were successfully downloaded.
          </span>
          <DynamicButton
            className="Goback-button"
            onClick={handleClick}
            label="Go Back"
          ></DynamicButton>
        </div>
      </div>
    </>
  );
};

export default Finish;
