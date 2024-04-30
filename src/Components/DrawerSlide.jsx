import LiveCodeLogo from "./../assets/images/logo.png";
import React from "react";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import "./../Styles/drawer.css";
import LanguageSelecter from "./languageSelecter/LanguageSelecter";
import { Button } from "@mui/material";

export default function DrawerSlide({ Title }) {
  const location = useLocation();
  // console.log(location.pathname);
  const { t } = useTranslation();
  const navTitle = [t("navTitle"), t("navTitle2"), t("navTitle3")];

  function changeTitle(title) {
    console.log(title);
    Title(title);
  }

  const activeClass = () => {
    if (location.pathname === "/") {
      return "slidebtn active";
    }
    if (location.pathname.includes("stock")) {
      return "slidebtn active";
    }
    return "slidebtn";
  };

  return (
    <div className="DrawContainer">
      {/* <Box sx={{ display: { xs: "none", md: "block" }, marginBottom: "50px" }}>
        <img src={LiveCodeLogo} alt="LiveCodeLogo" />
      </Box> */}

      <div>
        <NavLink
          to="/"
          className={activeClass}
          // className={({ isActive }) =>
          //   isActive ? "slidebtn active" : "slidebtn"
          // }
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

      {/* <div>
        <Button variant="" sx={{}} onClick={() => window.print()}>
          Print
        </Button>
      </div> */}

      <div style={{ width: "100%" }}>
        <LanguageSelecter />
      </div>
    </div>
  );
}
