import React, { useState } from "react";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ListIcon from "@mui/icons-material/List";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import axios from "axios";
import knayi from "knayi-myscript";

import "./../../Styles/addstock.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Stock name is required"),
  price: Yup.string().required("Price is required"),
  quantity: Yup.string().required("quantity is required"),
  sale_code: Yup.string().required("salecode is required"),
  unit: Yup.string().required("unit is required"),
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
  const { t } = useTranslation();
  const labelOne = t("stkformlbelone");
  const labelTwo = t("stkformlbeltwo");
  const labelThree = t("stkformlbelthree");
  const labelFour = t("stkformlbelfour");
  const labelFive = t("stkformlbelfive");
  const labelSix = t("stkformlbelsix");
  const labelSeven = t("stkformlbelseven");
  const addbtn = t("addStockBtn");
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const shopId = localStorage.getItem("shopId");

  const convertToUnicode = (text) => {
    return knayi.fontConvert(text, "unicode");
  };

  const createProduct = async (values) => {
    try {
      await axios.post("/api/products", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Stock Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

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
          <p className="header">{addbtn}</p>
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
            description: null,
            shop_id: shopId,
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const convertedValues = {
              ...values,
              name: convertToUnicode(values.name),
            };
            setSubmitting(false);
            createProduct(convertedValues);
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
                        <span>{labelOne}</span>
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
                        <span>{labelTwo}</span>
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
                        <span>{labelThree}</span>
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
                        <span>{labelFour}</span>
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
                        <span>{labelFive}</span>
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
                          <span>{labelSix}</span>
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
                        <span>{labelSeven}</span>
                      </div>
                    }
                    multiline
                    rows={6}
                    variant="outlined"
                    margin="normal"
                    fullWidth
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
                      {addbtn}
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
