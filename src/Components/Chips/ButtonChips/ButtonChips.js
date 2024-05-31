import React from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import "./buttonChips.css";
import { useSelector } from "react-redux";

const ButtonChips = ({ name, onClick, selectedTTPs, TTP }) => {
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  return (
    <ButtonComponent
      className="buttonCompo"
      style={{
        backgroundColor:
          selectedTTPs && selectedTTPs?.includes(TTP?.id)
            ? BackgroundColor
            : "",
        color: selectedTTPs && selectedTTPs?.includes(TTP?.id) ? "white" : "",
      }}
      onClick={onClick}
    >
      {name}
    </ButtonComponent>
  );
};

export default ButtonChips;
