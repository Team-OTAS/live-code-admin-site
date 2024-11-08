import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { getShopData } from "./../../../redux/features/shopDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "./../../../redux/features/orderApiSlice";
import { useParams } from "react-router-dom";
import MMText from "react-mm-text";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import "./../../../Styles/vouncher.css";

function Vouncher() {
  const orderId = useParams();
  const componentRef = useRef();
  const date = dayjs().format("DD-MM-YYYY");
  const dispatch = useDispatch();
  const id = localStorage.getItem("shopId");
  const { shopData } = useSelector((state) => state.ShopData);
  const { orderDetail } = useSelector((state) => state.OrderData);
  console.log(orderDetail);

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
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: "10px" }}
        onClick={handlePrint}
      >
        Print
      </Button>
      <div className="printable-area" ref={componentRef}>
        <div style={{ position: "relative" }}>
          {/* date */}
          {/* <div style={{ position: "absolute", top: "0", right: "0" }}>
            
          </div> */}
          {shopData && (
            <Box sx={{ marginTop: "20px" }}>
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
                  <div style={{ display: "flex" }}>
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
                    <div style={{ marginLeft: "10px" }}>
                      <span className="vouncher-text">Date: {date}</span>
                      <br />
                      {/* <br /> */}
                      <span className="vouncher-text">
                        <MMText
                          text={shopData.data.name}
                          showFont={"unicode"}
                          conveter={"rabbit"}
                          detector={"knayi"}
                        />
                      </span>
                      <br />
                      <span className="vouncher-text">
                        <MMText
                          text={shopData.data.address}
                          showFont={"unicode"}
                          conveter={"rabbit"}
                          detector={"knayi"}
                        />
                      </span>
                      <br />
                      <span className="vouncher-text">
                        {shopData.data.phone}
                      </span>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <span className="vouncher-text">
                    <span className="row-header">Name</span> -{" "}
                    <MMText
                      text={orderDetail.data.order.contact_name}
                      showFont={"unicode"}
                      conveter={"rabbit"}
                      detector={"knayi"}
                    />
                  </span>
                  <br />
                  <span className="vouncher-text">
                    <span className="row-header">Address</span> -{" "}
                    <MMText
                      text={orderDetail.data.order.delivery_address}
                      showFont={"unicode"}
                      conveter={"rabbit"}
                      detector={"knayi"}
                    />
                  </span>
                  <br />
                  <span className="vouncher-text">
                    <span className="row-header">Phone Number - </span>
                    {orderDetail.data.order.contact_phone}
                  </span>
                </Grid>

                {/* Product Table */}
                {orderDetail && (
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table aria-label="spanning table">
                        <TableHead>
                          <TableRow>
                            <TableCell className="row-header">No</TableCell>
                            <TableCell className="row-header">Name</TableCell>
                            <TableCell className="row-header" align="right">
                              Qty.
                            </TableCell>
                            <TableCell className="row-header" align="right">
                              Unit
                            </TableCell>
                            <TableCell className="row-header" align="right">
                              Amount
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {orderDetail.data.order_products.map((row, index) => (
                            <TableRow key={row.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                <MMText
                                  text={row.product.name}
                                  showFont={"unicode"}
                                  conveter={"rabbit"}
                                  detector={"knayi"}
                                />
                              </TableCell>
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
                            <TableCell
                              className="row-header"
                              align="right"
                              colSpan={4}
                            >
                              Total
                            </TableCell>
                            <TableCell align="right">
                              {orderDetail.data.order.price} Ks
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}

                {/* Footer */}

                <Grid item xs={12} sx={{ marginTop: "10px" }}>
                  <p className="row-header">
                    <MMText
                      text={shopData.data.receipt_footer}
                      showFont={"unicode"}
                      conveter={"rabbit"}
                      detector={"knayi"}
                    />
                  </p>
                </Grid>
              </Grid>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vouncher;
