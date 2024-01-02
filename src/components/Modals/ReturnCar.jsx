import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useCustomHook } from "../../App";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../Hooks/useSnackBar";
import { updateBookingStatus } from "../ReduxToolkit/BookingSlice";
import GoToWallet from "./GoToWallet";
import Review from "./Review";

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
  const { userData: user, save } = useCustomHook();
  const { open, onClose, booking, car, totalPrice } = props;
  const bookingId = booking.bookingId;
  const cost = car.deposit - totalPrice;
  const handleClose = () => {
    onClose();
  };
  const [openReview, setOpenReview] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const handleCloseReview = () => {
    setOpenReview(false);
  };
  const handleClickOpenReview = () => {
    setOpenReview(true);
  };
  const handleClickOpenWallet = () => {
    setOpenWallet(true);
  };
  const handleCloseWallet = () => {
    setOpenWallet(false);
  };

  const { createSnack } = useSnackbar();
  const dispatch = useDispatch();
  const handleClickAgree = async () => {
    const token = localStorage.getItem("jwtToken");
    const { data: response } = await axiosInstance.post(
      `/customer/updateBookingStatus/${bookingId}`,
      null,
      {
        params: {
          status:
            user.wallet >= Math.abs(cost) ? "Completed" : "Pending_payment",
          plateNumber: car.plateNumber,
          cost,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    handleClose();
    if (user.wallet >= Math.abs(cost)) {
      if (response.isSuccess === true) {
        handleClickOpenReview();
        createSnack(response.message, { severity: "success" });
        const newStatus = response.booking.bookingStatus;
        dispatch(updateBookingStatus({ bookingId, newStatus }));
        save(response.booking.member);
      } else {
        createSnack(response.message, { severity: "error" });
      }
    } else {
      handleClose();
      handleClickOpenWallet();
    }
  };

  return (
    <div>
      <StyledModal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Return car</Typography>
          <Divider />
          {cost && cost < 0 ? (
            <Typography sx={{ mt: 2 }} variant="body1">
              Please confirm to return the car. The remaining is{" "}
              {Number(Math.abs(cost)).toLocaleString()} (VND) will be deducted
              from your wallet.
            </Typography>
          ) : (
            <Typography sx={{ mt: 2 }} variant="body1">
              Please confirm to return the car. The exceeding is{" "}
              {Number(Math.abs(cost)).toLocaleString()} (VND) will be returned
              to your wallet.
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
      <GoToWallet open={openWallet} onClose={handleCloseWallet} />
    </div>
  );
};

ReturnCar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReturnCar;
