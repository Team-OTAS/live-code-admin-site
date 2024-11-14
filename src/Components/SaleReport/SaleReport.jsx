import React, { useEffect, useState } from "react";
import SummarizeIcon from "@mui/icons-material/Summarize";
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
import Loading from "./../../Components/Loading";
import { useTranslation } from "react-i18next";

export default function SalesChart() {
  const { t } = useTranslation();
  const noReport = t("noReport");
  const reportTile = t("reportTitle");
  // const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("top");

  const getCharts = async (data) => {
    setActiveTab(data);
    const res = await getReport(data);
    setLoading(false);
    // console.log(res);
    setData(res);
  };

  useEffect(() => {
    getCharts("top");
  }, []);

  if (loading)
    return (
      <div className="dashboardContent">
        <Loading />
      </div>
    );

  // if (data.length === 0) {
  //   return (
  //     <div className="dashboardContent">
  //       <div className="noData">
  //         <h1>No Report Data Available</h1>
  //       </div>
  //     </div>
  //   );
  // }

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
        <p>{reportTile}</p>
      </Box>
      {data.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            marginTop: "100px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <SummarizeIcon style={{ fontSize: "80px" }} />
            <p>{noReport}</p>
          </div>
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
}
