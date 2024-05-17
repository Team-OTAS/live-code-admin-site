import React, { useState } from "react";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../redux/features/productReducer";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ListIcon from "@mui/icons-material/List";
import DescriptionIcon from "@mui/icons-material/Description";
import SuccessBox from "../../Components/modalBox/successBox";
import AlertBox from "../../Components/modalBox/AlertBox";
import EditIcon from "@mui/icons-material/Edit";
import WaitingBox from "../../Components/modalBox/Waiting";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./../../Styles/addstock.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Stock name is required"),
  price: Yup.string().required("Price is required"),
  quantity: Yup.string().required("quantity is required"),
  sale_code: Yup.string().required("salecode is required"),
  unit: Yup.string().required("unit is required"),
  description: Yup.string().required("description is required"),
});

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

function CreateProdcut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.stocks
  );

  const [file, setFile] = useState("");
  const shopId = localStorage.getItem("shopId");

  function hundleFileChange(e) {
    setFile(e.target.files[0]);
    console.log(file);
  }

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box
        sx={{
          border: "1px solid #000",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Grid item xs={12} className="formHeader">
          <p className="header">Add new Stock</p>
          <Link to="/">
            <CancelOutlinedIcon sx={{ marginBottom: "50px" }} />
          </Link>
        </Grid>

        <Formik
          initialValues={{
            name: "",
            price: "",
            quantity: "",
            sale_code: "",
            unit: "",
            description: "",
            shop_id: shopId,
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);

            dispatch(createProduct(values));
          }}
        >
          {(
            { isSubmitting, errors, touched, setFieldValue } // Passing errors and touched here
          ) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Field
                    as={TextField}
                    type="text"
                    name="name"
                    label={
                      <div className="input-field-label">
                        <Inventory2OutlinedIcon color="primary" />
                        <span>Stock Name</span>
                      </div>
                    }
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.name && touched.name)} // Using errors and touched here
                    helperText={<ErrorMessage name="name" />}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={TextField}
                    type="number"
                    name="price"
                    label={
                      <div className="input-field-label">
                        <AttachMoneyOutlinedIcon color="primary" />
                        <span>Price</span>
                      </div>
                    }
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.price && touched.price)} // Using errors and touched here
                    helperText={<ErrorMessage name="price" />}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={TextField}
                    type="number"
                    name="quantity"
                    label={
                      <div className="input-field-label">
                        <ListIcon color="primary" />
                        <span>Quantity</span>
                      </div>
                    }
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.quantity && touched.quantity)} // Using errors and touched here
                    helperText={<ErrorMessage name="quantity" />}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={TextField}
                    type="text"
                    name="sale_code"
                    label={
                      <div className="input-field-label">
                        <Inventory2OutlinedIcon color="primary" />
                        <span>Live Sale Code</span>
                      </div>
                    }
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.sale_code && touched.sale_code)} // Using errors and touched here
                    helperText={<ErrorMessage name="sale_code" />}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    as={TextField}
                    type="text"
                    name="unit"
                    label={
                      <div className="input-field-label">
                        <Inventory2OutlinedIcon color="primary" />
                        <span>Unit</span>
                      </div>
                    }
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.unit && touched.unit)} // Using errors and touched here
                    helperText={<ErrorMessage name="unit" />}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className="imageUpload" style={{ marginTop: "17px" }}>
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
                            onChange={(event) => {
                              setFile(event.target.files[0]);
                              setFieldValue("image", event.target.files[0]);
                            }}
                          />
                          <EditIcon />
                        </IconButton>
                        <p className="imageName">{file.name}</p>
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
                        >
                          <AttachFileIcon />
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => {
                              setFile(event.target.files[0]);
                              setFieldValue("image", event.target.files[0]);
                            }}
                          />
                        </Button>
                      </Box>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="text"
                    name="description"
                    label={
                      <div className="input-field-label">
                        <DescriptionIcon color="primary" />
                        <span>Description</span>
                      </div>
                    }
                    multiline
                    rows={6}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.description && touched.description)} // Using errors and touched here
                    helperText={<ErrorMessage name="description" />}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <div>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      variant="contained"
                      color="vaild"
                      sx={{ margin: "0" }}
                      // onClick={hundleSubmit}
                    >
                      Create A New Stock
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default CreateProdcut;
