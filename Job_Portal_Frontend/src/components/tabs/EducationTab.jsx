import React from "react";
import { GraduationCap } from "lucide-react";

const EducationTab = ({ education }) => (
  <div>
    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
      <GraduationCap size={20} /> Education Timeline
    </h3>
    {education.length === 0 && <div className="text-gray-500">No education details found.</div>}
    <ol className="relative border-l border-blue-200">
      {education.map((edu, idx) => (
        <li key={idx} className="mb-8 ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-white">
            <GraduationCap size={16} className="text-blue-600" />
          </span>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-blue-700">{edu.level}</span>
              <span className="text-xs text-gray-400">{edu.yearFrom} – {edu.yearTo}</span>
            </div>
            <div className="text-gray-700 mt-2">{edu.institution}, {edu.university}</div>
            <div className="text-gray-500 text-sm">Branch: {edu.branch} | Marks: {edu.marks}</div>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

export default EducationTab;
