import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import HeaderCard from "../Components/HeaderCard/headerCard";
import StepperForm from "../Components/Stepper/stepper";
import { getSingleRisk } from "../../redux/Slice/riskManagementApiSlice";
import { riskProfile, setForm2Data, setActiveTab, formatData } from "../../redux/Slice/riskManagementSlice";
import "./createRisk.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
    CarouselComponent,
    CarouselItemsDirective,
    CarouselItemDirective,
} from "@syncfusion/ej2-react-navigations";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Identify from "../Components/Guidance/identify";
import Protect from "../Components/Guidance/protect";
import Recover from "../Components/Guidance/recover";
import Respond from "../Components/Guidance/respond";
import Detect from "../Components/Guidance/detect";

const style = {
    borderRadius: "15px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "var(--container-bg-color)",
    boxShadow: 24,
    p: 4,
    width: "45%",
};

const CreateRisk = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleRiskData } = useSelector((state) => state.riskApi);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getSingleRisk(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (id && singleRiskData) {
            const data = JSON.parse(JSON.stringify(singleRiskData));
            const from1Data = {
                name: singleRiskData?.name,
                description: singleRiskData?.description,
                department_name: singleRiskData?.department_name,
                checkboxValues: singleRiskData?.profile_type === "TARGET" ? true : false,
                is_public: singleRiskData?.is_public,
                profile_type: singleRiskData?.profile_type,
                source_profile: singleRiskData?.source_profile,
            };
            dispatch(setActiveTab(+singleRiskData?.form_id));
            dispatch(riskProfile(from1Data));
            const from2Data = singleRiskData?.business_objectives?.map((objective) => {
                return {
                    name: objective?.name,
                    description: objective?.description,
                    priority: objective?.priority,
                    functions: objective?.functions,
                };
            });
            dispatch(formatData({ ...data }));
            dispatch(setForm2Data(from2Data ? from2Data : [{ name: "", description: "", priority: "" }]));
        }
    }, [singleRiskData, dispatch, id]);

    const handleClose = () => {
        setStatus(false);
    };

    const previousButtonTemplate = (props) => {
        return (
            <button className="e-btn carousel-btn" cssClass="e-flat e-round">
                <ArrowBackIosIcon />
            </button>
        );
    };
    const nextButtonTemplate = (props) => {
        return (
            <button className="e-btn carousel-btn" cssClass="e-flat e-round">
                <ArrowForwardIosIcon />
            </button>
        );
    };

    return (
        <>
            <div className="createrisk-main-container">
                <div className="header-container">
                    <HeaderCard setStatus={setStatus} />
                </div>
                <div>
                    <StepperForm />
                </div>
            </div>
            <Modal
                open={status}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        style={{ position: "absolute", top: 5, right: 5 }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        id="modal-modal-title"
                        style={{ margin: "0 3rem", color: "var(--name-email)" }}
                        variant="h6"
                        component="h2"
                    >
                        Guidance for create Risk Profile
                    </Typography>
                    <div className="control-container">
                        <CarouselComponent
                            autoPlay={false}
                            showIndicators={false}
                            previousButtonTemplate={previousButtonTemplate}
                            nextButtonTemplate={nextButtonTemplate}
                        >
                            <CarouselItemsDirective>
                                <CarouselItemDirective template={Identify} />
                                <CarouselItemDirective template={Protect} />
                                <CarouselItemDirective template={Detect} />
                                <CarouselItemDirective template={Respond} />
                                <CarouselItemDirective template={Recover} />
                            </CarouselItemsDirective>
                        </CarouselComponent>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default CreateRisk