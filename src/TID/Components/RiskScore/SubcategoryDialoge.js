import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

const SubcategoryDialoge = ({ children, data }) => {
    const [open, setOpen] = useState(false);

    const riskScoreData = useSelector((state) => state.TIDEntity.riskScoreData);

    const handleOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div onClick={handleOpen}>{children}</div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                maxWidth={"md"}
            >
                <DialogTitle
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span style={{ color: "var(--name-email)" }}>Controls part of {data.id}</span>
                    <AiOutlineClose
                        className="TID-dialouge-close-icon"
                        id="TID-dialouge-close-icon-SIGMA"
                        color="var(--name-email)"
                        onClick={handleClose}
                    />
                </DialogTitle>
                <DialogContent>
                    <div>
                        <table className="colorControlTable">
                            <thead>
                                <tr className="colorControlTableRow">
                                    <th>Control Id</th>
                                    <th>Control Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.control_color &&
                                    data.control_color.length > 0 &&
                                    data.control_color.map((item) => {
                                        return (
                                            <tr className="colorControlTableRow">
                                                <td>{item?.control?.id}</td>
                                                <td>{item?.control?.name}</td>
                                                <td style={{ background: item?.color, color: "#000" }}>
                                                    {riskScoreData?.color_to_status_map[item?.color]}{" "}
                                                    {/* {item?.color} */}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SubcategoryDialoge;
