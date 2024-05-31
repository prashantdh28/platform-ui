import { Divider, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as DialpadOff } from "../../../../Assests/SVG/DialpadOff.svg";
import { ReactComponent as DialpadOn } from "../../../../Assests/SVG/DialpadOn.svg";
import { renderNewIcon } from "../../../../helper/IconRenderer";
import CustomMarkdownTag from "../../../../Components/Markdown/CustomMarkDown";

const Techniques = ({ subTechniques, index, name, usage, id, entities }) => {
  const [subTech, setSubTech] = useState(false);
  const openSubTech = (e) => {
    setSubTech(!subTech);
  };
  const borderClass = subTechniques?.length > 0;

  return (
      <Tooltip
          title={
              <CustomMarkdownTag
                  content={
                      !!usage
                          ? usage.map(({ name, usage }) => `<br>${name}:<br>${usage}`).join("\n\n")
                          : "no usage available"
                  }
                  customClassNames="intel-technique-tooltip"
              />
          }
      >
          <div className="intel-technique-container" key={index}>
              <div className="intel-technique-name-img">
                  <div>
                      {/* T1123 - Search Closed Sources */}
                      {`${id} - ${name}`}
                  </div>
                  <div
                      className={borderClass ? "intel-dialpad-svg" : "intel-dialpad-close-svg"}
                      onClick={(e) => openSubTech(e)}
                  >
                      {subTech && borderClass ? <DialpadOff /> : <DialpadOn />}
                  </div>
              </div>
              <div className="render-new-icon-box">
                  {entities && entities?.length > 0
                      ? entities?.map((icon, index) => <span key={index}>{renderNewIcon(icon?.type)}</span>)
                      : ""}
              </div>
              {subTech && subTechniques && subTechniques.length > 0 ? (
                  <div>
                      <Divider
                          orientation="horizontal"
                          sx={{ height: "100%", background: "rgba(255, 255, 255, 0.24)" }}
                      />

                      {subTech && subTechniques && subTechniques.length > 0 ? (
                          <div className="main-box-subtech">
                              <Divider
                                  orientation="horizontal"
                                  sx={{
                                      height: "100%",
                                      background: "rgba(255, 255, 255, 0.24)",
                                  }}
                              />

                              {subTechniques.map((child, childIndex) => {
                                  const isUsed = child?.entities && child?.entities.length > 0;
                                  return (
                                      <>
                                          <div
                                              key={childIndex}
                                              className={
                                                  isUsed
                                                      ? "intel-mtr-subtech-name-isUsed"
                                                      : "intel-mtr-subtech-name"
                                              }
                                          >
                                              <div>{child.id + "-" + child.name}</div>
                                          </div>
                                      </>
                                  );
                              })}
                          </div>
                      ) : (
                          ""
                      )}
                  </div>
              ) : (
                  ""
              )}
          </div>
      </Tooltip>
  );
};
export default Techniques;
