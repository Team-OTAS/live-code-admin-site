import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  PDFDownloadLink,
  View,
  pdf,
} from "@react-pdf/renderer";
import myFont from "./../../../assets/fonts/pyidaungsu-1.3.ttf";

// Register Myanmar font
Font.register({
  family: "MyanmarFont",
  src: "/assets/fonts/pyidaungsu-1.3.ttf", // Ensure the path is correct
});

// Sample data for multiple vouchers
const vouchersData = [
  {
    shopName: "Welcome Our Shop",
    contact: "Tel: 09420056051",
    customer: {
      name: "Kaung Htet Thu",
      address: "လမ်း ၄၀",
      date: "01-01-1970",
    },
    products: [
      {
        id: 1,
        name: "Batik (3x1000)",
        qty: 69,
        unitPrice: 3000.0,
        amount: 207000.0,
      },
      {
        id: 2,
        name: "Nike Shoe Address Book In Myanmar Country and Collection",
        qty: 99,
        unitPrice: 1000.0,
        amount: 99000.0,
      },
    ],
    totalAmount: 306000.0,
  },
  {
    shopName: "Another Shop",
    contact: "Tel: 09420065789",
    customer: {
      name: "Mya Mya",
      address: "လမ်း ၆၀",
      date: "01-01-2024",
    },
    products: [
      {
        id: 1,
        name: "Shoes",
        qty: 2,
        unitPrice: 15000.0,
        amount: 30000.0,
      },
      {
        id: 2,
        name: "Shirts",
        qty: 3,
        unitPrice: 5000.0,
        amount: 15000.0,
      },
    ],
    totalAmount: 45000.0,
  },
];

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
    // borderLeft: "none",
    borderRight: "none",
    padding: "8pt",
    textAlign: "left",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  headerCell: {
    width: "10%", // Small width for 'No.'
  },
  productCell: {
    width: "40%", // Larger width for 'Product Name'
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

// Create a PDF document
const MyDocument = () => {
  return (
    <Document>
      {vouchersData.map((voucher, index) => (
        <Page size="A5" style={styles.page} key={index}>
          <View>
            {/* Shop Info */}
            <Text style={styles.header}>{voucher.shopName}</Text>
            <Text style={styles.contact}>{voucher.contact}</Text>
            {/* Customer Info */}
            <View style={styles.customerInfo}>
              <Text style={styles.customerText}>
                Name: {voucher.customer.name}
              </Text>
              <Text style={styles.customerText}>
                Address: {voucher.customer.address}
              </Text>
              <Text style={styles.customerText}>
                Date: {voucher.customer.date}
              </Text>
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

              {voucher.products.map((product) => (
                <View style={styles.tableRow} key={product.id}>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    {product.id}
                  </Text>
                  <Text style={[styles.tableCell, styles.productCell]}>
                    {product.name}
                  </Text>
                  <Text style={[styles.tableCell, styles.qtyCell]}>
                    {product.qty}
                  </Text>
                  <Text style={[styles.tableCell, styles.unitPriceCell]}>
                    {product.unitPrice.toFixed(2)}
                  </Text>
                  <Text style={[styles.tableCell, styles.amountCell]}>
                    {product.amount.toFixed(2)}
                  </Text>
                </View>
              ))}
              {/* Total amount row */}
              <View style={styles.totalRow}>
                <Text style={[styles.tableCell, styles.totalCell]}>
                  Total Amount:
                </Text>
                <Text style={[styles.tableCell, styles.totalCell]}>
                  {voucher.totalAmount.toFixed(2)} kyats
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

const PdfGenerater = () => {
  const handlePrint = async () => {
    // Create PDF document
    const blob = await pdf(<MyDocument />).toBlob();
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
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Receipt PDF Generator</h1>
      <PDFDownloadLink document={<MyDocument />} fileName="receipt.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Receipt PDF"
        }
      </PDFDownloadLink>
      <div>
        <h1>Print Your Order PDF</h1>
        <button
          onClick={handlePrint}
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "white",
            backgroundColor: "blue",
            borderRadius: "5px",
          }}
        >
          Print Order PDF
        </button>
      </div>
    </div>
  );
};

export default PdfGenerater;
