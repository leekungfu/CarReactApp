import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Review from "./Review";
import { useSnackbar } from "../Hooks/useSnackBar";
import { useDispatch } from "react-redux";
import axiosInstance from "../../shared/configs/axiosConfig";
import { updateBookingStatus } from "../ReduxToolkit/BookingSlice";
import styled from "styled-components";

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

const ReturnCar = (props) => {
  const { open, onClose, booking, car } = props;
  const bookingId = booking.bookingId;
  const handleClose = () => {
    onClose();
  };

  const [openReview, setOpenReview] = useState(false);

  const handleCloseReview = () => {
    setOpenReview(false);
  };
  const timeDifference = booking.startDate - booking.endDate + 1; // Khoảng thời gian tính bằng mili giây
  const totalMillisecondsInDay = 24 * 60 * 60 * 1000; // Tổng số mili giây trong một ngày
  const totalTime = Math.round(timeDifference / totalMillisecondsInDay); // Tổng số ngày

  const { createSnack } = useSnackbar();
  const dispatch = useDispatch();
  const handleClickAgree = async () => {
    const token = localStorage.getItem("jwtToken");
    const { data: response } = await axiosInstance.post(
      `/customer/updateBookingStatus/${bookingId}`,
      null,
      {
        params: {
          status: "Completed",
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
      setOpenReview(true);
    } else {
      createSnack(response.message, { severity: "error" });
    }
  };

  return (
    <div>
      <StyledModal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Return car</Typography>
          <Divider />
          {car && car.deposit > totalTime * car.price ? (
            <Typography sx={{ mt: 2 }} variant="body1">
              Please confirm to return the car. The remaining amount of{" "}
              {Number(car.deposit).toLocaleString()} (VND) will be deducted from
              your wallet.
            </Typography>
          ) : (
            <Typography sx={{ mt: 2 }} variant="body1">
              Please confirm to return the car. The exceeding amount of{" "}
              {Number(car.deposit).toLocaleString()} (VND) will be returned to
              your wallet.
            </Typography>
          )}
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
              onClick={handleClickAgree}
              variant="outlined"
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </StyledModal>
      <Review
        open={openReview}
        onClose={handleCloseReview}
        bookingId={bookingId}
      />
    </div>
  );
};

ReturnCar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReturnCar;
