import React, { useEffect, useRef, useState } from "react";
import "./../../Styles/detailbox.css";
import { Box, Grid } from "@mui/material";
import axios from "./../../api/axios";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import Swal from "sweetalert2";
import PanoramaFishEyeOutlinedIcon from "@mui/icons-material/PanoramaFishEyeOutlined";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

function ShopDetails() {
  const id = localStorage.getItem("shopId");
  const [shop, setShop] = useState();
  const [packageid, setPackage] = useState(1);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const getshop = async () => {
    try {
      const res = await axios.get("/api/shops/" + id);
      console.log("response", res.data.data);
      setShop(res.data.data);
      setName(res.data.data.name);
      setPhone(res.data.data.phone);
      setAddress(res.data.data.address);
      setPackage(res.data.data.subscription_plan.id);
    } catch (error) {
      if (error instanceof SyntaxError) {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  const getexpire = (times) => {
    const date = new Date(times);
    const expireTime = date.getTime() - Date.now();
    const expireDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}(${Math.trunc(
      expireTime / 1000 / 60 / 60 / 24
    )} Days Lefts)`;
    return expireDate;
  };

  useEffect(() => {
    getshop();
  }, []);

  return (
    <Box
      className="containers"
      sx={{ padding: { xs: "10px 15px", md: "10px 40px" } }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="page-header">User Shop Info</p>

        <button
          className="btn-update"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          <span>Edit Profile</span>
          <EditRoundedIcon className="update-icon" />
        </button>
      </div>

      {/* Shop Info */}
      {shop && (
        <div>
          <Grid container spacing={2} sx={{ marginTop: "20px" }}>
            <Grid item xs={12} md={4}>
              <div className="detail-box">
                <div className="detail-logo">
                  <img
                    src={`https://api.livecodemm.com${shop.logo}`}
                    alt="shoplogo"
                  />
                </div>
                <div className="detail-box-content">
                  <p>Name</p>
                  <span>{name}</span>
                </div>
              </div>
            </Grid>

            {edit && (
              <Grid
                item
                xs={12}
                md={4}
                sx={{ margin: { xs: "10px 0", md: "0" } }}
              >
                <div className="create-input">
                  <HomeRoundedIcon className="create-input-icon" />
                  <div>
                    <label>Name</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Address"
                      value={name}
                      // ref={phoneref}
                      // required
                    />
                  </div>
                </div>
              </Grid>
            )}

            {!edit && (
              <Grid
                item
                xs={12}
                md={4}
                sx={{ margin: { xs: "10px 0", md: "0" } }}
              >
                <div className="detail-box">
                  <div>
                    <HomeRoundedIcon className="detail-input-icon" />
                  </div>
                  <div className="detail-box-content">
                    <p>Address</p>
                    <span>{shop.address}</span>
                  </div>
                </div>
              </Grid>
            )}

            {edit && (
              <Grid
                item
                xs={12}
                md={4}
                sx={{ margin: { xs: "10px 0", md: "0" } }}
              >
                <div className="create-input">
                  <HomeRoundedIcon className="create-input-icon" />
                  <div>
                    <label>Phone Number</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Address"
                      value={address}
                      // ref={phoneref}
                      // required
                    />
                  </div>
                </div>
              </Grid>
            )}

            {!edit && (
              <Grid
                item
                xs={12}
                md={4}
                sx={{ margin: { xs: "10px 0", md: "0" } }}
              >
                <div className="detail-box">
                  <div>
                    <LocalPhoneRoundedIcon className="detail-input-icon" />
                  </div>
                  <div className="detail-box-content">
                    <p>Phone Number</p>
                    <span>{shop.phone}</span>
                  </div>
                </div>
              </Grid>
            )}

            {edit && (
              <Grid
                item
                xs={12}
                md={4}
                sx={{ margin: { xs: "10px 0", md: "0" } }}
              >
                <div className="create-input">
                  <LocalPhoneRoundedIcon className="create-input-icon" />
                  <div>
                    <label>Phone Number</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Ph Number"
                      value={phone}
                      // ref={phoneref}
                      required
                    />
                  </div>
                </div>
              </Grid>
            )}
          </Grid>

          <Grid container sx={{ marginTop: { xs: "0", md: "50px" } }}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ margin: { xs: "20px 0", md: "0" } }}
            >
              <div className="detail-box">
                <div>
                  <CalendarMonthRoundedIcon className="detail-input-icon cleander" />
                </div>
                <div className="detail-box-content">
                  <p>Package Expires In </p>
                  <span>{getexpire(shop.expire_at)}</span>
                </div>
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{ margin: { xs: "10px 0", md: "0" } }}
            >
              <div className="detail-box">
                <div>
                  <CardMembershipIcon className="detail-input-icon" />
                </div>
                <div className="detail-box-content">
                  <p>Package Type</p>
                  <span>{shop.subscription_plan.name}</span>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      )}

      {/* Button */}
      {edit && (
        <div className="btn-container">
          <button className="discard">Discard</button>
          <button className="save" o>
            Save Edit
          </button>
        </div>
      )}
    </Box>
  );
}

export default ShopDetails;