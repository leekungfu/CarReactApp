import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Fragment, useState } from "react";
import LogOut from "../Modals/LogOutt";
import LogOutt from "../Modals/LogOutt";

const StyledMenuItem = styled(MenuItem)`
  cursor: pointer;
  text-decoration: none !important;
  color: black !important;
`;

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openLogout, setOpenLogout] = useState(false);

  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  return (
    <Fragment>
      <Box>
        <Tooltip title="User Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <Person />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            "& .MuiMenu-list": {
              minWidth: 150,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <StyledMenuItem component={Link} to="/profile">
          <Typography variant="subtitle1">My Profile</Typography>
        </StyledMenuItem>
        <StyledMenuItem component={Link} to="/cars">
          <Typography variant="subtitle1">My Cars</Typography>
        </StyledMenuItem>
        <StyledMenuItem component={Link} to="/booking">
          <Typography variant="subtitle1">My Booking</Typography>
        </StyledMenuItem>
        <StyledMenuItem component={Link} to="/wallet">
          <Typography variant="subtitle1">My Wallet</Typography>
        </StyledMenuItem>
        <StyledMenuItem component={Link} to="/feedback">
          <Typography variant="subtitle1">My Feedback</Typography>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem component={Link} onClick={handleClickOpenLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="subtitle1">Logout</Typography>
        </StyledMenuItem>
      </Menu>
      <LogOutt open={openLogout} onClose={handleCloseLogout} />
    </Fragment>
  );
}
