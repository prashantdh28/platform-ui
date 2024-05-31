import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../../Components/BreadCrumb/BreadCrumb";
import ProfileCard from "../../../Components/ProfileCards/ProfileCard";
import Parent from "../../../Components/ParentComponents/Parent";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import { ActorIdContext } from "../../../Context/context";
import { getAllActors } from "../../../Services/Actors/actors.service";
import "../../../Components/Tables/ActivityTable/ActivityTables";
// import { resetState } from "../../redux/Slice/actorSlice";
import useToastify from "../../../Hooks/useToastify";
import { v4 as uuidv4 } from "uuid";
// import Calendar from "../Components/Calendar/Calendar";

const MainScreen = () => {
  const dispatch = useDispatch();
  const { actorIds, setActorIds } = useContext(ActorIdContext);
  const [searchValue, setSearchValue] = useState("");

  const ActorData = useSelector((state) => state.actor.actoresdata);
  const currentPage = useSelector((state) => state.actor.currentPage);
  const isloading = useSelector((state) => state.actor.loading);
  const hasMore = useSelector((state) => state.actor.hasMore);
  const size = useSelector((state) => state.actor.size);

  const { showToast } = useToastify();

  const handleSearchChange = (newValue) => {
    setSearchValue(newValue);
  };

  const handleCardSelection = (event, actorId, name) => {
    event.preventDefault();
    const actorIndex = actorIds.findIndex((obj) => obj.actorId === actorId);

    if (actorIndex !== -1) {
      const updatedActorIds = [...actorIds];
      updatedActorIds.splice(actorIndex, 1);
      setActorIds(updatedActorIds);
    } else {
      if (actorIds.length < 5) {
        setActorIds([...actorIds, { actorId, name }]);
      } else {
        showToast("You can't select more than 5 actors", { type: "error" });
      }
    }
  };

  const onLoadMore = () => {
    dispatch(getAllActors({ page: currentPage + 1, size }));
  };

  useEffect(() => {
    dispatch(getAllActors({}));
    // return () => dispatch(resetState());
  }, [dispatch]);

  return (
    <div className="app-main">
      <Breadcrumb />
      <br />
      <Parent setSearchValue={handleSearchChange} />
      <br />
      {isloading && <SpinnerLoader />}
      {!isloading && (!ActorData || ActorData.length <= 0) && (
        <p className="noData">No Data Found</p>
      )}
      {ActorData &&
        ActorData.length > 0 &&
        ActorData?.map((actor) => {
          const {
            id,
            name,
            description,
            created,
            located_at,
            last_modified,
            targets,
            tags,
            techniques,
            aliases,
            type,
          } = actor;
          const keyId = uuidv4();
          return (
            <ProfileCard
              key={keyId}
              searchValue={searchValue}
              handleCardSelection={handleCardSelection}
              actorId={id}
              name={name}
              description={description}
              created={created}
              locatedAt={located_at}
              lastModified={last_modified}
              targets={targets}
              tags={tags}
              techniques={techniques}
              aliases={aliases}
              type={type}
              actorIds={actorIds}
            />
          );
        })}
      {hasMore ? (
        <span className="load-more" onClick={onLoadMore}>
          {!isloading &&
          (!ActorData || ActorData.length <= 0) && (
            <p className="noData">No Data Found</p>
          ) ? (
            <SpinnerLoader />
          ) : (
            <>
              Load More
              <span
                className="e-icons e-chevron-down-thin"
                style={{ fontSize: "small" }}
              ></span>
            </>
          )}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default MainScreen;
