import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import axios from "./../../api/axios";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import Swal from "sweetalert2";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useTranslation } from "react-i18next";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate } from "react-router-dom";

import "./../../Styles/detailbox.css";

function ShopDetails() {
  const { t } = useTranslation();
  const title = t("shopinfo");
  const labelOne = t("shopFormLabelOne");
  const labelThree = t("shopFormLabelThree");
  const labelFour = t("shopFormLabelFour");
  const labelFive = t("package");
  const editTitle = t("editshopinfo");
  const editBtn = t("editbtn");
  const cancelbtn = t("cancelbtn");
  const id = localStorage.getItem("shopId");
  const [shop, setShop] = useState();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [edit, setEdit] = useState(false);

  const getshop = async () => {
    try {
      const res = await axios.get("/api/shops/" + id);
      // console.log("response", res.data.data.channels[5].access_token);
      setShop(res.data.data);
      setName(res.data.data.name);
      setPhone(res.data.data.phone);
      setAddress(res.data.data.address);
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

  const updateShop = async () => {
    const data = {
      logo: "null",
      name,
      address,
      phone,
    };
    try {
      await axios.post(`api/shops/${id}/shop-setting?_method=PATCH`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Updated",
      });
      getshop();
      setEdit(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
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
      sx={{ padding: { xs: "10px 15px", md: "10px 40px", minHeight: "100vh" } }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="page-header">{title}</p>

        <button
          className="btn-update"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          <span>{editTitle}</span>
          <EditRoundedIcon className="update-icon" />
        </button>
      </Box>

      {/* Shop Info */}
      {shop && (
        <div>
          <Grid container spacing={2} sx={{ marginTop: "20px" }}>
            {!edit && (
              <Grid item xs={12} md={4}>
                <div className="detail-box">
                  <div>
                    <AccountCircleRoundedIcon className="detail-input-icon" />
                  </div>
                  <div className="detail-box-content">
                    <p>{labelOne}</p>
                    <span>{shop.name}</span>
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
                    <label>{labelOne}</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                    <p>{labelFour}</p>
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
                    <label>{labelFour}</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                    <p>{labelThree}</p>
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
                    <label>{labelThree}</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Ph Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                  <p>{labelFive}</p>
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
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  border: "1px solid #000000",
                  padding: "5px",
                  cursor: "pointer",
                  fontSize: "10px",
                  ":hover": {
                    background: "#4d3f3f",
                    color: "#ffffff",
                  },
                }}
                onClick={() => {
                  navigate("/fblogin");
                }}
                disabled={shop.channels.length > 0 ? true : false}
              >
                <FacebookIcon sx={{ paddingRight: "5px" }} />
                {shop.channels.length > 0
                  ? shop.channels[0].name
                  : "Connect Facebook"}
              </Button>
            </Grid>
          </Grid>
        </div>
      )}

      {!shop && (
        <div className="no-data">
          <h3>Loading...</h3>
        </div>
      )}

      {/* Button */}
      {edit && (
        <div className="btn-container">
          <button className="discard" onClick={() => setEdit(false)}>
            {cancelbtn}
          </button>
          <button className="save" onClick={updateShop}>
            {editBtn}
          </button>
        </div>
      )}
    </Box>
  );
}

export default ShopDetails;
