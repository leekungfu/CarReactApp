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

const ResetSuccess = (props) => {
  const { open, onClose } = props;

  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
  };
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ mt: 1, mb: 2, fontWeight: "bold", color: "#38b000" }} variant="h6">
            Reset password successfully!
          </Typography>
          <Button
            sx={{ minWidth: "30%" }}
            onClick={handleClick}
            variant="outlined"
          >
            Login now
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

ResetSuccess.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResetSuccess;
