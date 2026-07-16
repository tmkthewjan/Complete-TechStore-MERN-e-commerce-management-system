import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { BiKey, BiUser } from "react-icons/bi";
import api from "../utils/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/users", {
        firstName,
        lastName,
        email: email.trim().toLowerCase(),
        password,
      });

      toast.success("Account created! Please sign in.");
      navigate("/signin");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration failed");
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
        <h1 className="text-4xl font-bold text-center text-white mb-2">Create Account</h1>
        <p className="text-center text-gray-200 mb-8">Join us and start shopping</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-white font-semibold">First Name</label>
              <div className="flex items-center bg-white rounded-lg mt-2 px-3">
                <BiUser className="text-gray-500 text-2xl" />
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full p-3 outline-none rounded-lg"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="text-white font-semibold">Last Name</label>
              <div className="flex items-center bg-white rounded-lg mt-2 px-3">
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full p-3 outline-none rounded-lg"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

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

          <div>
            <label className="text-white font-semibold">Confirm Password</label>
            <div className="flex items-center bg-white rounded-lg mt-2 px-3">
              <BiKey className="text-gray-500 text-2xl" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 outline-none rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-3 rounded-lg"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center text-white mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-300 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}