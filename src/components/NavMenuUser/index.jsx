import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import UserMenu from "../UserMenu";
import { Link, useNavigate } from "react-router-dom";

const pages = ["HOME", "ABOUT US", <UserMenu />];

const NavBarCustomer = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userData");
  const handleClickPage = (page) => {
    if (page === "HOME") {
      if (user.role === "CUSTOMER") {
        navigate("/homecustomer");
      } else {
        navigate("/homeowner");
      }
    }
  };
  
  return (
    <Fragment>
      <AppBar color="default" position="sticky">
        <Container maxWidth="lg">
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
              to={user.role && user.role === "CUSTOMER" ? "/homecustomer" : "/homeowner"}
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
              {pages.map((page, index) => (
                <Button
                  key={index}
                  sx={{ fontWeight: 700, bgcolor: "rgba(0,0,0,0)" }}
                  onClick={() => handleClickPage(page)}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default NavBarCustomer;
