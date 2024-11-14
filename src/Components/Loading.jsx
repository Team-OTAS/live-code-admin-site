import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import "./../Styles/loading.css";

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
      <Typography variant="h5">Loading...</Typography>
    </Box>
  );
}

export default Loading;
