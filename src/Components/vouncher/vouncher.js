import jsPDF from "jspdf";
import axios from "./../../api/axios";
import PyidaungSu from "./../../assets/fonts/pyidaungsu-1.3.ttf";
import dayjs from "dayjs";
import autoTable from "jspdf-autotable";

export const generateMultiPagePDF = (voucherIds) => {
  console.log(voucherIds);
  const doc = new jsPDF();
  const date = dayjs().format("DD-MM-YYYY");
  const id = localStorage.getItem("shopId");
  const orderIds = voucherIds;
  const vouchers = [];
  let shopData = null;

  const getshopData = async () => {
    try {
      const res = await axios.get("/api/shops/" + id);
      shopData = res.data;
      // console.log(shopData);
    } catch (error) {}
    // dispatch(getShopData(id));
  };

  const getVoucherData = async (orderId) => {
    try {
      const res = await axios.get("/api/orders/" + orderId);
      vouchers.push(res.data);
      // console.log(vouchers);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterVouncher = () => {
    getshopData();
    orderIds.map((orderId) => {
      getVoucherData(orderId);
    });
  };

  getFilterVouncher();

  setTimeout(() => {
    // Load Myanmar fonts
    doc.addFileToVFS(PyidaungSu);
    doc.addFont(PyidaungSu, "Pyidaungsu", "normal");

    vouchers.forEach((voucher, index) => {
      if (index !== 0) {
        doc.addPage();
      }

      doc.setFont("Pyidaungsu");

      // Add voucher number
      doc.setFontSize(16);
      doc.text(`Voucher # ${voucher.data.order.id}`, 10, 20);
      doc.text(`${date}`, 180, 20);

      // Add logo
      doc.addImage(
        "https://i.imgur.com/Yyi3HuJ.jpeg",
        "JPEG",
        10, // x-coordinate
        30, // y-coordinate
        30, // width
        30 // height
      );

      // Add shop information
      doc.setFontSize(12);
      doc.text(shopData.data.receipt_header, 10, 80);
      doc.text(shopData.data.address, 10, 90);
      doc.text(shopData.data.phone, 10, 100);

      // Add contact information
      doc.text(`Name: ${voucher.data.order.contact_name}`, 10, 110);
      doc.text(`Address: ${voucher.data.order.delivery_address}`, 10, 120);
      doc.text(`Phone Number: ${voucher.data.order.contact_phone}`, 10, 130);

      // Add table headers
      doc.setFontSize(10);
      const headers = ["No", "Name", "Qty.", "Unit", "Amount"];
      const data = voucher.data.order_products.map((row, rowIndex) => [
        rowIndex + 1,
        row.product.name,
        row.quantity,
        `${row.unit_price} Ks`,
        `${row.total_price} Ks`,
      ]);

      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 140,
        theme: "striped", // Optional: 'striped', 'grid', or 'plain'
        styles: { font: "Pyidaungsu" }, // Apply font
        headStyles: { fillColor: [22, 160, 133] }, // Header background color
        margin: { top: 10 },
      });

      // Add total amount
      // Add total amount below the table
      // const finalY = doc.previousAutoTable.finalY; // The y position where the last table ended
      doc.setFontSize(12);
      doc.text(`Total: ${voucher.data.order.price} Ks`, 180, 180 + 200 + 10);

      doc.text(
        shopData.data.receipt_footer,
        10,
        170 + voucher.data.order_products.length * 10
      );
    });

    // Save the document

    doc.autoPrint();
    const pdfOutput = doc.output("bloburl");
    window.open(pdfOutput);

    // doc.save("vouchers.pdf");
  }, 2000);

  // Auto print the document (optional)
};
