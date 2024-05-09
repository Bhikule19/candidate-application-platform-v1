import React from "react";
import Select from "react-select";

const options = [
  { value: "remote", label: "Remote" },
  { value: "in-office", label: "In-Office" },
  { value: "hybrid", label: "Hybrid" },
];

const LocationTypeInput = ({ setSelectedLocationType }) => {
  // Function to handle change in selected location
  const handleChange = (selectedOption) => {
    setSelectedLocationType(selectedOption.map((option) => option.value)); // Updating selected location type
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      isMulti={true}
      placeholder="Remote"
    />
  );
};

export default LocationTypeInput;
