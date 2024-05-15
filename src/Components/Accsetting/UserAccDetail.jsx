import React, { useEffect, useRef, useState } from "react";
import { Box, Grid } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PasswordIcon from "@mui/icons-material/Password";
import axios from "./../../api/axios";
import { getShopData } from "../../redux/features/shopDataSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import "./../../Styles/detailbox.css";

function UserAccDetail() {
  const id = localStorage.getItem("id");
  const { loading, error, shopData } = useSelector((state) => state.ShopData);
  const [user_name, setuser_name] = useState(null);
  const [password, setPassword] = useState("");
  const updateHandler = async () => {
    try {
      const response = await axios.patch(`/api/update-profile/${id}`, {
        user_name: user_name === null ? shopData.data.name : user_name,
        password,
        password_confirmation: password,
      });
      console.log(response);
      Swal.fire("Success", "Updated Successfully", "success");
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  return (
    <Box
      sx={{
        marginTop: { xs: "20px", md: "50px" },
        marginLeft: "30px",
        padding: "50px",
        width: "100%",
        background: "#fff",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "25px",
          }}
        >
          <span className="page-header">User Profile Info</span>
        </div>
      </div>
      <Grid container spacing={2} sx={{ paddingRight: "25px" }}>
        <Grid item xs={12} md={6} sx={{ margin: { xs: "10px 0", md: "0" } }}>
          <div className="create-input">
            <PermIdentityIcon className="create-input-icon" />
            <div>
              <label>Name</label>
              <br />
              {shopData && (
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={user_name === null ? shopData.data.name : user_name}
                  onChange={(e) => setuser_name(e.target.value)}
                />
              )}
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6} sx={{ margin: { xs: "10px 0", md: "0" } }}>
          <div className="create-input">
            <PasswordIcon className="create-input-icon" />
            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
            </div>
          </div>
        </Grid>
      </Grid>

      <div className="btn-container" style={{ marginTop: "50px" }}>
        <button className="discard">Discard</button>
        <button className="save" onClick={updateHandler}>
          Save Edit
        </button>
      </div>
    </Box>
  );
}

export default UserAccDetail;
