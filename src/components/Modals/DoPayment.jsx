import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCustomHook } from "../../App";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../Hooks/useSnackBar";
import { updateBookingStatus } from "../ReduxToolkit/BookingSlice";
import GoToWallet from "./GoToWallet";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  border: "1px solid",
  p: 3,
  textAlign: "center",
};

const DoPayment = (props) => {
  const { userData: user, save } = useCustomHook();
  const { open, onClose, booking, car, cost } = props;
  const bookingId = booking.bookingId;
  const plateNumber = car.plateNumber;
  const { createSnack } = useSnackbar();
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
  };
  const [openWallet, setOpenWallet] = useState(false);
  const handleClickOpenWallet = () => {
    setOpenWallet(true);
  };
  const handleCloseWallet = () => {
    setOpenWallet(false);
  };
  const dispatch = useDispatch();
  const handleClickYes = async () => {
    const token = localStorage.getItem("jwtToken");
    if (user.wallet >= Math.abs(cost)) {
      const { data: response } = await axiosInstance.post(
        `/customer/updateBookingStatus/${bookingId}`,
        null,
        {
          params: {
            status: "Completed",
            plateNumber,
            cost,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
      if (response.isSuccess === true) {
        createSnack(response.message, { severity: "success" });
        const newStatus = response.booking.bookingStatus;
        dispatch(updateBookingStatus({ bookingId, newStatus }));
        save(response.booking.member);
        navigate("/booking");
        window.scrollTo({ top: 0, behavior: "auto" });
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Notification</Typography>
          <Divider />
          <Typography sx={{ mt: 2 }} variant="body1">
            Please confirm that you will pay{" "}
            {Number(Math.abs(cost)).toLocaleString()} (VND) for the car owner.
            The cost will be deducted from your wallet.
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
      </Modal>
      <GoToWallet open={openWallet} onClose={handleCloseWallet} />
    </div>
  );
};

DoPayment.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DoPayment;
