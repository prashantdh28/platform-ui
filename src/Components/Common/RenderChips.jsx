import React from "react";
import CustomChip from "../Custom/CustomChip";
import ChipsPopOver from "../PopUp/ChipsPopover";

const RenderChips = ({
  chipsData,
  title,
  length = 3,
  onTechniqueClick,
  name,
}) => {
  if (!chipsData || !chipsData.length > 0) {
    return null;
  }
  return (
    <>
      {chipsData.slice(0, length).map((item, index) => {
        return (
          <CustomChip
            onClick={onTechniqueClick}
            key={index}
            data={{
              label: name
                ? `${item?.id}`
                : `${item?.id ? item?.id + "-" + item?.name : item?.name}`,
              ...item,
            }}
            borderstyle={`${item?.isSelected ? "#0082F9" : "#FFFFFF3D"}`}
            color="#FFFFFF"
          />
        );
      })}
      {chipsData.length > length ? (
        <ChipsPopOver
          onTechniqueClick={onTechniqueClick}
          lable={chipsData.length - length}
          title={title}
          chipsData={chipsData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default RenderChips;
