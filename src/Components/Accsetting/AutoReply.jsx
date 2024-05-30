import React, { useEffect, useRef, useState } from "react";
import { Box, Grid } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { getShopData } from "./../../redux/features/shopDataSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "./../../api/axios";
import Swal from "sweetalert2";

function AutoReply() {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { shopData } = useSelector((state) => state.ShopData);
  const [auto_reply, setAutoReply] = useState("");
  const inputRef = useRef(null);
  const id = localStorage.getItem("shopId"); // eslint-disable-next-lin
  // console.log(shop);

  const editAutoReply = () => {
    setEdit(true);
    inputRef.current.focus();
  };

  const discardEdit = () => {
    setEdit(false);
  };

  const saveAutoReply = async () => {
    setEdit(false);
    const data = {
      auto_reply,
    };
    try {
      const res = await axios.post(
        `api/shops/${id}/auto-reply?_method=PATCH`,
        data
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Auto Reply Message Saved",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    dispatch(getShopData(id));
  }, []);

  useEffect(() => {
    if (shopData) {
      setAutoReply(shopData.data.auto_reply);
    }
  }, [shopData]);

  return (
    <Box
      sx={{
        marginTop: { xs: "20px", md: "0" },
        padding: { xs: "20px 0 20px 20px", md: "0" },
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
          <p className="page-header">Auto Reply</p>
          <button className="edit-btn" onClick={editAutoReply}>
            Edit Auto Reply
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
        </div>
      </div>
      <Grid container spacing={2} sx={{ paddingRight: "25px" }}>
        {shopData && (
          <Grid item xs={12}>
            <Box className="shopLogo">
              <div style={{ padding: "10px 0" }}>
                <label className="title-logo">
                  <SendOutlinedIcon /> Auto Reply Message
                </label>
                <br />
                <textarea
                  type="text"
                  className="receipt-body"
                  rows={6}
                  onChange={(e) => setAutoReply(e.target.value)}
                  value={auto_reply}
                  readOnly={!edit}
                  ref={inputRef}
                ></textarea>
              </div>
            </Box>
          </Grid>
        )}
      </Grid>
      {edit && (
        <div className="btn-container">
          <button className="discard" onClick={discardEdit}>
            Discard
          </button>
          <button className="save" onClick={saveAutoReply}>
            Save Edit
          </button>
        </div>
      )}
    </Box>
  );
}

export default AutoReply;
