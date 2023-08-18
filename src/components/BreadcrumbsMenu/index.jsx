import { Home, NavigateNext, Person } from "@mui/icons-material";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import React from "react";

const BreadcrumbsMenu = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div role="presentation" onClick={handleClick}>
      <Container maxWidth="lg">
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center", color: "black" }}
            href="/"
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            <Typography variant="subtitle1" fontWeight="bold">
              Home
            </Typography>
          </Link>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Person sx={{ mr: 0.5 }} fontSize="inherit" />
            Profile
          </Typography>
        </Breadcrumbs>
      </Container>
    </div>
  );
};

export default BreadcrumbsMenu;
