import {
  Box,
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
import axiosInstance from "../../../shared/configs/axiosConfig";
import { useNavigate } from "react-router-dom";

const DetailsTab = (props) => {
  const { carId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const car = useSelector((state) => carSelected(state, carId)).payload.cars;
  const carInfo = car.entities[carId];
  const token = localStorage.getItem("jwtToken");

  const [fieldsState, setFieldsState] = useState({
    mileage: carInfo.mileage,
    fuelConsumption: carInfo.fuelConsumption,
    province: carInfo.province,
    district: carInfo.district,
    ward: carInfo.ward,
    street: carInfo.street,
    description: carInfo.description,
    additionalFunctions: carInfo.additionalFunctions,
    files: [],
  });

  const [additionalFunctionsState, setAdditionalFunctionsState] = useState({
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
    const updatedAdditionalFunctions = fieldsState.additionalFunctions.includes(
      value
    )
      ? fieldsState.additionalFunctions.filter((func) => func !== value)
      : [...fieldsState.additionalFunctions, value];

    setAdditionalFunctionsState((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
    setFieldsState((prevFieldsState) => ({
      ...prevFieldsState,
      additionalFunctions: updatedAdditionalFunctions,
    }));
  };

  const handleSelectedOptionsChange = (options) => {
    setFieldsState((prevFieldsState) => ({
      ...prevFieldsState,
      province: options[0].province,
      district: options[0].district,
      ward: options[0].ward,
    }));
  };

  const handleClickSave = async () => {
    const carData = {
      mileage: typeof fieldsState.mileage === "string"
      ? fieldsState.mileage.replace(/,|\./g, "")
      : fieldsState.mileage,
      fuelConsumption:
      typeof fieldsState.fuelConsumption === "string"
      ? fieldsState.fuelConsumption.replace(/,|\./g, "")
       : fieldsState.fuelConsumption ,
      province: fieldsState.province,
      district: fieldsState.district,
      ward: fieldsState.ward,
      street: fieldsState.street,
      description: fieldsState.description,
      additionalFunctions: fieldsState.additionalFunctions,
    };

    const formData = new FormData();
    for (const key in carData) {
      if (Array.isArray(carData[key])) {
        carData[key].forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, carData[key]);
      }
    }

    const imageNames = ["frontImage", "backImage", "rightImage", "leftImage"];

    imageNames.forEach((imageName) => {
      const imageData = fieldsState.files[imageName];
      if (imageData) {
        formData.append("images", imageData, imageName);
      }
    });

    const response = await axiosInstance.post(
      `/owner/updateDetails/${carId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.isSuccess === true) {
      console.log("Update successfully");
      dispatch(carUpdated(response.data.car));
    }
  };

  useEffect(() => {
    const fieldsStateText = JSON.stringify(fieldsState, null, 2);
    console.log("FieldsState: ", fieldsStateText);
    console.log("Car info: ", typeof carInfo.additionalFunctions);
    console.log("Additionals: ", additionalFunctionsState);
    console.log("Fields: ", fieldsState);
  }, [carInfo, additionalFunctionsState, fieldsState]);

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
            placeholder="Total Kilometers - Max: 100.000 km"
            value={fieldsState.mileage}
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
            placeholder="Fuel Consumption (liter/100km)"
            value={fieldsState.fuelConsumption}
            onChange={handleDataChange}
          />
          <Provinces onSelectedOptionsChange={handleSelectedOptionsChange} />
          <OutlinedInput
            name="street"
            fullWidth
            placeholder="Street"
            value={fieldsState.street}
            onChange={handleDataChange}
          />
          <OutlinedInput
            name="description"
            multiline
            fullWidth
            placeholder="Description of vehicle"
            value={fieldsState.description}
            onChange={handleDataChange}
            inputProps={{ maxLength: MAX_WORD_LIMIT }}
          />
          {fieldsState.description &&
            fieldsState.description.length <= MAX_WORD_LIMIT && (
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
                    checked={additionalFunctionsState.bluetooth}
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
                    checked={additionalFunctionsState.gps}
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
                    checked={additionalFunctionsState.camera}
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
                    checked={additionalFunctionsState.sunRoof}
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
                    checked={additionalFunctionsState.childLock}
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
                    checked={additionalFunctionsState.childSeat}
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
                    checked={additionalFunctionsState.dvd}
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
                    checked={additionalFunctionsState.usb}
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
                onFrontImageChange={(value) =>
                  setFieldsState((prevFieldsState) => ({
                    ...prevFieldsState,
                    files: {
                      ...prevFieldsState.files,
                      frontImage: value,
                    },
                  }))
                }
              />
              <Typography variant="subtitle2" fontWeight={600}>
                Right image
              </Typography>
              <RightOfCar
                onRightImageChange={(value) =>
                  setFieldsState((prevFieldsState) => ({
                    ...prevFieldsState,
                    files: {
                      ...prevFieldsState.files,
                      rightImage: value,
                    },
                  }))
                }
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
                onLeftImageChange={(value) =>
                  setFieldsState((prevFieldsState) => ({
                    ...prevFieldsState,
                    files: {
                      ...prevFieldsState.files,
                      leftImage: value,
                    },
                  }))
                }
              />
              <Typography variant="subtitle2" fontWeight={600}>
                Back image
              </Typography>
              <BackOfCar
                onBackImageChange={(value) =>
                  setFieldsState((prevFieldsState) => ({
                    ...prevFieldsState,
                    files: {
                      ...prevFieldsState.files,
                      backImage: value,
                    },
                  }))
                }
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
            onClick={() => navigate("/cars")}
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
