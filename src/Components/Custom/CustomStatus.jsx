import React from "react";

const CustomStatus = ({ children, type, ...rest }) => {
  const borderColor = (type) => {
    switch (type) {
      case "NOT_IN_PLACE":
        return "rgba(235, 131, 131, 1)";
      case "IN_PROGRESS":
        return "#F1C950";
      case "IN_PLACE":
        return "rgba(102, 226, 151, 1)";
      case "NOT_APPLICABLE":
        return "rgba(124, 154, 243, 1)";
      default:
        return null;
    }
  };
  return (
    <>
      <div
        {...rest}
        style={{
          border: `1px solid ${borderColor(type)}`,
          borderRadius: "0.4rem",
          padding: "0.3rem",
          width: "fit-content",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default CustomStatus;
