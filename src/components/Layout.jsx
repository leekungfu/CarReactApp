import React, { Component, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Footer from "./Footer";
import NavBar from "./NavMenuHomeGuest";
import NavMenuUser from "./NavMenuUser";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const reduxUserRole = useSelector((state) => state.backendData);
  const [role, setRole] = useState(
    localStorage.getItem("userRole") || reduxUserRole.role
  );
  useEffect(() => {
    const handleLocalStorageChange = (e) => {
      if (e.key === "userRole") {
        setRole(e.newValue || reduxUserRole.role);
      }
    };

    window.addEventListener("storage", handleLocalStorageChange);

    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
  }, [reduxUserRole.role]);

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
        {role ? <NavMenuUser /> : <NavBar />}
        <Box
          className="app-content"
          sx={{
            position: "relative",
            width: "100%",
            flex: 1,
            mb: 10,
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
