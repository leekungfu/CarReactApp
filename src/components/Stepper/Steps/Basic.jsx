import {
  Box,
  Grid,
  Input,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Link,
  InputLabel,
} from "@mui/material";
import { Fragment, useState } from "react";
import ColorSelection from "../../Select/ColorSelection";
import BrandsSelection from "../../Select/BrandsSelection";
import ModelsSelection from "../../Select/ModelsSelection";
import ProductionYearSelection from "../../Select/ProductionYearSelection";
import NumberOfSeatsSelection from "../../Select/NumberOfSeats";
import RegistrationPaper from "../../UploadFile/RegistrationPaper";
import Certificate from "../../UploadFile/Certificate";
import Insurance from "../../UploadFile/Insurance";

const Basic = () => {
  const [gearValue, setGearValue] = useState("");
  const [fuelValue, setFuelValue] = useState("");

  const handleGearChange = (event) => {
    setGearValue(event.target.value);
  };

  const handleFuelChange = (event) => {
    setFuelValue(event.target.value);
  };

  return (
    <Fragment>
      <Paper elevation={0}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="red">
              Note: Please check your information carefully, you'll not able to
              change the basic details of you car, which is based on the
              registration information.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2}>
              <OutlinedInput size="small" placeholder="Plate Number" required />
              <ModelsSelection />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2}>
              <ColorSelection />
              <ProductionYearSelection />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2}>
              <BrandsSelection />
              <NumberOfSeatsSelection />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <RadioGroup value={gearValue} onChange={handleGearChange}>
              <InputLabel required>Transmission</InputLabel>
              <FormControlLabel
                control={<Radio value="automatic" color="primary" />}
                label="Automatic"
              />
              <FormControlLabel
                control={<Radio value="manual" color="primary" />}
                label="Manual"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={4}>
            <RadioGroup value={fuelValue} onChange={handleFuelChange}>
              <InputLabel required>Fuel</InputLabel>
              <FormControlLabel
                control={<Radio value="gasoline" color="primary" />}
                label="Gasoline"
              />
              <FormControlLabel
                control={<Radio value="diesel" color="primary" />}
                label="Diesel"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12}>
          <InputLabel required>Documents</InputLabel>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <Typography variant="subtitle2" fontWeight={600}>
                Registration paper
              </Typography>
              <RegistrationPaper />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <Typography variant="subtitle2" fontWeight={600}>
                Certificate of inspection
              </Typography>
              <Certificate />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <Typography variant="subtitle2" fontWeight={600}>
                Insurance
              </Typography>
              <Insurance />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Basic;
