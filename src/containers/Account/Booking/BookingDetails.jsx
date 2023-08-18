import {
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Grid,
  Stack,
  Typography,
  Button,
  Container,
  Breadcrumbs,
  Rating,
  FormControlLabel,
  Checkbox,
  Radio,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import CustomTabPanels from "../../../components/CustomTabPanels/CustomTabPanels";
import {
    Album,
  AttachMoney,
  Bluetooth,
  Camera,
  Commute,
  GpsFixed,
  Home,
  Info,
  Living,
  More,
  NavigateNext,
  NoStroller,
  SolarPower,
  Usb,
} from "@mui/icons-material";
import Details from "../../../components/Stepper/Steps/Details";
import Pricing from "../../../components/Stepper/Steps/Pricing";
import Preview from "../../../components/Stepper/Steps/Preview";
import { Link } from "react-router-dom";
import AutoPlaySwipePreview from "../../../components/Stepper/AutoPlaySwipePreview";
import BookingInformation from "../../../components/RentNow/BookingSteps/BookingInformation";

const StyledTypography = styled(Typography)`
  font-weight: bold !important;
`;

const data = {
  name: "Mercedes-Benz Pickup Truck 2008",
  rating: 4.5,
  nor: 3,
  price: "1.000.000 VND",
  location: "Phường Ngọc Hà, Thành phố Hà Giang, Tỉnh Hà Giang",
  status: "Availabel",
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BookingDetails = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
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
            <Commute sx={{ mr: 0.5 }} fontSize="inherit" />
            <Typography
              component={Link}
              to="/booking"
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                color: "#7f7f7f !important",
                "&:hover": {
                  color: "#fca311 !important",
                },
              }}
            >
              My Bookings
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Commute sx={{ mr: 0.5 }} fontSize="inherit" />
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                color: "#7f7f7f !important",
              }}
            >
              Booking details
            </Typography>
          </Stack>
        </Breadcrumbs>
      </Container>
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <StyledTypography variant="h6" sx={{ mb: 3 }}>
          Booking details
        </StyledTypography>
        <Grid container>
          <Grid item xs={6}>
            <AutoPlaySwipePreview />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">{data.name}</Typography>

            <StyledTypography variant="subtitle1">From:</StyledTypography>
            <StyledTypography variant="subtitle1">To:</StyledTypography>

            <StyledTypography variant="subtitle1">
              Number of rides: {data.nor}
            </StyledTypography>
            <StyledTypography variant="subtitle1">
              Base price: {data.price}
            </StyledTypography>
            <StyledTypography variant="subtitle1">
              Total: {data.total}
            </StyledTypography>
            <StyledTypography variant="subtitle1">
              Deposit: {data.deposit}
            </StyledTypography>
            <StyledTypography variant="subtitle1">
              Booking No.{"     "}
              {data.bn}
            </StyledTypography>
            <StyledTypography variant="subtitle1">
              Booking status:{"     "}
              <span style={{ color: "#38b000", fontWeight: "bold" }}>
                {data.status}
              </span>
            </StyledTypography>
            <Stack direction="row" spacing={2}>
              <Button
              fullWidth
                sx={{
                  borderColor: "#fca311",
                  "&:hover": {
                    borderColor: "#fca311",
                  },
                }}
                variant="outlined"
              >
                View details
              </Button>
              <Button
              fullWidth
                sx={{
                  borderColor: "#fca311",
                  "&:hover": {
                    borderColor: "#fca311",
                  },
                }}
                variant="outlined"
              >
                Confirm Pick-up
              </Button>
              <Button
              fullWidth
              sx={{
                borderColor: "#d00000",
                backgroundColor: "#d00000 !important",
                "&:hover": {
                  color: "#fca311 !important",
                  bgcolor: "white !important",
                  borderColor: "#fca311",
                },
              }}
              variant="outlined"
              >
                Cancel Booking
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3, borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={handleChange}>
            <Tab
              sx={{ fontWeight: "bold" }}
              icon={<Info />}
              label="Booking Information"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              icon={<More />}
              label="Car information"
              {...a11yProps(1)}
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              icon={<AttachMoney />}
              label="Payment information"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <CustomTabPanels value={tab} index={0}>
          <BookingInformation />
          <Box sx={{ display: "flex", justifyContent: "center ", mt: 5 }}>
            <Button variant="outlined" sx={{ minWidth: "10%", mr: 5 }}>
              Discard
            </Button>
            <Button variant="outlined" sx={{ minWidth: "10%" }}>
              Save
            </Button>
          </Box>
        </CustomTabPanels>
        <CustomTabPanels value={tab} index={1}>
        <Grid container>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <StyledTypography variant="subtitle1">
                  Plate number:
                </StyledTypography>
                <StyledTypography variant="subtitle1">
                  Brand name:
                </StyledTypography>
                <StyledTypography variant="subtitle1">
                  Production year:
                </StyledTypography>
                <StyledTypography variant="subtitle1">
                  Transmission:
                </StyledTypography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <StyledTypography variant="subtitle1">Color:</StyledTypography>
                <StyledTypography variant="subtitle1">Model:</StyledTypography>
                <StyledTypography variant="subtitle1">
                  No. of seats:
                </StyledTypography>
                <StyledTypography variant="subtitle1">Fuel:</StyledTypography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <StyledTypography sx={{ pt: 2 }} variant="subtitle1">
                Documents:
              </StyledTypography>
            </Grid>
          </Grid>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <StyledTypography variant="subtitle1">Mileage:</StyledTypography>
            <StyledTypography variant="subtitle1">
              Fuel consumption: 18 liter/100 km
            </StyledTypography>
            <StyledTypography variant="subtitle1">Address:</StyledTypography>
            <Typography variant="subtitle1">
              Note: Full address will be available after you've paid the deposit
              to rent.
            </Typography>
            <StyledTypography variant="subtitle1">
              Description:
            </StyledTypography>
            <Typography variant="subtitle1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <StyledTypography variant="subtitle1">
              Additional functions:
            </StyledTypography>
          </Stack>
          <Grid container sx={{ pt: 2 }}>
            <Grid item xs={4}>
              <Stack>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                        Bluetooth
                      </Typography>
                      <Bluetooth fontSize="inherit" />
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                        GPS
                      </Typography>
                      <GpsFixed fontSize="inherit" />
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                        Camera
                      </Typography>
                      <Camera fontSize="inherit" />
                    </Box>
                  }
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                        Sun roof
                      </Typography>
                      <SolarPower fontSize="inherit" />
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                        Child lock
                      </Typography>
                      <NoStroller fontSize="inherit" />
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                        Child seat
                      </Typography>
                      <Living fontSize="inherit" />
                    </Box>
                  }
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                        DVD
                      </Typography>
                      <Album fontSize="inherit" />
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                        USB
                      </Typography>
                      <Usb fontSize="inherit" />
                    </Box>
                  }
                />
              </Stack>
            </Grid>
          </Grid>
            <StyledTypography sx={{ mt: 2, mb: 2 }} variant="subtitle1">Term of use:</StyledTypography>
          <Stack direction="row" spacing={5} >
            <Stack>
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography variant="subtitle1">No smoking</Typography>}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography variant="subtitle1">No pet</Typography>}
              />
            </Stack>
            <Stack>
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography variant="subtitle1">No food in car</Typography>}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography variant="subtitle1">Other</Typography>}
              />
            </Stack>
          </Stack>
        </CustomTabPanels>
        <CustomTabPanels value={tab} index={2}>
        <FormControlLabel
          control={<Radio value="wallet" checked color="primary"/>}
          label={<StyledTypography>My Wallet</StyledTypography>}
        />
        <Typography variant="subtitle1" sx={{ ml: 7, mb: 2 }}>
          Current balance:{" "}
          <span style={{ color: "#38b000", fontWeight: "bold" }}>
            20.000.000 VND
          </span>
        </Typography>
        <Typography variant="subtitle1">Please make sure to have suffcient balance when you return the car.</Typography>
        <Link to="/wallet">
            <Button variant="outlined" sx={{ mt: 2 }}>Go to wallet</Button>
        </Link>
        </CustomTabPanels>
      </Container>
    </div>
  );
};

export default BookingDetails;
