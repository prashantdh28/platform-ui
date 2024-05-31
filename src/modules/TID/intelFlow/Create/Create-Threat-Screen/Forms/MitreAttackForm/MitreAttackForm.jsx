import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { AttackMatrixData } from "../AttackMatrixData";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { FormHelperText, IconButton } from "@mui/material";
import BackdropLoader from "../../../../../../../Components/Loader/BackdropLoader";
import { getEmptyAttackMatrix } from "../../../../../../../Services/TID/attackMatrix.service";
// import SubTechniqueBoxDialog from "./SubTechniqueBoxDialog";
import TechniqueBox from "./TechniqueBox";

const MitreAttackForm = ({ setExpandMitre, expandMitre, onFormValueChange, formik }) => {
    const dispatch = useDispatch();

    const { attackMatrixData, attackMatrixLoading } = useSelector((state) => state.attackMatrix);
    const { content = [] } = attackMatrixData;

    const handleExpand = () => {
        setExpandMitre(!expandMitre);
    };

    useEffect(() => {
        dispatch(getEmptyAttackMatrix());
    }, [dispatch]);

    return (
        <>
            <div className="mitre-attack-form-container">
                {Boolean(formik.errors.techniques) ? (
                    <FormHelperText error>{formik.errors.techniques}</FormHelperText>
                ) : (
                    ""
                )}
                <div className="mitre-attack-form-container-header">
                    <div className="header-section">
                        <span className="head">MITRE Attack Navigation </span>
                        <span className="desc">
                            Click on the desired technique box to get more information and select a technique{" "}
                        </span>
                    </div>
                    <div>
                        <IconButton onClick={handleExpand}>
                            {!expandMitre ? (
                                <OpenInFullIcon sx={{ fill: "#8E97A4" }} />
                            ) : (
                                <CloseFullscreenIcon sx={{ fill: "#8E97A4" }} />
                            )}
                        </IconButton>
                    </div>
                </div>
                <hr className="sub_horizontal_line_threat" />
                <div
                    style={{
                        gridTemplateColumns: `repeat(${content.length}, 1fr)`,
                    }}
                    className="mitre-attack-form-container-main"
                >
                    {attackMatrixLoading && <BackdropLoader loading={attackMatrixLoading} />}
                    {content &&
                        content.length > 0 &&
                        // <MitreAttacksData data={content} />
                        content.map((item, index) => {
                            const { tactic_name, techniques } = item;
                            return (
                                <div key={index}>
                                    <div className="mtr-techniques-name">
                                        <span className="mtr-tactic-name">
                                            {tactic_name}
                                            {/* Resource development */}
                                        </span>
                                        <div className="tech">
                                            Techniques :{techniques && techniques.length}
                                        </div>
                                    </div>

                                    {techniques &&
                                        techniques.length > 0 &&
                                        techniques?.map((val, index) => {
                                            const { entities } = val;
                                            const updatedTechniques = [...formik.values.techniques];
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
                                                <TechniqueBox
                                                    formik={formik}
                                                    key={index}
                                                    usage={usage}
                                                    entities={entities}
                                                    data={val}
                                                    isSelected={isSelected}
                                                    onFormValueChange={onFormValueChange}
                                                />
                                            );
                                        })}
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default MitreAttackForm;
