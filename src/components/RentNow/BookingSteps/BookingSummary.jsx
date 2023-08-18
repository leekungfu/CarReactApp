import React from "react";
import { Box, Typography } from "@mui/material";
import { Circle } from "@mui/icons-material";

const BookingSummary = () => {
  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight="bold">
          Booking Summary
        </Typography>
        <Box sx={{ ml: 5, mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Circle fontSize="inherit" />
            <Typography variant="subtitle1" sx={{ pl: 1 }}>
              Reting days: 15
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Circle fontSize="inherit" />
            <Typography variant="subtitle1" sx={{ pl: 1 }}>
              Price per day: 1.000.000 VND
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Circle fontSize="inherit" />
            <Typography variant="subtitle1" sx={{ pl: 1 }}>
              Total: 15.000.000 VND
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Circle fontSize="inherit" />
            <Typography variant="subtitle1" sx={{ pl: 1 }}>
              Deposit: 5.000.000 VND
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BookingSummary;
