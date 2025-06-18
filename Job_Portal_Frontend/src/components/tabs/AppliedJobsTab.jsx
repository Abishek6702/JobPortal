import React from "react";
import { Briefcase } from "lucide-react";

const AppliedJobsTab = ({ jobs = [], savedJobs = [], toggleSaveJob }) => (
  <div>
    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
      <Briefcase size={20} /> Applied Jobs
    </h3>
    {(!jobs || jobs.length === 0) ? (
      <div className="text-gray-500">No applied jobs yet.</div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="border border-gray-300 rounded-xl p-4 flex gap-4 items-start bg-white shadow relative">
            <img
              src={job.companyLogo ? `http://localhost:3000/${job.companyLogo.replace(/\\/g, "/")}` : ""}
              alt={job.companyName}
              className="w-16 h-16 object-contain rounded-full border"
            />
            <div className="flex flex-col justify-between w-full">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{job.position}</h3>
                <p className="text-gray-600">{job.companyName}</p>
                <p className="text-gray-500 text-sm">{job.location}</p>
              </div>
              {/* Bookmark Toggle */}
              <div className="absolute top-4 right-4">
                {savedJobs && savedJobs.includes(job._id) ? (
                  <Bookmark
                    size={22}
                    className="text-blue-600 cursor-pointer fill-blue-600"
                    onClick={e => { e.stopPropagation(); toggleSaveJob(job._id); }}
                    fill="currentColor"
                  />
                ) : (
                  <Bookmark
                    size={22}
                    className="text-gray-400 cursor-pointer"
                    onClick={e => { e.stopPropagation(); toggleSaveJob(job._id); }}
                  />
                )}
              </div>
              {/* Actions */}
              <div className="flex items-center justify-between mt-4">
                <span className="border border-blue-300 text-blue-600 py-1 px-4 rounded-full text-xs font-semibold bg-blue-50">
                  Applied
                </span>
                <span className="text-gray-400 text-xs ml-4 whitespace-nowrap">
                  {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default AppliedJobsTab;
