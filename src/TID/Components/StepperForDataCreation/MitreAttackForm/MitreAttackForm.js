import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { AttackMatrixData } from "../AttackMatrixData";
import { ClassNames } from "@emotion/react";
import { FormHelperText } from "@mui/material";
import SpinnerLoader from "../../../../Components/Loader/SpinnerLoader";
import { getEmptyAttackMatrix } from "../../../../Services/TID/attackMatrix.service";
import SubTechniqueBox from "./SubTechniqueBox";

// import SubTechniqueBoxDialog from "./SubTechniqueBoxDialog";

const MitreAttackForm = ({
  setExpandMitre,
  expandMitre,
  onFormValueChange,
  formik,
}) => {
  const dispatch = useDispatch();

  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const { attackMatrixData, attackMatrixLoading } = useSelector(
    (state) => state.attackMatrix
  );
  const { content = [] } = attackMatrixData;

  const handleExpand = () => {
    setExpandMitre(!expandMitre);
  };

  useEffect(() => {
    if (!content.length > 0) {
      dispatch(getEmptyAttackMatrix());
    }
  }, [dispatch, content]);

  return (
    <>
      <ClassNames>
        {({ css, cx }) => (
          <div>
            <div className="mitre_attack_container">
              {Boolean(formik.errors.techniques) ? (
                <FormHelperText error>
                  {formik.errors.techniques}
                </FormHelperText>
              ) : (
                ""
              )}
              <div className="mitre_attack_container_header">
                <div className="header_section">
                  <h3 className="head">Mitre Attack Navigation</h3>
                  <span className="desc">
                    Click on the desired technique box to get more information
                    and select a technique
                  </span>
                </div>
                <div>
                  <button
                    onClick={handleExpand}
                    className="expand_button"
                    style={{ color: BackgroundColor }}
                  >
                    {!expandMitre ? "Expand" : "Collapse"}
                  </button>
                </div>
              </div>
              <div
                className={cx(
                  "mitre_attack_container_main",
                  css({
                    gridTemplateColumns: `repeat(${content.length}, 1fr)`, // Dynamic number of columns
                  })
                )}
              >
                {attackMatrixLoading && <SpinnerLoader />}
                {content &&
                  content.length > 0 &&
                  content.map((item, index) => {
                    const { tactic_name, techniques } = item;
                    return (
                      <div key={index}>
                        <span className="header_section" key={index}>
                          {tactic_name}
                        </span>
                        <div className="header_title">
                          {techniques && techniques.length} technique
                        </div>
                        {techniques &&
                          techniques.length > 0 &&
                          techniques?.map((val, index) => {
                            const updatedTechniques = [
                              ...formik.values.techniques,
                            ];

                            const isTechniqueFound = updatedTechniques.find(
                              (technique) => technique?.id === val?.id
                            );
                            const usage =
                              isTechniqueFound &&
                              isTechniqueFound?.usage &&
                              isTechniqueFound?.usage.length > 0
                                ? isTechniqueFound?.usage[0]?.usage
                                : "";

                            const isSelected = isTechniqueFound ? true : false;

                            return (
                              <React.Fragment key={index}>
                                <SubTechniqueBox
                                  onFormValueChange={onFormValueChange}
                                  formik={formik}
                                  data={val}
                                  usage={usage}
                                  isSelected={isSelected}
                                  foundedTechnique={isTechniqueFound}
                                />
                              </React.Fragment>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </ClassNames>
    </>
  );
};

export default MitreAttackForm;
