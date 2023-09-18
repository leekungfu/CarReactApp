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
import dayjs from "dayjs";
import { SERVER_RESPOND_DATE_TIME_FORMAT } from "../../../shared/configs/constants";
import ConfirmPaymentDeposit from "../../Modals/ConfirmPaymentDeposit";

const Payments = (props) => {
  const { carId, pickUpTime, returnTime, deposit } = props;
  
  const [paymentMethod, setPaymentMethod] = useState();
  const [openConfirmPaymentDeposit, setOpenConfirmPaymentDeposit] = useState(false);
  const pickUpTimeFormated = dayjs(pickUpTime).format(SERVER_RESPOND_DATE_TIME_FORMAT);
  const returnTimeFormated = dayjs(returnTime).format(SERVER_RESPOND_DATE_TIME_FORMAT);

  const formData = new FormData();
  formData.append("carId", carId);
  formData.append("startDate", pickUpTimeFormated);
  formData.append("endDate", returnTimeFormated);
  formData.append("deposit", deposit);
  formData.append("paymentMethod", paymentMethod);

  const handleClickConfirm = async () => {
    setOpenConfirmPaymentDeposit(true);
  };

  const handleCloseConfirmPaymentDeposit = () => {
    setOpenConfirmPaymentDeposit(false);
  }

  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight="bold">
          Please select your payment method
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "red" }}
        >
          **The deposit amount will be deducted from your wallet.**
        </Typography>
        <FormControl sx={{ mt: 1 }}>
          <RadioGroup
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            <FormControlLabel
              control={<Radio value="Wallet" color="primary" />}
              label="My Wallet"
            />
            <Typography variant="subtitle1" sx={{ ml: 7 }}>
              Current balance:{" "}
              <span style={{ color: "#38b000", fontWeight: "bold" }}>
                20.000.000 VND
              </span>
            </Typography>
            <FormControlLabel
              control={<Radio value="Cash" color="primary" />}
              label="Cash"
            />
            <Typography variant="subtitle1" sx={{ ml: 7 }}>
              Our operator will contact you for further instruction.
            </Typography>
            <FormControlLabel
              control={<Radio value="Bank_transfer" color="primary" />}
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
      </Stack>
      <ConfirmPaymentDeposit open={openConfirmPaymentDeposit} onClose={handleCloseConfirmPaymentDeposit} formData={formData} deposit={deposit} />
    </div>
  );
};

export default Payments;
