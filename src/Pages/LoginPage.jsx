import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import LiveCodeLogo from "./../assets/images/logo.png";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { setAuthToken } from "../api/axios";
import "./../Styles/auth.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [user_name, setuser_name] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        user_name,
        password,
      });
      console.log("Login Page", response);
      if (response.status === 200) {
        const authToken = response.data.data.token;
        const shopId = response.data.data.shop_id;
        const id = response.data.data.id;
        localStorage.setItem("id", id);
        setAuthToken(authToken);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("shopId", shopId);
        if (response.data.data.user_type.id !== 1) {
          if (response.data.data.status === "onboarding") {
            navigate("/");
          } else {
            navigate("/changeaccinfo");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid Credentials",
            text: "You are not authorized to access this shop",
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login Failed",
      });
    }
    // try {
    //   const response = await axios.post(
    //     "/api/auth/login",
    //     {
    //       user_name,
    //       password,
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(response);
    //   const authToken = response.data.data.token;
    //   const shopId = response.data.data.shop_id;
    //   const id = response.data.data.id;
    //   // const status = response.data.data.status;
    //   localStorage.setItem("id", id);
    //   setAuthToken(authToken);
    //   localStorage.setItem("authToken", authToken);
    //   localStorage.setItem("shopId", shopId);
    //   let decodedToken = jwtDecode(authToken);
    //   // console.log("Decoded Token", decodedToken.iat * 1000);
    //   localStorage.setItem("expirationTime", decodedToken.iat * 1000);
    //   // console.log("Shop id response", id);
    //   // console.log("Shop status", status);

    //   navigate("/changeaccinfo");
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Something went wrong!",
    //   });
    // }
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
                Login into live code and manage <br /> your live sales with{" "}
                <br /> easy-peasy features to create <br />
                endless profits without much effort..
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
