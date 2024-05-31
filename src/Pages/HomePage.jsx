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

import Vouncher from "./../Components/vouncher/Vouncher";
import OrderDetail from "../Components/order/OrderDetail";
import UserAccDetail from "../Components/Accsetting/UserAccDetail";
import { Create } from "@mui/icons-material";
import CreateProdcut from "./product/CreateProdcut";
// import { Route,Routes,BrowserRouter,RouterProvider } from 'react-router-dom'

function HomePage() {
  return (
    <div style={{ background: "#f2f3f7" }}>
      <Box>
        <Navbar />
      </Box>
      <div className="dashboardContainer">
        <Box component="div" sx={{ display: { xs: "none", md: "block" } }}>
          <DrawerSlide />
        </Box>
        <Routes>
          <Route path="*" element={<Dashboard />} />
          <Route path="/live" element={<LiveSale />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/setting" element={<Accsetting />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/vouncher" element={<Vouncher />} />
          <Route path="/vieworder/:id" element={<OrderDetail />} />
          <Route path="/accdetail/:id" element={<UserAccDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
