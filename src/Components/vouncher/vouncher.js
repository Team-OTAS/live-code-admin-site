import axios from "./../../api/axios";

async function printVoucher(ids) {
  const data = {
    order_ids: ids,
    shop_id: localStorage.getItem("shopId"),
  };

  try {
    const res = await axios.get("api/vouchers", {
      params: data,
      responseType: "blob", // Important for handling binary data
    });

    // Check that the response contains the correct content-type for a PDF
    const file = new Blob([res.data], { type: "application/pdf" });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(file);

    // Open the PDF in a new tab/window
    const newWindow = window.open(url);

    if (newWindow) {
      // Trigger print once the PDF is opened
      newWindow.onload = function () {
        newWindow.print();
      };
    } else {
      console.error("Failed to open new window for printing");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

export default printVoucher;
