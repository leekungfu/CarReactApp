import {
  Box,
  Button,
  Divider,
  Modal,
  OutlinedInput,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Star } from "@mui/icons-material";

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

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const Review = (props) => {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Rate your trip</Typography>
          <Divider />
          <Typography sx={{ mt: 2, mb: 1 }} variant="body1">
            Do you enjoy your trip, please let us know what you think.
          </Typography>
          <Box sx={{ mb: 1 }}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
          <OutlinedInput multiline fullWidth placeholder="Say something..."/>
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              sx={{
                minWidth: "30%",
              }}
              onClick={handleClose}
              variant="outlined"
            >
              Skip
            </Button>
            <Button
              sx={{
                minWidth: "30%",
              }}
              onClick={handleClose}
              variant="outlined"
            >
              Send feedback
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

Review.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Review;
