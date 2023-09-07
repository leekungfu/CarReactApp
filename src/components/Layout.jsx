import React, { Component } from "react";
import { Box } from "@mui/material";
import Footer from "./Footer";
import NavBar from "./NavMenuHomeGuest";
import NavMenuUser from "./NavMenuUser";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const userInfo = useSelector((state) => state.backendData);
  return (
    <>
      <Box
        className="app-layout"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {userInfo.role ? (
          <NavMenuUser />
        ) : (
          <NavBar />
        )}
        <Box
          className="app-content"
          sx={{
            position: "relative",
            width: "100%",
            flex: 1,
            mb: 10
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Layout;
