import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { BiKey } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import api from "../utils/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/users/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("authChanged"));

      toast.success("Login Successful!");

      if (res.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login Failed");
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
        <h1 className="text-4xl font-bold text-center text-white mb-2">Welcome Back</h1>
        <p className="text-center text-gray-200 mb-8">Login to your account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-white font-semibold">Email</label>
            <div className="flex items-center bg-white rounded-lg mt-2 px-3">
              <MdEmail className="text-gray-500 text-2xl" />
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-3 outline-none rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-white font-semibold">Password</label>
            <div className="flex items-center bg-white rounded-lg mt-2 px-3">
              <BiKey className="text-gray-500 text-2xl" />
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full p-3 outline-none rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <label className="text-white flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-blue-300 hover:text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-3 rounded-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <button
            type="button"
            className="w-full bg-white text-black py-3 rounded-lg flex justify-center items-center gap-3 hover:bg-gray-100 transition"
          >
            <FcGoogle size={25} />
            Continue with Google
          </button>

          <p className="text-center text-white mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-300 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}