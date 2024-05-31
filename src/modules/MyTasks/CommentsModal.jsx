import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CustomMarkdownPreview from "../../Components/Custom/CustomMarkdownPreview";
import NoDataFound from "../../Pages/NoDataFound";
import moment from "moment";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "rgba(17, 32, 56, 1)",
    color: "white",
    p: 3.2,
    borderRadius: "0.6rem",
    "&:focus-visible": {
        outline: "none !important",
    },
};

const CommentsModal = ({ handleModal, data }) => {
    return (
        <Modal
            // sx={{ border: "1px solid red", borderRadius: "1rem" }}
            keepMounted
            open={handleModal}
            onClose={handleModal}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        "&:focus-visible": {
                            outline: "none",
                        },
                    }}
                >
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Comments
                    </Typography>
                    <Box className="cross-btn">
                        <CloseOutlinedIcon
                            sx={{ fill: "rgba(142, 151, 164, 1)", cursor: "pointer" }}
                            onClick={handleModal}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        background: "#08172F",
                        borderColor: "#1E2B40",
                        padding: "0.7rem",
                        marginTop: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    }}
                >
                    {data && data.length > 0 ? (
                        data.map((item, index) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem",
                                    }}
                                    className="comment-box"
                                >
                                    <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                        <span>{item?.username}</span>
                                        <span style={{ fontSize: "0.7rem", color: "#ffffff60" }}>
                                            {moment(item?.commentedOn).format("DD-MM-YY hh:mm A")}
                                        </span>
                                    </Box>
                                    <Box>
                                        {item?.comment ? (
                                            <CustomMarkdownPreview
                                                className="comment-box"
                                                source={item?.comment}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </Box>
                                </Box>
                            );
                        })
                    ) : (
                        <NoDataFound />
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default CommentsModal;
