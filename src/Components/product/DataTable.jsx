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
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";

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
  { field: "name", headerName: "Name", width: 300 },
  { field: "description", headerName: "Description", width: 150 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "unit", headerName: "Unit", width: 100 },
  { field: "quantity", headerName: "Quantity", width: 100 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <Link to={`/viewstock/${params.row.id}`}>
        <Button
          sx={{
            background: "#354e8f",
            color: "white",
            fontWeight: "bold",
            padding: "5px 10px",
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
          <PreviewOutlinedIcon sx={{ marginRight: "5px" }} />
          View Detail
        </Button>
      </Link>
    ),
  },
];

const DataTable = ({ sendDataToDashboard }) => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.stocks);
  const deletes = useSelector((state) => state.deleteproduct);
  const sendData = (dataId) => {
    const Deletedata = dataId;
    sendDataToDashboard(Deletedata);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [deletes.deletes]);

  return (
    <Box sx={{ height: { xs: 600, md: 500 } }}>
      <DataGrid
        rows={products.map((item, index) => ({ no: index + 1, ...item })) || []}
        columns={columns}
        pageSize={12}
        checkboxSelection
        loading={isLoading}
        disableRowSelectionOnClick
        slots={{
          toolbar: CustomToolbar,
          loadingOverlay: LinearProgress,
        }}
        onRowSelectionModelChange={(dataId) => {
          sendData(dataId);
        }}
      />
    </Box>
  );
};

export default DataTable;
