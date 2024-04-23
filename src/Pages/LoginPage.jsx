import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import LiveCodeLogo from "./../assets/images/logo.png";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import "./../Styles/auth.css";
import { useNavigate } from "react-router-dom";

// import fetchXsrfToken from "../api/auth";

// import axios from "axios";
import axios from "../api/axios";
// import AuthService from "../services/auth.service";

export default function LoginPage() {
  const [user_name, setuser_name] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await axios.post(
      "/api/auth/login",
      {
        user_name,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      const authToken = response.data.data.token;
      const shopId = response.data.data.shop_id;
      const id = response.data.data.id;
      const status = response.data.data.status;
      localStorage.setItem("id", id);
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("shopId", shopId);
      console.log("Shop id response", id);
      console.log("Shop status", status);

      navigate("/changeaccinfo");
    }
    console.log("Response for shop data", response.data.data.token);
    console.log("Response for shop data", response.data.data.shop_id);
  };

  return (
    <>
      <Box
        sx={{
          py: 5,
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ py: { xs: 3, sm: 0 } }}
        >
          <Grid item xs={2}>
            <img src={LiveCodeLogo} alt="live_code_logo" className="logo" />
          </Grid>
          <Grid item xs={2}>
            <p className="textheader">Login to Live Code</p>
          </Grid>
          <Grid item xs={12}>
            <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              <p className="textbody">
                Login into live code and manage your live sales with <br />{" "}
                easy-peasy features to create endless profits without much
                effort..
              </p>
            </Box>
            <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
              <p className="textbody">
                <p className="textbody">
                  Login into live code and manage <br /> your live sales with{" "}
                  <br /> easy-peasy features to create <br />
                  endless profits without much effort..
                </p>
              </p>
            </Box>
          </Grid>
          {/* ---------Form Start  --------------------------------------------------------*/}
          <Grid item xs={12}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "30ch" },
              }}
            >
              <div className="input-field">
                <TextField
                  id="outlined-error-helper-text"
                  value={user_name}
                  onChange={(e) => setuser_name(e.target.value)}
                  label={
                    <div className="input-field-label">
                      <Person2OutlinedIcon color="primary" />
                      <span>User name</span>
                    </div>
                  }
                  color="primary"
                  size="small"
                />
              </div>
              <div className="input-field">
                <TextField
                  id="outlined-error-helper-text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label={
                    <div className="input-field-label">
                      <PasswordOutlinedIcon color="primary" />
                      <span>Password</span>
                    </div>
                  }
                  color="primary"
                  size="small"
                />
              </div>
            </Box>
          </Grid>
          {/* ---------Form End  --------------------------------------------------------*/}
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login To LiveCode
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
