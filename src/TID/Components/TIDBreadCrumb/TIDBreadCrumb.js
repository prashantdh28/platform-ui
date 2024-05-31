import React, { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as Entity } from "../../../Assests/SVG/EntitiesLists.svg";
import { ReactComponent as AttackMatrix } from "../../../Assests/SVG/AttackComaprison.svg";
import { ReactComponent as COA } from "../../../Assests/SVG/COA.svg";
import { ReactComponent as RiskScore } from "../../../Assests/SVG/RiskScore.svg";
import { ReactComponent as Detection } from "../../../Assests/SVG/Detection.svg";
import { ReactComponent as Download } from "../../../Assests/SVG/DownloadReport.svg";
import { ReactComponent as Emulation } from "../../../Assests/SVG/Emulation.svg";
import { ColorOptions, TextColor } from "../../../Constants/Constant";
import useToastify from "../../../Hooks/useToastify";
import "./TIDBreadCrumb.css";

const TIDBreadCrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToastify();

  const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const threatCoverageID = useSelector((state) => state.threatCoverage.threatCoverageData).id;

  const selectedScreen = location?.pathname?.split("/")?.pop();
  const hideBreadCrumb = location.pathname.includes("/tid/single-entity");

  useEffect(() => {
    const getOtherClass = document.querySelectorAll(".nav-link");

    if (getOtherClass) {
      getOtherClass.forEach((BreadCrumbID) => {
        let breadCrumb = BreadCrumbID.querySelector("#threatInformedDefence");
        const paths = breadCrumb?.querySelectorAll("path");
        const text = breadCrumb?.querySelectorAll("text");

        if (selectedScreen && BreadCrumbID.id === selectedScreen) {
          const parentElemet = document.getElementsByClassName(
            "TID-Parent-breadcrumb"
          );
          if (
            selectedScreen === "detection" ||
            selectedScreen === "emulation"
          ) {
            parentElemet[0].style["align-items"] = "flex-end";
          } else if (
            selectedScreen === "risk-score" ||
            selectedScreen === "download"
          ) {
            parentElemet[0].style["align-items"] = "baseline";
          } else {
            parentElemet[0].style["align-items"] = "center";
          }

          if (threatCoverageID) BreadCrumbID.classList.add("active");
          paths?.forEach((path) => {
            path?.setAttribute("fill", BackgroundColor);
          });
          text?.forEach((each) => {
            each?.setAttribute(
              "fill",
              BackgroundColor === ColorOptions.YELLOW
                ? TextColor.BLACK
                : TextColor.WHITE
            );
          });
        } else {
          BreadCrumbID.classList.remove("active");
          paths?.forEach((path) => {
            path?.setAttribute("fill", "var(--breadcrumb-backside-color)");
          });
          text?.forEach((each) => {
            each?.setAttribute("fill", "var(--name-email)");
          });
        }

        if (entityIDs && entityIDs.length < 1) {
          BreadCrumbID.classList.remove("active");
          BreadCrumbID.classList.add("disabled");
          BreadCrumbID.disabled = true;
        }
        if (entityIDs && entityIDs.length >= 1) {
          if (BreadCrumbID.id === "risk-score" && !threatCoverageID) {
            BreadCrumbID.classList.add("disabled");
            BreadCrumbID.disabled = true;
          } else {
            BreadCrumbID.classList.remove("disabled");
            BreadCrumbID.disabled = false;
          }
        }
      });
    }
  }, [
    BackgroundColor,
    selectedScreen,
    entityIDs,
    navigate,
    showToast,
    threatCoverageID,
  ]);

  const onNavigateClick = (event, nav) => {
    // event.preventDefault();
    // if (event.target) {
    navigate(nav);
    // }
  };

  return (
    <>
      {!hideBreadCrumb && (
        <div className="TID-Parent-breadcrumb">
          <button
            className="nav-link"
            id="tid"
            onClick={(event) => onNavigateClick(event, "/tid")}
          >
            <Entity id="threatInformedDefence" />
          </button>

          <button
            className="nav-link"
            id="attack"
            onClick={(event) => onNavigateClick(event, "attack")}
          >
            <AttackMatrix id="threatInformedDefence" />
          </button>

          <button
            className="nav-link"
            id="threat-coverage"
            onClick={(event) => onNavigateClick(event, "threat-coverage")}
          >
            <COA id="threatInformedDefence" />
          </button>

          <div className="TID-RiskDetection">
            <button
              className="nav-link"
              id="risk-score"
              onClick={(event) => onNavigateClick(event, "risk-score")}
            >
              <RiskScore id="threatInformedDefence" />
            </button>

            <button
              className="nav-link"
              id="detection"
              onClick={(event) => onNavigateClick(event, "detection")}
            >
              <Detection id="threatInformedDefence" />
            </button>
          </div>

          <div className="Tid-Download-Emulation">
            <button
              className="nav-link"
              id="download"
              onClick={(event) => onNavigateClick(event, "download")}
            >
              <Download id="threatInformedDefence" />
            </button>

            <button
              className="nav-link"
              id="emulation"
              //   onClick={(event) => onNavigateClick(event, "/")}
            >
              <Emulation id="threatInformedDefence" />
            </button>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default TIDBreadCrumb;
