import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Box, Divider, IconButton, Tooltip } from "@mui/material";
import { getShopData } from "../redux/features/shopDataSlice";
import { useDispatch, useSelector } from "react-redux";
import "./../Styles/nav.css";
import { useNavigate } from "react-router-dom";

export default function AccMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const id = localStorage.getItem("shopId");
  const { loading, error, shopData } = useSelector((state) => state.ShopData);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/login");
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
    dispatch(getShopData(id));
    console.log(shopData);
  }, []);

  return (
    <div>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box sx={{ textAlign: "center", padding: "10px" }}>
          {shopData && (
            <div className="userName">
              <p style={{ marginBottom: "10px" }}>{shopData.data.name}</p>
              <span>{getexpire(shopData.data.expire_at)}</span>
            </div>
          )}
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
