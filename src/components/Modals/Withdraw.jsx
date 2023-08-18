import {
  Box,
  Button,
  Divider,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

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

const Withdraw = (props) => {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Withdraw</Typography>
          <Divider />
          <Stack spacing={1} sx={{ mt: 2 }} alignItems="center">
            <Typography sx={{ mt: 2 }} variant="body1">
              Please confirm that you have receive the deposit this booking.
              This allow the customer to pick-up the car at the agreed date and
              time.
            </Typography>
            <OutlinedInput
              type="number"
              sx={{ mt: 2, width: "45%" }}
              size="small"
              placeholder="Amount"
            />
            <Typography variant="subtitle2">Unit: VND</Typography>
          </Stack>
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              sx={{
                width: "20%",
              }}
              onClick={handleClose}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              sx={{
                width: "20%",
              }}
              onClick={handleClose}
              variant="outlined"
            >
              OK
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

Withdraw.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Withdraw;
