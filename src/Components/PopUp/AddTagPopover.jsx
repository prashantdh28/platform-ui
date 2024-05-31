import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import CustomChip from "../Custom/CustomChip";
import CustomTextField from "../Custom/CustomTextField";
import { getTagsbyEntityId, onEntityTagAdd, onEntityTagDelete } from "../../Services/TID/tid.service";
import useToastify from "../../Hooks/useToastify";

const AddTagPopover = ({ title, chipsData, threatData, setChipsData }) => {
    const dispatch = useDispatch();
    const { showToast } = useToastify();

    const [anchorEl, setAnchorEl] = useState(null);
    const [tagName, setTagName] = useState("");

    const onTagChange = useCallback((e) => {
        setTagName(e.target.value);
    }, []);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const onTagAdd = useCallback(async () => {
        if (tagName) {
            const isExist =
                chipsData && chipsData.length > 0 && chipsData.some((tag) => tag?.name === tagName);
            if (!isExist) {
                const response = await dispatch(
                    onEntityTagAdd({
                        requestObject: {
                            entity_type: threatData?.type,
                            entity_id: threatData?.id,
                            name: tagName,
                        },
                    })
                ).unwrap();
                if (response === "OK") {
                    const response = await dispatch(getTagsbyEntityId(threatData?.id)).unwrap();
                    setChipsData(response);
                    setTagName("");
                    showToast("Tag has been added successfully.", {
                        type: "success",
                    });
                }
            } else {
                showToast("This name already exists. Please try another name.", {
                    type: "warning",
                });
            }
        }
    }, [showToast, setChipsData, dispatch, tagName, chipsData, threatData]);

    const onDeleteTag = useCallback(
        async ({ label: tagName }) => {
            if (tagName) {
                const response = await dispatch(
                    onEntityTagDelete({
                        requestObject: {
                            entity_type: threatData?.type,
                            entity_id: threatData?.id,
                            name: tagName,
                        },
                    })
                ).unwrap();
                if (response === "OK") {
                    const response = await dispatch(getTagsbyEntityId(threatData?.id)).unwrap();
                    // dispatch(updateActorData({ id: actorId, tags: response }));
                    setChipsData(response);
                    showToast("Tag has been deleted successfully.", {
                        type: "success",
                    });
                }
            }
        },
        [showToast, dispatch, threatData, setChipsData]
    );

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <>
            {chipsData &&
                chipsData.length > 0 &&
                chipsData.slice(0, 3).map((item, index) => {
                    return (
                        <CustomChip
                            key={index}
                            data={{ label: item?.name }}
                            borderstyle="#FFFFFF3D"
                            color="#FFFFFF"
                        />
                    );
                })}

            <Button
                variant="contained"
                sx={{
                    padding: "0.313rem",
                    margin: "0.5rem",
                    // marginRight: "0.5rem",
                    borderRadius: "0.25rem !important",
                    border: "2px solid #0082F9",
                    background: "#FFFFFF14",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                }}
                size="small"
                onClick={handleClick}
            >
                {chipsData && chipsData.length > 3 ? (
                    <>
                        {"+"}
                        {chipsData.length - 3}
                    </>
                ) : (
                    <AddOutlinedIcon sx={{ fill: "#fff", fontSize: "1.1rem" }} />
                )}
            </Button>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                disablePortal={false}
                sx={{}}
            >
                <Box
                    sx={{
                        width: "19.25rem",
                        height: "17.75rem",
                        borderRadius: "0.375rem 0px 0px 0px",
                        border: "1px solid #1E2B40",
                        background: "#112038",
                        boxShadow: "3px 4px 18px 2px #0A081178",
                        padding: "1rem",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "space-between",
                            fontSize: "0.75rem",
                            fontWeight: "500",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontSize: "0.875rem", fontWeight: "500" }}
                            color="#fff"
                        >
                            {title ? title : ""}
                            <span style={{ color: "#8E97A4" }}>
                                {chipsData?.length ? ` (${chipsData?.length})` : ""}
                            </span>
                        </Typography>

                        <CloseOutlinedIcon
                            onClick={handleClick}
                            sx={{ cursor: "pointer", fill: "#8E97A4" }}
                        />
                    </div>
                    <Divider
                        sx={{
                            background: "#1E2B40",
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                            borderWidth: "1px",
                        }}
                    />
                    <Box
                        sx={{
                            overflow: "auto",
                            height: "75%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CustomTextField
                            styleSx={{
                                border: "1px solid #1E2B40",
                                width: "99%",
                                color: "white",
                                borderRadius: "6px",
                                height: "2rem",
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalOfferOutlinedIcon sx={{ fill: "#8E97A4", fontSize: "1rem" }} />
                                    </InputAdornment>
                                ),
                            }}
                            value={tagName}
                            onChange={onTagChange}
                            placeholder="Add a new tag"
                        />
                        <Box>
                            {chipsData && chipsData.length > 0
                                ? chipsData.map((chip, index) => {
                                      return (
                                          <CustomChip
                                              isDeletable
                                              key={index}
                                              onDelete={onDeleteTag}
                                              data={{ label: chip?.name }}
                                              borderstyle="#FFFFFF3D"
                                              color="#FFFFFF"
                                          />
                                      );
                                  })
                                : ""}
                        </Box>
                        <Box sx={{ position: "absolute", bottom: "0.8rem", right: "0.8rem" }}>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: "0.375rem", height: "1.75rem", width: "5.188rem" }}
                                onClick={onTagAdd}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Popper>
        </>
    );
};

export default AddTagPopover;
