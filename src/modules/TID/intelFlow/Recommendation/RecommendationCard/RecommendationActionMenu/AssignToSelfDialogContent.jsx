import { Button, CircularProgress, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomLoadingButton from "../../../../../../Components/Custom/CustomLoadingButton";
import useToastify from "../../../../../../Hooks/useToastify";
import { getUser } from "../../../../../../redux/Slice/Auth/authSlice";
import { getAddUpdateTaskLoading } from "../../../../../../redux/Slice/TID/myTasksSlice";
import { assignTask } from "../../../../../../Services/TID/myTasks.service";

const AssignToSelfDialogContent = ({ handleClickDialog, setSelectedValue, setItem, data }) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const { showToast } = useToastify();

    const tasksLoading = useSelector(getAddUpdateTaskLoading);

    const onYesClick = async () => {
        const requestObject = {
            control_id: data?.controlId,
            recommendation_id: data?.recommendationId,
            recommendation_name: data?.recommendation,
            assigned_action: {
                ...data?.actionableItem,
                status: "ASSIGNED",
                assigned_to: user?.signInDetails?.loginId,
                assigned_username: user?.name,
            },
        };
        const response = await dispatch(assignTask({ requestObject: requestObject })).unwrap();
        if (response) {
            showToast("The task has been successfully assigned.", {
                type: "success",
            });
            setItem(response?.assigned_action);
        }
        setSelectedValue("self");
        handleClickDialog();
    };

    return (
        <>
            <DialogTitle id="alert-dialog-title">Are you sure to assign the task to yourself?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClickDialog} variant="contained">
                    No
                </Button>
                <CustomLoadingButton
                    loadingIndicator={<CircularProgress size={20} />}
                    loading={tasksLoading}
                    onClick={onYesClick}
                    variant="contained"
                >
                    Yes
                </CustomLoadingButton>
            </DialogActions>
        </>
    );
};

export default AssignToSelfDialogContent;
