import React from "react";
import Grid from "@mui/material/Grid";
import LiveCodeLogo from "./../assets/images/logo.png";
import FBloginPhoto from "./../assets/images/FBlogin.png";
import { Box } from "@mui/material";
import "./../Styles/auth.css";
import Button from "@mui/material/Button";
import axios from "./../api/axios";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function FBloginPage() {
  const { t } = useTranslation();
  const loginFb = t("loginFB");

  async function handleClick() {
    try {
      const res = await axios.get(
        "auth/facebook/redirect?redirect_url=https://admin.livecodemm.com/"
      );
      window.location.href = res.data.data.facebook_redirect_url;
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "လုပ်ဆောင်မှု မအောင်မြင်ပါ။",
          text: error.response.data.message,
          icon: "info",
        });
      } else {
        Swal.fire({
          title: "internet မရှိပါ။",
          text: error.message,
          icon: "warrning",
        });
      }
    }
  }

  return (
    <>
      <Box sx={{ py: 5 }}>
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
            <img
              src={FBloginPhoto}
              alt="live_code_logo"
              className="changeAccInfo"
            />
          </Grid>
          <Grid item xs={2}>
            {/* for desktop users */}
            <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              <p className="textheader">{loginFb}</p>
            </Box>
            {/* for mobile users */}
            <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
              <p className="textheader">{loginFb}</p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {/* for desktop users */}
            <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              <p className="textbody">
                Connect your Facebook admin account with live code to <br />{" "}
                access your Facebook page and manage your live sales.
              </p>
            </Box>
            {/* for mobile users */}
            <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
              <p className="textbody">
                Connect your Facebook admin <br /> account with live code to
                access <br />
                your Facebook page and manage <br /> your live sales.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleClick}>
              <span>Login Facebook Account</span>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
