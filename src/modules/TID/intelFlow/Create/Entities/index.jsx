import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEntitiesTypes,
  setSelectedEntity,
  setRequestObject,
  getLoadingState,
  setResponseTime
} from "../../../../../redux/Slice/DataCreation/DataCreationSlice";
import { getEntityTypes } from "../../../../../Services/TID/dataCreation.service";
import { renderNewIcon } from "../../../../../helper/IconRenderer";
import CustomMarkDownDailogueBox from "../../../../../Components/Custom/CustomMarkDownDailogueBox";
import Button from "@mui/material/Button";
import { sideBarListColor } from "../../../../../Constants/Constant";
import { useNavigate } from "react-router-dom";
import BackdropLoader from "../../../../../Components/Loader/BackdropLoader";

const Entities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allEntitiesTypesData = useSelector(getAllEntitiesTypes);
  const loading = useSelector(getLoadingState);

  const [selectedEntityType, setSelectedEntityType] = useState(null);

  const handleCardClick = (entityType) => {
    setSelectedEntityType(entityType);
    dispatch(setSelectedEntity(entityType));
    dispatch(setRequestObject({ type: entityType?.name.toUpperCase() }));
  };

  useEffect(() => {
    dispatch(getEntityTypes());
    dispatch(setRequestObject({}));
    dispatch(setResponseTime(""));
  }, [dispatch]);

  return (
      <>
          <div className="select-create-object">
              <div className="tid-entity-all-cards">
                  <BackdropLoader loading={loading} />
                  {Array.isArray(allEntitiesTypesData) && allEntitiesTypesData.length > 0
                      ? allEntitiesTypesData.map((entityType, index) => (
                            <div
                                key={index}
                                className={`tid-entity-card-child ${
                                    selectedEntityType === entityType ? "selected-entity-card" : ""
                                }`}
                                onClick={() => handleCardClick(entityType)}
                            >
                                <span className="entity-icon">{renderNewIcon(entityType.type)}</span>
                                <br />
                                <span style={{ fontWeight: 500 }}>{entityType.name}</span>
                                <br />
                                <p className="title-description">
                                    <CustomMarkDownDailogueBox
                                        ShowDes={true}
                                        textForOpenModal="...read more"
                                        content={entityType.description}
                                        headerName={entityType.name}
                                        readMoreChars={150}
                                        customClassNames="control-desc"
                                        color="rgba(142, 151, 164, 1)"
                                        classForDailogueBox="control_desc_dailogue_box_read_more"
                                        classForDailogueContent="control_desc_dailogue_content"
                                    />
                                </p>
                            </div>
                        ))
                      : ""}
              </div>
              <div className="goto-step1">
                  <Button
                      onClick={() => navigate("/intel-flow/create-threat")}
                      isDisabled={selectedEntityType ? false : true}
                      sx={{
                          borderRadius: "0.35rem",
                          height: "1.75rem",
                          width: "5.188rem",
                          color: sideBarListColor.TEXT,
                      }}
                  >
                      Next
                  </Button>
              </div>
          </div>
      </>
  );
};

export default Entities;
