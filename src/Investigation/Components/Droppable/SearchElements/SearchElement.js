import React, { useEffect } from "react";

import "./SearchElement.css";
// import user from "../../../../Img/asset/2085544 1 (Traced).svg";
import { FormControl } from "@mui/base";
import { InputAdornment, TextField } from "@mui/material";
import { SymbolPaletteComponent } from "@syncfusion/ej2-react-diagrams";
import { AiOutlineSearch } from "react-icons/ai";
// import { SearchEntityData } from "../../../../Components/Collaps/data";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchEntity } from "../../../../redux/Slice/entitySlice";
import { useDebouncedValue } from "../../../../Hooks/useDebouncedValue";
import { useImageDisplay } from "../../../../Hooks/useImageDisplay";

const SearchElement = () => {
    const [searchText, setSearchText] = useState("");
    const [filterdata, setFilterdata] = useState([]);
    const dispatch = useDispatch();
    const [getImage] = useImageDisplay();
    const data = useSelector((state) => state.entity.entitiesdata);
    // const EntityImage = useSelector((state) => state.entity.allEntityimg);

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const debouncedValue = useDebouncedValue(searchText, 500);

    useEffect(() => {
        const searchParams = {
            search: debouncedValue,
        };

        // Dispatch the action with the searchParams payload
        dispatch(SearchEntity(searchParams));
    }, [debouncedValue, dispatch]);

    useEffect(() => {
        // Set up the filter data
        const object =
            data &&
            data.content &&
            data.content.length > 0 &&
            data.content.map((filterdata) => {
                const nodeImage = getImage(filterdata.nodeType);
                const shape = nodeImage ? nodeImage.shape : {};
                const data = nodeImage ? { ...nodeImage?.data } : {};
                const filterobject = {
                    id: filterdata.entityId + 2000,
                    shape: shape || {},
                    name: filterdata.name,
                    text: filterdata.description,
                    data: data,
                };
                return filterobject;
            });
        setFilterdata(object);
    }, [data, getImage]);

    useEffect(() => {
        const palletElemnt = document.getElementById("symbolpalette2_container");
        if (palletElemnt) {
            palletElemnt?.children[0]?.children[0]?.classList?.add("header-palletElemnt");
        }
        if (searchText.length > 0) {
            filterdata &&
                filterdata.length > 0 &&
                filterdata.forEach((SearchEntity) => {
                    const symbolElement = document.getElementById(`${SearchEntity.id}_container`);
                    symbolElement.style.width = "100%";
                    symbolElement.style.display = "flex";
                    symbolElement.style.alignItems = "center";
                    if (symbolElement.children && symbolElement.children.length > 0) {
                        if (symbolElement.children[0]?.tagName.toLowerCase() === "canvas") {
                            symbolElement.children[0].style.width = "6rem";
                            symbolElement.children[0].style.transform = "scale(1, 1)";
                        }
                        if (symbolElement.children[1]?.tagName.toLowerCase() === "div") {
                            return;
                        }
                        const divElement = document.createElement("div");
                        divElement.style.width = "75%";
                        const nameElement = document.createElement("div");
                        const descriptionElement = document.createElement("div");
                        divElement.innerHTML = "";
                        descriptionElement.innerHTML = SearchEntity?.text;
                        descriptionElement.style.fontSize = "12px";
                        descriptionElement.style.color = "var( --name-email)";
                        nameElement.innerHTML = SearchEntity?.name;
                        nameElement.style.fontWeight = "bold";
                        nameElement.style.color = "var( --name-email)";
                        divElement.appendChild(nameElement);
                        divElement.appendChild(descriptionElement);
                        symbolElement.appendChild(divElement);
                    }
                });
        }
    }, [filterdata, searchText]);

    return (
        <div className="serch_popup">
            <div className="searchElement">
                <FormControl
                    sx={{
                        m: 1,
                        minWidth: 240,
                        height: "48px",
                    }}
                    size="small"
                >
                    <TextField
                        id="outlined-basic"
                        className="elementSearch"
                        label="Serach Entity"
                        variant="outlined"
                        placeholder="Search Entity"
                        fullWidth
                        value={searchText}
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
            <div className="main_container_element">
                <div className="symbolEntity">
                    <SymbolPaletteComponent
                        id="symbolpalette2"
                        // expandMode="Single"
                        palettes={[
                            {
                                id: "TreatActorForSearch",
                                expanded: true,
                                symbols: searchText.length > 0 ? filterdata : [],
                                iconCss: "SearchEntity",
                            },
                        ]}
                        width={"100%"}
                        border="none"
                        symbolHeight={100}
                        symbolWidth={100}
                        getNodeDefaults={(symbol) => {
                            if (symbol.id === "Link2" || symbol.id === "Link1") {
                                symbol.width = 20;
                                symbol.height = 20;
                            } else {
                                symbol.width = 55;
                                symbol.height = 55;
                                symbol.backgroundColor = "transparent";
                            }
                            symbol.style.strokeColor = "white";
                        }}
                        symbolMargin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        getSymbolInfo={(symbol) => {
                            return {
                                width: 40,
                                height: 40,
                            };
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchElement;
