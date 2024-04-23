import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import axios from "./../../api/axios";

function ShopReciept() {
  const [shop, setShop] = useState(null);
  const id = localStorage.getItem("shopId");
  // console.log(id);

  async function getShop() {
    try {
      const res = await axios.get(`/api/shops/${id}`);
      console.log(res.data.data.receipt_footer);
      setShop(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getShop();
  }, []);

  return (
    <>
      {shop && (
        <Box>
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
              <p className="page-header">Shop Receipt</p>
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Box className="shopLogo">
                <p className="title-logo">Shop Logo</p>
                <div>
                  <div className="logo-name">
                    <p style={{ color: "white" }}>Backplates Nonntal 02 0138</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="logo-img">
                      <img
                        src={`https://api.livecodemm.com${shop.logo}`}
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Box className="shopLogo">
                <div style={{ padding: "10px 0" }}>
                  <label className="title-logo">
                    <ReceiptLongOutlinedIcon /> Receipt Header
                  </label>
                  <br />
                  <textarea
                    type="text"
                    className="receipt-body"
                    rows={6}
                    value={shop.receipt_header}
                    readOnly={true}
                  ></textarea>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="shopLogo">
                <div style={{ padding: "10px 0" }}>
                  <label className="title-logo">
                    <ReceiptLongOutlinedIcon /> Receipt Footer
                  </label>
                  <br />
                  <textarea
                    type="text"
                    className="receipt-body"
                    rows={6}
                    value={shop.receipt_footer}
                    readOnly={true}
                  ></textarea>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default ShopReciept;
