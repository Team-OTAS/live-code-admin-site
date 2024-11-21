import { Box, Button, Grid } from "@mui/material";
import React from "react";
import UserManagement from "./UserManagement";
import ShopReciept from "./ShopReciept";
import AutoReply from "./AutoReply";
import ShopDetails from "./ShopDetails";
import "./accsetting.css";

function Accsetting() {
  const [page, setPage] = React.useState(3);

  function channgePage(id) {
    setPage(id);
  }

  return (
    <Box className="dashboardContent">
      <Box className="settingBtnContainer">
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              sx={{
                border: "1px solid #4d3f3f",
                "&:hover": {
                  background: "#4d3f3f",
                  color: "#fff",
                },
              }}
              className={page === 1 ? "settingbtn active" : "settingbtn"}
              onClick={() => channgePage(1)}
            >
              <span className="settingText">AutoReply Message</span>
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              sx={{
                border: "1px solid #4d3f3f",
                "&:hover": {
                  background: "#4d3f3f",
                  color: "#fff",
                },
              }}
              className={page === 2 ? "settingbtn active" : "settingbtn"}
              onClick={() => channgePage(2)}
            >
              <span className="settingText">Shop Vouncher</span>
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              sx={{
                border: "1px solid #4d3f3f",
                "&:hover": {
                  background: "#4d3f3f",
                  color: "#fff",
                },
              }}
              className={page === 3 ? "settingbtn active" : "settingbtn"}
              onClick={() => channgePage(3)}
            >
              <span className="settingText">User Acc Management</span>
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              sx={{
                border: "1px solid #4d3f3f",
                "&:hover": {
                  background: "#4d3f3f",
                  color: "#fff",
                },
              }}
              className={page === 4 ? "settingbtn active" : "settingbtn"}
              onClick={() => channgePage(4)}
            >
              <span className="settingText">Profile</span>
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          padding: { sx: "0", md: "20px" },
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        {page === 1 && <AutoReply />}
        {page === 2 && <ShopReciept />}
        {page === 3 && <UserManagement />}
        {page === 4 && <ShopDetails />}
      </Box>
    </Box>
  );
}

export default Accsetting;
