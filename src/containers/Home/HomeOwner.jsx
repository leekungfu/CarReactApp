import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import NavMenuCustomer from "../../components/NavMenuUser";
import {
  Add,
  CarRental,
  CurrencyExchange,
  CurrencyExchangeOutlined,
  HowToReg,
  List,
  MoneyOff,
  Payment,
  SwipeRight,
} from "@mui/icons-material";
import styled from "styled-components";
import { useState } from "react";
import AddCar from "../../components/Dialogs/AddCar";
import NavMenuUser from "../../components/NavMenuUser";
import Footer from "../../components/Footer";
import { Fragment } from "react";

const StyledTypography = styled(Typography)`
  font-weight: 600;
`;

const HomeOwner = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavMenuUser />
      <Container maxWidth="lg">
        <Card elevation={0}>
          <CardContent>
            <Box sx={{ pt: 3, pb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Don't miss out of your benefit today!
              </Typography>
            </Box>
            <Grid container columnSpacing={10} rowSpacing={10}>
              <Grid item xs={4}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ pb: 2, alignItems: "center" }}
                >
                  <CurrencyExchange />
                  <StyledTypography variant="h6">
                    How the insurance works?
                  </StyledTypography>
                </Stack>
                <Typography variant="subtitle1">
                  From the minute you hand the keys over till the second you get
                  them back you are covered. Your private insurance is not
                  affected.
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ pb: 2, alignItems: "center" }}
                >
                  <MoneyOff />
                  <StyledTypography variant="h6">
                    It's completely free
                  </StyledTypography>
                </Stack>
                <Typography variant="subtitle1">
                  We offer both owners and renters free sign-ups. It's only once
                  vehicle is rented-out that a share is deducted to cover admin
                  and insurance.
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ pb: 2, alignItems: "center" }}
                >
                  <SwipeRight />
                  <StyledTypography variant="h6">
                    You decide the renting price
                  </StyledTypography>
                </Stack>
                <Typography variant="subtitle1">
                  When you list cars you decide these price. We can help with as
                  to price, but finally you decide!
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ pb: 2, alignItems: "center" }}
                >
                  <CarRental />
                  <StyledTypography variant="h6">
                    Handling over your vehicle
                  </StyledTypography>
                </Stack>
                <Typography variant="subtitle1">
                  You arrange th time and location for the exchange of your
                  vehicle with the renter.Both parties will need to agree and
                  sign the vehicle rental sheet before and after key handover.
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ pb: 2, alignItems: "center" }}
                >
                  <HowToReg />
                  <StyledTypography variant="h6">
                    You are in charge
                  </StyledTypography>
                </Stack>
                <Typography variant="subtitle1">
                  All renters are pre-screened by us to ensure safety and get
                  your approval. If you do not feel comfortable with someone you
                  are able to decline a booking.
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ pb: 2, alignItems: "center" }}
                >
                  <Payment />
                  <StyledTypography variant="h6">Set payment</StyledTypography>
                </Stack>
                <Typography variant="subtitle1">
                  We pay you once a month, and you can always view much your car
                  has earned under you user profile.
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                pt: 10,
                pb: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <StyledTypography variant="h5">
                Make money on your cars right now
              </StyledTypography>
            </Box>
            <Stack direction="row" spacing={3} justifyContent="center">
              <AddCar open={open} onClose={handleClose} />
              <Button
                sx={{
                  minWidth: 100,
                  color: "white",
                  borderColor: "#fca311",
                  "&:hover": {
                    borderColor: "#fca311",
                  },
                }}
                variant="outlined"
                endIcon={<List />}
                onClick={handleClickOpen}
              >
                LIST YOUR CAR
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default HomeOwner;
