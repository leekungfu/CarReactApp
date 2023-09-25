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
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import ConfirmDeposit from "../../../components/Modals/ConfirmDeposit";
import ConfirmPayment from "../../../components/Modals/ConfirmPayment";
import { Link, useNavigate } from "react-router-dom";
import ReturnCar from "../../../components/Modals/ReturnCar";
import { Home, NavigateNext, SaveAs } from "@mui/icons-material";
import AutoPreviewBooking from "./AutoPreviewBooking";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../shared/configs/axiosConfig";
import {
  setBookingData,
  setBookings,
} from "../../../components/ReduxToolkit/BookingSlice";
import moment from "moment";
import { DATE_TIME_PICKER_DISPLAY_FORMAT } from "../../../shared/configs/constants";
import ConfirmPickUp from "../../../components/Modals/ConfirmPickUp";
import CancelBooking from "../../../components/Modals/CancelBooking";

const MyBookings = (props) => {
  const { loading = false } = props;
  const [rateValue, setRateValue] = useState(4.5);
  const userData = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookings, setBookingss] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    if (!apiCalled) {
      const token = localStorage.getItem("jwtToken");
      axiosInstance
        .get("/customer/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          const data = response.data.bookings;
          setBookingss(data);
          dispatch(setBookings(data));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setApiCalled(true);
        });
    }
  }, [apiCalled, dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalBookings = bookings.length;
  const totalPages = Math.ceil(totalBookings / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const bookingsOnCurrentPage = bookings.slice(startIndex, endIndex);
  const [openConfirmPickUp, setOpenConfirmPickUp] = useState(false);
  const [openCancelBooking, setOpenCancelBooking] = useState(false);
  const [openReturnCar, setOpenReturnCar] = useState(false);

  const handleClose = () => {
    setOpenConfirmPickUp(false);
    setOpenCancelBooking(false);
    setOpenReturnCar(false);
  };
  const handleClickOpenConfirmPickUp = () => {
    setOpenConfirmPickUp(true);
  };
  const handleClickOpenReturnCar = () => {
    setOpenReturnCar(true);
  };
  const handleClickOpenCancelBooking = () => {
    setOpenCancelBooking(true);
  };

  const handleClickViewDetails = (bookingId) => {
    navigate(`/bookingdetails/${bookingId}`);
  };
  const calculateNumberOfDays = (startDate, endDate) => {
    const start = moment(startDate);
  const end = moment(endDate).endOf('day'); // Consider the end of the day
  const duration = moment.duration(end.diff(start));
  const days = duration.asDays();
  return Math.ceil(days);
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
                to={
                  user && user.role === "CUSTOMER"
                    ? "/homecustomer"
                    : "/homeowner"
                }
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
            {(loading ? Array.from(new Array(4)) : bookingsOnCurrentPage).map(
              (item, index) => (
                <Grid container key={index}>
                  {item ? (
                    <Grid container sx={{ mb: 5 }}>
                      <Grid item xs={5}>
                        <AutoPreviewBooking bookingId={item.bookingId} />
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h6" fontWeight="bold">
                          {item.car.brand} {item.car.model}{" "}
                          {item.car.productionYear}
                        </Typography>
                        <Typography variant="subtitle1">
                          From:{" "}
                          {moment(item.startDate).format(
                            DATE_TIME_PICKER_DISPLAY_FORMAT
                          )}
                        </Typography>
                        <Typography variant="subtitle1">
                          To:{" "}
                          {moment(item.endDate).format(
                            DATE_TIME_PICKER_DISPLAY_FORMAT
                          )}
                        </Typography>
                        <Typography variant="subtitle1">
                          Number of days:{" "}
                          {calculateNumberOfDays(item.startDate, item.endDate)}
                        </Typography>
                        <Typography variant="subtitle1">
                          Base price: {Number(item.car.price).toLocaleString()}{" "}
                          VND
                        </Typography>
                        <Typography variant="subtitle1">
                          Total:{" "}
                          {Number(
                            item.car.price *
                              calculateNumberOfDays(
                                item.startDate,
                                item.endDate
                              )
                          ).toLocaleString()}{" "}
                          VND
                        </Typography>
                        <Typography variant="subtitle1">
                          Deposit: {Number(item.car.deposit).toLocaleString()}{" "}
                          VND
                        </Typography>
                        <Typography variant="subtitle1">
                          Booking No.: {item.bookingId}
                        </Typography>
                        <Typography variant="subtitle1">
                          Booking status:{" "}
                          <span
                            style={{
                              color:
                                item.bookingStatus === "In_Progress"
                                  ? "#fca311"
                                  : item.bookingStatus === "Pending_deposit" ||
                                    item.bookingStatus === "Pending_payment"
                                  ? "#d00000"
                                  : item.bookingStatus === "Completed"
                                  ? "#00b4d8"
                                  : item.bookingStatus === "Cancelled"
                                  ? "#6d6875"
                                  : "#38b000",
                              fontWeight: "bold",
                            }}
                          >
                            {item.bookingStatus
                              ? item.bookingStatus
                              : "Loading..."}
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
                              onClick={() =>
                                handleClickViewDetails(item.bookingId)
                              }
                            >
                              View details
                            </Button>
                            {item.bookingStatus === "Confirmed" ||
                            item.bookingStatus === "Pending_deposit" ? (
                              <Stack direction="row" spacing={3}>
                                <Button
                                  disabled={item.bookingStatus !== "Confirmed"}
                                  sx={{
                                    minWidth: "30%",
                                    color: "white",
                                    borderColor: "#fca311",
                                    "&:hover": {
                                      borderColor: "#fca311",
                                    },
                                    visibility:
                                      item.bookingStatus !== "Confirmed" &&
                                      item.bookingStatus !== "Pending_deposit"
                                        ? "hidden"
                                        : "visible",
                                  }}
                                  variant="outlined"
                                  onClick={handleClickOpenConfirmPickUp}
                                >
                                  Confirm Pick-up
                                </Button>
                                <Button
                                  disabled={
                                    item.bookingStatus === "Completed" ||
                                    item.bookingStatus === "Pending_payment"
                                  }
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
                                  onClick={handleClickOpenCancelBooking}
                                >
                                  Cancel booking
                                </Button>
                              </Stack>
                            ) : item.bookingStatus === "In_Progress" ? (
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
                      <ReturnCar
                        open={openReturnCar}
                        onClose={handleClose}
                        booking={item}
                        car={item.car}
                      />
                      <ConfirmPickUp
                        open={openConfirmPickUp}
                        onClose={handleClose}
                        bookingId={item.bookingId}
                      />
                      <CancelBooking
                        open={openCancelBooking}
                        onClose={handleClose}
                        bookingId={item.bookingId}
                      />
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
    </div>
  );
};

export default MyBookings;
