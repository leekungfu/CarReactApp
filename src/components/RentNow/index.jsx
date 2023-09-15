import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BreadcrumbsMenu from "../BreadcrumbsMenu";
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
} from "@mui/material";
import {
  Circle,
  Description,
  DetailsOutlined,
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
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../Hooks/useSnackBar";
import AutoPreviewViewDetails from "../../containers/Account/Car/AutoPreviewViewDetails";

const RentNow = () => {
  const { carId } = useParams();
  const icons = {
    1: <StickyNote2 />,
    2: <Payment />,
    3: <DoneAll />,
  };
  const steps = ["Booking Information", "Payment", "Finish"];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [car, setCar] = useState({});
  const { createSnack } = useSnackbar();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (carId) {
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
            createSnack(response.data.message, { severity: "success" });
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
                Location pick-up:
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
                Date time pick-up:
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
                Date time return:
              </Typography>
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
                    Price: {car.price}
                  </Typography>
                  <Typography variant="subtitle1">
                    Location: {car.ward}, {car.district}, {car.province}
                  </Typography>
                  <Typography variant="subtitle1">
                    Status:{" "}
                    <span style={{ color: "#38b000", fontWeight: "bold" }}>
                      {car.status}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              <BookingSummary car={car} />
              <Paper elevation={0} sx={{ mt: 5 }}>
                {activeStep === 0 && <BookingInformation />}
                {activeStep === 1 && <Payments />}
                {activeStep === 2 && <Finish />}
              </Paper>
              {activeStep === steps.length ? (
                <Fragment>
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    All steps are completed!
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      sx={{
                        color: "white",
                        border: "solid 1px",
                      }}
                      //   onClick={handleClose}
                    >
                      Back home
                    </Button>
                  </Box>
                </Fragment>
              ) : (
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
                    {activeStep === steps.length - 1 ? "View booking" : "Next"}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </Container>
    </div>
  );
};

export default RentNow;
