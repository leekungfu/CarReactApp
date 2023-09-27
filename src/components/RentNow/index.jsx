import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
  Breadcrumbs,
  Stack,
  Grid,
  Rating,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import {
  Circle,
  DoneAll,
  FormatListBulleted,
  Home,
  NavigateNext,
  Payment,
  StickyNote2,
} from "@mui/icons-material";
import BookingInformation from "./BookingSteps/BookingInformation";
import BookingSummary from "./BookingSteps/BookingSummary";
import Payments from "./BookingSteps/Payments";
import Finish from "./BookingSteps/Finish";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../Hooks/useSnackBar";
import AutoPreviewViewDetails from "../../containers/Account/Car/AutoPreviewViewDetails";
import { RSUITE_DATE_TIME_PICKER_DISPLAY_FORMAT } from "../../shared/configs/constants";
import { DateRangePicker } from "rsuite";
import moment from "moment";

const RentNow = () => {
  const { carId } = useParams();
  const icons = {
    1: <StickyNote2 />,
    2: <Payment />,
    3: <DoneAll />,
  };
  const fromTime = new Date();
  fromTime.setHours(0, 0, 0, 0);
  const toTime = new Date();
  toTime.setHours(23, 59, 59, 999);
  const steps = ["Booking Information", "Payment", "Finish"];
  const [activeStep, setActiveStep] = useState(0);
  const [pickUpTime, setPickUpTime] = useState(fromTime);
  const [returnTime, setReturnTime] = useState(toTime);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleClickOpenBackdrop = () => {
    setOpenBackdrop(true);
  };
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const calculateNumberOfDays = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate).endOf("day");
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();
    return Math.ceil(days);
  };
  const totalTime = calculateNumberOfDays(pickUpTime, returnTime);

  const navigate = useNavigate();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      navigate("/booking");
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === steps.length - 1) {
      navigate("/homecustomer");
    }
  };

  const [car, setCar] = useState({});
  const { createSnack } = useSnackbar();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (carId) {
          handleClickOpenBackdrop();
          const response = await axiosInstance.get(
            `/customer/getCar/${carId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.isSuccess === true) {
            setCar(response.data.car);
            handleCloseBackdrop();
          } else {
            createSnack(response.data.message, { severity: "error" });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        createSnack("Error fetching data", { severity: "error" });
      }
    };

    fetchData();
  }, [carId, token, createSnack]);

  return (
    <div>
      <Container maxWidth="lg">
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Stack direction="row" alignItems="center">
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              <Typography
                component={Link}
                to="/homecustomer"
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  color: "#7f7f7f !important",
                  "&:hover": {
                    color: "#fca311 !important",
                  },
                }}
              >
                Home
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <FormatListBulleted sx={{ mr: 0.5 }} fontSize="inherit" />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Booking Details
              </Typography>
            </Stack>
          </Breadcrumbs>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h6" fontWeight="bold">
            Booking Details
          </Typography>
          <Box sx={{ ml: 5 }}>
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Circle fontSize="inherit" />
              <Typography variant="subtitle1" sx={{ pl: 1 }}>
                Location pick-up: {car.ward}, {car.district}, {car.province}
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
              <Typography variant="subtitle1" sx={{ ml: 1, mr: 2 }}>
                Pick-up & return time:
              </Typography>
              <DateRangePicker
                format={RSUITE_DATE_TIME_PICKER_DISPLAY_FORMAT}
                value={[new Date(pickUpTime), new Date(returnTime)]}
                onChange={(values) => {
                  setPickUpTime(values[0]);
                  setReturnTime(values[1]);
                }}
              />
            </Box>
          </Box>
        </Container>
        <Container maxWidth="lg">
          <Card elevation={0} sx={{ mb: 5 }}>
            <CardContent>
              <Stepper
                sx={{
                  mb: 3,
                  color: "#fca311",
                  "& .MuiStepConnector-root": {
                    backgroundColor: "#f0f0f0",
                  },
                  "& .MuiStepIcon-root.MuiStepIcon-active": {
                    backgroundColor: "#00bcd4",
                  },
                  "& .MuiStepIcon-root.MuiStepIcon-completed": {
                    backgroundColor: "#4caf50",
                  },
                }}
                orientation="horizontal"
                activeStep={activeStep}
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={index} {...stepProps}>
                      <StepLabel
                        StepIconComponent={() => icons[index + 1]}
                        {...labelProps}
                      >
                        <Typography variant="subtitle1" fontWeight={600}>
                          {label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <Grid container>
                <Grid item xs={6}>
                  <AutoPreviewViewDetails carId={car.id} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    {car.brand} {car.model} {car.productionYear}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1">
                      Rating: {car.rating}
                    </Typography>
                    <Rating defaultValue={3.5} precision={0.5} readOnly />
                  </Stack>
                  <Typography variant="subtitle1">
                    Number of rides: 0
                  </Typography>
                  <Typography variant="subtitle1">
                    Price: {Number(car.price).toLocaleString()} (VND/day)
                  </Typography>
                  <Typography variant="subtitle1">
                    Location: {car.ward}, {car.district}, {car.province}
                  </Typography>
                  <Typography variant="subtitle1">
                    Status:{" "}
                    <span
                      style={{
                        color:
                          car.status === "Booked"
                            ? "#15616d"
                            : car.status === "Stopped"
                            ? "#d00000"
                            : "#38b000",
                        fontWeight: "bold",
                      }}
                    >
                      {car.status}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              <BookingSummary car={car} totalTime={totalTime} />
              <Paper elevation={0} sx={{ mt: 5 }}>
                {activeStep === 0 && <BookingInformation />}
                {activeStep === 1 && (
                  <Payments
                    carId={car.id}
                    pickUpTime={pickUpTime}
                    returnTime={returnTime}
                    deposit={car.deposit}
                  />
                )}
                {activeStep === 2 && <Finish carId={car.id} />}
              </Paper>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  pt: 2,
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    border: "solid 1px",
                    mr: 1,
                    color: "white",
                    width: activeStep === 1 ? "20%" : "20%",
                  }}
                >
                  {activeStep === steps.length - 1 ? "Go home" : "Back"}
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={handleNext}
                  // visibility: activeStep === 1 ? "hidden" : "visible" ===> do another times
                  sx={{ border: "solid 1px", color: "white", width: "20%" }}
                >
                  {activeStep === steps.length - 1
                    ? "View booking"
                    : activeStep === steps.length - 2
                    ? "Finsh"
                    : "Next"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={handleClickOpenBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </div>
  );
};

export default RentNow;
