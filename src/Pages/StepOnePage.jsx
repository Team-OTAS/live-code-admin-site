import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { MultiStepContext } from "../StepContext";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import { updateShops } from "../redux/features/shopUpdateSlice";
import { updateFormData } from "../redux/features/shopUpdateSlice";
import { useTranslation } from "react-i18next";

export default function StepOnePage() {
  const { t } = useTranslation();
  const stepOne = t("stepOne");
  const stepOneDes = t("stepOneDes");
  const stepOneBtn = t("stepOneBtn");
  const shopFormLabelOne = t("shopFormLabelOne");
  const shopFormLabelTwo = t("shopFormLabelTwo");
  const shopFormLabelThree = t("shopFormLabelThree");
  const shopFormLabelFour = t("shopFormLabelFour");

  const { setStep } = useContext(MultiStepContext);
  const dispatch = useDispatch();
  const [shopData, setShopData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Function to handle changes in form fields
  const handleInputChange = (field) => (event) => {
    setShopData({
      ...shopData,
      [field]: event.target.value,
    });
  };

  const handleOnclick = () => {
    console.log("Shop Update Data", shopData);
    dispatch(updateFormData({ ...shopData }));
    // dispatch(updateShops({ shopData }))
    setStep(2);
  };

  return (
    <>
      <Box>
        {/* ---------Title Header Start -------------------------------------------------------- */}
        <Grid item xs={12}>
          {/* for desktop users */}
          <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            <p className="textheader">{stepOne}</p>
          </Box>
          {/* for mobile users */}
          <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
            <p className="textheader">
              Set Up Your Shop In <br /> Live Code
            </p>
          </Box>
        </Grid>
        {/* ---------Title Header End -------------------------------------------------------- */}
        {/* ---------Title body Start  --------------------------------------------------------*/}
        <Grid item xs={12}>
          {/* for desktop users */}
          <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            <p className="textbody">
              {/* Set up your shop by filling some information
              <br /> in order to create a shop in Live Code and create endless
              <br /> opportunities.
              <br /> */}
              <span style={{ fontSize: "12px" }}>({stepOneDes})</span>
            </p>
          </Box>
          {/* for mobile users */}
          <Box component="div" sx={{ display: { xs: "block", sm: "none" } }}>
            <p className="textbody">
              <span style={{ fontSize: "12px" }}>({stepOneDes})</span>
            </p>
          </Box>
        </Grid>
        {/* ---------Title body End  --------------------------------------------------------*/}

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
            {/* Update TextField components with unique IDs */}
            <div className="input-field">
              <TextField
                id="shopName"
                label={
                  <div className="input-field-label">
                    <StorefrontIcon color="primary" />
                    <span>{shopFormLabelOne}</span>
                  </div>
                }
                color="primary"
                size="small"
                value={shopData.name}
                onChange={handleInputChange("name")}
              />
            </div>
            <div className="input-field">
              <TextField
                id="email"
                label={
                  <div className="input-field-label">
                    <EmailOutlinedIcon color="primary" />
                    <span>{shopFormLabelTwo}</span>
                  </div>
                }
                color="primary"
                size="small"
                value={shopData.email}
                onChange={handleInputChange("email")}
              />
            </div>
            <div className="input-field">
              <TextField
                id="phone"
                label={
                  <div className="input-field-label">
                    <LocalPhoneOutlinedIcon color="primary" />
                    <span>{shopFormLabelThree}</span>
                  </div>
                }
                color="primary"
                size="small"
                value={shopData.phone}
                onChange={handleInputChange("phone")}
              />
            </div>
            <div className="input-field">
              <TextField
                id="address"
                label={
                  <div className="input-field-label">
                    <HomeOutlinedIcon color="primary" />
                    <span>{shopFormLabelFour}</span>
                  </div>
                }
                color="primary"
                size="small"
                value={shopData.address}
                onChange={handleInputChange("address")}
              />
            </div>
          </Box>
        </Grid>
        {/* ---------Form End  --------------------------------------------------------*/}
        {/* ---------Button Start  --------------------------------------------------------*/}
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => setStep("2")}
            onClick={handleOnclick}
          >
            {stepOneBtn}
          </Button>
        </Grid>
        {/* ---------Button End  --------------------------------------------------------*/}
      </Box>
    </>
  );
}
