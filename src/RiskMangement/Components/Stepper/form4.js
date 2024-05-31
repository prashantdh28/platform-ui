import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Square } from "../../../Assests/SVG/squer.svg";
import ButtonComponent from "../../../Components/Button/ButtonBox";
import Tabs from "../Tabs/form3Tab";
import {
  compareRiskProfile,
  updateRisk,
} from "../../../redux/Slice/riskManagementApiSlice";
import useToastify from "../../../Hooks/useToastify";
import { setForm2Data } from "../../../redux/Slice/riskManagementSlice";

const Form4 = ({
  handleBack,
  setmanageControlflag,
  setgenerateReportflag,
  handleNext,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { showToast } = useToastify();
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const { riskProfileData, formatAllData } = useSelector((state) => state.risk);
  const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (riskProfileData?.profile_type === "TARGET" && riskProfileData?.source_profile !== "" && id) {
            setTimeout(() => {
                dispatch(compareRiskProfile(id));
            }, 1000);
        }
    }, [dispatch, riskProfileData, id]);

  const handlePublish = () => {
    if (id) {
      dispatch(setForm2Data(formatAllData.business_objectives));
      dispatch(
        updateRisk(
          { form_id: 3, status: "PUBLISHED", ...formatAllData },
          id,
          navigate,
          showToast,
          "Risk Profile Published Successfully",
          true,
          handleNext()
        )
      );
    }
  };

  return (
    <div className="form4-main-container">
      <Tabs setp={3} isChecked={isChecked} />
      {isChecked && (
        <div className="color-define-container">
          <div className="color-define-div">
            <Square fill="#9BC6BA" width="1rem" />
            <p className="color-define-text">
              In Source Profile and Target Profile
            </p>
          </div>
          <div className="color-define-div">
            <Square fill="#F0BC37" width="1rem" />
            <p className="color-define-text">
              In Source Profile and Not In Target Profile
            </p>
          </div>
          <div className="color-define-div">
            <Square fill="#C62828" width="1rem" />
            <p className="color-define-text">
              Not In Source Profile and In Target Profile
            </p>
          </div>
          <div className="color-define-div">
            <Square
              fill="var(--risk-score-download-button-color)"
              width="1rem"
            />

            <p className="color-define-text">
              Not In Source Profile and Not In Target Profile
            </p>
          </div>
        </div>
      )}
      <div className="button-padding form1-btn-group">
        <div className="toggle-back-container">
          <div>
            <button
              style={{ display: "contents" }}
              className="footer-back-btn"
              onClick={() => {
                handleBack();
              }}
            >
              BACK
            </button>
          </div>

          {riskProfileData?.profile_type === "TARGET" &&
            riskProfileData?.source_profile && (
              <div className="switch-btn-div">
                <label style={{ padding: "10px 24px 10px 0" }}>
                  {" "}
                  Gap Analysis{" "}
                </label>
                <SwitchComponent
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                  }}
                ></SwitchComponent>
              </div>
            )}
        </div>
        <div className="save-next-btn-group">
          <button
            className="e-btn e-outline manage-control-btn"
            onClick={() => setmanageControlflag(true)}
          >
            MANAGE CONTROLS
          </button>
          <button
            type="button"
            className="e-btn e-outline save-btn"
            style={{
              borderRadius: "4px",
              color: BackgroundColor,
              borderColor: BackgroundColor,
            }}
            onClick={() => setgenerateReportflag(true)}
          >
            GENERATE REPORT
          </button>
          <button
            type="button"
            className="e-btn e-outline save-btn"
            style={{
              borderRadius: "4px",
              color: BackgroundColor,
              borderColor: BackgroundColor,
            }}
            onClick={() => {
              if (id) {
                dispatch(setForm2Data(formatAllData.business_objectives));
                dispatch(
                  updateRisk(
                    { form_id: 3, status: "DRAFT", ...formatAllData },
                    id,
                    navigate,
                    showToast,
                    "Risk Draft Saved Successfully",
                    true,
                    handleNext()
                  )
                );
              }
            }}
          >
            SAVE
          </button>
          <ButtonComponent
            onClick={handlePublish}
            label="PUBLISH"
            type="submit"
            id="sequrityFramework"
            className="e-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default Form4;
