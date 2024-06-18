import React, { useEffect } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../redux/features/productReducer";
import LinearProgress from "@mui/material/LinearProgress";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AlertBox from "../modalBox/AlertBox";

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
    field: "no",
    headerName: "No",
    width: 100,
  },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "description", width: 300 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "unit", headerName: "Unit", width: 100 },
  { field: "quantity", headerName: "Quantity", width: 100 },
];

const LiveDataTable = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.stocks
  );

  useEffect(() => {
    setInterval(() => {
      dispatch(getProducts());
    }, 10000);
    console.log("working");
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
      {!isLoading && isError ? <AlertBox message={message} /> : null}
    </Box>
  );
};

export default LiveDataTable;
