import { Box, FormControl, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import OrderDetailTable from "./OrderDetailTable";
import {
  getOrderDetail,
  addDataOrder,
  updateStatusOrder,
} from "../../redux/features/orderApiSlice";
import getTime from "./../getTime";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { statusArray } from "../../Pages/order/OrderPage";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

function OrderDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, orderDetail } = useSelector((state) => state.OrderData);
  const [edit, setEdit] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [chgorder, setChgorder] = useState("");

  // console.log(orderDetail.data.order_products.length);

  // Change Status
  const handleOrder = (event) => {
    setChgorder(event.target.value);
    const data = {
      order_ids: [id],
      status: event.target.value,
    };

    dispatch(updateStatusOrder(data));
  };

  const addOrderUpdate = () => {
    const data = {
      contact_phone: phone,
      delivery_address: address,
    };
    dispatch(addDataOrder({ id, data }));
    setEdit(false);
  };

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, []);

  return (
    <Box
      sx={{
        width: { xs: "84vw", md: "70vw" },
        minHeight: "100vh",
        padding: { xs: "10px", md: "10px 40px" },
        background: { xs: "transparent", md: "#fff" },
        borderRadius: "25px",
      }}
    >
      {loading && <Loading />}
      {!loading && orderDetail && (
        <Box>
          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="page-header">Order Detail</p>

            {edit ? (
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="edit-btn"
                  style={{ height: "56px", borderColor: "red" }}
                  onClick={() => setEdit(false)}
                >
                  <span style={{ color: "red" }}>Cancel</span>
                </button>
                <button
                  className="edit-btn"
                  style={{ height: "56px" }}
                  onClick={addOrderUpdate}
                >
                  <span style={{ fontWeight: "bold" }}>Update</span>
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <Grid item xs={6} md={3}>
                  <FormControl fullWidth minHeight={50}>
                    <Select
                      value={chgorder ? chgorder : orderDetail.data.status}
                      onChange={handleOrder}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      IconComponent={ChangeCircleIcon}
                    >
                      {statusArray
                        .filter((item) => item.value !== "All")
                        .map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <span
                              className="filterButton"
                              style={{ color: option.color }}
                            >
                              {option.label}
                            </span>
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <button
                  className="edit-btn"
                  style={{ height: "56px" }}
                  onClick={() => {
                    setEdit(true);
                    setAddress(orderDetail.data.delivery_address);
                    setPhone(orderDetail.data.contact_phone);
                  }}
                >
                  Edit Order
                  <EditRoundedIcon
                    sx={{
                      background: "#4D3F3F",
                      borderRadius: "50%",
                      color: "white",
                      padding: "5px",
                      marginLeft: "20px",
                    }}
                  />
                </button>
              </div>
            )}
          </Box>
          <div>
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              <Grid item xs={12} md={4}>
                <div className="detail-box">
                  <div>
                    <AccountCircleRoundedIcon className="detail-input-icon" />
                  </div>
                  <div className="detail-box-content">
                    <p>Name</p>
                    <span>{orderDetail.data.contact_name}</span>
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
                  <HomeRoundedIcon className="detail-input-icon" />
                  <div className="detail-box-content">
                    <label>Address</label>
                    <br />
                    <input
                      type="text"
                      placeholder="There is no Address Yet!"
                      value={
                        address ? address : orderDetail.data.delivery_address
                      }
                      onChange={(e) => setAddress(e.target.value)}
                      readOnly={!edit}
                    />
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
                  <LocalPhoneRoundedIcon className="detail-input-icon" />
                  <div className="detail-box-content">
                    <label>Phone Number</label>
                    <br />
                    <input
                      type="text"
                      placeholder="No Phone Number Yet!"
                      value={phone ? phone : orderDetail.data.contact_phone}
                      onChange={(e) => setPhone(e.target.value)}
                      readOnly={!edit}
                    />
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
                    <CalendarMonthRoundedIcon className="detail-input-icon" />
                  </div>
                  <div className="detail-box-content">
                    <p>Date</p>
                    <span>{getTime(orderDetail.data.customer.created_at)}</span>
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
                    <ShoppingCartRoundedIcon className="detail-input-icon" />
                  </div>
                  <div className="detail-box-content">
                    <p>Items Quantity</p>
                    <span>{orderDetail.data.order_products.length} Items</span>
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
                    <span>{orderDetail.data.price}</span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          {/* Item Table */}
          {/* <div style={{ marginTop: "20px" }}>
            <OrderDetailTable />
          </div> */}
        </Box>
      )}
    </Box>
  );
}

export default OrderDetail;
