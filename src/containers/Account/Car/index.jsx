import {
  Container,
  Card,
  CardContent,
  Stack,
  Grid,
  List,
  Typography,
  Box,
  Skeleton,
  Pagination,
  Button,
  Rating,
  Breadcrumbs,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import AddCar from "../../../components/Dialogs/AddCar";
import { Add, Commute, Home, NavigateNext } from "@mui/icons-material";
import ConfirmDeposit from "../../../components/Modals/ConfirmDeposit";
import ConfirmPayment from "../../../components/Modals/ConfirmPayment";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { carSelectedAll } from "../../../components/ReduxToolkit/CarAdapter";

const MyCars = (props) => {
  const { loading = false } = props;
  const [rateValue, setRateValue] = useState(4.5);
  const [openAddCar, setOpenAddCar] = useState(false);
  const cars = useSelector(carSelectedAll).payload.cars;
  const carArray = Object.values(cars.entities);
  console.log("Cars: ", carArray);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalCars = carArray.length;
  const totalPages = Math.ceil(totalCars / itemsPerPage);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const carsOnCurrentPage = carArray.slice(startIndex, endIndex);
  const handleClickOpenAddCar = () => {
    setOpenAddCar(true);
  };
  const navigate = useNavigate();
  const handleCarClick = (carId) => {
    navigate(`/editcardetails/${carId}`);
  };
  const handleClose = () => {
    setOpenAddCar(false);
    setOpenConfirmDeposit(false);
    setOpenConfirmPayment(false);
  };
  const [openConfirmDeposit, setOpenConfirmDeposit] = useState(false);
  const [openConfirmPayment, setOpenConfirmPayment] = useState(false);

  const handleClickViewBooking = (carId) => {
    navigate(`/viewbookedcar/${carId}`)
  };
  const handleClickOpenConfirmPayment = () => {
    setOpenConfirmPayment(true);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ pt: 5 }}>
        <Container maxWidth="lg" sx={{ mt: 5 }}>
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
                variant="subtitle1"
                fontWeight="bold"
                sx={{ display: "flex", alignItems: "center" }}
              >
                My Cars
              </Typography>
            </Stack>
          </Breadcrumbs>
        </Container>
        <Button
          sx={{
            minWidth: 100,
            color: "white",
            borderColor: "#fca311",
            "&:hover": {
              borderColor: "#fca311",
            },
            ml: 2,
            mt: 5,
          }}
          variant="outlined"
          endIcon={<Add />}
          onClick={handleClickOpenAddCar}
        >
          ADD CAR
        </Button>
        <AddCar open={openAddCar} onClose={handleClose} />
        <Card elevation={0} sx={{ mb: 5 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" sx={{ pb: 1 }}>
              <List fontSize="large" />
              <Typography variant="h6">LIST CARS:</Typography>
            </Stack>
            <Grid container columnSpacing={4} rowSpacing={5}>
              {(loading ? Array.from(new Array(6)) : carsOnCurrentPage).map(
                (car) => (
                  <Grid item xs={4} key={car.id}>
                    {car ? (
                      <Box
                        sx={{
                          border: "0.5px solid #ccc",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          style={{ width: "100%", height: 210 }}
                          alt={`frontImage-${car.id}`}
                          src={`data:image/jpeg;base64, ${
                            car.files.find((item) => item.name === "frontImage")
                              .data
                          }`}
                        />
                      </Box>
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={210}
                        height={118}
                      />
                    )}

                    {car ? (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography gutterBottom variant="subtitle1">
                            {car.brand} {car.model} {car.productionYear}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <Box sx={{ display: "flex" }}>
                              <Typography
                                display="block"
                                variant="body2"
                                color="text.secondary"
                                sx={{ mr: 0.5 }}
                              >
                                Rating:
                              </Typography>
                              <Rating
                                size="small"
                                name="half-rating-read"
                                defaultValue={car.rating}
                                precision={0.5}
                                readOnly
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              Price: {car.price ? car.price : car.price}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                              No. of rides: {car.nor}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
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
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            sx={{ pt: 1, pb: 1 }}
                            variant="body2"
                            color="text.secondary"
                          >
                            Location: {car.ward}, {car.district}, {car.province}
                          </Typography>
                          <Stack direction="row" spacing={3}>
                            <Button
                              sx={{
                                minWidth: "40%",
                                color: "white",
                                borderColor: "#fca311",
                                "&:hover": {
                                  borderColor: "#fca311",
                                },
                              }}
                              variant="outlined"
                              onClick={() => handleCarClick(car.id)}
                            >
                              View details
                            </Button>
                            {car.bookings && car.bookings.length > 0 ? (
                              <Button
                                sx={{
                                  minWidth: "40%",
                                  color: "white",
                                  borderColor: "#15616d",
                                  backgroundColor: "#15616d !important",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                                onClick={() => handleClickViewBooking(car.id)}
                              >
                                View booking
                              </Button>
                            ) : (
                              <Button
                                disabled
                                sx={{
                                  minWidth: "40%",
                                  color: "white",
                                  borderColor: "#15616d",
                                  backgroundColor: "#15616d !important",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                              >
                                View booking
                              </Button>
                            )}
                            {/* {car.bookings.find(
                              (item) => item.bookingStatus === "Pending_payment"
                            ) ? (
                              <Button
                                sx={{
                                  // minWidth: "50%",
                                  color: "white",
                                  borderColor: "#15616d",
                                  backgroundColor: "#15616d !important",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                                onClick={handleClickOpenConfirmPayment}
                              >
                                Confirm payment
                              </Button>
                            ) : car.bookings.find(
                                (item) =>
                                  item.bookingStatus === "Pending_deposit"
                              ) ? (
                              <Button
                                sx={{
                                  // minWidth: "50%",
                                  color: "white",
                                  borderColor: "#fca311",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                                onClick={handleClickOpenConfirmDeposit}
                              >
                                Confirm deposit
                              </Button>
                            ) : (
                              <Button
                                disabled
                                sx={{
                                  minWidth: "50%",
                                  color: "white",
                                  borderColor: "#fca311",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                  // visibility: "hidden",
                                }}
                                variant="outlined"
                                // onClick={handleClickOpenConfirmDeposit}
                              >
                                Confirm deposit
                              </Button>
                            )} */}
                          </Stack>
                        </Grid>
                      </Grid>
                    ) : (
                      <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width="60%" />
                      </Box>
                    )}
                    <ConfirmPayment
                      open={openConfirmPayment}
                      onClose={handleClose}
                      // bookingId={}
                    />
                    <ConfirmDeposit
                      open={openConfirmDeposit}
                      onClose={handleClose}
                    />
                  </Grid>
                )
              )}
            </Grid>
            {carArray && carArray.length > 0 && (
              <Pagination
                sx={{ display: "flex", justifyContent: "end", mt: 10 }}
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                showFirstButton
                showLastButton
              />
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default MyCars;
