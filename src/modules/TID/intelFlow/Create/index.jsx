import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from "@mui/material/Button";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { sideBarListColor } from "../../../../Constants/Constant";
import Entities from './Entities';
import "./index.css";

const SelectThreat = () => {
    const navigate = useNavigate();

    return (
        <>
            <Button
                className="back-to-threats"
                onClick={() => navigate("/intel-flow")}
                sx={{
                    borderRadius: "0.35rem",
                    height: "1.75rem",
                    width: "5.188rem",
                    color: sideBarListColor.TEXT,
                }}
            >
                <ArrowBackIcon
                    sx={{
                        fontSize: "1.25em",
                        fill: sideBarListColor.TEXT,
                    }}
                />
                Back
            </Button>

            <div className="tid-entity-card-threat">
                <p style={{ fontWeight: 500, fontSize: "large" }}>Select The Type of Object</p>
                <hr style={{ border: "1px solid #8e97a4" }} />
                <Entities />
            </div>
        </>
    );
}

export default SelectThreat;