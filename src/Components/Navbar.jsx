import React, { useState } from "react";
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

import "./../Styles/navbar.css";
import AccMenu from "./AccMenu";
import DrawerSlide from "./DrawerSlide";
import { useNavigate } from "react-router";

const drawerWidth = 240;

export default function Navbar(props) {
  const navigate = useNavigate();
  console.log(props);
  const [navtitle, setNavtitle] = useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function getTitle(title) {
    console.log("nav", title);
    setNavtitle(title);
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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
      <AppBar position="static" color="secondary" sx={{ p: "10px" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
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
            }}
            onClick={() => {
              navigate("/setting");
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
              className="avatars"
            />
            <div className="userName">
              <p>nyonyolwin32</p>
              <span>1 / 6 / 2024(179 Days Left)</span>
            </div>
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
