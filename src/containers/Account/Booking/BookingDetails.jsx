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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useEffect } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import AutoPlaySwipePreview from "../../../components/Stepper/AutoPlaySwipePreview";
import BookingInformation from "../../../components/RentNow/BookingSteps/BookingInformation";
import AutoPreviewBooking from "./AutoPreviewBooking";
import { useSelector } from "react-redux";
import {
  carSelected,
  carSelectedAll,
} from "../../../components/ReduxToolkit/CarAdapter";
import axiosInstance from "../../../shared/configs/axiosConfig";

const StyledTypography = styled(Typography)`
  font-weight: bold !important;
`;

const data = {
  name: "Mercedes-Benz Pickup Truck 2008",
  rating: 4.5,
  nor: 3,
  price: "1.000.000 VND",
  location: "Phường Ngọc Hà, Thành phố Hà Giang, Tỉnh Hà Giang",
  status: "Available",
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BookingDetails = () => {
  const [tab, setTab] = useState(0);
  const { bookingId } = useParams();
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState(null);
  const token = localStorage.getItem("jwtToken");
  console.log(bookingId);
  useEffect(() => {
    if (bookingId) {
      const data = axiosInstance
        .get(`/customer/booking/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.isSuccess === true) {
            setCar(res.data.booking.car);
            setUser(res.data.booking.member);
            setBooking(res.data.booking);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    console.log("User: ", user);
    console.log("Car: ", car);

  }, [bookingId, booking, token, car, user])
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const navigate = useNavigate();

  const [checkboxState, setCheckboxState] = useState({
    bluetooth: car.additionalFunctions.includes("bluetooth"),
    gps: car.additionalFunctions.includes("gps"),
    camera: car.additionalFunctions.includes("camera"),
    sunRoof: car.additionalFunctions.includes("sunRoof"),
    childLock: car.additionalFunctions.includes("childLock"),
    childSeat: car.additionalFunctions.includes("childSeat"),
    dvd: car.additionalFunctions.includes("dvd"),
    usb: car.additionalFunctions.includes("usb"),
    noSmoking: car.terms.includes("noSmoking"),
    noPet: car.terms.includes("noPet"),
    noFoodInCar: car.terms.includes("noFoodInCar"),
    other: car.terms.includes("other"),
  });

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
            <AutoPreviewBooking bookingId={bookingId} />
          </Grid>
          <Grid item xs={6}>
            <StyledTypography variant="h6">
              {car.brand} {car.model} {car.productionYear}
            </StyledTypography>
            <Typography variant="subtitle1">
              From: {booking.startDate}
            </Typography>
            <Typography variant="subtitle1">To: {booking.endDate}</Typography>
            <Typography variant="subtitle1">
              Number of rides: {data.nor}
            </Typography>
            <Typography variant="subtitle1">
              Base price: {Number(car.price).toLocaleString()} (VND/day)
            </Typography>
            <Typography variant="subtitle1">
              Total: {Number(car.price).toLocaleString()} (VND)
            </Typography>
            <Typography variant="subtitle1">
              Deposit: {Number(car.deposit).toLocaleString()} (VND)
            </Typography>
            <Typography variant="subtitle1">
              Booking No.{"     "}
              {booking.id}
            </Typography>
            <Typography variant="subtitle1">
              Booking status:{"     "}
              <span style={{ color: "#38b000", fontWeight: "bold" }}>
                {booking.bookingStatus ? booking.bookingStatus : "Loading..."}
              </span>
            </Typography>
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
            <Button
              variant="outlined"
              sx={{ minWidth: "10%", mr: 5 }}
              onClick={() => navigate("/booking")}
            >
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
                <Typography variant="subtitle1">
                  Plate Number: {car.plateNumber}
                </Typography>
                <Typography variant="subtitle1">
                  Brand Name: {car.brand}
                </Typography>
                <Typography variant="subtitle1">
                  Production Year: {car.productionYear}
                </Typography>
                <Typography variant="subtitle1">
                  Transmission Type: {car.transmissionType}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">Color: {car.color}</Typography>
                <Typography variant="subtitle1">Model: {car.model}</Typography>
                <Typography variant="subtitle1">
                  No. of seats: {car.numberOfSeat}
                </Typography>
                <Typography variant="subtitle1">
                  Fuel Type: {car.fuelType}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ pt: 2 }} variant="subtitle1">
                Documents:
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Note</TableCell>
                      <TableCell>Link</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {car.files.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.url}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
              Mileage: {Number(car.mileage).toLocaleString()} (km)
            </Typography>
            <Typography variant="subtitle1">
              Fuel consumption: {car.fuelConsumption} (liter/100km)
            </Typography>
            <Typography variant="subtitle1">
              Address: {car.ward} {car.district} {car.province}
            </Typography>
            <Typography variant="subtitle1" color="#d00000" fontWeight="bold">
              Note: Full address will be available after you've paid the deposit
              to rent.
            </Typography>
            <Typography variant="subtitle1">
              Description: {car.description}
            </Typography>
            <Typography variant="subtitle1">Additional functions:</Typography>
          </Stack>
          <Grid container sx={{ pt: 2 }}>
            <Grid item xs={4}>
              <Stack>
                <FormControlLabel
                  control={<Checkbox checked={checkboxState.bluetooth} />}
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
                  control={<Checkbox checked={checkboxState.gps} />}
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
                  control={<Checkbox checked={checkboxState.camera} />}
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
                  control={<Checkbox checked={checkboxState.sunRoof} />}
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
                  control={<Checkbox checked={checkboxState.childLock} />}
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
                  control={<Checkbox checked={checkboxState.childSeat} />}
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
                  control={<Checkbox checked={checkboxState.dvd} />}
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
                  control={<Checkbox checked={checkboxState.usb} />}
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
          <Typography sx={{ mt: 2, mb: 2 }} variant="subtitle1">
            Term of use:
          </Typography>
          <Stack direction="row" spacing={5}>
            <Stack>
              <FormControlLabel
                control={<Checkbox checked={checkboxState.noSmoking} />}
                label={<Typography variant="subtitle1">No smoking</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={checkboxState.noPet} />}
                label={<Typography variant="subtitle1">No pet</Typography>}
              />
            </Stack>
            <Stack>
              <FormControlLabel
                control={<Checkbox checked={checkboxState.noFoodInCar} />}
                label={
                  <Typography variant="subtitle1">No food in car</Typography>
                }
              />
              <FormControlLabel
                control={<Checkbox checked={checkboxState.other} />}
                label={<Typography variant="subtitle1">Other</Typography>}
              />
            </Stack>
          </Stack>
        </CustomTabPanels>
        <CustomTabPanels value={tab} index={2}>
          <FormControlLabel
            control={<Radio value="wallet" checked color="primary" />}
            label={<StyledTypography>My Wallet</StyledTypography>}
          />
          <Typography variant="subtitle1" sx={{ ml: 7, mb: 2 }}>
            Current balance:{" "}
            <span style={{ color: "#38b000", fontWeight: "bold" }}>
              {Number(user.wallet).toLocaleString()} (VND)
            </span>
          </Typography>
          <Typography variant="subtitle1">
            Please make sure to have suffcient balance when you return the car.
          </Typography>
          <Link to="/wallet">
            <Button variant="outlined" sx={{ mt: 2 }}>
              Go to wallet
            </Button>
          </Link>
        </CustomTabPanels>
      </Container>
    </div>
  );
};

export default BookingDetails;
