import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import LiveCodeLogo from "./../assets/images/logo.png";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/material";

import { MultiStepContext } from "../StepContext";
import StepOnePage from "./StepOnePage";
import StepTwoPage from "./StepTwoPage";
import StepThreePage from "./StepThreePage";
const steps = ["shop", "reply", "receipt"];

export default function SetupShopStepperPage() {
  const { currentStep } = useContext(MultiStepContext);

  const showStep = (step) => {
    // console.log(step);
    switch (step) {
      case 1:
        return <StepOnePage />;
      case 2:
        return <StepTwoPage />;
      case 3:
        return <StepThreePage />;
      default:
        return <StepOnePage />;
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ py: { xs: 3, sm: 0 } }}
      >
        {/* ---------Stepper Start -------------------------------------------------------- */}
        <Box sx={{ width: "35%", pt: 5 }}>
          <Stepper
            activeStep={currentStep}
            alternativeLabel
            orientation="horizontal"
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel> </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {/* ---------Stepper End -------------------------------------------------------- */}
        {/* ---------logo start -------------------------------------------------------- */}
        <Grid item xs={2}>
          <img src={LiveCodeLogo} alt="live_code_logo" className="logo" />
        </Grid>
        {/* ---------logo End -------------------------------------------------------- */}
        {showStep(currentStep)}
      </Grid>
    </>
  );
}
