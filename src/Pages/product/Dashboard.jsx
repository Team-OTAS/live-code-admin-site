import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/features/productdeleteSlice";
import DataTable from "../../Components/product/DataTable";
import ProductDetail from "./ProductDetail";
import CreateProdcut from "./CreateProdcut";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProduct from "./EditProduct";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import "./../../Styles/dashboard.css";

export default function Dashboard() {
  const { t } = useTranslation();
  const title = t("navTitle");
  const addbtn = t("addStockBtn");
  const rembtn = t("remStockBtn");
  const dispatch = useDispatch();
  const deletes = useSelector((state) => state.deleteproduct);
  const [DeleteData, setDeleteData] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  // console.log(process.env.REACT_APP_API_BASE_URL);

  const handleDataFromTable = (data) => {
    setDeleteData(data);
    data.length === 0 ? setIsDisabled(true) : setIsDisabled(false);
  };

  function deleteHandleClick() {
    const data = {
      product_ids: DeleteData,
    };
    dispatch(deleteProduct(data));
    if (deletes.isError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: deletes.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: deletes.message,
      });
    }
    setIsDisabled(true);
  }

  return (
    <div>
      <div className="dashboardContent">
        <Box
          className="dashboardContent__header"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <p>{title}</p>
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Grid className="barContainer">
            <Link to="/addstock">
              <Button
                // size="large"
                color="primary"
                variant="contained"
                onClick={() => {
                  setDeleteData([]);
                }}
              >
                <AddBoxRoundedIcon sx={{ marginRight: "5px" }} />
                <span className="btnText">{addbtn}</span>
              </Button>
            </Link>
            <Button
              size="large"
              color="primary"
              variant="contained"
              sx={{ marginLeft: "10px" }}
              disabled={isDisabled}
              onClick={() =>
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteHandleClick();
                  }
                })
              }
              // onClick={deleteHandleClick}
            >
              <DeleteIcon />
              <span className="btnText">{rembtn}</span>
            </Button>
          </Grid>
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Grid className="barContainer">
            <Link to="/addstock">
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => {
                  setDeleteData([]);
                }}
              >
                <AddBoxRoundedIcon sx={{ marginRight: "5px" }} />
                <span className="btnText">Add</span>
              </Button>
            </Link>
            <Button
              size="large"
              color="primary"
              variant="contained"
              sx={{ marginLeft: "10px" }}
              disabled={isDisabled}
              onClick={() =>
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteHandleClick();
                  }
                })
              }
            >
              <DeleteIcon />
              <span className="btnText">Remove</span>
            </Button>
          </Grid>
        </Box>
        {/* Stock CRUD Route */}
        <Box>
          <Routes>
            <Route path="/addstock" element={<CreateProdcut />} />
            <Route
              path="/"
              element={<DataTable sendDataToDashboard={handleDataFromTable} />}
            />
            <Route path="/editstock/:id" element={<EditProduct />} />
            <Route path="/viewstock/:id" element={<ProductDetail />} />
          </Routes>
        </Box>
      </div>
    </div>
  );
}
