import { useEffect } from "react";
import Swal from "sweetalert2";

function SuccessBox({ message }) {
  console.log(message);
  useEffect(() => {
    let timerInterval;
    Swal.fire({
      icon: "success",
      title: message,
      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        //
      }
    });
  }, [message]);

  return;
}

export default SuccessBox;
