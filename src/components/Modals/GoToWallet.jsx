import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  border: "1px solid",
  p: 3,
};
const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }
`;

const GoToWallet = (props) => {
  const { open, onClose } = props;
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
  };
  const handleClickGo = () => {
    navigate("/wallet");
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const handleClickReturn = () => {
    navigate("/booking");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div>
      <StyledModal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ mt: 1, mb: 2 }} variant="subtitle1">
            Your wallet is not enough to pay the left cost.This car has been
            returned successfully, but you do not payment yet. Please top-up and
            try again!
          </Typography>
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="end"
          >
            <Button
              sx={{ minWidth: "30%" }}
              variant="outlined"
              onClick={handleClickReturn}
            >
              Return booking
            </Button>
            <Button
              sx={{ minWidth: "30%" }}
              variant="outlined"
              onClick={handleClickGo}
            >
              Go to wallet
            </Button>
          </Stack>
        </Box>
      </StyledModal>
    </div>
  );
};

GoToWallet.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GoToWallet;
