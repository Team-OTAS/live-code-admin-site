import Swal from "sweetalert2";

const AlertBox = ({ message }) => {
  // console.log(message);
  Swal.fire({
    icon: "warning",
    title: "လုပ်ဆောင်ချက်မှားယွင်းနေပါသည်",
    text: message,
  });

  return;
};

export default AlertBox;
