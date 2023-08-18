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
} from "@mui/material";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import CustomTabPanels from "../../../components/CustomTabPanels/CustomTabPanels";
import {
  AttachMoney,
  Commute,
  Home,
  Info,
  More,
  NavigateNext,
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

const EditCarDetails = () => {
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
              to="/homeowner"
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
              to="/cars"
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                color: "#7f7f7f !important",
                "&:hover": {
                  color: "#fca311 !important",
                },
              }}
            >
              My cars
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
              Edit car details
            </Typography>
          </Stack>
        </Breadcrumbs>
      </Container>
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <StyledTypography variant="h6" sx={{ mb: 3 }}>
          Edit car details
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
            {data.status === "Booked" ? (
              <Button
                sx={{
                  mt: 3,
                  minWidth: "50%",
                  color: "white",
                  bgcolor: "white",
                  borderColor: "#fca311",
                  "&:hover": {
                    borderColor: "#fca311",
                  },
                }}
                variant="outlined"
              >
                Confirm payment
              </Button>
            ) : (
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
                Confirm deposit
              </Button>
            )}
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
              label="Pricing"
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
          <Details />
          <Stack
            direction="row"
            spacing={1.5}
            justifyContent="center"
            sx={{ mt: 5 }}
          >
            <Button
              sx={{
                border: "solid 1px",
                color: "white",
                borderColor: "#fca311",
                "&:hover": {
                  borderColor: "#fca311",
                },
                width: "16%",
              }}
              variant="outlined"
            >
              Discard
            </Button>
            <Button
              sx={{
                color: "white",
                border: "solid 1px",
                borderColor: "#fca311",
                "&:hover": {
                  borderColor: "#fca311",
                },
                width: "16%",
              }}
              variant="outlined"
            >
              Save
            </Button>
          </Stack>
        </CustomTabPanels>
        <CustomTabPanels value={tab} index={2}>
          <Pricing />
          <Stack
            direction="row"
            spacing={3.5}
            justifyContent="center"
            sx={{ mt: 5 }}
          >
            <Button
              sx={{
                border: "solid 1px",
                color: "white",
                borderColor: "#fca311",
                "&:hover": {
                  borderColor: "#fca311",
                },
                width: "18%",
              }}
              variant="outlined"
            >
              Discard
            </Button>
            <Button
              sx={{
                color: "white",
                border: "solid 1px",
                borderColor: "#fca311",
                "&:hover": {
                  borderColor: "#fca311",
                },
                width: "18%",
              }}
              variant="outlined"
            >
              Save
            </Button>
          </Stack>
        </CustomTabPanels>
      </Container>
    </div>
  );
};

export default EditCarDetails;
