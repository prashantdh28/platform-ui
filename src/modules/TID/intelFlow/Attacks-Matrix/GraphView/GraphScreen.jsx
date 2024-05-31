import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ReactComponent as MatrixViewIcon } from "../../../../../Assests/SVG/MatrixViewIcon.svg";
import { ReactComponent as NextIcon } from "../../../../../Assests/SVG/addIcon.svg";
import CustomAutocomplete from "../../../../../Components/Custom/CustomAutocomplete";
import RadialTree from "./RadialTree";
import { useDebounce } from "../../../../../Hooks/useDebouncedValue";
import { getEntitiesByName } from "../../../../../Services/TID/dataCreation.service";
import { setEntityIDs } from "../../../../../redux/Slice/TID/EntitySlice";
import useToastify from "../../../../../Hooks/useToastify";
import CustomMarkdownTag from "../../../../../Components/Markdown/CustomMarkDown";
import "./../../intelFlow.css";
import DeleteEntityPopup from "./DeleteEntityPopup";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 330,
    bgcolor: "rgba(17, 32, 56, 1)",
    borderRadius: "0.7rem !important",
    color: "white",
    p: 4,
};
const styleForUsage = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 530,
    bgcolor: "rgba(17, 32, 56, 1)",
    borderRadius: "0.7rem !important",
    color: "white",
    p: 3.3,
    "&:focus-visible": {
        outline: "none !important",
    },
};
// const entities1 = [1, 2, 3]
const GraphScreen = ({ onButtonClick, onDeleteTag, entityValue, setEntityValue }) => {
    const { attackMatrixGraphData } = useSelector((state) => state.attackMatrix);
    const { top_techniques = [], entities = [] } = attackMatrixGraphData;
    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showToast } = useToastify();
    const [open, setOpen] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [openUsage, setOpenUsage] = useState(false);
    const [topTechniqueList, setTopTechniqueList] = useState([]);
    const [entityName, setEntityName] = useState([]);
    const [nameForDelete, setNameForDelete] = useState();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event, name) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setNameForDelete(name);
    };
    const openD = Boolean(anchorEl);
    const id = openD ? "delete-entity-popover" : undefined;

    const handleOpen = () => {
        setEntityValue(entityIDs);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenUsage = (tech) => {
        setTopTechniqueList(tech);
        setOpenUsage(true);
    };
    const handleCloseUsage = () => {
        setOpenUsage(false);
    };

    const handleOpenDeletePopup = (name) => {
        setNameForDelete(name);
        setOpenDeletePopup(!openDeletePopup);
    };
    const handleCloseDeletePopup = () => {
        setOpenDeletePopup(!openDeletePopup);
    };
    const addEntityOnChange = useDebounce(async (event) => {
        event.preventDefault();
        const name = event.target.value;
        if (name) {
            const response = await dispatch(getEntitiesByName({ name })).unwrap();
            setEntityName(response?.content);
        } else {
            setEntityName([]);
        }
    }, 1000);

    const onEntityAdd = () => {
        if (entityIDs.length < 6) {
            const newEntity = entityValue.map((value, index) => {
                return { id: value.id, name: value.name };
            });

            // Ensure uniqueness
            //   const uniqueNewEntity = newEntity.filter(
            //     (item) => !entityIDs.some((existingItem) => existingItem.id === item.id)
            //   );

            // Check if the length of entityIDs combined with newEntity does not exceed 6
            if (newEntity.length < 6) {
                dispatch(setEntityIDs([...newEntity]));
                showToast("Entities have been added successfully.", {
                    type: "success",
                });
            } else {
                showToast("You cannot select more than 5 entities.", {
                    type: "error",
                });
            }
        }
        handleClose();
    };

    return (
        <div className="mtr-graph-container">
            <div className="mtr-graph">
                <div>
                    <div className="search-mtr-iconbox">
                        <div></div>
                        <div className="mattrix-veiw-icon" onClick={() => onButtonClick("attack")}>
                            <MatrixViewIcon />
                        </div>
                    </div>
                    <div>
                        <RadialTree />
                    </div>
                </div>
            </div>
            <div className="mtr-remediation-container">
                <div
                    className="mtr-graph-remediation-box"
                    onClick={() => navigate("/intel-flow/remediations")}
                >
                    <div className="remediation-text-icon">
                        <NextIcon />
                        Remediations
                    </div>
                    <div className="vector-ellipse-remediations" />
                </div>

                <div className="mtr-graph-entity-box">
                    <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                        Top ATT&CK Techniques
                    </Typography>
                    <Divider sx={{ background: "rgba(30, 43, 64, 1)" }} />

                    {top_techniques &&
                        top_techniques.map((tech, index) => {
                            return (
                                <div
                                    className="graph-entity-card"
                                    key={index}
                                    onClick={() => handleOpenUsage(tech)}
                                >
                                    <div>
                                        <Typography>
                                            {tech?.id} - {tech?.name}{" "}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "rgba(142, 151, 164, 1)",
                                                fontWeight: "500",
                                            }}
                                        >
                                            Exploited by {tech?.usage?.length} Threats
                                        </Typography>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {/* Popup Model for top technique usage */}

                <Modal
                    //   sx={{ border: "1px solid red", borderRadius: "1rem" }}
                    keepMounted
                    open={openUsage}
                    onClose={handleCloseUsage}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={styleForUsage}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderRadius: "0.6rem",
                                "&:focus-visible": {
                                    outline: "none !important",
                                    border: "1px solid transperent",
                                },
                            }}
                        >
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                {topTechniqueList?.id} - {topTechniqueList?.name}
                            </Typography>
                            <Box className="cross-btn" onClick={handleCloseUsage}>
                                <CloseOutlinedIcon sx={{ fill: "rgba(142, 151, 164, 1)" }} />
                            </Box>
                        </Box>

                        <Typography sx={{ mt: 2, color: "rgba(142, 151, 164, 1)" }}>Usage</Typography>
                        <div className="ingraph-usage-desc-for-chokebox">
                            {topTechniqueList?.usage?.map((use, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            style={{
                                                fontWeight: "700",
                                                fontSize: "1rem",
                                                marginBottom: "0.1rem",
                                            }}
                                        >
                                            {use.name}:{" "}
                                        </div>
                                        <CustomMarkdownTag
                                            expanded={true}
                                            colorForMarkDown={true}
                                            content={use?.usage}
                                            customClassNames="mark-down-style"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Box>
                </Modal>

                {/* Entities Container */}
                <div className="mtr-graph-entity-box">
                    {entities &&
                        entities.map((ent, index) => {
                            return (
                                <div className="graph-entity-card" key={index}>
                                    <div>
                                        <Typography>{ent?.name}</Typography>
                                        <Typography
                                            sx={{
                                                color: "rgba(142, 151, 164, 1)",
                                                fontWeight: "500",
                                            }}
                                        >
                                            Techniques :{" "}
                                            <span className="num-of-tech">{ent?.techniques_count}</span>
                                        </Typography>
                                    </div>
                                    {entities.length > 1 ? (
                                        <div
                                            aria-describedby={id}
                                            style={{ cursor: "pointer" }}
                                            // onClick={() => {
                                            //   // handleOpenDeletePopup(ent?.name);
                                            //   handleClick();
                                            // }}
                                            onClick={(event) => handleClick(event, ent?.name)}
                                            // onDeleteTag({ label: ent?.name });
                                        >
                                            <CancelOutlinedIcon sx={{ color: "rgba(142, 151, 164, 1)" }} />
                                            <DeleteEntityPopup
                                                name={nameForDelete}
                                                openDeletePopup={openDeletePopup}
                                                handleCloseDeletePopup={handleCloseDeletePopup}
                                                handleOpenDeletePopup={handleOpenDeletePopup}
                                                id={id}
                                                handleClick={handleClick}
                                                anchorEl={anchorEl}
                                                setAnchorEl={setAnchorEl}
                                                openD={openD}
                                                onDeleteTag={() => onDeleteTag({ label: nameForDelete })}
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            );
                        })}

                    {entities.length < 5 ? (
                        <div className="graph-add-entity-card" onClick={handleOpen}>
                            <div>
                                <AddCircleOutlineOutlinedIcon sx={{ color: "rgba(142, 151, 164, 1)" }} />
                            </div>
                            <div>
                                <Typography sx={{ color: "rgba(142, 151, 164, 1)", fontWeight: "500" }}>
                                    Add entity
                                </Typography>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                    // sx={{ position: "fixed", top: "40%", left: "40%", border: "none" }}
                >
                    <Box
                        style={style}
                        sx={{
                            width: "19.25rem",
                            borderRadius: "0.6rem",
                            border: "1px solid #1E2B40",
                            background: "#112038",
                            boxShadow: "3px 4px 18px 2px #0A081178",
                            padding: "1rem",
                            "&:focus-visible": {
                                outline: "none",
                            },
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
                                {/* {title ? title : ""} */}
                                <span style={{ color: "white" }}>
                                    Add Entity
                                    {/* {chipsData?.length ? ` (${chipsData?.length})` : ""} */}
                                </span>
                            </Typography>

                            <CloseOutlinedIcon
                                onClick={handleClose}
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
                            <div style={{ marginTop: "0.5rem" }}>
                                <CustomAutocomplete
                                    placeholder="Add Entity"
                                    multiple
                                    options={entityName}
                                    getOptionLabel={(option) => option?.name}
                                    // isOptionEqualToValue={(option, value) => option?.name === value?.name}
                                    value={entityValue}
                                    includeInputInList
                                    filterSelectedOptions
                                    filterOptions={(x) => x}
                                    isOptionEqualToValue={(option, value) => {
                                        return option?.name === value?.name;
                                    }}
                                    optionLable="name"
                                    renderOption={(props, option) => {
                                        if (
                                            entityName &&
                                            entityName.length > 0 &&
                                            entityName.find((item) => item?.name === option?.name)
                                        ) {
                                            return (
                                                <li {...props} style={{ background: "#1E2B40" }}>
                                                    {option.name}
                                                </li>
                                            );
                                        }
                                        return <li {...props}>{option.title}</li>;
                                    }}
                                    // isOptionEqualToValue={(option, value) => option?.name === value?.name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Add Entity"
                                            sx={{
                                                height: "inherit",
                                            }}
                                            onChange={addEntityOnChange}
                                        />
                                    )}
                                    onChange={(event, newValue) => {
                                        // event.preventDefault();
                                        setEntityValue(newValue);
                                        setEntityName([]);
                                    }}
                                />
                            </div>
                            <Box sx={{ marginLeft: "auto", marginTop: "1rem", color: "red" }}>
                                <Button
                                    disabled={entityValue?.length > 5 || entityValue?.length === 0}
                                    variant="contained"
                                    sx={{
                                        borderRadius: "0.375rem",
                                        height: "1.75rem",
                                        width: "5.188rem",
                                    }}
                                    onClick={onEntityAdd}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default GraphScreen;
