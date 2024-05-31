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
import CustomMarkdownEditor from "../../../../../../../Components/Custom/CustomMarkdownEditor";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const SubTechniquesBox = ({ data, usage, handleSelection, handleDeSelection, isSelected }) => {
    const { name, id } = data;
    const [textEdiorValue, setTextEditorValue] = useState(usage || "");
    const [selectedSubTech, setSelectedSubTech] = useState(isSelected);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickDialog = () => {
        setOpenDialog(!openDialog);
    };

    return (
        <>
            <div
                onClick={handleClickDialog}
                className={selectedSubTech ? "intel-mtr-subtech-name-isUsed" : "intel-mtr-subtech-name"}
            >
                <div>{data.id + "-" + data.name}</div>
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
                        }}
                        height="20rem"
                        placeholder="Write description here..."
                    />
                    {!Boolean(textEdiorValue) ? (
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
                            disabled={isSelected ? false : true}
                            onClick={() => {
                                handleDeSelection({ selectedData: data, setData: setSelectedSubTech });
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
                                    setData: setSelectedSubTech,
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

export default SubTechniquesBox;
