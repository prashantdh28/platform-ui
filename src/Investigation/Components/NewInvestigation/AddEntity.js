import { FormControl, InputAdornment, TextField } from "@mui/material";
import React, {  useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./AddEntity.css";
import { useSelector } from "react-redux";
const AddEntity = ({
  sourceId,
  prevOffset,
  setDiagramData,

}) => {

  const EntityImage = useSelector((state) => state.entity.allEntityimg);
  const [searchImg, setSearchImg] = useState(EntityImage);
  // const [clickedSymbolInfo, setClickedSymbolInfo] = useState(null);
  const tabsData = useSelector((state) => state.tabs.tabsData) || [];

  const generateRandomId = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  const handleAddEntity = (entity) => {
      const newEntity = {
          id: generateRandomId(),
          data: entity?.data,
          shape: entity?.shape,
          height: 70,
          offsetX: prevOffset?.offsetX + Math.random() * 100 + 100,
          offsetY: prevOffset?.offsetY + Math.random() * 100 + 100,
      };
      const newConn = {
          id: generateRandomId(),
          sourceID: sourceId,
          targetID: newEntity?.id,
          sourceDecorator: {
              pivot: {
                  x: 0,
                  y: 0.5,
              },
              shape: "Circle",
              style: {
                  fill: "blue",
                  opacity: 1,
                  gradient: {
                      type: "None",
                  },
                  strokeColor: "blue",
                  strokeWidth: 1,
                  strokeDashArray: "",
              },
          },
          targetDecorator: {
              pivot: {
                  x: 0,
                  y: 0.5,
              },
              shape: "OpenArrow",
              style: {
                  fill: "blue",
                  opacity: 1,
                  gradient: {
                      type: "None",
                  },
                  strokeColor: "blue",
                  strokeWidth: 1,
                  strokeDashArray: "",
              },
          },
          type: "Orthogonal",
          style: {
              fill: "transparent",
              opacity: 1,
              gradient: {
                  type: "None",
              },
              strokeColor: "blue",
              strokeWidth: 1,
              strokeDashArray: "",
          },
          offsetX: 510.765,
          offsetY: 201.4,
          segments: {},
      };
      const { nodes, connectors } = tabsData && tabsData.length > 0 ? tabsData[0] : {};

      setDiagramData((prevData) => {
          const previousNode = JSON.parse(JSON.stringify(nodes));
          const previousConnectors = JSON.parse(JSON.stringify(connectors));
          return {
              nodes: [...previousNode, newEntity],
              connectors: [...previousConnectors, newConn],
          };
      });
  };

  var newEntity = [];
  const handleChange = (e) => {
        EntityImage?.map((Entity, index) => {

      if (index === 0) {
        newEntity.length = 0;
      }
      const filtereddata = Entity?.images?.filter((item) =>
        item?.data?.nodeType
          ?.toLowerCase()
          ?.includes(e.target.value?.toLowerCase())
      );
      const enttityObject = {
        id: Entity?.id,
        category: Entity?.category,
        images: filtereddata,
      };
      newEntity?.push(enttityObject);
      return newEntity;
    });
    setSearchImg(newEntity);
  };
  
  return (
      <div>
          <div className="add-entity">
              <p>Add Entity</p>
              <span
                  className="e-icons e-zoom-in-2 addEntityIcon"
                  style={{ display: "flex", alignItems: "center" }}
              ></span>
          </div>
          <div>
              <FormControl
                  sx={{
                      m: 1,
                      minWidth: 200,
                      margin: "0pc !important",
                      // width: "220px",
                      height: "48px",
                  }}
                  size="small"
                  fullWidth
              >
                  <TextField
                      id="outlined-basic"
                      className="elementSearch"
                      // label={label}
                      variant="outlined"
                      placeholder="Serach Entity"
                      // value={value}
                      onChange={handleChange}
                      InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                  <AiOutlineSearch className="search-icon" />
                              </InputAdornment>
                          ),
                      }}
                  />
              </FormControl>
          </div>
          <div className="intel-container">
              {searchImg?.map((intel, index) => (
                  <React.Fragment key={index}>
                      <p>{intel?.category}</p>
                      <div className="intel-item" >
                          {intel?.images.map((entity) => (
                              <img
                                  src={entity?.shape?.source}
                                  alt=""
                                  onClick={() => handleAddEntity(entity)}
                                //   className="EntityImg"
                                style={{backgroundColor:"rgb(245,247,254)"
                                 ,height:"4rem",
                                width: "4rem",
                                }}
                              />
                          ))}
                      </div>
                  </React.Fragment>
              ))}
          </div>
      </div>
  );
};

export default AddEntity;
