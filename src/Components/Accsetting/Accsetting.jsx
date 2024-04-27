import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
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
    <Box
      sx={{
        width: "100%",
        marginRight: "30px",
        // background: "black",
        overflow: "hidden",
      }}
    >
      <Box className="settingBtnContainer">
        <div style={{ display: "flex", width: "100%", justifyContent: "end" }}>
          <button
            className={page === 1 ? "settingbtn active" : "settingbtn"}
            onClick={() => channgePage(1)}
          >
            <span className="settingText">AutoReply Message</span>
          </button>
          <button
            className={page === 2 ? "settingbtn active" : "settingbtn"}
            onClick={() => channgePage(2)}
          >
            <span className="settingText">Shop Receipt</span>
          </button>
          <button
            className={page === 3 ? "settingbtn active" : "settingbtn"}
            onClick={() => channgePage(3)}
          >
            <span className="settingText">User Acc Management</span>
          </button>
        </div>
      </Box>

      <Box
        sx={{
          marginLeft: "20px",
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        {page === 1 && <AutoReply />}
        {page === 2 && <ShopReciept />}
        {page === 3 && <UserManagement />}
      </Box>
    </Box>
  );
}

export default Accsetting;
