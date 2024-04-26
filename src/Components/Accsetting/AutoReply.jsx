import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { getShopData } from "./../../redux/features/shopDataSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "./../../api/axios";

function AutoReply() {
  const dispatch = useDispatch();
  const { loading, error, shopData } = useSelector((state) => state.ShopData);
  const id = localStorage.getItem("shopId");
  // console.log(shop);

  useEffect(() => {
    dispatch(getShopData(id));
  }, []);

  return (
    <Box>
      <div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              // background: "red",
            }}
          >
            <p className="page-header">Auto Reply</p>
            <button className="edit-btn">
              Edit Shop Receipt{" "}
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
        </div>
        <Grid container spacing={2} sx={{ paddingRight: "25px" }}>
          {shopData && (
            <Grid item xs={12}>
              <Box className="shopLogo">
                <div style={{ padding: "10px 0" }}>
                  <label className="title-logo">
                    <SendOutlinedIcon /> Auto Reply Message
                  </label>
                  <br />
                  <textarea
                    type="text"
                    className="receipt-body"
                    rows={6}
                    value={shopData.data.auto_reply}
                    readOnly={true}
                  ></textarea>
                </div>
              </Box>
            </Grid>
          )}
        </Grid>
      </div>
    </Box>
  );
}

export default AutoReply;
