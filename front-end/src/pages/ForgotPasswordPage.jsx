import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import api from "../utils/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users/forgot-password", { email: email.trim().toLowerCase() });
      setSent(true);
      toast.success("Reset link sent! Check your email.");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
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
        <h1 className="text-4xl font-bold text-center text-white mb-2">Forgot Password</h1>
        <p className="text-center text-gray-200 mb-8">
          Enter your email and we'll send you a reset link
        </p>

        {sent ? (
          <div className="text-center">
            <p className="text-white mb-6">
              If an account exists with <span className="font-semibold">{email}</span>, a
              reset link has been sent. Check your inbox.
            </p>
            <Link to="/signin" className="inline-block text-blue-300 hover:underline font-medium">
              ← Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white font-semibold">Email</label>
              <div className="flex items-center bg-white rounded-lg mt-2 px-3">
                <MdEmail className="text-gray-500 text-2xl" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-white mt-4">
              Remembered your password?{" "}
              <Link to="/signin" className="text-blue-300 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}