import React, { Component, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Footer from "./Footer";
import NavBar from "./NavMenuHomeGuest";
import NavMenuUser from "./NavMenuUser";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const reduxUserRole = useSelector((state) => state.backendData);
  const userData = localStorage.getItem("userData");
  const userRole = JSON.parse(userData);
  const initialRole =
    userRole && userRole.role ? userRole.role : reduxUserRole.role;

  const [role, setRole] = useState(initialRole);

  useEffect(() => {
    const handleLocalStorageChange = (e) => {
      if (e.key === "userData") {
        const newValue = JSON.parse(e.newValue);
        const updatedRole =
          newValue && newValue.role ? newValue.role : reduxUserRole.role;
        setRole(updatedRole);
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
