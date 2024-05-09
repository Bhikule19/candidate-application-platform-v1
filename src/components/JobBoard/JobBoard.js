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
} from "../../redux/jobSlice";
import JobCardSkeleton from "../ShimmerUI/JobCardSkeleton";
import "./JobBoard.css";
import useInfiniteScrollAndFetch from "../../hooks/useInfiniteScrollAndFetch";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const JobBoard = () => {
  const dispatch = useDispatch();
  const searchTitle = useSelector(selectSearchTitle); // Selecting search title from Redux store
  const selectedLocation = useSelector(selectSelectedLocation); // Selecting selected location from Redux store
  const selectedRoles = useSelector(selectSelectedRoles); // Selecting selected roles from Redux store
  const [apiData, loading, error] = useInfiniteScrollAndFetch(10); //Using custom hook to fetch data and manage loading and error states, also providing the value 10 to render 10 job cards per scroll
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

    setFilteredData(filteredJobs);
  };

  useEffect(() => {
    filterData(); // Call filterData function when searchTitle, selectedLocation, selectedRoles, or apiData changes
  }, [searchTitle, selectedLocation, selectedRoles, apiData]);

  const handleSearchTitleChange = (e) => {
    dispatch(setSearchTitle(e.target.value));
  };

  const handleLocationChange = (location) => {
    dispatch(setSelectedLocation(location));
  };

  const handleRolesChange = (roles) => {
    dispatch(setSelectedRoles(roles));
  };

  return (
    <div className="job_board">
      <input
        type="text"
        placeholder="Search Company Name"
        className="input_box"
        value={searchTitle}
        onChange={handleSearchTitleChange}
      />
      <RolesInput setSelectedRoles={handleRolesChange} />
      <LocationInput setSelectedLocation={handleLocationChange} />
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
