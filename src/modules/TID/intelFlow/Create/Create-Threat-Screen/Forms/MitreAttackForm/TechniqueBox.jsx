import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as DialpadOff } from "../../../../../../../Assests/SVG/DialpadOff.svg";
import { ReactComponent as DialpadOn } from "../../../../../../../Assests/SVG/DialpadOn.svg";
import CustomMarkdownEditor from "../../../../../../../Components/Custom/CustomMarkdownEditor";
import { renderNewIcon } from "../../../../../../../helper/IconRenderer";
import SubTechniquesBox from "./SubTechniquesBox";

const TechniqueBox = ({ usage, isSelected, onFormValueChange, data, formik, entities }) => {
    const [subTech, setSubTech] = useState(false);
    const [selected, setSelected] = useState(isSelected); // State to manage selection
    const [openDialog, setOpenDialog] = useState(false);
    const [textEdiorValue, setTextEditorValue] = useState(usage || "");
    const [textEdiorValueError, setTextEditorValueError] = useState(false);
    const { sub_techniques: subTechniques, name, id } = data;

    const handleClickDialog = () => {
        setOpenDialog(!openDialog);
    };

    const openSubTech = (e) => {
        setSubTech(!subTech);
    };

    const handleSelection = ({ usage, selectedData, setData }) => {
        const updatedTechniques = [...formik.values.techniques];
        const index = updatedTechniques.findIndex((technique) => technique?.id === selectedData?.id);
        if (index === -1) {
            updatedTechniques.push({
                id: selectedData?.id,
                name: selectedData?.name,
                usage: [{ name: selectedData?.name, usage }],
                sub_techniques: [],
                entities: [],
            });
        } else {
            updatedTechniques[index] = {
                ...updatedTechniques[index],
                usage: [{ name: selectedData?.name, usage }],
            };
        }
        onFormValueChange("techniques", updatedTechniques, formik);
        setData(true);
    };

    const handleDeSelection = ({ selectedData, setData }) => {
        let updatedTechniques = [...formik.values.techniques];
        const isAvailable = updatedTechniques.some((technique) => technique?.id === selectedData?.id);
        if (isAvailable) {
            updatedTechniques = formik.values?.techniques.filter(
                (technique) => technique?.id !== selectedData?.id
            );
            onFormValueChange("techniques", updatedTechniques, formik);
            setData(false);
        }
    };

    const borderClass = subTechniques?.length > 0;


    return (
        <>
            <div
                className={`intel-technique-container ${
                    selected ? (subTech ? "" : "intel-technique-container-selected") : ""
                }`}
            >
                <div
                    className={`intel-technique-name-img ${
                        selected ? (subTech ? "intel-technique-container-selected-open" : "") : ""
                    }`}
                >
                    <div style={{ cursor: "pointer" }} onClick={handleClickDialog}>{`${id} - ${name}`}</div>
                    <div
                        className={borderClass ? "intel-dialpad-svg" : "intel-dialpad-close-svg"}
                        style={{ borderColor: `${selected ? "#fff" : ""}` }}
                        onClick={(e) => openSubTech(e)}
                    >
                        {subTech && borderClass ? <DialpadOff /> : <DialpadOn />}
                    </div>
                </div>
                <div className="render-new-icon-box">
                    {entities && entities?.length > 0
                        ? entities?.map((icon, index) => <span key={index}>{renderNewIcon(icon?.type)}</span>)
                        : ""}
                </div>
                {subTech && subTechniques && subTechniques.length > 0 ? (
                    <div>
                        <Divider
                            orientation="horizontal"
                            sx={{ height: "100%", background: "rgba(255, 255, 255, 0.24)" }}
                        />

                        {subTech && subTechniques && subTechniques.length > 0 ? (
                            <div className="main-box-subtech">
                                <Divider
                                    orientation="horizontal"
                                    sx={{
                                        height: "100%",
                                        background: "rgba(255, 255, 255, 0.24)",
                                    }}
                                />

                                {subTechniques.map((child, childIndex) => {
                                    const updatedTechniques = [...formik.values.techniques];

                                    const isTechniqueFound = updatedTechniques.find(
                                        (technique) => technique?.id === child?.id
                                    );
                                    const usage =
                                        isTechniqueFound &&
                                        isTechniqueFound?.usage &&
                                        isTechniqueFound?.usage.length > 0
                                            ? isTechniqueFound?.usage[0]?.usage
                                            : "";

                                    const isSubTechniqueSelected = isTechniqueFound ? true : false;
                                    return (
                                        <SubTechniquesBox
                                            isSelected={isSubTechniqueSelected}
                                            data={child}
                                            key={childIndex}
                                            handleSelection={handleSelection}
                                            handleDeSelection={handleDeSelection}
                                            onFormValueChange={onFormValueChange}
                                            usage={usage}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
            <Dialog
                open={openDialog}
                onClose={handleClickDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiPaper-root": {
                        background: "#112038 !important",
                        color: "#fff !important",
                        padding: "0.5rem 0.5rem !important",
                        width: "100%",
                    },
                    "& .MuiTypography-root": {
                        color: "#fff !important",
                    },
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "1rem" }}>{`${id} - ${name}`}</span>
                        <span style={{ color: "#8E97A4", fontSize: "0.75rem" }}>
                            Provide details of the usage of this Technique
                        </span>
                    </Box>
                    <CloseOutlinedIcon
                        onClick={handleClickDialog}
                        sx={{ cursor: "pointer", fill: "#8E97A4" }}
                    />
                </DialogTitle>
                <Divider
                    sx={{
                        background: "#2A3C57",
                        margin: "0.5rem 0rem",
                        borderWidth: "1px",
                    }}
                />
                <DialogContent>
                    <CustomMarkdownEditor
                        defaultValue={textEdiorValue}
                        onChange={(value) => {
                            setTextEditorValue(value);
                            if (value) {
                                setTextEditorValueError(false);
                            } else {
                                setTextEditorValueError(true);
                            }
                        }}
                        height="20rem"
                        placeholder="Write description here..."
                    />
                    {Boolean(textEdiorValueError) ? (
                        <FormHelperText error>*Usage is required</FormHelperText>
                    ) : (
                        ""
                    )}
                </DialogContent>
                <DialogActions>
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            "& .Mui-disabled": {
                                color: "rgba(142, 151, 164, 1)",
                            },
                            "& .MuiButtonBase-root": {
                                background: "#FFFFFF14",
                            },
                        }}
                    >
                        <Button
                            disabled={selected ? false : true}
                            onClick={() => {
                                handleDeSelection({ selectedData: data, setData: setSelected });
                                handleClickDialog();
                                setTextEditorValue("");
                            }}
                            variant="contained"
                        >
                            Unselect
                        </Button>
                        <Button
                            disabled={!Boolean(textEdiorValue)}
                            variant="contained"
                            onClick={() => {
                                handleSelection({
                                    usage: textEdiorValue,
                                    selectedData: data,
                                    setData: setSelected,
                                });
                                handleClickDialog();
                            }}
                        >
                            Done
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TechniqueBox;
