import LiveCodeLogo from "./../assets/images/logo.png";
import React from "react";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./../Styles/drawer.css";
import LanguageSelecter from "./languageSelecter/LanguageSelecter";

export default function DrawerSlide({ Title }) {
  const { t } = useTranslation();
  const navTitle = [t("navTitle"), "Live Sale", "Order Management"];

  function changeTitle(title) {
    console.log(title);
    Title(title);
  }

  return (
    <div className="DrawContainer">
      {/* <Box sx={{ display: { xs: "none", md: "block" }, marginBottom: "50px" }}>
        <img src={LiveCodeLogo} alt="LiveCodeLogo" />
      </Box> */}

      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "slidebtn active" : "slidebtn"
          }
          onClick={() => changeTitle(navTitle[0])}
        >
          <ManageAccountsOutlinedIcon />
          <span className="btnText">{navTitle[0]}</span>
        </NavLink>

        <NavLink
          to="/live"
          className={({ isActive }) =>
            isActive ? "slidebtn active" : "slidebtn"
          }
          onClick={() => changeTitle(navTitle[1])}
        >
          <StorefrontOutlinedIcon />
          <span className="btnText">{navTitle[1]}</span>
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            isActive ? "slidebtn active" : "slidebtn"
          }
          onClick={() => changeTitle(navTitle[2])}
        >
          <ShoppingCartOutlinedIcon />
          <span className="btnText">{navTitle[2]}</span>
        </NavLink>
      </div>

      <div style={{ width: "100%" }}>
        <LanguageSelecter />
      </div>
    </div>
  );
}
