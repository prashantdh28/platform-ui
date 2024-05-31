import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { getPercentageColor } from "../../../../../helper/percentageColorHelper";
import { AiOutlineClose } from "react-icons/ai";

const ThreatScoreModal = ({ children, threatScoreData }) => {
  const [open, setOpen] = useState(false);
  const [overallData, setOverallData] = useState({});
  const [defensesdata, setDefensesData] = useState({});
  const [mitigationsdata, setMitigationsData] = useState({});
  const [controlsdata, setControlsData] = useState({});

  const handleOpen = async () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let overall = {};
    let defenses = {};
    let mitigations = {};
    let controls = {};
    for (let i = 0; i < threatScoreData?.overall?.length; i++) {
      const elementOverall = threatScoreData.overall[i];
      const elementDefenses = threatScoreData.defenses[i];
      const elementMitigations = threatScoreData.mitigations[i];
      const elementControls = threatScoreData.controls[i];
      overall = {
        ...overall,
        [elementOverall.state]: elementOverall.count,
      };
      defenses = {
        ...defenses,
        [elementDefenses.state]: elementDefenses.count,
      };
      mitigations = {
        ...mitigations,
        [elementMitigations.state]: elementMitigations.count,
      };
      controls = {
        ...controls,
        [elementControls.state]: elementControls.count,
      };
    }
    setOverallData(overall);
    setDefensesData(defenses);
    setControlsData(controls);
    setMitigationsData(mitigations);
  }, [threatScoreData]);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        maxWidth="47.8125rem"
      >
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span style={{ color: "var(--name-email)" }}>Threat Score</span>
          {/* <span
            className="e-icons e-close"
            style={{ cursor: "pointer", color: "var(--grey-color)" }}
            onClick={handleClose}
          /> */}
          <AiOutlineClose
            className="TID-dialouge-close-icon"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <table className="threateScoreTable">
            <thead>
              <tr className="threateScoreTableRow">
                <th>&nbsp;</th>
                <th>IN PLACE</th>
                <th>IN PROGRESS</th>
                <th>NOT APPLICABLE</th>
                <th>NOT IN PLACE</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className="threateScoreTableRow"
                style={{
                  background: getPercentageColor(
                    threatScoreData?.coverage_score
                  ),
                }}
              >
                <td>
                  OVERALL {"("}
                  {threatScoreData.coverage_score}
                  {"%)"}
                </td>
                <td>{overallData.IN_PLACE}</td>
                <td>{overallData.IN_PROGRESS}</td>
                <td>{overallData.NOT_APPLICABLE}</td>
                <td>{overallData.NOT_IN_PLACE}</td>
              </tr>
              <tr
                className="threateScoreTableRow"
                style={{
                  background: getPercentageColor(
                    threatScoreData?.control_coverage_score
                  ),
                }}
              >
                <td>
                  CONTROLS {"("}
                  {threatScoreData.control_coverage_score}
                  {"%)"}
                </td>
                <td>{controlsdata.IN_PLACE}</td>
                <td>{controlsdata.IN_PROGRESS}</td>
                <td>{controlsdata.NOT_APPLICABLE}</td>
                <td>{controlsdata.NOT_IN_PLACE}</td>
              </tr>
              <tr
                className="threateScoreTableRow"
                style={{
                  background: getPercentageColor(
                    threatScoreData?.defense_coverage_score
                  ),
                }}
              >
                <td>
                  DEFENSES {"("}
                  {threatScoreData.defense_coverage_score}
                  {"%)"}
                </td>
                <td>{defensesdata.IN_PLACE}</td>
                <td>{defensesdata.IN_PROGRESS}</td>
                <td>{defensesdata.NOT_APPLICABLE}</td>
                <td>{defensesdata.NOT_IN_PLACE}</td>
              </tr>
              <tr
                className="threateScoreTableRow"
                style={{
                  background: getPercentageColor(
                    threatScoreData?.mitigation_coverage_score
                  ),
                }}
              >
                <td>
                  MITIGATIONS {"("}
                  {threatScoreData.mitigation_coverage_score}
                  {"%)"}
                </td>
                <td>{mitigationsdata.IN_PLACE}</td>
                <td>{mitigationsdata.IN_PROGRESS}</td>
                <td>{mitigationsdata.NOT_APPLICABLE}</td>
                <td>{mitigationsdata.NOT_IN_PLACE}</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
            borderRightColor: "red",
          }}
        >
          <ButtonComponent
            cssClass="e-outline rule-dialog-buttons"
            onClick={handleClose}
            style={{ color: "var(--name-email)" }}
          >
            Cancel
          </ButtonComponent>

          {/* <DynamicButton label="Save" onClick={handleClose} /> */}
        </DialogActions>
        {/* </DialogComponent> */}
      </Dialog>
    </>
  );
};

export default ThreatScoreModal;
