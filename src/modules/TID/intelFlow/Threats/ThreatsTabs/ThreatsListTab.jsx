import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomLoadingButton from "../../../../../Components/Custom/CustomLoadingButton";
import BackdropLoader from "../../../../../Components/Loader/BackdropLoader";
import NoDataFound from "../../../../../Pages/NoDataFound";
import { getAllTIDEntity } from "../../../../../Services/TID/tid.service";
import { resetEntityListData } from "../../../../../redux/Slice/TID/EntitySlice";
import ThreatCard from "./ThreatCard";

const ThreatsListTab = ({ threatsListData, tabType }) => {
    const dispatch = useDispatch();

    const selectedEntityIds = useSelector((state) => state.TIDEntity.entityIDs) || [];
    const {
        loading,
        filterObject,
        pagination: { currentPage, lastPage },
    } = useSelector((state) => state.TIDEntity);

    const onLoadMore = () => {
        dispatch(getAllTIDEntity({ ...filterObject, page: currentPage + 1, type: tabType }));
    };

    useEffect(() => {
        dispatch(resetEntityListData());
        dispatch(
            getAllTIDEntity({
                ...filterObject,
                selectedTTps:
                    filterObject?.selectedTTps.length > 0
                        ? filterObject?.selectedTTps.map((item) => item?.id)
                        : [],
                sourceRegion:
                    filterObject?.sourceRegion.length > 0
                        ? filterObject?.sourceRegion.map((item) => item?.title)
                        : [],
                targetRegion:
                    filterObject?.targetRegion.length > 0
                        ? filterObject?.targetRegion.map((item) => item?.title)
                        : [],
                entityType:
                    typeof filterObject?.entityType === "string"
                        ? filterObject?.entityType
                        : filterObject?.entityType && filterObject?.entityType.length > 0
                        ? filterObject?.entityType
                        : "",
                motivation:
                    typeof filterObject?.motivation === "string"
                        ? filterObject?.motivation
                        : filterObject?.motivation && filterObject?.motivation.length > 0
                        ? filterObject?.motivation[0]
                        : "",
                sophistication:
                    typeof filterObject?.sophistication === "string"
                        ? filterObject?.sophistication
                        : filterObject?.sophistication && filterObject?.sophistication.length > 0
                        ? filterObject?.sophistication[0]
                        : "",
                page: 0,
                type: tabType,
            })
        );
        return () => {};
    }, [dispatch, filterObject, tabType]);

    return (
        <>
            {Array.isArray(threatsListData) && threatsListData.length > 0 ? (
                threatsListData.map((threatData, index) => {
                    const isSelected = selectedEntityIds.some((obj) => obj?.id === threatData?.id);
                    return (
                        <ThreatCard
                            selectedEntityIds={selectedEntityIds}
                            isSelected={isSelected}
                            key={index}
                            threatData={threatData}
                            tabType={tabType}
                        />
                    );
                })
            ) : (
                <NoDataFound />
            )}
            {loading && threatsListData.length === 0 && <BackdropLoader loading={loading} />}

            {!lastPage && !(threatsListData.length === 0) && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <CustomLoadingButton
                        size="small"
                        sx={{
                            background: "#0082F91F",
                            border: "1px solid #0082F9",
                        }}
                        loadingIndicator={<CircularProgress size={20} />}
                        onClick={onLoadMore}
                        loading={loading}
                        variant="outlined"
                    >
                        Load More
                    </CustomLoadingButton>
                </Box>
            )}
        </>
    );
};

export default ThreatsListTab;
