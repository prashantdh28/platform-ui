import React, { useState } from "react";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import { enableRipple } from "@syncfusion/ej2/base";
import "./InputChips.css";
import { ClassNames } from "@emotion/react";
import { DialogUtility } from "@syncfusion/ej2/popups";
import { useSelector } from "react-redux";
// import DynamicButton from "../../../Components/Button/ButtonBox";
// import { Label } from "@mui/icons-material";

// import DynamicButton from "../../Button/ButtonBox";
enableRipple(true);

const InputChips = ({
    chipsData,
    onDelete,
    deleteEnable = false,
    style,
    onChipSelect,
    id,
    dialogNeeded = true,
}) => {
    // const [dialogInstance, setDialogInstance] = useState(null);

    const [hoveredItem, setHoveredItem] = useState(null);

    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    const handleMouseEnter = (index) => {
        setHoveredItem(index);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const onDeleteClick = (e) => {
        e.cancel = true;

        if (typeof onDelete === "function" && deleteEnable) {
            if (e && e.text) {
                if (dialogNeeded) {
                    const dialog = DialogUtility.confirm({
                        animationSettings: { effect: "Zoom" },
                        cancelButton: {
                            text: "Cancel",
                            click: () => {
                                if (dialog) {
                                    dialog.close();
                                }
                            },
                        },
                        closeOnEscape: true,
                        content: "Are you sure you want to remove this?",
                        okButton: {
                            text: "REMOVE",
                            click: () => {
                                if (dialog) {
                                    dialog.close();
                                    onDelete(e.text);
                                }
                            },
                        },
                        // okButton: {
                        //   content: (
                        //     <DynamicButton label="REMOVE" onClick={() => onDelete(e.text)} />
                        //   ),
                        // },

                        showCloseIcon: true,
                        title: "Are you sure ?",
                    });
                } else {
                    onDelete(e.text);
                }
            }
        }
    };
    const handleClick = (e) => {
        if (typeof onChipSelect === "function") {
            onChipSelect(e.text, e.selected, e.data.value);
        }
    };

    return (
        <>
            <ClassNames>
                {({ css }) => (
                    <ChipListComponent
                        id={id ?? "chip-avatar"}
                        className="input-chips"
                        enableDelete={deleteEnable}
                        selection="Single"
                        delete={onDeleteClick}
                        click={handleClick}
                        // style={{ backgroundColor: "red" }}
                    >
                        <ChipsDirective data-theme={"green"}>
                            {chipsData &&
                                chipsData.length > 0 &&
                                chipsData.map((chip, index) => {
                                    const chipClass = " .e-chip-list.e-chip:hover, .e-chip-list .e-chip:"
                                        ? BackgroundColor
                                        : "";

                                    //className={chipClass}

                                    return (
                                        <ChipDirective
                                            key={index}
                                            text={chip?.name}
                                            data-theme={"red"}
                                            id={id}
                                            cssClass={css`
                                                background: ${chip?.color} !important;
                                            `}
                                            trailingIconCss={`${deleteEnable ? "e-dlt-btn" : ""}`}
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={handleMouseLeave}
                                            style={{
                                                background: hoveredItem === index ? BackgroundColor : "",
                                                style,
                                            }}
                                            className={chipClass}
                                            value={chip?.id}
                                            leadingIconCss={chip?.icon}
                                        />
                                    );
                                })}
                        </ChipsDirective>
                    </ChipListComponent>
                )}
            </ClassNames>
        </>
    );
};
export default InputChips;
