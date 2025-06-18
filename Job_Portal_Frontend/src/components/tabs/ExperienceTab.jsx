import React from "react";
import { Briefcase } from "lucide-react";

const ExperienceTab = ({ experience }) => (
  <div>
    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
      <Briefcase size={20} /> Experience
    </h3>
    {experience.length === 0 && <div className="text-gray-500">No experience details found.</div>}
    <ol className="relative border-l border-green-200">
      {experience.map((exp, idx) => (
        <li key={idx} className="mb-8 ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3 ring-4 ring-white">
            <Briefcase size={16} className="text-green-600" />
          </span>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-green-700">{exp.title}</span>
              <span className="text-xs text-gray-400">{exp.yearFrom} – {exp.yearTo}</span>
            </div>
            <div className="text-gray-700 mt-2">{exp.company}, {exp.location}</div>
            <div className="text-gray-500 text-sm">{exp.description}</div>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

export default ExperienceTab;
