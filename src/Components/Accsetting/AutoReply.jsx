import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import axios from "./../../api/axios";

function AutoReply() {
  const [shop, setShop] = useState(null);
  const id = localStorage.getItem("shopId");
  // console.log(shop);

  async function getShop() {
    try {
      const res = await axios.get(`/api/shops/${id}`);
      // console.log(res.data.data.auto_reply);
      setShop(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getShop();
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
          {shop && (
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
                    value={shop.auto_reply}
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
