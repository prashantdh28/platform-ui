import { FormHelperText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import {
//     HtmlEditor,
//     Image,
//     Inject,
//     Link,
//     QuickToolbar,
//     RichTextEditorComponent,
//     Toolbar,
// } from "@syncfusion/ej2-react-richtexteditor";
import DynamicButton from "../../../../Components/Button/ButtonBox";
import CustomRichTextEditor from "../../../../Components/Markdown/CustomRichTextEditor";
const toolbarSettings = {
    items: [
        "Undo",
        "Redo",
        "Formats",
        "Alignments",
        "Bold",
        "Italic",
        "Underline",
        "StrikeThrough",
        "InsertCode",
        "OrderedList",
        "UnorderedList",
        "|",
        "Outdent",
        "Indent",
        "|",
        "CreateLink",
        "SourceCode",
        "|",
    ],
};
const SubTechniqueBoxDialog = ({
    children,
    data,
    handleSelection,
    handleDeSelection,
    usage,
    selected,
    setSelected,
}) => {
    const [textEdiorValue, setTextEditorValue] = useState(usage || "");
    const [open, setOpen] = useState(false);

    const { name, id } = data;

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <div onClick={handleOpen}>{children}</div>
            <Dialog
                maxWidth="md"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="header">
                    <div className="header_title">
                        <span>{`${id} - ${name}`}</span>
                        <span className="close_icon">
                            <AiOutlineClose onClick={handleClose} style={{ cursor: "pointer" }} />
                        </span>
                    </div>
                    <p style={{ fontSize: "medium", fontWeight: "initial" }}>
                        Provide details of the usage of this Technique
                    </p>
                </DialogTitle>
                <DialogContent className="">
                    <div
                        style={{
                            height: "20rem",
                            width: "50rem",
                            border: "1px solid var(--border-color",
                        }}
                        id="DC_text_editor"
                    >
                        <CustomRichTextEditor
                            className="text-editor"
                            name="usage"
                            toolbarSettings={toolbarSettings}
                            width="50rem"
                            height={300}
                            saveInterval={500}
                            value={textEdiorValue}
                            change={(e) => {
                                let value = e.value || " ";
                                if (e.value) {
                                    value = e.value.replace(/<p>/g, "").replace(/<\/p>/g, "");
                                }
                                setTextEditorValue(value);
                            }}
                        />
                        {/* <RichTextEditorComponent
              className="text-editor"
              name="usage"
              toolbarSettings={toolbarSettings}
              width="50rem"
              height={300}
              saveInterval={500}
              value={textEdiorValue}
              change={(e) => {
                setTextEditorValue(e.value);
              }}
            >
              <Inject
                services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]}
              />
            </RichTextEditorComponent> */}
                        {!Boolean(textEdiorValue) ? (
                            <FormHelperText error>Usage is required</FormHelperText>
                        ) : (
                            ""
                        )}
                    </div>
                </DialogContent>
                <div className="DC_Btn_section">
                    <div>
                        <button
                            type="button"
                            disabled={selected ? false : true}
                            style={{ cursor: `${selected ? "pointer" : "not-allowed"}` }}
                            className="DC_backBtn"
                            onClick={() => {
                                handleDeSelection({ selectedData: data, setData: setSelected });
                                handleClose();
                                setTextEditorValue("");
                            }}
                        >
                            Unselect
                        </button>
                    </div>

                    <DynamicButton
                        label="SELECT"
                        isDisabled={!Boolean(textEdiorValue)}
                        onClick={() => {
                            handleSelection({
                                usage: textEdiorValue,
                                selectedData: data,
                                setData: setSelected,
                            });
                            handleClose();
                        }}
                    />
                </div>
                <DialogActions onClick={handleClose}></DialogActions>
            </Dialog>
        </>
    );
};

export default SubTechniqueBoxDialog;
