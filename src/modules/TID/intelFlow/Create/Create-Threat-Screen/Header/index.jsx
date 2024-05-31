import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTIDEntityByID } from "../../../../../../Services/TID/tid.service";
import {
  getSelectedEntity,
  setRequestObject,
  setSelectedEntity,
} from "../../../../../../redux/Slice/DataCreation/DataCreationSlice";

const CreateThreatHeader = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedEntity = useSelector(getSelectedEntity);

  const getUpdateData = useCallback(async () => {
    if (id && id !== "") {
      const response = await dispatch(getTIDEntityByID(id)).unwrap();
      if (response) {
        await dispatch(setRequestObject(response));
        await dispatch(
          setSelectedEntity({ name: response.type, type: response.type })
        );
      }
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && id !== "") {
      getUpdateData();
    }
    return () => {};
  }, [getUpdateData, id]);
  return (
    <>
      <div>
        <h3 style={{ marginLeft: "0.7rem" }}>
          {id ? "Update" : "Create a New"} {selectedEntity?.name} Object
        </h3>
      </div>
    </>
  );
};

export default CreateThreatHeader;
