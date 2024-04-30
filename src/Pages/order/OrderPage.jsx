import { Box, Button } from "@mui/material";
import React from "react";

import "./../../Styles/order.css";
import OrderTable from "../../Components/order/OrderTable";

function OrderPage() {
  return (
    <Box sx={{ paddingLeft: "10px", overflowX: "hidden" }}>
      <Box className="filterContainer">
        <Button
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
        </Button>
      </Box>
      <OrderTable />
    </Box>
  );
}

export default OrderPage;
