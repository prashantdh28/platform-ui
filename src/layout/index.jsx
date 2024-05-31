import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";
import SideBar from "./sidebar";

const Layout = () => {
    return (
        <div className="main-body-container">
            <div className="main-body-sections-container">
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
