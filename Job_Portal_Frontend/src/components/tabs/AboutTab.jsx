import React from "react";
import { Mail, Phone, MapPin, User } from "lucide-react";

const AboutTab = ({ profile }) => {
  const onboarding = profile.onboarding || {};
  return (
    <div className="rounded-lg shadow p-6 bg-white">
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600 shadow">
          <User size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{onboarding.firstName} {onboarding.lastName}</h2>
          <p className="text-gray-500">{profile.role}</p>
          <p className="flex items-center text-gray-400 mt-1"><MapPin size={16} className="mr-1" />{onboarding.location}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center gap-2"><Mail size={16} /> {onboarding.email || profile.email}</div>
        <div className="flex items-center gap-2"><Phone size={16} /> {onboarding.phone || profile.phone}</div>
        <div><b>Preferred Roles:</b> {(onboarding.preferredRoles || []).join(", ")}</div>
        <div><b>Salary Expectation:</b> {onboarding.salaryExpectation ? `₹${onboarding.salaryExpectation}` : "N/A"}</div>
      </div>
    </div>
  );
};

export default AboutTab;
