import { Box, Typography } from "@mui/material";
import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = () => {
  return (
    <Box className="no_jobs_container">
      <Box className="no_jobs_content">
        <img
          src="https://jobs.weekday.works/_next/static/media/nothing-found.4d8f334c.png"
          alt="No Job Found"
          width="150"
          height="150"
        />
        <Typography variant="h2">
          No Jobs Available for This Category at the Moment
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorMessage;
