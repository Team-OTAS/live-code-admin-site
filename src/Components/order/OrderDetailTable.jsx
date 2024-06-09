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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AlertBox from "../modalBox/AlertBox";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

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
    width: 50,
  },
  { field: "name", headerName: "Customer", width: 150 },
  { field: "description", headerName: "Address", width: 300 },
  { field: "unit", headerName: "Amount", width: 150 },
  { field: "quantity", headerName: "Total Price", width: 150 },
  {
    field: "Status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => (
      <div>
        <Button
          sx={{
            background: " #354e8e",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            fontSize: "14px",
            marginRight: "20px",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#354e8e",
              border: "3px solid #354e8e",
            },
          }}
          variant="filled"
        >
          <EditRoundedIcon />
        </Button>

        <Button
          sx={{
            background: "#E81609",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#E81609",
              border: "3px solid #E81609",
            },
          }}
          variant="filled"
        >
          <DeleteRoundedIcon />
        </Button>
      </div>
    ),
  },
];

const OrderDetailTable = ({ sendDataToDashboard }) => {
  const dispatch = useDispatch();
  const { loading, orderDetail } = useSelector((state) => state.OrderData);

  console.log(orderDetail.data.order_products);

  return (
    <>
      {!loading && orderDetail.data.order_products.length > 0 && (
        <Box sx={{ height: { xs: 300, md: 350 }, width: "100%" }}>
          <DataGrid
            rows={
              orderDetail.data.order_products.map((item, index) => ({
                no: index + 1,
                ...item,
              })) || []
            }
            columns={columns}
            // pageSize={14}
            checkboxSelection
            loading={loading}
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </>
  );
};

export default OrderDetailTable;
