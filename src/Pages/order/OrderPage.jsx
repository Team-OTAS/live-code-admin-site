import { Box, Button } from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OrderTable from "../../Components/order/OrderTable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";

import "./../../Styles/order.css";

function OrderPage() {
  const statusArray = [
    {
      value: "pending",
      label: "pending Orders",
    },
    {
      value: "half-paid",
      label: "Half Paid Orders",
    },
    {
      value: "full-paid",
      label: "Full Paid Orders",
    },
    {
      value: "cancel",
      label: "Cancel Orders",
    },
  ];
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  console.log(status);

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
          <p> 31 / 1 / 2022</p>
          <CalendarMonthIcon />
        </button>
        <FormControl
          sx={{
            minWidth: 120,
            margin: "0 20px",
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)",
          }}
        >
          <Select
            value={status}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {statusArray.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <button className="order-btn">
          <p>Change Status</p>
          <ChangeCircleIcon />
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

      <OrderTable status={status} />
    </Box>
  );
}

export default OrderPage;
