import React, { useContext } from "react";
import DynamicButton from "../Button/ButtonBox";
import { ActorIdContext } from "../../Context/context";
import "./Parent.css";

function Parent({ setSearchValue }) {
  const { actorIds } = useContext(ActorIdContext);

  const handleClick = () => {
    if (actorIds && actorIds.length >= 2) {
    } else {
      alert("Select at least two cards to compare.");
    }
  };

  return (
    <>
      <div
        className="profile-parent-div"
      
      >
        {/* <div
                  className="profile-search-dropdown"
                  id="profile-search-dropdown"
                  style={{ display: "flex", gap: "10px", flexDirection: "row" }}
              >
                  <Searchbar className="search-select" setSearchValue={setSearchValue} />
                  <DropDownTree className="profile-dropdown" />
              </div> */}

        <div className="child-div-2">
          {/* <ButtonBox /> */}
          <div className="button-div">
            <DynamicButton
              label="+ NEW"
              className="new-button"
              to="/newactor"
            />

            <DynamicButton
              label="Compare"
              onClick={handleClick}
              isDisabled={!(actorIds && actorIds.length >= 2)}
              className="compare-button"
              to="/compare"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Parent;
