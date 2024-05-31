import { Autocomplete, Button, Chip, FormHelperText, TextField } from "@mui/material";
import { DropDownListComponent, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { useFormik } from "formik";
import moment from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { BiCalendar, BiCurrentLocation, BiLocationPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import Threat from "../../Assests/SVG/ThreatActor.svg";
import MultiAutoComplete from "../../AutoComplete/MultiAutoComplete";
import { Contries } from "../../Constants/ContryConstant";
import useToastify from "../../Hooks/useToastify";
import {
    getMotivationsData,
    getSophisticationData,
    getThreatActorTypesData,
} from "../../Services/Activity/activity.service";
import { createactor, getChannelsNameData } from "../../Services/Actors/actors.service";
import { getTIDEntityByID } from "../../Services/TID/tid.service";
import CustomAccordion from "../Accordion/CustomAccordion";
import "./createactor.css";

const AccordionSection = ({ header, items, setItems, onFieldChange, onDeleteCard, onNewFieldAdd }) => {
    return (
        <CustomAccordion accordionHeader={header}>
            <div className="accordions-content-div">
                {items?.map((item, index) => (
                    <div className="accordions-form" key={index}>
                        <TextField
                            label="Name"
                            placeholder="Enter Name"
                            onChange={(e) => onFieldChange(index, "name", e.target.value, setItems)}
                        />
                        <TextField
                            label="Type"
                            placeholder="Enter Type"
                            onChange={(e) =>
                                onFieldChange(index, "attribution_type", e.target.value, setItems)
                            }
                        />
                        {items.length > 1 && (
                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => onDeleteCard(index, setItems)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
                <Button onClick={() => onNewFieldAdd(setItems)}>Add</Button>
            </div>
        </CustomAccordion>
    );
};

const CreateActor = () => {
    const [sophistication, setSophistication] = useState([]);
    const [threatActorTypes, setThreatActorTypes] = useState([]);
    const [motivations, setMotivations] = useState([]);
    const [channelName, setChannelName] = useState([]);
    const [personas, setPersonas] = useState([null]);
    const [vulnerability, setVulnerability] = useState([null]);
    const [malware, setMalware] = useState([null]);
    const [threatActors, setThreatActors] = useState([null]);
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);

    const navigate = useNavigate();

    const { showToast } = useToastify();

    const { id } = useParams();
    const dispatch = useDispatch();
    const { entityID } = useSelector((state) => state.TIDEntity);

    useEffect(() => {
        if (id && id !== "") {
            dispatch(getTIDEntityByID(id));
        }
    }, [dispatch, id]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        located_at: Yup.array().min(1, "Source region are required"),
        targets: Yup.array().min(1, "Target region are required"),
        aliases: Yup.array().min(1, "Aliases are required"),
    });

    const fetchData = useCallback(async (fetchFunction, setFunction) => {
        const response = await fetchFunction();
        setFunction(response);
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            located_at: [],
            targets: [],
            aliases: [],
            techniques: [],
            tags: [],
            sophistication: [],
            threatActorTypes: [],
            primaryMotivation: [],
            secondaryMotivations: [],
            // last_seen: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // const lastSeen = values?.last_seen && new Date(values.last_seen);
            const filteredVulnerability = vulnerability.filter((item) => item !== null && item !== undefined);
            const filteredMalware = malware.filter((item) => item !== null && item !== undefined);
            const filteredThreatActors = threatActors.filter((item) => item !== null && item !== undefined);
            const filteredPersonas = personas.filter((item) => item !== null && item !== undefined);
            const attributions = {};
            if (filteredVulnerability && filteredVulnerability.length > 0) {
                attributions["vulnerabilities"] = filteredVulnerability;
            }
            if (filteredMalware && filteredMalware.length > 0) {
                attributions["malware"] = filteredMalware;
            }
            if (filteredThreatActors && filteredThreatActors.length > 0) {
                attributions["threat_actors"] = filteredThreatActors;
            }
            const validPersonas = filteredPersonas
                ?.map((persona) => {
                    return persona && persona.name !== null && persona.channel_name !== null ? persona : null;
                })
                .filter((item) => item !== null && item !== undefined);

            const firstSeen = new Date();
            const reqTargets =
                values.targets &&
                values.targets.length > 0 &&
                values.targets?.map((target) => {
                    return (
                        Contries &&
                        Contries.length > 0 &&
                        Contries.filter((country) => country.country === target)[0]
                    );
                });
            const reqSource =
                values.located_at &&
                values.located_at.length > 0 &&
                values.located_at?.map((source) => {
                    return (
                        Contries &&
                        Contries.length > 0 &&
                        Contries?.filter((country) => country.country === source)[0]
                    );
                });
            const requestObj = {
                ...values,
                first_seen: firstSeen.toISOString(),
                last_seen: firstSeen.toISOString(),
                targets: reqTargets,
                located_at: reqSource,
            };
            if (values?.sophistication) {
                requestObj["sophistication"] = values.sophistication;
            }
            if (attributions && !(Object.keys(attributions).length === 0)) {
                requestObj["attributions"] = attributions;
            }
            if (validPersonas && validPersonas.length > 0) {
                requestObj["personas"] = validPersonas;
            }
            const response = await createactor(requestObj);
            if (response) {
                showToast("Actor Creted Successfully", { type: "success" });
                navigate("/");
            }
        },
    });

    useEffect(() => {
        if (id && id !== "") {
            // Update form values when initialValues prop changes
            const aliasesFor = entityID?.aliases?.map((item) => item.name);
            const techniquesForEntity = entityID?.techniques?.map((item) => item.name);
            // const entityID.targets = ;

            formik.setValues({
                name: entityID.name || "",
                description: entityID.description || "",
                located_at: entityID?.located_at?.map((item) => item.name) || [],
                targets: entityID?.targets?.map((item) => item.name) || [],
                aliases: aliasesFor || [],
                techniques: techniquesForEntity || [],
                tags: entityID?.tags?.map((item) => item.name) || [],
                sophistication: entityID?.sophistication?.map((item) => item.name) || [],
                threatActorTypes: entityID?.threatActorTypes?.map((item) => item.name) || [],
                primaryMotivation: entityID?.primaryMotivation?.map((item) => item.name) || [],
                secondaryMotivations: entityID?.secondaryMotivations?.map((item) => item.name) || [],
            });
        }
        // eslint-disable-next-line
    }, [entityID]);

    const handleFieldChange = (field, value) => {
        formik.setFieldValue(field, value);
    };

    const handleDeleteCard = (index, setField) => {
        setField((prev) => {
            const updatedField = [...prev];
            updatedField.splice(index, 1);
            return updatedField;
        });
    };

    const onNewFieldAdd = (setState) => {
        setState((prev) => [...prev, null]);
    };

    const handleArrayChange = (index, field, value, setState) => {
        setState((pre) => {
            const cloneArray = [...pre];
            cloneArray[index] = { ...cloneArray[index], [field]: value };
            return cloneArray;
        });
    };

    useEffect(() => {
        fetchData(getSophisticationData, setSophistication);
        fetchData(getThreatActorTypesData, setThreatActorTypes);
        fetchData(getMotivationsData, setMotivations);
        fetchData(getChannelsNameData, setChannelName);
    }, [fetchData, dispatch]);

    return (
        <div className="New-card-main">
            <form>
                <div className="submit-button-div">
                    <Button className="createCard-submit" onClick={formik.handleSubmit}>
                        {id && id !== "" ? "Update" : "Submit"}
                    </Button>
                    <Button className="createCard-cancel" onClick={() => navigate("/")}>
                        cancel
                    </Button>
                </div>
                <div className="thread-card">
                    <div className="Create-card-container-thread">
                        <div className="left-Container-new">
                            <div className="parent-section-Input">
                                <div className="profile-img-new-actor">
                                    <img
                                        src={Threat}
                                        className="img-actor"
                                        alt=""
                                        style={{ paddingTop: "25%" }}
                                    />
                                </div>

                                <div className="create-parent-input" style={{ width: "80%" }}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        placeholder="Enter Name"
                                        name="name"
                                    />

                                    <TextField
                                        fullWidth
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.description && Boolean(formik.errors.description)
                                        }
                                        helperText={formik.touched.description && formik.errors.description}
                                        placeholder="Enter Description"
                                        multiline
                                        rows={6}
                                        style={{ paddingTop: "2%" }}
                                    />
                                </div>
                            </div>
                            <div className="create-actor-options">
                                <div className="options-container">
                                    <div className="options-container-first">
                                        <div className="parent-published">
                                            <span className="cerate-published-logo">
                                                <BiCalendar
                                                    style={{
                                                        color: BackgroundColor,
                                                        fontSize: "1.2em",
                                                    }}
                                                />

                                                <span className="createCard-texts">Published :</span>
                                            </span>
                                            <span className="createActor-inner-text-color-published">
                                                {moment(new Date().toISOString()).format("DD.MM.YYYY")}
                                            </span>
                                        </div>
                                        <div className="parent-source-region">
                                            <BiLocationPlus
                                                style={{
                                                    color: BackgroundColor,
                                                    fontSize: "1.2em",
                                                }}
                                            />
                                            <div className="create-source-region">
                                                <span className="createCard-texts">Source Region : </span>
                                                <div className="createActor-inner-text-color control-styles">
                                                    <div className="createActor-ParentSelect-Component">
                                                        <MultiSelectComponent
                                                            dataSource={Contries}
                                                            id="located_at"
                                                            name="located_at"
                                                            fields={{ text: "country", value: "country" }}
                                                            placeholder="Select countries"
                                                            onChange={formik.handleChange}
                                                            value={formik.values.located_at || []}
                                                            changeOnBlur={false}
                                                            cssClass="CreateActor-Select-Component"
                                                        />
                                                    </div>

                                                    {formik.touched.located_at &&
                                                    Boolean(formik.errors.located_at) ? (
                                                        <FormHelperText error>
                                                            {formik.touched.located_at &&
                                                                formik.errors.located_at}
                                                        </FormHelperText>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opetions-container-second">
                                        <div
                                            style={{
                                                gap: "5px",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        ></div>
                                        <div
                                            style={{
                                                paddingTop: "12px",
                                                gap: "5px",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <BiCurrentLocation
                                                style={{
                                                    color: BackgroundColor,
                                                    fontSize: "1.2em",
                                                }}
                                            />
                                            <span className="createCard-texts">Target Region : </span>
                                            <span className="createActor-inner-text-color">
                                                <MultiSelectComponent
                                                    dataSource={Contries}
                                                    id="targets"
                                                    name="targets"
                                                    value={formik.values.targets || []}
                                                    fields={{ text: "country", value: "country" }}
                                                    placeholder="Select countries"
                                                    onChange={formik.handleChange}
                                                    changeOnBlur={false}
                                                    cssClass="targets-multi"
                                                />
                                                {formik.touched.targets && Boolean(formik.errors.targets) ? (
                                                    <FormHelperText error>
                                                        {formik.touched.targets && formik.errors.targets}
                                                    </FormHelperText>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="new-add-tag-ttps">
                                    <div className="new-tags">
                                        <span className="create-actor-tags">Tags</span>
                                        <MultiAutoComplete
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        label={option}
                                                        {...getTagProps({ index })}
                                                    />
                                                ))
                                            }
                                            placeHolder="Tags"
                                            options={[]?.map((option) => option.title)}
                                            onChange={(e, value) => handleFieldChange("tags", value)}
                                        />
                                    </div>
                                    <div className="new-tags">
                                        <span className="create-actor-tags">TTP </span>
                                        <MultiAutoComplete
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        label={option}
                                                        {...getTagProps({ index })}
                                                    />
                                                ))
                                            }
                                            value={formik.values.techniques}
                                            options={[]?.map((option) => option.title)}
                                            placeHolder="TTPs"
                                            onChange={(e, value) => handleFieldChange("techniques", value)}
                                        />
                                    </div>

                                    <div className="new-aliases">
                                        <span className="create-actor-tags">Alliases</span>
                                        <MultiAutoComplete
                                            name="aliases"
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        label={option}
                                                        {...getTagProps({ index })}
                                                    />
                                                ))
                                            }
                                            placeHolder="Alliases"
                                            value={formik.values.aliases}
                                            options={[]?.map((option) => option.title)}
                                            onChange={(e, value) => handleFieldChange("aliases", value)}
                                        />
                                    </div>
                                    {formik.touched.aliases && Boolean(formik.errors.aliases) ? (
                                        <FormHelperText error>
                                            {formik.touched.aliases && formik.errors.aliases}
                                        </FormHelperText>
                                    ) : (
                                        ""
                                    )}
                                    <div className="new-aliases">
                                        <span className="create-actor-tags">Sophistication</span>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
                                        >
                                            <Autocomplete
                                                freeSolo
                                                fullWidth
                                                value={formik.values.sophistication || []}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select Sophistication"
                                                    />
                                                )}
                                                name="sophistication"
                                                options={sophistication?.map((option) => option)}
                                                onChange={(e, value) =>
                                                    handleFieldChange("sophistication", value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="new-aliases">
                                        <span className="create-actor-tags">Threat Actor Types</span>
                                        <MultiAutoComplete
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        label={option}
                                                        {...getTagProps({ index })}
                                                    />
                                                ))
                                            }
                                            placeHolder="Select Threat Actor Type"
                                            name="threat_actor_types"
                                            value={formik.values.threatActorTypes || []}
                                            options={threatActorTypes?.map((option) => option)}
                                            onChange={(e, value) =>
                                                handleFieldChange("threat_actor_types", value)
                                            }
                                        />
                                    </div>
                                    <div className="new-aliases">
                                        <span className="create-actor-tags">Primary Motivation</span>
                                        <div
                                            style={{
                                                border: "1px solid black",
                                                width: "100%",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            <DropDownListComponent
                                                placeHolder="Select Primary Motivation"
                                                name="primary_motivation"
                                                dataSource={motivations}
                                                style={{ padding: "10px" }}
                                                value={formik.values.primaryMotivation || []}
                                                onChange={(event) =>
                                                    handleFieldChange("primary_motivation", event.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="new-aliases">
                                        <span className="create-actor-tags">Secondary Motivations</span>
                                        <MultiAutoComplete
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        label={option}
                                                        {...getTagProps({ index })}
                                                    />
                                                ))
                                            }
                                            placeHolder="Select Secondary Motivations"
                                            name="secondary_motivations"
                                            value={formik.values.secondaryMotivations || []}
                                            options={motivations?.map((option) => option)}
                                            onChange={(e, value) =>
                                                handleFieldChange("secondary_motivations", value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <AccordionSection
                            header="Vulnerability"
                            items={vulnerability}
                            setItems={setVulnerability}
                            onFieldChange={handleArrayChange}
                            onDeleteCard={handleDeleteCard}
                            onNewFieldAdd={onNewFieldAdd}
                        />

                        <AccordionSection
                            header="Malware"
                            items={malware}
                            setItems={setMalware}
                            onFieldChange={handleArrayChange}
                            onDeleteCard={handleDeleteCard}
                            onNewFieldAdd={onNewFieldAdd}
                        />

                        <AccordionSection
                            header="Threat Actors"
                            items={threatActors}
                            setItems={setThreatActors}
                            onFieldChange={handleArrayChange}
                            onDeleteCard={handleDeleteCard}
                            onNewFieldAdd={onNewFieldAdd}
                        />
                        <CustomAccordion accordionHeader="Personas">
                            <div className="accordions-content-div">
                                {personas?.map((item, index) => {
                                    return (
                                        <div className="accordions-form" key={index}>
                                            <TextField
                                                label="Name"
                                                placeholder="Enter Name"
                                                onChange={(e) =>
                                                    handleArrayChange(
                                                        index,
                                                        "name",
                                                        e.target.value,
                                                        setPersonas
                                                    )
                                                }
                                            />
                                            <Autocomplete
                                                fullWidth
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select Channel Name"
                                                    />
                                                )}
                                                name="channel_name"
                                                options={channelName?.map((option) => option)}
                                                onChange={(e, value) => {
                                                    handleArrayChange(
                                                        index,
                                                        "channel_name",
                                                        value,
                                                        setPersonas
                                                    );
                                                }}
                                            />
                                            {personas.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="delete-button"
                                                    onClick={() => handleDeleteCard(index, setPersonas)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                                {/* <div className="createActor-add-button"> */}
                                <Button
                                    className="createActor-add-button"
                                    onClick={() => onNewFieldAdd(setPersonas)}
                                >
                                    Add
                                </Button>
                                {/* </div> */}
                            </div>
                        </CustomAccordion>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default memo(CreateActor);
