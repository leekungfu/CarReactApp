import { Home, NavigateNext, SaveAs } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDeposit from "../../../components/Modals/ConfirmDeposit";
import ConfirmPayment from "../../../components/Modals/ConfirmPayment";
import ReturnCar from "../../../components/Modals/ReturnCar";
import { carSelectedAll } from "../../../components/ReduxToolkit/CarAdapter";
import AutoPreviewBooking from "./AutoPreviewBooking";

const data = [
  {
    src: "car-10.jpg",
    name: "Mercedes-Benz AMG GT 2021",
    from: "13/02/2022 - 12:00 PM",
    to: "25/02/2022 - 12:00 PM",
    nod: 12,
    basePrice: "1.000.000 VND",
    total: "12.000.000 VND",
    deposit: "5.000.000 VND",
    bookingNo: "43763",
    status: "Confirmed",
  },
  {
    src: "car-10.jpg",
    name: "Mercedes-Benz AMG GT 2021",
    from: "13/02/2022 - 12:00 PM",
    to: "25/02/2022 - 12:00 PM",
    nod: 12,
    basePrice: "1.000.000 VND",
    total: "12.000.000 VND",
    deposit: "5.000.000 VND",
    bookingNo: "43763",
    status: "In-Progress",
  },
  {
    src: "car-10.jpg",
    name: "Mercedes-Benz AMG GT 2021",
    from: "13/02/2022 - 12:00 PM",
    to: "25/02/2022 - 12:00 PM",
    nod: 12,
    basePrice: "1.000.000 VND",
    total: "12.000.000 VND",
    deposit: "5.000.000 VND",
    bookingNo: "43763",
    status: "Cancelled",
  },
  {
    src: "car-10.jpg",
    name: "Mercedes-Benz AMG GT 2021",
    from: "13/02/2022 - 12:00 PM",
    to: "25/02/2022 - 12:00 PM",
    nod: 12,
    basePrice: "1.000.000 VND",
    total: "12.000.000 VND",
    deposit: "5.000.000 VND",
    bookingNo: "43763",
    status: "Completed",
  },
  {
    src: "car-10.jpg",
    name: "Mercedes-Benz AMG GT 2021",
    from: "13/02/2022 - 12:00 PM",
    to: "25/02/2022 - 12:00 PM",
    nod: 12,
    basePrice: "1.000.000 VND",
    total: "12.000.000 VND",
    deposit: "5.000.000 VND",
    bookingNo: "43763",
    status: "Pending payment",
  },
  {
    src: "car-10.jpg",
    name: "Mercedes-Benz AMG GT 2021",
    from: "13/02/2022 - 12:00 PM",
    to: "25/02/2022 - 12:00 PM",
    nod: 12,
    basePrice: "1.000.000 VND",
    total: "12.000.000 VND",
    deposit: "5.000.000 VND",
    bookingNo: "43763",
    status: "Pending deposit",
  },
];

