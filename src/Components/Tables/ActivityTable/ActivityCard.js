import edit from "../../../Assests/SVG/edit.svg";
import React from "react";
import ButtonChips from "../../Chips/ButtonChips/ButtonChips";
import TagPupUp from "../../PopUp/TagPupUp";

const ActivityCard = ({
    message,
    channel_type,
    channel_name,
    thread_count,
    topic_title,
    user,
    publishDate,
    tags,
    handleClick,
    channel_id,
}) => {
    return (
        <div className="activity-card">
            <div className="activity-card-data">
                <div className="name">
                    <h2 onClick={() => handleClick(channel_id)}>
                        {channel_name} ({thread_count})
                    </h2>
                    <div className="info  ">
                        <span> {channel_type} </span>
                    </div>
                </div>
                <span className="v-line"></span>
            </div>

            <div className="parent-icon">
                <div className="square-edit">
                    <div className="edit-icon">
                        <img src={edit} alt="edit" />
                    </div>
                </div>
            </div>

            <div className="text-acitivity-table">
                <div className="second-row">{topic_title}</div>
                <span className="name-pencil">
                    <span className="font-desc">
                        <span className="e-icons e-small e-plus" /> {user} Created Thread
                    </span>
                </span>
            </div>

            <div className="text-acitivity-table-threads">
                <div className="total-threads"> Total Threads: </div>
                <span className="num">{thread_count}</span>
            </div>

            <div className="text-acitivity-table-published">
                <div className="total-threads"> Published: </div>
                <span className="num">{publishDate}</span>
            </div>

            <div className="activity-chips">
                {tags &&
                    tags.length > 0 &&
                    tags.slice(0, 3).map((tag, tagIndex) => {
                        const { name } = tag;
                        const truncateName = name ? name.slice(0, 10) + "..." : null;
                        return <ButtonChips key={tagIndex} name={truncateName} />;
                    })}
                <TagPupUp tags={tags} />
            </div>
        </div>
    );
};

export default ActivityCard;
