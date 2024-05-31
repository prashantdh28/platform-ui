import { SymbolPaletteComponent } from "@syncfusion/ej2-react-diagrams";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "../../../../Components/Searchbar/Searchbar";
import { getAllEntityImg } from "../../../../redux/Slice/entitySlice";
import "../LeftMid.css";
import "./LeftsidePalet.css";

const LeftSidePalet = ({ connectorSymbols, popupData }) => {
    const activeTabId = useSelector((state) => state.tabs.activeTabId);
    const EntityImage = useSelector((state) => state.entity.allEntityimg);
    const [searchImg, setSearchImg] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllEntityImg());
    }, [dispatch, activeTabId]);
    useEffect(() => {
        setSearchImg(EntityImage);
    }, [EntityImage]);

    var newEntity = [];
    const handleChange = (e) => {
        EntityImage?.map((Entity, index) => {
            if (index === 0) {
                newEntity.length = 0;
            }
            const filtereddata = Entity?.images?.filter((item) =>
                item?.data?.nodeType?.toLowerCase()?.includes(e.target.value?.toLowerCase())
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

    // const Data = LiveData;
    return (
        <div className="leftpalet">
            <p style={{ fontWeight: "bold" }}>Palet</p>
            <div style={{width:"100%"}}>
                {/* <FormControl
                    sx={{
                        m: 1,
                        height: "48px",
                    }}
                    size="large"
                >
                    <TextField
                        id="outlined-basic"
                        className="elementSearch"
                        label="Serach Entity"
                        variant="outlined"
                        placeholder="Entities"
                        // fullWidth
                        // value={searchText}
                        style={{width:"100%"}}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AiOutlineSearch className="search-icon" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl> */}

                <Searchbar label="Search Entity" placeholder="Search Entities" className="inv-searchEntity" id="inv-searchEntity" onchange={handleChange} width="100%"/>
            </div>
            {/* {isLoading && <SpinnerLoader />} */}
            <div style={{ marginTop: "1.4rem", background: "var(--sidebar-bg)", minWidth:"10rem"}}>
                <SymbolPaletteComponent
                // style={{minWidth:"18rem"}}
                className="resposnsive-container"
                    id="symbolpalette"
                    expandMode="Multiple"
                    expanded="false"
                    cssClass={"symbolEntity"}
                    palettes={[
                        ...searchImg?.map((entity) => ({
                            id: entity?.id,
                            //   expanded: true,
                            expandMode: "Multiple",
                            symbols: entity?.images,
                            title: entity?.category,
                        })),
                        {
                            id: "connectors",
                            expanded: true,
                            symbols: connectorSymbols, // Assuming connectorSymbols is an array of connector symbols
                            title: "Connectors",
                        },
                    ]}
                    width={"100%"}
                    // height={"400px"}
                    symbolHeight={80}
                    symbolWidth={80}
                    getNodeDefaults={(symbol) => {
                        if (symbol.id === "Link2" || symbol.id === "Link1") {
                            symbol.width = 20;
                            symbol.height = 20;
                        } else {
                            symbol.width = 25;
                            symbol.height = 25;
                            symbol.backgroundColor = "transparent";
                        }
                        symbol.style.strokeColor = "white";
                    }}
                    symbolMargin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    getSymbolInfo={(symbol) => {
                        if (symbol.id === "Link2" || symbol.id === "Link1") {
                            symbol.width = 20;
                            symbol.height = 20;
                        }
                        return {
                            width: 20,
                            height: 20,
                        };
                    }}
                />
            </div>
            {popupData && popupData.id && (
                <div style={{ width: "100%" }}>
                    <hr style={{ width: "100%" }} />
                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            flexDirection: "column",
                            marginBottom: "2rem",
                        }}
                    >
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Detail View</p>
                        <label htmlFor="entitieName">Entitie Name</label>
                        <input
                            className="e-input placeholderComment"
                            name="entitieName"
                            type="text"
                            label="Entitie Name"
                            disabled
                            defaultValue={popupData && popupData.name ? popupData.name : "-"}
                            placeholder="Entitie Name"
                        />
                    </div>
                    <hr style={{ width: "100%" }} />
                    <div className="properties-container">
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Properties</p>
                        <div className="properties">
                            <span className="properties-filed">Name</span>
                            <span className="properties-value">
                                {popupData && popupData.name ? popupData.name : "-"}
                            </span>
                        </div>
                        <div className="properties">
                            <span className="properties-filed">Description</span>
                            <span className="properties-value">
                                {popupData && popupData.description ? popupData.description : "-"}
                            </span>
                        </div>
                        <div className="properties">
                            <span className="properties-filed">Node Type</span>
                            <span className="properties-value">
                                {popupData && popupData.nodeType ? popupData.nodeType : "-"}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeftSidePalet;
