import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  CarRental,
  CurrencyExchange,
  HowToReg,
  List,
  MoneyOff,
  Payment,
  SwipeRight,
} from "@mui/icons-material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import AddCar from "../../components/Dialogs/AddCar";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useDispatch } from "react-redux";
import { carsAdded } from "../../components/ReduxToolkit/CarAdapter";
import { setUserData } from "../../components/ReduxToolkit/UserSlice";

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
  const dispatch = useDispatch();

  const [carArray, setCarArray] = useState([]);
  const key = carArray.length;
  const [apiCalled, setApiCalled] = useState(false);
  useEffect(() => {
    if (!apiCalled) {
      const token = localStorage.getItem("jwtToken");
      axiosInstance
        .get("/owner/cars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.isSuccess === true) {
            console.log("Car: ",response.data);
            setCarArray(response.data.member.cars);
            dispatch(setUserData(response.data.member));
            dispatch(carsAdded(response.data.member.cars));
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setApiCalled(true);
        });
    }
  }, [apiCalled, dispatch, key]);

  // useEffect(() => {
  //   if (!apiCalled) {
  //     const token = localStorage.getItem("jwtToken");
  //     axiosInstance
  //       .get("/currentUser", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         dispatch(setUserData(response.data));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       })
  //       .finally(() => {
  //         setApiCalled(true);
  //       });
  //   }
  // }, [apiCalled, dispatch]);

  return (
    <div>
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
