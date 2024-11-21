import { CardContent } from "@mui/material";
// import { overflow } from "html2canvas  /dist/types/css/property-descriptors/overflow";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SaleChart({ data, activeTab }) {
  return (
    <div>
      <CardContent>
        <p style={{ color: "black", fontWeight: "bold" }}>
          {activeTab} Sale Product
        </p>
        <ResponsiveContainer
          width="100%"
          style={{
            padding: "10px",
            // overflow: "scroll",
          }}
          height={350}
        >
          <BarChart layout="vertical" data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="Name" type="category" width={300} />
            <Tooltip />
            <Bar dataKey="Total Price" fill="#354e8e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </div>
  );
}

export default SaleChart;
