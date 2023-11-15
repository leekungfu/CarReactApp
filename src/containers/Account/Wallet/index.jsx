import React from "react";
import NavMenuUser from "../../../components/NavMenuUser";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Commute, Home, NavigateNext, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRef } from "react";
import { DateRangePicker } from "rsuite";
import { useState } from "react";
import TopUp from "../../../components/Modals/Top-up";
import Withdraw from "../../../components/Modals/Withdraw";
import { DataGrid } from "@mui/x-data-grid";
import {
  DATE_TIME_PICKER_DISPLAY_FORMAT,
  RSUITE_DATE_TIME_PICKER_DISPLAY_FORMAT,
  SERVER_POSTING_DATE_TIME_FORMAT,
} from "../../../shared/configs/constants";
import moment from "moment";
import { useCustomHook } from "../../../App";
import axiosInstance from "../../../shared/configs/axiosConfig";
import { useSnackbar } from "../../../components/Hooks/useSnackBar";

const StyledTypography = styled(Typography)`
  font-weight: bold !important;
`;

const MyWallet = (props) => {
  const grid = useRef(null);
  const { loading = false } = props;
  const [openTopup, setOpenTopup] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [list, setList] = useState([]);
  const { userData: user } = useCustomHook();
  const { createSnack } = useSnackbar();
  const time1 = new Date();
  time1.setHours(0, 0, 0, 0);
  const time2 = new Date();
  time2.setHours(23, 59, 59, 999);
  const [fromTime, setFromTime] = useState(time1);
  const [toTime, setToTime] = useState(time2);
  const handleClickOpenTopup = () => {
    setOpenTopup(true);
  };

  const handleClickOpenWithdraw = () => {
    setOpenWithdraw(true);
  };

  const handleClose = () => {
    setOpenTopup(false);
    setOpenWithdraw(false);
  };
  const handleClickSearch = async () => {
    const token = localStorage.getItem("jwtToken");
    const fromTimeFormatted = moment(fromTime).format(
      SERVER_POSTING_DATE_TIME_FORMAT
    );
    const toTimeFormatted = moment(toTime).format(
      SERVER_POSTING_DATE_TIME_FORMAT
    );
    const { data: response } = await axiosInstance.get(
      "/transactionList",
      {
        params: {
          fromTime: fromTimeFormatted,
          toTime: toTimeFormatted,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.isSuccess === true) {
      setList(response.transactions);
      createSnack(response.message, { severity: "success" });
    } else {
      createSnack(response.message, { severity: "error" });
    }
  };
  const rows = (list || []).map((item, index) => ({
    id: index + 1,
    amount: Number(item.amount).toLocaleString() + " VND",
    type: item.type,
    transactionTime: moment(item.dateTime).format(
      DATE_TIME_PICKER_DISPLAY_FORMAT
    ),
    bookingNumber:
      item.booking && item.booking.bookingId ? item.booking.bookingId : "",
    carName:
      item.booking &&
      `
      ${item.booking.car.brand}
      ${item.booking.car.model}
      ${item.booking.car.productionYear}`
        ? `
      ${item.booking.car.brand}
      ${item.booking.car.model}
      ${item.booking.car.productionYear}`
        : "",
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 90, align: "center" },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      align: "center",
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      align: "center",
      sortable: false,
    },
    {
      field: "transactionTime",
      headerName: "Transaction Time",
      width: 200,
      align: "center",
    },
    {
      field: "bookingNumber",
      headerName: "Booking Number",
      width: 150,
      align: "center",
      sortable: false,
    },
    {
      field: "carName",
      headerName: "Car Name",
      width: 300,
      align: "center",
      sortable: false,
    },
  ];

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
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
              <Commute sx={{ mr: 0.5 }} fontSize="inherit" />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ display: "flex", alignItems: "center" }}
              >
                My Wallet
              </Typography>
            </Stack>
          </Breadcrumbs>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Stack spacing={3}>
            <StyledTypography variant="h6">My Wallet</StyledTypography>
            <StyledTypography variant="subtitle1">
              Your current balance:{" "}
              <span style={{ color: "#38b000", fontWeight: "bold" }}>
                {user.wallet ? Number(user.wallet).toLocaleString() : 0} (VND)
              </span>
            </StyledTypography>
            <Box>
              <Button
                variant="outlined"
                sx={{
                  minWidth: "10%",
                  mr: 2,
                  bgcolor: "#d6ccc2",
                  borderColor: "#d6ccc2",
                }}
                onClick={handleClickOpenWithdraw}
              >
                Withdraw
              </Button>
              <Button
                variant="outlined"
                sx={{
                  minWidth: "10%",
                  bgcolor: "#0fa3b1",
                  borderColor: "#0fa3b1",
                }}
                onClick={handleClickOpenTopup}
              >
                Top-up
              </Button>
            </Box>
            <StyledTypography variant="subtitle1">
              Transactions
            </StyledTypography>
            <Box>
              <DateRangePicker
                format={RSUITE_DATE_TIME_PICKER_DISPLAY_FORMAT}
                value={[new Date(fromTime), new Date(toTime)]}
                onChange={(values) => {
                  setFromTime(values[0]);
                  setToTime(values[1]);
                }}
              />
              <Button
                sx={{
                  minWidth: "15% ",
                  color: "#fca311",
                  bgcolor: "white",
                  borderColor: "#fca311",
                  "&:hover": {
                    color: "white",
                    bgcolor: "#fca311",
                  },
                  ml: 2,
                }}
                variant="outlined"
                onClick={handleClickSearch}
                endIcon={<Search />}
              >
                Search
              </Button>
            </Box>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns.map((column) => ({
                  ...column,
                  headerAlign: "center",
                }))}
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
              />
            </Box>
          </Stack>
        </Container>
      </Container>
      <TopUp open={openTopup} onClose={handleClose} />
      <Withdraw open={openWithdraw} onClose={handleClose} />
    </div>
  );
};

export default MyWallet;
