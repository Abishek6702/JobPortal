import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { Link, Element } from "react-scroll";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  FileText,
  ExternalLink,
  Pencil,
  EllipsisVerticalIcon,
} from "lucide-react";
import { useAppContext } from "../context/AppProvider";
import EditAboutModal from "../components/EditAboutModel";

import {
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import AppliedJobs from "../components/AppliedJobs";
// import edit from "../assets/edit_icon.svg";

const UserProfile = () => {
  const resumeInputRef = useRef(null);
  const profileImageInputRef = useRef(null);
  const { savedJobs, toggleSaveJob, appliedJobs } = useAppContext();
  // const isApplied = appliedJobs.includes(jobId);

  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(5);
  const [userId, setUserId] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const [appliedJob, setAppliedJob] = useState([]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`http://localhost:3000/api/auth/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        console.log("abi", data);
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [userId, token]);

  useEffect(() => {
    if (!userId || !token) return;

    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/applications/${userId}/applied-jobs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("tk Response:", response.data); // Log the entire response for inspection

        const applications = Array.isArray(response.data.appliedJobs)
          ? response.data.appliedJobs
          : []; // Ensure we're working with an array

        if (applications.length === 0) {
          console.log("No applications found, setting appliedJobs to []");
          setAppliedJob([]);
          return;
        }

        // Log applications data
        // console.log("Applications Data:", applications);

        const jobDetails = await Promise.all(
          applications.map(async (app) => {
            // console.log("Fetching job details for jobId:", app); // Log jobId
            const jobRes = await axios.get(
              `http://localhost:3000/api/jobs/${app}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            // Log the job response to check the data
            console.log("Job Response:", jobRes.data);
            return { ...jobRes.data, applicationData: app }; // Combine job + application info
          })
        );

        // Filter out any invalid or incomplete job data
        const validJobs = jobDetails.filter((job) => job && job._id);
        console.log("Valid Jobs:", validJobs); // Log the valid jobs
        setAppliedJob(validJobs); // Update state with valid jobs
      } catch (error) {
        console.error("Error fetching applied jobs", error);
      }
    };

    fetchAppliedJobs();
  }, [userId, token, setAppliedJob]);

  const handleDownload = () => {
    // Replace with actual file logic
    alert("Downloading resume...");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Uploaded: ${file.name}`);
      setResumeName(file.name);
    }
  };

  const InfoBlock = ({ label, value }) => (
    <div>
      <p className="text-sm font-semibold text-gray-700">{label} *</p>
      <p className="text-md text-gray-600 mt-1">{value}</p>
    </div>
  );

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="main_container">
          <div className="profile_container w-[70%] m-auto mt-6 border border-gray-300 rounded-md">
            <div className="p-10 text-center text-gray-500">
              Loading profile...
            </div>
          </div>
        </div>
      </>
    );
  }

  const {
    name,
    email,
    phone,
    role,
    onboarding,
    savedJobs: profileSavedJobs,
  } = profile;
  const fullName = onboarding
    ? `${onboarding.firstName} ${onboarding.lastName}`
    : name;
  const jobTitle = onboarding?.jobtitle || "N/A";
  const location = onboarding?.location || "N/A";
  const salary = onboarding?.salary
    ? `₹${onboarding.salary.toLocaleString()} / ${onboarding.salaryperiod}`
    : "N/A";
  const showingAll = visibleJobs >= (profileSavedJobs?.length || 0);
  const jobsToShow = showingAll
    ? profileSavedJobs
    : profileSavedJobs?.slice(0, 5) || [];

  const formatPostedAt = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const years = differenceInYears(now, date);
    if (years >= 1) return `${years} y`;

    const months = differenceInMonths(now, date);
    if (months >= 1) return `${months} m`;

    const days = differenceInDays(now, date);
    if (days >= 1) return `${days} d`;

    const hours = differenceInHours(now, date);
    if (hours >= 1) return `${hours} h`;

    return `Just now`;
  };
  console.log("hi", appliedJob);
  // Upload Profile Image

  const handleProfileImageButtonClick = () => {
    profileImageInputRef.current.click(); // This opens the file picker
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.put(
        "http://localhost:3000/api/onboarding/profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile Image Upload Response:", response.data);
      window.location.reload();

      alert("Profile Image Uploaded Successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Failed to upload profile image.");
    }
  };

  // Upload Resume

  const handleResumeButtonClick = () => {
    resumeInputRef.current.click(); // This opens the file picker
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.put(
        "http://localhost:3000/api/onboarding/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Resume Upload Response:", response.data);
      window.location.reload();

      alert("Resume Uploaded Successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="main_container">
        <div className="profile_container w-[70%] m-auto mt-6 border border-gray-300 rounded-md">
          <div className="profile_section m-4 p-4 mb-2">
            <div className="user_profile relative text-gray-500 ">
              {profile?.onboarding?.profileImage ? (
                <img
                  src={`http://localhost:3000/${profile.onboarding.profileImage}`}
                  alt="Profile"
                  className="w-30 h-30 rounded-full object-cover"
                />
              ) : (
                <div className="w-30 h-30 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {fullName
                    ? (() => {
                        const nameParts = fullName.trim().split(" ");
                        if (nameParts.length >= 2) {
                          return (
                            (nameParts[0][0] || "") +
                            (nameParts[nameParts.length - 1][
                              nameParts[nameParts.length - 1].length - 1
                            ] || "")
                          ).toUpperCase();
                        } else {
                          return (nameParts[0][0] || "").toUpperCase();
                        }
                      })()
                    : "U"}
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                ref={profileImageInputRef}
                style={{ display: "none" }}
                onChange={handleProfileImageChange}
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={resumeInputRef}
                style={{ display: "none" }}
                onChange={handleResumeChange}
              />

              <div
                className="img_edit absolute bottom-1 left-23  p-2 rounded-full bg-white cursor-pointer"
                onClick={handleProfileImageButtonClick}
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4285 3.42773H3.42847C2.89803 3.42773 2.38933 3.63845 2.01425 4.01352C1.63918 4.38859 1.42847 4.8973 1.42847 5.42773V19.4277C1.42847 19.9582 1.63918 20.4669 2.01425 20.8419C2.38933 21.217 2.89803 21.4277 3.42847 21.4277H17.4285C17.9589 21.4277 18.4676 21.217 18.8427 20.8419C19.2178 20.4669 19.4285 19.9582 19.4285 19.4277V12.4277"
                    stroke="currentcolor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.9285 1.92796C18.3263 1.53014 18.8659 1.30664 19.4285 1.30664C19.9911 1.30664 20.5306 1.53014 20.9285 1.92796C21.3263 2.32579 21.5498 2.86535 21.5498 3.42796C21.5498 3.99057 21.3263 4.53014 20.9285 4.92796L11.4285 14.428L7.42847 15.428L8.42847 11.428L17.9285 1.92796Z"
                    stroke="currentcolor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="user_details  mt-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl">{fullName}</p>
                <button className="border rounded-full p-2 px-6">
                  Open to
                </button>
              </div>
              <p className="text-gray-600 font-md mt-2">{jobTitle}</p>
              <p className="text-gray-500 font-md mt-2">{location}</p>
            </div>
          </div>
          <div className="tabs_container sticky top-0 bg-white z-10 w-[95%] ml-4 px-4 font-semibold text-md flex gap-6 text-gray-500 border-b border-gray-400">
            <Link
              to="about-section"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer"
              activeClass="border-b-2 border-blue-500 text-black"
              spy={true}
            >
              About
            </Link>
            <Link
              to="resumes-section"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer"
              activeClass="border-b-2 border-blue-500 text-black"
              spy={true}
            >
              Resumes
            </Link>
            <Link
              to="jobs-section"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer mb-2"
              activeClass="border-b-2 border-blue-500 text-black"
              spy={true}
            >
              Saved Jobs
            </Link>
            <Link
              to="applied-section"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer mb-2"
              activeClass="border-b-2 border-blue-500 text-black"
              spy={true}
            >
              Applied Jobs
            </Link>
          </div>

          <Element name="about-section" className="pt-6">
            <div className="about w-[95%] px-4 py-4 pb-4 ml-4 font-semibold text-md text-gray-500 border-b border-gray-400">
              <div className="flex justify-between items-start mb-4 ">
                <div className=" w-full">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-400 pb-2">
                      About
                    </h2>
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="p-2 rounded-full bg-white cursor-pointer"
                      aria-label="Edit About"
                    >
                      <div className=" p-2 rounded-full bg-white cursor-pointer">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.4285 3.42773H3.42847C2.89803 3.42773 2.38933 3.63845 2.01425 4.01352C1.63918 4.38859 1.42847 4.8973 1.42847 5.42773V19.4277C1.42847 19.9582 1.63918 20.4669 2.01425 20.8419C2.38933 21.217 2.89803 21.4277 3.42847 21.4277H17.4285C17.9589 21.4277 18.4676 21.217 18.8427 20.8419C19.2178 20.4669 19.4285 19.9582 19.4285 19.4277V12.4277"
                            stroke="currentcolor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17.9285 1.92796C18.3263 1.53014 18.8659 1.30664 19.4285 1.30664C19.9911 1.30664 20.5306 1.53014 20.9285 1.92796C21.3263 2.32579 21.5498 2.86535 21.5498 3.42796C21.5498 3.99057 21.3263 4.53014 20.9285 4.92796L11.4285 14.428L7.42847 15.428L8.42847 11.428L17.9285 1.92796Z"
                            stroke="currentcolor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>

                  <p className="text-sm text-gray-400 mt-1">
                    Updating your information will offer you the most relevant
                    content
                  </p>
                </div>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="text-gray-800"
                ></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6 mt-4 text-gray-400">
                <InfoBlock label="Role" value={role} />
                <InfoBlock label="Full Name" value={fullName} />
                <InfoBlock label="Job Title" value={jobTitle} />
                <InfoBlock label="Location" value={location} />
                {showAll && (
                  <>
                    <InfoBlock
                      label="Email"
                      value={onboarding?.email || email}
                    />
                    <InfoBlock
                      label="Phone"
                      value={onboarding?.phone || phone}
                    />
                    <InfoBlock label="Salary" value={salary} />
                    <InfoBlock label="Preferred Role" value={jobTitle} />
                  </>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="text-medium font-large text-blue-600 flex items-center"
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  <p className="font-bold cursor-pointer">
                    {showAll ? "Show Less" : "Show All Info"}
                  </p>
                  <span className="ml-2"></span>
                </button>
              </div>
            </div>
          </Element>

          {showEditModal && (
            <EditAboutModal
              initialData={onboarding}
              token={token}
              onClose={() => setShowEditModal(false)}
              onSuccess={() => {
                setShowEditModal(false);
                // fetchProfile(); // refresh profile data after update
              }}
            />
          )}

          <Element name="resumes-section" className="pt-6">
            <div className="resumes w-[95%] px-4 py-4 ml-4 font-semibold text-md text-gray-500 border-b border-gray-400">
              <div className="flex justify-between items-center ">
                <h2 className="text-xl font-semibold text-gray-400 pb-2">
                  Resumes
                </h2>
                <div
                  className="resume_edit p-2 bg-white cursor-pointer "
                  onClick={handleResumeButtonClick}
                >
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4285 3.42773H3.42847C2.89803 3.42773 2.38933 3.63845 2.01425 4.01352C1.63918 4.38859 1.42847 4.8973 1.42847 5.42773V19.4277C1.42847 19.9582 1.63918 20.4669 2.01425 20.8419C2.38933 21.217 2.89803 21.4277 3.42847 21.4277H17.4285C17.9589 21.4277 18.4676 21.217 18.8427 20.8419C19.2178 20.4669 19.4285 19.9582 19.4285 19.4277V12.4277"
                      stroke="currentcolor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.9285 1.92796C18.3263 1.53014 18.8659 1.30664 19.4285 1.30664C19.9911 1.30664 20.5306 1.53014 20.9285 1.92796C21.3263 2.32579 21.5498 2.86535 21.5498 3.42796C21.5498 3.99057 21.3263 4.53014 20.9285 4.92796L11.4285 14.428L7.42847 15.428L8.42847 11.428L17.9285 1.92796Z"
                      stroke="currentcolor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-2 py-2 justify-between items-center ">
                {profile?.onboarding?.resume ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <FileText className="inline-block mr-2" size={20} />
                      {isRenaming ? (
                        <input
                          type="text"
                          defaultValue={
                            resumeName ||
                            profile?.onboarding?.resume
                              .split("_")
                              .slice(1)
                              .join("_")
                              .split(".")[0]
                          }
                          onBlur={() => setIsRenaming(false)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setIsRenaming(false);
                          }}
                          className="border rounded p-1 text-gray-700"
                        />
                      ) : (
                        <span className="mr-2">
                          {resumeName ||
                            profile?.onboarding?.resume
                              .split("_")
                              .slice(1)
                              .join("_")
                              .split(".")[0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <a
                        href={`http://localhost:3000/${profile?.onboarding?.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>No resume uploaded yet. Upload one now!</p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Element>

          <Element name="jobs-section" className="pt-6">
            <div className="px-6">
              <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3 mb-4">
                Saved Jobs
              </h2>

              {jobsToShow.length === 0 ? (
                <p className="text-gray-500">No saved jobs yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobsToShow.map((job) => {
                    const isApplied = appliedJobs.includes(job._id);
                    return (
                      <div
                        key={job._id}
                        className="border border-gray-300 rounded-xl p-4 flex gap-4 items-start relative"
                      >
                        {/* Logo */}
                        <img
                          src={
                            job.companyLogo
                              ? `http://localhost:3000/${job.companyLogo.replace(
                                  /\\/g,
                                  "/"
                                )}`
                              : ""
                          }
                          alt={job.companyName}
                          className="w-16 h-16 object-contain rounded-full border"
                        />

                        {/* Job Info */}
                        <div className="flex flex-col justify-between w-full">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              {job.position}
                            </h3>
                            <p className="text-gray-600">{job.companyName}</p>
                            <p className="text-gray-500 text-sm">
                              {job.location}
                            </p>
                          </div>
                          <div className="ml-4 mt-1 absolute right-4">
                            {savedJobs.includes(job._id) ? (
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 14 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="cursor-pointer "
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
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="cursor-pointer "
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

                          {/* Actions */}
                          <div className="flex items-center justify-between mt-4">
                            {isApplied ? (
                              <button
                                disabled
                                className=" border border-blue-300 text-blue-600 cursor-not-allowed py-2 px-4 rounded-full"
                              >
                                Applied
                              </button>
                            ) : job.applyMethod === "Easy Apply" ? (
                              <button
                                onClick={() =>
                                  navigate("/jobapplicationform", {
                                    state: { job },
                                  })
                                }
                                className="text-blue-600 border border-blue-600 py-2 px-4 rounded-full hover:bg-blue-50 transition"
                              >
                                Easy Apply
                              </button>
                            ) : (
                              <a
                                href={job.applyMethod}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 border border-blue-600 py-2 px-4 rounded-full inline-block text-center hover:bg-blue-50 transition"
                              >
                                Apply
                              </a>
                            )}

                            <p className="text-gray-400 text-sm ml-4 whitespace-nowrap">
                              {formatPostedAt(job.postedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Element>
          <Element name="applied-section" className="pt-6">
            <div className="px-6">
              <h2 className="text-2xl font-semibold text-gray-700 border-b border-gray-400 pb-3 mb-4">
                Applied Jobs
              </h2>

              <AppliedJobs jobs={appliedJob} userId={userId} />
            </div>
          </Element>
        </div>
      </div>
    </>
  );
};


const InfoBlock = ({ label, value }) => (
  <div>
    <p className="text-sm font-semibold text-gray-700">{label} *</p>
    <p className="text-md text-gray-600 mt-1">{value}</p>
  </div>
);

export default UserProfile;