import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid",
  p: 3,
  textAlign: "center",
};

const NotifyReset = (props) => {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ mt: 1, mb: 2 }} variant="subtitle1">
            If this email address exists, we'll send an email with the link to
            reset your password.
          </Typography>
          <Button
            sx={{ minWidth: "30%" }}
            onClick={handleClose}
            variant="outlined"
          >
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

NotifyReset.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotifyReset;
