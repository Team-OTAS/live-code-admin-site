import Swal from "sweetalert2";

const AlertBox = ({ message }) => {
  // console.log(message);
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });

  return;
};

export default AlertBox;
