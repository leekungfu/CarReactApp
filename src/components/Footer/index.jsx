import {
  Facebook,
  Instagram,
  Phone,
  Place,
  SupportAgent,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Link,
  IconButton,
  ListItemButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Fragment } from "react";
import SignUpForm from "../SignUpForm";

const Footer = () => {
  const [openSignup, setOpenSignup] = useState(false);

  const handleClickOpenSignup = () => {
    setOpenSignup(true);
  };

  const handleCloseSignup = () => {
    setOpenSignup(false);
  };
  return (
    <div style={{ bottom: 0 }}>
      <Container
        sx={{
          backgroundColor: "#f5f5f5",
        }}
        maxWidth="100%"
      >
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <Stack spacing={1} sx={{ pt: 8 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, pb: 5 }}>
                  CAR RENTAL
                </Typography>
                <Typography variant="subtitle1" sx={{ pb: 5 }}>
                  <Link underline="hover" href="#" color="inherit">
                    Search Cars And Rates
                  </Link>
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1} sx={{ pt: 8 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, pb: 5 }}>
                  CUSTOMER ACCESS
                </Typography>
                <Typography variant="subtitle1" sx={{ pb: 2 }}>
                  <Link underline="hover" href="#" color="inherit">
                    Manage My Booking
                  </Link>
                </Typography>
                <Typography variant="subtitle1" sx={{ pb: 2 }}>
                  <Link underline="hover" href="#" color="inherit">
                    My Wallet
                  </Link>
                </Typography>
                <Typography variant="subtitle1" sx={{ pb: 2 }}>
                  <Link underline="hover" href="#" color="inherit">
                    My Car
                  </Link>
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={2}>
              <Stack spacing={1} sx={{ pt: 8 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, pb: 5 }}>
                  JOIN US
                </Typography>
                <Typography
                  onClick={handleClickOpenSignup}
                  variant="subtitle1"
                  sx={{ pb: 2 }}
                >
                  <Link underline="hover" sx={{ cursor: "pointer" }} color="inherit">
                    New User Sign Up
                  </Link>
                </Typography>
                <SignUpForm open={openSignup} onClose={handleCloseSignup} />
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack spacing={1} sx={{ pt: 8 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, pb: 5 }}>
                  HAVE A QUESTION?
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Place />
                  <Typography noWrap variant="subtitle1" sx={{ pb: 2 }}>
                    Location: Alley 193 Trung Kinh - Cau Giay - Ha Noi
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Phone />
                  <Typography variant="subtitle1" sx={{ pb: 2 }}>
                    Tel: + 1900 8899
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <SupportAgent />
                  <Typography variant="subtitle1" sx={{ pb: 2 }}>
                    Support: carrental@support.com
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid>
            <Stack spacing={1}>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                variant="h6"
              >
                Copyright © 2023 All rights reserved
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: "flex", justifyContent: "center", pb: 5 }}
              >
                <IconButton>
                  <Avatar sx={{ bgcolor: "#fca311", width: 45, height: 45 }}>
                    <Facebook fontSize="medium" sx={{ color: "white" }} />
                  </Avatar>
                </IconButton>
                <IconButton>
                  <Avatar sx={{ bgcolor: "#fca311", width: 45, height: 45 }}>
                    <Instagram fontSize="medium" sx={{ color: "white" }} />
                  </Avatar>
                </IconButton>
                <IconButton>
                  <Avatar sx={{ bgcolor: "#fca311", width: 45, height: 45 }}>
                    <YouTube fontSize="medium" sx={{ color: "white" }} />
                  </Avatar>
                </IconButton>
                <IconButton>
                  <Avatar sx={{ bgcolor: "#fca311", width: 45, height: 45 }}>
                    <Twitter fontSize="medium" sx={{ color: "white" }} />
                  </Avatar>
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
        </Container>
      </Container>
    </div>
  );
};

export default Footer;
