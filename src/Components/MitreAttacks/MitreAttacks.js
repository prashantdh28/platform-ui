import React, { useEffect } from "react";
// import Enable from "../../SVG/FrameE.svg";
// import Disable from "../../SVG/FrameD.svg";
import { ReactComponent as SquareIcon } from "../../Assests/SVG/squer.svg";
import { ReactComponent as EnableIcon } from "../../Assests/SVG/FrameE.svg";
import { ReactComponent as DisableIcon } from "../../Assests/SVG/FrameD.svg";
import { useSelector } from "react-redux";
import { ColorOptions, TextColor } from "../../Constants/Constant";
import "./MitreAttacks.css";
import CustomMarkdownTag from "../Markdown/CustomMarkDown";
import { Tooltip } from "@mui/material";

const BASE_CLASS = "base";

const MitreAttacks = ({ data, isEntities = true, isSingle = false }) => {
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

  useEffect(() => {
    const handleBoxClick = (event) => {
      const box = event.currentTarget;
      const childContainer = box.parentElement.querySelector(".children");

      if (childContainer) {
        const subTechniques = childContainer.querySelectorAll(".isUsed");
        if (subTechniques.length > 0) {
          box.classList.toggle("selected");
          if (box.classList.contains("selected")) {
            // Apply the background color to the parent box and its children
            box.style.backgroundColor = BackgroundColor;
            const box1Element = box.querySelector(".box1");
            if (box1Element) {
              box1Element.style.backgroundColor = BackgroundColor;
            }
            subTechniques.forEach((child) => {
              child.style.backgroundColor = BackgroundColor;
            });
          } else {
            // Reset the background color
            box.style.backgroundColor = "";
            const box1Element = box.querySelector(".box1");
            if (box1Element) {
              box1Element.style.backgroundColor = "";
            }
            subTechniques.forEach((child) => {
              child.style.backgroundColor = "";
            });
          }

          childContainer.classList.toggle("enabled");
        }
      }
    };

    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("click", handleBoxClick);
    });

    return () => {
      boxes.forEach((box) => {
        box.removeEventListener("click", handleBoxClick);
      });
    };
  }, [data, BackgroundColor]);

  return (
    <div className={`${BASE_CLASS}`}>
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          const { tactic_name, techniques } = item;

          return (
            <div key={index}>
              <span className="mitre-header" key={index}>
                {tactic_name}
              </span>
              <div className="tech">
                {techniques && techniques.length} technique
              </div>
              {techniques &&
                techniques.length > 0 &&
                techniques?.map((val, index) => {
                  const {
                    sub_techniques: subTechniques,
                    name,
                    id,
                    entities,
                    usage,
                  } = val;

                  return (
                    <div key={index} className="box-container">
                      <Tooltip
                        title={
                          <CustomMarkdownTag
                            content={
                              !!usage
                                ? usage
                                    .map(
                                      ({ name, usage }) =>
                                        `<br>${name}:<br>${usage}`
                                    )
                                    .join("\n\n")
                                : "No Usage Available"

                              // ? [...(usage || [])]
                              //     .map(({ usage }) => usage)
                              //     .join("\n ")
                              // : "No Usage Available"
                              //   usage
                              //     ?.map(
                              //       ({ name, usage }) =>
                              //         `**${name}:** ${usage}`
                              //     )
                              //     .join("\n")
                              // : "No Usage Available"
                            }
                            customClassNames="Tooltipsize"
                          />
                        }
                      >
                        <div
                          key={index}
                          className={`box ${
                            subTechniques < 0 ? "selected" : ""
                          }`}
                          style={{
                            color:
                              BackgroundColor === ColorOptions.YELLOW &&
                              TextColor.BLACK,
                          }}
                        >
                          <div className="box-antity">
                            <div className={`box1`}>
                              {/* <span> {name}</span> */}
                              <span>{`${id} - ${name}`}</span>

                              {/* <div className="child-count">
                                                                {subTechniques ? subTechniques.length : 0}
                                                                /20
                                                            </div> */}
                            </div>
                            <div className="antitiyShape">
                              {isEntities &&
                                entities &&
                                entities.length > 0 &&
                                entities.map((item, index) => {
                                  return (
                                    <div style={{ width: "1rem" }} key={index}>
                                      <SquareIcon fill={`${item?.color}`} />
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          {subTechniques.length !== 0 ? (
                            <EnableIcon
                              fill={BackgroundColor}
                              // style={{ height: "auto" }}
                            />
                          ) : (
                            <DisableIcon fill={BackgroundColor} />
                          )}
                        </div>
                      </Tooltip>

                      {subTechniques && (
                        <div className="children">
                          {subTechniques.map((child, childIndex) => {
                            const isUsed =
                              child?.entities && child?.entities.length > 0;
                            return (
                              <div
                                key={childIndex}
                                className={`child ${isUsed ? "isUsed" : ""}`}
                              >
                                {isUsed && !isSingle ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "0.5rem",
                                    }}
                                  >
                                    {child?.entities.map((item, index) => {
                                      return (
                                        <div
                                          style={{
                                            width: "1rem",
                                          }}
                                          key={index}
                                        >
                                          <SquareIcon fill={`${item?.color}`} />
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  ""
                                )}
                                {child.id + "-" + child.name}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default MitreAttacks;
