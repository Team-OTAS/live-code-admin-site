import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OrderTable from "../../Components/order/OrderTable";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { updateStatusOrder } from "../../redux/features/orderApiSlice";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import vouncher from "./../../Components/vouncher/vouncher";
import "./../../Styles/order.css";

export const statusArray = [
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
    value: "cancelled",
    label: "Cancel Orders",
    color: "#E81609",
  },
];

function OrderPage() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("All");
  const [chgorder, setChgorder] = useState("");
  const [date, setDate] = useState(Cookies.get("date") || new Date());
  const [order_ids, setOrder_Ids] = useState([]);

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

  const changeStatus = (ids) => {
    setOrder_Ids(ids);
  };

  // Change Status
  const handleOrder = (event) => {
    setChgorder(event.target.value);
    const data = {
      order_ids: order_ids,
      status: event.target.value,
    };

    dispatch(updateStatusOrder(data));
  };

  return (
    <Box className="dashboardContent">
      <Grid
        container
        spacing={2}
        className="filterContainer"
        sx={{ marginBottom: "20px" }}
      >
        <Grid item xs={6} md={3}>
          <DatePicker
            fullWidth
            defaultValue={dayjs(date)}
            onChange={(newValue) => {
              setDate(newValue);
              Cookies.set("date", newValue);
            }}
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <Select
              value={status}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              IconComponent={FilterListRoundedIcon}
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
          <FormControl fullWidth>
            <Select
              value={chgorder}
              onChange={handleOrder}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              IconComponent={ChangeCircleIcon}
            >
              <MenuItem disabled value="">
                <span className="filterButton" style={{ opacity: "0.5" }}>
                  Change Status
                </span>
              </MenuItem>
              {statusArray
                .filter((item) => item.value !== "All")
                .map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <span className="filterButton">{option.label}</span>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3}>
          <Button
            variant="contained"
            sx={{ height: "50px" }}
            onClick={() => vouncher(order_ids)}
          >
            <span>Print Order</span>
          </Button>
        </Grid>
      </Grid>

      <OrderTable
        status={status}
        date={date}
        sendDataToOrderTable={changeStatus}
        chgorder={chgorder}
      />
    </Box>
  );
}

export default OrderPage;
