import { fetchAuthSession } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import BackdropLoader from "../../../Components/Loader/BackdropLoader";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/Slice/Auth/authSlice";

const PrivateRoute = ({ Component }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const user = useSelector(getUser);
    const location = useLocation();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const { idToken } = (await fetchAuthSession()).tokens ?? {};
                setAuthenticated(!!idToken && !!user?.isSignedIn);
            } catch (error) {
                console.error("Error checking authentication status:", error);
            } finally {
                setLoading(false); // Set loading state to false after authentication check is complete
            }
        };

        checkAuthStatus();
    }, [user.isSignedIn]);
    if (loading) {
        return <BackdropLoader loading={loading} />;
    }

    return authenticated ? (
        <React.Fragment>
            <Component />
        </React.Fragment>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
export default PrivateRoute;
