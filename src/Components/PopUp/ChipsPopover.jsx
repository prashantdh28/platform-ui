import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CustomChip from "../Custom/CustomChip";

const ChipsPopover = ({ lable, title, chipsData, onTechniqueClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        sx={{
          padding: "0.313rem 0.625rem 0.313rem 0.625rem",
          marginLeft: "0.5rem",
          marginRight: "0.5rem",
          borderRadius: "0.25rem",
          border: "2px solid #0082F9",
          background: "#FFFFFF14",
          fontSize: "0.75rem",
          fontWeight: "500",
        }}
        onClick={handleClick}
      >
        {"+"}
        {lable}
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        disablePortal={false}
        sx={{ zIndex: "1300" }}
      >
        <Box
          sx={{
            width: "19.25rem",
            height: "17.75rem",
            borderRadius: "0.375rem 0px 0px 0px",
            border: "1px solid #1E2B40",
            background: "#112038",
            boxShadow: "3px 4px 18px 2px #0A081178",
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              fontWeight: "500",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "0.875rem", fontWeight: "500" }}
              color="#fff"
            >
              {title ? title : ""}
              <span
                style={{ color: "#8E97A4" }}
              >{` (${chipsData?.length})`}</span>
            </Typography>

            <CloseOutlinedIcon
              onClick={handleClick}
              sx={{ cursor: "pointer", fill: "#8E97A4" }}
            />
          </div>
          <Divider
            sx={{
              background: "#1E2B40",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              borderWidth: "1px",
            }}
          />
          <Box
            sx={{
              overflow: "auto",
              height: "80%",
            }}
          >
            {chipsData && chipsData.length > 0
              ? chipsData.map((chip, index) => {
                  return (
                    <CustomChip
                      onClick={onTechniqueClick}
                      key={index}
                      data={{
                        label: `${
                          chip?.id ? chip?.id + "-" + chip?.name : chip?.name
                        }`,
                        ...chip,
                      }}
                      borderstyle={`${
                        chip?.isSelected ? "#0082F9" : "#FFFFFF3D"
                      }`}
                      color="#FFFFFF"
                    />
                  );
                })
              : ""}
          </Box>
        </Box>
      </Popper>
    </div>
  );
};

export default ChipsPopover;
