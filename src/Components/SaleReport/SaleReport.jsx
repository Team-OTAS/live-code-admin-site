import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography, Tab, Tabs, Box } from "@mui/material";
import getReport from "./getReport";
import SaleTable from "./SaleTable";
import "./../../Styles/dashboard.css";

export default function SalesChart() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState([]);

  const getCharts = async () => {
    const res = await getReport();
    setData(res);
  };

  useEffect(() => {
    getCharts();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="dashboardContent">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="sales tabs">
          <Tab label="Best Sales" />
          <Tab label="Worst Sales" />
          <Tab label="Top Spenders" />
        </Tabs>
      </Box>
      <Box
        className="dashboardContent__header"
        sx={{ display: { xs: "none", md: "block" }, marginTop: "10px" }}
      >
        <p>Product Sales Profit Analytics Chart</p>
      </Box>
      <CardContent>
        <p style={{ color: "black", fontWeight: "bold" }}>Best Sale Product</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart layout="vertical" data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="Name" type="category" />
            <Tooltip />
            <Bar dataKey="Total Price" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>

      <SaleTable data={data} />
    </div>
  );
}
