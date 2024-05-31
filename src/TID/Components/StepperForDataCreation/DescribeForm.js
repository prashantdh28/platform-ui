import React, { useState } from "react";
// import "./stepper.css";
import { FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../../../../src/TID/Components/TIDTables/CoaTable/TableModals/RichTextModal.css";
import DynamicButton from "../../../Components/Button/ButtonBox";
import InputChips from "../../../Components/Chips/InputChips/InputChips";
import CustomSwitch from "../../../Components/Custom/CustomSwitch";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import CustomRichTextEditor from "../../../Components/Markdown/CustomRichTextEditor";
import { ALLIESES } from "../../../Constants/ValidEnttyTypesConstant";
import { getEntitiesByName } from "../../../Services/TID/dataCreation.service";
import FieldByType from "./DetailsForm/FieldByType";
import "./StepperForDC.css";

const DescribeForm = ({ onFormValueChange, formik, setIsError, selectedEntity, id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newChipInput, setNewChipInput] = useState("");
    const [foundElement, setFoundElement] = useState(null);
    const [open, setOpen] = useState(false);
    const [chipsData, setChipsData] = useState(formik.values.aliases || []);

    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    const handleAddChips = (event) => {
        event.preventDefault(); // Prevent form submission
        const newValues = newChipInput
            .split(",") // Split input value by comma
            .map((value) => ({ name: value.trim() })) // Convert each value to object with "name" key
            .filter((obj) => obj.name !== ""); // Remove objects with empty "name" values

        if (newValues.length > 0) {
            // Filter out duplicates from newValues
            const uniqueNewValues = newValues.filter(
                (value, index, self) => index === self.findIndex((t) => t.name === value.name)
            );

            // Combine existing values and unique new values
            const updatedChipsData = [...chipsData, ...uniqueNewValues];

            onFormValueChange("aliases", updatedChipsData, formik);
            setChipsData(updatedChipsData); // Update chipsData with new values
            setNewChipInput(""); // Clear input
        }
    };

    const handleChipInputKeyDown = (event) => {
        if (event.key === "Enter" && newChipInput.trim() !== "") {
            handleAddChips(event);
        }
    };

    const handleDeleteChip = (value) => {
        const updatedChipsData = chipsData.filter((item) => item?.name !== value);
        onFormValueChange("aliases", updatedChipsData, formik);
        setChipsData(updatedChipsData);
    };

    const checkName = async (name) => {
        try {
            const response = await dispatch(getEntitiesByName({ name })).unwrap();
            if (response?.totalElements !== 0) {
                const searchLower = name.toLowerCase();
                let foundedElement = null;
                for (let i = 0; i < response.content.length; i++) {
                    const element = response.content[i];
                    if ("name" in element) {
                        const elementLower = element["name"].toLowerCase();
                        if (elementLower === searchLower) {
                            foundedElement = element;
                            break;
                        } else if (element["aliases"] && element["aliases"].length > 0) {
                            for (let j = 0; j < element["aliases"].length; j++) {
                                const aliasElement = element["aliases"][j];
                                if ("name" in aliasElement) {
                                    const elementLower = aliasElement["name"].toLowerCase();
                                    if (elementLower === searchLower) {
                                        foundedElement = element;
                                        break;
                                    }
                                }
                            }
                        } else {
                            foundedElement = null;
                        }
                    }
                }
                if (foundedElement) {
                    setFoundElement(foundedElement);
                    return foundedElement;
                }
                return foundedElement;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error checking name:", error);
        }
        return "";
    };

    const onNameChange = async (e) => {
        const newName = e.target.value;
        onFormValueChange("name", newName, formik);
    };

    const onNameBlur = async (e) => {
        const newName = e.target.value;
        e.preventDefault();
        if (newName) {
            const isFound = await checkName(newName);
            if (isFound) {
                setOpen(true);
                formik.setFieldError("name", "Name is already exists, Try with another name instead");
                formik.setFieldTouched("name", true, false);
                setIsError(true);
            } else {
                setIsError(false);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <div className="responsive-align">
                    <div className="responsive-form">
                        <div className="input-group">
                            {/* <label className="">
                            Name <span>*</span>
                        </label> */}
                            <CustomTextField
                                // className="e-input from-input input-border"
                                disabled={Boolean(id)}
                                label="Name"
                                style={{
                                    width: "100%",
                                }}
                                sx={{
                                    "& .MuiInput-root::after": {
                                        borderBottom: "2px solid var(--comment-border-bottom) !important",
                                    },
                                    "& .MuiInput-root::before": {
                                        borderBottom: "1px solid var(--comment-border-bottom) !important",
                                    },
                                }}
                                variant="standard"
                                type="text"
                                name="name"
                                id="name"
                                value={formik.values.name}
                                onChange={onNameChange}
                                onBlur={onNameBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </div>

                        <div
                            style={{
                                height: "20rem",
                                border: "1px solid var(--comment-border-bottom)",
                            }}
                            id="DC_text_editor"
                        >
                            <CustomRichTextEditor
                                className="text-editor"
                                name="description"
                                // toolbarSettings={toolbarSettings}
                                width="100%"
                                height={300}
                                saveInterval={1}
                                value={formik.values.description}
                                // value={formik.values.description}
                                change={(e) => {
                                    let value = e.value || " ";
                                    if (e.value) {
                                        value = e.value.replace(/<p>/g, "").replace(/<\/p>/g, "");
                                    }

                                    onFormValueChange("description", value, formik);
                                }}
                            />
                            {/* <RichTextEditorComponent
                                className="text-editor"
                                name="description"
                                toolbarSettings={toolbarSettings}
                                width="100%"
                                height={300}
                                saveInterval={500}
                                value={formik.values.description}
                                change={(e) => onFormValueChange("description", e.value, formik)}
                            >
                                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                            </RichTextEditorComponent> */}
                        </div>
                        {formik.touched.description && Boolean(formik.errors.description) ? (
                            <FormHelperText error>
                                {formik.touched.description && formik.errors.description}
                            </FormHelperText>
                        ) : (
                            ""
                        )}
                        <FieldByType validTypes={ALLIESES} type={selectedEntity?.type}>
                            <div className="input-group">
                                <label className="">Alliases</label>
                                <div style={{ marginLeft: "-1rem" }}>
                                    {chipsData?.length > 0 && (
                                        <InputChips
                                            dialogNeeded={false}
                                            chipsData={chipsData?.map((data, index) => {
                                                return {
                                                    name: data?.name,
                                                    value: index,
                                                    color: "var(--button-tag-color)",
                                                };
                                            })}
                                            onDelete={(value) => handleDeleteChip(value)}
                                            deleteEnable="true"
                                        />
                                    )}
                                </div>
                            </div>
                        </FieldByType>
                        <FieldByType validTypes={ALLIESES} type={selectedEntity?.type}>
                            <div className="input-group">
                                <label className="">Alliases Name</label>
                                <span style={{ display: "flex", gap: "1rem" }}>
                                    <CustomTextField
                                        style={{
                                            width: "90%",
                                            borderBottom: "1px solid var(--border-color)",
                                        }}
                                        variant="standard"
                                        type="text"
                                        name="ExternalReference"
                                        value={newChipInput}
                                        onChange={(e) => setNewChipInput(e.target.value)}
                                        sx={{
                                            "& .MuiInput-root::after": {
                                                borderBottom:
                                                    "2px solid var(--comment-border-bottom) !important",
                                            },
                                            "& .MuiInput-root::before": {
                                                borderBottom:
                                                    "1px solid var(--comment-border-bottom) !important",
                                            },
                                        }}
                                        onKeyDown={handleChipInputKeyDown}
                                        placeholder="Add alliases with postfix of comma','   i.e (alliases1,alliases) "
                                    />
                                    <button className="DC_addBtn" onClick={handleAddChips}>
                                        <span className="DC_plus">+</span> ADD
                                    </button>
                                </span>
                            </div>
                        </FieldByType>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h5>Is Publicity Available :</h5>
                            <span>
                                <CustomSwitch
                                    color="primary"
                                    inputProps={{ "aria-label": "controlled" }}
                                    name="isPublicityAvailable"
                                    checked={formik.values.open_source}
                                    onChange={formik.handleChange}
                                    sx={{
                                        "& .MuiSwitch-track": {
                                            background: "var(--name-email)",
                                        },
                                    }}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "var(--container-bg-color)",
                        color: "var(--name-email)",
                        boxShadow: 24,
                        border: "none",
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                    }}
                >
                    <AiOutlineClose style={{ cursor: "pointer" }} onClick={handleClose} />
                    <p id="parent-modal-description">
                        We found one or more entities with the name or alliases:{" "}
                        <span
                            style={{
                                cursor: "pointer",
                                color: BackgroundColor,
                                textDecoration: "underline",
                            }}
                            onClick={() => {
                                navigate(`/tid/${foundElement?.id}`);
                            }}
                            // onClick={handleTitleClick}
                        >
                            {foundElement ? foundElement?.name : ""}
                        </span>
                    </p>
                    <p>We suggest you make changes to an existing entity instead of creating a new one.</p>
                    <DynamicButton label="Ok" style={{ colo: "" }} onClick={handleClose} />
                </Box>
            </Modal>
        </>
    );
};

export default DescribeForm;
