import React, { useEffect } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumbNavigator from "../../../../Components/BreadCrumb/BreadCrumbNavigator/BreadCrumbNavigator";
import SpinnerLoader from "../../../../Components/Loader/SpinnerLoader";
import { getAttackMatrix } from "../../../../Services/TID/attackMatrix.service";
import { getTIDEntityByID } from "../../../../Services/TID/tid.service";
import SingleEntityCard from "../../../../TID/Components/EntitiesListsCard/SingleEntity/SingleEntityCard/SingleEntityCard";
import SingleEntityTabs from "../../../../TID/Components/EntitiesListsCard/SingleEntity/SingleEntityTabs/SingleEntityTabs";
import { resetAttackMatrixData } from "../../../../redux/Slice/TID/AttackMatrixSlice";

const breadcrumbItemsCustom = [{ label: "Back", link: `/tid`, icon: HiArrowSmLeft }];

const SingleEntityScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { entityID, loading } = useSelector((state) => state.TIDEntity);

    useEffect(() => {
        dispatch(getTIDEntityByID(id));
        dispatch(getAttackMatrix({ selectedIds: [{ id }], compress: true }));
        return () => {
            dispatch(resetAttackMatrixData());
        };
    }, [dispatch, id]);

    return (
        <>
            <div id="JJ">
                <div
                    className="TID-SingleEntity-Back-BreadCrumb"
                    style={{ margin: "15px 10px", padding: "0px 10px" }}
                >
                    <BreadCrumbNavigator items={breadcrumbItemsCustom} />
                </div>

                {loading && <SpinnerLoader />}
                {entityID && Object.keys(entityID).length > 0 && (
                    <>
                        <div id="MainScreen-SingleEntity">
                            <SingleEntityCard entityID={entityID} />
                        </div>

                        <div className="MainScreen-SingleEntity-tabs">
                            <SingleEntityTabs entityID={entityID} />
                        </div>
                    </>
                )}
                {!loading && (!entityID || Object.keys(entityID).length <= 0) && (
                    <p className="noData">No Data Found</p>
                )}
            </div>
        </>
    );
};

export default SingleEntityScreen;
