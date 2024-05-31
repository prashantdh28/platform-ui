import React, { memo, useCallback, useEffect } from "react";

import "./ActivityTable.css";
import { useDispatch, useSelector } from "react-redux";
import { getActivity } from "../../../Services/Activity/activity.service";
import { formatDateTime } from "../../../helper/dateFormater";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerLoader from "../../Loader/SpinnerLoader";
import ActivityCard from "./ActivityCard";
import { v4 as uuidv4 } from "uuid";


const ActivityTables = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { actorId } = useParams();

    const { activityData, activityLoading, hasMore, size, currentPage } = useSelector(
        (state) => state.activity
    );

    const getActivities = useCallback(
        async ({ id = actorId, page, size }) => {
            await dispatch(getActivity({ id, page, size }));
        },
        [actorId, dispatch]
    );

    useEffect(() => {
        if (actorId) {
            getActivities({});
        }
    }, [getActivities, actorId]);

    const handleActivityClick = (id) => {
        navigate(`channal/${id}`);
    };

    const onLoadMore = async () => {
        await getActivities({ page: currentPage + 1, size });
    };

    return (
        <div>
            <div className="activity-text">
                <h2 id="activity"> Activity Lists </h2>
                {/* <div className="search-drop-last">
                  <Searchbar />
                  <DropDownTree />
              </div> */}
            </div>
            <div className="all-card">
                {activityLoading && <SpinnerLoader />}
                {activityData && activityData && activityData.length > 0 ? (
                    activityData.map((activity) => {
                        const {
                            channel_id,
                            channel_name,
                            channel_type,
                            thread_count,
                            user,
                            tags,
                            first_activity,
                            topic_title,
                        } = activity;
                        const publishDate = formatDateTime(first_activity);
                        const keyId = uuidv4();
                        return (
                            <ActivityCard
                                key={keyId}
                                tags={tags}
                                topic_title={topic_title}
                                publishDate={publishDate}
                                channel_id={channel_id}
                                channel_name={channel_name}
                                channel_type={channel_type}
                                thread_count={thread_count}
                                user={user}
                                handleClick={handleActivityClick}
                            />
                        );
                    })
                ) : (
                    <p className="noData">No Data Found</p>
                )}
            </div>
            {hasMore ? (
                <span className="load-more" onClick={onLoadMore}>
                    {activityLoading ? (
                        <SpinnerLoader />
                    ) : (
                        <>
                            Load More<span className="e-icons e-chevron-down-thin"></span>
                        </>
                    )}
                </span>
            ) : (
                ""
            )}
        </div>
    );
};

export default memo(ActivityTables);
