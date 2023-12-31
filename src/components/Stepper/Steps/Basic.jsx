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
import { Fragment, useEffect, useState } from "react";
import ColorSelection from "../../Select/ColorSelection";
import BrandsSelection from "../../Select/BrandsSelection";
import ModelsSelection from "../../Select/ModelsSelection";
import ProductionYearSelection from "../../Select/ProductionYearSelection";
import NumberOfSeatsSelection from "../../Select/NumberOfSeats";
import RegistrationPaper from "../../UploadFile/RegistrationPaper";
import Certificate from "../../UploadFile/Certificate";
import Insurance from "../../UploadFile/Insurance";
import { useDispatch, useSelector } from "react-redux";
import { updateBasicData, updateData } from "../../ReduxToolkit/basicSlice";

const Basic = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.basic.data);

  const handleDataChange = (event) => {
    const { name, value } = event.target;
    const updateStore = { ...data, [name]: value };
    dispatch(updateBasicData(updateStore));
  };

  const MAX_CHAR = 11;

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
              <OutlinedInput
                name="plateNumber"
                value={data.plateNumber}
                onChange={handleDataChange}
                size="small"
                placeholder="Plate Number"
                required
                inputProps={{ maxLength: MAX_CHAR }}
              />
              <ModelsSelection
                name="model"
                onTypeChange={(model) => {
                  const updateStore = { ...data, model: model };
                  dispatch(updateBasicData(updateStore));
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2}>
              <ColorSelection
                onColorChange={(color) => {
                  const updateStore = { ...data, color: color };
                  dispatch(updateBasicData(updateStore));
                }}
              />
              <ProductionYearSelection
                onProductionYearChange={(productionYear) => {
                  const updateStore = {
                    ...data,
                    productionYear: productionYear,
                  };
                  dispatch(updateBasicData(updateStore));
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2}>
              <BrandsSelection
                onBrandChange={(brand) => {
                  const updateStore = { ...data, brand: brand };
                  dispatch(updateBasicData(updateStore));
                }}
              />
              <NumberOfSeatsSelection
                onNumberOfSeatChange={(numberOfSeat) => {
                  const updateStore = { ...data, numberOfSeat: numberOfSeat };
                  dispatch(updateBasicData(updateStore));
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <RadioGroup
              name="transmissionType"
              value={data.transmissionType}
              onChange={handleDataChange}
            >
              <InputLabel required>Transmission</InputLabel>
              <FormControlLabel
                control={<Radio value="Automatic" color="primary" />}
                label="Automatic"
              />
              <FormControlLabel
                control={<Radio value="Manual" color="primary" />}
                label="Manual"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={4}>
            <RadioGroup
              name="fuelType"
              value={data.fuelType || ""}
              onChange={handleDataChange}
            >
              <InputLabel required>Fuel</InputLabel>
              <FormControlLabel
                control={<Radio value="Gasoline" color="primary" />}
                label="Gasoline"
              />
              <FormControlLabel
                control={<Radio value="Diesel" color="primary" />}
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
              <RegistrationPaper
                onRegistrationPaperChange={(registrationPaper) => {
                  const updateStore = {
                    ...data,
                    documents: {
                      ...data.documents,
                      registrationPaper: registrationPaper,
                    },
                  };
                  dispatch(updateBasicData(updateStore));
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <Typography variant="subtitle2" fontWeight={600}>
                Certificate of inspection
              </Typography>
              <Certificate
                onCertificateChange={(certificate) => {
                  const updateStore = {
                    ...data,
                    documents: {
                      ...data.documents,
                      certificate: certificate,
                    },
                  };
                  dispatch(updateBasicData(updateStore));
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <Typography variant="subtitle2" fontWeight={600}>
                Insurance
              </Typography>
              <Insurance
                onInsuranceChange={(insurance) => {
                  const updateStore = {
                    ...data,
                    documents: {
                      ...data.documents,
                      insurance: insurance,
                    },
                  };
                  dispatch(updateBasicData(updateStore));
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Basic;
