import { Circle, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import PaymentMethod from "../../ControlledRadioButtons/PaymentMethod";

const Payments = () => {
  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight="bold">
          Please select your payment method
        </Typography>
        <PaymentMethod />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button variant="outlined" sx={{ mr: 5, width: "15%" }}>Cancel</Button>
        <Button variant="outlined" sx={{ width: "15%" }}>Confirm payment</Button>
      </Box>
      <Stack justifyContent="center" direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
        <KeyboardDoubleArrowRight />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "red" }}
        >
          The deposit amount will be deducted from your wallet
        </Typography>
        <KeyboardDoubleArrowLeft />
      </Stack>
    </div>
  );
};

export default Payments;
