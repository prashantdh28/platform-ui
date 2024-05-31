import React, { memo } from "react";
import { Outlet } from "react-router-dom";
const Activity = () => {
    return <Outlet />;
};

export default memo(Activity);
