import React from "react";
import Select from "react-select";

const options = [
  { value: "5", label: "$5k" },
  { value: "10", label: "$10k" },
  { value: "15", label: "$15k" },
  { value: "20", label: "$20k" },
  { value: "30", label: "$30k" },
  { value: "40", label: "$40" },
  { value: "50", label: "$50k" },
  { value: "60", label: "$60k" },
  { value: "70", label: "$70k" },
  { value: "80", label: "$80k" },
  { value: "90", label: "$90k" },
  { value: "100", label: "$100k" },
];

const MinSalaryInput = ({ setSelectedSal }) => {
  //   Function to handle change in selected location
  const handleChange = (selectedOption) => {
    setSelectedSal(selectedOption.map((option) => option.value)); // Updating selected location
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      isMulti={true}
      placeholder="Min Salary pay"
    />
  );
};

export default MinSalaryInput;
