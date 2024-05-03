import { Box, Grid } from "@mui/material";
import React from "react";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import OrderDetailTable from "./OrderDetailTable";

function OrderDetail() {
  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: "10px 15px", md: "10px 40px" },
        background: "white",
        borderRadius: "25px",
        marginLeft: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="page-header">Order Detail</p>
      </div>
      <Box>
        <div>
          <Grid container spacing={2} sx={{ marginTop: "20px" }}>
            <Grid item xs={12} md={4}>
              <div className="detail-box">
                <div>
                  <AccountCircleRoundedIcon className="detail-input-icon" />
                </div>
                <div className="detail-box-content">
                  <p>Name</p>
                  <span>Mi Mi San</span>
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
                  <HomeRoundedIcon className="detail-input-icon" />
                </div>
                <div className="detail-box-content">
                  <p>Address</p>
                  <span>fdnfnnf fufhff hfh hihf oifhiho</span>
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
                  <LocalPhoneRoundedIcon className="detail-input-icon" />
                </div>
                <div className="detail-box-content">
                  <p>Phone Number</p>
                  <span>09 111 1515 5151</span>
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: { xs: "0", md: "50px" } }}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ margin: { xs: "10px 0", md: "0" } }}
            >
              <div className="detail-box">
                <div>
                  <CalendarMonthRoundedIcon className="detail-input-icon" />
                </div>
                <div className="detail-box-content">
                  <p>Date</p>
                  <span>12.5.2021</span>
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
                  <ShoppingCartOutlinedIcon className="detail-input-icon" />
                </div>
                <div className="detail-box-content">
                  <p>Item Quantity</p>
                  <span>3 items</span>
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
                  <AttachMoneyRoundedIcon className="detail-input-icon" />
                </div>
                <div className="detail-box-content">
                  <p>Amount</p>
                  <span>24000 mmk</span>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{ marginTop: "20px" }}>
          <OrderDetailTable />
        </div>
      </Box>
    </Box>
  );
}

export default OrderDetail;
