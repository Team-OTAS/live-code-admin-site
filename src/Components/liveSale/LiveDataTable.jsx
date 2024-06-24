import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import "./../../Styles/dashboard.css";
import axios from "axios";

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
    field: "no",
    headerName: "No",
    width: 100,
  },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "description", width: 300 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "unit", headerName: "Unit", width: 100 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
];

const LiveDataTable = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await axios.get("api/products?limit=1000");
    setProducts(res.data.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setInterval(() => {
      fetchProducts();
    }, 10000);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ height: { xs: 600, md: 500 } }}>
      <DataGrid
        rows={products.map((item, index) => ({ no: index + 1, ...item })) || []}
        columns={columns}
        pageSize={12}
        // checkboxSelection
        loading={isLoading}
        disableRowSelectionOnClick
        slots={{
          toolbar: CustomToolbar,
          loadingOverlay: LinearProgress,
        }}
      />
    </Box>
  );
};

export default LiveDataTable;
