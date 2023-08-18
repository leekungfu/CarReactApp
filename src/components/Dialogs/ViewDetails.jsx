import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  OutlinedInput,
  InputLabel,
  Grid,
  Stack,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  AttachMoney,
  Info,
  Key,
  ManageAccounts,
  More,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import CustomTabPanels from "../CustomTabPanels/CustomTabPanels";
import { Fragment } from "react";
import styled from "styled-components";
import ViewDetailsTabs from "../../containers/Account/Car/EditCarDetails";
import AutoPlaySwipePreview from "../Stepper/AutoPlaySwipePreview";
import Preview from "../Stepper/Steps/Preview";

const ViewDetails = (props) => {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth="md"
        fullWidth
        BackdropProps={{
          style: { backgroundColor: "rgba(127, 127, 127, 0.1)" },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: 25,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
          }}
        >
          VIEW DETAILS
        </DialogTitle>
        <Card>
          <CardContent sx={{
              maxHeight: "calc(100vh - 200px)", // Đảm bảo chiều cao của nội dung là 100% - chiều cao tiêu đề và phần footer
              overflowY: "auto", // Cho phép cuộn nội dung khi vượt quá chiều cao tối đa
            }}>
            <Preview />
          </CardContent>
        </Card>
        <ViewDetailsTabs open={open} onClose={handleClose} />
      </Dialog>
    </Fragment>
  );
};

ViewDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewDetails;
