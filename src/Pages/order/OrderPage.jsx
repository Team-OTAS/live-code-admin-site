import { Box, Button } from "@mui/material";
import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import "./../../Styles/order.css";
import OrderTable from "../../Components/order/OrderTable";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

function OrderPage() {
  return (
    <Box
      sx={{
        paddingLeft: "10px",
        overflowX: "hidden",
        width: "100vw",
      }}
    >
      <Box className="filterContainer" sx={{ marginBottom: "20px" }}>
        <button className="order-btn">
          31 / 1 / 2022
          <CalendarMonthIcon
            sx={{
              background: "#354e8e",
              borderRadius: "50%",
              color: "white",
              padding: "5px",
              marginLeft: "20px",
            }}
          />
        </button>
        <button className="order-btn" style={{ margin: "0 20px" }}>
          Pending Order
          <ArrowDropDownCircleIcon
            sx={{
              background: "#354e8e",
              borderRadius: "50%",
              color: "white",
              padding: "5px",
              marginLeft: "20px",
            }}
          />
        </button>
        <button className="order-btn">
          Change Status
          <ChangeCircleIcon
            sx={{
              background: "#354e8e",
              borderRadius: "50%",
              color: "white",
              padding: "5px",
              marginLeft: "20px",
            }}
          />
        </button>

        {/* <Button
          size="large"
          // color="primary"
          variant="contained"
          className="filterButton"
        >
          All Orders
        </Button>

        <Button
          size="large"
          // color="primary"
          variant="contained"
          className="filterButton"
        >
          Pending Orders
        </Button>

        <Button
          size="large"
          // color="primary"
          variant="contained"
          className="filterButton"
        >
          Confirm Orders
        </Button>

        <Button
          size="large"
          // color="primary"
          variant="contained"
          className="filterButton"
        >
          Cancel Orders
        </Button> */}
      </Box>

      <OrderTable />
    </Box>
  );
}

export default OrderPage;
