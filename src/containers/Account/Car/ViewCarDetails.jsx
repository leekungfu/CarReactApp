import {
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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
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
import Pricing from "../../../components/Stepper/Steps/Pricing";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../shared/configs/axiosConfig";
import { useSnackbar } from "../../../components/Hooks/useSnackBar";
import AutoPreviewViewDetails from "./AutoPreviewViewDetails";

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

const ViewCarDetails = () => {
  const [tab, setTab] = useState(0);
  const [car, setCar] = useState({});
  const { carId } = useParams();
  const { createSnack } = useSnackbar();
  const navigate = useNavigate();
  const additionalFunctions = car.additionalFunctions || [];
  const terms = car.terms || [];

  const [checkboxState, setCheckboxState] = useState({
    bluetooth: additionalFunctions.includes("bluetooth"),
    gps: additionalFunctions.includes("gps"),
    camera: additionalFunctions.includes("camera"),
    sunRoof: additionalFunctions.includes("sunRoof"),
    childLock: additionalFunctions.includes("childLock"),
    childSeat: additionalFunctions.includes("childSeat"),
    dvd: additionalFunctions.includes("dvd"),
    usb: additionalFunctions.includes("usb"),
    noSmoking: terms.includes("noSmoking"),
    noPet: terms.includes("noPet"),
    noFoodInCar: terms.includes("noFoodInCar"),
    other: terms.includes("other"),
  });

  useEffect(() => {
    setCheckboxState({
      bluetooth: additionalFunctions.includes("bluetooth"),
      gps: additionalFunctions.includes("gps"),
      camera: additionalFunctions.includes("camera"),
      sunRoof: additionalFunctions.includes("sunRoof"),
      childLock: additionalFunctions.includes("childLock"),
      childSeat: additionalFunctions.includes("childSeat"),
      dvd: additionalFunctions.includes("dvd"),
      usb: additionalFunctions.includes("usb"),
      noSmoking: terms.includes("noSmoking"),
      noPet: terms.includes("noPet"),
      noFoodInCar: terms.includes("noFoodInCar"),
      other: terms.includes("other"),
    });
  }, [additionalFunctions, terms]);

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
            console.log("Car dbsdsdsds:", response.data.car);
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
  console.log("Car server: ", car);
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
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                color: "#7f7f7f !important",
              }}
            >
              View car
            </Typography>
          </Stack>
        </Breadcrumbs>
      </Container>
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <StyledTypography variant="h6" sx={{ mb: 3 }}>
          View car
        </StyledTypography>
        <Grid container>
          <Grid item xs={6}>
            <AutoPreviewViewDetails carId={car.id} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">
              {car.brand} {car.model} {car.productionYear}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle1">Rating: {car.rating}</Typography>
              <Rating defaultValue={3.5} precision={0.5} readOnly />
            </Stack>
            <Typography variant="subtitle1">
              Number of rides: {data.nor}
            </Typography>
            <Typography variant="subtitle1">Price: {car.price}</Typography>
            <Typography variant="subtitle1">
              Location: {car.ward}, {car.district}, {car.province}
            </Typography>
            <Typography variant="subtitle1">
              Status:{" "}
              <span style={{ color: "#38b000", fontWeight: "bold" }}>
                {car.status}
              </span>
            </Typography>
            <Button
              sx={{
                mt: 3,
                minWidth: "50%",
                color: "white",
                borderColor: "#fca311",
                "&:hover": {
                  borderColor: "#fca311",
                },
              }}
              variant="outlined"
              onClick={() => navigate(`/rentnow/${car.id}`)}
            >
              Rent now
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3, borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={handleChange}>
            <Tab
              sx={{ fontWeight: "bold" }}
              icon={<Info />}
              label="Basic Information"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              icon={<More />}
              label="Details"
              {...a11yProps(1)}
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              icon={<AttachMoney />}
              label="Terms of use"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <CustomTabPanels value={tab} index={0}>
          <Grid container sx={{ ml: 2 }}>
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
                  Fuel type: {car.fuelType}
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
                    {car.files &&
                      car.files.map((item) => (
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
        </CustomTabPanels>
        <CustomTabPanels value={tab} index={1}>
          <Grid container sx={{ ml: 2 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1">
                Mileage: {Number(car.mileage).toLocaleString()} (km)
              </Typography>
              <Typography variant="subtitle1">
                Fuel consumption: {car.fuelConsumption} (liter/100km)
              </Typography>
              <Typography variant="subtitle1">
                Address: *****, {car.district}, {car.province}{" "}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" color="#d00000">
                Note: Full address will be available after you've paid the
                deposit to rent.
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
          </Grid>
        </CustomTabPanels>
        <CustomTabPanels value={tab} index={2}>
          <Grid container sx={{ ml: 2 }}>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">
                  Base price:{" "}
                  <span style={{ marginLeft: 15 }}>
                    {Number(car.price).toLocaleString()} (VND/day)
                  </span>
                </Typography>
                <Typography variant="subtitle1">
                  Deposit:{" "}
                  <span style={{ marginLeft: 37 }}>
                    {Number(car.deposit).toLocaleString()} (VND)
                  </span>
                </Typography>
                <Typography variant="subtitle1">Term of use:</Typography>
                <Stack direction="row" spacing={4}>
                  <Stack>
                    <FormControlLabel
                      control={<Checkbox checked={checkboxState.noSmoking} />}
                      label={
                        <Typography variant="subtitle1">No smoking</Typography>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox checked={checkboxState.noPet} />}
                      label={
                        <Typography variant="subtitle1">No pet</Typography>
                      }
                    />
                  </Stack>
                  <Stack>
                    <FormControlLabel
                      control={<Checkbox checked={checkboxState.noFoodInCar} />}
                      label={
                        <Typography variant="subtitle1">
                          No food in car
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox checked={checkboxState.other} />}
                      label={<Typography variant="subtitle1">Other</Typography>}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={7} sx={{ pl: 5 }}></Grid>
          </Grid>
        </CustomTabPanels>
      </Container>
    </div>
  );
};

export default ViewCarDetails;
