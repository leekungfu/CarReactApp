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
import moment from "moment";
import { SERVER_RESPOND_DATE_TIME_FORMAT } from "../../../shared/configs/constants";
import ConfirmPaymentDeposit from "../../Modals/ConfirmPaymentDeposit";
import { useCustomHook } from "../../../App";
import { useSelector } from "react-redux";

const Payments = (props) => {
  const { carId, pickUpTime, returnTime, deposit } = props;
  const { userData: user } = useCustomHook();
  const [paymentMethod, setPaymentMethod] = useState();
  const [openConfirmPaymentDeposit, setOpenConfirmPaymentDeposit] =
    useState(false);
  const pickUpTimeFormated = moment(pickUpTime).format(
    SERVER_RESPOND_DATE_TIME_FORMAT
  );
  const returnTimeFormated = moment(returnTime).format(
    SERVER_RESPOND_DATE_TIME_FORMAT
  );
  const datePart = pickUpTimeFormated.split("T")[0];
  const dateParts = datePart.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);
  const dateAsInt = year * 10000 + month * 100 + day;

  const driverData = useSelector((state) => state.driver.data);
  const formData = new FormData();
  formData.append("carId", carId);
  formData.append("startDate", pickUpTimeFormated);
  formData.append("endDate", returnTimeFormated);
  formData.append("deposit", deposit);
  formData.append("paymentMethod", paymentMethod);
  formData.append("bookingId", dateAsInt);
  formData.append("email", driverData.email);
  formData.append("fullName", driverData.fullName);
  formData.append("birthDay", driverData.birthDay);
  formData.append("phone", driverData.phone);
  formData.append("nationalID", driverData.nationalID);
  formData.append("province", driverData.province);
  formData.append("district", driverData.district);
  formData.append("ward", driverData.ward);
  formData.append("street", driverData.street);
  formData.append("drivingLicense", driverData.drivingLicense);

  const handleClickConfirm = async () => {
    setOpenConfirmPaymentDeposit(true);
  };

  const handleCloseConfirmPaymentDeposit = () => {
    setOpenConfirmPaymentDeposit(false);
  };

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
                {Number(user.wallet).toLocaleString()} (VND)
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
              control={<Radio value="Bank_Transfer" color="primary" />}
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
      <ConfirmPaymentDeposit
        open={openConfirmPaymentDeposit}
        onClose={handleCloseConfirmPaymentDeposit}
        formData={formData}
        deposit={deposit}
      />
    </div>
  );
};

export default Payments;
