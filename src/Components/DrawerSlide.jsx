import LiveCodeLogo from "./../assets/images/logo.png";
import React, { useState } from "react";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import "./../Styles/drawer.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function DrawerSlide({ Title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const id = localStorage.getItem("shopId");
  const { shopData } = useSelector((state) => state.ShopData);
  const navTitle = [t("navTitle"), t("navTitle2"), t("navTitle3")];
  const [showmenu, setShowmenu] = useState(false);
  const getexpire = (times) => {
    const date = new Date(times);
    const expireTime = date.getTime() - Date.now();
    const expireDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}(${Math.trunc(
      expireTime / 1000 / 60 / 60 / 24
    )} Days Lefts)`;
    return expireDate;
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const activeClass = () => {
    if (location.pathname === "/") {
      return "slidebtn active";
    }
    if (location.pathname.includes("stock")) {
      return "slidebtn active";
    }
    return "slidebtn";
  };

  const activeClass2 = () => {
    if (location.pathname.includes("order")) {
      return "slidebtn active";
    }
    return "slidebtn";
  };

  return (
    <div className="DrawContainer">
      <div>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <img src={LiveCodeLogo} alt="LiveCodeLogo" />
          </div>
        </Box>

        <div>
          <NavLink to="/" className={activeClass}>
            <ManageAccountsOutlinedIcon />
            <span className="btnText">{navTitle[0]}</span>
          </NavLink>

          {/* <Button
            sx={{ m: 2, border: "1px solid rgba(0,0,0,0.2)", width: "200px" }}
            disabled
          >
            <ManageAccountsOutlinedIcon />
            <span className="btnText">Contact List</span>
          </Button>

          <Button
            sx={{ m: 2, border: "1px solid rgba(0,0,0,0.2)", width: "200px" }}
            disabled
          >
            <span className="btnText">Live Comment Replies</span>
          </Button> */}

          <NavLink
            to="/live"
            className={({ isActive }) =>
              isActive ? "slidebtn active" : "slidebtn"
            }
          >
            <StorefrontOutlinedIcon />
            <span className="btnText">{navTitle[1]}</span>
          </NavLink>

          <NavLink to="/order" className={activeClass2}>
            <ShoppingCartOutlinedIcon />
            <span className="btnText">{navTitle[2]}</span>
          </NavLink>
        </div>
      </div>

      <Box
        sx={{
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          padding: "20px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "10px", display: { xs: "none", md: "flex" } }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
            className="avatars"
            onClick={() => {
              // props.title = "setting";
              navigate("/setting");
            }}
          />
          {shopData && (
            <div className="userName">
              <p style={{ marginBottom: "5px" }}>{shopData.data.name}</p>
              <span>{getexpire(shopData.data.expire_at)}</span>
            </div>
          )}
        </Stack>
        <Box>
          <Button
            sx={{
              width: "100%",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "1px solid #000000",
              padding: "5px",
              cursor: "pointer",
              fontSize: "10px",
              ":hover": {
                background: "#4d3f3f",
                color: "#ffffff",
              },
            }}
            onClick={() => {
              // props.title = "setting";
              navigate("/fblogin");
            }}
          >
            <FacebookIcon sx={{ paddingRight: "5px" }} />
            Facebook Connect
          </Button>
          <Button
            sx={{
              width: "100%",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "1px solid #000000",
              padding: "5px",
              cursor: "pointer",
              fontSize: "10px",
              ":hover": {
                background: "#4d3f3f",
                color: "#ffffff",
              },
            }}
            onClick={logout}
          >
            <SettingsIcon sx={{ paddingRight: "5px" }} />
            Logout
          </Button>
        </Box>
      </Box>
      {/* <div style={{ width: "100%" }}>
            <LanguageSelecter />
          </div> */}
    </div>
  );
}
