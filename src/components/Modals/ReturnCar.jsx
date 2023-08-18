import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Review from "./Review";

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

const ReturnCar = (props) => {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const [openReview, setOpenReview] = useState(false);

  const handleClickOpenReview = () => {
    setOpenReview(true);
    handleClose();
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };


  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Return car</Typography>
          <Divider />
          <Typography sx={{ mt: 2 }} variant="body1">
            Please confrm to return the car. The remaining amount of 1,500,000
            VND will be deducted from your wallet.
          </Typography>
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="end"
          >
            <Button
              sx={{
                width: "20%",
              }}
              onClick={handleClose}
              variant="outlined"
            >
              No
            </Button>
            <Button
              sx={{
                width: "20%",
              }}
              onClick={handleClickOpenReview}
              variant="outlined"
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Review open={openReview} onClose={handleCloseReview} />
    </div>
  );
};

ReturnCar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReturnCar;
