import React from "react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppProvider";
import { jwtDecode } from "jwt-decode";

const JobDetails = ({ isExpanded, setIsExpanded, job }) => {
  const navigate = useNavigate();
  const descriptionRef = useRef(null);
  const requirementRef = useRef(null);
  const benefitRef = useRef(null);
  const overviewRef = useRef(null);

  const { savedJobs, toggleSaveJob, appliedJobs } = useAppContext();

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
 
  const handleClose = () => {
    setIsExpanded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!job) {
    return (
      <div className="col-span-8 p-8">
        <p className="text-gray-500">Select a job to view details</p>
      </div>
    );
  }

  console.log("in job details", job);
  const isJobSaved = savedJobs.includes(job._id);
  const jobId = job._id.toString(); // Make sure to convert to string for comparison
  const isApplied = appliedJobs.includes(jobId);
  return (
    <div
      className={`main-container transition-all duration-300 col-span-12  ${
        isExpanded
          ? "md:col-span-12 fixed top-0 left-0 w-full h-full bg-white overflow-y-scroll z-50   "
          : " md:col-span-8  p-4"
      }`}
    >
      {/* <div className={`main-container transition-all duration-300 ${isExpanded ? 'col-span-12 fixed top-0 left-0 w-full h-full bg-white overflow-y-scroll z-50' : 'col-span-8'}`}> */}

      <div className="content-container  h-[95vh] overflow-auto sticky top-2  bg-gray-50   rounded-sm p-12">
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
              <div className="unsaved icon flex items-center gap-6">
                {/* Toggle save/unsave based on context */}
                {isJobSaved ? (
                  <svg
                    className="cursor-pointer"
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveJob(job._id);
                    }}
                  >
                    <path
                      d="M11 0H3C1 0 0 1 0 3V18L7 14L14 18V3C14 1 13 0 11 0ZM9.5 7.75H4.5C4.086 7.75 3.75 7.414 3.75 7C3.75 6.586 4.086 6.25 4.5 6.25H9.5C9.914 6.25 10.25 6.586 10.25 7C10.25 7.414 9.914 7.75 9.5 7.75Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <svg
                    className="cursor-pointer"
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveJob(job._id);
                    }}
                  >
                    <path
                      d="M12 0.25H4C1.582 0.25 0.25 1.582 0.25 4V19C0.25 19.268 0.393023 19.5149 0.624023 19.6479C0.740023 19.716 0.87 19.75 1 19.75C1.128 19.75 1.25707 19.717 1.37207 19.651L8 15.863L14.6279 19.65C14.8599 19.783 15.146 19.782 15.376 19.647C15.607 19.513 15.75 19.266 15.75 18.999V3.99902C15.75 1.58202 14.418 0.25 12 0.25ZM14.25 17.707L8.37207 14.349C8.14207 14.217 7.85793 14.217 7.62793 14.349L1.75 17.708V4C1.75 2.423 2.423 1.75 4 1.75H12C13.577 1.75 14.25 2.423 14.25 4V17.707ZM11.75 6C11.75 6.414 11.414 6.75 11 6.75H5C4.586 6.75 4.25 6.414 4.25 6C4.25 5.586 4.586 5.25 5 5.25H11C11.414 5.25 11.75 5.586 11.75 6Z"
                      fill="black"
                    />
                  </svg>
                )}

              
              </div>
            </div>
          </div>
          <div className="job-role mt-6 flex flex-wrap items-center justify-between">
            <div className="role">
              <p className="font-bold text-2xl mb-2 ">{job.position}</p>
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
                        job,
                      },
                    });
                  } else {
                    window.open(job.applyMethod, "_blank");
                  }
                }}
                disabled={isApplied}
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

                {isApplied
                  ? "Already Applied"
                  : job.applyMethod === "Easy Apply"
                  ? "Easy Apply"
                  : "Apply Link"}
              </button>
            </div>
          </div>
        </div>

        <div className="interview-process mt-10">
          <div className="space-y-2 text-sm ">
            <p>
              <span className="font-semibold">Where you'll do it:</span>{" "}
              {job.whereYouWillDoIt}
            </p>

            <p>
              <span className="font-semibold">The Interview Process:</span>{" "}
              {job.interviewProcess}
            </p>

            <p>
              <span className="font-semibold">Tools:</span>{" "}
              {job.tools?.map((tool, index) => (
                <span key={index}>
                  {tool}
                  {index < job.tools.length - 1 && ", "}
                </span>
              ))}
            </p>

            <p>
              <span className="font-semibold">Reporting to:</span>{" "}
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

        <div className="mt-12 space-y-8 ">
          <div className="flex flex-wrap gap-x-10 border-b   text-gray-400 font-semibold text-lg sticky top-[-50px] py-4  z-10  bg-gray-50 ">
            <button
              onClick={() => scrollTo(descriptionRef)}
              className="hover:text-black  focus:text-black cursor-pointer focus:border-b-2 "
            >
              Job Description
            </button>
            <button
              onClick={() => scrollTo(requirementRef)}
              className="hover:text-black focus:text-black cursor-pointer focus:border-b-2"
            >
              Requirement
            </button>
            <button
              onClick={() => scrollTo(benefitRef)}
              className="hover:text-black focus:text-black cursor-pointer focus:border-b-2"
            >
              Benefit
            </button>
            <button
              onClick={() => scrollTo(overviewRef)}
              className="hover:text-black focus:text-black cursor-pointer focus:border-b-2"
            >
              Overview
            </button>
          </div>

          <section ref={descriptionRef} className="space-y-4">
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

          <div className="line border border-gray-300"></div>

          <section ref={requirementRef} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-600">Requirements</h2>

            {job.requirements?.map((req, index) => (
              <div key={index}>
                <p className="font-semibold text-gray-900 mt-4">{req.title}</p>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  {req.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <div className="line border border-gray-300"></div>

          <section ref={benefitRef} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-600">Benefit</h2>
            <p className="font-semibold text-gray-900">Base Pay Range</p>
            <p className="text-gray-600">{job.salaryRange}Per/H</p>
            <p className="font-semibold mt-4 text-gray-900">
              What’s in it for you?
            </p>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              {job.additionalBenefits?.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </section>

          <div className="line border border-gray-300"></div>

          <section ref={overviewRef} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-600">Overview</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <strong>Size:</strong> {job.companyOverview?.size || "N/A"}
              </div>
              <div>
                <strong>Founded:</strong>{" "}
                {job.companyOverview?.founded || "N/A"}
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
                <strong>Revenue:</strong>{" "}
                {job.companyOverview?.revenue || "N/A"}
              </div>
            </div>

            {/* Images */}
            {job.companyOverview?.companyImages?.length > 0 && (
              <div className="image-container w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
                {/* First big image */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-6 p-2">
                  <div className="w-full h-[200px] lg:h-full">
                    <img
                      src={`http://localhost:3000/${job.companyOverview.companyImages[0]}`}
                      // src={job.companyOverview.companyImages[0]}
                      alt="Company"
                      className="w-full h-full rounded-sm object-cover"
                    />
                  </div>
                </div>

                {/* 4 smaller images */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-6 grid grid-cols-2 gap-4 p-2">
                  {job.companyOverview.companyImages
                    .slice(1, 5)
                    .map((img, index) => (
                      <div key={index} className="h-[150px]">
                        <img
                          src={`http://localhost:3000/${img}`}
                          alt={`Company ${index + 1}`}
                          className="w-full h-full rounded-sm object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
