import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./JobCard.css";

const JobCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    if (!str) return ""; // If str is falsy return an empty string
    return str.toString().charAt(0).toUpperCase() + str.toString().slice(1);
  };

  // Function to handle expansion of job description
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  // Function to render job description with limited characters
  const renderLimitedJD = () => {
    const maxLength = 300; // Maximum number of characters to display initially
    const jobDescription = data.jobDetailsFromCompany;

    if (expanded) {
      return jobDescription;
    } else {
      return jobDescription.length > maxLength
        ? jobDescription.substring(0, maxLength) + "..."
        : jobDescription;
    }
  };

  const cardAboutStyle = {
    //dynamically adding the styling to provide mask-image to the about para
    maskImage: expanded
      ? "none" // Remove mask image when expanded
      : "linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))",
  };

  return (
    <div className="">
      <Card
        sx={{
          borderRadius: 5,
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px !important",
          padding: "10px",
        }}
      >
        <CardContent>
          <Box>
            <Box className="posted_card">
              <Box className="posted_card_info">
                <p className="card_info_p">⏳ Posted recently</p>
              </Box>
            </Box>
          </Box>
          <div className="job_info">
            {/* <Avatar alt="logo" src={data.logoUrl} /> */}
            <img src={data.logoUrl} alt="logo" />
            <div>
              <div className="info_container">
                <Typography variant="h3" className="">
                  <a href={data.jdLink}>{data.companyName}</a>
                </Typography>
                <Typography variant="h2">
                  {capitalizeFirstLetter(data.jobRole)}
                </Typography>
              </div>
              <p className="cards-sub-text">
                {capitalizeFirstLetter(data.location)}
              </p>
            </div>
          </div>
          <p className="card_salary">
            Estimated Salary:
            {data.minJdSalary && data.maxJdSalary
              ? ` $${data.minJdSalary}k -  $${data.maxJdSalary}k ${data.salaryCurrencyCode}`
              : data.minJdSalary ?? data.maxJdSalary
              ? ` $${data.minJdSalary ?? data.maxJdSalary}k ${
                  data.salaryCurrencyCode
                }`
              : null}
            <span> ✅</span>
          </p>
          <div className="card_about" style={cardAboutStyle}>
            <div>
              <Typography className="card_about_heading">
                About Company:
              </Typography>
              <Box>
                <p className="about_info">About us</p>
                <p className="about_para">{renderLimitedJD()}</p>
              </Box>
            </div>
          </div>
          {/* <Box className="show_info">
            <button>Show more</button>
          </Box> */}
          {data.jobDetailsFromCompany.length > 150 && ( // Show "Show more" button only if job description length exceeds 150 characters
            <Box className="show_info">
              <button onClick={handleExpand}>
                {expanded ? "Show less" : "Show more"}
              </button>
            </Box>
          )}
          <Box className="info_container info_salary">
            <Typography variant="h3">Minimum Experience</Typography>
            {data.minExp ? (
              <Typography variant="h2"> {`${data.minExp} years`}</Typography>
            ) : (
              <Typography variant="h2"> Not provided</Typography>
            )}
          </Box>
          <Box className="button_container">
            <Box className="button_container_buttons">
              <Button variant="contained" className="button">
                ⚡ Easy Apply
              </Button>
            </Box>
            <Box className="button_container_buttons">
              <Button variant="contained" className="button referral">
                <Box className="button_avatar_group">
                  <AvatarGroup>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                  </AvatarGroup>
                  <p>Unlock referral asks</p>
                </Box>
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCard;
