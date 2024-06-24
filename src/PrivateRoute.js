import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("authToken");
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
