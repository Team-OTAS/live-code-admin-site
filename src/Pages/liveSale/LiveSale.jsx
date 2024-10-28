import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LiveDataTable from "../../Components/liveSale/LiveDataTable";
import useEcho from "../../hook/echo";
import LiveNotifincation from "./../../Components/liveSale/LiveNotifincation";

function LiveSale() {
  const [liveData, setLiveData] = useState([]);
  const echo = useEcho();
  const shopId = localStorage.getItem("shopId");

  useEffect(() => {
    // console.log("echo", echo);

    if (echo) {
      echo.private(`shop.${shopId}.products`).listen("ProductUpdated", (e) => {
        console.log("product Update Event", e);
        setLiveData(e);
      });

      // echo.private(`shop.${shopId}.order-success-message`).listen("OrderSuccessMessage", (e) => {
      //   console.log("order success message", e);
      //   setLiveData(e);
      // });
    }
  }, [echo]);

  return (
    <div className="dashboardContent">
      <Box>
        <Grid container>
          <Grid item xs={12} md={8}>
            <LiveDataTable liveData={liveData} />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <NotificationArea /> */}
            <LiveNotifincation liveData={liveData} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default LiveSale;
