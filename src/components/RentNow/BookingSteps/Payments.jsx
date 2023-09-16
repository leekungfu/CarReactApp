import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../../../shared/configs/axiosConfig";
import { useSnackbar } from "../../Hooks/useSnackBar";

const Payments = (props) => {
  const { carId, pickUpTime, returnTime, deposit } = props;
  const { createSnack } = useSnackbar();
  const [paymentMethod, setPaymentMethod] = useState();

  const handleClickConfirm = async () => {
    const token = localStorage.getItem("jwtToken");
    const formData = new FormData();
    formData.append("carId", carId);
    formData.append("startDate", pickUpTime);
    formData.append("endDate", returnTime);
    formData.append("deposit", deposit);
    formData.append("paymentMethod", paymentMethod);
    const { data: response } = await axiosInstance.post(
      "/customer/addBooking",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.isSuccess === true) {
      createSnack(response.message, { severity: "success" });
    } else {
      createSnack(response.message, { severity: "error" });
    }
  };

  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight="bold">
          Please select your payment method
        </Typography>
        <FormControl sx={{ mt: 1 }}>
          <RadioGroup
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            <FormControlLabel
              control={<Radio value="wallet" color="primary" />}
              label="My Wallet"
            />
            <Typography variant="subtitle1" sx={{ ml: 7 }}>
              Current balance:{" "}
              <span style={{ color: "#38b000", fontWeight: "bold" }}>
                20.000.000 VND
              </span>
            </Typography>
            <FormControlLabel
              control={<Radio value="cash" color="primary" />}
              label="Cash"
            />
            <Typography variant="subtitle1" sx={{ ml: 7 }}>
              Our operator will contact you for further instruction.
            </Typography>
            <FormControlLabel
              control={<Radio value="bank_transfer" color="primary" />}
              label="Bank Transfer"
            />
            <Typography variant="subtitle1" sx={{ ml: 7 }}>
              Our operator will contact you for further instruction.
            </Typography>
          </RadioGroup>
        </FormControl>
      </Box>
      <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          sx={{ width: "15%" }}
          onClick={handleClickConfirm}
        >
          Confirm payment
        </Button>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "red" }}
        >
          The deposit amount will be deducted from your wallet.
        </Typography>
      </Stack>
    </div>
  );
};

export default Payments;
