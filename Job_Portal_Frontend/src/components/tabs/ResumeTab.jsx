import React, { useRef } from "react";
import axios from "axios";
import { FileText, Download, Upload } from "lucide-react";

const ResumeTab = ({ onboarding }) => {
  const resumeInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const handleResumeButtonClick = () => {
    resumeInputRef.current.click();
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    try {
      await axios.put(
        "http://localhost:3000/api/onboarding/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      alert("Failed to upload resume.");
    }
  };

  return (
    <div className="rounded-lg shadow p-6 bg-white">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <FileText size={20} /> Resume
      </h3>
      {onboarding?.resume ? (
        <div className="flex items-center gap-4">
          <FileText size={32} className="text-blue-600" />
          <span className="font-medium">{onboarding.resume.split("\\").pop()}</span>
          <a
            href={`http://localhost:3000/${onboarding.resume}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white rounded px-4 py-2 flex items-center gap-2"
          >
            <Download size={16} /> Download
          </a>
        </div>
      ) : (
        <div className="text-gray-500">No resume uploaded yet. Upload one now!</div>
      )}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={resumeInputRef}
        style={{ display: "none" }}
        onChange={handleResumeChange}
      />
      <button
        className="mt-4 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
        onClick={handleResumeButtonClick}
      >
        <Upload size={16} /> Upload Resume
      </button>
    </div>
  );
};

export default ResumeTab;
