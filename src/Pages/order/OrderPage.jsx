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
import { FolderInput } from "lucide-react";
import { Link } from "react-router-dom";
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

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const changeStatus = (ids) => {
    setOrder_Ids(ids);
  };

  // Change Status
  const handleOrder = (event) => {
    setChgorder(event.target.value);
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
              disabled={order_ids.length === 0}
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
            fullWidth
            disabled={order_ids.length === 0}
            style={{
              margin: "0",
              padding: "0",
            }}
          >
            <Link
              to="/pdf"
              state={{ ids: order_ids }}
              style={{
                color: "white",
                width: "inherit",
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#4d3f3f",
                borderRadius: "5px",
                height: "55px",

                // marginTop: "-5px",
              }}
            >
              <FolderInput size={20} style={{ marginRight: "10px" }} />
              <span>Export</span>
            </Link>
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
