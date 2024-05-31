import { FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getEntityTypes,
  getRelationship,
} from "../../../../../../../Services/Vocabulary/vocabulary.service";
import AssociationsFormAccordion from "./AssociationsFormAccordion";
import Button from "@mui/material/Button";

const AssociationsForm = ({ formik, onFormValueChange, onFormValueBlur }) => {
  const dispatch = useDispatch();
  const { values } = formik;
  const [expandedAccordion, setExpandedAccordion] = useState({ 0: true });

  const addAccordion = () => {
    formik.setFieldValue("attributions", [...values.attributions, {}]);
    setExpandedAccordion((pre) => {
      return {
        ...pre,
        [values?.attributions.length]: true,
      };
    });
  };

  const deleteAccordion = (index) => {
    const newAttributions = [...values.attributions];
    newAttributions.splice(index, 1);
    formik.setFieldValue("attributions", newAttributions);
  };

  const onAccordionChange = (index) => {
    setExpandedAccordion((pre) => {
      return {
        ...pre,
        [index]: !pre[index],
      };
    });
  };

  useEffect(() => {
    dispatch(getEntityTypes());
    dispatch(getRelationship());
  }, [dispatch]);

  return (
    <div>
      <div className="accordion_assoc_form">
        {formik.values?.attributions &&
          formik.values?.attributions.length > 0 &&
          formik.values?.attributions.map((_, index) => {
            return (
              <AssociationsFormAccordion
                key={index}
                index={index}
                onFormValueBlur={onFormValueBlur}
                onFormValueChange={onFormValueChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                formik={formik}
                expandedAccordion={expandedAccordion}
                onAccordionChange={onAccordionChange}
                deleteAccordion={deleteAccordion}
              />
            );
          })}
        <div className="DC_add_Asso_btn">
          <Button
            variant="outlined"
            style={{
              width: "7rem",
              height: "2.3rem",
              background: "#2A3C57",
              fontSize: "smaller",
            }}
            onClick={addAccordion}
          >
            + ADD New
          </Button>
        </div>
      </div>
      {Boolean(formik.errors.techniques) ? (
        <FormHelperText error>{formik.errors.attributions}</FormHelperText>
      ) : (
        ""
      )}
    </div>
  );
};

export default AssociationsForm;
