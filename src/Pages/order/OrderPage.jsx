import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OrderTable from "../../Components/order/OrderTable";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import dayjs from "dayjs";
import "./../../Styles/order.css";

function OrderPage() {
  const statusArray = [
    {
      value: "All",
      label: "All Orders",
      color: "#000",
    },
    {
      value: "pending",
      label: "Pending Orders",
      color: "#F15200",
    },
    {
      value: "paid",
      label: "Paid Orders",
      color: "#6EC531",
    },
    {
      value: "cancel",
      label: "Cancel Orders",
      color: "#E81609",
    },
  ];
  const [status, setStatus] = useState("All");
  const [date, setDate] = useState(new Date());

  const FilterIcon = () => {
    return (
      <FilterListRoundedIcon
        sx={{
          background: statusArray.find((item) => item.value === status).color,
          borderRadius: "50%",
          color: "white",
          padding: "5px",
          marginRight: "10px",
        }}
      />
    );
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  console.log(status);

  return (
    <Box
      sx={{
        paddingLeft: { xs: 0, md: "20px" },
        overflowX: "hidden",
        width: "90vw",
        margin: "auto",
      }}
    >
      <Grid
        container
        spacing={2}
        className="filterContainer"
        sx={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} md={3}>
          <DatePicker
            fullWidth
            defaultValue={dayjs(date)}
            onChange={(newValue) => setDate(newValue)}
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <Select
              value={status}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              IconComponent={FilterIcon}
            >
              {statusArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <span className="filterButton">{option.label}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3}>
          <button className="order-btn">
            <p>Change Status</p>
            <ChangeCircleIcon />
          </button>
        </Grid>
      </Grid>

      <OrderTable status={status} date={date} />
    </Box>
  );
}

export default OrderPage;
