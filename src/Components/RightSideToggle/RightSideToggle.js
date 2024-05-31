import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import React, { useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import blue from "../../Assests/Img/BlueLight.png";
import BDonut from "../../Assests/SVG/BlueDonut.svg";
import Gdonut from "../../Assests/SVG/GreenDount.svg";
import PDonut from "../../Assests/SVG/PurpleDonut.svg";
import YDonut from "../../Assests/SVG/YellowDonut.svg";
import { ColorOptions, TextColor } from "../../Constants/Constant";
import { setBackgroundColor } from "../../redux/Slice/themeSlice";

import { setTheme } from "../../redux/Slice/themeSlice";
// import {whitePurple} from "../../Assests/Img/whitePurple.png";
// import {whiteGreen} from "../../Assests/Img/whiteGreen.png";
// import {whiteYellow} from "../../Assests/Img/whiteYellow.png";
import CustomSwitch from "../Custom/CustomSwitch";
import "./RightSideToggle.css";

const getColorImage = (colorKey) => {
    switch (colorKey) {
        case ColorOptions.BLUE:
            return BDonut;
        case ColorOptions.PURPLE:
            return PDonut;
        case ColorOptions.GREEN:
            return Gdonut;
        case ColorOptions.YELLOW:
            return YDonut;
        default:
            return BDonut;
    }
};

const RightSideToggle = ({ set, showBackdrop, onCreate, sidebarObj }) => {
    const dispatch = useDispatch();
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    const theme = useSelector((state) => state.theme.theme);

    const toggleTheme = () => {
        const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
        dispatch(setTheme(newTheme));
    };

    useEffect(() => {
        document.body.className = theme;
        // document.body.setAttribute("data-theme", BackgroundColor);
    }, [theme]);

    const handleClose = () => {
        set(false);
    };

    const handleColorChange = (color) => {
        dispatch(setBackgroundColor(color));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                set(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <>
            <SidebarComponent
                position="Right"
                width="420px"
                id="right-sidebar"
                ref={(Sidebar) => (sidebarObj = Sidebar)}
                created={onCreate}
                showBackdrop={showBackdrop}
                className="main-sidebar"
                enableGestures={false}
            >
                <div
                    className="title"
                    style={{
                        background: BackgroundColor || ColorOptions.BLUE,
                        color: BackgroundColor === ColorOptions.YELLOW ? TextColor.BLACK : TextColor.WHITE,
                        backgroundColor: `${BackgroundColor || ColorOptions.BLUE} !important`,
                    }}
                >
                    {" "}
                    Style
                    <span className="choose-style-icon">
                        <BsXLg onClick={handleClose} />
                    </span>
                </div>

                <div className="choose-style-parent">
                    <div className="image-main-screen">
                        <img src={blue} alt="" />
                    </div>

                    <div className="donut-section">
                        {Object.keys(ColorOptions).map((colorKey) => (
                            <img
                                key={colorKey}
                                src={getColorImage(ColorOptions[colorKey])}
                                onClick={() => handleColorChange(ColorOptions[colorKey])}
                                alt=""
                            />
                        ))}
                    </div>
                </div>

                <div className="choose-style-toggle">
                    <span className="Toggle-ThemeText"> Dark Mode</span>
                    <span className="right-toggle-button">
                        {/* <SwitchComponent
              checked={theme === "dark-theme"}
              cssClass="e-primary"
              change={toggleTheme}
              onLabel={"Dark"}
              offLabel={"Light"}
              // onContent={" "}
              // offContent={" "}
            ></SwitchComponent> */}
                        <CustomSwitch
                            checked={theme === "dark-theme"}
                            onChange={toggleTheme}
                            color="primary" // Change the color of the switch
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </span>
                </div>
            </SidebarComponent>
        </>
    );
};

export default RightSideToggle;
