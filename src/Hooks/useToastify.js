import { useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToastify = () => {
    const showToast = useCallback((message, options = {}) => {
        toast(message, {
            position: options.position || "top-right",
            autoClose: options.autoClose || 5000,
            hideProgressBar: options.hideProgressBar !== undefined ? options.hideProgressBar : false,
            closeOnClick: options.closeOnClick !== undefined ? options.closeOnClick : true,
            pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
            draggable: options.draggable !== undefined ? options.draggable : true,
            progress: options.progress !== undefined ? options.progress : undefined,
            theme: options.theme,
            type: options.type || "default" || "warning" || "success" || "error" || "info",
            style: { background: "#08172f", color: "#fff", border: "2px solid #1e2b40", fill: "#fff" },
            closeButton: { theme: "dark" },
            ...options,
        });
    }, []);

    return { showToast };
};

export default useToastify;
