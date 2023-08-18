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

const StyledTypography = styled(Typography)`
  font-weight: bold !important;
`;

const rows = [
  { id: 1, amount: "13.000.000 VND", type: "Top-up", transactionTime: "12/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  { id: 2, amount: "13.000.000 VND", type: "Top-up", transactionTime: "22/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  { id: 3, amount: "13.000.000 VND", type: "Withdraw", transactionTime: "15/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  { id: 4, amount: "13.000.000 VND", type: "Pay deposit", transactionTime: "17/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  { id: 5, amount: "13.000.000 VND", type: "Top-up", transactionTime: "04/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  { id: 6, amount: "13.000.000 VND", type: "Offset final payment", transactionTime: "19/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  { id: 7, amount: "13.000.000 VND", type: "Top-up", transactionTime: "04/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  { id: 8, amount: "13.000.000 VND", type: "Offset fnal payment", transactionTime: "25/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  { id: 9, amount: "13.000.000 VND", type: "Withdraw", transactionTime: "29/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  { id: 10, amount: "13.000.000 VND", type: "Top-up", transactionTime: "12/02/2022 18:00", bookingNumber: 1234523, carName: "Mercedes-Benz AMG GT 2021" },
  
];

const columns = [
  { field: "id", headerName: "ID", width: 90, align: "center", },
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
    width: 150,
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

const MyWallet = (props) => {
  const grid = useRef(null);
  const { loading = false } = props;
  const [openTopup, setOpenTopup] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

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

  return (
    <div>
      <NavMenuUser />
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
                100.000.000 VND
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
                format={"yyyy-MM-dd HH:mm:ss"}
                defaultCalendarValue={[
                  new Date("2022-02-01 00:00:00"),
                  new Date("2022-05-01 23:59:59"),
                ]}
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
                onClick={() => grid.current.reload()}
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
