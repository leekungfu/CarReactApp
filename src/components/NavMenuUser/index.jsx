import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserMenu from "../UserMenu";

const pages = ["HOME", "ABOUT US", <UserMenu />];

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: inherit;
  }
  &:focus {
    text-decoration: none;
    color: inherit;
  }
  &:active {
    text-decoration: none;
    color: inherit;
  }
`;

const NavBarCustomer = () => {
  const user = useSelector((state) => state.userData);
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
              color: "inherit",
              textDecoration: "none",
              "&.hover": {
                cursor: "",
                color: "inherit",
                textDecoration: "none",
              },
            }}
            component={StyledLink}
            to={user?.role === "OWNER" ? "/homeowner" : "/homecustomer"}
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
