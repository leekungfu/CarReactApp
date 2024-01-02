import { Card, CardContent, Dialog, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import ViewDetailsTabs from "../../containers/Account/Car/EditCarDetails";
import Preview from "../Stepper/Steps/Preview";

const ViewDetails = (props) => {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
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
        <CardContent
          sx={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
          }}
        >
          <Preview />
        </CardContent>
      </Card>
      <ViewDetailsTabs open={open} onClose={handleClose} />
    </Dialog>
  );
};

ViewDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewDetails;
