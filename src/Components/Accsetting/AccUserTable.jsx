import React, { useEffect } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import AlertBox from "../modalBox/AlertBox";
import EditIcon from "@mui/icons-material/Edit";
import {
  useGetAllUserQuery,
  useDeleteUserMutation,
} from "./../../redux/features/userApiSlice";

import "./../../Styles/dashboard.css";
import Swal from "sweetalert2";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";

function CustomToolbar() {
  return (
    <GridToolbarContainer className="toolbarContainer">
      {/* <GridToolbarFilterButton /> */}
      <GridToolbarColumnsButton />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

const AccUserTable = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading, message } = useGetAllUserQuery();
  const fetchUser = useGetAllUserQuery();
  const [deleteUser, { isLoading: loading, isError: error }] =
    useDeleteUserMutation();

  const deleteAccUser = (id) => {
    console.log(id);
    deleteUser(id);
    fetchUser.refetch();
  };
  // console.log(data);

  useEffect(() => {
    fetchUser.refetch();
  }, []);

  const columns = [
    {
      field: "no",
      headerName: "No",
      width: 100,
    },
    { field: "user_name", headerName: "User Name", width: 300 },
    {
      field: "user_type",
      headerName: "User Type",
      width: 200,
      renderCell: (params) => (
        <span>{params.row.user_type_id === 2 ? "Admin" : "staff"}</span>
      ),
    },
    {
      field: "permission",
      headerName: "Permission",
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            background: "#4d3f3f",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            fontSize: "14px",
          }}
        >
          {params.row.user_type_id === 2 ? "All access" : "Customer Management"}
        </Box>
      ),
    },

    {
      field: "actions",
      headerName: "",
      width: 300,
      renderCell: (params) => (
        <div>
          <Button
            sx={{
              background: "#354E8E",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              marginRight: "10px",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#fff",
                border: "3px solid #354E8E",
                color: "#354E8E",
              },
            }}
            variant="filled"
            onClick={() => navigate(`/accdetail/${params.row.id}`)}
          >
            <EditIcon sx={{ fontSize: "28px" }} />
          </Button>
          {params.row.user_type_id === 3 ? (
            <Button
              sx={{
                background: "red",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#fff",
                  border: "3px solid red",
                  color: "red",
                },
              }}
              variant="filled"
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
                    deleteAccUser(params.row.id);
                  }
                })
              }
              // onClick={() => deleteAccUser(params.row.id)}
            >
              <DeleteOutlineOutlinedIcon sx={{ fontSize: "28px" }} />
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: { xs: 600, md: 500 } }}>
      {isLoading && (
        <div className="loading">
          <LinearProgress />
        </div>
      )}
      {!isLoading && !isError && data && (
        <DataGrid
          rows={data.data.data.map((row, index) => ({ ...row, no: index + 1 }))}
          columns={columns}
          pageSize={12}
          // checkboxSelection
          loading={isLoading}
          disableRowSelectionOnClick
          slots={{
            toolbar: CustomToolbar,
            loadingOverlay: LinearProgress,
          }}
        />
      )}
      {!isLoading && isError ? <AlertBox message={message} /> : null}
    </Box>
  );
};

export default AccUserTable;
