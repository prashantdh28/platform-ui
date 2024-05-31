import React, { memo } from "react";
import {
    AccordionComponent,
    AccordionItemDirective,
    AccordionItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { ImArrowRight } from "react-icons/im";
import "./Accordion.css";

const AccordionHeader = ({ text }) => <div className="accordion-header">{text}</div>;

const Accordion = ({ SingleActorData = {} }) => {
    const attributions = SingleActorData.attributions || {};
    const personas = SingleActorData.personas || [];
    const vulnerabilities = attributions.vulnerabilities || [];
    const malware = attributions.malware || [];
    const threatActors = attributions.threat_actors || [];

  const vulnerabilitiesContent = () => {
    return (
      <div>
        {vulnerabilities.length > 0 ? (
          <table className="accordion-table">
            <thead className="details-accordion">
              <tr className="accordion-table-row">
                <th className="name-accordion">Name</th>
                <th className="name-accordion"> Type</th>
              </tr>
            </thead>
            <tbody className="main-table-body">
              {vulnerabilities.map((item, index) => (
                <tr key={index} className="details-data-accordion">
                  <td className="data-accordion">{item.name}</td>
                  <td>
                    {item.attribution_type && (
                      <div className="data-accordion">
                        {item.attribution_type}
                        <div className="right-arrow-square">
                          {item.attribution_type && (
                            <ImArrowRight style={{ fill: "dodgerblue" }} />
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="noData">No Data Available</p>
        )}
      </div>
    );
  };

  const malwareContent = () => {
    return (
      <div>
        {malware.length > 0 ? (
          <table className="accordion-table">
            <thead className="details-accordion">
              <tr className="accordion-table-row">
                <th className="name-accordion">Name</th>
                <th className="name-accordion">Relationship Type</th>
              </tr>
            </thead>
            <tbody className="main-table-body">
              {malware.map((item, index) => (
                <tr key={index} className="details-data-accordion">
                  <td className="data-accordion">{item.name}</td>
                  <td>
                    {item.attribution_type && (
                      <div className="data-accordion">
                        {item.attribution_type}
                        <div className="right-arrow-square">
                          {item.attribution_type && (
                            <ImArrowRight style={{ fill: "dodgerblue" }} />
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="noData">No Data Available</p>
        )}
      </div>
    );
  };

  const threatActorsContent = () => {
    return (
      <div>
        {threatActors.length > 0 ? (
          <table className="accordion-table">
            <thead className="details-accordion">
              <tr className="accordion-table-row">
                <th className="name-accordion">Name</th>
                <th className="name-accordion"> Type</th>
              </tr>
            </thead>
            <tbody className="main-table-body">
              {threatActors.map((item, index) => (
                <tr key={index} className="details-data-accordion">
                  <td className="data-accordion">{item.name}</td>
                  <td>
                    {item.attribution_type && (
                      <div className="data-accordion">
                        {item.attribution_type}
                        <div className="right-arrow-square">
                          {item.attribution_type && (
                            <ImArrowRight style={{ fill: "dodgerblue" }} />
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="noData">No Data Available</p>
        )}
      </div>
    );
  };

  const personasContent = () => {
    return (
      <div>
        {personas.length > 0 ? (
          <table className="accordion-table">
            <thead className="details-accordion">
              <tr className="accordion-table-row">
                <th className="name-accordion">Name</th>
                <th className="name-accordion"> Type</th>
              </tr>
            </thead>
            <tbody className="main-table-body">
              {personas.map((item, index) => (
                <tr key={index} className="details-data-accordion">
                  <td className="data-accordion">{item.name}</td>
                  <td>
                    {item.channel_name && (
                      <div className="data-accordion">
                        {item.channel_name}
                        <div className="right-arrow-square">
                          {item.channel_name && (
                            <ImArrowRight style={{ fill: "dodgerblue" }} />
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="noData">No Data Available</p>
        )}
      </div>
    );
  };

    return (
        <div className="control-accordion-sample">
            <AccordionComponent className="main-accordion" expandMode="Single">
                <AccordionItemsDirective>
                    <AccordionItemDirective
                        header={() => <AccordionHeader text="Vulnerability" />}
                        expanded
                        content={vulnerabilitiesContent}
                    />
                    <AccordionItemDirective
                        header={() => <AccordionHeader text="Malware" />}
                        content={malwareContent}
                    />
                    <AccordionItemDirective
                        header={() => <AccordionHeader text="Threat Actors" />}
                        content={threatActorsContent}
                    />
                    <AccordionItemDirective
                        header={() => <AccordionHeader text="Personas" />}
                        content={personasContent}
                    />
                </AccordionItemsDirective>
            </AccordionComponent>
        </div>
    );
};

export default memo(Accordion);
