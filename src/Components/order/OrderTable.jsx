import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { getOrderData } from "../../redux/features/orderApiSlice";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

const statusArray = [
  {
    value: "pending",
    label: "Pending Orders",
    color: "#F15200",
  },
  {
    value: "paid",
    label: "Paid Orders",
    color: "#6EC531",
  },
  {
    value: "cancelled",
    label: "Cancel Orders",
    color: "#E81609",
  },
];

const columns = [
  {
    field: "no",
    headerName: "No",
    width: 50,
  },
  {
    field: "contact_name",
    headerName: "Customer",
    width: 150,
  },
  {
    field: "contact_phone",
    headerName: "Phone Number",
    width: 150,
    renderCell: (cellValues) => (
      <Box
        sx={{
          color: "#000",
          borderRadius: "3px",
          fontSize: "12px",
          paddingRight: "10px",
          width: "100%",
          textAlign: "left",
          overflow: "hidden",
          background: "#F2F3F7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {cellValues.value ? (
          cellValues.value
        ) : (
          <div style={{ opacity: "0.5" }}>No Ph number Yet!</div>
        )}
      </Box>
    ),
  },
  {
    field: "delivery_address",
    headerName: "Address",
    width: 200,
    renderCell: (cellValues) => (
      <Box
        sx={{
          color: "#000",
          borderRadius: "3px",
          fontSize: "12px",
          paddingRight: "10px",
          width: "100%",
          textAlign: "left",
          overflow: "hidden",
          background: "#F2F3F7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {cellValues.value ? (
          cellValues.value
        ) : (
          <div style={{ opacity: "0.5" }}>There is no Address Yet!</div>
        )}
      </Box>
    ),
  },
  // { field: "live_sale_id", headerName: "Amount", width: 200 },
  { field: "price", headerName: "Total Price", width: 100 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (cellValues) => (
      <Box
        sx={{
          color: "#000",
          borderRadius: "3px",
          fontSize: "12px",
          paddingRight: "10px",
          width: "100%",
          overflow: "hidden",
          background: "#F2F3F7",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          className="color-box"
          sx={{
            background: statusArray.find(
              (item) => item.value === cellValues.value
            ).color,
          }}
        >
          p
        </Box>
        <div style={{ marginLeft: "5px" }}>{cellValues.value}</div>
      </Box>
    ),
  },
  {
    field: "",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <Link to={`/vieworder/${params.row.id}`}>
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
          View Order
        </Button>
      </Link>
    ),
  },
];

const OrderTable = ({ status, date, sendDataToOrderTable, chgorder }) => {
  const { t } = useTranslation();
  const tablemsg = t("ordertable");
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { loading, orderData } = useSelector((state) => state.OrderData);
  // console.log(orderData);

  const sendData = (dataId) => {
    const order_ids = dataId;
    sendDataToOrderTable(order_ids);
  };

  const compareDates = (date1, date2) => {
    // Parse the dates
    const parsedDate1 = new Date(date1);
    const parsedDate2 = new Date(date2);

    // Normalize the dates (set the time to midnight to only compare the date parts)
    parsedDate1.setHours(0, 0, 0, 0);
    parsedDate2.setHours(0, 0, 0, 0);

    // Compare the dates
    return parsedDate1.getTime() === parsedDate2.getTime();
  };

  useEffect(() => {
    dispatch(getOrderData());
  }, [chgorder]);

  useEffect(() => {
    if (orderData) {
      setProducts(
        orderData.filter((item) => {
          if (status !== "All" && compareDates(item.created_at, date)) {
            return item.status === status;
          } else if (status === "All" && compareDates(item.created_at, date)) {
            return orderData;
          }
        })
      );
    }
  }, [status, orderData, date]);

  return (
    <Box sx={{ height: { xs: 600, md: 500 } }}>
      <DataGrid
        // rows={[]}
        rows={products.map((item, index) => ({ no: index + 1, ...item })) || []}
        columns={columns}
        pageSize={14}
        checkboxSelection
        loading={loading}
        disableRowSelectionOnClick
        slots={{
          toolbar: CustomToolbar,
          loadingOverlay: LinearProgress,
          noRowsOverlay: () => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: "20px",
                }}
              >
                <Typography variant="h6">{tablemsg}</Typography>
              </div>
            );
          },
        }}
        onRowSelectionModelChange={(dataId) => {
          // console.log(dataId);
          sendData(dataId);
        }}
      />
      {/* {!isLoading && isError ? <AlertBox message={message} /> : null} */}
    </Box>
  );
};

export default OrderTable;
