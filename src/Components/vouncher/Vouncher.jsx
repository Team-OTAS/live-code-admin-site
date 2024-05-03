import { Box, Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import PrintTemplate from "react-print";
import { useReactToPrint } from "react-to-print";
import { getShopData } from "./../../redux/features/shopDataSlice";
import { useDispatch, useSelector } from "react-redux";

function Vouncher() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const dispatch = useDispatch();
  const id = localStorage.getItem("shopId");
  const { loading, error, shopData } = useSelector((state) => state.ShopData);

  useEffect(() => {
    dispatch(getShopData(id));
  }, []);

  return (
    <div>
      <Button onClick={handlePrint}>Print</Button>
      <div ref={componentRef}>
        <div>
          <h3>Order Form</h3>
          {shopData && (
            <div>
              <Box sx={{ width: "100%", height: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <img
                      src={`https://api.livecodemm.com${shopData.data.logo} `}
                      alt="logo"
                      style={{ width: "inherit", height: "inherit" }}
                    />
                  </div>
                </div>
              </Box>
              <p>
                If you need to show different data, you could grab that data via
                AJAX on componentWill/DidMount or pass it in as props
              </p>
              <p>
                The CSS will hide the original content and show what is in your
                Print Template.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vouncher;
