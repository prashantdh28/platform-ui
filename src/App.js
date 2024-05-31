import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { ActorIdContext } from "./Context/context";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ConfigureAmplify } from "./helper/amplify";
import "react-virtualized/styles.css";

// import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";

const CloseButton = ({ closeToast }) => (
    <i className="material-icons" onClick={closeToast}>
        <CloseOutlinedIcon sx={{ fill: "#fff" }} />
    </i>
);

function App() {
    const [actorIds, setActorIds] = useState([]);
    const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
    useEffect(() => {
        document.body.setAttribute("data-theme", BackgroundColor);
        ConfigureAmplify();
    }, [BackgroundColor]);

    return (
        <>
            <ActorIdContext.Provider value={{ actorIds, setActorIds }}>
                <RouterProvider router={router} />
                <ToastContainer closeButton={CloseButton} />
            </ActorIdContext.Provider>
        </>
    );
}

export default App;
