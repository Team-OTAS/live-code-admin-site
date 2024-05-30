import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import axios from "./../../api/axios";
import { getShopData } from "./../../redux/features/shopDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ShopReciept() {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const [file, setFile] = useState(null);
  const [local, setlocal] = useState(false);
  const { loading, error, shopData } = useSelector((state) => state.ShopData);
  const [logo, setLogo] = useState(null);
  const [footer, setFooter] = useState("");
  const [header, setHeader] = useState("");
  const id = localStorage.getItem("shopId");

  function hundleFileChange(e) {
    setFile(e.target.files[0]);
    setlocal(true);
  }

  const saveReceipt = async () => {
    setEdit(false);
    const data = {
      logo: local ? file : null,
      receipt_header: header,
      receipt_footer: footer,
    };
    try {
      const res = await axios.post(
        `api/shops/${id}/shop-receipt?_method=PATCH`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Updated",
      });
      dispatch(getShopData(id));
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const discardEdit = async () => {
    setlocal(false);
    setEdit(true);
    setFooter(shopData.data.receipt_footer);
    setHeader(shopData.data.receipt_header);
  };

  useEffect(() => {
    dispatch(getShopData(id));
  }, []);

  useEffect(() => {
    if (shopData) {
      setLogo(shopData.data.logo);
      setFooter(shopData.data.receipt_footer);
      setHeader(shopData.data.receipt_header);
    }
  }, [shopData]);

  return (
    <>
      <Box
        sx={{
          marginTop: { xs: "20px", md: "0" },
          padding: { xs: "10px 0 10px 10px", md: "0" },
          minHeight: "100vh",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "25px",
            }}
          >
            <p className="page-header">Shop Receipt</p>
            {edit && (
              <button className="edit-btn" onClick={() => setEdit(false)}>
                Edit Shop Receipt{" "}
                <EditRoundedIcon
                  sx={{
                    background: "#4D3F3F",
                    borderRadius: "50%",
                    color: "white",
                    padding: "5px",
                    marginLeft: "20px",
                  }}
                />
              </button>
            )}
            {!edit && (
              <div className="btn-container">
                <button className="discard" onClick={discardEdit}>
                  Discard
                </button>
                <button className="save" onClick={saveReceipt}>
                  Save Edit
                </button>
              </div>
            )}
          </div>
        </div>
        {shopData && (
          <Grid container spacing={2} sx={{ paddingRight: "25px" }}>
            <Grid item xs={12} md={6} lg={4}>
              <Box className="shopLogo">
                <p className="title-logo">Shop Logo</p>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      padding: "0 20px",
                    }}
                  >
                    {local ? (
                      <div className="logo-img">
                        <img src={URL.createObjectURL(file)} alt="logo" />
                      </div>
                    ) : (
                      <div className="logo-img">
                        <img
                          src={`https://api.livecodemm.com${logo}`}
                          alt="logo"
                        />
                      </div>
                    )}
                    {!edit && (
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ margin: "10px 20px" }}
                      >
                        Upload file
                        <VisuallyHiddenInput
                          type="file"
                          onChange={hundleFileChange}
                        />
                      </Button>
                    )}
                  </div>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Box className="shopLogo">
                <div style={{ padding: "10px 0" }}>
                  <label className="title-logo">
                    <ReceiptLongOutlinedIcon /> Receipt Header
                  </label>
                  <br />
                  <textarea
                    type="text"
                    className="receipt-body"
                    rows={6}
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                    readOnly={edit}
                  ></textarea>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="shopLogo">
                <div style={{ padding: "10px 0" }}>
                  <label className="title-logo">
                    <ReceiptLongOutlinedIcon /> Receipt Footer
                  </label>
                  <br />
                  <textarea
                    type="text"
                    className="receipt-body"
                    rows={6}
                    value={footer}
                    onChange={(e) => setFooter(e.target.value)}
                    readOnly={edit}
                  ></textarea>
                </div>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default ShopReciept;
