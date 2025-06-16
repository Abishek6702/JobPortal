import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useLocation, useNavigate } from "react-router-dom";

const JobApplicationForm = () => {
  const { state } = useLocation();
  const job = state?.job;
  const {
    companyLogo,
    companyName,
    location: jobLocation,
    position: jobTitle,
  } = job || {};

  const navigate = useNavigate();

  const steps = ["Personal Info", "Resume", "Job History", "Experience"];
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    location: "",
    job: { company: "", location: "", position: "" },
    experience: "",
    relocation: false,
    interviewDates: [],
    jobs: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleNestedChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedJobs = [...prevData.jobs];
      updatedJobs[index] = { ...updatedJobs[index], [field]: value };
      return { ...prevData, jobs: updatedJobs };
    });
  };

  const handleAddJobSet = () => {
    setFormData((prevData) => ({
      ...prevData,
      jobs: [...prevData.jobs, { company: "", location: "", position: "" }],
    }));
  };

  const handleRemoveJobSet = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      jobs: prevData.jobs.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    handleChange("resume", e.target.files[0]);
    setErrors((prevErrors) => ({ ...prevErrors, resume: "" }));
  };

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.location) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    // Removed validation for step 3
    return true;
  };

  const validateStep4 = () => {
    let newErrors = {};
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (formData.interviewDates.length === 0)
      newErrors.interviewDates = "Atleast select one date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.resume) newErrors.resume = "Resume is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (formData.interviewDates.length === 0)
      newErrors.interviewDates = "Atleast select one date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = true;
    if (step === 0) isValid = validateStep1();
    if (step === 1) isValid = validateStep2();
    if (step === 2) isValid = true; // Removed validation for step 3
    if (step === 3) isValid = validateStep4();

    if (isValid) {
      setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = async () => {
    if (step === 2) {
      nextStep();
    }
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No authentication token found.");
      return;
    }

    const submissionData = {
      jobId: job?._id,
      companyId: job?.companyId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      experience: formData.experience,
      relocation: formData.relocation,
      datesAvailable: formData.interviewDates,
      location: formData.location,
      pastWorkExperience: formData.jobs.map((job) => ({
        companyName: job.company,
        location: job.location,
        position: job.position,
      })),
      resume: formData.resume,
    };

    try {
      const formDataToSubmit = new FormData();
      Object.keys(submissionData).forEach((key) => {
        if (key === "resume" && submissionData[key]) {
          formDataToSubmit.append(key, submissionData[key]);
        } else if (Array.isArray(submissionData[key])) {
          formDataToSubmit.append(key, JSON.stringify(submissionData[key]));
        } else {
          formDataToSubmit.append(key, submissionData[key]);
        }
      });

      const response = await fetch("http://localhost:3000/api/applications", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSubmit,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the application.");
      }

      const result = await response.json();
      console.log("Submission Result:", result);
      navigate("/submitsucess");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert(`Error submitting the application: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 mt-2">
      <div className="w-full max-w-[60%]">
        {/* Back Button */}
        <div className="mb-4">
          <button className="cursor-pointer" onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="black"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          </button>
        </div>

        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src={`http://localhost:3000/${companyLogo}`}
              className="w-10 h-10 border rounded-full border-gray-400"
              alt="Company Logo"
            />
            <h1 className="text-gray-600 font-medium text-xl">{companyName}</h1>
          </div>
          <h1 className="font-medium text-2xl mt-[1%] md:text-3xl ">{jobTitle}</h1>
          <h1 className="text-gray-400 mt-[1%] font-medium text-lg">{jobLocation}</h1>
        </div>
        <hr className="border-t border-gray-400 mt-4 mb-2" />

        {/* Form */}
        <div className="">
          <div className="flex items-center justify-between"></div>
          <div className="w-[75%] bg-gray-200 h-2 rounded-full m-auto mb-6 mt-8">
            <div
              className="bg-blue-600 h-2 rounded-full "
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <p className="text-2xl font-bold mb-6 text-center">{steps[step]}</p>

          {step === 0 && (
            <div className="flex flex-col space-y-4 w-[80%] m-auto">
              <div>
                <label className="block text-lg font-semibold mb-1">Name</label>
                <input
                  className={`border ${errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-sm p-2 text-sm w-full`}
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1">Email</label>
                <input
                  className={`border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-sm p-2 text-sm w-full`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1">Phone</label>
                <input
                  className={`border ${errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-sm p-2 text-sm w-full`}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">Location</label>
                <input
                  className={`border ${errors.location ? "border-red-500" : "border-gray-300"
                    } rounded-sm p-2 text-sm w-full`}
                  placeholder="Enter your current location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col space-y-4 w-[80%] m-auto">
              <label className="text-lg font-semibold">Upload Resume</label>
              <input
                type="file"
                onChange={handleFileChange}
                className={`border ${errors.resume ? "border-red-500" : "border-gray-300"
                  } rounded-sm p-2 text-sm`}
              />
              {errors.resume && (
                <p className="text-red-500 text-sm">{errors.resume}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col space-y-4 w-[80%] m-auto">
              <label className="block text-lg font-semibold mb-3">
                Job Information
              </label>

              {formData.jobs.map((job, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-4 border-b border-gray-300 pb-4 mb-4"
                >
                  <div>
                    <label className="block text-sm font-semibold">
                      Company Name
                    </label>
                    <input
                      className={`border ${errors[`company-${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                        } rounded-sm p-2 text-sm w-full`}
                      placeholder="Company Name"
                      value={job.company}
                      onChange={(e) =>
                        handleNestedChange(index, "company", e.target.value)
                      }
                    />
                    {errors[`company-${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`company-${index}`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold">Location</label>
                    <input
                      className={`border ${errors[`location-${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                        } rounded-sm p-2 text-sm w-full`}
                      placeholder="Location"
                      value={job.location}
                      onChange={(e) =>
                        handleNestedChange(index, "location", e.target.value)
                      }
                    />
                    {errors[`location-${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`location-${index}`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold">Position</label>
                    <input
                      className={`border ${errors[`position-${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                        } rounded-sm p-2 text-sm w-full`}
                      placeholder="Position"
                      value={job.position}
                      onChange={(e) =>
                        handleNestedChange(index, "position", e.target.value)
                      }
                    />
                    {errors[`position-${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`position-${index}`]}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveJobSet(index)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove this work experience
                  </button>
                </div>
              ))}

              {errors.jobs && (
                <p className="text-red-500 text-sm">{errors.jobs}</p>
              )}

              <button
                type="button"
                onClick={handleAddJobSet}
                className="bg-blue-500 text-white rounded-sm py-2 px-4 mt-4"
              >
                Add past work experience
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col space-y-4 w-[80%] m-auto">
              <div>
                <label className="block text-lg font-semibold mb-1">
                  Years of Experience
                </label>
                <input
                  className={`border ${errors.experience ? "border-red-500" : "border-gray-300"
                    } rounded-sm p-2 text-sm w-full`}
                  placeholder="Years of Experience"
                  value={formData.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm">{errors.experience}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1">
                  Open to Relocation
                </label>
                <select
                  className="border border-gray-300 rounded-sm p-2 text-sm w-full"
                  value={formData.relocation ? "yes" : "no"}
                  onChange={(e) =>
                    handleChange("relocation", e.target.value === "yes")
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1">
                  Available Interview Dates
                </label>
                <input
                  type="date"
                  className={`border ${errors.interviewDates
                      ? "border-red-500"
                      : "border-gray-300"
                    } rounded-sm p-2 text-sm w-full mb-2`}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    handleChange(
                      "interviewDates",
                      formData.interviewDates
                        ? [...formData.interviewDates, selectedDate]
                        : [selectedDate]
                    );
                  }}
                />
                {errors.interviewDates && (
                  <p className="text-red-500 text-sm">{errors.interviewDates}</p>
                )}

                {formData.interviewDates &&
                  formData.interviewDates.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.interviewDates.map((date, index) => (
                        <span
                          key={index}
                          className="bg-gray-400 text-white text-sm rounded-full px-3 py-1 flex items-center gap-2"
                        >
                          {date}
                          <button
                            type="button"
                            onClick={() => {
                              const updatedDates =
                                formData.interviewDates.filter(
                                  (d) => d !== date
                                );
                              handleChange("interviewDates", updatedDates);
                            }}
                            className="bg-red-500 text-white rounded-full p-1 w-4 h-4 flex items-center justify-center"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={prevStep}
              disabled={step === 0}
            >
              Previous
            </button>
            {step === steps.length - 1 ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
