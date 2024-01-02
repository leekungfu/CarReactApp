import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useCustomHook } from "../../App";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../Hooks/useSnackBar";
import { addBookingResult } from "../ReduxToolkit/BookingResult";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "1px solid",
  p: 3,
  textAlign: "center",
};

const StyledModal = styled(Modal)`
  & .muimodal-backdrop: {
    backgroundcolor: "rgba(0, 0, 0, 0.15)";
  }
`;

const ConfirmPaymentDeposit = (props) => {
  const { open, onClose, formData, deposit } = props;
  const { createSnack } = useSnackbar();
  const { save } = useCustomHook();
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const data = useSelector((state) => state.driver.data);
  const token = localStorage.getItem("jwtToken");
  const handleClickYes = async () => {
    const { data: response } = await axiosInstance.post(
      "/customer/addBooking",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    handleClose();
    if (response.isSuccess === true) {
      console.log("Booking: ", response);
      dispatch(addBookingResult(response.booking));
      save(response.booking.member);
      createSnack(response.message, { severity: "success" });
    } else {
      createSnack(response.message, { severity: "error" });
    }
  };

  return (
    <div>
      <StyledModal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Confirm payment deposit</Typography>
          <Divider />
          <Typography sx={{ mt: 2 }} variant="body1">
            Please confirm that you will pay {Number(deposit).toLocaleString()}{" "}
            (VND) for this booking. The payment will be process as soon as
            possible. If you get any issues about payment, contact us via: 1900
            1009
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

ConfirmPaymentDeposit.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmPaymentDeposit;
