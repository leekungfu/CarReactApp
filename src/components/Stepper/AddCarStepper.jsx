import React from "react";
import { useState, Fragment } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Basic from "./Steps/Basic";
import { Description, DoneAll, Info, LocalAtm } from "@mui/icons-material";
import Details from "./Steps/Details";
import Pricing from "./Steps/Pricing";
import Preview from "./Steps/Preview";
import PropTypes from "prop-types";
import { Link, useHistory, useNavigate } from "react-router-dom";

const AddCarStepper = (props) => {
  const { open, onClose } = props;

  const icons = {
    1: <Description />,
    2: <Info />,
    3: <LocalAtm />,
    4: <DoneAll />,
  };
  const steps = ["Basic", "Details", "Pricing", "Preview"];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate();
  
  const handleClickViewCars = () => {
    navigate("/cars");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card elevation={0}>
        <CardContent>
          <Stepper
            sx={{
              color: "#fca311",
              "& .MuiStepConnector-root": {
                backgroundColor: "#f0f0f0",
              },
              "& .MuiStepIcon-root.MuiStepIcon-active": {
                backgroundColor: "#00bcd4",
              },
              "& .MuiStepIcon-root.MuiStepIcon-completed": {
                backgroundColor: "#4caf50",
              },
            }}
            orientation="horizontal"
            activeStep={activeStep}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={index} {...stepProps}>
                  <StepLabel
                    StepIconComponent={() => icons[index + 1]}
                    {...labelProps}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Paper elevation={0} sx={{ mt: 5 }}>
            {activeStep === 0 && <Basic />}
            {activeStep === 1 && <Details />}
            {activeStep === 2 && <Pricing />}
            {activeStep === 3 && <Preview />}
          </Paper>
          {activeStep === steps.length ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{
                  color: "white",
                  border: "solid 1px",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={handleClickViewCars}
              >
                View your cars
              </Button>
            </Box>
          ) : (
            <Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ border: "solid 1px", mr: 1, color: "white" }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={handleNext}
                  sx={{ border: "solid 1px", color: "white" }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Fragment>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

AddCarStepper.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AddCarStepper;
