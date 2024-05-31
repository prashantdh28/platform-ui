import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../../Hooks/useQuery";
import useToastify from "../../../../Hooks/useToastify";
import { setEntityIDs } from "../../../../redux/Slice/TID/EntitySlice";
import "../intelFlow.css";
import GraphScreen from "./GraphView/GraphScreen";
import MitreAttackScreen from "./MitreAttackScreen";

const MitreAttack = () => {
  const dispatch = useDispatch();
  let query = useQuery().get("type");
  const navigate = useNavigate();
  const { showToast } = useToastify();

  const entityIDs = useSelector((state) => state.TIDEntity.entityIDs);
  const { attackMatrixData, attackMatrixLoading } = useSelector(
    (state) => state.attackMatrix
  );
  const { entities = [], content = [], domains = [] } = attackMatrixData;

  const [isChecked, setIsChecked] = useState(true);
  const [attackMatrixContent, setAttackMatrixContent] = useState([]);
  const [domain, setDomain] = useState("");
  const [entityValue, setEntityValue] = useState(entityIDs || []);

  // const getMitreAttackData = useCallback(
  //   async ({ compress = false }) => {
  //     if (entityIDs && entityIDs.length > 0) {
  //       const response = await dispatch(
  //         getAttackMatrix({ selectedIds: entityIDs, compress })
  //       ).unwrap();
  //       if (response) {
  //         setAttackMatrixContent(response.content || []);
  //       }
  //     }
  //   },
  //   [entityIDs, dispatch]
  // );
  const onDeleteTag = ({ label: text }) => {
    if (entityIDs && entityIDs.length > 1) {
        const deleteItem =
            entityIDs && entityIDs.length > 0 && entityIDs.find((entity) => entity.name === text);
        const newEntityIDs = entityIDs.filter((entity) => entity?.id !== deleteItem?.id);
        dispatch(setEntityIDs(newEntityIDs));
        setDomain("");
        setEntityValue(newEntityIDs);
        showToast("Entity has been successfully deleted.", {
            type: "success",
        });
    } else {
        //   alert("You cant delete more items");
    }
  };
  const handleCheckboxChange = (isChecked) => {
    setIsChecked(isChecked);
    setDomain("");
  };
  const onDomainSelect = async (e) => {
    setDomain(e.target.value);
    if (!e.target.value) {
      setAttackMatrixContent(content);
      return;
    }

    const updatedAttackMatrixData =
      content &&
      content.length > 0 &&
      content.map((item) => {
        const techniques = Array.isArray(item?.techniques)
          ? item.techniques.filter((technique) => {
              const isAvailable =
                Array.isArray(technique.domains) &&
                technique.domains.includes(e.target.value);
              return isAvailable;
            })
          : [];

        return {
          ...item,
          techniques: techniques,
        };
      });

    setAttackMatrixContent(updatedAttackMatrixData);
  };
  const onButtonClick = async (type) => {
    navigate(`/intel-flow/graphviews?type=${type}`);
    if (!type) {
        navigate(`/intel-flow/graphviews`);
    }
    // await getThreatCoverageReportData();
  };
  // useEffect(() => {
  //   if (entityIDs && entityIDs.length >= 1) {
  //     getMitreAttackData({ compress: isChecked });
  //   }
  //   return () => {
  //     dispatch(resetAttackMatrixData());
  //   };
  // }, [getMitreAttackData, dispatch, entityIDs, isChecked]);

  return (
    <>
      {query === "attack" ? (
        <MitreAttackScreen
          entities={entities}
          onDeleteTag={onDeleteTag}
          domains={domains}
          domain={domain}
          setDomain={setDomain}
          isChecked={isChecked}
          onButtonClick={onButtonClick}
          attackMatrixLoading={attackMatrixLoading}
          attackMatrixContent={attackMatrixContent}
          onDomainSelect={onDomainSelect}
          handleCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <GraphScreen
          onButtonClick={onButtonClick}
          entities={entities}
          onDeleteTag={onDeleteTag}
          entityValue={entityValue}
          setEntityValue={setEntityValue}
        />
      )}
    </>
  );
};

export default MitreAttack;
