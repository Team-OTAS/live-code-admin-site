import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PasswordIcon from "@mui/icons-material/Password";
import axios from "./../../api/axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./../../Styles/detailbox.css";

function UserAccDetail() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [user_name, setuser_name] = useState(null);
  const [password, setPassword] = useState("");
  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/" + id);
      console.log(response.data.data.user_name);
      setuser_name(response.data.data.user_name);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async () => {
    try {
      await axios.patch(`/api/update-profile/${id}`, {
        user_name: user_name,
        password,
        password_confirmation: password,
      });

      Swal.fire("Success", "Updated Successfully", "success");
    } catch (error) {
      // console.log(error.response.data.message);
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box
      sx={{
        marginTop: { xs: "20px", md: "50px" },
        marginLeft: "10px",
        padding: "50px",
        width: "95%",
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
              {user_name && (
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={user_name === null ? "Pls Wait" : user_name}
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
        <button
          className="discard"
          onClick={() => {
            navigate("/setting");
          }}
        >
          Discard
        </button>
        <button className="save" onClick={updateHandler}>
          Save Edit
        </button>
      </div>
    </Box>
  );
}

export default UserAccDetail;
