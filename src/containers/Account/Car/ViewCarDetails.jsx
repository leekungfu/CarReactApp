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
            <AutoPlaySwipePreview />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">{data.name}</Typography>
            <Stack direction="row" spacing={1}>
              <StyledTypography variant="subtitle1">Rating:</StyledTypography>
              <Rating defaultValue={3.5} precision={0.5} readOnly />
            </Stack>
            <StyledTypography variant="subtitle1">
              Number of rides: {data.nor}
            </StyledTypography>
            <StyledTypography variant="subtitle1">
              Price: {data.price}
            </StyledTypography>
            <StyledTypography variant="subtitle1">
              Location: {data.location}
            </StyledTypography>
            <StyledTypography variant="subtitle1">
              Status:{" "}
              <span style={{ color: "#38b000", fontWeight: "bold" }}>
                {data.status}
              </span>
            </StyledTypography>
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
        </CustomTabPanels>
        <CustomTabPanels value={tab} index={1}>
          <Stack spacing={2}>
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
        </CustomTabPanels>
        <CustomTabPanels value={tab} index={2}>
          <Pricing />
        </CustomTabPanels>
      </Container>
    </div>
  );
};

export default ViewCarDetails;
