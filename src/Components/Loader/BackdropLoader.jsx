import { Backdrop, CircularProgress } from "@mui/material";

const BackdropLoader = ({ loading }) => {
    //     const [open, setOpen] = useState(loading);
    //     const handleClose = () => {
    //         setOpen(false);
    //     };

    return (
        <>
            <Backdrop
                sx={{ color: "#0083f9", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                //     onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default BackdropLoader;
