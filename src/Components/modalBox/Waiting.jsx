import { useEffect } from "react";
import Swal from "sweetalert2";

function WaitingBox() {
  // console.log(message);
  useEffect(() => {
    let timerInterval;
    Swal.fire({
      title: `Please Wait Completing Process`,
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval);
      },
      backdrop: `
    rgba(0,0,123,0.4)
    left top
    no-repeat
  `,
    });
  }, []);

  return;
}

export default WaitingBox;
