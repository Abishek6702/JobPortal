import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from "react-router-dom";

const steps = [
  { id: 1, title: "Give Us Your Primary Information", progress: 20 },
  {
    id: 2,
    title:
      "We will make sure your preferences Up to date What is Your Location?",
    progress: 40,
  },
  { id: 3, title: "What is Minimum salary You want?", progress: 60 },
  { id: 4, title: "What Offer Are you looking for?", progress: 80 },
  { id: 5, title: "Review Your Information", progress: 100 },
];

export default function OnboardingForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    postalcode: "",
    salary: "",
    salaryperiod: "",
    jobtitle: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    try {
      // Fetch the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error('Token not found');
      }
  
      // Decode the JWT token to get userId
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; 
 
  
      // Sending the progress to the backend
      const response = await fetch("http://localhost:3000/api/onboarding/save-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Send token in the Authorization header
        },
        body: JSON.stringify({
          userId
          ,  // Send userId
          completedStage: `step${currentStep}`, 
          currentStep: currentStep + 1  // Send current step
        }),
      });
  
      // Handle response
      const data = await response.json();
      if (response.ok) {
        console.log("Progress saved", data);
      } else {
        console.error("Failed to save progress", data);
        return; // Exit function if save progress fails
      }
  
      // Move to the next step if progress is saved successfully
      if (currentStep < steps.length ) {
        setCurrentStep((prev) => prev + 1);  // Move to the next step
      } else {
        // If it's the last step, handle form submission
        handleSubmit();
        console.log("Submitted Data:", formData);
      }
    } catch (error) {
      console.error("Error saving progress", error);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-md font-bold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-2  rounded-md outline-none border border-gray-500"
                />
              </div>
              <div>
                <label className="block text-md font-bold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-2  rounded-md outline-none border border-gray-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-md font-bold text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-2  rounded-md outline-none border border-gray-500"
                />
              </div>
              <div>
                <label className="block text-md font-bold text-gray-700 mb-1">
                  Phone*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2  rounded-md outline-none border border-gray-500"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <p className="font-medium text-gray-500">
              We use this to match you nearby offers.
            </p>
            <div className="flex justify-evenly ">
              <div className=" w-[50%] ">
                <label className="block text-md font-semibold text-gray-700 mb-1">
                  City
                </label>
                <div className="relative text-gray-500">
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className=" px-4 py-2 outline-none rounded-lg border w-[100%]"
                  />
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[50%] translate-y-[-50%] right-4"
                  >
                    <path
                      d="M7.99978 8.75002C7.80778 8.75002 7.61575 8.67705 7.46975 8.53005L0.46975 1.53005C0.17675 1.23705 0.17675 0.762018 0.46975 0.469018C0.76275 0.176018 1.23779 0.176018 1.53079 0.469018L8.00076 6.93899L14.4707 0.469018C14.7637 0.176018 15.2388 0.176018 15.5318 0.469018C15.8248 0.762018 15.8248 1.23705 15.5318 1.53005L8.53176 8.53005C8.38376 8.67705 8.19178 8.75002 7.99978 8.75002Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-evenly  w-fit text-gray-500">
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                   
                    name="postalcode"
                    value={formData.postalcode}
                    onChange={handleInputChange}
                    className=" px-4 py-2 border rounded-lg outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <p>
              We use this to match you nearby offers that approximately pay this
              amount or more{" "}
            </p>
            <div className="flex gap-4">
              <div className=" w-[50%]">
                <label className="block text-md font-semibold text-gray-700 mb-1">
                  Minimum Salary Amount
                </label>
                <div className="relative w-[100%] text-gray-500 ">
                  <input
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-500 rounded-lg outline-none "
                  />
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[50%] right-4 translate-y-[-50%]"
                  >
                    <path
                      d="M7.99978 8.75002C7.80778 8.75002 7.61575 8.67705 7.46975 8.53005L0.46975 1.53005C0.17675 1.23705 0.17675 0.762018 0.46975 0.469018C0.76275 0.176018 1.23779 0.176018 1.53079 0.469018L8.00076 6.93899L14.4707 0.469018C14.7637 0.176018 15.2388 0.176018 15.5318 0.469018C15.8248 0.762018 15.8248 1.23705 15.5318 1.53005L8.53176 8.53005C8.38376 8.67705 8.19178 8.75002 7.99978 8.75002Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div className=" w-[50%]">
                <label className="block text-md font-semibold text-gray-700 mb-1">
                  Payment Period
                </label>
                <div className="relative text-gray-500 ">
                  <input
                    name="salaryperiod"
                  
                    value={formData.salaryperiod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg border-gray-500 outline-none"
                  />
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[50%] right-4 translate-y-[-50%] "
                  >
                    <path
                      d="M7.99978 8.75002C7.80778 8.75002 7.61575 8.67705 7.46975 8.53005L0.46975 1.53005C0.17675 1.23705 0.17675 0.762018 0.46975 0.469018C0.76275 0.176018 1.23779 0.176018 1.53079 0.469018L8.00076 6.93899L14.4707 0.469018C14.7637 0.176018 15.2388 0.176018 15.5318 0.469018C15.8248 0.762018 15.8248 1.23705 15.5318 1.53005L8.53176 8.53005C8.38376 8.67705 8.19178 8.75002 7.99978 8.75002Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <p>
            This Helps us match you to relevant offers.
            </p>
            <div className="flex gap-4">
              <div className=" w-full">
                <label className="block text-md font-semibold text-gray-700 mb-1">
                Desired Offer title
                </label>
              <div className="w-[100%] text-gray-500">
              <div className="relative  ">
                  <input
                    name="jobtitle"
                   
                    value={formData.jobtitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-500 rounded-lg outline-none "
                  />
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 top-5"
                  >
                    <path
                      d="M7.99978 8.75002C7.80778 8.75002 7.61575 8.67705 7.46975 8.53005L0.46975 1.53005C0.17675 1.23705 0.17675 0.762018 0.46975 0.469018C0.76275 0.176018 1.23779 0.176018 1.53079 0.469018L8.00076 6.93899L14.4707 0.469018C14.7637 0.176018 15.2388 0.176018 15.5318 0.469018C15.8248 0.762018 15.8248 1.23705 15.5318 1.53005L8.53176 8.53005C8.38376 8.67705 8.19178 8.75002 7.99978 8.75002Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="text-[14px] mt-2">Add Up to ten offer titles</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Review Your Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize text-sm text-gray-500">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="font-medium text-gray-800">
                    {value || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
  
      const response = await fetch("http://localhost:3000/api/onboarding/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId, ...formData, onboardingCompleted: true }), // ✅ add this
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Form submitted successfully", data);
        navigate("/");
        // Redirect or success message
      } else {
        console.error("Form submission failed", data);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <button
              
              disabled={currentStep === 1}
              className="flex items-center text-gray-800 justify-between  w-full mb-4"
            >
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleBack}
              >
                <path
                  d="M19.7499 8.00002C19.7499 8.41402 19.4139 8.75002 18.9999 8.75002H2.81091L8.53088 14.47C8.82388 14.763 8.82388 15.238 8.53088 15.531C8.38488 15.677 8.19285 15.751 8.00085 15.751C7.80885 15.751 7.61682 15.678 7.47082 15.531L0.470818 8.53103C0.401818 8.46203 0.346953 8.37913 0.308953 8.28713C0.232953 8.10413 0.232953 7.89713 0.308953 7.71413C0.346953 7.62213 0.401818 7.53899 0.470818 7.46999L7.47082 0.469994C7.76382 0.176994 8.23885 0.176994 8.53185 0.469994C8.82485 0.762994 8.82485 1.23803 8.53185 1.53103L2.81188 7.251H18.9999C19.4139 7.25 19.7499 7.58602 19.7499 8.00002Z"
                  fill="black"
                />
              </svg>
              <p className="font-semibold text-md p-1 px-2 rounded-full bg-gray-50 cursor-pointer">
                Save & Exit
              </p>
            </button>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${steps[currentStep - 1].progress}%` }}
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {steps[currentStep - 1].title}
        </h2>

        {/* Step Content */}
        {renderStep()}

        {/* Footer */}
        <div className="mt-8 flex ">
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-full cursor-hover"
          >
            {currentStep === steps.length ? "Submit" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
