import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopData } from "../../../redux/features/shopDataSlice";
import { Box, Grid } from "@mui/material";

import { FileText, PrinterCheckIcon } from "lucide-react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  PDFDownloadLink,
  View,
  pdf,
  Image,
} from "@react-pdf/renderer";
import axios from "./../../../api/axios";
import downloadSvg from "./../../../assets/images/Download-bro.png";
import { useLocation } from "react-router-dom";
import Loading from "./../../../Components/Loading";

// Register Myanmar font
Font.register({
  family: "MyanmarFont",
  src: "/assets/fonts/pyidaungsu-1.3.ttf", // Ensure the path is correct
});

const MyDocument = ({ vouchers, shopData }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      paddingBottom: 0,
      fontFamily: "MyanmarFont",
      fontSize: 10,
    },
    header: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 3,
    },
    contact: {
      textAlign: "center",
      marginBottom: 8,
    },
    customerInfo: {
      marginBottom: 10,
    },
    customerText: {
      margin: "0",
    },
    table: {
      display: "table",
      width: "100%",
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      border: "1px solid #000",
      borderBottom: "none",
      fontSize: 8,
      borderRight: "none",
      padding: "8pt",
      textAlign: "left",
      wordBreak: "break-word", // Allow for breaking long words
    },
    tableHeader: {
      backgroundColor: "#f0f0f0",
      fontWeight: "bold",
    },
    headerCell: {
      width: "10%", // Small width for 'No.'
    },
    productCell: {
      width: "40%",
      // padding: "8pt",
      wordBreak: "break-word", // Enable hyphenation  // Larger width for 'Product Name'
    },
    qtyCell: {
      width: "10%", // Small width for 'Qty'
    },
    unitPriceCell: {
      width: "20%", // Adjust as needed for 'Unit Price'
    },
    amountCell: {
      width: "20%",
      borderRight: "1px solid #000", // Adjust as needed for 'Amount'
    },
    totalRow: {
      flexDirection: "row",
      border: "1px solid #000",
      // marginTop: 5,
    },
    totalCell: {
      border: "none", // Removing border for total row cells
      padding: "8pt",
      textAlign: "right",
      fontWeight: "bold",
      width: "100%",
    },
    signature: {
      marginTop: 30,
      paddingTop: 10,
    },
    section: {
      marginBottom: 40,
      borderBottom: "1px solid #000",
      paddingBottom: 10,
    },
  });
  return (
    <Document>
      {vouchers.map((voucher, index) => (
        <Page size="A5" style={styles.page} key={index}>
          <View>
            {/* Shop Info */}
            {/* <Image src="https://api.livecodemm.com/storage/images/1731857607Download-bro.png" /> */}
            <Text style={styles.header}>{shopData.data?.name}</Text>
            <Text style={styles.contact}>{shopData.data?.phone}</Text>
            {/* Customer Info */}
            <View style={styles.customerInfo}>
              <Text style={styles.customerText}>
                Name: {voucher.data.order?.contact_name}
              </Text>
              <Text style={styles.customerText}>
                Address: {voucher.data.order?.contact_phone}
              </Text>
              {/* <Text style={styles.customerText}>Date: </Text> */}
            </View>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.headerCell]}>No.</Text>
                <Text style={[styles.tableCell, styles.productCell]}>
                  Product Name
                </Text>
                <Text style={[styles.tableCell, styles.qtyCell]}>Qty</Text>
                <Text style={[styles.tableCell, styles.unitPriceCell]}>
                  Unit Price
                </Text>
                <Text style={[styles.tableCell, styles.amountCell]}>
                  Amount
                </Text>
              </View>

              {voucher.data.order_products.map((products, index) => (
                <View style={styles.tableRow} key={products.id}>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    {index}
                  </Text>
                  <Text style={[styles.tableCell, styles.productCell]}>
                    {products.product.name}
                  </Text>
                  <Text style={[styles.tableCell, styles.qtyCell]}>
                    {products.quantity}
                  </Text>
                  <Text style={[styles.tableCell, styles.unitPriceCell]}>
                    {products.product.price}
                  </Text>
                  <Text style={[styles.tableCell, styles.amountCell]}>
                    {products.total_price}
                  </Text>
                </View>
              ))}
              {/* Total amount row */}
              <View style={styles.totalRow}>
                <Text style={[styles.tableCell, styles.totalCell]}>
                  Total Amount:
                </Text>
                <Text style={[styles.tableCell, styles.totalCell]}>
                  {voucher.data.order.price} kyats
                </Text>
              </View>
            </View>

            <Text style={styles.signature}>Signature</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

const MultiVouncher = () => {
  const location = useLocation();
  const ids = location.state?.ids || [];
  console.log("ids", ids);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const id = localStorage.getItem("shopId");
  const { shopData } = useSelector((state) => state.ShopData);
  // console.log(vouchers);

  // get Shop Data
  useEffect(() => {
    dispatch(getShopData(id));
  }, []);

  // get Order Data
  useEffect(() => {
    const getVoucherData = async () => {
      const voucherPromises = ids.map(async (orderId) => {
        try {
          const res = await axios.get("/api/orders/" + orderId);
          return res.data; // Return the fetched data
        } catch (error) {
          console.error("Error fetching voucher data:", error);
          return null; // Handle the error case
        }
      });

      const fetchedVouchers = await Promise.all(voucherPromises);
      // Filter out any null values in case of errors
      setVouchers(fetchedVouchers.filter((voucher) => voucher !== null));
    };

    getVoucherData();
  }, []);

  // loading time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  // console.log(shopData);
  // console.log(vouchers);
  // Print Feature
  const handlePrint = async () => {
    // Create PDF document
    const blob = await pdf(
      <MyDocument shopData={shopData} vouchers={vouchers} />
    ).toBlob();
    const url = URL.createObjectURL(blob);

    // Open the PDF in a new tab
    const newTab = window.open(url);
    if (newTab) {
      newTab.onload = () => {
        // Wait for the PDF to load before printing
        setTimeout(() => {
          newTab.print();
          // newTab.close();
        }, 500); // Adjust timeout as necessary
      };
    } else {
      alert("Please allow popups for this website");
    }
  };

  return (
    <div className="dashboardContent">
      <h1>Vouncher PDF Export</h1>

      <Grid
        container
        spacing={2}
        sx={{
          height: { xs: "100vh", md: "80vh" },
          paddingBottom: { xs: "50px", md: "0" },
        }}
      >
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{}}>
              <img
                src={downloadSvg}
                style={{ width: "300px", height: "300px" }}
                alt="Logo"
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {!loading ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                padding: { xs: "0 10px", md: "0 100px" },
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderLeft: "2px solid #4d3f3f",
                // Border
              }}
            >
              <PDFDownloadLink
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  justifyContent: "center",
                  backgroundColor: "#4d3f3f", // Green background
                  color: "white", // White text
                  width: "100%",
                  fontSize: "16px", // Font size
                  border: "none", // No border
                  borderRadius: "5px", // Rounded corners
                  cursor: "pointer", // Pointer cursor
                  transition: "background-color 0.3s", // Transition effect
                }}
                document={
                  <MyDocument vouchers={vouchers} shopData={shopData} />
                }
                fileName="receipt.pdf"
              >
                <FileText />
                <p>Download Pdf</p>
              </PDFDownloadLink>

              <p>OR</p>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "15px",
                  justifyContent: "center",
                  backgroundColor: "#4d3f3f", // Green background
                  color: "white", // White text
                  width: "100%",
                  fontSize: "16px", // Font size
                  border: "none", // No border
                  borderRadius: "5px", // Rounded corners
                  cursor: "pointer", // Pointer cursor
                  transition: "background-color 0.3s", // Transition effect
                }}
                disabled={loading}
                onClick={handlePrint}
              >
                <PrinterCheckIcon />
                Print
              </button>
            </Box>
          ) : (
            <Loading />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MultiVouncher;
