import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "./../../api/axios";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
  user_name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AddUser = () => {
  const navigate = useNavigate();
  // const [createUser, data] = useCreateUserMutation();
  // console.log(data.error);

  const createUser = async (data) => {
    try {
      await axios.post("/api/users", data);
      Swal.fire({
        icon: "success",
        text: "Create User Successful",
      });
      showMessage();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Try again later",
      });
    }
  };

  const showMessage = () => {
    setTimeout(() => {
      navigate("/setting");
    }, 2000);
    // console.log("success");
  };

  return (
    <Box sx={{ padding: "0 20px" }}>
      <h1>Add User</h1>
      <Formik
        initialValues={{
          user_name: "",
          email: "",
          password: "",
          user_type_id: "2",
          shop_id: localStorage.getItem("shopId"),
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // Handle form submission
          console.log(values);
          // setUser(values);
          await createUser(values);
          showMessage();
          setSubmitting(false);
        }}
      >
        {(
          { isSubmitting, errors, touched } // Passing errors and touched here
        ) => (
          <Form>
            <Field
              as={TextField}
              type="text"
              name="user_name"
              label="UserName"
              variant="outlined"
              margin="normal"
              fullWidth
              error={Boolean(errors.user_name && touched.user_name)} // Using errors and touched here
              helperText={<ErrorMessage name="user_name" />}
            />
            <Field
              as={TextField}
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              error={Boolean(errors.email && touched.email)} // Using errors and touched here
              helperText={<ErrorMessage name="email" />}
            />
            <Field
              as={TextField}
              type="password"
              name="password"
              label="passwrord"
              variant="outlined"
              margin="normal"
              fullWidth
              error={Boolean(errors.password && touched.password)} // Using errors and touched here
              helperText={<ErrorMessage name="password" />}
            />
            <Field name="user_type_id">
              {({ field }) => (
                <RadioGroup row aria-label="user_type_id" {...field}>
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Staff"
                  />
                </RadioGroup>
              )}
            </Field>
            <Button type="submit" disabled={isSubmitting} variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {/* {data.error && <AlertBox message={data.error.data.message} />}
      {data.success && <SuccessBox message={"User Added Successfully"} />} */}
    </Box>
  );
};

export default AddUser;
