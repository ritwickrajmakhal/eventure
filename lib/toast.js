import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (type, message, options = {}) => {
    const defaultOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        ...options,
    };

    switch (type) {
        case 'success':
            toast.success(message, defaultOptions);
            break;
        case 'error':
            toast.error(message, defaultOptions);
            break;
        case 'info':
            toast.info(message, defaultOptions);
            break;
        case 'warn':
            toast.warn(message, defaultOptions);
            break;
        default:
            toast(message, defaultOptions);
    }
};

export default showToast;