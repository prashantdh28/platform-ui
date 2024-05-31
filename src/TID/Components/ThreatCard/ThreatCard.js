import React from "react";
import "./ThreatCard.css";
import { renderIcon } from "../../../helper/IconRenderer";
import { ClassNames } from "@emotion/react";

const ThreatCard = ({ data, index, isSelected, onRadioChange }) => {
  const handleRadioClick = () => {
    onRadioChange(isSelected ? null : { ...data, id: index });
  };

  return (
    <>
      <ClassNames>
        {({ cx }) => (
          <div
            className={cx("DC_threat_card", isSelected ? "showDesc" : "")}
            onClick={handleRadioClick}
          >
            <div className={cx("DC_threat_card_header")}>
              <div className="DC_threat_card_IconAndName">
                <div className="DC_icon">{renderIcon(data.type)}</div>
                <h3>{data.name}</h3>
              </div>
              <div>
                <span>
                  <input
                    type="radio"
                    className="DC_checkbox"
                    checked={isSelected}
                    onChange={handleRadioClick}
                  />
                </span>
              </div>
            </div>
            <div className="DC_threat_card_desc">
              <p className={`DC_fullDes`}>{data?.description}</p>
            </div>
          </div>
        )}
      </ClassNames>
    </>
  );
};

export default ThreatCard;
