import React, { useCallback, useContext, useEffect } from "react";
import BreadCrumb from "../../../Components/BreadCrumb/BreadCrumb";
import CompareTable from "../../../Components/Tables/CompareTables/CompareTable";
import InputChips from "../../../Components/Chips/InputChips/InputChips";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CourseOfAction.css";
import { getCourceOfActionData } from "../../../Services/COA/coa.service";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import { ActorIdContext } from "../../../Context/context";
import { resetCourceOfActionData } from "../../../redux/Slice/coaSlice";
import DynamicButton from "../../../Components/Button/ButtonBox";
import { ColorOptions, TextColor } from "../../../Constants/Constant";

const CourseOfAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { actorIds, setActorIds } = useContext(ActorIdContext);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const { courceOfActionData, courceOfActionLoading } = useSelector(
    (state) => state.courceOfAction
  );

  const { entities } = courceOfActionData;

  const getCourceOfAction = useCallback(async () => {
    if (actorIds && actorIds.length > 0) {
      await dispatch(getCourceOfActionData({ selectedIds: actorIds }));
    }
  }, [actorIds, dispatch]);

  useEffect(() => {
    if (actorIds && actorIds.length >= 2) {
      getCourceOfAction();
    }
    return () => {
      dispatch(resetCourceOfActionData());
    };
  }, [getCourceOfAction, dispatch, actorIds]);

  const handleClickDownload = () => {
    navigate("/finish");
  };
  const onDelet = (text) => {
    if (actorIds && actorIds.length > 2) {
      const deleteItem =
        actorIds &&
        actorIds.length > 0 &&
        actorIds.find((actorId) => actorId.name === text);
      const newActorIds = actorIds.filter(
        (id) => id.actorId !== deleteItem.actorId
      );
      setActorIds(newActorIds);
    } else {
      alert("You cant delete more items");
    }
  };

  return (
    <>
      <div className="compare-screen-main">
        <BreadCrumb />
        <br />
        <div className="parent-compare-screen">
          <div className="report-table-header">
            <div className="report-activity-text">
              <span className="ttp-defend-text">TTP and Defend</span>
              <span id="TTP-chips">
                {entities && entities.length > 0 && (
                  <InputChips
                    chipsData={entities}
                    onDelete={onDelet}
                    deleteEnable={entities.length > 2}
                  />
                )}
              </span>
            </div>
            <DynamicButton
              className="download-button"
              onClick={handleClickDownload}
              label="Download"
              style={{
                backgroundColor: BackgroundColor,
                color:
                  BackgroundColor === ColorOptions.YELLOW
                    ? TextColor.BLACK
                    : TextColor.WHITE,
              }}
            />
          </div>
          {courceOfActionLoading && <SpinnerLoader />}
          {courceOfActionData &&
            courceOfActionData.content &&
            courceOfActionData.content.length > 0 && (
              <CompareTable data={courceOfActionData.content} />
            )}
          {!courceOfActionLoading &&
            (!courceOfActionData ||
              !courceOfActionData.content ||
              courceOfActionData.content.length <= 0) && (
              <p className="noData">No Data Found</p>
            )}
        </div>
      </div>
    </>
  );
};

export default CourseOfAction;
