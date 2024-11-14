import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import "./../Styles/auth.css";
import { styled } from "@mui/material/styles";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import TextField from "@mui/material/TextField";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "./../api/axios.js";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { MultiStepContext } from "../StepContext";

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
  const { t } = useTranslation();
  const stepThree = t("stepThree");
  const stepThreeDes = t("stepThreeDes");
  const stepThreeBtn = t("stepThreeBtn");
  const stepThreeBtn2 = t("stepThreeBtn2");

  const { setStep } = useContext(MultiStepContext);

  const shopData = useSelector((state) => state.Shop.formData);

  const id = localStorage.getItem("shopId");
  const [file, setFile] = useState(null);
  const [receipt_header, setReceiptHeader] = useState("");
  const [receipt_footer, setReciptFooter] = useState("");

  function hundleFileChange(e) {
    setFile(e.target.files[0]);
  }

  const navigate = useNavigate();
  const handleCompleteSetup = async () => {
    const data = {
      ...shopData,
      logo: file,
      receipt_header: receipt_header,
      receipt_footer: receipt_footer,
    };

    try {
      await axios.post(`/api/shops/${id}?_method=PUT`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/completesetuppage");
    } catch (error) {
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
    // navigate("/completesetuppage");
  };

  return (
    <>
      <Box>
        {/* ---------Title Header Start -------------------------------------------------------- */}
        <Grid item xs={12}>
          <p className="textheader">{stepThree}</p>
        </Grid>
        {/* ---------Title Header End -------------------------------------------------------- */}

        {/* ---------Title Body Start -------------------------------------------------------- */}
        <Grid item xs={12}>
          {/* for desktop users */}
          <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            <p className="textbody">
              {/* Set up your page receipt <br />
              to show user buying lists in a minute
              <br /> */}
              <span style={{ fontSize: "12px" }}>{stepThreeDes}</span>
            </p>
          </Box>
          {/* for mobile users */}
          <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
            <p className="textbody">
              Set up your page receipt <br />
              to show user buying lists in a minute
              <br />
              <span style={{ fontSize: "8px" }}>{stepThreeDes}</span>
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
              <div>
                <div className="input-field-label">
                  <ImageOutlinedIcon color="primary" />
                  <span>Shop Logo</span>
                </div>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<AttachmentOutlinedIcon />}
                  sx={{ marginTop: "10px", fontSize: "12px" }}
                >
                  {file ? "edit Image" : " Upload Image"}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={hundleFileChange}
                  />
                </Button>
              </div>
              <div className="photoUpload-img">
                {file ? (
                  <img src={URL.createObjectURL(file)} alt="logo" />
                ) : null}
              </div>
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
              value={receipt_header}
              onChange={(e) => setReceiptHeader(e.target.value)}
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
              value={receipt_footer}
              onChange={(e) => setReciptFooter(e.target.value)}
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
          <Button
            // variant="contained"
            color="primary"
            onClick={() => {
              setStep(2);
            }}
            sx={{
              marginTop: "5px",
              marginRight: "5px",
              textDecoration: "underline",
            }}
          >
            {stepThreeBtn}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCompleteSetup}
          >
            {stepThreeBtn2}
          </Button>
        </Grid>
        {/* ---------Button End -------------------------------------------------------- */}
      </Box>
    </>
  );
}
