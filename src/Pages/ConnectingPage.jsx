import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import LiveCodeLogo from "./../assets/images/logo.png";
import DoneSticker from "./../assets/images/rondy-stickers-lettering-done.png";
import { Box, Button } from "@mui/material";
import "./../Styles/auth.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@mui/material/Link";

export default function ConnectingPage() {
  const [show, setShow] = useState(true);
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
            <p className="textheader">
              Connecting With your
              <br />
              Facebook Pages...
            </p>
          </Grid>
          <Grid item xs={2}>
            <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              <p className="textbody">
                You can update your shop here.
                <br />
                Or if you don’t want to change now , it perfectly fine.
                <br />
                You can later change it in your{" "}
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
          <Grid item xs={2}>
            <AnimatePresence>
              {show && (
                <motion.img
                  src={DoneSticker}
                  alt="doneSticker"
                  className="doneSticker"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: "0.5" }}
                />
              )}
            </AnimatePresence>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: { xs: "flex", sm: "block" },
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button variant="contained" color="primary">
              Set Up Your Shop
            </Button>
            <Button>
              <Link>Do it Later</Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
