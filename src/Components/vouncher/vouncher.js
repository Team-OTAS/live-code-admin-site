import jsPDF from "jspdf";
import axios from "./../../api/axios";
import PyidaungSu from "./../../assets/fonts/pyidaungsu-1.3.ttf";
import dayjs from "dayjs";

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
        `https://api.livecodemm.com${shopData.data.logo}`,
        "PNG",
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
      headers.forEach((header, i) => {
        doc.text(header, 10 + i * 40, 140);
      });

      // Add table rows
      voucher.data.order_products.forEach((row, rowIndex) => {
        doc.text(`${rowIndex + 1}`, 10, 150 + rowIndex * 10);
        doc.text(`${row.product.name}`, 50, 150 + rowIndex * 10);
        doc.text(`${row.quantity}`, 90, 150 + rowIndex * 10);
        doc.text(`${row.unit_price} Ks`, 130, 150 + rowIndex * 10);
        doc.text(`${row.total_price} Ks`, 170, 150 + rowIndex * 10);
      });

      // Add total amount
      doc.setFontSize(12);
      doc.text(
        `Total: ${voucher.data.order.price} Ks`,
        160,
        160 + voucher.data.order_products.length * 10
      );

      doc.text(
        shopData.data.receipt_footer,
        10,
        170 + voucher.data.order_products.length * 10
      );
    });

    doc.autoPrint();
    const pdfOutput = doc.output("bloburl");
    window.open(pdfOutput);
  }, 2000);

  // Save the document
  // doc.save("vouchers.pdf");

  // Auto print the document (optional)
};
