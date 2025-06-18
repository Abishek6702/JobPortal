import React from "react";

export default function PreferencesStep({ formData, setFormData }) {
  const handleRoleChange = (idx, e) => {
    const arr = [...formData.preferredRoles];
    arr[idx] = e.target.value;
    setFormData(prev => ({ ...prev, preferredRoles: arr }));
  };
  const addRole = () => setFormData(prev => ({ ...prev, preferredRoles: [...prev.preferredRoles, ""] }));
  const removeRole = idx => {
    setFormData(prev => {
      const arr = [...prev.preferredRoles];
      arr.splice(idx, 1);
      return { ...prev, preferredRoles: arr };
    });
  };
  const handleSalaryChange = e => setFormData(prev => ({ ...prev, salaryExpectation: e.target.value }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Preferences</h2>
      <div>
        <label>Preferred Roles</label>
        {formData.preferredRoles.map((role, idx) => (
          <div key={idx} className="flex items-center mb-2">
            <input
              placeholder="Preferred Role"
              value={role}
              onChange={e => handleRoleChange(idx, e)}
              className="border p-1 m-1"
            />
            {formData.preferredRoles.length > 1 && (
              <button type="button" onClick={() => removeRole(idx)} className="text-red-500 ml-2">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addRole} className="text-blue-500 mb-2">Add Role</button>
      </div>
      <div className="mb-4">
        <label>Salary Expectation</label>
        <input
          name="salaryExpectation"
          type="number"
          value={formData.salaryExpectation}
          onChange={handleSalaryChange}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
}
