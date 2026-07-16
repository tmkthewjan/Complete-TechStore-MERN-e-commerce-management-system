import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { isLoggedIn } from "../utils/auth";

const DISMISS_KEY = "signInPromptDismissed";

export default function SignInPrompt() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Don't show again this session if the user already dismissed it
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => {
      if (!isLoggedIn()) {
        setShow(true);
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setShow(false);
    sessionStorage.setItem(DISMISS_KEY, "true");
  }

  function handleSignIn() {
    setShow(false);
    sessionStorage.setItem(DISMISS_KEY, "true");
    navigate("/signin");
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Don't miss out
        </h2>
        <p className="text-gray-500 mb-6">
          Sign in to track your orders, save your cart, and get personalized offers.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={handleClose}
            className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}