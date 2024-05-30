import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/features/productReducer";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ListIcon from "@mui/icons-material/List";
import DescriptionIcon from "@mui/icons-material/Description";
import AlertBox from "../../Components/modalBox/AlertBox";
import Loading from "../../Components/Loading";

import "./../../Styles/addstock.css";

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.stocks
  );

  useEffect(() => {
    dispatch(getProduct(id));
  }, [isError, message, dispatch]);

  console.log(product || null);
  return (
    <Box sx={{ marginTop: "20px", marginLeft: "20px" }}>
      {isLoading && <Loading />}
      {!isLoading && product ? (
        <Grid
          container
          spacing={2}
          sx={{
            border: "1px solid #000",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Grid item xs={12} className="formHeader">
            <p className="header">View Stock</p>
            <Link to={`/editstock/${id}`}>
              <EditNoteOutlinedIcon
                fontSize="large"
                color="primary"
                sx={{ marginBottom: "50px" }}
              />
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <div className="inputContainer">
              <TextField
                id="outlined-error-helper-text"
                fullWidth
                label={
                  <div className="input-field-label">
                    <Inventory2OutlinedIcon color="primary" />
                    <span>Stock Name</span>
                  </div>
                }
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
                value={product.data.name || ""}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="inputContainer">
              <TextField
                id="outlined-error-helper-text"
                fullWidth
                label={
                  <div className="input-field-label">
                    <AttachMoneyOutlinedIcon color="primary" />
                    <span>Price</span>
                  </div>
                }
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
                value={product.data.price || ""}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="inputContainer">
              <TextField
                id="outlined-error-helper-text"
                fullWidth
                label={
                  <div className="input-field-label">
                    <Inventory2OutlinedIcon color="primary" />
                    <span>Live Sale Code</span>
                  </div>
                }
                color="primary"
                value={product.data.sale_code || ""}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="inputContainer">
              <TextField
                id="outlined-error-helper-text"
                fullWidth
                label={
                  <div className="input-field-label">
                    <Inventory2OutlinedIcon color="primary" />
                    <span>Unit</span>
                  </div>
                }
                color="primary"
                value={product.data.unit || ""}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="inputContainer">
              <TextField
                id="outlined-error-helper-text"
                fullWidth
                label={
                  <div className="input-field-label">
                    <ListIcon color="primary" />
                    <span>Quantity</span>
                  </div>
                }
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
                value={product.data.quantity || ""}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="imageUpload">
              {product.data.image ? (
                <img
                  className="productimage"
                  src={`${process.env.REACT_APP_API_BASE_URL}/storage/${product.data.image}`}
                  alt="productimage"
                />
              ) : (
                // <p style={{ paddingLeft: "10px" }}>{image}}</p>
                <p style={{ paddingLeft: "10px" }}>No Image</p>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="inputContainer">
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label={
                  <div className="input-field-label">
                    <DescriptionIcon color="primary" />
                    <span>Description</span>
                  </div>
                }
                multiline
                rows={6}
                color="primary"
                InputProps={{
                  readOnly: true,
                }}
                value={product.data.description || ""}
              />
            </div>
          </Grid>
        </Grid>
      ) : null}
      {!isLoading && isError ? <AlertBox message={message} /> : null}
    </Box>
  );
}

export default ProductDetail;
