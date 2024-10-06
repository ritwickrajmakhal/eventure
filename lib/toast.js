import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define sound URLs (or paths)
const sounds = {
  success: "/sounds/success.mp3",
  error: "/sounds/error.wav",
  info: "/sounds/info.mp3",
  warn: "/sounds/warn.mp3",
};

// Play sound function
const playSound = (type) => {
  const soundUrl = sounds[type];
  if (soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play();
  }
};

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

  // Play the sound for the given type
  playSound(type);

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