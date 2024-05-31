import { Accordion } from "@mui/material";
import { useState } from "react";

const CustomAccordion = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (e) => {
    // e.stop
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      sx={{
        background: "#112038 !important",
        border: "1px solid #1E2B40 !important",
        borderRadius: "0.375rem !important",
        color: "#FFFFFF !important",
        "&.Mui-expanded": {
          margin: 0,
        },
      }}
      onChange={handleAccordionChange}
    >
      {children}
    </Accordion>
  );
};

export default CustomAccordion;
