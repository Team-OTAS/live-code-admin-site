import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import LiveDataTable from "../../Components/liveSale/LiveDataTable";
import FbLive from "../../Components/liveSale/FbLiveContainer";
import useEcho from "../../hook/echo";

function LiveSale() {
  const echo = useEcho();
  const shopId = localStorage.getItem("shopId");

  useEffect(() => {
    console.log("echo", echo);
    // echo.private(`shop.${shopId}.products`).listen("ProductUpdated", (e) => {
    //   console.log("product Update Event", e);
    // });

    if (echo) {
      echo.private(`shop.${shopId}.products`).listen("ProductUpdated", (e) => {
        console.log("product Update Event", e);
      });
    }
  }, [echo]);

  // useEffect(() => {
  //   const channel = echo.private(`shop.${shopId}products`);

  //   channel.listen("ProductUpdated", (e) => {
  //     console.log("Product Update Event:", e);
  //   });

  //   return () => {
  //     channel.stopListening("ProductUpdated");
  //   };
  // }, []);
  return (
    <div className="dashboardContent">
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <LiveDataTable />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <FbLive />
          </Grid> */}
        </Grid>
      </Box>
    </div>
  );
}

export default LiveSale;
