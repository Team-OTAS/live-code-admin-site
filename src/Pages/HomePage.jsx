import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Dashboard from "./product/Dashboard";
import { Route, Routes } from "react-router-dom";
import LiveSale from "./liveSale/LiveSale";
import DrawerSlide from "../Components/DrawerSlide";
import { Box } from "@mui/material";
import OrderPage from "./order/OrderPage";
import Accsetting from "../Components/Accsetting/Accsetting";
import AddUser from "../Components/Accsetting/AddUser";
import { useTranslation } from "react-i18next";
import Vouncher from "./../Components/vouncher/Vouncher";
// import { Route,Routes,BrowserRouter,RouterProvider } from 'react-router-dom'

function HomePage() {
  const { t } = useTranslation();
  const [navtitle, setNavtitle] = useState(t("navTitle"));

  // recieve from drawer
  function getTitle(title) {
    console.log("nav", title);
    setNavtitle(title);
  }

  useEffect(() => {
    setNavtitle(t("navTitle"));
  }, [t]);

  return (
    <div style={{ background: "#f2f3f7" }}>
      <Box>
        <Navbar title={navtitle} />
      </Box>
      <div className="dashboardContainer">
        <Box component="div" sx={{ display: { xs: "none", md: "block" } }}>
          <DrawerSlide Title={getTitle} />
        </Box>
        <Routes>
          <Route path="*" element={<Dashboard />} />
          <Route path="/live" element={<LiveSale />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/setting" element={<Accsetting />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/vouncher" element={<Vouncher />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
