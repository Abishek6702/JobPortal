import React from "react";
import resume_icon from "../assets/resume_icon.png";
import { Pencil } from "lucide-react";

const ApplicationDetailsModal = ({ application, onClose, onEditStatus }) => {
  if (!application) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 tint flex justify-center items-start overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl m-2 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
          <div className="flex gap-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Application Details
            </h2>
            <span
              className={`inline-block px-3 py-1 rounded-md font-medium cursor-pointer ${
                application.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : application.status === "rejected"
                  ? "bg-pink-100 text-pink-700"
                  : "bg-green-100 text-green-700"
              } hover:shadow-md transition`}
              title="Click to edit status"
            >
              {application.status}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-black transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          <div className="  flex justify-end">
            <button
              className="text-lg  text-white mb-4 bg-[#44CF7DCC] p-1  px-4 rounded-lg flex items-center gap-2"
              onClick={() => onEditStatus(application)}
            >
              <Pencil className="w-5 h-5" />
              Change Status
            </button>
          </div>

          {/* Contact Information */}
          <section className="rounded-lg shadow-sm p-5 mt-[-14px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Full Name" value={application.name} />
              <Info label="Email Address" value={application.email} />
              <Info label="City, State" value={application.location} />
              <Info label="Phone Number" value={application.phone} />
            </div>
          </section>

          {/* Experience */}
          <section className="rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Relevant Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info
                label="Experience"
                value={`${application.experience || "N/A"} years`}
              />
              <Info
                label="Willing to Relocate"
                value={
                  application.relocation === true
                    ? "Yes"
                    : application.relocation === false
                    ? "No"
                    : "N/A"
                }
              />
            </div>
          </section>
          {/* Dates Available */}
          <section className="rounded-lg shadow-sm p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Dates Available
            </h3>

            {application.datesAvailable &&
            application.datesAvailable.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {application.datesAvailable.map((dateStr, index) => {
                  const date = new Date(dateStr);
                  const formattedDate = date.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                  return <li key={index}>{formattedDate}</li>;
                })}
              </ul>
            ) : (
              <p className="text-gray-600">No available dates provided.</p>
            )}
          </section>

          {/* Previous Work Experience */}
          <section className="rounded-lg shadow-sm p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Previous Work Experience
            </h3>

            {application.pastWorkExperience &&
            application.pastWorkExperience.length > 0 ? (
              application.pastWorkExperience.map((exp, index) => (
                <div
                  key={exp._id || index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 rounded"
                >
                  <Info label="Company Name" value={exp.companyName || "N/A"} />
                  <Info
                    label="Company Location"
                    value={exp.location || "N/A"}
                  />
                  <Info label="Role" value={exp.position || "N/A"} />
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No previous work experience provided.
              </p>
            )}
          </section>

          {/* Resume */}
          <section className="rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resume</h3>
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-md">
              <img src={resume_icon} alt="Resume" className="w-10 h-10" />
              <div className="flex-1">
                <p className="text-gray-800 font-medium">
                  {application.resume
                    ? application.resume
                        .split("/")
                        .pop()
                        .split("_")
                        .slice(1)
                        .join("_")
                    : "No resume uploaded"}
                </p>

                {application.resume && (
                  <div className="flex space-x-4 mt-1">
                    <a
                      href={`http://localhost:3000/${application.resume}`}
                      download
                      className="text-green-600 hover:underline"
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <label className="block text-sm font-semibold text-black">{label}</label>
    <p className="mt-1 text-gray-700">{value}</p>
  </div>
);

export default ApplicationDetailsModal;
