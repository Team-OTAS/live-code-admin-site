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
  { field: "name", headerName: "Name", width: 200 },
  // { field: "description", headerName: "Description", width: 300 },

  { field: "quantity", headerName: "quantity", width: 150 },
  { field: "price", headerName: "Unit Price", width: 200 },
  // { field: "Amount", headerName: "Total Price", width: 150 },
  {
    headerName: "Amount",
    width: 200,
    renderCell: (params) => <p>{params.row.price * params.row.quantity}</p>,
  },
];

const OrderDetailTable = ({ items }) => {
  console.log(items);

  return (
    <>
      <Box sx={{ height: { xs: 300, md: 250 }, width: "100%" }}>
        <DataGrid
          rows={items.map((item, index) => ({ no: index + 1, ...item })) || []}
          columns={columns}
          // pageSize={14}
          checkboxSelection
          // loading={isLoading}
          disableRowSelectionOnClick
          onRowSelectionModelChange={(dataId) => {
            // sendData(dataId);
            // console.log("table", dataId);
          }}
        />
      </Box>
    </>
  );
};

export default OrderDetailTable;
