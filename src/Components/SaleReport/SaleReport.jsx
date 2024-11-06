import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CardContent, Box } from "@mui/material";
import getReport from "./getReport";
import SaleTable from "./SaleTable";
import "./../../Styles/dashboard.css";
import "./../../Components/Accsetting/accsetting.css";
import Loading from "../Loading";

export default function SalesChart() {
  // const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [activeTab, setActiveTab] = useState("top");

  const getCharts = async (data) => {
    setActiveTab(data);
    const res = await getReport(data);
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    getCharts("top");
  }, []);

  if (data.length === 0)
    return (
      <div className="dashboardContent">
        <Loading />
      </div>
    );

  return (
    <div className="dashboardContent">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "start" }}
        >
          <button
            className={activeTab === "top" ? "settingbtn active" : "settingbtn"}
            onClick={() => getCharts("top")}
          >
            <span className="settingText">Top Sale Items</span>
          </button>
          <button
            className={
              activeTab === "worst" ? "settingbtn active" : "settingbtn"
            }
            onClick={() => getCharts("worst")}
          >
            <span className="settingText">Worst Sale Items</span>
          </button>
          {/* <button
            className={page === 3 ? "settingbtn active" : "settingbtn"}
            onClick={() =>  getCharts("spenders")}
          >
            <span className="settingText">User Acc Management</span>
          </button> */}
        </div>
      </Box>
      <Box
        className="dashboardContent__header"
        sx={{ display: { xs: "none", md: "block" }, marginTop: "10px" }}
      >
        <p>Product Sales Profit Analytics Chart</p>
      </Box>
      <CardContent>
        <p style={{ color: "black", fontWeight: "bold" }}>
          {activeTab} Sale Product
        </p>
        <ResponsiveContainer
          width="100%"
          style={{ background: "", padding: "10px" }}
          height={250}
        >
          <BarChart layout="vertical" data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="Name" type="category" />
            <Tooltip />
            <Bar dataKey="Total Price" fill="#354e8e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>

      <SaleTable data={data} />
    </div>
  );
}