const MyBookings = (props) => {
  const { loading = false } = props;
  const [rateValue, setRateValue] = useState(4.5);
  const navigate = useNavigate();
  const cars = useSelector(carSelectedAll).payload.cars;
  const user = useSelector((state) => state.userData);
  const carArray = Object.values(cars.entities);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalCars = carArray.length;
  const totalPages = Math.ceil(totalCars / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const carsOnCurrentPage = carArray.slice(startIndex, endIndex);
  const handleClose = () => {
    setOpenConfirmDeposit(false);
    setOpenConfirmPayment(false);
  };
  const [openConfirmDeposit, setOpenConfirmDeposit] = useState(false);
  const [openConfirmPayment, setOpenConfirmPayment] = useState(false);

  const handleClickOpenConfirmPayment = () => {
    setOpenConfirmPayment(true);
  };
  const [openReturnCar, setOpenReturnCar] = useState(false);
  const handleClickOpenReturnCar = () => {
    setOpenReturnCar(true);
  };
  const handleCloseReturnCar = () => {
    setOpenReturnCar(false);
  };

  const handleClickViewDetails = (carId) => {
    navigate(`/bookingdetails/${carId}`);
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
                to={user?.role === "OWNER" ? "/homeowner" : "/homecustomer"}
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
              <SaveAs sx={{ mr: 0.5 }} fontSize="inherit" />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ display: "flex", alignItems: "center" }}
              >
                My Bookings
              </Typography>
            </Stack>
          </Breadcrumbs>
        </Container>
        <Card elevation={0} sx={{ mb: 5 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" sx={{ pb: 1 }}>
              <List fontSize="large" />
              <Typography variant="h6" fontWeight="bold">
                My bookings:
              </Typography>
            </Stack>
            {(loading ? Array.from(new Array(4)) : carsOnCurrentPage).map(
              (item, index) => (
                <Grid container key={index}>
                  {item ? (
                    <Grid container sx={{ mb: 5 }}>
                      <Grid item xs={5}>
                        <AutoPreviewBooking carId={item.id} />
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h6" fontWeight="bold">
                          {item.brand} {item.model} {item.productionYear}
                        </Typography>
                        <Typography variant="subtitle1">
                          From: 13/02/2022 - 12:00 PM
                        </Typography>
                        <Typography variant="subtitle1">
                          To: 23/02/2022 - 14:00 PM
                        </Typography>
                        <Typography variant="subtitle1">
                          Number of days
                        </Typography>
                        <Typography variant="subtitle1">
                          Base price: {Number(item.price).toLocaleString()} VND
                        </Typography>
                        <Typography variant="subtitle1">
                          Total: {Number(item.price).toLocaleString()} VND
                        </Typography>
                        <Typography variant="subtitle1">
                          Deposit: {Number(item.deposit).toLocaleString()} VND
                        </Typography>
                        <Typography variant="subtitle1">
                          Booking No.:
                        </Typography>
                        <Typography variant="subtitle1">
                          Booking status::{" "}
                          <span
                            style={{
                              color:
                                item.status === "In-Progress"
                                  ? "#fca311"
                                  : item.status === "Pending deposit" ||
                                    item.status === "Pending payment"
                                  ? "#d00000"
                                  : item.status === "Completed"
                                  ? "#00b4d8"
                                  : item.status === "Cancelled"
                                  ? "#6d6875"
                                  : "#38b000",
                              fontWeight: "bold",
                            }}
                          >
                            {item.status}
                          </span>
                        </Typography>
                        <Grid item xs={12}>
                          <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
                            <Button
                              sx={{
                                minWidth: "23%",
                                color: "white",
                                borderColor: "#fca311",
                                "&:hover": {
                                  borderColor: "#fca311",
                                },
                              }}
                              variant="outlined"
                              onClick={() => handleClickViewDetails(item.id)}
                            >
                              View details
                            </Button>
                            {item.status === "Confirmed" ||
                            item.status === "Pending deposit" ? (
                              <Stack direction="row" spacing={3}>
                                <Button
                                  sx={{
                                    minWidth: "30%",
                                    color: "white",
                                    borderColor: "#fca311",
                                    "&:hover": {
                                      borderColor: "#fca311",
                                    },
                                    visibility:
                                      item.status !== "Confirmed" &&
                                      item.status !== "Pending deposit"
                                        ? "hidden"
                                        : "visible",
                                  }}
                                  variant="outlined"
                                  // onClick={handleClickOpenViewDetails}
                                >
                                  Confirm Pick-up
                                </Button>
                                <Button
                                  sx={{
                                    minWidth: "30%",
                                    color: "white",
                                    borderColor: "#d00000",
                                    backgroundColor: "#d00000 !important",
                                    "&:hover": {
                                      color: "#fca311 !important",
                                      bgcolor: "white !important",
                                      borderColor: "#fca311",
                                    },
                                  }}
                                  variant="outlined"
                                  onClick={handleClickOpenConfirmPayment}
                                >
                                  Cancel booking
                                </Button>
                              </Stack>
                            ) : item.status === "In-Progress" ? (
                              <Button
                                sx={{
                                  width: "23%",
                                  color: "white",
                                  borderColor: "#fca311",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                                onClick={handleClickOpenReturnCar}
                              >
                                Return car
                              </Button>
                            ) : (
                              <Button
                                sx={{
                                  visibility: "hidden",
                                }}
                                variant="outlined"
                              >
                                Return car
                              </Button>
                            )}
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : (
                    <Skeleton variant="rectangular" width={210} height={118} />
                  )}
                </Grid>
              )
            )}
            <Pagination
              sx={{ display: "flex", justifyContent: "end", mt: 10 }}
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              showFirstButton
              showLastButton
            />
          </CardContent>
        </Card>
      </Container>
      <ReturnCar open={openReturnCar} onClose={handleCloseReturnCar} />
      <ConfirmPayment open={openConfirmPayment} onClose={handleClose} />
      <ConfirmDeposit open={openConfirmDeposit} onClose={handleClose} />
    </div>
  );
};

export default MyBookings;
