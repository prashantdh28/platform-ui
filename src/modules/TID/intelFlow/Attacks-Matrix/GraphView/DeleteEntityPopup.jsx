import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";

import Chip from "@mui/material/Chip";
import Popper from "@mui/material/Popper";

const DeleteEntityPopup = ({
  onDeleteTag,
  openD,
  openDeletePopup,
  handleCloseDeletePopup,
  name,
  handleOpenDeletePopup,
  id,
  setAnchorEl,
  anchorEl,
  handleClick,
}) => {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "delete-entity-popover" : undefined;
  return (
    <Popper
      id={id}
      open={openD}
      anchorEl={anchorEl}
      placement="bottom-end"
      disablePortal={true}
      sx={{
        zIndex: "1",
      }}
    >
      <Box
        sx={{
          width: "12.938rem",
          height: "9.5rem",
          borderRadius: "0.375rem 0px 0px 0px",
          border: "1px solid #1E2B40",
          background: "#112038",
          boxShadow: "3px 4px 18px 2px #0A081178",
          padding: "1rem",
          // translate: "250% 180%",
        }}
      >
        <Box
          sx={{
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
            Delete Tag
          </Typography>
          <CloseOutlinedIcon
            onClick={handleClick}
            sx={{ cursor: "pointer", fill: "#8E97A4" }}
          />
        </Box>
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "80%",
          }}
        >
          <div>
            <Chip
              className="customChip"
              sx={{
                borderRadius: "0.25rem",
                background: "#FFFFFF1F",
                border: "1px solid #FFFFFF3D",
                margin: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: "500",
                lineHeight: "1.013rem",
                "& .MuiChip-label": {
                  color: "#FFFFFF",
                },
              }}
              label={name}
            />
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 0rem",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                borderRadius: "0.375rem",
                height: "1.75rem",
              }}
              onClick={handleClick}
            >
              Cancle
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                borderRadius: "0.375rem",
                height: "1.75rem",
                background: "#DB3960",
              }}
              onClick={onDeleteTag}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Popper>
  );
};

export default DeleteEntityPopup;
