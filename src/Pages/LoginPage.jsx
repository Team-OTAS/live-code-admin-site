import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import LiveCodeLogo from "./../assets/images/logo.png";
import TextField from "@mui/material/TextField";
import { Box, Button, IconButton } from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { setAuthToken } from "../api/axios";
import "./../Styles/auth.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const { t } = useTranslation();
  const onboarding = t("onboarding");
  const loginBtn = t("loginBtn");
  const [user_name, setuser_name] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const handleLogin = async () => {
    // fetchXsrfToken();

    try {
      const response = await axios.post("/api/auth/login", {
        user_name,
        password,
      });
      // console.log("Login Page", response);
      if (response.status === 200) {
        const authToken = response.data.data.token;
        const shopId = response.data.data.shop_id;
        const id = response.data.data.id;
        localStorage.setItem("id", id);

        setAuthToken(authToken);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("shopId", shopId);
        if (response.data.data.user_type.id !== 1) {
          // navigate("/");
          if (response.data.data.status === "active") {
            navigate("/");
          } else {
            navigate("/changeaccinfo");
          }
        } else {
          Swal.fire({
            icon: "warning",
            title: "Invalid Credentials",
            text: "You are not authorized to access this shop",
          });
        }
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        Swal.fire({
          title: "လုပ်ဆောင်မှု မအောင်မြင်ပါ။",
          text: error.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "internet မရှိပါ။",
          text: error.message,
          icon: "info",
        });
      }
    }
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
            <p className="textheader">{onboarding}</p>
          </Grid>
          <Grid item xs={12}>
            <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              <p className="textbody">
                Login into live code and manage your live sales with easy-peasy
                features to create endless profits without much effort..
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
                  id="username"
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
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        color="primary"
                        onClick={handleClickShowPassword}
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
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
              {loginBtn}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
