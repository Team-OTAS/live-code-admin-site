import React from "react";
import { Box } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccUserTable from "./AccUserTable";
import { Link } from "react-router-dom";

function UserManagement() {
  return (
    <Box>
      <div className="buttonContainer">
        <Link to="/adduser" style={{ textDecoration: "none" }}>
          <button className="adduser">
            <span>Add User</span>
            <PersonAddAltOutlinedIcon className="adduserIcon" />
          </button>
        </Link>
      </div>
      <AccUserTable />
    </Box>
  );
}

export default UserManagement;
