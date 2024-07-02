import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getShopData } from "../../../redux/features/shopDataSlice";
import dayjs from "dayjs";
import axios from "./../../../api/axios";
import logo from "./../../../assets/images/logo.png";

const MultiVouncher = () => {
  const orderIds = [66, 67, 68];
  const [vouchers, setVouchers] = useState([]);
  const dispatch = useDispatch();
  const id = localStorage.getItem("shopId");
  const { shopData } = useSelector((state) => state.ShopData);
  console.log(vouchers);

  useEffect(() => {
    dispatch(getShopData(id));
  }, []);

  useEffect(() => {
    const getVoucherData = async (orderId) => {
      try {
        const res = await axios.get("/api/orders/" + orderId);
        setVouchers((prevVouchers) => [...prevVouchers, res.data]);
      } catch (error) {
        console.log(error);
      }
    };

    orderIds.map((orderId) => {
      getVoucherData(orderId);
    });
  }, []);

  const generatePdf = async () => {
    const pdf = new jsPDF();
    const elements = document.querySelectorAll(".pdf-content");

    for (let i = 0; i < elements.length; i++) {
      const canvas = await html2canvas(elements[i]);
      const imgData = canvas.toDataURL("image/png");

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, "PNG", 10, 10);
    }

    // pdf.save("vouchers.pdf");
    pdf.autoPrint();
    const pdfOutput = pdf.output("bloburl");
    window.open(pdfOutput);
  };

  return (
    <>
      <div>
        {vouchers.map((voucher, index) => (
          <div
            key={index}
            className="pdf-content"
            style={{
              padding: 10,
              backgroundColor: "#f5f5f5",
              marginBottom: 20,
              border: "1px solid #ddd",
              width: "50vw",
            }}
          >
            <h1>Voucher # {voucher.data.order.id}</h1>
            {vouchers && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img
                    src={
                      "https://api.livecodemm.com/storage/images/AUNVRLwyS7ES8x8LDigxFBZXCoPyKxk0IsGdozii.png"
                    }
                    alt="logo"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                  <p className="row-header">{shopData.data.receipt_header}</p>
                  <span className="vouncher-text">{shopData.data.address}</span>
                  <br />
                  <span className="vouncher-text">{shopData.data.phone}</span>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer>
                    <Table aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left" colSpan={12}>
                            <p className="vouncher-text">
                              <span className="row-header">Name</span> -{" "}
                              {voucher.data.order.contact_name}
                            </p>
                            <span className="vouncher-text">
                              <span className="row-header">Address</span> -{" "}
                              {voucher.data.order.delivery_address}
                            </span>
                            <br />
                            <span className="vouncher-text">
                              <span className="row-header">
                                Phone Number -{" "}
                              </span>
                              {voucher.data.order.contact_phone}
                            </span>
                          </TableCell>
                        </TableRow>

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
                        {voucher.data.order_products.map((row, index) => (
                          <TableRow key={row.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.product.name}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
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
                            {voucher.data.order.price} Ks
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            )}
          </div>
        ))}
      </div>
      <button onClick={generatePdf}>Generate PDF</button>
    </>
  );
};

export default MultiVouncher;
