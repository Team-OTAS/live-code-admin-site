import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/productReducer";
import LinearProgress from "@mui/material/LinearProgress";
import "./../../Styles/dashboard.css";
import { Link } from "react-router-dom";

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
    value: "cancel",
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
  { field: "live_sale_id", headerName: "Amount", width: 50 },
  { field: "price", headerName: "Total Price", width: 150 },
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
          textAlign: "left",
          overflow: "hidden",
          background: "#F2F3F7",
          display: "flex",
          justifyContent: "space-between",
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
        <div>{cellValues.value}</div>
      </Box>
    ),
  },
  {
    field: "",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => (
      <Link
        to={`/vieworder/${params.row.id}`}
        style={{
          background: "#354E8E",
          color: "#fff",
          padding: "5px 15px",
          fontSize: "12px",
          borderRadius: "5px",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#354E8E",
            fontWeight: "bold",
            border: "1px solid #354E8E",
          },
        }}
      >
        {/* <StorefrontIcon, sx={{ marginRight: "5px" }} /> */}
        View Order
      </Link>
    ),
  },
];

const OrderTable = ({ status, date }) => {
  const [products, setProducts] = useState([]);
  const orderApi = {
    code: 200,
    success: true,
    message: "Orders retrieved!",
    time: "2024-05-29T07:41:04.522392Z",
    data: [
      {
        id: 2,
        shop_id: "S-00000023",
        customer_id: 1,
        live_sale_id: 52,
        contact_name: "Vidal Hoppe PhD",
        contact_phone: null,
        delivery_address: null,
        price: "6132.00",
        status: "paid",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
      {
        id: 3,
        shop_id: "S-00000025",
        customer_id: 1,
        live_sale_id: 53,
        contact_name: "Jennyfer Tillman",
        contact_phone: null,
        delivery_address: null,
        price: "6199.00",
        status: "pending",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
      {
        id: 4,
        shop_id: "S-00000027",
        customer_id: 1,
        live_sale_id: 54,
        contact_name: "Rey Herman III",
        contact_phone: null,
        delivery_address: null,
        price: "3666.00",
        status: "pending",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
      {
        id: 5,
        shop_id: "S-00000029",
        customer_id: 1,
        live_sale_id: 55,
        contact_name: "Dr. Richmond Macejkovic IV",
        contact_phone: null,
        delivery_address: null,
        price: "1910.00",
        status: "pending",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
      {
        id: 6,
        shop_id: "S-00000031",
        customer_id: 2,
        live_sale_id: 56,
        contact_name: "Ruthie Schuster PhD",
        contact_phone: null,
        delivery_address: null,
        price: "6523.00",
        status: "pending",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
      {
        id: 7,
        shop_id: "S-00000033",
        customer_id: 2,
        live_sale_id: 57,
        contact_name: "Dr. Jovanny Daniel",
        contact_phone: null,
        delivery_address: null,
        price: "5200.00",
        status: "pending",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
      {
        id: 8,
        shop_id: "S-00000035",
        customer_id: 2,
        live_sale_id: 58,
        contact_name: "Brook Huel",
        contact_phone: null,
        delivery_address: null,
        price: "6098.00",
        status: "pending",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
      {
        id: 9,
        shop_id: "S-00000037",
        customer_id: 2,
        live_sale_id: 59,
        contact_name: "Miss Kacie Kris III",
        contact_phone: null,
        delivery_address: null,
        price: "4656.00",
        status: "pending",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
      {
        id: 10,
        shop_id: "S-00000039",
        customer_id: 2,
        live_sale_id: 60,
        contact_name: "Miss Lilliana Hahn",
        contact_phone: null,
        delivery_address: null,
        price: "760.00",
        status: "pending",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
      {
        id: 11,
        shop_id: "S-00000041",
        customer_id: 3,
        live_sale_id: 61,
        contact_name: "Milton Barrows",
        contact_phone: null,
        delivery_address: null,
        price: "4419.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 12,
        shop_id: "S-00000043",
        customer_id: 3,
        live_sale_id: 62,
        contact_name: "Adrianna Schroeder",
        contact_phone: null,
        delivery_address: null,
        price: "4616.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 13,
        shop_id: "S-00000045",
        customer_id: 3,
        live_sale_id: 63,
        contact_name: "Brown Lindgren III",
        contact_phone: null,
        delivery_address: null,
        price: "2590.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 14,
        shop_id: "S-00000047",
        customer_id: 3,
        live_sale_id: 64,
        contact_name: "Jayce Bauch",
        contact_phone: null,
        delivery_address: null,
        price: "3921.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 15,
        shop_id: "S-00000049",
        customer_id: 3,
        live_sale_id: 65,
        contact_name: "Rosie Strosin",
        contact_phone: null,
        delivery_address: null,
        price: "6196.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 16,
        shop_id: "S-00000051",
        customer_id: 4,
        live_sale_id: 66,
        contact_name: "Harley Windler",
        contact_phone: null,
        delivery_address: null,
        price: "1818.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 17,
        shop_id: "S-00000053",
        customer_id: 4,
        live_sale_id: 67,
        contact_name: "Marty Senger",
        contact_phone: null,
        delivery_address: null,
        price: "6987.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 18,
        shop_id: "S-00000055",
        customer_id: 4,
        live_sale_id: 68,
        contact_name: "Miss Reva Kling",
        contact_phone: null,
        delivery_address: null,
        price: "7610.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 19,
        shop_id: "S-00000057",
        customer_id: 4,
        live_sale_id: 69,
        contact_name: "Alysa Ratke",
        contact_phone: null,
        delivery_address: null,
        price: "3734.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 20,
        shop_id: "S-00000059",
        customer_id: 4,
        live_sale_id: 70,
        contact_name: "Alexie Ratke",
        contact_phone: null,
        delivery_address: null,
        price: "5867.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 21,
        shop_id: "S-00000061",
        customer_id: 5,
        live_sale_id: 71,
        contact_name: "Bettye Barrows",
        contact_phone: null,
        delivery_address: null,
        price: "4338.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 22,
        shop_id: "S-00000063",
        customer_id: 5,
        live_sale_id: 72,
        contact_name: "Prof. Stanley Oberbrunner",
        contact_phone: null,
        delivery_address: null,
        price: "1544.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 23,
        shop_id: "S-00000065",
        customer_id: 5,
        live_sale_id: 73,
        contact_name: "Matilde Reichel",
        contact_phone: null,
        delivery_address: null,
        price: "1773.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 24,
        shop_id: "S-00000067",
        customer_id: 5,
        live_sale_id: 74,
        contact_name: "Jaleel Glover",
        contact_phone: null,
        delivery_address: null,
        price: "2793.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 25,
        shop_id: "S-00000069",
        customer_id: 5,
        live_sale_id: 75,
        contact_name: "Eugene Schiller",
        contact_phone: null,
        delivery_address: null,
        price: "8631.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 26,
        shop_id: "S-00000071",
        customer_id: 6,
        live_sale_id: 76,
        contact_name: "Miss Tatyana Breitenberg IV",
        contact_phone: null,
        delivery_address: null,
        price: "1087.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 27,
        shop_id: "S-00000073",
        customer_id: 6,
        live_sale_id: 77,
        contact_name: "Oma VonRueden Sr.",
        contact_phone: null,
        delivery_address: null,
        price: "3400.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 28,
        shop_id: "S-00000075",
        customer_id: 6,
        live_sale_id: 78,
        contact_name: "Mr. Gregg Lindgren V",
        contact_phone: null,
        delivery_address: null,
        price: "4871.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 29,
        shop_id: "S-00000077",
        customer_id: 6,
        live_sale_id: 79,
        contact_name: "Brooke Towne Sr.",
        contact_phone: null,
        delivery_address: null,
        price: "7848.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 30,
        shop_id: "S-00000079",
        customer_id: 6,
        live_sale_id: 80,
        contact_name: "Dandre Wunsch",
        contact_phone: null,
        delivery_address: null,
        price: "103.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 31,
        shop_id: "S-00000081",
        customer_id: 7,
        live_sale_id: 81,
        contact_name: "Miss Jeanne Swift I",
        contact_phone: null,
        delivery_address: null,
        price: "6414.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 32,
        shop_id: "S-00000083",
        customer_id: 7,
        live_sale_id: 82,
        contact_name: "Beatrice Goodwin",
        contact_phone: null,
        delivery_address: null,
        price: "2205.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 33,
        shop_id: "S-00000085",
        customer_id: 7,
        live_sale_id: 83,
        contact_name: "Johnpaul Kub",
        contact_phone: null,
        delivery_address: null,
        price: "5510.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 34,
        shop_id: "S-00000087",
        customer_id: 7,
        live_sale_id: 84,
        contact_name: "Ms. Elenora Boyer Jr.",
        contact_phone: null,
        delivery_address: null,
        price: "1989.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 35,
        shop_id: "S-00000089",
        customer_id: 7,
        live_sale_id: 85,
        contact_name: "Mr. Lukas Altenwerth",
        contact_phone: null,
        delivery_address: null,
        price: "5237.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 36,
        shop_id: "S-00000091",
        customer_id: 8,
        live_sale_id: 86,
        contact_name: "Mrs. Ramona Lockman",
        contact_phone: null,
        delivery_address: null,
        price: "4154.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 37,
        shop_id: "S-00000093",
        customer_id: 8,
        live_sale_id: 87,
        contact_name: "Sallie Keebler",
        contact_phone: null,
        delivery_address: null,
        price: "7839.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 38,
        shop_id: "S-00000095",
        customer_id: 8,
        live_sale_id: 88,
        contact_name: "Effie Hansen",
        contact_phone: null,
        delivery_address: null,
        price: "9873.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 39,
        shop_id: "S-00000097",
        customer_id: 8,
        live_sale_id: 89,
        contact_name: "Sarah Renner",
        contact_phone: null,
        delivery_address: null,
        price: "2771.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 40,
        shop_id: "S-00000099",
        customer_id: 8,
        live_sale_id: 90,
        contact_name: "Prof. Kristian Bins DDS",
        contact_phone: null,
        delivery_address: null,
        price: "9248.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 41,
        shop_id: "S-00000101",
        customer_id: 9,
        live_sale_id: 91,
        contact_name: "Joaquin Wunsch I",
        contact_phone: null,
        delivery_address: null,
        price: "8417.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 42,
        shop_id: "S-00000103",
        customer_id: 9,
        live_sale_id: 92,
        contact_name: "Toni Strosin",
        contact_phone: null,
        delivery_address: null,
        price: "5262.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 43,
        shop_id: "S-00000105",
        customer_id: 9,
        live_sale_id: 93,
        contact_name: "Jack Smith",
        contact_phone: null,
        delivery_address: null,
        price: "1374.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 44,
        shop_id: "S-00000107",
        customer_id: 9,
        live_sale_id: 94,
        contact_name: "Mr. Keeley Dibbert",
        contact_phone: null,
        delivery_address: null,
        price: "4165.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 45,
        shop_id: "S-00000109",
        customer_id: 9,
        live_sale_id: 95,
        contact_name: "Marcellus Koelpin",
        contact_phone: null,
        delivery_address: null,
        price: "4665.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 46,
        shop_id: "S-00000111",
        customer_id: 10,
        live_sale_id: 96,
        contact_name: "Emmett Tillman DDS",
        contact_phone: null,
        delivery_address: null,
        price: "2958.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 47,
        shop_id: "S-00000113",
        customer_id: 10,
        live_sale_id: 97,
        contact_name: "Dr. Mara Lueilwitz IV",
        contact_phone: null,
        delivery_address: null,
        price: "3820.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 48,
        shop_id: "S-00000115",
        customer_id: 10,
        live_sale_id: 98,
        contact_name: "Raul Hammes",
        contact_phone: null,
        delivery_address: null,
        price: "85.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 49,
        shop_id: "S-00000117",
        customer_id: 10,
        live_sale_id: 99,
        contact_name: "Lincoln Schaefer",
        contact_phone: null,
        delivery_address: null,
        price: "9957.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 50,
        shop_id: "S-00000119",
        customer_id: 10,
        live_sale_id: 100,
        contact_name: "Prof. Bo Stracke",
        contact_phone: null,
        delivery_address: null,
        price: "5544.00",
        status: "pending",
        created_at: "2024-05-28T12:35:48.000000Z",
        updated_at: "2024-05-28T12:35:48.000000Z",
        deleted_at: null,
      },
      {
        id: 1,
        shop_id: "S-00000002",
        customer_id: 1,
        live_sale_id: 51,
        contact_name: "Aungaung Oo",
        contact_phone: null,
        delivery_address: null,
        price: "7062.00",
        status: "pending",
        created_at: "2024-05-28T12:35:47.000000Z",
        updated_at: "2024-05-28T12:35:47.000000Z",
        deleted_at: null,
      },
    ],
  };

  // const products = orderApi.data;
  const dispatch = useDispatch();
  // const { products, isLoading, isError, message } = useSelector(
  //   (state) => state.stocks
  // );
  const deletes = useSelector((state) => state.deleteproduct);
  const sendData = (dataId) => {
    const Deletedata = dataId;
    // sendDataToDashboard(Deletedata);
  };

  const datess = orderApi.data[0].created_at;
  console.log(datess);

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

  const date1 = date;
  const date2 = "2024-05-28T12:35:47.000000Z";

  const isSameDate = compareDates(date1, date2);
  console.log(isSameDate);

  useEffect(() => {
    dispatch(getProducts());
  }, [deletes.deletes]);

  useEffect(() => {
    setProducts(
      orderApi.data.filter((item) => {
        if (status) {
          return item.status === status;
        } else {
          return orderApi.data;
        }
      })
    );
  }, [status]);

  // console.log(products.data);

  //   if (products.products.code === 200) {
  //     console.log(products.products.data);
  //     const rows = products.products.data.map((index, item) => ({
  //       no: index + 1,
  //       ...item,
  //     }));
  //     console.log(rows);
  //   }
  // }, [products]);

  // const handleRowClick = (params) => {
  // Access the clicked row data using params.row
  // console.log("Row clicked:", params.row);
  // You can perform additional actions based on the clicked row data
  // };

  return (
    <Box sx={{ height: { xs: 600, md: 500 }, width: "100%" }}>
      <DataGrid
        // rows={[]}
        rows={products.map((item, index) => ({ no: index + 1, ...item })) || []}
        columns={columns}
        pageSize={14}
        checkboxSelection
        // loading={isLoading}
        disableRowSelectionOnClick
        slots={{
          toolbar: CustomToolbar,
          loadingOverlay: LinearProgress,
        }}
        onRowSelectionModelChange={(dataId) => {
          sendData(dataId);
          console.log("table", dataId);
        }}
      />
      {/* {!isLoading && isError ? <AlertBox message={message} /> : null} */}
    </Box>
  );
};

export default OrderTable;
