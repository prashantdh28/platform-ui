import React, { useEffect, useState } from "react";
import message from "../../../Assests/SVG/message-logo.svg";
// import Searchbar from "../../Searchbar/Searchbar";
// import DropDownTree from "../../DropDownTree/DropDownTree";
import BreadCrumbNavigator from "../../BreadCrumb/BreadCrumbNavigator/BreadCrumbNavigator";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ActivityThread.css";

const ActivityThreads = () => {
  const { channelId, actorId } = useParams();
  const [channleName, setChannalName] = useState("Chhanle name");

  const activityData = useSelector((state) => state.activity.activityData);

  useEffect(() => {
    const channle =
        activityData && activityData.length > 0
            ? activityData.filter((item) => item.channel_id === channelId)
            : "Chhanle";
    const channelName = channle[0]?.channel_name;
    setChannalName(channelName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const breadcrumbItemsCustom = [
    { label: "Activities list", link: `/singlecard/${actorId}` },
    {
      label: channleName,
      link: `/singlecard/${actorId}/channal/${channelId}`,
    },
  ];

  return (
    <>
      <div className="main-div">
        <div className="header-icon">
          <img src={message} className="chat-icon" alt="chat-icon" />
          <h2 className="channel-name"> Channel Name</h2>
          {/* <Searchbar />
          <DropDownTree /> */}
        </div>
        <BreadCrumbNavigator items={breadcrumbItemsCustom} />
        <div className="social-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ActivityThreads;
