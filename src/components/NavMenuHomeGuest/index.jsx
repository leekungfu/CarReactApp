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
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";

const pages = ["HOME", "ABOUT US", "SIGN UP", "LOG IN"];

const NavBarGuest = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = (page) => {
    if (page === "LOG IN") {
      setOpenLogin(true);
    }

    if (page === "SIGN UP") {
      setOpenSignup(true);
    }

    if (page === "HOME") {
      navigate("/");
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
                textDecoration: "none !important",
                color: "#000000 !important",
                "&:hover": {
                  color: "#fca311 !important",
                },
              }}
              component={Link}
              to="/"
            >
              RENTAL A CAR <span style={{ color: "#fca311" }}>TODAY</span>
            </Typography>
            <DirectionsCarIcon
              fontSize="medium"
              sx={{ display: { xs: "none", md: "flex" }, ml: 1 }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
              }}
            >
              {pages.map((page) => (
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
                  {page}
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
