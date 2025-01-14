import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../Hooks/useSnackBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "1px solid",
  py: 3,
  textAlign: "center",
};

const LogOutt = (props) => {
  const { open, onClose } = props;
  const { createSnack } = useSnackbar();
  const handleClose = () => {
    onClose();
  };

  const token = localStorage.getItem("jwtToken");
  const handleClick = async (event) => {
    event.preventDefault();
    const response = await axiosInstance.post("/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.isSuccess === true) {
      localStorage.clear();
      window.location.href = "/";
    }
    createSnack("Failed!", { severity: "eror" });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ mb: 1 }} variant="h6">
            Log out
          </Typography>
          <Divider />
          <Typography sx={{ mt: 2 }} variant="subtitle1">
            Do you want to exit?
          </Typography>
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              sx={{
                minWidth: "20%",
              }}
              onClick={handleClose}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              sx={{
                minWidth: "20%",
              }}
              onClick={handleClick}
              variant="outlined"
            >
              OK
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

LogOutt.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LogOutt;
