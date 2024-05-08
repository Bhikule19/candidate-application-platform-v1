import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import "./JobCard.css";

const JobCard = ({ data }) => {
  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    if (!str) return ""; // If str is falsy return an empty string
    return str.toString().charAt(0).toUpperCase() + str.toString().slice(1);
  };

  return (
    <div className="job_card_grid">
      <Card sx={{ borderRadius: 5 }}>
        <CardContent>
          <div className="job_info">
            <Avatar alt="Netflix" src={data.logoUrl} />
            <div>
              <div className="info_container">
                <Typography variant="h3" className="">
                  {data.companyName}
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
          <Typography className="card_salary">
            Estimated Salary:
            {data.minJdSalary && data.maxJdSalary
              ? ` $${data.minJdSalary}k -  $${data.maxJdSalary}k ${data.salaryCurrencyCode}`
              : data.minJdSalary ?? data.maxJdSalary
              ? ` $${data.minJdSalary ?? data.maxJdSalary}k ${
                  data.salaryCurrencyCode
                }`
              : null}
            <span> ✅</span>
          </Typography>
          <div className="card_about">
            <div>
              <Typography className="card_about_heading">
                About Company:
              </Typography>
              <Box className="">
                <p>About us</p>
                <p>{data.jobDetailsFromCompany}</p>
              </Box>
            </div>
          </div>
          <Box className="info_container">
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
