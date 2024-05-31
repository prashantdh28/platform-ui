import * as React from "react";
// import * as ReactDOM from "react-dom";
import {
  ChipListComponent,
  ChipsDirective,
  ChipDirective,
} from "@syncfusion/ej2-react-buttons";
import { enableRipple } from "@syncfusion/ej2-base";

enableRipple(true);

function Chips() {
  // function chipClick(e) {
  //   alert("you have clicked " + e.target.textContent);
  // }

  return (
    <div className="chips-container">
      <ChipListComponent id="chip-avatar-1" enableDelete={true}>
        <ChipsDirective>
          <ChipDirective text="Tag 1"></ChipDirective>
          <ChipDirective text="Tag 2"></ChipDirective>
        </ChipsDirective>
      </ChipListComponent>
      <ChipListComponent id="chip-avatar-3" enableDelete={true}>
        <ChipsDirective>
          <ChipDirective text="Tag 3"></ChipDirective>
        </ChipsDirective>
      </ChipListComponent>
    </div>
  );
}

export default Chips;
