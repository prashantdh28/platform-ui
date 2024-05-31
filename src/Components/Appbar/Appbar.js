import { ClassNames } from "@emotion/react";
import { AppBarComponent } from "@syncfusion/ej2-react-navigations";
import React, { useEffect, useRef, useState } from "react";
import Picture from "../../../src/Assests/Img/images.jpg";
import Logo from "../../Assests/SVG/appbarLogo.svg";
// import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { BiLogIn } from "react-icons/bi";
import { BsPalette } from "react-icons/bs";
import { IoMdChatboxes } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ChatToggle from "../../Chat/ChatToggle";
import { ColorOptions, TextColor } from "../../Constants/Constant";
import { reSetData } from "../../redux/Slice/riskManagementSlice";
import { setBackgroundColor, setTheme } from "../../redux/Slice/themeSlice";
import CustomSwitch from "../Custom/CustomSwitch";
import "../ProfileCards/profilecard.css";
import RightSideToggle from "../RightSideToggle/RightSideToggle";
import "./Appbar.css";

const Appbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sidebarObj = useRef(null);

  let showBackdrop = true;

  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const dropdownRef = useRef(null);

  const theme = useSelector((state) => state.theme.theme);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

  const updateSelectedColor = (color) => {
    dispatch(setBackgroundColor(color));
  };

  useEffect(() => {
    if (location.pathname === "/risk-management") {
      dispatch(setBackgroundColor(BackgroundColor));
    }
  }, [location.pathname, dispatch, BackgroundColor]);

  // const profileDropDownButtonItems = [
  //   { text: "Dashboard", className: "dashboard-item" },
  //   { text: "Adversary list", className: "dashboard-item" },
  // ];
  function closeChat() {
    setIsChatOpen(false);
  }

  const toggleChatSection = () => {
    setIsChatOpen(true);
    setIsToggleOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    dispatch(setTheme(newTheme));
    setIsToggleOpen(false);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(true);
    setIsToggleOpen(false);
  };

  function closeClick() {
    setIsRightSidebarOpen(false);
  }
  const handleLogout = () => {
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsToggleOpen(false);
    }
  };

  // function onSelect(args) {
  //   if (args.item.text === "Adversary list") {
  //     navigate("/");
  //   }
  //   if (args.item.text === "Adversary list") {
  //     navigate("/");
  //   }
  // }

    useEffect(() => {
        if (!location?.pathname.startsWith("/create-risk")) {
            dispatch(reSetData());
        }
        if (location.pathname.endsWith("/")) {
            navigate("/intel-flow");
        }
    }, [dispatch, navigate, location]);

  // Add event listener to handle clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
      <>
          {/* <div className="color-appbar-container" id={sidebarObjChat?.isOpen == true ? "chatopen" : ""}> */}
          <ClassNames>
              {({ css, cx }) => (
                  <div className="color-appbar-container" id={isChatOpen ? "chatopen" : ""}>
                      <div className="col-md-12">
                          <AppBarComponent
                              colorMode={TextColor.WHITE}
                              style={{ height: "50%", paddingTop: "15px" }}
                          >
                              <div className="logo-image">
                                  <img
                                      src={Logo}
                                      className="img-logo"
                                      alt=""
                                      style={{
                                          backgroundColor: BackgroundColor,
                                          fill:
                                              BackgroundColor === ColorOptions.YELLOW
                                                  ? TextColor.BLACK
                                                  : TextColor.WHITE,
                                          width: "52px",
                                      }}
                                  />
                                  <div
                                      className="logo"
                                      // created={btnCreated}
                                      style={{ color: "var(--logo-color)" }}
                                  >
                                      Logo
                                  </div>
                              </div>

                              <div
                                  id="menu-icons"
                                  style={{
                                      alignItems: "center",
                                      color: TextColor.WHITE,
                                  }}
                              >
                                  {/* <div
                      className="icon-button-container"
                      onMouseEnter={() => handleMouseEnter(1)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        background: hoveredItem === 1 ? BackgroundColor : "",
                      }}
                    >
                      <span className="e-icons e-people icon"></span>
                      <DropDownButtonComponent
                        select={onSelect}
                        cssClass={"e-inherit e-appbar-menu" + props.colorClass}
                        items={profileDropDownButtonItems}
                        className="btn-1-actors"
                      >
                        Threat Actors
                        <div
                          className="e-icons e-chevron-down-fill-3 "
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        ></div>
                      </DropDownButtonComponent>
                    </div> */}
                                  <div
                                      onClick={() => navigate("/tid")}
                                      className={cx(
                                          "icon-button-container",
                                          css({
                                              "&:hover,&:focus": {
                                                  background: BackgroundColor,
                                                  color:
                                                      BackgroundColor === ColorOptions.YELLOW
                                                          ? TextColor.BLACK
                                                          : TextColor.WHITE,
                                                  borderRadius: "5px",
                                              },
                                              background: location?.pathname.includes("tid")
                                                  ? BackgroundColor
                                                  : "",
                                              color: location?.pathname.includes("tid")
                                                  ? BackgroundColor === ColorOptions.YELLOW
                                                      ? TextColor.BLACK
                                                      : TextColor.WHITE
                                                  : "var(--appbar-icon-color)",
                                              borderRadius: "5px",
                                          })
                                      )}
                                  >
                                      <span className="e-icons e-objects icon" />
                                      <span className="btn-1 e-inherit  e-dark">Threat Informed</span>
                                  </div>
                                  <div
                                      onClick={() => navigate("/risk-management")}
                                      className={cx(
                                          "icon-button-container",
                                          css({
                                              "&:hover,&:focus": {
                                                  background: BackgroundColor,
                                                  color:
                                                      BackgroundColor === ColorOptions.YELLOW
                                                          ? TextColor.BLACK
                                                          : TextColor.WHITE,
                                                  borderRadius: "5px",
                                                  ".icon": {
                                                      color:
                                                          BackgroundColor === ColorOptions.YELLOW
                                                              ? TextColor.BLACK
                                                              : TextColor.WHITE,
                                                  },
                                              },
                                              background:
                                                  location?.pathname.includes("risk-management") ||
                                                  location?.pathname.includes("create-risk")
                                                      ? BackgroundColor
                                                      : "",
                                              ".icon": {
                                                  color:
                                                      location?.pathname.includes("risk-management") ||
                                                      location?.pathname.includes("create-risk")
                                                          ? BackgroundColor === ColorOptions.YELLOW
                                                              ? TextColor.BLACK
                                                              : TextColor.WHITE
                                                          : "var(--appbar-icon-color)",
                                              },
                                              color:
                                                  location?.pathname.includes("risk-management") ||
                                                  location?.pathname.includes("create-risk")
                                                      ? BackgroundColor === ColorOptions.YELLOW
                                                          ? TextColor.BLACK
                                                          : TextColor.WHITE
                                                      : "var(--appbar-icon-color)",
                                              borderRadius: "5px",
                                          })
                                      )}
                                  >
                                      <span className="e-icons e-warning icon" />
                                      <span className="btn-1 e-inherit  e-dark">Risk Management</span>
                                  </div>
                                  <div
                                      className={cx(
                                          "icon-button-container",
                                          css({
                                              "&:hover,&:focus": {
                                                  background: BackgroundColor,
                                                  color:
                                                      BackgroundColor === ColorOptions.YELLOW
                                                          ? TextColor.BLACK
                                                          : TextColor.WHITE,
                                                  borderRadius: "5px",
                                              },
                                              background: location?.pathname.includes("vendor-Management")
                                                  ? BackgroundColor
                                                  : "",
                                              color: location?.pathname.includes("vendor-Management")
                                                  ? BackgroundColor === ColorOptions.YELLOW
                                                      ? TextColor.BLACK
                                                      : TextColor.WHITE
                                                  : "var(--appbar-icon-color)",
                                              borderRadius: "5px",
                                          })
                                      )}
                                  >
                                      <span className="e-icons e-settings icon" />
                                      <span className="btn-1 e-inherit ">Vendor Management</span>
                                  </div>
                                  <div
                                      onClick={() => navigate("/investigation")}
                                      className={cx(
                                          "icon-button-container",
                                          css({
                                              "&:hover,&:focus": {
                                                  background: BackgroundColor,
                                                  color:
                                                      BackgroundColor === ColorOptions.YELLOW
                                                          ? TextColor.BLACK
                                                          : TextColor.WHITE,
                                                  borderRadius: "5px",
                                              },
                                              background: location?.pathname.includes("investigation")
                                                  ? BackgroundColor
                                                  : "",
                                              color: location?.pathname.includes("investigation")
                                                  ? BackgroundColor === ColorOptions.YELLOW
                                                      ? TextColor.BLACK
                                                      : TextColor.WHITE
                                                  : "var(--appbar-icon-color)",
                                              borderRadius: "5px",
                                          })
                                      )}
                                  >
                                      <span className="e-icons e-chart-2d-pie-2 icon" />
                                      <span className="btn-1 e-inherit ">Investigations</span>
                                  </div>
                              </div>
                              <div className="new">
                                  <div className="icon-button-container-both">
                                      <div
                                          className={cx(
                                              "icon-button-container-91",
                                              css({
                                                  "&:hover,&:focus": {
                                                      color: BackgroundColor,
                                                      borderRadius: "5px",
                                                  },
                                              })
                                          )}
                                      >
                                          <span
                                              className="e-icons e-menu icon"
                                              style={{
                                                  fontSize: "15px",
                                                  cursor: "pointer",
                                                  fill: "var(--appbar-icon-color)",
                                              }}
                                          />
                                      </div>

                                      <div
                                          className={cx(
                                              "icon-button-container-91",
                                              css({
                                                  "&:hover,&:focus": {
                                                      color: BackgroundColor,
                                                      borderRadius: "5px",
                                                  },
                                              })
                                          )}
                                      >
                                          <span
                                              className="e-icons e-border-all-2 icon"
                                              style={{
                                                  fontSize: "15px",
                                                  cursor: "pointer",
                                                  fill: "var(--appbar-icon-color)",
                                              }}
                                          />
                                      </div>
                                      <div
                                          onClick={toggleChatSection}
                                          className={cx(
                                              "icon-button-container-92",
                                              css({
                                                  "&:hover,&:focus": {
                                                      color: BackgroundColor,
                                                      borderRadius: "5px",
                                                  },
                                              })
                                          )}
                                      >
                                          <IoMdChatboxes
                                              style={{
                                                  height: "21px",
                                                  width: "35px",
                                                  fill: "var(--appbar-icon-color)",
                                              }}
                                          />
                                      </div>
                                  </div>
                                  <div className="profileImg">
                                      <img src={Picture} className="img-1" alt="" />
                                  </div>

                                  <div className="name-email">
                                      <span>John Doue</span>
                                      <span>jdoe@acme.com</span>
                                  </div>

                                  <div className="profile-down-icon">
                                      <span
                                          className="e-icons e-chevron-down-fill-3 "
                                          style={{
                                              justifyContent: "center",
                                              alignItems: "center",
                                          }}
                                          onClick={() => {
                                              setIsToggleOpen(true);
                                          }}
                                      ></span>
                                  </div>
                              </div>
                          </AppBarComponent>
                      </div>
                  </div>
              )}
          </ClassNames>
          {isToggleOpen && (
              <div className="Appbar-dragpopup" id="Appbar-dragpopup" ref={dropdownRef}>
                  <span className="dropDownStatus"> Status</span>
                  <span className="ModeToogle" onClick={toggleRightSidebar}>
                      Choose Style
                      <BsPalette style={{ fontSize: "larger", paddingRight: "8%" }} />
                  </span>

                  <span className="ModeToogle">
                      Dark Mode
                      <CustomSwitch
                          checked={theme === "dark-theme"}
                          onChange={toggleTheme}
                          color="primary" // Change the color of the switch
                          inputProps={{ "aria-label": "controlled" }}
                      />
                  </span>

                  <div className="parent-logout">
                      <span className="logout-button-dropdown" onClick={handleLogout}>
                          LOG IN
                          <BiLogIn style={{ fontSize: "x-large", paddingRight: "1%" }} />
                      </span>
                  </div>
              </div>
          )}
          {isChatOpen && (
              <div style={{ position: "absolute" }}>
                  <ChatToggle
                      setIsChatOpen={setIsChatOpen}
                      isChatOpen={isChatOpen}
                      onClose={closeChat}
                      showBackdrop={showBackdrop}
                      sidebarObj={sidebarObj}
                  />
              </div>
          )}

          {isRightSidebarOpen && (
              <div style={{ position: "absolute" }}>
                  <RightSideToggle
                      set={setIsRightSidebarOpen}
                      isOpen={isRightSidebarOpen}
                      onClose={closeClick}
                      showBackdrop={showBackdrop}
                      sidebarObj={sidebarObj}
                      onColorChange={updateSelectedColor}
                  />
              </div>
          )}
          <Outlet />
      </>
  );
};
export default Appbar;
