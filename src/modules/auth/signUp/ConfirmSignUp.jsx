import React, { useState } from "react";
import CustomOutlinedInput from "../../../Components/Custom/CustomOutlinedInput";

const ConfirmSignUp = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    return (
        <>
            <CustomOutlinedInput
                margin="normal"
                required
                fullWidth
                id="confirmationCode"
                label="Confirmation Code"
                name="confirmationCode"
                value={confirmationCode}
                onChange={(e) => {
                    setConfirmationCode(e.target.value);
                }}
                placeholder="Enter Confirmation Code"
                sx={{
                    height: "2.9rem",
                }}
                formSx={{
                    width: "100%",
                }}
            />
        </>
    );
};

export default ConfirmSignUp;
