import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, FormHelperText, Grid, IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchAuthSession } from "aws-amplify/auth";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CustomLoadingButton from "../../../Components/Custom/CustomLoadingButton";
import useToastify from "../../../Hooks/useToastify";
import { authSignUp } from "../../../Services/Auth/Auth.service";
// import { Grid } from "react-virtualized";
import loginBg from "../../../Assests/Img/loginBg.jpg";
import { ReactComponent as Gambitcyber } from "../../../Assests/SVG/gambit cyber.svg";
import CustomOutlinedInput from "../../../Components/Custom/CustomOutlinedInput";

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const initialValues = { name: "", email: "", password: "", confirmPassword: "" };

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showToast } = useToastify();

    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = async (values, resetForm) => {
        try {
            const user = await dispatch(
                authSignUp({ name: values.name, email: values.email, password: values.password })
            ).unwrap();
            if (
                user &&
                user?.isSignUpComplete === false &&
                user?.nextStep?.signUpStep === "CONFIRM_SIGN_UP"
            ) {
                showToast(
                    "Thank you for signing up. An email notification will be sent to you once your platform request is approved by the admin.",
                    {
                        type: "info",
                    }
                );
                navigate("/login");
            }
            resetForm(initialValues);
        } catch (error) {
            if (error && error.name === "UsernameExistsException") {
                showToast("An account with this email already exists.", {
                    type: "info",
                });
                navigate("/login");
            }
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            handleSignUp(values, resetForm);
            setSubmitting(false);
        },
    });

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const { idToken } = (await fetchAuthSession()).tokens ?? {};
                if (!!idToken) {
                    navigate("/intel-flow");
                }
            } catch (error) {
                console.error("Error checking authentication status:", error);
            } finally {
            }
        };

        checkAuthStatus();
    }, [navigate]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container className="main-box">
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
                <Grid item xs={12} sm={6} md={6} elevation={6} className="login-box">
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
                        <Box
                            component="form"
                            noValidate
                            onSubmit={formik.handleSubmit}
                            style={{ width: "100%" }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                    margin: "0.5rem",
                                }}
                            >
                                <CustomOutlinedInput
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    placeholder="Enter Your Name"
                                    sx={{
                                        height: "2.9rem",
                                    }}
                                    formSx={{
                                        width: "100%",
                                    }}
                                />
                                <FormHelperText error>
                                    {formik.touched.name && formik.errors.name}
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
                                    margin="normal"
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
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.confirmPassword &&
                                        Boolean(formik.errors.confirmPassword)
                                    }
                                    type={showPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    placeholder="Enter your confirm password"
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
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword}
                                </FormHelperText>
                            </Box>
                            <CustomLoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Signing up..." : "Sign Up"}
                            </CustomLoadingButton>
                        </Box>
                        <Button variant="text" onClick={() => navigate("/login")}>
                            {"Already have an account? Sign In"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default SignUp;
