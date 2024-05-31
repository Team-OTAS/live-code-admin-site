import { Box, Grid } from "@mui/material";
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import OrderDetailTable from "./OrderDetailTable";
import getTime from "./../getTime";

function OrderDetail() {
  const order = {
    id: 2,
    shop_id: "S-00000023",
    customer_id: 1,
    live_sale_id: 52,
    contact_name: "Vidal Hoppe PhD",
    contact_phone: null,
    delivery_address: null,
    price: "6132.00",
    status: "half-paid",
    created_at: "2024-05-28T12:35:47.000000Z",
    updated_at: "2024-05-28T12:35:47.000000Z",
    deleted_at: null,
  };

  // const [order, setOrder] = React.useState([]);

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
                  <span>{order.contact_name}</span>
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

                  {order.delivery_address ? (
                    order.delivery_address
                  ) : (
                    <span style={{ opacity: "0.5" }}>
                      There is no Address Yet!
                    </span>
                  )}
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
                  {order.delivery_address ? (
                    order.contact_phone
                  ) : (
                    <span style={{ opacity: "0.5" }}>No Phone Number Yet!</span>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ marginTop: { xs: "0", md: "50px" } }}
          >
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
                  <span>{getTime(order.created_at)}</span>
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
                  <span>{order.price}</span>
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
