import React from "react";
import Select from "react-select";

const options = [
  { value: "delhi", label: "Delhi" },
  { value: "mumbai", label: "Mumbai" },
  { value: "bangalore", label: "Bangalore" },
  { value: "chennai", label: "Chennai" },
];

const LocationInput = ({ setSelectedLocation }) => {
  // Function to handle change in selected location
  const handleChange = (selectedOption) => {
    setSelectedLocation(selectedOption.map((option) => option.value)); // Updating selected location
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      isMulti={true}
      placeholder="Select Location"
    />
  );
};

export default LocationInput;
