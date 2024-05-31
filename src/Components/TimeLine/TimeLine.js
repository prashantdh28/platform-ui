import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import DP from "../../../src/Assests/Img/TimelineDP.jpg";
import TimelineDP from "../../../src/Assests/Img/Timelinedp1.jpg";
import TimelineDP2 from "../../../src/Assests/Img/Timelinedp2.png";

import { Typography } from "@mui/material";
import "./TimeLine.css";

export default function NoOppositeContent() {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector className="timeline-connecter" />

          <img src={DP} className="img-accordion" alt="" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineSeparator></TimelineSeparator>
        <div className="comments-likes-replies ">
          <TimelineContent className="commenter-name">
            Chris Dock
          </TimelineContent>
          <Typography className="comment">
            {" "}
            But you know that sed ut perspiciatis unde omnis iste natus error
            sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae?
          </Typography>
          <div className="likes-replies">
            <span className="timeline-replies">234replies</span>
            <span className="timeline-likes">2K likes</span>
          </div>
        </div>
      </TimelineItem>

      {/* 2nd Part  */}
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector className="timeline-connecter" />

          <img src={TimelineDP} className="img-accordion" alt="" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineSeparator></TimelineSeparator>
        <div className="comments-likes-replies ">
          <TimelineContent className="commenter-name">
            Johan Doue
          </TimelineContent>
          <Typography className="comment">
            {" "}
            But you know that sed ut perspiciatis unde omnis iste natus error
            sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae?
          </Typography>
          <div className="likes-replies">
            <span className="timeline-replies">23replies</span>
            <span className="timeline-likes">2 likes</span>
          </div>
        </div>
      </TimelineItem>

      {/* 3rd Part */}

      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector className="timeline-connecter" />

          <img src={TimelineDP2} className="img-accordion" alt="" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineSeparator></TimelineSeparator>
        <div className="comments-likes-replies ">
          <TimelineContent className="commenter-name">
            Anthony Jackson
          </TimelineContent>
          <Typography className="comment">
            {" "}
            But you know that sed ut perspiciatis unde omnis iste natus error
            sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae?
          </Typography>
          <div className="likes-replies">
            <span className="timeline-replies">23replies</span>
            <span className="timeline-likes">2 likes</span>
          </div>
        </div>
      </TimelineItem>
    </Timeline>
  );
}
