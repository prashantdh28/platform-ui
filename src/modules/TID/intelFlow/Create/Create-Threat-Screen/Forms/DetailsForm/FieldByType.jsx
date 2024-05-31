import React from "react";

const FieldByType = ({ type, validTypes, children }) => {
  const isValid = validTypes?.includes(type?.toUpperCase());
  if (!isValid) {
    return null;
  }
  return <div>{children}</div>;
};

export default FieldByType;
