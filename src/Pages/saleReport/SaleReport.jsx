import React, { useEffect, useState } from "react";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { ChartBarDecreasing, Grid3x3 } from "lucide-react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Box, Tooltip } from "@mui/material";
import getReport from "./../../Components/SaleReport/getReport";
import SaleTable from "./../../Components/SaleReport/SaleTable";
import "./../../Styles/dashboard.css";
import Loading from "./../../Components/Loading";
import { useTranslation } from "react-i18next";
import "./../../Styles/salereport.css";
import SaleChart from "../../Components/SaleReport/SaleChart";

export default function SalesChart() {
  const { t } = useTranslation();
  const noReport = t("noReport");
  const reportTile = t("reportTitle");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("top");
  const [layout, setLayout] = useState("chart");
  // console.log(data);

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

  return (
    <div className="dashboardContent">
      <Box className="dashboardContent__header" sx={{ marginTop: "10px" }}>
        <Box
          sx={{
            display: {
              xs: "block",
              md: "flex",
            },
            justifyContent: "space-between",
            textAlign: {
              xs: "right",
              md: "flex-start",
            },
          }}
        >
          <p
            style={{
              textAlign: "left",
            }}
          >
            {reportTile}
          </p>
          <ButtonGroup>
            <Tooltip title="Chart View">
              <Button
                sx={{
                  "&:hover": {
                    color: "#4d3f3f",
                  },
                }}
                className={
                  layout === "chart" ? "layoutbtn active" : "layoutbtn"
                }
                onClick={() => setLayout("chart")}
              >
                <ChartBarDecreasing />
              </Button>
            </Tooltip>
            <Tooltip title="Table View">
              <Button
                sx={{
                  "&:hover": {
                    color: "#4d3f3f",
                  },
                }}
                className={
                  layout === "table" ? "layoutbtn active" : "layoutbtn"
                }
                onClick={() => setLayout("table")}
              >
                <Grid3x3 />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>

        <Box
          sx={{ marginTop: "30px", borderBottom: 1, borderColor: "divider" }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "start",
              gap: "10px",
            }}
          >
            <button
              className={
                activeTab === "top" ? "settingbtn active" : "settingbtn"
              }
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
            <SummarizeIcon style={{ fontSize: "80px", color: "#4d3f3f" }} />
            <p>{noReport}</p>
          </div>
        </div>
      ) : (
        <div>
          {layout === "chart" && (
            <SaleChart data={data} activeTab={activeTab} />
          )}

          {layout === "table" && (
            <div>
              <SaleTable data={data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
