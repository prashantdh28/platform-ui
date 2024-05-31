import React from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ButtonColor, ColorOptions, TextColor } from "../../Constants/Constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./ButtonBox.css";

function DynamicButton({ label, onClick, isDisabled, className, to, style, type,cssClass }) {
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    // Define the disabled styles for the button
    const disabledStyles = {
        backgroundColor: ButtonColor.DISABLED,
        color: ButtonColor.DISABLED_TEXT_COLOR,
        cursor: "not-allowed",
    };

    const handleClick = () => {
      if (!isDisabled) {
          if (to) {
              navigate(to); // Navigate to the specified route
          }

          if (onClick) {
              onClick();
          }
      }
    };

    const navigate = useNavigate();
    return (
        <ButtonComponent
            type={type}
            className={`${className}`}
            onClick={handleClick}
            cssClass={cssClass}
            style={{
                backgroundColor: BackgroundColor,
                color: BackgroundColor === ColorOptions.YELLOW ? TextColor.BLACK : TextColor.WHITE,
                ...(isDisabled ? disabledStyles : {}),
                ...style,
            }}
            // disabled={isDisabled}
        >
            {label}
        </ButtonComponent>
    );
}

export default DynamicButton;
