import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as FirstBreadCrumb } from "../../Assests/SVG/FirstBreadcrumb.svg";
import { ReactComponent as MiddleBreadCrumb } from "../../Assests/SVG/Steps.svg";
import { ReactComponent as CourseAction } from "../../Assests/SVG/StepsCopy.svg";
import { ReactComponent as LastBreadCrumb } from "../../Assests/SVG/LastBreadcrumb.svg";
import { ColorOptions, TextColor } from "../../Constants/Constant";
import { ActorIdContext } from "../../Context/context";
import useToastify from "../../Hooks/useToastify";
import "./BreadCrumb.css";

const BreadCrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { actorIds } = useContext(ActorIdContext);
  const { showToast } = useToastify();

  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

  const selectedScreen = location?.pathname?.split("/")?.pop();

    useEffect(() => {
      const getOtherClass = document.querySelectorAll(".nav-link");
      let breadCrumb;
      getOtherClass.forEach((BreadCrumbID) => {
        if (selectedScreen && BreadCrumbID.id === selectedScreen) {
          if (actorIds && actorIds.length < 2) {
            navigate("/");
            showToast("Please select atleast 2 actors", { type: "warn" });
          }
          BreadCrumbID.classList.add("active");
          breadCrumb = BreadCrumbID.querySelector("#adversary");
        } else if (!selectedScreen && BreadCrumbID.id === "adversaryLists") {
          BreadCrumbID.classList.add("active");
          breadCrumb = BreadCrumbID.querySelector("#adversary");
        } else if (actorIds && actorIds.length < 2) {
          BreadCrumbID.classList.remove("active");
          BreadCrumbID.classList.add("disabled");
        } else if (actorIds && actorIds.length >= 2) {
          BreadCrumbID.classList.remove("disabled");
        }
      });
      const paths = breadCrumb?.querySelectorAll("path");
      paths.forEach((path) => {
        path?.setAttribute("fill", BackgroundColor);
      });
      const text = breadCrumb?.querySelectorAll("text");
      text.forEach((each) => {
        each?.setAttribute(
          "fill",
          BackgroundColor === ColorOptions.YELLOW
            ? TextColor.BLACK
            : TextColor.WHITE
        );
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [BackgroundColor, selectedScreen, navigate, actorIds]);

  const onNavigateClick = (event, nav) => {
    event.preventDefault();
    if (event.target) {
      navigate(nav);
    }
  };

  return (
      <div className="parent-breadcrumb">
          <span className="nav-link" id="adversaryLists" onClick={(event) => onNavigateClick(event, "/")}>
              <FirstBreadCrumb />
          </span>

          <span className="nav-link" id="compare" onClick={(event) => onNavigateClick(event, "/compare")}>
              <MiddleBreadCrumb />
          </span>

          <span
              className="nav-link"
              id="courseofaction"
              onClick={(event) => onNavigateClick(event, "/courseofaction")}
          >
              <CourseAction />
          </span>

          <span className="nav-link" id="finish" onClick={(event) => onNavigateClick(event, "/finish")}>
              <LastBreadCrumb />
          </span>
      </div>
  );
};

export default BreadCrumb;
