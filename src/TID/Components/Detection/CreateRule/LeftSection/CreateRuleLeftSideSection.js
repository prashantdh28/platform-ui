import React from "react";
import "./CreateRuleLeftSideSection.css";
    import { FormHelperText } from "@mui/material";
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import DropDownTree from "../../../../../Components/DropDownTree/DropDownTree";

const CreateRuleLeftSideSection = ({ detectionRuleData, values, formik, onCreatedDetectionRuleChange }) => {
    const relatedTypeOptions =
        detectionRuleData?.ruleMeta?.relatedType && detectionRuleData?.ruleMeta?.relatedType.length > 0
            ? detectionRuleData?.ruleMeta?.relatedType.map((type) => ({
                  value: type,
                  label: type?.toUpperCase(),
              }))
            : [{ value: "none", label: "Not availabe" }];

    const statusOptions =
        detectionRuleData?.ruleMeta?.status && detectionRuleData?.ruleMeta?.status.length > 0
            ? detectionRuleData?.ruleMeta?.status.map((state) => ({
                  value: state,
                  label: state?.toUpperCase(),
              }))
            : [{ value: "none", label: "Not availabe" }];

    const productOptions =
        detectionRuleData?.ruleMeta?.products && detectionRuleData?.ruleMeta?.products.length > 0
            ? detectionRuleData?.ruleMeta?.products.map((product) => ({
                  value: product,
                  label: product?.toUpperCase(),
              }))
            : [{ value: "none", label: "Not availabe" }];

    const serviceOptions =
        detectionRuleData?.ruleMeta?.services && detectionRuleData?.ruleMeta?.services.length > 0
            ? detectionRuleData?.ruleMeta?.services.map((service) => ({
                  value: service,
                  label: service?.toUpperCase(),
              }))
            : [{ value: "none", label: "Not availabe" }];

    const categoriesOptions =
        detectionRuleData?.ruleMeta?.categories && detectionRuleData?.ruleMeta?.categories.length > 0
            ? detectionRuleData?.ruleMeta?.categories.map((category) => ({
                  value: category,
                  label: category?.toUpperCase(),
              }))
            : [{ value: "none", label: "Not availabe" }];

    const levelOptions =
        detectionRuleData?.ruleMeta?.level && detectionRuleData?.ruleMeta?.level.length > 0
            ? detectionRuleData?.ruleMeta?.level.map((item) => ({
                  value: item,
                  label: item?.toUpperCase(),
              }))
            : [{ value: "none", label: "Not availabe" }];

    return (
        <>
            <div className="TID-CreateRule-Parent">
                <div className="CreateRule-Header-Name">Rule Metadata</div>

                <div className="TID-leftSide-Componenets-parent">
                    <div className="TID-leftSide-Componenet-textField">
                        <CustomTextField
                            label="Title"
                            id="TID-Dialoe-Text-Filed"
                            name="file_name"
                            variant="standard"
                            labelColor="var(--name-email)"
                            textColor="var(--name-email)"
                            placeholder="Enter the title of rule"
                            // defaultValue={values?.file_name || ""}
                            value={formik?.values?.file_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched?.file_name && Boolean(formik.errors?.file_name)}
                            helperText={formik.touched?.file_name && formik.errors?.file_name}
                            // onChange={(e) => onCreatedDetectionRuleChange("file_name", e.target.value)}
                        />

                        <div className="TID-leftSide-Componenet-textField">
                            <CustomTextField
                                label="Related Id"
                                name="related_Id"
                                id="TID-Dialoe-Text-Filed"
                                variant="standard"
                                placeholder="Value"
                                textColor="var(--name-email)"
                                labelColor="var(--name-email)"
                                value={formik?.values?.id}
                                sx={{
                                    "& .Mui-disabled": {
                                        "-webkit-text-fill-color": "var(--name-email) !important",
                                    },
                                }}
                                disabled
                            />
                        </div>

                        <div className="TID-leftSide-Componenet-textField">
                            <DropDownTree
                                menuClassName="TID-Dialoge-DropDown"
                                label="Related Type"
                                color="var(--name-email)"
                                options={relatedTypeOptions}
                                selectedOption={values?.related_type || ""}
                                handleChange={(e) =>
                                    onCreatedDetectionRuleChange("related_type", e.target.value)
                                }
                            />
                            {formik.touched.related_type && Boolean(formik.errors.related_type) ? (
                                <FormHelperText error>
                                    {formik.touched.related_type && formik.errors.related_type}
                                </FormHelperText>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="TID-leftSide-Componenet-textField">
                            <DropDownTree
                                menuClassName="TID-Dialoge-DropDown"
                                label="Status"
                                color="var(--name-email)"
                                options={statusOptions}
                                selectedOption={values?.status || ""}
                                handleChange={(e) => onCreatedDetectionRuleChange("status", e.target.value)}
                            />
                            {formik.touched.status && Boolean(formik.errors.status) ? (
                                <FormHelperText error>
                                    {formik.touched.status && formik.errors.status}
                                </FormHelperText>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="TID-leftSide-Componenet-textField">
                            <CustomTextField
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                labelColor="var(--name-email)"
                                textColor="var(--name-email)"
                                variant="outlined"
                                placeholder="Enter the description for the rule"
                                value={formik?.values?.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched?.description && Boolean(formik.errors?.description)}
                                helperText={formik.touched?.description && formik.errors?.description}
                            />
                        </div>

                        <div className="TID-leftSide-Componenet-textField">
                            <CustomTextField
                                label="References (newline-separated)"
                                name="reference"
                                multiline
                                rows={4}
                                labelColor="var(--name-email)"
                                textColor="var(--name-email)"
                                variant="outlined"
                                placeholder="Enter references"
                                value={formik?.values?.references}
                                onChange={(e) => {
                                    const reference = e.target.value.split("\n") || [];
                                    const updatedReference = reference.filter((tag) => tag !== "");
                                    onCreatedDetectionRuleChange("reference", updatedReference);
                                }}
                                // onChange={(e) => onCreatedDetectionRuleChange("description", e.target.value)}
                            />
                        </div>

                        <div className="TID-leftSide-Componenet-textField">
                            <CustomTextField
                                label="Author"
                                labelColor="var(--name-email)"
                                textColor="var(--name-email)"
                                variant="standard"
                                defaultValue={values?.name || ""}
                                placeholder="Name"
                                // style={{ width: "55%" }}
                            />
                        </div>

                        {/* <div className="TID-leftSide-Componenet-textField">
              <DatePicker label="Uncontrolled picker" showTimePicker={true} />
            </div> */}

                        <div className="TID-leftSide-Componenet-textField">
                            {/* <MultiAutoComplete
                                placeHolder="Tags"
                                options={[]?.map((option) => option.title)}
                                onChange={(e, value) => onCreatedDetectionRuleChange("tags", value)}
                            /> */}
                            <CustomTextField
                                label="Tags (newline-separated)"
                                multiline
                                rows={4}
                                labelColor="var(--name-email)"
                                textColor="var(--name-email)"
                                variant="outlined"
                                defaultValue={values?.tags || ""}
                                placeholder="Enter any relevant tags"
                                onChange={(e) => {
                                    const tags = e.target.value.split("\n") || [];
                                    const updatedTags = tags.filter((tag) => tag !== "");
                                    onCreatedDetectionRuleChange("tags", updatedTags);
                                }}
                            />
                        </div>

                        <div className="TID-leftSide-Componenet-textField">
                            <DropDownTree
                                menuClassName="TID-Dialoge-DropDown"
                                label="Product"
                                color="var(--name-email)"
                                options={productOptions}
                                selectedOption={values?.product || ""}
                                handleChange={(e) => onCreatedDetectionRuleChange("product", e.target.value)}
                            />
                            {formik.touched.product && Boolean(formik.errors.product) ? (
                                <FormHelperText error>
                                    {formik.touched.product && formik.errors.product}
                                </FormHelperText>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="TID-leftSide-Componenet-textField">
                            <DropDownTree
                                menuClassName="TID-Dialoge-DropDown"
                                label="Service"
                                color="var(--name-email)"
                                options={serviceOptions}
                                selectedOption={values?.service || ""}
                                handleChange={(e) => onCreatedDetectionRuleChange("service", e.target.value)}
                            />
                            {formik.touched.service && Boolean(formik.errors.service) ? (
                                <FormHelperText error>
                                    {formik.touched.service && formik.errors.service}
                                </FormHelperText>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="TID-leftSide-Componenet-textField">
                            <DropDownTree
                                menuClassName="TID-Dialoge-DropDown"
                                label="Category"
                                defaultValue="Category"
                                color="var(--name-email)"
                                options={categoriesOptions}
                                selectedOption={values?.category || ""}
                                handleChange={(e) => onCreatedDetectionRuleChange("category", e.target.value)}
                            />
                            {formik.touched.category && Boolean(formik.errors.category) ? (
                                <FormHelperText error>
                                    {formik.touched.category && formik.errors.category}
                                </FormHelperText>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="TID-leftSide-Componenet-textField">
                            <CustomTextField
                                label="Falsepositives (newline-separated)"
                                multiline
                                rows={4}
                                labelColor="var(--name-email)"
                                textColor="var(--name-email)"
                                variant="outlined"
                                defaultValue={values?.false_positives || ""}
                                placeholder="Enter any known false positives"
                                onChange={(e) => {
                                    const falsePositives = e.target.value.split("\n") || [];
                                    const updatedFalsePositives = falsePositives.filter((tag) => tag !== "");
                                    onCreatedDetectionRuleChange("false_positives", updatedFalsePositives);
                                }}
                            />
                        </div>

                        <div className="TID-leftSide-Componenet-textField">
                            <DropDownTree
                                menuClassName="TID-Dialoge-DropDown"
                                label="Level"
                                defaultValue="Text 1"
                                color="var(--name-email)"
                                options={levelOptions}
                                selectedOption={values?.level || ""}
                                handleChange={(e) => onCreatedDetectionRuleChange("level", e.target.value)}
                            />
                            {formik.touched.level && Boolean(formik.errors.level) ? (
                                <FormHelperText error>
                                    {formik.touched.level && formik.errors.level}
                                </FormHelperText>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateRuleLeftSideSection;
