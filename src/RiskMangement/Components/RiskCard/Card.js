import Tooltip from '@mui/material/Tooltip';
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CustomMarkdownTag from "../../../Components/Markdown/CustomMarkDown";
import { ColorOptions, TextColor } from "../../../Constants/Constant";
import "./Card.css";
import { duplicateRiskPRofile } from '../../../redux/Slice/riskManagementApiSlice';

const Card = ({ data, setpage }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    // for find Updated time
    const timeAgo = (isoDateString) => {
        const now = new Date();
        const updatedTime = new Date(isoDateString);
        const timeDifference = now - updatedTime;
        const minutes = Math.floor(timeDifference / (1000 * 60));
        if (minutes < 1) {
            return "just now";
        } else if (minutes === 1) {
            return `${minutes} minute ago`
        } else if (minutes < 60) {
            return `${minutes} minutes ago`
        } else if (minutes < 1440) {
            const hours = Math.floor(minutes / 60);
            return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
        } else {
            const days = Math.floor(minutes / 1440);
            return days === 1 ? `${days} day ago` : `${days} days ago`;
        }
    }

    //date format function
    const dateFormatChange = (date) => {

        // Convert the input string to a Date object
        const dateObject = new Date(date);

        // Format the date using toLocaleDateString
        return dateObject.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        })
    }

    //first letter capital function
    const capitalizeFirstLetter = (inputString) => {
        // Make the first letter uppercase and the rest lowercase
        return inputString?.charAt(0)?.toUpperCase() + inputString?.slice(1)?.toLowerCase();
    }

    const buttonType = capitalizeFirstLetter(data?.status ? (data?.status === "PUBLISHED" ? "Public" : data?.status) : (data?.is_public ? "Public" : "Private"))

    return (
                <div className="control-section card-control-section basic_card_layout">
                    <div className="e-card-resize-container">
                        <div className="row">
                            <div className="row card-layout">
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="e-card e-card-main-container">
                                        <div className="e-card-body-comtainer">
                                            <div className="e-card-row">
                                                <h4 className="title-width">{data?.department_name}</h4>
                                                <div className="profile-flex">
                                                    <div>
                                                        <p className={`profile-top-button ${buttonType === "Private" ? 'privateButton' : buttonType === "Draft" ? "draftButton" : ''} `}
                                                            style={{ backgroundColor: buttonType === "Public" && BackgroundColor, color: buttonType === "Public" && BackgroundColor === ColorOptions.YELLOW ? TextColor.BLACK : TextColor.WHITE }}
                                                        >{buttonType}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="e-card-main-header">
                                                <div className="e-card-header-caption">
                                                    <div className="e-card-main-title">
                                                        <Tooltip title={data?.name} placement="top" arrow>
                                                            <h3 onClick={() => navigate(`/create-risk/${data?.id}`)}>{data?.name}</h3>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="e-card-main-content">
                                                <CustomMarkdownTag
                                                    readMoreChars={350}
                                                    content={data?.description}
                                                />
                                                {/* {data?.description} */}
                                            </div>
                                            <div className="e-card-data-container">
                                                {data?.profile_type && <p className='e-card-data'><span>Profile Type: </span>{(capitalizeFirstLetter(data?.profile_type) + " Profile")}</p>}
                                                <p className='e-card-data'><span>Created Date: </span>{dateFormatChange(data?.created)}</p>
                                                <p className='e-card-data'><span>Last Updated: </span>{timeAgo(data?.last_modified)}</p>
                                            </div>
                                        </div>
                                        <div className='e-card-button'>
                                            <div className="e-card-button-div">
                                                <ButtonComponent className="open-button e-outline" onClick={() => navigate(`/create-risk/${data?.id}`)}>Open</ButtonComponent>
                                            </div>
                                            <div className="e-card-button-div">
                                                <ButtonComponent
                                                    onClick={() => {
                                                        dispatch(duplicateRiskPRofile(data?.id, navigate))
                                                        setpage(0)
                                                        }}
                                                    style={{ color: BackgroundColor, borderColor: BackgroundColor }}
                                                    className="dublicate-button e-outline">Duplicate</ButtonComponent>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};
export default Card;
