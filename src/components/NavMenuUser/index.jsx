import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCustomHook } from "../../App";
import UserMenu from "../UserMenu";

const pages = ["HOME", "ABOUT US", <UserMenu />];

const NavBarCustomer = () => {
  const navigate = useNavigate();
  const { userData: user } = useCustomHook();
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
            to={
              user.role && user.role === "CUSTOMER"
                ? "/homecustomer"
                : "/homeowner"
            }
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
                key={page}
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
  );
};

export default NavBarCustomer;
