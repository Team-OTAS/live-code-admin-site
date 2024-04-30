import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, IconButton, TextField } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ListIcon from "@mui/icons-material/List";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AlertBox from "../../Components/modalBox/AlertBox";
import { updateProduct, getProduct } from "../../redux/features/productReducer";
import SuccessBox from "../../Components/modalBox/successBox";
import Loading from "../../Components/Loading";
import EditIcon from "@mui/icons-material/Edit";
import { deleteProduct } from "../../redux/features/productdeleteSlice";
import Swal from "sweetalert2";

import "./../../Styles/addstock.css";

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

function EditProduct() {
  const dispatch = useDispatch();

  const deletes = useSelector((state) => state.deleteproduct);
  const { product, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.stocks
  );
  const [showmessage, setShowmessage] = useState(false);
  const [local, setlocal] = useState(false);
  const { id } = useParams();
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [sale_code, setSale_code] = useState();
  const [unit, setUnit] = useState();

  function hundleFileChange(e) {
    setFile(e.target.files[0]);
    setlocal(true);
  }

  function hundleSubmit(e) {
    e.preventDefault();
    const shopId = localStorage.getItem("shopId");
    const formData = {
      shop_id: shopId,
      name: name,
      price: price,
      quantity: quantity,
      description: description,
      unit: unit,
      sale_code: sale_code,
      image: file || null,
    };
    // console.log(formData);
    dispatch(updateProduct({ id, formData }));
  }

  function deleteHandleClick() {
    const data = {
      productIds: [id * 1],
    };
    dispatch(deleteProduct(data));
    setShowmessage(true);
  }

  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.data.name);
      setPrice(product.data.price);
      setQuantity(product.data.quantity);
      setDescription(product.data.description);
      setFile(product.data.image);
      setSale_code(product.data.sale_code);
      setUnit(product.data.unit);
    }
  }, [product]);

  // console.log(product);

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
          <Grid
            item
            xs={8}
            md={12}
            sx={{ display: { xs: "block", md: "flex" } }}
          >
            <p className="header">Edit Stock</p>
            <Chip
              label={
                <div className="input-field-label">
                  <InfoOutlinedIcon />
                  <span style={{ color: "white", marginLeft: "10px" }}>
                    Created:{" "}
                    {new Date(product.data.created_at).toLocaleDateString()}
                  </span>
                </div>
              }
              color="primary"
              sx={{
                marginX: { xs: "0", md: "20px" },
                marginTop: { xs: "10px", md: "0" },
              }}
            />
            <Grid sx={{ display: { xs: "block", md: "none" } }}>
              <br />
            </Grid>
            <Chip
              label={
                <div className="input-field-label">
                  <InfoOutlinedIcon />
                  <span style={{ color: "white", marginLeft: "10px" }}>
                    Updated :{" "}
                    {new Date(product.data.updated_at).toLocaleDateString()}
                  </span>
                </div>
              }
              color="primary"
            />
          </Grid>
          <Grid item xs={4} sx={{ display: { xs: "block", md: "none" } }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e81609",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "20px 35px",
              }}
              onClick={deleteHandleClick}
            >
              <DeleteForeverOutlinedIcon
                sx={{ fontSize: 40 }}
                className="deleteIcon"
              />
              <span>Remove</span>
            </Button>
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
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
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
                value={price || ""}
                onChange={(e) => setPrice(e.target.value)}
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
                value={sale_code || ""}
                onChange={(e) => setSale_code(e.target.value)}
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
                value={unit || ""}
                onChange={(e) => setUnit(e.target.value)}
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
                value={quantity || ""}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="imageUpload">
              {file ? (
                <Box>
                  <IconButton
                    component="label"
                    variant="filled"
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      borderRadius: "10px",
                      background: "#354e8e",
                      color: "#fff",
                      "&:hover": {
                        color: "#354e8e",
                      },
                    }}
                  >
                    <VisuallyHiddenInput
                      type="file"
                      onChange={hundleFileChange}
                    />

                    <EditIcon />
                  </IconButton>
                  {local ? (
                    <p className="imageName">{file.name}</p>
                  ) : (
                    <img
                      className="productimage"
                      src={`https://api.livecodemm.com/storage/${
                        product.data.image || "noimage.png"
                      }`}
                      alt="productimage"
                    />
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "80%",
                    padding: "5px",
                  }}
                >
                  <div className="input-field-label">
                    <ImageOutlinedIcon color="primary" />
                    <span>Image</span>
                  </div>
                  <Button
                    component="label"
                    variant="contained"
                    color="vaild"
                    // startIcon={}
                  >
                    <AttachFileIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={hundleFileChange}
                    />
                  </Button>
                </Box>
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
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
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={12} md={3}>
            <div>
              <Button
                fullWidth
                variant="contained"
                color="vaild"
                sx={{ margin: "0" }}
                onClick={hundleSubmit}
              >
                Update Stock
              </Button>
            </div>
          </Grid>
          {/* <Grid item xs={12} md={3}>
            <div>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ margin: "0" }}
              >
                Cancel The Edit
              </Button>
            </div>
          </Grid> */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Grid item xs={12} md={6}>
              <div>
                <Button
                  fullWidth
                  variant="outlined"
                  color="vaild"
                  sx={{ margin: "0" }}
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
}

export default EditProduct;
