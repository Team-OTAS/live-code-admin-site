import { Button, Grid } from "@mui/material";
import React from "react";
import SalePieChart from "../Components/saleReprot/SalePieChart";
import SaleList from "../Components/saleReprot/SaleList";

function SaleReport() {
  return (
    <div className="dashboardContent">
      <div>
        <Button variant="outlined" color="primary" sx={{ marginRight: "10px" }}>
          Best Sale
        </Button>

        <Button variant="outlined" color="primary" sx={{ marginRight: "10px" }}>
          Worst Sale
        </Button>

        <Button variant="outlined" color="primary">
          Top Spanner
        </Button>
      </div>

      <div>
        <div>
          <h2>Sale Analytics Chart</h2>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <SalePieChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <SaleList />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SaleReport;
