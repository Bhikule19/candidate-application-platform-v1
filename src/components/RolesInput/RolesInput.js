import React, { useState } from "react";
import Select from "react-select";
import TechInput from "../TechInput/TechInput";
import "./RolesInput.css";

const groupedOptions = [
  {
    label: "ENGINEERING",
    options: [
      { value: "frontend", label: "Frontend" },
      { value: "backend", label: "Backend" },
      { value: "fullstack", label: "Fullstack" },
      { value: "ios", label: "IOS" },
      { value: "flutter", label: "Flutter" },
      { value: "react", label: "React Native" },
      { value: "android", label: "Android" },
      { value: "tech lead", label: "Tech Lead" },
      { value: "devops", label: "Dev-Ops" },
      { value: "data", label: "Data Engineer" },
    ],
  },
  {
    label: "Design",
    options: [
      { value: "uiux", label: "UI/UX Designer" },
      { value: "graphic designer", label: "Graphic Designer" },
      { value: "product", label: "Product Designer" },
    ],
  },
  {
    label: "Product",
    options: [{ value: "productmanager", label: "Product Manager" }],
  },
];

const RolesInput = ({ setSelectedRoles }) => {
  const [roleSelected, setRoleSelected] = useState(false);

  // Function to handle change in selected role
  const handleChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions.map((option) => option.value)); // Updating selected location
    setRoleSelected(selectedOptions.length > 0);
  };

  return (
    <div className="select_filter">
      <Select
        options={groupedOptions}
        onChange={handleChange}
        isMulti={true}
        placeholder={"Roles"}
        classNamePrefix="react-select"
      />
      {roleSelected && <TechInput />}
    </div>
  );
};

export default RolesInput;
