import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { InputAdornment } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            background: "#08172F !important",
        },
        sx: {
            "& .MuiList-root": {
                background: "#08172F !important",
                color: "#fff !important",
            },
            "& .MuiTypography-root": {
                color: "#fff !important",
            },
            "& .MuiSvgIcon-root": {
                color: "#fff !important",
            },
            background: "#08172F !important",
            borderRadius: "0.375rem",
        },
    },
};

const CustomSelect = ({
  placeholder,
  placholderTextColor,
  menuItems = [],
  selectedMenuItems = [],
  setSelectedMenuItems,
  handleChange,
  bordercolor,
  multiple,
  sx,
  ...rest
}) => {
  const handleNoneOption = () => {
    if (typeof setSelectedMenuItems === "function") {
      setSelectedMenuItems(""); // Resetting the selection to none
    }
  };
  return (
      <>
          <FormControl
              className="customeSelect"
              sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                      border: "0",
                  },
                  "& .MuiSelect-select": {
                      color: "#fff !important",
                      paddingRight: "0 !important",
                  },
                  "& .MuiSelect-select::placeholder": {
                      color: "#fff !important",
                  },
                  border: `1px solid ${bordercolor ? bordercolor : "#1E2B40"}`,
                  borderRadius: "0.3rem",
                  height: "2.25rem",
                  padding: "0.1rem",
                  ...sx,
              }}
          >
              <Select
                  id="customeSelect"
                  displayEmpty
                  multiple={multiple}
                  value={selectedMenuItems}
                  onChange={handleChange}
                  input={<OutlinedInput label={placeholder} sx={{ paddingRight: "0" }} />}
                  renderValue={(selected) => {
                      if (selected.length === 0) {
                          return (
                              <span
                                  style={{
                                      color: "#8E97A4",
                                  }}
                              >
                                  {placeholder}
                              </span>
                          );
                      }
                      if (typeof selected === "string") {
                          return selected;
                      }
                      return selected.join(", ");
                  }}
                  endAdornment={
                      <InputAdornment position="end">
                          <KeyboardArrowDownIcon sx={{ fill: "#8E97A4" }} />
                      </InputAdornment>
                  }
                  MenuProps={MenuProps}
                  // SelectProps={{
                  //   // Add SelectProps here
                  //   IconComponent: () => null, // Remove the default icon
                  // }}
                  sx={{
                      height: "inherit",
                      "& .MuiList-root": {
                          backgroundColor: "#08172F !important",
                      },
                      "& .MuiMenu-list": {
                          backgroundColor: "#08172F !important",
                      },
                      "& .MuiSelect-icon": {
                          display: "none !important",
                      },
                  }}
                  {...rest}
              >
                  <MenuItem
                      disabled
                      value=""
                      style={{
                          color: `${placholderTextColor ? placholderTextColor : ""}`,
                          fontWeight: "600",
                      }}
                  >
                      <em>{placeholder}</em>
                  </MenuItem>
                  <MenuItem value={""} onClick={() => handleNoneOption}>
                      None
                  </MenuItem>

                  {menuItems &&
                      menuItems.length > 0 &&
                      menuItems.map((item, index) => (
                          <MenuItem key={index} value={item}>
                              {multiple ? <Checkbox checked={selectedMenuItems.indexOf(item) > -1} /> : ""}
                              <ListItemText primary={item} />
                          </MenuItem>
                      ))}
              </Select>
          </FormControl>
      </>
  );
};

export default CustomSelect;
