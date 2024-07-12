import axios from "./../../api/axios";

async function vouncher(ids) {
  const data = {
    order_ids: ids,
    shop_id: localStorage.getItem("shopId"),
  };
  console.log(data);
  try {
    const res = await axios.get("api/vouchers", {
      params: data,
      responseType: "blob", // Important for handling binary data
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "voucher.pdf"); // Set the file name
    document.body.appendChild(link);
    link.click(); // Trigger the download
    link.remove(); // Clean up the DOM

    console.log("PDF downloaded");
  } catch (error) {
    console.log("Error:", error);
  }
}

export default vouncher;
