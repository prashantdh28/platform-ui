import React from "react";
import "./risk-matrix.css";
import CustomMarkDownDailogueBox from "../../../../Components/Custom/CustomMarkDownDailogueBox";
import RiskMatrixDailogueContent from "./RiskMatrixDailogueContent";

const SingleMatrixCard = ({ val, key, name }) => {
    return (
        <div className="rsk-mtr-card" key={key} style={{ background: val.color }}>
            <div className="intel-technique-name-img">
                <div>{val.id}</div>

                <div className="num-by-num">
                    {val.in_place_control_count}/{val.total_control_count}
                </div>
            </div>
            <div className="render-new-icon-box">
                <CustomMarkDownDailogueBox
                    ShowDes={true}
                    textForOpenModal="...read more"
                    content={val.description}
                    addDailogueContent={<RiskMatrixDailogueContent value={val} name={name} />}
                    headerName={`${val.id} ${name ? `(${name})` : ""}`}
                    readMoreChars={150}
                    customClassNames="control-desc"
                    color={val.color === "#d1e0e0" ? "rgba(142, 151, 164, 1)" : "white"}
                />
            </div>
        </div>
    );
};

export default SingleMatrixCard;
