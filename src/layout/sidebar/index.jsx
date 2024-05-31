import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GambitCyber } from "../../Assests/SVG/Gambitcyber.svg";
import { ReactComponent as ProfileIcon } from "../../Assests/SVG/profile-circle.svg";
import CustomTooltip from "../../Components/Custom/CustomTooltip";
import { sideBarListColor } from "../../Constants/Constant";
import { sideBarList } from "../../Constants/sideBarListConstant";
import useToastify from "../../Hooks/useToastify";
import { getUser } from "../../redux/Slice/Auth/authSlice";
import { authSignOut } from "../../Services/Auth/Auth.service";
import SideBarListItem from "./SideBarList";

const drawerWidth = "20%";

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    //     "& .MuiButtonBase-root": {
    //       gap: "2rem",
    //   },
    overflowX: "hidden",
    width: `calc(${theme.spacing(8)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2),
    "& .drawer-header-text": {
        fontSize: "1.125rem",
        fontWeight: "600",
        lineHeight: "0.5rem",
    },
    "& .drawer-header-logo": {
        width: "11rem",
        height: "2rem",
    },
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    margin: "1rem",
    "& .MuiPaper-root": {
        backgroundColor: `${sideBarListColor.BACKGROUND_COLOR} !important`,
        color: `${sideBarListColor.TEXT} !important`,
        margin: "1rem",
        border: "0.063rem solid #1E2B40",
        borderRadius: "0.375rem",
        height: "95%",
    },
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
    "& .list-container": {
        margin: "0.5rem",
    },
}));

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showToast } = useToastify();
    const user = useSelector(getUser);
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState(null);
    const handleDrawerClose = () => {
        setOpen((pre) => !pre);
    };

    return (
        <>
            <Drawer variant="permanent" open={open}>
                <Box className="sidebar-drawer-container">
                    <Box>
                        <DrawerHeader>
                            <Box
                                sx={{
                                    transition: "display 0.5s",
                                    display: `${open ? "block !important" : "none !important"}`,
                                }}
                                className="drawer-header-text"
                            >
                                <GambitCyber className="drawer-header-logo" />
                            </Box>
                            <IconButton onClick={handleDrawerClose}>
                                {open ? (
                                    <ChevronRightIcon
                                        sx={{
                                            fill: sideBarListColor.TEXT,
                                            border: "0.063rem solid #1E2B40",
                                            borderRadius: "0.375rem",
                                            background: "#FFFFFF1A",
                                        }}
                                    />
                                ) : (
                                    <ChevronLeftIcon
                                        sx={{
                                            fill: sideBarListColor.TEXT,
                                            border: "0.063rem solid #1E2B40",
                                            borderRadius: "0.375rem",
                                            background: "#FFFFFF1A",
                                        }}
                                    />
                                )}
                            </IconButton>
                        </DrawerHeader>
                        <Divider sx={{ background: "#1E2B40", marginBottom: "0.5rem" }} />
                        <div className="list-container">
                            {sideBarList &&
                                sideBarList.length > 0 &&
                                sideBarList.map((listItem, index) => {
                                    const isExpandMore =
                                        listItem && listItem?.children && listItem.children.length > 0
                                            ? true
                                            : false;
                                    return (
                                        <SideBarListItem
                                            setSideBarOpen={setOpen}
                                            key={index}
                                            active={active}
                                            setActive={setActive}
                                            listItem={listItem}
                                            sideBarOpen={open}
                                            isExpandMore={isExpandMore}
                                        />
                                    );
                                })}
                            {user?.isSignedIn ? (
                                <CustomTooltip title={open ? "" : "Log out"} placement="right-end">
                                    <ListItemButton
                                        sx={{
                                            "& .MuiTypography-root": {
                                                color: "#fff !important",
                                            },
                                        }}
                                        onClick={async () => {
                                            const response = await dispatch(authSignOut({}));
                                            if (response.type === "auth/signOut/fulfilled") {
                                                showToast("You have been signed out successfully.", {
                                                    type: "success",
                                                });
                                                navigate("/login");
                                            } else {
                                                showToast("Something went wrong. Please try again.", {
                                                    type: "error",
                                                });
                                            }
                                        }}
                                        className={`sideBar-constats ${open ? "" : "sideBar-constats-open"}`}
                                        component="nav"
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: "0%",
                                            }}
                                        >
                                            <LogoutIcon sx={{ fill: "#fff" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={"Log out"} />
                                    </ListItemButton>
                                </CustomTooltip>
                            ) : (
                                <CustomTooltip title={open ? "" : "Log In"} placement="right-end">
                                    <ListItemButton
                                        sx={{
                                            "& .MuiTypography-root": {
                                                color: "#fff !important",
                                            },
                                        }}
                                        onClick={() => {
                                            navigate("/login");
                                        }}
                                        className={`sideBar-constats ${open ? "" : "sideBar-constats-open"}`}
                                        component="nav"
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: "0%",
                                            }}
                                        >
                                            <LoginIcon sx={{ fill: "#fff" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={"Log In"} />
                                    </ListItemButton>
                                </CustomTooltip>
                            )}
                        </div>
                        {/* <Divider /> */}
                    </Box>
                    <Box>
                        <CustomTooltip title={user?.name} placement="right-end">
                            <ListItemButton
                                sx={{
                                    "& .MuiTypography-root": {
                                        color: "#fff !important",
                                    },
                                }}
                                onClick={() => {
                                    // navigate("/login");
                                }}
                                className={`sideBar-constats ${open ? "" : "sideBar-constats-open"}`}
                                component="nav"
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: "0%",
                                        paddingLeft: "0.5rem",
                                    }}
                                >
                                    <ProfileIcon style={{}} />
                                </ListItemIcon>
                                <ListItemText primary={user?.name} />
                            </ListItemButton>
                        </CustomTooltip>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default SideBar;
