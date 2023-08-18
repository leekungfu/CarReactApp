import React, { Component } from "react";
import { Box } from "@mui/material";
import Footer from "./Footer";
import NavBar from "./NavMenuHomeGuest";
import NavMenuUser from "./NavMenuUser";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    const { userType } = this.props;

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
          <Box
            className="app-content"
            sx={{
              position: "relative",
              width: "100%",
              flex: 1,
            }}
          >
            {this.props.children}
          </Box>
          {userType === "homeguest" && <NavBar />}
          {userType === "homecustomer" && <NavMenuUser />}
          {userType === "homeowner" && <NavMenuUser />}
          <Footer/>
        </Box>
      </>
    );
  }
}
