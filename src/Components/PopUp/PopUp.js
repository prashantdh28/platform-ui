import React, { useState, useRef, useEffect } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useSelector } from "react-redux";
import { ColorOptions, TextColor } from "../../Constants/Constant";
import "./popup.css";

const PopUp = ({ name, icon, buttonStyle, headName, children, popUpStyle }) => {
  const popupRef = useRef(null);
  const [isTagsPopup, setIsTagsPopup] = useState(false);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsTagsPopup(false);
    }
  };

  const handleScrollOutside = () => {
    setIsTagsPopup(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScrollOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScrollOutside);
    };
  }, []);

  return (
    <div>
      <div style={{ position: "relative", width: "fit-content" }}>
        <ButtonComponent
          cssClass="e-info"
          className="buttonPlus"
          style={{
            backgroundColor: BackgroundColor,
            ...buttonStyle,
          }}
          onClick={() => setIsTagsPopup(!isTagsPopup)}
        >
          <span
            className={`e-icons ${icon}`}
            style={{
              height: "25px",
              backgroundColor: BackgroundColor,
              color:
                BackgroundColor === ColorOptions.YELLOW
                  ? TextColor.BLACK
                  : TextColor.WHITE,
            }}
          >
            {name ? name : ""}
          </span>
        </ButtonComponent>
        {isTagsPopup && (
          <div className="popup-profile" style={{ ...popUpStyle }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span className="head-tag">{headName ? headName : ""}</span>
              <span
                onClick={() => {
                  setIsTagsPopup(false);
                }}
                className="e-icons e-small e-close"
                style={{ cursor: "pointer" }}
              ></span>
            </div>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUp;
