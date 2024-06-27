import jsPDF from "jspdf";

export const generateMultiPagePDF = () => {
  const doc = new jsPDF();
  const vouchers = [
    {
      id: 1,
      title: "Voucher 1",
      text: "This is some example content for voucher 1.",
    },
    {
      id: 2,
      title: "Voucher 2",
      text: "This is some example content for voucher 2.",
    },
    {
      id: 3,
      title: "Voucher 3",
      text: "This is some example content for voucher 3.",
    },
    // Add more vouchers as needed
  ];

  vouchers.forEach((voucher, index) => {
    if (index !== 0) {
      doc.addPage();
    }
    doc.text(voucher.title, 10, 10);
    doc.text(voucher.text, 10, 20);
  });

  // Save the document
  doc.save("vouchers.pdf");

  // Auto print the document (optional)
  doc.autoPrint();
  const pdfOutput = doc.output("bloburl");
  window.open(pdfOutput);
};
