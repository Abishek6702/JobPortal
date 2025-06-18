import React from "react";

export default function ExperienceStep({ formData, setFormData }) {
  const handleArrayChange = (idx, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const arr = [...prev.experience];
      arr[idx][name] = value;
      return { ...prev, experience: arr };
    });
  };
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", yearFrom: "", yearTo: "", title: "", location: "", description: "" }]
    }));
  };
  const removeItem = idx => {
    setFormData(prev => {
      const arr = [...prev.experience];
      arr.splice(idx, 1);
      return { ...prev, experience: arr };
    });
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Experience</h2>
      {formData.experience.map((exp, idx) => (
        <div key={idx} className="border p-2 mb-2 rounded">
          <input name="company" placeholder="Company" value={exp.company} onChange={e => handleArrayChange(idx, e)} className="border p-1 m-1" />
          <input name="yearFrom" placeholder="Year From" value={exp.yearFrom} onChange={e => handleArrayChange(idx, e)} className="border p-1 m-1" />
          <input name="yearTo" placeholder="Year To" value={exp.yearTo} onChange={e => handleArrayChange(idx, e)} className="border p-1 m-1" />
          <input name="title" placeholder="Title" value={exp.title} onChange={e => handleArrayChange(idx, e)} className="border p-1 m-1" />
          <input name="location" placeholder="Location" value={exp.location} onChange={e => handleArrayChange(idx, e)} className="border p-1 m-1" />
          <input name="description" placeholder="Description" value={exp.description} onChange={e => handleArrayChange(idx, e)} className="border p-1 m-1" />
          {formData.experience.length > 1 && (
            <button type="button" onClick={() => removeItem(idx)} className="text-red-500 ml-2">Remove</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addItem} className="text-blue-500 mb-2">Add Experience</button>
    </div>
  );
}
