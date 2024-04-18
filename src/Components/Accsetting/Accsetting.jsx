import { Box } from "@mui/material";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import UserManagement from "./UserManagement";
import ShopReciept from "./ShopReciept";
import AutoReply from "./AutoReply";

import "./accsetting.css";

function Accsetting() {
  const [page, setPage] = React.useState(3);

  function channgePage(id) {
    setPage(id);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <div className="settingBtnContainer">
        <NavLink
          className={({ isActive }) =>
            isActive ? "settingbtn active" : "settingbtn"
          }
          onClick={() => channgePage(1)}
        >
          <span className="settingText">AutoReply Message</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "settingbtn active" : "settingbtn"
          }
          onClick={() => channgePage(2)}
        >
          <span className="settingText">Shop Receipt</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "settingbtn active" : "settingbtn"
          }
          onClick={() => channgePage(3)}
        >
          <span className="settingText">User Acc Management</span>
        </NavLink>
      </div>

      <Box sx={{ paddingLeft: "20px" }}>
        {page === 1 && <AutoReply />}
        {page === 2 && <ShopReciept />}
        {page === 3 && <UserManagement />}
      </Box>
    </Box>
  );
}

export default Accsetting;
