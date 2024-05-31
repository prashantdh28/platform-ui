import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Typography } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CustomAccordion from "../../../../../../Components/Custom/CustomAccordion";
import "../../searchModule.css";
const savedSearch = [1, 2, 3];
const SavedAccordion = () => {
  return (
    <>
      <CustomAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: "white",
            },
            color: "white",
          }}
        >
          Saved Search
        </AccordionSummary>
        {/* <Divider
          sx={{
            border: "1px solid #1E2B40",
            margin: "1rem 1rem",
          }}
          orientation="horizontal"
        /> */}
        <AccordionDetails>
          <div className="saved-result-card-box">
            {savedSearch &&
              savedSearch.map((index) => {
                return (
                  <div className="saved-result-card" key={index}>
                    <div>
                      <Typography>
                        Give me the threats prevalent in Europe in manufacturing
                        Industry
                      </Typography>
                    </div>
                    {savedSearch.length > 1 ? (
                      <div
                        //   aria-describedby={id}
                        style={{ cursor: "pointer" }}
                        //   onClick={(event) => handleClick(event, ent?.name)}
                      >
                        <CancelOutlinedIcon
                          sx={{ color: "rgba(142, 151, 164, 1)" }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
          </div>
        </AccordionDetails>
      </CustomAccordion>
    </>
  );
};

export default SavedAccordion;
