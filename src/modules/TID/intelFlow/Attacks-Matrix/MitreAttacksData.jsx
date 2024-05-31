import React from "react";
import BackdropLoader from "../../../../Components/Loader/BackdropLoader";
import Techniques from "./Techniques";

const MitreAttacksData = ({ attackMatrixLoading, data, isEntities = true, isSingle = false }) => {
    return (
        <>
            {<BackdropLoader loading={attackMatrixLoading} />}

            <div className="intel-mtr-main">
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        const { tactic_name, techniques } = item;

                        return (
                            <>
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
                                            const {
                                                sub_techniques: subTechniques,
                                                name,
                                                id,
                                                usage,
                                                entities,
                                            } = val;

                                            return (
                                                <Techniques
                                                    subTechniques={subTechniques}
                                                    index={index}
                                                    id={id}
                                                    name={name}
                                                    usage={usage}
                                                    entities={entities}
                                                />
                                            );
                                        })}
                                </div>
                            </>
                        );
                    })}
            </div>
        </>
    );
};

export default MitreAttacksData;
