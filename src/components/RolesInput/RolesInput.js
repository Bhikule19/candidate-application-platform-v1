import React from "react";
import Select from "react-select";

const groupedOptions = [
  {
    label: "Engineering",
    options: [
      { value: "frontend", label: "Frontend" },
      { value: "backend", label: "Backend Developer" },
      { value: "fullstack", label: "Full Stack Developer" },
    ],
  },
  {
    label: "Design",
    options: [
      { value: "uiux", label: "UI/UX Designer" },
      { value: "graphic", label: "Graphic Designer" },
    ],
  },
];

const RolesInput = ({ setSelectedRoles }) => {
  // Function to handle change in selected role
  const handleChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions.map((option) => option.value)); // Updating selected location
  };

  return (
    <div>
      <Select options={groupedOptions} onChange={handleChange} isMulti={true} />
    </div>
  );
};

export default RolesInput;
