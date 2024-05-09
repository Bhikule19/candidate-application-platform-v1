import React, { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import RolesInput from "../RolesInput/RolesInput";
import LocationInput from "../LocationInput/LocationInput";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTitle,
  selectSearchTitle,
  setSelectedLocation,
  selectSelectedLocation,
  setSelectedRoles,
  selectSelectedRoles,
  setSelectedExp,
  selectSelectedExp,
  setSelectedSal,
  selectSelectedSal,
  setSelectedLocationType,
  selectSelectedLocationType,
} from "../../redux/jobSlice";
import JobCardSkeleton from "../ShimmerUI/JobCardSkeleton";
import "./JobBoard.css";
import useInfiniteScrollAndFetch from "../../hooks/useInfiniteScrollAndFetch";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ExpInput from "../ExpInput/ExpInput";
import MinSalaryInput from "../MinSalaryInput/MinSalaryInput";
import LocationTypeInput from "../LoctationType/LocationTypeInput";

const JobBoard = () => {
  const dispatch = useDispatch();
  const searchTitle = useSelector(selectSearchTitle); // Selecting search title from Redux store
  const selectedLocation = useSelector(selectSelectedLocation); // Selecting selected location from Redux store
  const selectedRoles = useSelector(selectSelectedRoles); // Selecting selected roles from Redux store
  const selectedExp = useSelector(selectSelectedExp); //Selecting selected experiance from Redux store
  const selectedSal = useSelector(selectSelectedSal); // Selecting selected salary from Redux store
  const selectedLocationType = useSelector(selectSelectedLocationType); // Selecting selected location type from Redux store
  const [apiData, loading, error] = useInfiniteScrollAndFetch(15); //Using custom hook to fetch data and manage loading and error states, also providing the value 10 to render 10 job cards per scroll
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(apiData); // Update filtered data when apiData changes
  }, [apiData]);
  console.log(apiData);

  // Filtering jobs based on user input from provided filters and search
  const filterData = () => {
    let filteredJobs = apiData.filter((job) =>
      job.companyName.toLowerCase().includes(searchTitle.toLowerCase())
    );

    if (selectedRoles.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        selectedRoles.includes(job.jobRole.toLowerCase())
      );
    }

    if (selectedLocation.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        selectedLocation.includes(job.location.toLowerCase())
      );
    }

    // Filter jobs based on selected experience levels
    if (selectedExp.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        // Check if any selected experience level includes or is less than the job's minimum experience
        selectedExp.some((exp) => job.minExp <= exp)
      );
    }

    if (selectedSal.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        //Include jobs with salaries that are either equal to or less than twice the minimum salary and Exclude jobs with salaries more than twice the minimum salary.
        selectedSal.some(
          (salary) =>
            (job.minJdSalary === null || job.minJdSalary * 2 >= salary) &&
            job.maxJdSalary <= salary * 2
        )
      );
    }

    if (selectedLocationType.length > 0) {
      filteredJobs = filteredJobs.filter((job) => {
        if (selectedLocationType.includes("remote")) {
          return job.location.toLowerCase() === "remote";
        } else if (selectedLocationType.includes("in-office")) {
          return job.location.toLowerCase() !== "remote";
        } else if (selectedLocationType.includes("hybrid")) {
          return job.location.toLowerCase() === "hybrid";
        }
        return true;
      });
    }

    setFilteredData(filteredJobs);
  };

  useEffect(() => {
    filterData(); // Call filterData function when searchTitle, selectedLocation, selectedRoles, and other filter values or apiData changes
  }, [
    searchTitle,
    selectedLocation,
    selectedRoles,
    selectedExp,
    selectedSal,
    selectedLocationType,
    apiData,
  ]);

  const handleSearchTitleChange = (e) => {
    dispatch(setSearchTitle(e.target.value));
  };

  const handleLocationChange = (location) => {
    dispatch(setSelectedLocation(location));
  };

  const handleRolesChange = (roles) => {
    dispatch(setSelectedRoles(roles));
  };

  const handleExpChange = (exp) => {
    dispatch(setSelectedExp(exp));
  };

  const handleSalaryChange = (sal) => {
    dispatch(setSelectedSal(sal));
  };

  const handleLocationType = (location) => {
    dispatch(setSelectedLocationType(location));
  };

  return (
    <div className="job_board">
      <div className="seacrh_filters">
        <RolesInput setSelectedRoles={handleRolesChange} />
        <ExpInput setSelectedExp={handleExpChange} />
        <LocationTypeInput setSelectedLocationType={handleLocationType} />
        <MinSalaryInput setSelectedSal={handleSalaryChange} />
        <LocationInput setSelectedLocation={handleLocationChange} />
        <input
          type="text"
          placeholder="Search Company Name"
          className="input_box"
          value={searchTitle}
          onChange={handleSearchTitleChange}
        />
      </div>
      {error && <div>Error: {error}</div>}
      {loading && <JobCardSkeleton />}
      {!loading &&
        filteredData.length === 0 && ( // Conditionally render No Jobs message component
          <ErrorMessage />
        )}
      <div className="job_card_grid">
        {filteredData.map((data) => (
          <div key={data.jdUid}>
            <JobCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
