import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import LiveCodeLogo from "./../assets/images/logo.png";
import CompleteSticker from "./../assets/images/Completed-bro.png";
import { Box, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./../Styles/auth.css";

export default function CompleteSetupPage() {
  const [show] = useState(true);
  const navigate = useNavigate();
  const clickHandler = () => {
    console.log("Finish Register");
    navigate("/");
  };
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
          {/* ---------logo start -------------------------------------------------------- */}
          <Grid item xs={2}>
            <img src={LiveCodeLogo} alt="live_code_logo" className="logo" />
          </Grid>
          {/* ---------logo end -------------------------------------------------------- */}
          {/* ---------Title Header Start -------------------------------------------------------- */}
          <Grid item xs={2}>
            {/* for destop users */}
            <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              <p className="textheader">
                Process Of Setting Your Shop <br />
                On Live Code Is Complete
              </p>
            </Box>
            {/* for mobile users */}
            <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
              <p className="textheader">
                Process Of Setting Your <br /> Shop On Live Code Is <br />{" "}
                Complete
              </p>
            </Box>
          </Grid>
          {/*--------- Title Header End  --------------------------------------------------------*/}
          {/* ---------Title body Start  --------------------------------------------------------*/}
          <Grid item xs={2}>
            <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              <p className="textbody">
                If you want to update your shop information later, you can
                update it
                <br /> in the{" "}
                <span style={{ fontWeight: "bold" }}>
                  profile setting &gt; shop setting
                </span>
              </p>
            </Box>
            <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
              <p className="textbody">
                You can change your user name &<br /> password as you prefer.
                <br /> Or if you dont want to change now ,<br /> it perfectly
                fine..
                <br />
                You can later change it in your <br />
                <span style={{ fontWeight: "bold" }}>
                  profile setting &gt; security feature
                </span>
              </p>
            </Box>
          </Grid>
          {/*---------Title body End -------------------------------------------------------- */}
          {/* ---------Sticker Start -------------------------------------------------------- */}
          <Grid item xs={2}>
            <AnimatePresence>
              {show && (
                <motion.img
                  src={CompleteSticker}
                  alt="completeSticker"
                  className="completeSticker"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: "0.5" }}
                />
              )}
            </AnimatePresence>
          </Grid>
          {/* ---------Sticker End -------------------------------------------------------- */}
          {/* ---------Button Start --------------------------------------------------------*/}
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={clickHandler}>
              Go to Admin Dashboard
            </Button>
          </Grid>
          {/* ---------Button End -------------------------------------------------------- */}
        </Grid>
      </Box>
    </>
  );
}
