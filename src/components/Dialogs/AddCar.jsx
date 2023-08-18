import { Card, Dialog, DialogTitle, List } from "@mui/material";
import PropTypes from "prop-types";
import AddCarStepper from "../Stepper/AddCarStepper";
import { Fragment } from "react";

function AddCar(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Fragment>
      <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            fontSize: 25,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
          }}
        >
          ADD CAR STEPS
        </DialogTitle>
        <AddCarStepper open={open} onClose={handleClose} />
      </Dialog>
    </Fragment>
  );
}

AddCar.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AddCar;
