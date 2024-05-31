import React, { useState } from "react";
import Picture from "../../Assests/Img/images.jpg";
import TimeLine from "../TimeLine/TimeLine";
import pencilicon from "../../Assests/SVG/edit.svg";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useSelector } from "react-redux";
import { ColorOptions, TextColor } from "../../Constants/Constant";
import "./SocialRead.css";
// import { useLocation } from "react-router-dom";
// import { getChannalMessage } from "../../Services/Activity/activity.service";

const SocialRead = () => {
  const [selectedColor] = useState(null);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  // const location = useLocation();
  // const { id } = location.state;s
  // const getMessageData = useCallback(async () => {
  //     const response = await getChannalMessage(id);
  //     console.log(response, "getChannalMessage");
  // }, [id]);
  // useEffect(() => {
  //     console.log("Entered");
  //     getMessageData();
  // }, [getMessageData]);

  return (
      <>
          <div className="social-main-container">
              <div className="chips-social">
                  <div className="border-div">
                      <div className="img-name-details">
                          <img src={Picture} className="social-img" alt="" />

                          <div className="name-to-image">
                              <span className="social-profile-name">John Doue</span>
                              <span className="social-Image-uploaded">
                                  {/* <img src={shutter} className="shutter-img" alt="shutter" /> */}
                              </span>
                              <span className="social-description">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo
                                  doloribus facilis officiis sequi eius vitae consequuntur, dolor cumque illum
                                  eveniet eaque quae corporis quam dicta pariatur, non qui maiores accusantium
                                  porro nisi animi quo autem provident. Amet, officiis consequuntur.
                              </span>

                              <div className="social-likes-desc">
                                  <span className="social-replies">2,342 replies</span>
                                  <span className="social-likes">32K likes</span>
                              </div>

                              {/* pending starts */}
                              <div className=""></div>
                              <TimeLine />
                              {/* Pending end */}
                          </div>
                      </div>
                  </div>
                  <div className="threads-published-chips">
                      <div className="icon-desc">
                          <img src={pencilicon} alt="pencilion" />
                          <span id="created-tag"> John Doe created thread</span>
                      </div>
                      <div className="icon-desc-2">
                          <span className="Total-Threads">Total Threads:</span>
                          <span className="Thirty-four">34</span>
                      </div>

                      <div className="icon-desc-3">
                          <span className="Total-Threads">Published:</span>
                          <span className="Thirty-four"> 5th June 20:38</span>
                      </div>

                      <div className="icon-desc-4">
                          <ButtonComponent className="buttonCompo">Europe</ButtonComponent>
                          <ButtonComponent className="buttonCompo ">Germany</ButtonComponent>
                          <ButtonComponent className="buttonCompo">Germany</ButtonComponent>
                          <ButtonComponent className="noOfButton">+9</ButtonComponent>
                          <ButtonComponent
                              cssClass="e-info"
                              className="buttonPlus"
                              style={{
                                  backgroundColor: BackgroundColor || selectedColor,
                              }}
                          >
                              <span
                                  className="e-icons e-plus"
                                  style={{
                                      backgroundColor: BackgroundColor || selectedColor,
                                      color:
                                          BackgroundColor === ColorOptions.YELLOW
                                              ? TextColor.BLACK
                                              : TextColor.WHITE,
                                      height: "25px",
                                  }}
                              ></span>
                          </ButtonComponent>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
};

export default SocialRead;
