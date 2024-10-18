import { Dialog, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import AddCarStepper from "../Stepper/AddCarStepper";

function AddCar(props) {
  return (
    <Dialog onClose={props.onClose} open={props.open} maxWidth="md" fullWidth>
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
      <AddCarStepper open={props.open} onClose={props.onClose} />
    </Dialog>
  );
}

AddCar.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AddCar;
