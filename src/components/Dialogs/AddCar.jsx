import { Dialog, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import AddCarStepper from "../Stepper/AddCarStepper";

function AddCar(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
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
  );
}

AddCar.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AddCar;
