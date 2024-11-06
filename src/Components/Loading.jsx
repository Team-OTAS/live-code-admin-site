import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
      <Typography variant="h5">Loading Data</Typography>
    </Box>
  );
}

export default Loading;
