import React from "react";
import Select from "react-select";

const options = [
  { value: "python", label: "Python" },
  { value: "javascript ", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "golang", label: "GoLang" },
  { value: "ruby/rails", label: "Ruby/Rails" },
  { value: "c++", label: "C++" },
  { value: "kotlin", label: "Kotlin" },
  { value: "django", label: "Django" },
  { value: "react", label: "React" },
];

const TechInput = () => {
  return <Select options={options} isMulti={true} placeholder="Tech Stack" />;
};

export default TechInput;
