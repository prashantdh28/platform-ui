import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
} from "@mui/material";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";
import { fetchAuthSession } from "aws-amplify/auth";
import { useFormik } from "formik";
import * as React from "react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import * as Yup from "yup";
import { ReactComponent as Gambitcyber } from "../../../Assests/SVG/gambit cyber.svg";
import CustomLoadingButton from "../../../Components/Custom/CustomLoadingButton";
import CustomOutlinedInput from "../../../Components/Custom/CustomOutlinedInput";
import useToastify from "../../../Hooks/useToastify";
import { getLoading, getUser, getUserError } from "../../../redux/Slice/Auth/authSlice";
import {
    authSignIn,
    hadnleValidateVerificationCode,
    handleSignInConfirmation,
} from "../../../Services/Auth/Auth.service";
import "./signIn.css";
// import ConfirmSignUp from "../signUp/ConfirmSignUp";
import OTPInput from "react-otp-input";
import loginBg from "../../../Assests/Img/loginBg.jpg";
// import { fetchMFAPreference } from "aws-amplify/auth";

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showToast } = useToastify();
    const loading = useSelector(getLoading);
    const userError = useSelector(getUserError);
    const location = useLocation();

    // const isSignedIn = useAuth();
    const [openDialog, setOpenDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [MFAurl, setMFAurl] = useState("");
    const [emailVerified, setEmailVerified] = useState(true);
    const [confirmationCode, setConfirmationCode] = useState("");
    const user = useSelector(getUser);
    const from =
        location.state?.from?.pathname && location.state?.from?.pathname !== "/"
            ? location.state?.from?.pathname
            : "/intel-flow";

    const handleClickDialog = () => {
        setOpenDialog((pre) => !pre);
    };

    const handleSignInNextSteps = async (output) => {
        const { nextStep } = output;
        switch (nextStep?.signInStep) {
            case "CONFIRM_SIGN_IN_WITH_TOTP_CODE":
                handleClickDialog();
                break;
            case "CONTINUE_SIGN_IN_WITH_TOTP_SETUP":
                const totpSetupDetails = nextStep.totpSetupDetails;
                const appName = "gambitcyber";
                const setupUri = totpSetupDetails.getSetupUri(appName);
                if (setupUri?.href) {
                    setMFAurl(setupUri?.href);
                    handleClickDialog();
                }
                break;
            case "CONFIRM_SIGN_UP":
                showToast("Your account has not been confirmed yet. Please wait for admin approval.", {
                    type: "error",
                });
                break;
            case "DONE":
                showToast("You have been successfully signed in.", {
                    type: "success",
                });
                navigate(from, { replace: true, state: from });
                break;
            default:
                return null;
        }
    };

    const handleLogin = async (values) => {
        const response = await dispatch(
            authSignIn({ email: values.email, password: values.password })
        ).unwrap();
        handleSignInNextSteps(response);
    };

    const onConfirmation = async () => {
        if (confirmationCode && confirmationCode.split("").length === 6) {
            if (!emailVerified) {
                const response = await dispatch(
                    hadnleValidateVerificationCode({ verificationCode: confirmationCode })
                ).unwrap();
                if (response?.emailVerified) {
                    handleSignInNextSteps(response);
                }
            } else {
                const response = await dispatch(
                    handleSignInConfirmation({ totpCode: confirmationCode })
                ).unwrap();
                if (!response?.emailVerified) {
                    // handleClickDialog();
                    setConfirmationCode("");
                    setMFAurl("");
                    showToast("Your email has not been verified.", {
                        type: "error",
                    });
                    showToast("A verification code has been sent to your email.", {
                        type: "success",
                    });
                    return setEmailVerified(false);
                }
                // handleClickDialog();
                handleSignInNextSteps(response);
            }
        }
    };

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            handleLogin(values);
            setSubmitting(false);
        },
    });

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const { idToken } = (await fetchAuthSession()).tokens ?? {};
                if (!!idToken && !!user?.isSignedIn) {
                    navigate(from, { replace: true, state: from });
                }
            } catch (error) {
                console.error("Error checking authentication status:", error);
            } finally {
            }
        };
        checkAuthStatus();
    }, [navigate, user?.isSignedIn, from]);

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* <Box className="main-box"> */}
            <Grid container className="main-box">
                <Grid item xs={12} sm={6} md={6} elevation={6} className="login-box">
                    {/* <Container component="main" maxWidth="xs"> */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                            width: "50%",
                            "& .MuiTypography-root": {
                                color: "#fff",
                            },
                        }}
                    >
                        <Gambitcyber style={{ width: "18rem" }} />
                        {/* <Typography component="h1" variant="h5">
                            Welcome to knight Gaurd
                        </Typography> */}
                        <Box
                            component="form"
                            noValidate
                            onSubmit={formik.handleSubmit}
                            style={{ width: "100%" }}
                        >
                            <FormHelperText
                                error
                                style={{
                                    paddingLeft: "0.8rem",
                                    paddingBottom: "1rem",
                                }}
                            >
                                {userError && typeof userError === "string" && !openDialog && userError}
                            </FormHelperText>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                    margin: "0.5rem",
                                }}
                            >
                                <CustomOutlinedInput
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    placeholder="Enter your email"
                                    sx={{
                                        height: "2.9rem",
                                    }}
                                    formSx={{
                                        width: "100%",
                                    }}
                                />
                                <FormHelperText error>
                                    {formik.touched.email && formik.errors.email}
                                </FormHelperText>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                    margin: "0.5rem",
                                }}
                            >
                                <CustomOutlinedInput
                                    required
                                    fullWidth
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    sx={{
                                        height: "2.9rem",
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffOutlinedIcon sx={{ fill: "#fff" }} />
                                                ) : (
                                                    <VisibilityOutlinedIcon sx={{ fill: "#fff" }} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    formSx={{
                                        width: "100%",
                                    }}
                                />
                                <FormHelperText error>
                                    {formik.touched.password && formik.errors.password}
                                </FormHelperText>
                            </Box>
                            {/* <ErrorMessage className="error_message_field" name="password" component="div" /> */}

                            <CustomLoadingButton
                                className="login_button"
                                loading={loading && !openDialog}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mb: 1, mt: 1, width: "95%" }}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Logging in..." : "Log In"}
                            </CustomLoadingButton>
                        </Box>
                        <Button variant="text" onClick={() => navigate("/signup")}>
                            {"Don't have an account? Sign Up"}
                        </Button>
                    </Box>
                    {/* </Container> */}
                </Grid>
                <Grid item xs={false} sm={6} md={6} sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1rem",
                            backgroundImage: `url(${loginBg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            height: "100%",
                        }}
                    >
                        {/* <Gambitcyber style={{ width: "18rem" }} /> */}
                        {/* <GambitIcon2 /> */}
                    </Box>
                </Grid>
            </Grid>
            <Dialog
                open={openDialog}
                // onClose={closeDialog}
                sx={{
                    "& .MuiPaper-root": {
                        background: "#112038 !important",
                        color: "#fff !important",
                        padding: "0.5rem 0.5rem !important",
                        width: "100%",
                        borderRadius: "0.7rem",
                    },
                    "& .MuiTypography-root": {
                        color: "#fff !important",
                    },
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        }}
                    >
                        {MFAurl
                            ? " Scan the QR code with your authenticator app to retrieve your OTP code, and then enter it below."
                            : emailVerified
                            ? "Enter the OTP from your authenticator app"
                            : "Enter the code that was sent to your email."}
                        <FormHelperText
                            error
                            style={{
                                paddingLeft: "0.8rem",
                                paddingBottom: "1rem",
                            }}
                        >
                            {userError && typeof userError === "string" && userError}
                        </FormHelperText>
                    </div>

                    <CloseOutlinedIcon
                        onClick={() => {
                            handleClickDialog();
                            setConfirmationCode("");
                        }}
                        sx={{ cursor: "pointer", fill: "#8E97A4" }}
                    />
                </DialogTitle>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        gap: "0.5rem",
                    }}
                >
                    {MFAurl && (
                        <DialogContent
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <div>
                                <QRCode
                                    size={320}
                                    style={{
                                        background: "#1E2B40",
                                        padding: "1rem",
                                        borderRadius: "0.7rem",
                                    }}
                                    value={MFAurl}
                                />
                            </div>
                        </DialogContent>
                    )}
                    <OTPInput
                        value={confirmationCode}
                        onChange={(value) => {
                            setConfirmationCode(value);
                        }}
                        containerStyle={{
                            width: "100%",
                            justifyContent: "center",
                            gap: "0.5rem",
                        }}
                        inputStyle={{
                            width: "3.5rem",
                            textAlign: "center",
                            height: "3.5rem",
                            fontSize: "2rem",
                            background: "#040b17",
                            border: "2px solid #1E2B40",
                            color: "#fff",
                            borderRadius: "0.5rem",
                        }}
                        numInputs={6}
                        // renderSeparator={
                        //     <span
                        //         style={{
                        //             width: "1rem",
                        //             borderBottom: "2px solid #fff",
                        //             height: "1px",
                        //         }}
                        //     />
                        // }
                        renderInput={(props) => <input {...props} />}
                    />
                    <DialogActions>
                        <CustomLoadingButton
                            disabled={!confirmationCode && !confirmationCode.split("").length === 6}
                            loading={loading}
                            onClick={onConfirmation}
                            fullWidth
                            variant="contained"
                        >
                            Done
                        </CustomLoadingButton>
                    </DialogActions>
                </div>
            </Dialog>
            {/* </Box> */}
        </ThemeProvider>
    );
};

export default SignIn;
