import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import "./../../Styles/dashboard.css";

const columns = [
  {
    field: "no",
    headerName: "No",
    width: 50,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => <p>{params.row.product.name}</p>,
  },
  { field: "quantity", headerName: "quantity", width: 150 },
  { field: "unit_price", headerName: "Unit Price", width: 200 },
  {
    headerName: "Amount",
    width: 200,
    renderCell: (params) => <p>{params.row.total_price}</p>,
  },
];

const OrderDetailTable = ({ items }) => {
  return (
    <>
      <Box sx={{ height: { xs: 300, md: 250 }, width: "100%" }}>
        <DataGrid
          rows={items.map((item, index) => ({ no: index + 1, ...item })) || []}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(dataId) => {}}
        />
      </Box>
    </>
  );
};

export default OrderDetailTable;
