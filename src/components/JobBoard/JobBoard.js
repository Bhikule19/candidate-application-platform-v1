import React, { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import { Box, Grid } from "@mui/material";
import { API_REQUESTOPTIONS } from "../../utils/constants";
import "./JobBoard.css";

const JobBoard = () => {
  const [apiData, setApiData] = useState([]);
  const [seacrchTitle, setSearchTitle] = useState("");

  const getApiData = async () => {
    //Fetch the API using asyn await and try & catch to handle any error while fetching
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        API_REQUESTOPTIONS
      );
      const json = await response.json();
      setApiData(json.jdList);
      console.log("this is the api data", apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  // };

  // console.log(
  //   apiData.filter((company) =>
  //     company.companyName.toLowerCase().includes("dr")
  //   )
  // );

  return (
    <div className="job_board">
      <input
        type="text"
        placeholder="Search Company Name"
        className="input_box"
        onChange={(e) => setSearchTitle(e.target.value)}
      ></input>
      <Box>
        <Grid container>
          <Grid item className="job_board_grid">
            {/* Map function to iterate through API data to render it and filtering the UI Card wrt to input text */}
            {apiData
              .filter((company) =>
                company.companyName.toLowerCase().includes(seacrchTitle)
              )
              .map((data) => (
                <div key={data.jdUid}>
                  <JobCard data={data} />
                </div>
              ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default JobBoard;
