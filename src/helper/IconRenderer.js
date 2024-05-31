// IconRenderer.js
import React from "react";
import { ReactComponent as GROUP } from "../Assests/SVG/GroupIcon.svg";
import { ReactComponent as Actor } from "../Assests/SVG/ActorIcon.svg";
import { ReactComponent as Malware } from "../Assests/SVG/MalwareIcon.svg";
import { ReactComponent as Tool } from "../Assests/SVG/ToolIcon.svg";
import { ReactComponent as Vulner } from "../Assests/SVG/VulnerIcon.svg";
import { ReactComponent as Report } from "../Assests/SVG/ReportIcon.svg";
import { ReactComponent as Campeign } from "../Assests/SVG/CampeignIcon.svg";
import { ReactComponent as GROUPIcon } from "../Assests/SVG/NewEntitiesSvg/GroupIconSvg.svg";
import { ReactComponent as ActorIcon } from "../Assests/SVG/NewEntitiesSvg/ActorIconSvg.svg";
import { ReactComponent as MalwareIcon } from "../Assests/SVG/NewEntitiesSvg/MalwareIconSvg.svg";
import { ReactComponent as ToolIcon } from "../Assests/SVG/NewEntitiesSvg/ToolIconSvg.svg";
import { ReactComponent as VulnerIcon } from "../Assests/SVG/NewEntitiesSvg/VulnerIconSvg.svg";
import { ReactComponent as ReportIcon } from "../Assests/SVG/NewEntitiesSvg/ReportIconSvg.svg";
import { ReactComponent as CampeignIcon } from "../Assests/SVG/NewEntitiesSvg/CampeignIconSvg.svg";

export const renderIcon = (type) => {
  switch (type) {
    case "intrusion-set":
      return <GROUP />;
    case "group":
      return <GROUP />;
    case "threat-actor":
      return <Actor />;
    case "malware":
      return <Malware />;
    case "tool":
      return <Tool />;
    case "vulnerability":
      return <Vulner />;
    case "report":
      return <Report />;
    case "campaign":
      return <Campeign />;
    default:
      return null;
  }
};

export const renderNewIcon = (type) => {
    switch (type) {
        case "intrusion-set":
            return <GROUPIcon />;
        case "group":
            return <GROUPIcon />;
        case "threat-actor":
            return <ActorIcon />;
        case "malware":
            return <MalwareIcon />;
        case "tool":
            return <ToolIcon />;
        case "vulnerability":
            return <VulnerIcon />;
        case "report":
            return <ReportIcon />;
        case "campaign":
            return <CampeignIcon />;
        default:
            return null;
    }
};