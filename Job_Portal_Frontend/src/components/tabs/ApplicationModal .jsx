import React from "react";

const ApplicationModal = ({ application, job, onClose }) => {
  if (!application || !job) return null;

  return (
    <div className="fixed inset-0 tint flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h4 className="font-bold text-lg mb-2">Application Details</h4>
        <div className="mb-2">
          <strong>Position:</strong> {job.position}
        </div>
        <div className="mb-2">
          <strong>Company:</strong> {application.companyId?.company_name || "N/A"}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {application.status || "N/A"}
        </div>
        <div className="mb-2">
          <strong>Applied At:</strong>{" "}
          {application.createdAt
            ? new Date(application.createdAt).toLocaleString()
            : "N/A"}
        </div>
        <div className="mb-2">
          <strong>Name:</strong> {application.name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {application.email}
        </div>
        <div className="mb-2">
          <strong>Phone:</strong> {application.phone}
        </div>
        <div className="mb-2">
          <strong>Location:</strong> {application.location}
        </div>
        <div className="mb-2">
          <strong>Experience:</strong> {application.experience} year(s)
        </div>
        {application.experienceDetails && application.experienceDetails.length > 0 && (
          <div className="mb-2">
            <strong>Experience Details:</strong>
            <ul className="list-disc ml-5">
              {application.experienceDetails.map((exp, idx) => (
                <li key={idx}>
                  {exp.company} - {exp.role} ({exp.duration})
                </li>
              ))}
            </ul>
          </div>
        )}
        {application.education && application.education.length > 0 && (
          <div className="mb-2">
            <strong>Education:</strong>
            <ul className="list-disc ml-5">
              {application.education.map((edu, idx) => (
                <li key={idx}>
                  {edu.level} in {edu.branch} from {edu.institution} ({edu.yearFrom}-{edu.yearTo})
                </li>
              ))}
            </ul>
          </div>
        )}
        {application.questionsAndAnswers && application.questionsAndAnswers.length > 0 && (
          <div className="mb-2">
            <strong>Questions & Answers:</strong>
            <ul className="list-disc ml-5">
              {application.questionsAndAnswers.map((qa, idx) => (
                <li key={idx}>
                  <div><strong>Q:</strong> {qa.question}</div>
                  <div><strong>A:</strong> {qa.answer}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {application.resumeDownloadLink && (
          <div className="mb-2">
            <strong>Resume:</strong>{" "}
            <a
              href={`http://localhost:3000/${application.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
