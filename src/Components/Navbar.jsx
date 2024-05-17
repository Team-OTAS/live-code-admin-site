import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LiveCodeLogo from "./../assets/images/logo.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { getShopData } from "../redux/features/shopDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./../Styles/navbar.css";
import AccMenu from "./AccMenu";
import DrawerSlide from "./DrawerSlide";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const drawerWidth = 240;

export default function Navbar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = localStorage.getItem("shopId");
  const { loading, error, shopData } = useSelector((state) => state.ShopData);
  const [navtitle, setNavtitle] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showmenu, setShowmenu] = useState(false);
  const { t } = useTranslation();
  // console.log(location.pathname);

  function getTitle() {
    if (location.pathname.includes("stock") || location.pathname === "/") {
      setNavtitle(t("navTitle"));
    }
    if (location.pathname.includes("live")) {
      setNavtitle(t("navTitle2"));
    }
    if (location.pathname.includes("order")) {
      setNavtitle(t("navTitle3"));
    }
    if (location.pathname.includes("setting")) {
      setNavtitle("Setting");
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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

  useEffect(() => {
    dispatch(getShopData(id));
    // console.log(shopData);
  }, []);

  useEffect(() => {
    getTitle();
  }, [location.pathname, t]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        LiveCode
      </Typography>
      <Divider />
      <DrawerSlide Title={getTitle} />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="secondary"
        sx={{ p: "10px", display: { xs: "block", md: "none" } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <img src={LiveCodeLogo} alt="LiveCodeLogo" />
          </Box>

          <Typography component="div" sx={{ flexGrow: 1 }}>
            <p className="navTitle">{navtitle || props.title}</p>
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              borderRadius: "10px",
              border: "1px solid #000000",
              padding: "10px",
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => {
              setShowmenu(!showmenu);
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
              className="avatars"
            />
            {shopData && (
              <div className="userName">
                <p style={{ marginBottom: "10px" }}>{shopData.data.name}</p>
                <span>{getexpire(shopData.data.expire_at)}</span>
              </div>
            )}

            {showmenu && (
              <div className="menu">
                <Button
                  onClick={() => {
                    // props.title = "setting";
                    navigate("/setting");
                  }}
                >
                  <span>Setting</span>
                </Button>
                <Button onClick={() => navigate("/fblogin")}>
                  <span>FB Connect</span>
                </Button>
                <Button onClick={() => navigate("/login")}>
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </Stack>

          <Stack sx={{ display: { xs: "block", md: "none" } }}>
            <AccMenu />
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
