import React, { useRef, useState } from "react";
import { Grid } from "@mui/material";
import { openModalB } from "./../redux/feature/modalSlice";
import { resdata } from "../redux/feature/randomUserSlice";
import axios from "axios";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PanoramaFishEyeOutlinedIcon from "@mui/icons-material/PanoramaFishEyeOutlined";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import CreateComplete from "../Components/CompleteCreateShop";

import "./../Styles/shopcreate.css";

function ShopCreate() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal);
  const [loading, setLoading] = useState(false);
  const nameref = useRef();
  const phoneref = useRef();
  const [packageid, setPackage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: nameref.current.value,
      phone: phoneref.current.value,
      subscription_plan_id: packageid,
    };
    submitData(data);
    setLoading(true);
  };

  const submitData = async (data) => {
    try {
      const res = await axios.post("/api/shops", data);
      if (res) {
        setLoading(false);
        // console.log("Its Work");
      }
      // console.log("response", res.data.data);
      phoneref.current.value = res.data.data.phone;
      dispatch(openModalB());
      dispatch(resdata(res.data.data));
      setLoading(false);
      return res.data;
    } catch (error) {
      if (error instanceof SyntaxError) {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question",
        });
      } else if (error) {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      }

      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (isModalOpen.modalB.isOpen) {
    return <CreateComplete />;
  }

  return (
    <div className="containers">
      {/* <CreateComplete /> */}
      <p className="titles">Create New Shop</p>
      {/* Shop Info */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div className="create-input">
            <StorefrontRoundedIcon className="create-input-icon" />
            <div>
              <label>Shop Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter Shop Name"
                ref={nameref}
                required
              />
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={4}>
          <div className="create-input">
            <LocalPhoneRoundedIcon className="create-input-icon" />
            <div>
              <label>Phone Number</label>
              <br />
              <input
                type="text"
                placeholder="Enter Ph Number"
                value={phoneref.current.value}
                ref={phoneref}
                required
              />
            </div>
          </div>
        </Grid>
      </Grid>

      {/* Package Plan */}
      <p className="title">Package Plan</p>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div
            className={
              packageid === 1 ? "PackegeContainer active" : "PackegeContainer"
            }
            onClick={() => setPackage(1)}
          >
            <PanoramaFishEyeOutlinedIcon className="circles" />
            <p>Easy Shop Package </p>
            <span>
              Please add your content here. Keep it short and simple. And smile
            </span>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div
            className={
              packageid === 2 ? "PackegeContainer active" : "PackegeContainer"
            }
            onClick={() => setPackage(2)}
          >
            <PanoramaFishEyeOutlinedIcon className="circles" />
            <p>Normal User Package</p>
            <span>
              Please add your content here. Keep it short and simple. And smile
            </span>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div
            className={
              packageid === 3 ? "PackegeContainer active" : "PackegeContainer"
            }
            onClick={() => setPackage(3)}
          >
            <PanoramaFishEyeOutlinedIcon className="circles" />
            <p>Advence Shop Package</p>
            <span>
              Please add your content here. Keep it short and simple. And smile
            </span>
          </div>
        </Grid>
      </Grid>

      {/* Button */}
      <div style={{ marginTop: "50px", textAlign: "end" }}>
        <button className="create-btn cancel">Cancel</button>
        <button className="create-btn create" onClick={handleSubmit}>
          Create Shop
        </button>
      </div>
    </div>
  );
}

export default ShopCreate;
