import React, { useCallback, useEffect, useState } from "react";
import DynamicButton from "../../../Components/Button/ButtonBox";
import InputChips from "../../../Components/Chips/InputChips/InputChips";
import DetectionTable from "../../../TID/Components/Detection/DetectionTable";
import { useDispatch, useSelector } from "react-redux";
import "./DetectionScreen.css";
import { setEntityIDs } from "../../../redux/Slice/TID/EntitySlice";
import DropDownTree from "../../../Components/DropDownTree/DropDownTree";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import { getDetectionInfo } from "../../../Services/TID/detection.service";
import {
    getDetectionInformationData,
    getDetectionLoading,
    resetDetectionInfoData,
} from "../../../redux/Slice/TID/DetectionSlice";

const DetectionScreen = () => {
    const dispatch = useDispatch();

    const [platform, setPlatform] = useState("none");
    const [detectionInfoContent, setDetectionInfoContent] = useState([]);

    const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
  const detectionInfoData = useSelector(getDetectionInformationData);
  const loading = useSelector(getDetectionLoading);


    const entities = detectionInfoData.entities || [];
    const content = detectionInfoData.content || [];
    const platforms = detectionInfoData.platforms || [];

    const getDetectionInfoData = useCallback(async () => {
        if (entityIDs && entityIDs.length > 0) {
            const response = await dispatch(getDetectionInfo({ selectedIds: entityIDs })).unwrap();
            if (response) {
                setDetectionInfoContent(response.content || []);
                setPlatform("none");
            }
        }
    }, [entityIDs, dispatch]);

    useEffect(() => {
        if (entityIDs && entityIDs.length >= 1) {
            getDetectionInfoData();
        }
        return () => {
            dispatch(resetDetectionInfoData());
        };
    }, [getDetectionInfoData, dispatch, entityIDs]);

    const onPlatformSelect = (e) => {
        setPlatform(e.target.value);
        if (e.target.value === "none" || !e.target.value) {
            return setDetectionInfoContent(content);
        }
        const updatedDetectionInfoData =
            content &&
            content.length > 0 &&
            content.filter((item) => {
                return (
                    item?.platforms && item?.platforms.length > 0 && item?.platforms.includes(e.target.value)
                );
            });
        setDetectionInfoContent(updatedDetectionInfoData || []);
    };

    const onDelet = (text) => {
        if (entityIDs && entityIDs.length > 1) {
            const deleteItem =
                entityIDs && entityIDs.length > 0 && entityIDs.find((entity) => entity.name === text);
            const newEntityIDs = entityIDs.filter((entity) => entity.id !== deleteItem.id);
            dispatch(setEntityIDs(newEntityIDs));
        } else {
            alert("You cant delete more items");
        }
    };

    return (
        <div className="parent-compare-screen">
            <div className="detection-table-header">
                <div className="header-text">
                    <span className="header-title">Technique Detection Rules</span>
                    <span id="TTP-chips">
                        {entities && entities.length > 0 && (
                            <InputChips
                                chipsData={entities}
                                onDelete={onDelet}
                                deleteEnable={entities.length > 1}
                            />
                        )}
                    </span>
                </div>
                <DropDownTree
                    label="Platform"
                    options={platforms.map((item) => {
                        return { value: item, label: item.toUpperCase() };
                    })}
                    handleChange={onPlatformSelect}
                    setSelectedOption={setPlatform}
                    selectedOption={platform}
                />
                <DynamicButton
                    className="TID-COA-btn"
                    //   onClick={handleClickDownload}
                    label="Emulation"
                />
            </div>
            {loading && <SpinnerLoader />}
            {content && content.length > 0 && <DetectionTable data={detectionInfoContent} />}
            {!loading && (!content || !content || content.length <= 0) && (
                <p className="noData">No Data Found</p>
            )}
        </div>
    );
};

export default DetectionScreen;
