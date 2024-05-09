import React from "react";
import Select from "react-select";

const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

const ExpInput = ({ setSelectedExp }) => {
  // Function to handle change in selected location
  const handleChange = (selectedOption) => {
    setSelectedExp(selectedOption.map((option) => option.value)); // Updating selected location
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      isMulti={true}
      placeholder="Min Experience"
    />
  );
};

export default ExpInput;
