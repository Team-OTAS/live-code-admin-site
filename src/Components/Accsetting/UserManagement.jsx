import React from "react";
import { Box, Button } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccUserTable from "./AccUserTable";
import { Link } from "react-router-dom";

function UserManagement() {
  return (
    <Box>
      <div className="buttonContainer">
        <Link to="/adduser" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              width: "200px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Add User</span>
            <PersonAddAltOutlinedIcon />
          </Button>
        </Link>
      </div>
      <AccUserTable />
    </Box>
  );
}

export default UserManagement;
