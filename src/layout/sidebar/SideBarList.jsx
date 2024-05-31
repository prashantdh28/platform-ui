import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { sideBarListColor } from "../../Constants/Constant";
import { sideBarList } from "../../Constants/sideBarListConstant";
import CustomTooltip from "../../Components/Custom/CustomTooltip";
import { Box, Divider, styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const StepperTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        background: "#112038 ",
        border: "1px solid #1E2B40",
        maxWidth: "none",
        padding: "0.5rem",
        boxShadow: "-2px 2px 8px 0px #0A081175",
    },
}));

const SideBarList = ({ listItem, isExpandMore, setSideBarOpen, active, setActive, sideBarOpen }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const handleClick = () => {
        if (isExpandMore) {
            if (!sideBarOpen) {
                setSideBarOpen(true);
            }
            setOpen(!open);
        }
    };

    const handleNavigate = (href, header) => {
        // if (!sideBarOpen) {
        //     setSideBarOpen(true);
        // }
        setActive(header);
        navigate(href);
    };

    const getChildActiveIndex = (val, flag) => {
        if (flag && sideBarList) {
            const foundItem = sideBarList.find(({ header }) => header === active);
            return foundItem ? foundItem.header === val : null;
        }

        if (!listItem || !listItem.children) return null;
        const foundChild = listItem.children.find(({ header }) => header === active);
        return foundChild ? foundChild.header === val : null;
    };

    useEffect(() => {
        sideBarList.forEach((item) => {
            if (item.children) {
                item.children.forEach((child) => {
                    if (child.href && location.pathname.split("/").includes(child.href)) {
                        setOpen(true);
                        setActive(child.header);
                    }
                });
            } else {
                if (item.href && location.pathname.includes(item.href)) {
                    setActive(item.header);
                }
            }
        });
    }, [location.pathname, setActive]);

    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 360,
                color: sideBarListColor.TEXT,
                "& .MuiTypography-root": {
                    color: `${getChildActiveIndex(listItem.header, true) ? "#0082F9" : "#ffff"} `,
                },
                "& .MuiListItemIcon-root": {
                    minWidth: "0",
                },
                "$ .MuiSvgIcon-root": {
                    color: `${sideBarListColor.TEXT} !important`,
                },
                "& .MuiButtonBase-root": {
                    transition: "gap 0.5s",
                    gap: `${sideBarOpen ? "1rem !important" : "5rem !important"}`,
                },
            }}
            component="nav"
        >
            {isExpandMore ? (
                <>
                    <StepperTooltip
                        placement="bottom-end"
                        title={
                            !sideBarOpen ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        background: "#112038",
                                        // gap: "1rem",
                                    }}
                                >
                                    {listItem?.children.map((item, listIndex) => {
                                        const isSelected = getChildActiveIndex(item.header, false);
                                        return (
                                            <Box
                                                key={listIndex}
                                                sx={{
                                                    borderLeft: "2px solid #FFFFFF29",
                                                    padding: "1rem 0.5rem 0rem 0rem",
                                                    display: "flex",
                                                    alignItems: "flex-end",
                                                    gap: "1rem",
                                                    fontSize: "1rem",
                                                    color: `${isSelected ? "#fff" : "#8E97A4"} !important`,
                                                }}
                                            >
                                                <Divider
                                                    style={{
                                                        background: "#FFFFFF29",
                                                        width: "1rem",
                                                        height: "1px",
                                                    }}
                                                />
                                                <span>{item.header}</span>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            ) : (
                                ""
                            )
                        }
                    >
                        <ListItemButton
                            onClick={handleClick}
                            className={`list-item-head ${
                                listItem.children.find(({ header }) => header === active) || open
                                    ? "item-selected"
                                    : ""
                            }`}
                        >
                            <ListItemIcon
                                sx={{
                                    "& path": {
                                        stroke: `${open ? "#0082F9" : "#fff"}`,
                                    },
                                }}
                            >
                                {listItem?.headerIcon ? listItem?.headerIcon : ""}
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    "& .MuiTypography-root": {
                                        color: `${open ? "#0082F9" : sideBarListColor.TEXT}`,
                                    },
                                }}
                                primary={listItem?.header}
                            />
                            {isExpandMore ? (
                                open ? (
                                    <ExpandMore sx={{ fill: sideBarListColor.TEXT }} />
                                ) : (
                                    <ExpandLess sx={{ fill: sideBarListColor.TEXT }} />
                                )
                            ) : (
                                ""
                            )}
                        </ListItemButton>
                    </StepperTooltip>
                    <Collapse
                        in={open}
                        sx={{
                            "& .MuiCollapse-wrapperInner": {
                                display: "flex",
                                justifyContent: `${sideBarOpen ? "flex-end" : "center"}`,
                                paddingTop: "0.5rem",
                            },
                        }}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List
                            component="div"
                            sx={{ width: "90%", borderLeft: `${sideBarOpen ? "1px solid #FFFFFF29" : ""}` }}
                            disablePadding
                        >
                            {listItem?.children.map((item, listIndex) => {
                                const isSelected = getChildActiveIndex(item.header, false);
                                return (
                                    <CustomTooltip
                                        title={sideBarOpen ? "" : item.header}
                                        placement="right-end"
                                        key={listIndex}
                                    >
                                        <ListItemButton
                                            selected={isSelected} // Check if child item is active
                                            sx={{
                                                "& .MuiButtonBase-root": {
                                                    gap: "0 !important",
                                                },
                                                border: `${
                                                    isSelected && !sideBarOpen
                                                        ? "0.083rem solid #FFFFFF29 !important"
                                                        : ""
                                                }`,
                                                borderRadius: `${
                                                    isSelected && !sideBarOpen ? "0.375rem !important" : ""
                                                }`,
                                                background: `${sideBarOpen ? "" : "transparent"} !important`,
                                                paddingLeft: "0 !important",
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNavigate(item?.href, item.header);
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    "& path": {
                                                        stroke: `${isSelected ? "#fff" : "#8E97A4"}`,
                                                    },
                                                    padding: "0rem 0rem 0rem 0.9rem",
                                                }}
                                            >
                                                {item?.headerIcon ? item?.headerIcon : ""}
                                            </ListItemIcon>
                                            <ListItemText
                                                sx={{
                                                    textAlign: "left",
                                                    "& .MuiTypography-root": {
                                                        color: `${
                                                            isSelected ? "#fff" : "#8E97A4"
                                                        } !important`,
                                                    },
                                                }}
                                                primary={item?.header}
                                            />
                                        </ListItemButton>
                                    </CustomTooltip>
                                );
                            })}
                        </List>
                    </Collapse>
                </>
            ) : (
                <CustomTooltip title={sideBarOpen ? "" : listItem?.header} placement="right-end">
                    <ListItemButton
                        selected={getChildActiveIndex(listItem.header, true)}
                        onClick={() => {
                            handleNavigate(listItem?.href, listItem.header);
                            setActive(listItem.header);
                        }}
                        className={`${getChildActiveIndex(listItem.header, true) ? "item-selected" : ""}`}
                    >
                        <ListItemIcon
                            sx={{
                                "& path": {
                                    stroke: `${
                                        getChildActiveIndex(listItem.header, true) ? "#0082F9" : "#fff"
                                    }`,
                                },
                            }}
                        >
                            <ListItemIcon>{listItem?.headerIcon ? listItem?.headerIcon : ""}</ListItemIcon>
                        </ListItemIcon>
                        <ListItemText
                            primary={listItem?.header}
                            sx={{
                                color: `${
                                    getChildActiveIndex(listItem.header, true) ? "#0082F9" : "#ffff"
                                } !important`,
                            }}
                        />
                    </ListItemButton>
                </CustomTooltip>

                // </List>
            )}
        </List>
    );
};

export default SideBarList;
