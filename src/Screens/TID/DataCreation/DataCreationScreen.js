import React, { useEffect, useState } from "react";
import "./DataCreationScreen.css";
import BreadCrumbNavigator from "../../../Components/BreadCrumb/BreadCrumbNavigator/BreadCrumbNavigator";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowSmLeft } from "react-icons/hi";
import ThreatCard from "../../../TID/Components/ThreatCard/ThreatCard";
import DynamicButton from "../../../Components/Button/ButtonBox";
import { getEntityTypes } from "../../../Services/TID/dataCreation.service";
import {
    getAllEntitiesTypes,
    getLoadingState,
    getSelectedEntity,
    setRequestObject,
    setSelectedEntity,
} from "../../../redux/Slice/DataCreation/DataCreationSlice";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";

const DataCreation = () => {
    const breadcrumbItemsCustom = [{ label: "Back", link: `/tid`, icon: HiArrowSmLeft }];

    const dispatch = useDispatch();

    const allEntitiesTypesData = useSelector(getAllEntitiesTypes);
    const selectedEntity = useSelector(getSelectedEntity);
    const loading = useSelector(getLoadingState);

    const [selectedCard, setSelectedCard] = useState(selectedEntity);

    const handleRadioChange = (data) => {
        setSelectedCard(data);
        dispatch(setSelectedEntity(data));
        dispatch(setRequestObject({ type: data?.name.toUpperCase() }));
    };

    useEffect(() => {
        dispatch(getEntityTypes());
        dispatch(setRequestObject({}));
    }, [dispatch]);

    return (
        <>
            <div className="TID-SingleEntity-Back-BreadCrumb">
                <BreadCrumbNavigator items={breadcrumbItemsCustom} />
            </div>
            <div className="DC_main-card">
                <div className="DC_heading">
                    <h3>Select the type of object </h3>
                </div>
                <hr />
                {loading && <SpinnerLoader />}
                <div className="DC_allCards">
                    {allEntitiesTypesData &&
                        allEntitiesTypesData.length > 0 &&
                        allEntitiesTypesData.map((entity, index) => {
                            return (
                                <ThreatCard
                                    key={index}
                                    data={entity}
                                    index={index}
                                    isSelected={index === selectedCard?.id}
                                    onRadioChange={handleRadioChange}
                                />
                            );
                        })}
                </div>
                <div className="DC_nextBtn">
                    <DynamicButton
                        label="NEXT"
                        // className="Attack-entities-btn"
                        isDisabled={selectedEntity ? false : true}
                        to="create-threat"
                    />
                </div>
            </div>
        </>
    );
};

export default DataCreation;
