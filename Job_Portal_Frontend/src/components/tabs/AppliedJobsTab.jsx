import React, { useEffect, useState } from "react";
import { Bookmark, Briefcase } from "lucide-react";
import ApplicationModal from "../../components/tabs/ApplicationModal ";

const getToken = () => localStorage.getItem("token");

const AppliedJobsTab = ({ jobs = [], savedJobs = [], toggleSaveJob }) => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch applications on mount
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => {
        setApplications([]);
        setLoading(false);
      });
  }, []);

  // Get job IDs from applications (jobId._id)
  const appliedJobIds = applications.map((app) => app.jobId?._id);

  // Filter jobs that have an application
  const appliedJobs = jobs.filter((job) => appliedJobIds.includes(job._id));

  // Find application for a job
  const getApplicationForJob = (jobId) =>
    applications.find((app) => app.jobId?._id === jobId);

  // Handle card click
  const handleCardClick = (job) => {
    setSelectedJob(job);
    setSelectedApp(getApplicationForJob(job._id));
  };

  // Withdraw handler (implement your API call here)
  const handleWithdraw = (applicationId) => {
    const token = getToken();
    fetch(`http://localhost:3000/api/applications/${applicationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          // Remove withdrawn application from state
          setApplications((prev) =>
            prev.filter((app) => app._id !== applicationId)
          );
        } else {
          alert("Failed to withdraw application.");
        }
      })
      .catch(() => alert("Failed to withdraw application."));
  };

  return (
    <>
      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Briefcase size={20} /> Applied Jobs
        </h3>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : appliedJobs.length === 0 ? (
          <div className="text-gray-500">No applied jobs yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appliedJobs.map((job) => {
              const application = getApplicationForJob(job._id);
              return (
                <div
                  key={job._id}
                  className="border border-gray-300 rounded-xl p-4 flex gap-4 items-start bg-white shadow relative cursor-pointer"
                  onClick={() => handleCardClick(job)}
                >
                  <img
                    src={
                      job.companyId?.company_logo
                        ? `http://localhost:3000/${job.companyId.company_logo.replace(
                            /\\/g,
                            "/"
                          )}`
                        : ""
                    }
                    alt={job.companyId?.company_name || "Company"}
                    className="w-16 h-16 object-contain rounded-full border"
                  />
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {job.position}
                      </h3>
                      <p className="text-gray-600">{job.companyName}</p>
                      <p className="text-gray-500 text-sm">{job.location}</p>
                    </div>
                    {/* Bookmark Toggle */}
                    <div className="absolute top-4 right-4">
                      {savedJobs && savedJobs.includes(job._id) ? (
                        <Bookmark
                          size={22}
                          className="text-blue-600 cursor-pointer fill-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveJob(job._id);
                          }}
                          fill="currentColor"
                        />
                      ) : (
                        <Bookmark
                          size={22}
                          className="text-gray-400 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveJob(job._id);
                          }}
                        />
                      )}
                    </div>
                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <span className="border border-blue-300 text-blue-600 py-1 px-4 rounded-full text-xs font-semibold bg-blue-50">
                        {application?.status || "Applied"}
                      </span>
                      <button
                        className="ml-2 px-3 py-1 text-xs rounded bg-red-100 text-red-600 font-semibold border border-red-300 hover:bg-red-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              "Are you sure you want to withdraw this application?"
                            )
                          ) {
                            handleWithdraw(application._id);
                          }
                        }}
                      >
                        Withdraw
                      </button>
                      <span className="text-gray-400 text-xs ml-4 whitespace-nowrap">
                        {job.postedAt
                          ? new Date(job.postedAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for Application Details */}
      <ApplicationModal
        application={selectedApp}
        job={selectedJob}
        onClose={() => {
          setSelectedApp(null);
          setSelectedJob(null);
        }}
      />
    </>
  );
};

export default AppliedJobsTab;
