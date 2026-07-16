import { useState } from "react";
import toast from "react-hot-toast";
import uploadMedia from "../utils/uploadMedia";

export default function TestPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  async function handleUpload() {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setUploading(true);
      const publicUrl = await uploadMedia(file);
      setUrl(publicUrl);
      toast.success("Upload successful!");
      console.log(publicUrl);
    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col justify-center items-center gap-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border border-gray-300 rounded-lg p-2 bg-white"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 px-6 py-3 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {url && (
        <img src={url} alt="Uploaded" className="w-[200px] rounded-lg shadow-md" />
      )}
    </div>
  );
}