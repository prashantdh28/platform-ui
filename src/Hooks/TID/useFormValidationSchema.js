import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  getRequestObject,
  setRequestObject,
} from "../../redux/Slice/DataCreation/DataCreationSlice";
import { removeEmptyKeys } from "../../helper/removeEmptyKeysHelper";

const MitreAttackFormValidationSchema = Yup.object().shape({
    techniques: Yup.array().min(1, "At least one technique is required").required("Techniques are required"),
});

const AssociationsFormValidationSchema = Yup.object().shape({
    attributions: Yup.array()
        .of(
            Yup.object().shape({
                type: Yup.string().required("Type is required"),
                name: Yup.string().when("type", {
                    is: (val) => val !== "report",
                    then: (Yup) => Yup.required("Name is required"),
                    otherwise: (Yup) => Yup.notRequired(),
                }),
                title: Yup.string().when("type", {
                    is: (val) => val === "report",
                    then: (Yup) => Yup.required("Title is required"),
                    otherwise: (Yup) => Yup.notRequired(),
                }),
                summary: Yup.string().when("type", {
                    is: (val) => val === "report",
                    then: (Yup) => Yup.required("Summary is required"),
                    otherwise: (Yup) => Yup.notRequired(),
                }),
                report_url: Yup.string().when("type", {
                    is: (val) => val === "report",
                    then: (Yup) => Yup.required("Report URL is required"),
                    otherwise: (Yup) => Yup.notRequired(),
                }),
                attribution_type: Yup.string().when("type", {
                    is: (val) => val !== "report",
                    then: (Yup) => Yup.required("Relationship is required"),
                    otherwise: (Yup) => Yup.notRequired(),
                }),
            })
        )
        .required("At least one object is required"),
});

export const useFormValidationSchema = (handleNext) => {
    const requestObject = useSelector(getRequestObject);
    const dispatch = useDispatch();

    const values = requestObject?.attributions ? Object.values(requestObject.attributions) : [];
    const reportsValues =
        requestObject?.reports && requestObject?.reports.length > 0
            ? requestObject?.reports.map((item) => ({ ...item, type: "report" }))
            : [];
    const mergedAttributions = [].concat(...values, reportsValues);

    if (!mergedAttributions || mergedAttributions.length === 0) {
        mergedAttributions.push({});
    }

    const formikDescribeForm = useFormik({
        initialValues: {
            name: requestObject?.name || "",
            variant: requestObject?.variant || "",
            version: requestObject?.version || "",
            description: requestObject?.description || "",
            report_type: requestObject?.report_type || "",
            aliases: requestObject?.aliases || [],
            open_source: requestObject?.open_source || false,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            // .matches(/^\S*$/, "Name cannot contain spaces"),
            description: Yup.string().required("Description is required"),
            report_type: requestObject.type === "REPORTS" ? Yup.string().required("Report Type is required") : Yup.string().notRequired(),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            const isValid = await formikDescribeForm.validateForm();

            if (isValid) {
                dispatch(setRequestObject({ ...requestObject, ...values }));
                handleNext();
            }
        },
    });

    const formikDetailsForm = useFormik({
        initialValues: {
            targets: requestObject?.targets || [],
            located_at: requestObject?.located_at || [],
            sophistication: requestObject?.sophistication || "",
            primary_motivation: requestObject?.primary_motivation || "",
            secondary_motivations: requestObject?.secondary_motivations || [],
            tags: requestObject?.tags || [],
            capabilities: requestObject?.capabilities || [],
            originates_from: requestObject?.originates_from || [],
            platforms: requestObject?.platforms || [],
            first_seen: requestObject?.first_seen || "",
            last_seen: requestObject?.last_seen || "",
            report_date: requestObject?.report_date || "",
        },
        validationSchema: Yup.object().shape({
            report_date: requestObject.type === "REPORTS" ? Yup.string().required("Report Date is required") : Yup.string().notRequired(),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(setRequestObject({ ...requestObject, ...values }));
            handleNext();
        },
    });

    const formikMitreAttackForm = useFormik({
        initialValues: {
            techniques: requestObject.techniques || [],
        },
        validationSchema: MitreAttackFormValidationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(setRequestObject({ ...requestObject, ...values }));
            handleNext();
        },
    });

    const formikAssociationsForm = useFormik({
        initialValues: {
            attributions: mergedAttributions || [{ type: "", name: "", attribution_type: "" }],
        },
        validationSchema: AssociationsFormValidationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            let request = { ...requestObject };
            let updateAttributions = {};
            let updatedReports = [];
            for (let i = 0; i < values?.attributions.length; i++) {
                const element = values?.attributions[i];
                if (element?.type === "report") {
                    updatedReports.push({
                        title: element?.title,
                        summary: element?.summary,
                        report_url: element?.report_url,
                        version: "latest",
                        report_type: "External Reference",
                    });
                } else {
                    if (updateAttributions?.hasOwnProperty(element?.type)) {
                        updateAttributions[element?.type] = [
                            ...updateAttributions[element?.type],
                            {
                                attribution_type: element?.attribution_type,
                                description: element?.description,
                                id: element?.id,
                                name: element?.name,
                                type: element?.type,
                            },
                        ];
                    } else {
                        updateAttributions[element?.type] = [
                            {
                                attribution_type: element?.attribution_type,
                                description: element?.description,
                                id: element?.id,
                                name: element?.name,
                                type: element?.type,
                            },
                        ];
                    }
                }
            }
            if (Object.keys(updateAttributions).length > 0) {
                request = { ...request, attributions: updateAttributions };
            }
            if (updatedReports.length > 0) {
                request = { ...request, reports: updatedReports };
            }
            request = await removeEmptyKeys(request);
            dispatch(setRequestObject({ ...request }));
            handleNext();
        },
    });

    return {
        formikDescribeForm,
        formikDetailsForm,
        formikMitreAttackForm,
        formikAssociationsForm,
    };
};
