import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import close from "../assets/close.svg"
import {jwtDecode} from "jwt-decode";
import ExitConfirmation from "./ExitConfirmation";

export default function JobPostForm() {
  const [companyOptions, setCompanyOptions] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const steps = [
    "Company Info",
    "Job Info",
    "Requirements",
    "Benefits",
    "Overview",
    "Submit",
  ];
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    companyId: "",
    companyName: "",
    position: "",
    location: "",
    workplace: "",
    whereYouWillDoIt: "",
    applyMethod: "",
    reportingTo: [],
    interviewProcess: "",
    team: "",
    salaryRange: "",
    tools: [],
    additionalBenefits: [],
    jobDescription: [{ title: "", content: [""] }],
    requirements: [{ title: "", content: [""] }],
    companyOverview: {
      founded: "",
      type: "",
      industry: "",
      sector: "",
      revenue: "",
      size: "",
    },
    deadlineToApply: "",
    companyLogo: "",
    companyImages: [],
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateDynamicField = (type, index, key, value) => {
    const list = [...formData[type]];
    if (key === "content") {
      list[index][key] = value.split("\n");
    } else {
      list[index][key] = value;
    }
    setFormData({ ...formData, [type]: list });
  };

  const addDynamicItem = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], { title: "", content: [""] }],
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  //   const handleSubmit = () => console.log("Submitting:", formData);
  const handleSubmit = async () => {
    console.log("Submitting:", formData);
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);

      const form = new FormData();

      // Convert objects/arrays to strings
      const safeJSON = (value) => JSON.stringify(value ?? "");

      // Append normal fields
      form.append("companyId", formData.companyId);
      form.append("companyName", formData.companyName);
      form.append("position", formData.position);
      form.append("location", formData.location);
      form.append("workplace", formData.workplace);
      form.append("whereYouWillDoIt", formData.whereYouWillDoIt);
      form.append("applyMethod", formData.applyMethod);
      form.append("interviewProcess", formData.interviewProcess);
      form.append("team", formData.team);
      form.append("salaryRange", formData.salaryRange);
      form.append("deadlineToApply", formData.deadlineToApply);

      // Append JSON stringified fields
      form.append("reportingTo", safeJSON(formData.reportingTo));
      form.append("tools", safeJSON(formData.tools));
      form.append("additionalBenefits", safeJSON(formData.additionalBenefits));
      form.append("jobDescription", safeJSON(formData.jobDescription));
      form.append("requirements", safeJSON(formData.requirements));
      form.append("companyOverview", safeJSON(formData.companyOverview));

      // Append files
      if (formData.companyLogo instanceof File) {
        form.append("companyLogo", formData.companyLogo);
      }

      if (formData.companyImages?.length > 0) {
        formData.companyImages.forEach((file) => {
          if (file instanceof File) {
            form.append("companyImages", file);
          }
        });
      }

      const response = await fetch("http://localhost:3000/api/jobs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // console.log("Job posted successfully:", data);
      // // ✅ Show success (you can replace with toast/snackbar/etc.)
      // alert("Job posted successfully!");

      // ✅ Redirect to success page
      navigate("/job-sucess");
    } catch (err) {
      console.error("Submit error:", err.message);
    }
  };
  const handleClose = () => {
    setShowModal(true);
  };

  const handleConfirmExit = () => {
    navigate(-1); // or any other logic
  };
  
  useEffect(() => {
    // Get user id from JWT
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (!token) return;

    let userId = null;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded.userId || decoded._id;
    } catch (err) {
      console.error("Failed to decode token", err);
      return;
    }
console.log("userid:",userId)
    // Fetch all companies and filter by createdby
    fetch("http://localhost:3000/api/companies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      // Check if createdBy is an object and extract the value
      const filtered = data.filter((company) => {
        return (
          company.createdBy &&
          company.createdBy.toString() === userId
        );
      });
      setCompanyOptions(filtered);
    })
    .catch((err) => {
      setCompanyOptions([]);
      console.error("Error fetching companies:", err);
    })
    .finally(() => setLoadingCompanies(false));
}, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <div className="back-icon flex items-center justify-between">
        <div className="icon w-full flex items-center justify-between ">
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={prevStep}
            disabled={step === 0}
            className="cursor-pointer"
          >
            <path
              d="M19.7499 7.99978C19.7499 8.41378 19.4139 8.74978 18.9999 8.74978H2.81091L8.53088 14.4698C8.82388 14.7628 8.82388 15.2378 8.53088 15.5308C8.38488 15.6768 8.19285 15.7508 8.00085 15.7508C7.80885 15.7508 7.61682 15.6778 7.47082 15.5308L0.470818 8.53079C0.401818 8.46179 0.346953 8.37889 0.308953 8.28689C0.232953 8.10389 0.232953 7.89689 0.308953 7.71389C0.346953 7.62189 0.401818 7.53875 0.470818 7.46975L7.47082 0.46975C7.76382 0.17675 8.23885 0.17675 8.53185 0.46975C8.82485 0.76275 8.82485 1.23779 8.53185 1.53079L2.81188 7.25076H18.9999C19.4139 7.24976 19.7499 7.58578 19.7499 7.99978Z"
              fill="black"
            />
          </svg>
         <img src={close} className="cursor-pointer" onClick={handleClose}/>
         {showModal && (
        <ExitConfirmation
          onConfirm={handleConfirmExit}
          onCancel={() => setShowModal(false)}
        />
      )}
        </div>
      </div>
      {/* <h2 className="text-2xl font-bold mb-4 text-center">Post a Job</h2> */}

      <div className="w-full bg-gray-200 h-2 rounded-full mb-6 mt-8">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div> 
      <p className="text-2xl font-bold mb-6 text-center">{steps[step]}</p>

      {/* Step 0: Company Info */}
      {step === 0 && (
        <div className="flex flex-col space-y-4 w-[80%] m-auto">
          <div>
            <label className="block text-lg font-semibold mb-1">
              Company ID
            </label>
            <select
              className="input w-full border border-gray-300 rounded-sm p-2 text-sm outline-none"
              value={formData.companyId}
              onChange={(e) => handleChange("companyId", e.target.value)}
              disabled={loadingCompanies}
            >
              <option value="">Select your company</option>
              {companyOptions.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Company Name
            </label>
            <input
              className="input w-full border border-gray-300 rounded-sm p-2 text-sm outline-none "
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Location</label>
            <input
              className="input w-full border border-gray-300 rounded-sm p-2 text-sm outline-none "
              placeholder="Location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Workplace
            </label>
            <input
              className="input w-full border border-gray-300 rounded-sm p-2 text-sm outline-none "
              placeholder="Workplace"
              value={formData.workplace}
              onChange={(e) => handleChange("workplace", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Where You’ll Work
            </label>
            <input
              className="input w-full border border-gray-300 rounded-sm p-2 text-sm outline-none "
              placeholder="Where You’ll Work"
              value={formData.whereYouWillDoIt}
              onChange={(e) => handleChange("whereYouWillDoIt", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Company Logo
            </label>
            <input
              type="file"
              className="input w-full border border-gray-300 rounded-sm p-2 text-sm outline-none "
              onChange={(e) => handleChange("companyLogo", e.target.files[0])}
            />
          </div>
        </div>
      )}

      {/* Step 1: Job Info */}
      {step === 1 && (
        <div className="flex flex-col space-y-6 w-full max-w-2xl mx-auto px-4">
          <div>
            <label className="block text-lg font-semibold mb-1">Position</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Position"
              value={formData.position}
              onChange={(e) => handleChange("position", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Apply Method URL
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Apply Method URL"
              value={formData.applyMethod}
              onChange={(e) => handleChange("applyMethod", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Team</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Team"
              value={formData.team}
              onChange={(e) => handleChange("team", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Salary Range
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Salary Range"
              value={formData.salaryRange}
              onChange={(e) => handleChange("salaryRange", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Reporting To (comma separated)
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Reporting To (comma separated)"
              value={formData.reportingTo.join(",")}
              onChange={(e) =>
                handleChange("reportingTo", e.target.value.split(","))
              }
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Interview Process
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Interview Process"
              value={formData.interviewProcess}
              onChange={(e) => handleChange("interviewProcess", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Tools (comma separated)
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tools (comma separated)"
              value={formData.tools.join(",")}
              onChange={(e) => handleChange("tools", e.target.value.split(","))}
            />
          </div>
        </div>
      )}

      {/* Step 2: Job Description & Requirements */}
      {step === 2 && (
        <div className="space-y-6 w-[90%] m-auto">
          <h3 className="font-semibold text-lg">Job Description</h3>
          {formData.jobDescription.map((desc, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded space-y-2">
              <input
                className="input border border-gray-400 outline-none rounded-sm p-2"
                placeholder="Title"
                value={desc.title}
                onChange={(e) =>
                  updateDynamicField(
                    "jobDescription",
                    i,
                    "title",
                    e.target.value
                  )
                }
              />
              <textarea
                className="input w-full outline-none border border-gray-400 rounded-sm p-2"
                placeholder="Content (one per line)"
                value={desc.content.join("\n")}
                onChange={(e) =>
                  updateDynamicField(
                    "jobDescription",
                    i,
                    "content",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
          <button
            className="text-blue-500 underline"
            onClick={() => addDynamicItem("jobDescription")}
          >
            + Add Job Description Section
          </button>

          <h3 className="font-semibold text-lg mt-6">Requirements</h3>
          {formData.requirements.map((req, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded space-y-2">
              <input
                className="input border border-gray-400 outline-none rounded-sm p-2"
                placeholder="Title"
                value={req.title}
                onChange={(e) =>
                  updateDynamicField("requirements", i, "title", e.target.value)
                }
              />
              <textarea
                className="input w-full outline-none border border-gray-400 rounded-sm p-2"
                placeholder="Content (one per line)"
                value={req.content.join("\n")}
                onChange={(e) =>
                  updateDynamicField(
                    "requirements",
                    i,
                    "content",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
          <button
            className="text-blue-500 underline"
            onClick={() => addDynamicItem("requirements")}
          >
            + Add Requirement
          </button>
        </div>
      )}

      {/* Step 3: Benefits & Extras */}
      {step === 3 && (
        <div className="flex flex-col space-y-6 w-full max-w-2xl mx-auto px-4">
          <div>
            <label className="block text-lg font-semibold mb-1">Benefits</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm outline-none"
              placeholder="Benefits (comma separated)"
              value={formData.additionalBenefits.join(",")}
              onChange={(e) =>
                handleChange("additionalBenefits", e.target.value.split(","))
              }
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Deadline to Apply
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm outline-none"
              value={formData.deadlineToApply}
              onChange={(e) => handleChange("deadlineToApply", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Upload Company Images
            </label>
            <input
              type="file"
              multiple
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm  outline-none"
              onChange={(e) =>
                handleChange("companyImages", Array.from(e.target.files))
              }
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Founded", key: "founded", placeholder: "e.g. 2005" },
            { label: "Company Type", key: "type", placeholder: "e.g. Private" },
            {
              label: "Industry",
              key: "industry",
              placeholder: "e.g. Information Technology",
            },
            {
              label: "Sector",
              key: "sector",
              placeholder: "e.g. Software Development",
            },
            {
              label: "Revenue",
              key: "revenue",
              placeholder: "e.g. $10M - $50M",
            },
            {
              label: "Company Size",
              key: "size",
              placeholder: "e.g. 51-200 employees",
            },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-lg font-semibold mb-1">
                {label}
              </label>
              <input
                type="text"
                value={formData.companyOverview[key]}
                placeholder={placeholder}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyOverview: {
                      ...prev.companyOverview,
                      [key]: e.target.value,
                    },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded outline-none shadow-sm"
              />
            </div>
          ))}
        </div>
      )}

      {step === 5 && (
        <div className="space-y-8">
          <p className="text-2xl font-bold text-center">Review Your Job Post</p>

          {/* Company Info */}
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Company Info</h3>
            {formData.companyLogo && (
              <div className="mb-3">
                <p className="font-medium">Company Logo:</p>
                <img
                  src={
                    typeof formData.companyLogo === "string"
                      ? formData.companyLogo
                      : URL.createObjectURL(formData.companyLogo)
                  }
                  alt="Company Logo"
                  className="h-20 object-contain"
                />
              </div>
            )}
            {formData.companyImages?.length > 0 && (
              <div className="mb-3">
                <p className="font-medium">Company Images:</p>
                <div className="flex gap-4 overflow-x-auto">
                  {formData.companyImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={
                        typeof img === "string" ? img : URL.createObjectURL(img)
                      }
                      alt={`Company ${idx}`}
                      className="h-24 rounded"
                    />
                  ))}
                </div>
              </div>
            )}
            <p>
              <strong>Company ID:</strong> {formData.companyId}
            </p>
            <p>
              <strong>Company Name:</strong> {formData.companyName}
            </p>
            <p>
              <strong>Location:</strong> {formData.location}
            </p>
            <p>
              <strong>Workplace:</strong> {formData.workplace}
            </p>
            <p>
              <strong>Apply Method:</strong> {formData.applyMethod}
            </p>
          </div>

          {/* Job Info */}
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Job Info</h3>
            <p>
              <strong>Position:</strong> {formData.position}
            </p>
            <p>
              <strong>Where You'll Do It:</strong> {formData.whereYouWillDoIt}
            </p>
            <p>
              <strong>Reporting To:</strong> {formData.reportingTo?.join(", ")}
            </p>
            <p>
              <strong>Interview Process:</strong> {formData.interviewProcess}
            </p>
            <p>
              <strong>Team:</strong> {formData.team}
            </p>
            <p>
              <strong>Salary Range:</strong> {formData.salaryRange}
            </p>
            <p>
              <strong>Tools:</strong> {formData.tools?.join(", ")}
            </p>
            {formData.deadlineToApply && (
              <p>
                <strong>Deadline to Apply:</strong> {formData.deadlineToApply}
              </p>
            )}
          </div>

          {/* Job Description */}
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          {formData.jobDescription.map((desc, index) => (
            <div key={index}>
              <h4 className="font-bold">{desc.title}</h4>
              <ul className="list-disc list-inside">
                {desc.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          </div>

          {/* Requirements */}
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            {formData.requirements.map((req, index) => (
              <div key={index}>
                <h4 className="font-bold">{req.title}</h4>
                <ul className="list-disc list-inside">
                  {req.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Benefits</h3>
            <ul className="list-disc list-inside">
              {formData.additionalBenefits?.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Company Overview */}
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Company Overview</h3>
            {Object.entries(formData.companyOverview || {}).map(
              ([key, value]) => (
                <p key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value}
                </p>
              )
            )}
          </div>
          <div className="card_container  flex items-center space-x-20">
           <div className="card ">
           <div className="title mt-2 mb-4 p-2">
              <p className="text-lg font-semibold ">Job Card Preview</p>
            </div>
            <div className="card-container border border-gray-300 rounded-md p-4 cursor-pointer mb-5">
              {/* Top Row: Company Info & Bookmark */}
              <div className="card-title flex items-center justify-between">
                <div className="company-name flex gap-2">
                  <img
                    src={
                      typeof formData.companyLogo === "string"
                        ? formData.companyLogo
                        : URL.createObjectURL(formData.companyLogo)
                    }
                    alt="Company Logo"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <p className="text-gray-500 font-medium">
                    {" "}
                    {formData.companyName}
                  </p>
                </div>
              </div>

              {/* Position & Location */}
              <div className="card-body mt-4">
                <p className="text-xl md:text-2xl font-semibold">
                  {formData.position}
                </p>
                <p className="font-medium text-gray-600">
                  {formData.location} ({formData.workplace})
                </p>
              </div>

              {/* Buttons and Posted Time */}
              <div className="card-button flex items-center justify-between mt-4">
                <div className="button flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                  <button
                    className="border-2 border-[#0C9653] bg-white rounded-full py-2 px-4 text-green-700 font-bold  w-full md:w-auto"
                 
                  >
                    {formData.applyMethod === "Easy Apply"
                      ? "Easy Apply"
                      : "Apply Link"}
                  </button>
                  <button className="border border-white rounded-full py-2 px-4 bg-green-100 text-green-700 font-bold  w-full md:w-auto">
                    Multiple Candidate
                  </button>
                </div>
                <div className="posted-date ml-4 whitespace-nowrap">
                  <p className="text-sm text-black">
                    0d
                  </p>
                </div>
              </div>
            </div>
           </div>

          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded cursor-pointer"
              onClick={handleSubmit}
            >
              Submit Job Post
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-end w-[80%] m-auto p-2 ">
        
        {step < steps.length - 1 && (
          <button
            className="px-4 py-2 rounded-full bg-[#2986CE] text-white"
            onClick={nextStep}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
