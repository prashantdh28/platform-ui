import { Button } from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import useToastify from "../../Hooks/useToastify";
import InputChips from "../Chips/InputChips/InputChips";
import CustomTextField from "../CustomTextField/CustomTextField";
import PopUp from "./PopUp";

const TagPupUp = ({ tags: tagData, onAdd, onDelete, isAddable = false }) => {
    // const [tagData, setTagData] = useState([]);
    const [tagName, setTagName] = useState("");

    const { showToast } = useToastify();

    const onTagChange = useCallback((e) => {
        setTagName(e.target.value);
    }, []);

    // useEffect(() => {
    //     setTagData(tags);
    // }, [tags]);

    const onSubmit = () => {
        if (tagName) {
            const isExist = tagData && tagData.length > 0 && tagData.some((tag) => tag?.name === tagName);
            if (typeof onAdd === "function" && !isExist) {
                onAdd(tagName);
                setTagName("");
            } else {
                showToast("Please try with another name! , it's already exists.", {
                    type: "warning",
                });
            }
        } else {
            showToast("Please input tag name", { type: "error" });
        }
    };

    return (
        <PopUp
            name={`${tagData && tagData.length > 3 ? "+" : ""} ${
                tagData && tagData.length > 3 ? tagData.length - 3 : ""
            }`}
            headName="Tags"
            buttonStyle={{
                border: "1px solid rgba(28, 28, 28, 0.1)",
                borderRadius: "4px",
                margin: "5px",
            }}
            icon={`${!tagData || tagData.length <= 0 || tagData.length <= 3 ? "e-plus" : ""}`}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-around",
                }}
            >
                <div>
                    {tagData && tagData.length > 0 && (
                        <InputChips onDelete={onDelete} chipsData={tagData} deleteEnable={isAddable} />
                    )}
                </div>

                {isAddable ? (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <CustomTextField
                            id="standard-basic"
                            value={tagName}
                            label="Tags"
                            variant="standard"
                            style={{ width: "70%" }}
                            onChange={onTagChange}
                        />
                        <Button
                            style={{ color: "var(--name-email)", border: "1px solid var(--name-email)" }}
                            size="medium"
                            variant="outlined"
                            onClick={onSubmit}
                        >
                            <span className="e-icons e-plus" /> Add
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </PopUp>
    );
};

export default memo(TagPupUp);
