import React from "react";

export default function EducationStep({ formData, setFormData }) {
  const handleArrayChange = (idx, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const arr = [...prev.education];
      arr[idx][name] = value;
      return { ...prev, education: arr };
    });
  };
  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          level: "",
          institution: "",
          university: "",
          branch: "",
          yearFrom: "",
          yearTo: "",
          marks: "",
        },
      ],
    }));
  };
  const removeItem = (idx) => {
    setFormData((prev) => {
      const arr = [...prev.education];
      arr.splice(idx, 1);
      return { ...prev, education: arr };
    });
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Education</h2>
      {formData.education.map((edu, idx) => (
        <div key={idx} className="border p-2 mb-2 rounded flex flex-wrap">
          <input
            name="level"
            placeholder="Level"
            value={edu.level}
            onChange={(e) => handleArrayChange(idx, e)}
            className="border p-1 m-1  border-gray-300 rounded-lg outline-none"
          />
          <input
            name="institution"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => handleArrayChange(idx, e)}
            className="border p-1 m-1  border-gray-300 rounded-lg outline-none"
          />
          <input
            name="university"
            placeholder="University"
            value={edu.university}
            onChange={(e) => handleArrayChange(idx, e)}
            className="border p-1 m-1  border-gray-300 rounded-lg outline-none"
          />
          <input
            name="branch"
            placeholder="Branch"
            value={edu.branch}
            onChange={(e) => handleArrayChange(idx, e)}
            className="border p-1 m-1 border-gray-300 rounded-lg outline-none"
          />
          <input
            name="yearFrom"
            placeholder="Year From"
            value={edu.yearFrom}
            onChange={(e) => handleArrayChange(idx, e)}
            className="border p-1 m-1 border-gray-300 rounded-lg outline-none"
          />
          <input
            name="yearTo"
            placeholder="Year To"
            value={edu.yearTo}
            onChange={(e) => handleArrayChange(idx, e)}
            className="border p-1 m-1 border-gray-300 rounded-lg outline-none"
          />
          <input
            name="marks"
            placeholder="Marks"
            value={edu.marks}
            onChange={(e) => handleArrayChange(idx, e)}
           className="border p-1 m-1  border-gray-300 rounded-lg outline-none"
          />
          {formData.education.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="text-red-500 ml-2"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addItem} className="text-blue-500 mb-2">
        Add Education
      </button>
    </div>
  );
}
