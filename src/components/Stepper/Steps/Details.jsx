import {
  Box,
  Container,
  Grid,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Provinces from "../../Select/Provinces";
import FrontOfCar from "../../UploadFile/FrontOfCar";
import RightOfCar from "../../UploadFile/RightOfCar";
import LeftOfCar from "../../UploadFile/LeftOfCar";
import BackOfCar from "../../UploadFile/BackOfCar";
import {
  Album,
  Bluetooth,
  Camera,
  GpsFixed,
  Living,
  NoStroller,
  SolarPower,
  Usb,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateDetailsData } from "../../ReduxToolkit/detailsSlice";
import { NumericFormat } from "react-number-format";

const Details = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.details.data);

  const handleDataChange = (event) => {
    const { name, value } = event.target;
    const updateDetails = { ...data, [name]: value };
    dispatch(updateDetailsData(updateDetails));
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const updatedAdditionalFunctions = data.additionalFunctions.includes(value)
      ? data.additionalFunctions.filter((func) => func !== value)
      : [...data.additionalFunctions, value];

    const updateDetails = {
      ...data,
      additionalFunctions: updatedAdditionalFunctions,
    };

    dispatch(updateDetailsData(updateDetails));
  };

  const handleSelectedOptionsChange = (options) => {
    const updateDetails = {
      ...data,
      province: options[0].province,
      district: options[0].district,
      ward: options[0].ward,
    };
    dispatch(updateDetailsData(updateDetails));
  };

  useEffect(() => {
    console.log(data);
  }, [data])

  const MAX_LIMIT_MILEAGE = 100000;
  const MAX_LIMIT_FUELCONSUMPTION = 20;
  const MAX_WORD_LIMIT = 1000;

  return (
    <Box>
      <Paper elevation={0}>
        <Stack direction="column" spacing={2}>
          <NumericFormat
            customInput={OutlinedInput}
            thousandSeparator={true}
            isAllowed={(value) => {
              const { floatValue, formattedValue } = value;
              return floatValue <= MAX_LIMIT_MILEAGE || formattedValue === "";
            }}
            name="mileage"
            fullWidth
            suffix=" (km)"
            placeholder="Total Kilometers - Max: 100.000 km"
            value={data.mileage}
            onChange={handleDataChange}
          />
          <NumericFormat
            customInput={OutlinedInput}
            thousandSeparator={true}
            decimalSeparator="."
            decimalScale={1}
            fixedDecimalScale
            isAllowed={(value) => {
              const { floatValue, formattedValue } = value;
              return (
                floatValue <= MAX_LIMIT_FUELCONSUMPTION || formattedValue === ""
              );
            }}
            name="fuelConsumption"
            fullWidth
            suffix=" (liter/100km)"
            placeholder="Fuel Consumption (liter/100km)"
            value={data.fuelConsumption}
            onChange={handleDataChange}
          />
          <Provinces onSelectedOptionsChange={handleSelectedOptionsChange} />
          <OutlinedInput
            name="street"
            fullWidth
            placeholder="Street"
            value={data.street}
            onChange={handleDataChange}
          />
          <OutlinedInput
            name="description"
            multiline
            fullWidth
            placeholder="Description of vehicle"
            value={data.description}
            onChange={handleDataChange}
            inputProps={{ maxLength: MAX_WORD_LIMIT }}
          />
          {data.description && data.description.length <= MAX_WORD_LIMIT && (
            <Typography variant="caption" color="red">
              <span style={{ fontWeight: "bold" }}>
                {MAX_WORD_LIMIT - data.description.length}{" "}
              </span>
              characters remaining.
            </Typography>
          )}
        </Stack>
        <Grid container sx={{ pt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" fontWeight={600}>
              Additional functions
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.additionalFunctions.includes("bluetooth")}
                    value="bluetooth"
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                      Bluetooth
                    </Typography>
                    <Bluetooth fontSize="inherit" />
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.additionalFunctions.includes("gps")}
                    value="gps"
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                      GPS
                    </Typography>
                    <GpsFixed fontSize="inherit" />
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.additionalFunctions.includes("camera")}
                    value="camera"
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                      Camera
                    </Typography>
                    <Camera fontSize="inherit" />
                  </Box>
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.additionalFunctions.includes("sunRoof")}
                    value="sunRoof"
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                      Sun roof
                    </Typography>
                    <SolarPower fontSize="inherit" />
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.additionalFunctions.includes("childLock")}
                    value="childLock"
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                      Child lock
                    </Typography>
                    <NoStroller fontSize="inherit" />
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.additionalFunctions.includes("childSeat")}
                    value="childSeat"
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                      Child seat
                    </Typography>
                    <Living fontSize="inherit" />
                  </Box>
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.additionalFunctions.includes("dvd")}
                    value="dvd"
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                      DVD
                    </Typography>
                    <Album fontSize="inherit" />
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.additionalFunctions.includes("usb")}
                    value="usb"
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>
                      USB
                    </Typography>
                    <Usb fontSize="inherit" />
                  </Box>
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{ pt: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" fontWeight={600}>
                Front image
              </Typography>
              <FrontOfCar
                onFrontImageChange={(value) => {
                  const updateData = {
                    ...data,
                    images: {
                      ...data.images,
                      frontImage: value,
                    },
                  };
                  dispatch(updateDetailsData(updateData));
                }}
              />
              <Typography variant="subtitle2" fontWeight={600}>
                Right image
              </Typography>
              <RightOfCar
                onRightImageChange={(value) => {
                  const updateData = {
                    ...data,
                    images: {
                      ...data.images,
                      rightImage: value,
                    },
                  };
                  dispatch(updateDetailsData(updateData));
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4} sx={{ pt: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" fontWeight={600}>
                Left image
              </Typography>
              <LeftOfCar
                onLeftImageChange={(value) => {
                  const updateData = {
                    ...data,
                    images: {
                      ...data.images,
                      leftImage: value,
                    },
                  };
                  dispatch(updateDetailsData(updateData));
                }}
              />
              <Typography variant="subtitle2" fontWeight={600}>
                Back image
              </Typography>
              <BackOfCar
                onBackImageChange={(value) => {
                  const updateData = {
                    ...data,
                    images: {
                      ...data.images,
                      backImage: value,
                    },
                  };
                  dispatch(updateDetailsData(updateData));
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Details;
