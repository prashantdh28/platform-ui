import React, { useCallback, useEffect, useState } from "react";
import CustomChip from "../../../../Components/Custom/CustomChip";
import CustomSelect from "../../../../Components/Custom/CustomSelect";
import { Checkbox } from "@mui/material";
import MitreAttacksData from "./MitreAttacksData";
import { ReactComponent as ConnectedIcon } from "../../../../Assests/SVG/connected.svg";
import { useDispatch, useSelector } from "react-redux";
import { resetAttackMatrixData } from "../../../../redux/Slice/TID/AttackMatrixSlice";
import { getAttackMatrix } from "../../../../Services/TID/attackMatrix.service";
const MitreAttackScreen = ({
  //   entities,
  onDeleteTag,
  //   domains,
  domain,
  setDomain,
  isChecked,
  onButtonClick,
  //   attackMatrixLoading,
  //   attackMatrixContent,
  onDomainSelect,
  handleCheckboxChange,
}) => {
  const dispatch = useDispatch();
  const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
  const { attackMatrixData, attackMatrixLoading } = useSelector(
    (state) => state.attackMatrix
  );
  const { entities = [], domains = [] } = attackMatrixData;
  const [attackMatrixContent, setAttackMatrixContent] = useState([]);
  const getMitreAttackData = useCallback(
    async ({ compress = false }) => {
      if (entityIDs && entityIDs.length > 0) {
        const response = await dispatch(
          getAttackMatrix({ selectedIds: entityIDs, compress })
        ).unwrap();
        if (response) {
          setAttackMatrixContent(response.content || []);
        }
      }
    },
    [entityIDs, dispatch]
  );
  useEffect(() => {
    if (entityIDs && entityIDs.length >= 1) {
      getMitreAttackData({ compress: isChecked });
    }
    return () => {
      dispatch(resetAttackMatrixData());
    };
  }, [getMitreAttackData, dispatch, entityIDs, isChecked]);
  return (
    <div className="intel-mtr-container">
      <div className="intel-mtr-header">
        <div className="intel-mtr-text">
          <span className="mtr-atc-ttp-text">MITRE ATT&CK TTPs</span>
          <span id="TTP-chips" style={{ color: "red" }}>
            {/* {entities && entities.length > 0 && ( */}
            <div className="TTP-chips">
              {/* <Box> */}
              {entities && entities?.length > 0
                ? entities.map((chip, index) => {
                    return (
                      <CustomChip
                        isDeletable={entities.length > 1}
                        key={index}
                        onDelete={onDeleteTag}
                        data={{ label: chip?.name }}
                        borderstyle={chip?.color}
                        color={chip?.color}
                      />
                    );
                  })
                : ""}
              {/* </Box> */}
            </div>
            {/* )} */}
          </span>
        </div>

        <div className="mtr-header-rightside">
          <div>
            <CustomSelect
              placeholder="Domains"
              menuItems={domains}
              handleChange={onDomainSelect}
              selectedMenuItems={domain}
              setSelectedMenuItems={setDomain}
              bordercolor="rgba(255, 255, 255, 0.24)"
            />
          </div>

          <div className="checkbox-compress">
            <Checkbox
              // className="compress-checkbox"
              name="compress"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className={`${
                isChecked ? "compress-checkbox-selected" : "compress-checkbox"
              }`}
            />
            <div>Compress</div>
          </div>
          <div className="intel-connected-svg" onClick={() => onButtonClick()}>
            <ConnectedIcon />
          </div>
        </div>

        {/* <DynamicButton
className="TID-COA-btn"
label="Threat Coverage"
to="/tid/threat-coverage"
/> */}
      </div>
      <div className="intel-mtr-table">
        {/* {mitreLoading && <SpinnerLoader />} */}
        {/* {mitreData && mitreData.content && mitreData.content.length > 0 && ( */}
        <MitreAttacksData
          attackMatrixLoading={attackMatrixLoading}
          data={attackMatrixContent}
        />
        {/* )} */}
        {/* {!mitreLoading &&
    (!mitreData || !mitreData.content || mitreData.content.length <= 0) && (
        <p className="noData">No Data Found</p>
    )} */}
      </div>
    </div>
  );
};

export default MitreAttackScreen;
