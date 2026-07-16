import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiBookOpen,
  FiMessageSquare,
  FiSend,
  FiMapPin,
  FiPhone,
  FiClock,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { sendContactMessage } from "../utils/contactApi";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.subject ||
      !form.message
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await sendContactMessage(form);

      toast.success("Message Sent Successfully");

      setForm({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Hero */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 py-20">

        <div className="max-w-6xl mx-auto px-6 text-white">

          <h1 className="text-5xl font-bold">
            Contact TechStore
          </h1>

          <p className="mt-4 text-blue-100 text-lg">
            Have questions? Need product recommendations?
            Send us a message and our team will reply soon.
          </p>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10">

        {/* Left */}

        <div className="space-y-6">

          <div className="bg-white rounded-2xl shadow p-6">

            <FiMapPin className="text-blue-600 text-3xl mb-3" />

            <h2 className="font-bold text-xl mb-2">
              Address
            </h2>

            <p className="text-gray-600">
              TechStore Computer Shop
            </p>

            <p className="text-gray-500">
              Colombo, Sri Lanka
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <FiPhone className="text-green-600 text-3xl mb-3" />

            <h2 className="font-bold text-xl mb-2">
              Phone
            </h2>

            <p>+94 77 123 4567</p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <FiClock className="text-orange-500 text-3xl mb-3" />

            <h2 className="font-bold text-xl mb-2">
              Working Hours
            </h2>

            <p>Monday - Saturday</p>

            <p>8.30 AM - 6.30 PM</p>

          </div>

        </div>

        {/* Form */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-4xl font-bold mb-8">
            Send Us a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="relative">

              <FiUser className="absolute left-4 top-5 text-gray-400" />

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border rounded-xl pl-12 p-4 outline-none focus:ring-2 focus:ring-blue-600"
              />

            </div>

            <div className="relative">

              <FiMail className="absolute left-4 top-5 text-gray-400" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border rounded-xl pl-12 p-4 outline-none focus:ring-2 focus:ring-blue-600"
              />

            </div>

            <div className="relative">

              <FiBookOpen className="absolute left-4 top-5 text-gray-400" />

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border rounded-xl pl-12 p-4 outline-none focus:ring-2 focus:ring-blue-600"
              />

            </div>

            <div className="relative">

              <FiMessageSquare className="absolute left-4 top-5 text-gray-400" />

              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="w-full border rounded-xl pl-12 p-4 outline-none focus:ring-2 focus:ring-blue-600"
              />

            </div>

            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition"
            >
              <FiSend />

              {loading
                ? "Sending..."
                : "Send Message"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}