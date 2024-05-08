import React, { useEffect, useState } from "react";
import { API_REQUESTOPTIONS } from "../../utils/constants";
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

const JobBoard = () => {
  const dispatch = useDispatch();
  const searchTitle = useSelector(selectSearchTitle); // Selecting search title from Redux store
  const selectedLocation = useSelector(selectSelectedLocation); // Selecting selected location from Redux store
  const selectedRoles = useSelector(selectSelectedRoles); // Selecting selected roles from Redux store
  const [apiData, setApiData] = useState([]);
  const [offset, setOffset] = useState(0); //State to manage offset for infinite scroll
  const [loading, setLoading] = useState(false); // State to manage loading state

  const getApiData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          ...API_REQUESTOPTIONS,
          body: JSON.stringify({ ...API_REQUESTOPTIONS.body, offset }),
        }
      );
      const json = await response.json();
      setApiData((prevData) => [...prevData, ...json.jdList]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Effect to fetch data when offset changes
  useEffect(() => {
    getApiData();
  }, [offset]);

  // Effect to handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        setOffset((prevOffset) => prevOffset + 10); //Increasing offset when user scrolls to the bottom
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  // Function to filter jobs by roles
  const filterByRole = (job) => {
    if (selectedRoles.length === 0) return true;
    return selectedRoles.some((selectedRole) =>
      job.jobRole && selectedRole
        ? job.jobRole.toLowerCase().includes(selectedRole.toLowerCase())
        : false
    );
  };

  // Function to filter jobs by location
  const filterByLocation = (job) => {
    if (selectedLocation.length === 0) return true;
    return selectedLocation.some((selectedLocation) =>
      job.location && selectedLocation
        ? job.location.toLowerCase().includes(selectedLocation.toLowerCase())
        : false
    );
  };

  // Filtering jobs based on user input from provided filters and search
  const filteredJobs = apiData
    .filter((job) =>
      job.companyName.toLowerCase().includes(searchTitle.toLowerCase())
    )
    .filter(filterByRole)
    .filter(filterByLocation);

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
      {/* Rendering filtered job cards */}
      <div className="job_board_grid">
        {filteredJobs.length === 0 ? (
          <h2>No Jobs Available for This Category at the Moment</h2> // If no jobs found, show message
        ) : (
          filteredJobs.map((data, index) => (
            <div key={index}>
              <JobCard data={data} />
            </div>
          ))
        )}
      </div>
      {loading && <JobCardSkeleton />}
    </div>
  );
};

export default JobBoard;
