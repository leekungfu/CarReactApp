import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../Hooks/useSnackBar";
import { updateBookingStatus } from "../ReduxToolkit/BookingSlice";

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

const CancelBooking = (props) => {
  const { open, onClose, booking, car } = props;
  const { createSnack } = useSnackbar();
  const bookingId = booking.bookingId;
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };
  const handleClickYes = async () => {
    const token = localStorage.getItem("jwtToken");
    const cost = 0.0;
    const { data: response } = await axiosInstance.post(
      `/customer/updateBookingStatus/${bookingId}`,
      null,
      {
        params: {
          status: "Cancelled",
          plateNumber: car.plateNumber,
          cost,
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
    } else {
      createSnack(response.message, { severity: "error" });
    }
  };

  return (
    <div>
      <StyledModal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Confirm cancel booking</Typography>
          <Divider />
          <Typography sx={{ mt: 2 }} variant="body1">
            Do you want to cancel this booking? The action can not be undone.
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
              No
            </Button>
            <Button
              sx={{
                width: "20%",
              }}
              onClick={handleClickYes}
              variant="outlined"
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </StyledModal>
    </div>
  );
};

CancelBooking.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CancelBooking;
