import React, { useState } from "react";
import { Navigate } from "react-router-dom";
// import handleTokenExpiration from "./Components/tokenExpired";

function PrivateRoute({ children }) {
  // handleTokenExpiration();
  const token = localStorage.getItem("authToken");
  if (token) {
    // console.log("token", token);
    return children;
  } else {
    console.log("error");
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
