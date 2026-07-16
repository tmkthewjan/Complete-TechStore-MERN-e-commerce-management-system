import { useEffect, useState } from "react";
import { FiX, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function ReplyModal({ onSuccess }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function openReply(e) {
      setMessage(e.detail);
      setReply(e.detail.reply || "");
      setOpen(true);
    }

    window.addEventListener("replyMessage", openReply);

    return () => {
      window.removeEventListener("replyMessage", openReply);
    };
  }, []);

  function closeModal() {
    setOpen(false);
    setMessage(null);
    setReply("");
  }

  async function sendReply() {
    if (!reply.trim()) {
      toast.error("Please enter a reply.");
      return;
    }

    try {
      setLoading(true);

      await api.put(`/contact/reply/${message._id}`, {
        reply,
      });

      toast.success("Reply sent successfully!");

      closeModal();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Failed to send reply."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">

      <div className="bg-white rounded-3xl w-[700px] max-w-[95%] shadow-2xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-8 py-5">

          <div>

            <h2 className="text-2xl font-bold">
              Reply to Customer
            </h2>

            <p className="text-gray-500 mt-1">
              Send a response to this customer.
            </p>

          </div>

          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-red-600"
          >
            <FiX size={24} />
          </button>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="mb-6">

            <label className="font-semibold">
              Customer
            </label>

            <div className="mt-2 bg-gray-100 rounded-xl p-3">
              {message?.fullName}
            </div>

          </div>

          <div className="mb-6">

            <label className="font-semibold">
              Email
            </label>

            <div className="mt-2 bg-gray-100 rounded-xl p-3">
              {message?.email}
            </div>

          </div>

          <div className="mb-6">

            <label className="font-semibold">
              Subject
            </label>

            <div className="mt-2 bg-gray-100 rounded-xl p-3">
              {message?.subject}
            </div>

          </div>

          <div className="mb-6">

            <label className="font-semibold">
              Customer Message
            </label>

            <div className="mt-2 bg-gray-100 rounded-xl p-4 whitespace-pre-line">
              {message?.message}
            </div>

          </div>

          <div>

            <label className="font-semibold">
              Your Reply
            </label>

            <textarea
              rows={6}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full mt-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your reply..."
            />

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-8 py-5 flex justify-end gap-4">

          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={sendReply}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <FiSend />

            {loading ? "Sending..." : "Send Reply"}

          </button>

        </div>

      </div>

    </div>
  );
}