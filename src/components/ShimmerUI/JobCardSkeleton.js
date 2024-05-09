import { Box, Skeleton } from "@mui/material";
import React from "react";

const JobCardSkeleton = () => {
  return (
    <Box className="skeleton_box">
      <Box className="skeleton_box_top">
        <Skeleton variant="circular" width={40} height={40} />
        <Box className="skeleton_box_side">
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </Box>
      </Box>
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Box>
  );
};

export default JobCardSkeleton;
