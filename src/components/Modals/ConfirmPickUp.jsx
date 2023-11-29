import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../Hooks/useSnackBar";
import { useDispatch } from "react-redux";
import { updateBookingStatus } from "../ReduxToolkit/BookingSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid",
  p: 3,
  textAlign: "center",
};

const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }
`;


const ConfirmPickUp = (props) => {
  const { open, onClose, booking, car } = props;
  const { createSnack } = useSnackbar();
  const bookingId = booking.bookingId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
  };
  const cost = 0.0;
  const handleClickAgree = async () => {
    const token = localStorage.getItem("jwtToken");
    const { data: response } = await axiosInstance.post(
      `/customer/updateBookingStatus/${bookingId}`,
      null,
      {
        params: {
          status: "In_Progress",
          plateNumber: car.plateNumber,
          cost
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    handleClose();
    if (response.isSuccess === true) {
      console.log("Data: ", response);
      createSnack(response.message, { severity: "success" });
      const newStatus = response.booking.bookingStatus;
      dispatch(updateBookingStatus({ bookingId, newStatus }));
      navigate("/booking");
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      createSnack(response.message, { severity: "error" });
    }
  };

  return (
    <div>
      <StyledModal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Confirm pick up</Typography>
          <Divider />
          <Typography sx={{ mt: 2 }} variant="body1">
            Please confirm that you will pick this car up at the chosen time.
          </Typography>
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="end"
          >
            <Button
              sx={{
                width: "20%",
              }}
              onClick={handleClose}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              sx={{
                width: "20%",
              }}
              onClick={handleClickAgree}
              variant="outlined"
            >
              Agree
            </Button>
          </Stack>
        </Box>
      </StyledModal>
    </div>
  );
};

ConfirmPickUp.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmPickUp;
