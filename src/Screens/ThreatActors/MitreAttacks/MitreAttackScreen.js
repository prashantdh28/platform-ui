import React, { useCallback, useContext, useEffect } from "react";
import InputChips from "../../../Components/Chips/InputChips/InputChips";
import BreadCrumb from "../../../Components/BreadCrumb/BreadCrumb";
import { useNavigate } from "react-router-dom";
import MitreAttacks from "../../../Components/MitreAttacks/MitreAttacks";
import { useDispatch, useSelector } from "react-redux";
import { getMitreData } from "../../../Services/Mitre/mitreAttack.service";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import { ActorIdContext } from "../../../Context/context";
import "./MitreAttackScreen.css";
import { resetMitreAttackData } from "../../../redux/Slice/mitreSlice";
import { ColorOptions, TextColor } from "../../../Constants/Constant";
import DynamicButton from "../../../Components/Button/ButtonBox";

const MitreAttackScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { actorIds, setActorIds } = useContext(ActorIdContext);
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const { mitreData, mitreLoading } = useSelector((state) => state.mitre);
  const { entities = [], content } = mitreData;

  const getMitreAttackData = useCallback(async () => {
    if (actorIds && actorIds.length > 0) {
      await dispatch(getMitreData({ selectedIds: actorIds }));
    }
  }, [actorIds, dispatch]);

  useEffect(() => {
    if (actorIds && actorIds.length >= 2) {
      getMitreAttackData();
    }
    return () => {
      dispatch(resetMitreAttackData());
    };
  }, [getMitreAttackData, dispatch, actorIds]);

  const handleClick = () => {
    navigate("/courseofaction");
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
              <div className="mitre-table-container">
                  <div className="report-table-header">
                      <div className="report-activity-text">
                          <span className="ttp-defend-text">MITRE ATT&CK TTPs</span>
                          <span id="TTP-chips" style={{ color: "red" }}>
                              {entities && entities.length > 0 && (
                                  <div className="TTP-chips">
                                      <InputChips
                                          chipsData={entities}
                                          onDelete={onDelet}
                                          deleteEnable={entities.length > 2}
                                          className="TTP-chips"
                                          id="TTP-chips"
                                      />
                                  </div>
                              )}
                          </span>
                      </div>
                      <DynamicButton
                          className="download-button"
                          onClick={handleClick}
                          label="Course of Action"
                          style={{
                              backgroundColor: BackgroundColor,
                              color:
                                  BackgroundColor === ColorOptions.YELLOW ? TextColor.BLACK : TextColor.WHITE,
                          }}
                      ></DynamicButton>
                  </div>
                  <div className="mitre-attacks-table">
                      {mitreLoading && <SpinnerLoader />}
                      {mitreData && mitreData.content && mitreData.content.length > 0 && (
                          <MitreAttacks data={content} />
                      )}
                      {!mitreLoading &&
                          (!mitreData || !mitreData.content || mitreData.content.length <= 0) && (
                              <p className="noData">No Data Found</p>
                          )}
                  </div>
              </div>
          </div>
      </>
  );
};

export default MitreAttackScreen;
