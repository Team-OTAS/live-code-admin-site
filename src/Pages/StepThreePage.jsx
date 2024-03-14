import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import "./../Styles/auth.css";
import { styled } from "@mui/material/styles";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import TextField from "@mui/material/TextField";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useNavigate } from "react-router-dom";


import { useState } from "react";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function StepThreePage() {
  const [logoImage, setLogoImage] = useState(null);
  const [receipt, setReceipt] = useState({
    receipt_header: "",
    receipt_footer : ""
  });
  const navigate = useNavigate();

  // Function to handle changes in form fields
  const handleInputChange = (field) => (event) => {
    setReceipt({
      ...receipt,
      [field]: event.target.value,
    });
    console.log("Receipt", receipt);
  };

  const handleLogoImageChange = (event) =>{
    const file = event.target.files[0];
    setLogoImage(file);

    console.log("Logo Image Data:", file);
  }

  const handleCompleteSetup = () =>{
   

    
    navigate('/completesetuppage');
  }

  return (
    <>
      <Box>
        {/* ---------Title Header Start -------------------------------------------------------- */}
        <Grid item xs={12}>
          <p className="textheader">Set Up Your Shop Receipt</p>
        </Grid>
        {/* ---------Title Header End -------------------------------------------------------- */}

        {/* ---------Title Body Start -------------------------------------------------------- */}
        <Grid item xs={12}>
          {/* for desktop users */}
          <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            <p className="textbody">
              Set up your page receipt <br />
              to show user buying lists in a minute
              <br />
              <span style={{ fontSize: "12px" }}>
                (You can change the shop information later in the{" "}
                <span style={{ fontWeight: "bold" }}>
                  profile setting &gt; security feature
                </span>
                )
              </span>
            </p>
          </Box>
          {/* for mobile users */}
          <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
            <p className="textbody">
              Set up your page receipt <br />
              to show user buying lists in a minute
              <br />
              <span style={{ fontSize: "12px" }}>
                (You can change the shop information later in the <br />
                <span style={{ fontWeight: "bold" }}>
                  profile setting &gt; security feature
                </span>
                )
              </span>
            </p>
          </Box>
        </Grid>
        {/* ---------Title Body End -------------------------------------------------------- */}

        {/* ---------Form Start -------------------------------------------------------- */}
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
          }}
        >
          <form style={{ display: "flex", flexDirection: "column" }}>
            <div className="photoUpload">
              <div className="input-field-label">
                <ImageOutlinedIcon color="primary" />
                <span>Shop Logo</span>
              </div>
              <Button
                component="label"
                variant="contained"
                startIcon={<AttachmentOutlinedIcon />}
                sx={{ marginTop: "10px" }}
              >
                Upload Image
                <VisuallyHiddenInput 
                type="file"
                onChange={handleLogoImageChange}
                 />
              </Button>
            </div>
            <TextField
              id="outlined-multiline-static"
              label={
                <div className="input-field-label">
                  <ReceiptLongOutlinedIcon color="primary" />
                  <span>Receipt Header</span>
                </div>
              }
              multiline
              rows={5}
              sx={{ width: "38ch", marginY: "20px" }}
              color="primary"
              value = {receipt.receipt_header}
              onChange={handleInputChange("receipt_header")}
            />
            <TextField
              id="outlined-multiline-static"
              label={
                <div className="input-field-label">
                  <ReceiptLongOutlinedIcon color="primary" />
                  <span>Receipt Footer</span>
                </div>
              }
              multiline
              rows={5}
              sx={{ width: "38ch" }}
              color="primary"
              value = {receipt.receipt_footer}
              onChange={handleInputChange("receipt_footer")}
            />
          </form>
          <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            <div className="smartphone">
              <div className="content"></div>
            </div>
          </Box>
        </Grid>
        {/* ---------Form End -------------------------------------------------------- */}

        {/* ---------Button Start -------------------------------------------------------- */}
        <Grid item xs={12} style={{ textAlign: "center", paddingTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={handleCompleteSetup}>
            Continue The Set Up
          </Button>
        </Grid>
        {/* ---------Button End -------------------------------------------------------- */}
      </Box>
    </>
  );
}