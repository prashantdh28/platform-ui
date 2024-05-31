import React from "react";
import "./CompareTable.css";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { v4 as uuidv4 } from "uuid";

const CompareTable = ({ data }) => {
  // const [isExpend, setIsExpend] = useState(false);

  const sortingOptions = {
    columns: [{ field: "Tactic", direction: "Ascending" }],
  };

  const gridData = [];
  data &&
    data.length > 0 &&
    data.forEach((item) => {
      const {
        technique_name: TechniqueName,
        technique_id,
        mitigations,
        entities,
      } = item;
      const mitreAttacks = mitigations && mitigations["Mitre ATT&CK"];
      const Technique = technique_id + "-" + TechniqueName;
      mitreAttacks &&
        mitreAttacks.length > 0 &&
        mitreAttacks.forEach((attack) => {
          const mitigationID = attack?.id + "-" + attack?.name;
          attack?.defendSummaries &&
            attack?.defendSummaries.length > 0 &&
            attack?.defendSummaries.forEach((defend) => {
              gridData.push({
                Entities: entities,
                Technique: Technique,
                MitigationID: mitigationID,
                Description: attack?.description,
                RelatedDefendTechniques: defend?.defendId + " " + defend?.label,
              });
            });
        });
    });

  const queryCellInfoEvent = (args) => {
    const col = args.column;
    const data = args.data;
    args.cell.style.border = `0.5px solid #dee2e6`;

    const filteredGridData = gridData.filter(
      (grid) => grid.Technique === data.Technique
    );

    if (col.field === "Entities" || col.field === "Technique") {
      const spanLength = filteredGridData.length;
      args.rowSpan = spanLength;

      if (col.field === "Entities") {
        args.cell.innerHTML = "";
        data.Entities.forEach((entity) => {
          const contentElement = document.createElement("span");
          contentElement.innerHTML = entity.name;
          contentElement.id = uuidv4();
          contentElement.classList.add("entities");
          contentElement.style.backgroundColor = `${entity.color}`;
          args.cell.appendChild(contentElement);
        });
      }
    }

    if (col.field === "MitigationID" || col.field === "Description") {
      const spanLength = filteredGridData.filter(
        (grid) => grid[col.field] === data[col.field]
      ).length;
      args.rowSpan = spanLength;
    }
  };

  return (
    <>
      <div className="Compare-grid-container">
        {gridData && gridData.length > 0 && (
          <GridComponent
            dataSource={gridData}
            allowPaging={false}
            allowSorting={true}
            allowTextWrap={true}
            allowselection={false}
            sortSettings={sortingOptions}
            queryCellInfo={queryCellInfoEvent}
            className="custom-grid"
            gridLines="Both"
          >
            <ColumnsDirective cssClass="header-cell">
              <ColumnDirective
                field="Entities"
                headerText="Entities"
                width="15%"
                textAlign="Left"
                headerTextAlign="Center"
                cssClass="Entities"
              />
              <ColumnDirective
                field="Technique"
                headerText="Technique"
                width="20%"
                textAlign="Center"
                headerTextAlign="Center"
                cssClass="Technique"
              />
              {/* <ColumnDirective
                            field="numberofmatches"
                            headerText="Number of Matches"
                            width="20%"
                            textAlign="Left"
                            template={(data) => {
                                const totalSticks = 10; // Initial total sticks
                                const numberOfSticks = data.numberofmatches;
                                const filledSticks = Math.min(numberOfSticks, totalSticks);
                                const emptySticks = Math.max(totalSticks - numberOfSticks, 0);

                                const filledStickIcons = [];
                                const emptyStickIcons = [];

                                for (let i = 0; i < filledSticks; i++) {
                                    filledStickIcons.push(
                                        <img
                                            key={i}
                                            src={stick}
                                            alt="Filled Stick Icon"
                                            width="8"
                                            height="20"
                                        />
                                    );
                                }

                                for (let i = 0; i < emptySticks; i++) {
                                    emptyStickIcons.push(
                                        <img
                                            key={i}
                                            src={emptysticks}
                                            alt="Empty Stick Icon"
                                            width="8"
                                            height="20"
                                        />
                                    );
                                }

                                return (
                                    <div className="sticks-numbers">
                                        <div className="number-of-matches">{data.numberofmatches}</div>
                                        <div className="stick-numbers-map">
                                            {filledStickIcons.concat(emptyStickIcons).map((stick, index) => (
                                                <span key={index}>{stick}</span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }}
                        /> */}
              <ColumnDirective
                field="MitigationID"
                headerText="Mitigation ID"
                width="20%"
                format="yMd"
                textAlign="Center"
                headerTextAlign="Center"
              />
              <ColumnDirective
                field="Description"
                headerText="Description"
                width="30%"
                textAlign="Center"
                headerTextAlign="Center"
                cssClass="Description"
              />
              <ColumnDirective
                field="RelatedDefendTechniques"
                headerText="Related Defend Techniques"
                width="40%"
                textAlign="Center"
                headerTextAlign="Center"
                cssClass="RelatedDefendTechniques"
              />
            </ColumnsDirective>
            <Inject services={[Sort]} />
          </GridComponent>
        )}
      </div>
    </>
  );
};

export default CompareTable;
