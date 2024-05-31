import React, { useCallback, useEffect } from "react";
import MitreAttacks from "../../MitreAttacks/MitreAttacks";
import { useParams } from "react-router-dom";
import { getMitreData } from "../../../Services/Mitre/mitreAttack.service";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoader from "../../Loader/SpinnerLoader";
import "./TabMitre.css";

const TabMitreTable = () => {
  const dispatch = useDispatch();
  const { actorId } = useParams();
  const { mitreData, mitreLoading } = useSelector((state) => state.mitre);

  const { content } = mitreData;
  const getMitreAttackData = useCallback(async () => {
    if (actorId) {
      await dispatch(getMitreData({ selectedIds: [{ actorId }] }));
    }
  }, [actorId, dispatch]);

  useEffect(() => {
    getMitreAttackData();
  }, [getMitreAttackData]);

  useEffect(() => {}, []);
  return (
      <>
          <div className="table-bg">
              <div className="activity-text">
                  <h2 id="activity">MITRE ATT&CK TTPs </h2>
                  {/* <div className="top-table-search-dropdown">
                      <Searchbar />
                      <DropDownTree />
                  </div> */}
              </div>
              <div className="mitre-table-bg">
                  {mitreLoading && <SpinnerLoader />}
                  {mitreData && mitreData.content && mitreData.content.length > 0 ? (
                      <MitreAttacks data={content} isEntities={false} isSingle={true} />
                  ) : (
                      <p className="noData">No Data Found</p>
                  )}
              </div>
          </div>
      </>
  );
};

export default TabMitreTable;
