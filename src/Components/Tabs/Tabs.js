import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import React, { useCallback, useEffect, useRef } from "react";
import TableWraper from "../Tables/TableWraper";
import { useLocation, useNavigate } from "react-router-dom";

const Tabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabInstance = useRef(null);

  useEffect(() => {
    const selectedTab = location?.pathname?.split("/")?.pop();
    // Check if tabInstance.current is not null before calling select
    if (tabInstance.current) {
      switch (selectedTab) {
        // case "":
        //   tabInstance.current.select(0);
        //   break;
        case "":
          tabInstance.current.select(0);
          break;
        case "mitre":
          tabInstance.current.select(1);
          break;
        case "report":
          tabInstance.current.select(2);
          break;
        default:
          break;
      }
      tabInstance.current.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, tabInstance.current]);

  const handleTabSelect = useCallback(
    (event) => {
      const selectedTabText = event?.selectedItem?.dataset?.id?.toLowerCase();
      navigate(selectedTabText);
      tabInstance.current.refresh();
    },
    [navigate]
  );

  return (
    <div>
      <TabComponent
        id="defaultTab"
        // heightAdjustMode="Auto"
        selected={handleTabSelect}
        ref={tabInstance}
      >
        <TabItemsDirective>
          {/* <TabItemDirective header={{ text: "Overview" }} cssClass="" content={TableWraper} id="" /> */}
          <TabItemDirective
            header={{ text: "Activity" }}
            cssClass="tabs-four"
            content={TableWraper}
            id=""
          />
          <TabItemDirective
            cssClass="tabs-four"
            header={{ text: "Mitre" }}
            content={TableWraper}
            id="mitre"
          />

          <TabItemDirective
            cssClass="tabs-four"
            header={{ text: "Report" }}
            content={TableWraper}
            id="report"
          />
        </TabItemsDirective>
      </TabComponent>
    </div>
  );
};

export default Tabs;
