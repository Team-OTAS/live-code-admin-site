import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import StepContextProvider from "./StepContext";
import LoginPage from "./Pages/LoginPage";
import ChgAccInfoPage from "./Pages/ChgAccInfoPage";
import FBloginPage from "./Pages/FbloginPage";
import SetupShopStepperPage from "./Pages/SetupShopStepperPage";
import CompleteSetupPage from "./Pages/CompleteSetupPage";
import HomePage from "./Pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en-gb";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4d3f3f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
    },
    info: {
      main: "#73ff1d",
    },
    plan: {
      main: "#354e8e",
      contrastText: "#fff",
    },
    vaild: {
      main: "#354e8e",
      contrastText: "#fff",
    },
    danger: {
      main: "#E81609",
      contrastText: "f#fff",
    },
  },
});

const App = () => {
  return (
    //  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <StepContextProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/changeaccinfo" element={<ChgAccInfoPage />} />
            <Route path="/fblogin" element={<FBloginPage />} />
            <Route path="/setup" element={<SetupShopStepperPage />} />
            <Route path="/completesetuppage" element={<CompleteSetupPage />} />
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </StepContextProvider>
      </LocalizationProvider>
    </ThemeProvider>
    //  </BrowserRouter>
  );
};

export default App;
