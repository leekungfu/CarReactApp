import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";

const pages = [
  {
    title: "HOME",
    link: "#",
  },
  {
    title: "ABOUT US",
    link: "#",
  },
  {
    title: "SIGN UP",
    link: "#",
  },
  {
    title: "LOG IN",
    link: "#",
  },
];

const NavBarGuest = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const handleClickOpen = (page) => {
    if (page.title === "LOG IN") {
      setOpenLogin(true);
    }

    if (page.title === "SIGN UP") {
      setOpenSignup(true);
    }
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenSignup(false);
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="sticky" color="default">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontFamily: "inherit",
                fontWeight: 800,
                letterSpacing: ".1rem",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              RENTAL A CAR <span style={{ color: "#fca311" }}>TODAY</span>
            </Typography>
            <DirectionsCarIcon
              fontSize="medium"
              sx={{
                display: { xs: "none", md: "flex", cursor: "pointer" },
                ml: 1,
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
              }}
            >
              {pages.map((page, index) => (
                <Button
                  key={page}
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    bgcolor: "rgba(0,0,0,0)",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0)",
                    },
                  }}
                  onClick={() => handleClickOpen(page)}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
            <LoginForm open={openLogin} onClose={handleClose} />
            <SignUpForm open={openSignup} onClose={handleClose} />
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default NavBarGuest;
