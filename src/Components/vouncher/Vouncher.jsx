import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { getShopData } from "./../../redux/features/shopDataSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getOrderDetail } from "../../redux/features/orderApiSlice";
import { useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Vouncher() {
  const orderId = useParams();
  const componentRef = useRef();
  const date = dayjs().format("DD-MM-YYYY");
  const dispatch = useDispatch();
  const id = localStorage.getItem("shopId");
  const { shopData } = useSelector((state) => state.ShopData);
  const { orderDetail } = useSelector((state) => state.OrderData);
  console.log("order", orderDetail.data);
  console.log(orderId.id);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(getShopData(id));
  }, []);

  useEffect(() => {
    dispatch(getOrderDetail(orderId.id));
  }, []);

  return (
    <div>
      <Button onClick={handlePrint}>Print</Button>
      <div ref={componentRef}>
        <div>
          {shopData && (
            <Box sx={{ margin: "10px" }}>
              <Grid container spacing={2}>
                {/* Header */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* logo */}
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}${shopData.data.logo} `}
                      alt="logo"
                      style={{ width: "inherit", height: "inherit" }}
                    />
                  </div>
                  {/* date */}
                  <div>
                    <p>Date: {date}</p>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <p>{shopData.data.receipt_header}</p>
                  <span>{shopData.data.address}</span>
                  <br />
                  <span>{shopData.data.phone}</span>
                </Grid>
                {/* Product Table */}
                {orderDetail && (
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table aria-label="spanning table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left" colSpan={12}>
                              <p>
                                <span>Name</span> -{" "}
                                {orderDetail.data.contact_name}
                              </p>
                              <span>
                                <span>Address</span> -{" "}
                                {orderDetail.data.delivery_address}
                              </span>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Desc</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Amount</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {orderDetail.data.order_products.map((row, index) => (
                            <TableRow key={row.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{row.order_id}</TableCell>
                              <TableCell align="right">
                                {row.quantity}
                              </TableCell>
                              <TableCell align="right">
                                {row.unit_price} Ks
                              </TableCell>
                              <TableCell align="right">
                                {row.total_price} Ks
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell align="right" colSpan={4}>
                              Total
                            </TableCell>
                            <TableCell align="right">
                              {orderDetail.data.price} Ks
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vouncher;
