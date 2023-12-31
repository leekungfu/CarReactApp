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
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import React, { useEffect } from "react";
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
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  carSelected,
} from "../../../components/ReduxToolkit/CarAdapter";
import AutoPreview from "./AutoPreview";
import DetailsTab from "./DetailsTab";
import PricingTab from "./PricingTab";

// const StyledTypography = styled(Typography)`
//   font-weight: bold !important;
// `;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EditCarDetails = () => {
  const [tab, setTab] = useState(0);
  const { carId } = useParams();
  const car = useSelector((state) => carSelected(state, carId)).payload.cars;
  const [carInfo, setCarInfo] = useState(car.entities[carId]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    setCarInfo(car.entities[carId]);
  }, [car, carId]);

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
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
          Edit car details
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <AutoPreview carId={carId} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight="bold">
              {carInfo.brand} {carInfo.model} {carInfo.productionYear}{" "}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle1">Rating:</Typography>
              <Rating defaultValue={3.5} precision={0.5} readOnly />
            </Stack>
            <Typography variant="subtitle1">
              Number of rides: <span style={{ fontWeight: "bold" }}>4</span>
            </Typography>
            <Typography variant="subtitle1">
              Price: <span style={{ fontWeight: "bold" }}>{carInfo.basePrice}</span>
            </Typography>
            <Typography variant="subtitle1">
              Location: <span style={{ fontWeight: "bold" }}>{carInfo.ward} {carInfo.district} {carInfo.province}</span>
            </Typography>
            <Typography variant="subtitle1">
              Status:{" "}
              <span style={{ color: "#38b000", fontWeight: "bold" }}>
                {carInfo.status}
              </span>
            </Typography>
            {car.status === "Booked" ? (
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
                <Typography variant="subtitle1">
                  Plate number: <span style={{ fontWeight: "bold" }}>{carInfo.plateNumber}</span>
                </Typography>
                <Typography variant="subtitle1">
                  Brand name: <span style={{ fontWeight: "bold" }}>{carInfo.brand}</span>
                </Typography>
                <Typography variant="subtitle1">
                  Production year: <span style={{ fontWeight: "bold" }}>{carInfo.productionYear}</span>
                </Typography>
                <Typography variant="subtitle1">
                  Transmission type: <span style={{ fontWeight: "bold" }}>{carInfo.transmissionType}</span>
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">
                  Color: <span style={{ fontWeight: "bold" }}>{carInfo.color}</span>
                </Typography>
                <Typography variant="subtitle1">
                  Model: <span style={{ fontWeight: "bold" }}>{carInfo.model}</span>
                </Typography>
                <Typography variant="subtitle1">
                  No. of seats: <span style={{ fontWeight: "bold" }}>{carInfo.numberOfSeat}</span>
                </Typography>
                <Typography variant="subtitle1">
                  Fuel type: <span style={{ fontWeight: "bold" }}>{carInfo.fuelType}</span>
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
                    {carInfo.files.map((item) => (
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
          <DetailsTab carId={carId} />
        </CustomTabPanels>
        <CustomTabPanels value={tab} index={2}>
          <PricingTab carId={carId} />
        </CustomTabPanels>
      </Container>
    </div>
  );
};

export default EditCarDetails;
