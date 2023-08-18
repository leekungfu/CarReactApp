import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  Grid,
  Stack,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import React from "react";
import Preview from "../../Stepper/Steps/Preview";
import {
  ArrowForward,
  ArrowForwardIos,
  Circle,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import dayjs from "dayjs";
import Provinces from "../../Select/Provinces";
import { DatePicker } from "@mui/x-date-pickers";
import DrivingLicense from "../../UploadFile/DrivingLicense";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styled from "styled-components";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIos sx={{ fontSize: "1rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const BookingInformation = () => {
  const [date, setDate] = useState(dayjs("2000-01-01"));

  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ pb: 2, fontWeight: "bold" }}>
          Renter's information
        </Typography>
        <Grid container columnSpacing={5}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Box>
                <InputLabel required>Full Name</InputLabel>
                <OutlinedInput
                  fullWidth
                  placeholder="Example: John Wick"
                  required
                />
              </Box>
              <Box>
                <InputLabel required>Phone Number</InputLabel>
                <OutlinedInput fullWidth placeholder="(+84)" required />
              </Box>
              <Box>
                <InputLabel required>National ID</InputLabel>
                <OutlinedInput
                  fullWidth
                  placeholder="Example: 122318181"
                  required
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Box>
                <InputLabel required>Date of birth</InputLabel>
                <DatePicker
                  sx={{ width: "100%" }}
                  value={date}
                  onChange={(date) => setDate(date)}
                />
              </Box>
              <Box>
                <InputLabel required>Email</InputLabel>
                <OutlinedInput
                  fullWidth
                  placeholder="name@gmail.com"
                  disabled
                />
              </Box>
              <Box>
                <InputLabel required>Street</InputLabel>
                <OutlinedInput fullWidth placeholder="Street" />
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box>
            <InputLabel required>Address</InputLabel>
            <Provinces />
          </Box>
          <Box>
            <InputLabel required>Driving License</InputLabel>
            <DrivingLicense />
          </Box>
        </Stack>
        <Box sx={{ mt: 5 }}>
          <Accordion elevation={0}>
            <AccordionSummary>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Driver's information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container columnSpacing={5}>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <Box>
                      <InputLabel required>Full Name</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="Example: John Wick"
                        required
                      />
                    </Box>
                    <Box>
                      <InputLabel required>Phone Number</InputLabel>
                      <OutlinedInput fullWidth placeholder="(+84)" required />
                    </Box>
                    <Box>
                      <InputLabel required>National ID</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="Example: 122318181"
                        required
                      />
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <Box>
                      <InputLabel required>Date of birth</InputLabel>
                      <DatePicker
                        sx={{ width: "100%" }}
                        value={date}
                        onChange={(date) => setDate(date)}
                      />
                    </Box>
                    <Box>
                      <InputLabel required>Email</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="name@gmail.com"
                        disabled
                      />
                    </Box>
                    <Box>
                      <InputLabel required>Street</InputLabel>
                      <OutlinedInput fullWidth placeholder="Street" />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box>
                  <InputLabel required>Address</InputLabel>
                  <Provinces />
                </Box>
                <Box>
                  <InputLabel required>Driving License</InputLabel>
                  <DrivingLicense />
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </div>
  );
};

export default BookingInformation;
