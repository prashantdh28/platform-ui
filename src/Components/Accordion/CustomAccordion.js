import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomAccordion = ({ accordionHeader, children }) => {
    const [isExpend, setIsExpend] = useState(false);
    return (
        <div>
            <Accordion expanded={isExpend} onChange={() => setIsExpend(!isExpend)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>{accordionHeader}</Typography>
                </AccordionSummary>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
        </div>
    );
};

export default CustomAccordion;
