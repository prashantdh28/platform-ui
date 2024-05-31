import { Tooltip } from "@mui/material";
import React from "react";

const CustomTooltip = ({ title, children, ...rest }) => {
  return (
      <>
          {typeof children === "string" ? (
              <Tooltip title={title} arrow {...rest}>
                  <span>{children}</span>
              </Tooltip>
          ) : (
              <Tooltip title={title} arrow {...rest}>
                  {children}
              </Tooltip>
          )}
      </>
  );
};

export default CustomTooltip;
