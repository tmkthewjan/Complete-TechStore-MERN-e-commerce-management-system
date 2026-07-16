import { useEffect, useState } from "react";
import {
  FiMail,
  FiSearch,
  FiTrash2,
  FiMessageCircle,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(
        messages.filter(
          (m) =>
            m.fullName.toLowerCase().includes(search.toLowerCase()) ||
            m.email.toLowerCase().includes(search.toLowerCase()) ||
            m.subject.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, messages]);

  async function loadMessages() {
    try {
      setLoading(true);

      const res = await api.get("/contact");

      setMessages(res.data);
      setFilteredMessages(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage(id) {
    if (!window.confirm("Delete this message?")) return;

    try {
      await api.delete(`/contact/${id}`);

      toast.success("Message deleted");

      loadMessages();
    } catch (err) {
      toast.error("Delete failed");
    }
  }

  function openReply(message) {
    setReplyingTo(message);
    setReplyText(message.reply || "");
  }

  function closeReply() {
    setReplyingTo(null);
    setReplyText("");
  }

  async function submitReply() {
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    try {
      setSending(true);
      await api.put(`/contact/reply/${replyingTo._id}`, { reply: replyText });
      toast.success("Reply sent");
      closeReply();
      loadMessages();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Customer Messages
          </h1>

          <p className="text-gray-500 mt-2">
            Manage customer inquiries
          </p>

        </div>

        <button
          onClick={loadMessages}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FiRefreshCw />
          Refresh
        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">

        <div className="relative">

          <FiSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            placeholder="Search message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 p-3 outline-none"
          />

        </div>

      </div>

      {loading ? (
        <div className="text-center py-20">
          Loading...
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-20 text-center">

          <FiMail
            size={60}
            className="mx-auto text-blue-600 mb-4"
          />

          <h2 className="text-2xl font-bold">
            No Messages
          </h2>

        </div>
      ) : (
        <div className="space-y-5">

          {filteredMessages.map((message) => (

            <div
              key={message._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    {message.fullName}
                  </h2>

                  <p className="text-gray-500">
                    {message.email}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    message.replied
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {message.replied
                    ? "Replied"
                    : "Pending"}
                </span>

              </div>

              <h3 className="mt-5 font-bold text-blue-600">
                {message.subject}
              </h3>

              <p className="mt-3 text-gray-600 whitespace-pre-line">
                {message.message}
              </p>

              {message.reply && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">

                  <h3 className="font-bold text-green-700 mb-2 flex items-center gap-2">

                    <FiMessageCircle />

                    Admin Reply

                  </h3>

                  <p>{message.reply}</p>

                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">

                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
                  onClick={() => openReply(message)}
                >
                  {message.replied ? "Edit Reply" : "Reply"}
                </button>

                <button
                  onClick={() => deleteMessage(message._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl flex items-center gap-2"
                >
                  <FiTrash2 />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Reply Modal */}
      {replyingTo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Reply to {replyingTo.fullName}
              </h2>
              <button
                onClick={closeReply}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold text-blue-600 mb-1">{replyingTo.subject}</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{replyingTo.message}</p>
            </div>

            <label className="text-sm font-medium text-gray-600 mb-1 block">Your Reply</label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full h-[140px] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none"
              placeholder="Type your reply here..."
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={closeReply}
                className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={submitReply}
                disabled={sending}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}