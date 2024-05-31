import React, { useCallback, useEffect, useState } from "react";
import {
  getChannal,
  getChannalMessages,
} from "../../../Services/Activity/activity.service";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateTime } from "../../../helper/dateFormater";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ColorOptions, TextColor } from "../../../Constants/Constant";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";


const ActivityChannal = () => {
  const navigate = useNavigate();
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  // const [selectedColor] = useState(null);
  const [channalData, setChannalData] = useState({});
  const [channalMessageData, setChannalMessageData] = useState({});

  const { channelId } = useParams();
  const getChannalData = useCallback(async () => {
    const channalData = await getChannal(channelId);
    setChannalData(channalData);
  }, [channelId]);

  const getChannalMessagesData = useCallback(async () => {
    const ChannalMessagesData = await getChannalMessages(channelId);
    setChannalMessageData(ChannalMessagesData);
  }, [channelId]);

  useEffect(() => {
    getChannalData();
    getChannalMessagesData();
  }, [getChannalData, getChannalMessagesData]);

  const handleClick = (id) => {
    navigate("message", { state: { id } });
  };

  return (
    <div>
      <div className="channel-card">
        <div className="action-thread-desc">
          <h3 className="activity-description">Description</h3>
          <div className="activity-paragraph">
            {channalData && channalData?.description}
          </div>
          <hr id="horizontal-line" />

          <div className="desc-footer">
            <div className="desc-footer-1">
              <span className="channel-type">Channel Type: </span>
              <span className="forum">{channalData && channalData?.type}</span>
            </div>
            <div className="desc-footer-2">
              <span className="channel-type">Last Activity:</span>
              <span className="forum">
                {channalData &&
                  channalData.last_message &&
                  formatDateTime(channalData.last_message)}
              </span>
            </div>
            <div className="desc-footer-3">
              <span className="channel-type">First Activity: </span>
              <span className="forum">
                {channalData &&
                  channalData.first_message &&
                  formatDateTime(channalData.first_message)}
              </span>
            </div>

            <div className="desc-footer-4">
              <span className="channel-type">Total Threads: </span>
              <span className="forum">
                {channalData && channalData?.total_messages}
              </span>
            </div>

            <div className="desc-footer-5">
              <span className="channel-type-tags">Tags </span>
              {channalData &&
                channalData.tags &&
                channalData.tags.length > 0 &&
                channalData.tags.slice(0, 2).map((tag, index) => {
                  return (
                    <ButtonComponent key={index} className="buttonCompo">
                      {tag?.name}
                    </ButtonComponent>
                  );
                })}
              {channalData &&
              channalData.tags &&
              channalData.tags.length > 2 ? (
                <ButtonComponent className="noOfButton">
                  {`+${channalData.tags.length - 2}`}
                </ButtonComponent>
              ) : (
                ""
              )}
              <ButtonComponent
                cssClass="e-info"
                className="buttonPlus"
                style={{
                  backgroundColor: BackgroundColor 
                }}
              >
                <span
                  className="e-icons e-plus"
                  style={{
                    backgroundColor: BackgroundColor,
                    color: BackgroundColor === ColorOptions.YELLOW ? TextColor.BLACK : TextColor.WHITE,
                    height: "25px",
                  }}
                ></span>
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
      <div className="action-thread-card-2">
        <div className="action-thread-desc-2">
          <h3 className="activity-description">Threds</h3>
          {channalMessageData &&
            channalMessageData.content &&
            channalMessageData.content.length > 0 &&
            channalMessageData.content.map((item, index) => {
              const {
                topic_title,
                message,
                user,
                last_modified_date_time,
                posted_date_time,
                id,
              } = item;
              const firstActivity = formatDateTime(posted_date_time);
              const lastActivity = formatDateTime(last_modified_date_time);
              const truncateMessage = message
                ? message.slice(0, 155) + "..."
                : null;
              const keyId = uuidv4();

              return (
                <div className="thread-box" key={keyId}>
                  <div className="headline-desc">
                    <div className="headline-lorem30">
                      <span
                        className="headline"
                        onClick={() => handleClick(id)}
                      >
                        {topic_title}
                      </span>
                      <span className="lorem-30">{truncateMessage}</span>
                    </div>

                    <div className="vl"></div>
                    <div className="mid-section">
                      <div className="Threds-section-1">
                        <span className="thread-author">Thread Author:</span>
                        <span className="thread-author-name">{user}</span>
                      </div>

                      <div className="Threds-section-1">
                        <span className="thread-author">Adversary Role:</span>
                        <span className="thread-author-name">Commentator</span>
                      </div>

                      <div className="Threds-section-1">
                        <span className="thread-author">First Activity:</span>
                        <span className="thread-author-name">
                          {firstActivity}
                        </span>
                      </div>

                      <div className="Threds-section-1">
                        <span className="thread-author">Last Activity:</span>
                        <span className="thread-author-name">
                          {lastActivity}
                        </span>
                      </div>
                    </div>
                    <div className="vl"></div>

                    <div className="add-tag-button">
                      <span id="Add-Tag">Add Tag</span>
                      <ButtonComponent
                        cssClass="e-info"
                        className="buttonPlus"
                        style={{
                          backgroundColor: BackgroundColor,
                        }}
                      >
                        <span
                          className="e-icons e-plus"
                          style={{
                            backgroundColor: BackgroundColor,
                            color:
                              BackgroundColor === ColorOptions.YELLOW ? TextColor.BLACK : TextColor.WHITE,
                            height: "25px",
                          }}
                        ></span>
                      </ButtonComponent>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ActivityChannal;
