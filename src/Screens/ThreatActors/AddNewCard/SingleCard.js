import React, { useEffect } from "react";
import "./SingleCard.css";
import BreadCrumbNavigator from "../../../Components/BreadCrumb/BreadCrumbNavigator/BreadCrumbNavigator";
import ProfileCardThread from "../../../Components/ProfileCardThreadProfiles/ProfileCardThread";
import { useDispatch, useSelector } from "react-redux";
// import { getSingleActors } from "../../redux/Slice/actorSlice";
import { useParams } from "react-router-dom";
import SpinnerLoader from "../../../Components/Loader/SpinnerLoader";
import Tabs from "../../../Components/Tabs/Tabs";
import { getSingleActor } from "../../../Services/Actors/actors.service";

const SingleCard = () => {
  const dispatch = useDispatch();

  const { actorId } = useParams();

  const SingleActorData = useSelector((state) => state.actor.singleactorData);
  const isloading = useSelector((state) => state.actor.loading);

  const breadcrumbNavigator = [
    { label: "Adversary Lists", link: "/" },
    { label: "Thread Profile" },
  ];

  useEffect(() => {
    if (actorId) {
      dispatch(getSingleActor(actorId));
    }
  }, [actorId, dispatch]);

  return (
    <>
      {isloading ? (
        <SpinnerLoader />
      ) : (
        <div className="addnewcard-mainscreen">
          <BreadCrumbNavigator items={breadcrumbNavigator} />
          <div className="profile-accordion">
            <ProfileCardThread
              SingleActorData={SingleActorData}
              actorId={actorId}
            />
            <Tabs />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCard;
