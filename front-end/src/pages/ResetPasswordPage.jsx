import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BiKey } from "react-icons/bi";
import api from "../utils/api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/users/reset-password/${token}`, { password });
      toast.success("Password reset successfully! Please sign in.");
      navigate("/signin");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920')",
      }}
    >
      <div className="w-[420px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-2">Reset Password</h1>
        <p className="text-center text-gray-200 mb-8">Enter your new password below</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-white font-semibold">New Password</label>
            <div className="flex items-center bg-white rounded-lg mt-2 px-3">
              <BiKey className="text-gray-500 text-2xl" />
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 outline-none rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-white font-semibold">Confirm Password</label>
            <div className="flex items-center bg-white rounded-lg mt-2 px-3">
              <BiKey className="text-gray-500 text-2xl" />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full p-3 outline-none rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <p className="text-center text-white mt-4">
            <Link to="/signin" className="text-blue-300 hover:underline">
              ← Back to Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}