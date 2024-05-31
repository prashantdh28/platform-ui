import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const NoDataFound = ({ padding }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#8E97A4",
                background: "#08172f",
                padding: `${padding ? padding : "10rem 0"}`,
                gap: "0.5rem",
                marginBottom: "1.4rem",
                width: "100%",
                //   height: "100vh",
            }}
        >
            <InfoOutlinedIcon sx={{ color: "rgba(142, 151, 164, 1)" }} />
            <span>No Data Available</span>
        </div>
    );
};

export default NoDataFound;
