import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import edit_icon from "../assets/edit.svg";
import close_icon from "../assets/close.svg";
import delete_icon from "../assets/delete.svg";
import DeleteConfirmation from "./DeleteConfirmation";
import { useState } from "react";
import axios from "axios";
import JobUpdateForm from "./JobUpdateForm";

const JobDetailModel = ({ job, handleClose }) => {
  const jobId = job._id;
  const [isEditing, setIsEditing] = useState(false);
 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const descriptionRef = useRef(null);
  const requirementRef = useRef(null);
  const benefitRef = useRef(null);
  const overviewRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  if (!job) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Select a job to view details</p>
      </div>
    );
  }
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowDeleteModal(false);
      console.log("Job deleted!");

      // 👇 Navigate to employer dashboard
      navigate("/employer-dashboard");
      window.location.reload(); // 🔥 Forces full page reload (last resort)
    } catch (error) {
      console.error("Delete failed", error);
      // Optionally show error feedback
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-gray-50 p-6  rounded-md shadow-md max-h-[90vh] overflow-y-scroll scrollbar-hide ">
      {/* Close Button */}
      <div className="flex items-center justify-end gap-6">
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-xl cursor-pointer flex gap-2 items-center" onClick={() => setIsEditing(true)}>
            <img src={edit_icon} className="w-4 h-4" />
            Edit 
          </button>
          {isEditing && (
        <JobUpdateForm
          job={job}
          onClose={() => setIsEditing(false)}
        />
      )}
          <button
            onClick={handleDeleteClick}
            className="bg-[#F94144] text-white font-bold py-2 px-4 rounded-xl cursor-pointer flex gap-2 items-center"
          >
            <img src={delete_icon} className="w-6 h-6" />
            Delete
          </button>

          {showDeleteModal && (
            <DeleteConfirmation
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
          <button
            className="bg-gray-400  text-white font-bold py-2 px-4 rounded-xl cursor-pointer flex gap-2 items-center"
            onClick={handleClose}
          >
            <svg
              className=" cursor-pointer"
              onClick={handleClose}
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1L1 13M13 13L1 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Close
          </button>
        </div>
      </div>

      <div className="space-y-4 ">
        {/* Company Content */}
        <div className="company-content">
          <div className="company-name">
            <div className="company flex items-center justify-between">
              <div className="company-icon flex items-center gap-2">
                <img
                  src={`http://localhost:3000/${job.companyLogo}`}
                  alt="Company Logo"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <p className="text-[#6532C1] font-semibold">
                  {job.companyName}
                </p>
              </div>
            </div>
          </div>

          <div className="job-role mt-6 flex flex-wrap items-center justify-between">
            <div className="role">
              <p className="font-bold text-2xl mb-2">{job.position}</p>
              <p>
                {job.location} ({job.workplace})
              </p>
            </div>

            <div className="apply-btn pt-5 lg:pt-0">
              <button
                className="border border-white rounded-full py-2 px-4 bg-[#2986CE] text-white font-bold cursor-pointer flex gap-2 items-center"
                onClick={() => {
                  if (job.applyMethod === "Easy Apply") {
                    navigate("/jobapplicationform", {
                      state: {
                        companyName: job.companyName,
                        companyLogo: job.companyLogo,
                        jobLocation: job.location,
                        jobTitle: job.position,
                      },
                    });
                  } else {
                    window.open(job.applyMethod, "_blank");
                  }
                }}
              >
                {job.applyMethod === "Easy Apply" && (
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.00001 19.75C5.91001 19.75 5.81903 19.7341 5.73103 19.7001C5.44103 19.5891 5.25001 19.31 5.25001 19V11.75H1.00001C0.704014 11.75 0.436017 11.576 0.315017 11.305C0.194017 11.034 0.245031 10.718 0.442031 10.498L9.44203 0.498041C9.65003 0.267041 9.97802 0.188043 10.268 0.300043C10.558 0.411043 10.749 0.69004 10.749 1.00004V8.25004H15C15.296 8.25004 15.564 8.42405 15.685 8.69505C15.806 8.96605 15.755 9.28204 15.558 9.50204L6.558 19.5021C6.413 19.6631 6.20801 19.75 6.00001 19.75ZM2.68404 10.25H6.00001C6.41401 10.25 6.75001 10.586 6.75001 11V17.046L13.316 9.75004H10C9.58601 9.75004 9.25001 9.41404 9.25001 9.00004V2.95403L2.68404 10.25Z"
                      fill="white"
                    />
                  </svg>
                )}
                {job.applyMethod === "Easy Apply" ? "Easy Apply" : "Apply Link"}
              </button>
            </div>
          </div>
        </div>

        {/* Interview Process Details */}
        <div className="interview-process mt-6">
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Where you'll do it:</span>
              {job.whereYouWillDoIt}
            </p>
            <p>
              <span className="font-semibold">The Interview Process:</span>
              {job.interviewProcess}
            </p>
            <p>
              <span className="font-semibold">Tools:</span>
              {job.tools?.map((tool, index) => (
                <span key={index}>
                  {tool}
                  {index < job.tools.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p>
              <span className="font-semibold">Reporting to:</span>
              {job.reportingTo?.map((report, index) => (
                <span key={index}>
                  {report}
                  {index < job.reportingTo.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p>
              <span className="font-semibold">Your team:</span> {job.team}
            </p>
          </div>
        </div>

        {/* Sticky Navigation Buttons */}
        <div className=" border-b text-gray-400 font-semibold text-lg sticky top-[-24px] bg-gray-50 ">
          <div className="flex flex-wrap gap-x-10 pb-2">
            <button
              onClick={() => scrollTo(descriptionRef)}
              className="hover:text-black focus:text-black cursor-pointer focus:border-b-2"
            >
              Job Description
            </button>
            <button
              onClick={() => scrollTo(requirementRef)}
              className="hover:text-black focus:text-black cursor-pointer focus:border-b-2"
            >
              Requirements
            </button>
            <button
              onClick={() => scrollTo(benefitRef)}
              className="hover:text-black focus:text-black cursor-pointer focus:border-b-2"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollTo(overviewRef)}
              className="hover:text-black focus:text-black cursor-pointer focus:border-b-2"
            >
              Overview
            </button>
          </div>
        </div>

        {/* Job Sections */}
        <section ref={descriptionRef} className="mt-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-600">Job Description</h2>
          {job.jobDescription?.map((section, index) => (
            <div key={index}>
              <p className="font-semibold text-gray-900">{section.title}</p>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                {section.content.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section ref={requirementRef} className="mt-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-600">Requirements</h2>
          {job.requirements?.map((req, index) => (
            <div key={index}>
              <p className="font-semibold text-gray-900">{req.title}</p>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                {req.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section ref={benefitRef} className="mt-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-600">Benefits</h2>
          <p className="font-semibold text-gray-900">Base Pay Range</p>
          <p className="text-gray-600">{job.salaryRange} Per/H</p>
          <p className="font-semibold mt-4 text-gray-900">
            What’s in it for you?
          </p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            {job.additionalBenefits?.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </section>

        <section ref={overviewRef} className="mt-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-600">Overview</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>Size:</strong> {job.companyOverview?.size || "N/A"}
            </div>
            <div>
              <strong>Founded:</strong> {job.companyOverview?.founded || "N/A"}
            </div>
            <div>
              <strong>Type:</strong> Company -{" "}
              {job.companyOverview?.type || "N/A"}
            </div>
            <div>
              <strong>Industry:</strong>{" "}
              {job.companyOverview?.industry || "N/A"}
            </div>
            <div>
              <strong>Sector:</strong> {job.companyOverview?.sector || "N/A"}
            </div>
            <div>
              <strong>Revenue:</strong> {job.companyOverview?.revenue || "N/A"}
            </div>
          </div>

          {/* Images */}
          {job.companyOverview?.companyImages?.length > 0 && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
              <div className="col-span-1 sm:col-span-2 lg:col-span-6">
                <div className="w-full h-48 sm:h-64 lg:h-full">
                  <img
                    src={`http://localhost:3000/${job.companyOverview.companyImages[0]}`}
                    alt="Company"
                    className="w-full h-full rounded-md object-cover"
                  />
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 lg:col-span-6 grid grid-cols-2 gap-4">
                {job.companyOverview.companyImages
                  .slice(1, 5)
                  .map((img, index) => (
                    <div key={index} className="h-32 sm:h-40">
                      <img
                        src={`http://localhost:3000/${img}`}
                        alt={`Company ${index + 1}`}
                        className="w-full h-full rounded-md object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default JobDetailModel;
