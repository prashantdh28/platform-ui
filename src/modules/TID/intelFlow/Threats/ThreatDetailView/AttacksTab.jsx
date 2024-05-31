import React from "react";
import MitreAttacksData from "../../Attacks-Matrix/MitreAttacksData";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";

const AttacksTab = () => {
  const { attackMatrixData, attackMatrixLoading } = useSelector(
    (state) => state.attackMatrix
  );
  const { content = [] } = attackMatrixData;
  return (
    <div className="report-tab-container">
      <div>ATT&CK TTPs</div>
      <Divider
        sx={{
          background: "#1E2B40",
          borderWidth: "1px",
        }}
      />
      <div className="intel-mtr-table">
        <MitreAttacksData
          attackMatrixLoading={attackMatrixLoading}
          data={content}
        />
      </div>
    </div>
  );
};

export default AttacksTab;
