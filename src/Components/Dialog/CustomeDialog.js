import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const CustomDialog = ({ children, DialogAction, Content, title, style, ...props }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <div onClick={handleOpen} style={{ gridColumn: "span 2", ...style }}>
                {children}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                {Content && <DialogContent>{<Content />}</DialogContent>}
                {DialogAction && <DialogActions onClick={handleClose}>{<DialogAction />}</DialogActions>}
            </Dialog>
        </>
    );
};

export default CustomDialog;
