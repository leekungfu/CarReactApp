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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  AccountBalance,
  AttachMoney,
  Commute,
  Home,
  NavigateNext,
  Wallet,
} from "@mui/icons-material";
import ConfirmDeposit from "../../../components/Modals/ConfirmDeposit";
import ConfirmPayment from "../../../components/Modals/ConfirmPayment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { carSelectedAll } from "../../../components/ReduxToolkit/CarAdapter";
import AutoPreview from "./AutoPreview";
import { setBookings } from "../../../components/ReduxToolkit/BookingSlice";
import moment from "moment/moment";
import { DATE_TIME_PICKER_DISPLAY_FORMAT } from "../../../shared/configs/constants";

const style = {
  textAlign: "center",
};

const ViewBookedCar = () => {
  const { carId } = useParams();
  const [rateValue, setRateValue] = useState(4.5);
  const cars = useSelector(carSelectedAll).payload.cars;
  const car = cars.entities[carId];
  const dispatch = useDispatch();
  dispatch(setBookings(cars.entities[carId].bookings));
  const bookings = useSelector((state) => state.bookingData.bookings);
  console.log("Booking: ", bookings);
  const handleClose = () => {
    setOpenConfirmDeposit(false);
    setOpenConfirmPayment(false);
  };
  const [openConfirmDeposit, setOpenConfirmDeposit] = useState(false);
  const [openConfirmPayment, setOpenConfirmPayment] = useState(false);
  const [bookingId, setBookingId] = useState();
  const handleClickOpenConfirmDeposit = (bookingId) => {
    setBookingId(bookingId);
    setOpenConfirmDeposit(true);
  };
  const handleClickOpenConfirmPayment = (bookingId) => {
    setBookingId(bookingId);
    setOpenConfirmPayment(true);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
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
                sx={{
                  color: "#7f7f7f !important",
                  "&:hover": {
                    color: "#fca311 !important",
                  },
                }}
                component={Link}
                to="/cars"
              >
                My Cars
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
                View booked car
              </Typography>
            </Stack>
          </Breadcrumbs>
        </Container>
        <Card elevation={0} sx={{ mb: 5 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" sx={{ pb: 1 }}>
              <List fontSize="large" />
              <Typography variant="h6">LIST OF BOOKINGS:</Typography>
            </Stack>
            <Grid container>
              <Grid item xs={6}>
                <AutoPreview carId={carId} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" fontWeight="bold">
                  {car.brand} {car.model} {car.productionYear}{" "}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1">Rating:</Typography>
                  <Rating defaultValue={3.5} precision={0.5} readOnly />
                </Stack>
                <Typography variant="subtitle1">
                  Number of rides: <span style={{ fontWeight: "bold" }}>4</span>
                </Typography>
                <Typography variant="subtitle1">
                  Price:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {Number(car.price).toLocaleString()} (VND)
                  </span>
                </Typography>
                <Typography variant="subtitle1">
                  Location:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {car.ward}, {car.district}, {car.province}
                  </span>
                </Typography>
                <Typography variant="subtitle1">
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
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 5 }}>
              <TableContainer component={Paper} elevation={5}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={style}>STT</TableCell>
                      <TableCell style={style}>Booking ID</TableCell>
                      <TableCell style={style}>Renting Time</TableCell>
                      <TableCell style={style}>Driver's Information</TableCell>
                      <TableCell style={style}>Payment Method</TableCell>
                      <TableCell style={style}>Booking Status</TableCell>
                      <TableCell style={style}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings &&
                      bookings.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell style={style}>{index + 1}</TableCell>
                          <TableCell style={style}>{item.id}</TableCell>
                          <TableCell style={style}>
                            {moment(item.startDate).format(
                              DATE_TIME_PICKER_DISPLAY_FORMAT
                            )}{" "}
                            -{" "}
                            {moment(item.endDate).format(
                              DATE_TIME_PICKER_DISPLAY_FORMAT
                            )}
                          </TableCell>
                          <TableCell style={style}>
                            {item.info ? item.info : "No information"}
                          </TableCell>
                          <TableCell style={style}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {item.paymentMethod === "Cash" ? (
                                <AttachMoney />
                              ) : item.paymentMethod === "Wallet" ? (
                                <Wallet />
                              ) : (
                                <AccountBalance />
                              )}
                              {item.paymentMethod}
                            </Box>
                          </TableCell>
                          <TableCell style={style}>
                            {item.bookingStatus}
                          </TableCell>
                          <TableCell style={style}>
                            {item.bookingStatus === "Pending_payment" ? (
                              <Button
                                sx={{
                                  color: "white",
                                  borderColor: "#15616d",
                                  backgroundColor: "#15616d !important",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                                onClick={() =>
                                  handleClickOpenConfirmPayment(item.id)
                                }
                              >
                                Confirm payment
                              </Button>
                            ) : item.bookingStatus === "Pending_deposit" ? (
                              <Button
                                sx={{
                                  color: "white",
                                  borderColor: "#fca311",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                                onClick={() =>
                                  handleClickOpenConfirmDeposit(item.id)
                                }
                              >
                                Confirm deposit
                              </Button>
                            ) : item.bookingStatus === "Confirmed" ? (
                              <Button
                                sx={{
                                  minWidth: "50%",
                                  color: "white",
                                  borderColor: "#fca311",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                              >
                                Confirmed
                              </Button>
                            ) : item.bookingStatus === "Completed" ? (
                              <Button
                                sx={{
                                  minWidth: "50%",
                                  color: "white",
                                  borderColor: "#fca311",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                              >
                                Completed
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
                                }}
                                variant="outlined"
                              >
                                Confirm deposit
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <ConfirmPayment
        open={openConfirmPayment}
        onClose={handleClose}
        bookingId={bookingId}
      />
      <ConfirmDeposit
        open={openConfirmDeposit}
        onClose={handleClose}
        bookingId={bookingId}
      />
    </div>
  );
};

export default ViewBookedCar;
