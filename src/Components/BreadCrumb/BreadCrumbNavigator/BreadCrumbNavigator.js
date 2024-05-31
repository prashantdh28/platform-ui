import React from "react";
import { NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ButtonColor } from "../../../Constants/Constant";
import "./BreadCrumbNavigator.css";
import { v4 as uuidv4 } from "uuid";

function BreadCrumbNavigator({ items, className }) {
  return (
      <Stack spacing={2} style={{ paddingLeft: "2rem", paddingTop: "1rem" }}>
          <Breadcrumbs aria-label="breadcrumb">
              {items?.map((item, index) => {
                  const keyId = uuidv4();
                  const IconComponent = item.icon ? React.createElement(item.icon) : null;

                  return item.link ? (
                      <NavLink
                          key={keyId}
                          style={{
                              color: ButtonColor.BREADCRUMB_COLOR,
                              textDecoration: "none",
                          }}
                          className={index === items.length - 1 ? className : "last-breadcrumb"}
                          to={item.link}
                      >
                          {IconComponent && (
                              <span className={className} style={{ verticalAlign: "middle" }}>
                                  {IconComponent}
                              </span>
                          )}
                          {item.label}
                      </NavLink>
                  ) : (
                      <Typography
                          key={index}
                          className={index === items.length - 1 ? className : "last-breadcrumb"}
                          style={{ color: ButtonColor.BREADCRUMB_COLOR }}
                      >
                          {IconComponent && (
                              <span className={className} style={{ verticalAlign: "middle" }}>
                                  {IconComponent}
                              </span>
                          )}
                          {item.label}
                      </Typography>
                  );
              })}
          </Breadcrumbs>
      </Stack>
  );
}

export default BreadCrumbNavigator;
