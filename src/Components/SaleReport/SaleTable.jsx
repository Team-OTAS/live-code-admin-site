import React from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import "./../../Styles/dashboard.css";

function CustomToolbar() {
  return (
    <GridToolbarContainer className="toolbarContainer">
      {/* <GridToolbarFilterButton /> */}
      <GridToolbarColumnsButton />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: "ID",
    headerName: "No",
    width: 50,
  },
  { field: "Name", headerName: "Name", width: 400 },
  {
    field: "Sale Unit",
    headerName: "Sale Unit",
    width: 150,
    renderCell: (params) => {
      return (params.value = params.value.replace(" Kyat", ""));
    },
  },
  { field: "Price", headerName: "Price", width: 200 },
  {
    field: "Total Price",
    headerName: "Total",
    width: 150,
    renderCell: (params) => (
      <Button
        sx={{
          background: "#354e8f",
          width: "200px",
          color: "white",
          fontWeight: "bold",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "12px",
          "&:hover": {
            border: "1px solid #354e8f",
            backgroundColor: "#fff",
            color: "#354e8f",
          },
        }}
        variant="filled"
      >
        {params.value} MMK
      </Button>
    ),
  },
];

const DataTable = ({ data }) => {
  // console.log(data);

  return (
    <Box sx={{ height: { xs: 600, md: 400 } }}>
      <DataGrid
        rows={data.map((item, index) => ({ id: index, ...item })) || []}
        columns={columns}
        pageSize={12}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: CustomToolbar,
          loadingOverlay: LinearProgress,
        }}
      />
    </Box>
  );
};

export default DataTable;
