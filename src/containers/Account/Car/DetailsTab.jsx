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
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { NumericFormat } from "react-number-format";
import {
  carSelected,
  carUpdated,
} from "../../../components/ReduxToolkit/CarAdapter";
import Provinces from "../../../components/Select/Provinces";
import FrontOfCar from "../../../components/UploadFile/FrontOfCar";
import RightOfCar from "../../../components/UploadFile/RightOfCar";
import LeftOfCar from "../../../components/UploadFile/LeftOfCar";
import BackOfCar from "../../../components/UploadFile/BackOfCar";
import { updateDetailsData } from "../../../components/ReduxToolkit/detailsSlice";

const DetailsTab = (props) => {
  const { carId } = props;
  const dispatch = useDispatch();
  const car = useSelector((state) => carSelected(state, carId)).payload.cars;
  const carInfo = car.entities[carId];

  const [fieldsState, setFieldsState] = useState({
    mileage: carInfo.mileage,
    fuelConsumption: carInfo.fuelConsumption,
    province: carInfo.province,
    district: carInfo.district,
    ward: carInfo.ward,
    street: carInfo.street,
    description: carInfo.description,
    bluetooth: carInfo.additionalFunctions.includes("bluetooth"),
    gps: carInfo.additionalFunctions.includes("gps"),
    camera: carInfo.additionalFunctions.includes("camera"),
    sunRoof: carInfo.additionalFunctions.includes("sunRoof"),
    childLock: carInfo.additionalFunctions.includes("childLock"),
    childSeat: carInfo.additionalFunctions.includes("childSeat"),
    dvd: carInfo.additionalFunctions.includes("dvd"),
    usb: carInfo.additionalFunctions.includes("usb"),
  });

  const handleDataChange = (event) => {
    const { name, value } = event.target;
    setFieldsState((prevFieldsState) => ({
      ...prevFieldsState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const updatedAdditionalFunctions = carInfo.additionalFunctions.includes(
      value
    )
      ? carInfo.additionalFunctions.filter((func) => func !== value)
      : [...carInfo.additionalFunctions, value];

    const updatedStates = { ...fieldsState };

    // Cập nhật trạng thái cho checkbox được click
    updatedStates[value] = !updatedStates[value];

    // Cập nhật trạng thái của tất cả các checkbox
    setFieldsState(updatedStates);
  };

  const handleSelectedOptionsChange = (options) => {
    setFieldsState((prevFieldsState) => ({
      ...prevFieldsState,
      province: options[0].province,
      district: options[0].district,
      ward: options[0].ward,
    }));
  };

  const handleClickSave = () => {
    // Create a copy of carInfo
  const updatedCarInfo = { ...carInfo };

  // Update the fields in updatedCarInfo with the values in fieldsState
  updatedCarInfo.mileage = fieldsState.mileage;
  updatedCarInfo.fuelConsumption = fieldsState.fuelConsumption;
  updatedCarInfo.province = fieldsState.province;
  updatedCarInfo.district = fieldsState.district;
  updatedCarInfo.ward = fieldsState.ward;
  updatedCarInfo.street = fieldsState.street;
  updatedCarInfo.description = fieldsState.description;

  // Update additionalFunctions based on checkbox state
  updatedCarInfo.additionalFunctions = Object.keys(fieldsState).filter(
    (key) => fieldsState[key] && key !== "province" && key !== "district" && key !== "ward"
  );

  // Dispatch the action to update the car details
  dispatch(carUpdated(updatedCarInfo));
  };

  useEffect(() => {
    console.log(carInfo);
  }, [carInfo]);

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
            suffix=" (km)"
            name="mileage"
            fullWidth
            placeholder="Total Kilometers - Max: 100.000 km"
            value={carInfo.mileage}
            onChange={handleDataChange}
          />
          <NumericFormat
            customInput={OutlinedInput}
            thousandSeparator={true}
            decimalSeparator="."
            decimalScale={1}
            fixedDecimalScale
            suffix=" (liter/100km)"
            isAllowed={(value) => {
              const { floatValue, formattedValue } = value;
              return (
                floatValue <= MAX_LIMIT_FUELCONSUMPTION || formattedValue === ""
              );
            }}
            name="fuelConsumption"
            fullWidth
            placeholder="Fuel Consumption (liter/100km)"
            value={carInfo.fuelConsumption}
            onChange={handleDataChange}
          />
          <Provinces onSelectedOptionsChange={handleSelectedOptionsChange} />
          <OutlinedInput
            name="street"
            fullWidth
            placeholder="Street"
            value={carInfo.street}
            onChange={handleDataChange}
          />
          <OutlinedInput
            name="description"
            multiline
            fullWidth
            placeholder="Description of vehicle"
            value={carInfo.description}
            onChange={handleDataChange}
            inputProps={{ maxLength: MAX_WORD_LIMIT }}
          />
          {carInfo.description &&
            carInfo.description.length <= MAX_WORD_LIMIT && (
              <Typography variant="caption" color="red">
                <span style={{ fontWeight: "bold" }}>
                  {MAX_WORD_LIMIT - carInfo.description.length}{" "}
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
                    checked={fieldsState.bluetooth}
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
                    checked={fieldsState.gps}
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
                    checked={fieldsState.camera}
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
                    checked={fieldsState.sunRoof}
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
                    checked={fieldsState.childLock}
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
                    checked={fieldsState.childSeat}
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
                    checked={fieldsState.dvd}
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
                    checked={fieldsState.usb}
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
                    ...carInfo,
                    files: {
                      ...carInfo.files,
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
                    ...carInfo,
                    files: {
                      ...carInfo.files,
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
                    ...carInfo,
                    files: {
                      ...carInfo.files,
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
                    ...carInfo,
                    files: {
                      ...carInfo.files,
                      backImage: value,
                    },
                  };
                  dispatch(updateDetailsData(updateData));
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="center"
          sx={{ mt: 5 }}
        >
          <Button
            sx={{
              border: "solid 1px",
              color: "white",
              borderColor: "#fca311",
              "&:hover": {
                borderColor: "#fca311",
              },
              width: "16%",
            }}
            variant="outlined"
          >
            Discard
          </Button>
          <Button
            sx={{
              color: "white",
              border: "solid 1px",
              borderColor: "#fca311",
              "&:hover": {
                borderColor: "#fca311",
              },
              width: "16%",
            }}
            variant="outlined"
            onClick={handleClickSave}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default DetailsTab;
