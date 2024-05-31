import { ClassNames } from "@emotion/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as DisableIcon } from "../../../../Assests/SVG/FrameD.svg";
import { ReactComponent as EnableIcon } from "../../../../Assests/SVG/FrameE.svg";
import { ColorOptions, TextColor } from "../../../../Constants/Constant";
import SubTechniqueBoxDialog from "./SubTechniqueBoxDialog";
// import { circularProgressClasses } from "@mui/material";
import SubTechniquePopup from "./SubTechniquePopup";

const SubTechniqueBox = ({ data, key, onFormValueChange, formik, isSelected, usage }) => {
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    const [selected, setSelected] = useState(isSelected); // State to manage selection
    const [subTech, setSubTech] = useState(false);
    const { sub_techniques: subTechniques, name, id } = data;

    const handleSelection = ({ usage, selectedData, setData }) => {
        const updatedTechniques = [...formik.values.techniques];
        const index = updatedTechniques.findIndex((technique) => technique?.id === selectedData?.id);
        if (index === -1) {
            updatedTechniques.push({
                id: selectedData?.id,
                name: selectedData?.name,
                usage: [{ name: selectedData?.name, usage }],
                sub_techniques: [],
                entities: [],
            });
        } else {
            updatedTechniques[index] = {
                ...updatedTechniques[index],
                usage: [{ name: selectedData?.name, usage }],
            };
        }
        onFormValueChange("techniques", updatedTechniques, formik);
        setData(true);
    };

    const openSubTech = (e) => {
        e.stopPropagation();
        setSubTech(!subTech);
    };

    const handleDeSelection = ({ selectedData, setData }) => {
        let updatedTechniques = [...formik.values.techniques];
        const isAvailable = updatedTechniques.some((technique) => technique?.id === selectedData?.id);
        if (isAvailable) {
            updatedTechniques = formik.values?.techniques.filter(
                (technique) => technique?.id !== selectedData?.id
            );
            onFormValueChange("techniques", updatedTechniques, formik);
            setData(false);
        }
    };

    return (
        <>
            <ClassNames>
                {({ css, cx }) => (
                    <div
                        className={cx(
                            "sub_technique_container",
                            css({
                                width: "max-content",
                                // backgroundColor: selected ? BackgroundColor : "",
                            })
                        )}
                    >
                        <div
                            className={cx(
                                "sub_technique_box",
                                // !subTech ? "sub_technique_box" : " sub_technique_box selected_box",
                                css({
                                    backgroundColor: selected ? BackgroundColor : "",
                                    color:
                                        selected && BackgroundColor !== ColorOptions.YELLOW
                                            ? TextColor.WHITE
                                            : "var(--name-email)",
                                })
                            )}
                        >
                            <SubTechniqueBoxDialog
                                key={key}
                                data={data}
                                usage={usage}
                                handleSelection={handleSelection}
                                handleDeSelection={handleDeSelection}
                                setSelected={setSelected}
                                selected={selected}
                            >
                                <div className="sub_technique_box_name">
                                    <div className="sub_technique_box_side_icon">
                                        <span>{`${id} - ${name}`}</span>
                                    </div>
                                </div>
                            </SubTechniqueBoxDialog>

                            {/* {selected ? ( */}
                            {subTechniques.length > 0 ? (
                                <EnableIcon
                                    fill={BackgroundColor}
                                    className="enableIcon"
                                    onClick={(e) => openSubTech(e)}
                                />
                            ) : (
                                <DisableIcon fill={BackgroundColor} />
                            )}
                        </div>
                        {subTech ? (
                            //   {subTechniques && (

                            <div className="sub_technique_box_children">
                                {subTechniques.map((child, childIndex) => {
                                    const updatedTechniques = [...formik.values.techniques];

                                    const isTechniqueFound = updatedTechniques.find(
                                        (technique) => technique?.id === child?.id
                                    );
                                    const usage =
                                        isTechniqueFound &&
                                        isTechniqueFound?.usage &&
                                        isTechniqueFound?.usage.length > 0
                                            ? isTechniqueFound?.usage[0]?.usage
                                            : "";

                                    const isSelected = isTechniqueFound ? true : false;

                                    // const isTechniqueFound = updatedTechniques.find(
                                    //   (technique) => technique?.id === val?.id
                                    // );
                                    // const usage = child.usage ? child?.usage : "";
                                    // const isSelected = isTechniqueFound ? true : false;
                                    return (
                                        <SubTechniquePopup
                                            key={childIndex}
                                            handleSelection={handleSelection}
                                            handleDeSelection={handleDeSelection}
                                            onFormValueChange={onFormValueChange}
                                            data={child}
                                            usage={usage}
                                            isSelected={isSelected}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            //   )}
                            ""
                        )}
                    </div>
                )}
            </ClassNames>
        </>
    );
};

export default SubTechniqueBox;
