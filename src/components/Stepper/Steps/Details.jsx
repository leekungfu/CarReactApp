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

const Details = () => {
  const [data, setData] = useState({
    mileage: "",
    fuelConsumption: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    description: "",
    additionalFunctions: [],
    images: [],
  });

  const handleDataChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setData((prevData) => {
      const updated = {
        ...prevData,
      };
      const checkExisted = prevData.additionalFunctions.includes(value)
        ? prevData.additionalFunctions.filter((func) => func !== value)
        : [...prevData.additionalFunctions, value];
      updated.additionalFunctions = checkExisted;
      return updated;
    });
  };

  
  
    // province = selectedOptions[0].province;
    // district = selectedOptions[0].district;
    // ward = selectedOptions[0].ward;


  const handleSelectedOptionsChange = (options) => {
    setData((prevData) => ({
      ...prevData,
      province: options[0].province,
      district: options[0].district,
      ward: options[0].ward,
    }))
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box>
      <Paper elevation={0}>
        <Stack direction="column" spacing={2}>
          <OutlinedInput
            name="mileage"
            fullWidth
            placeholder="Mileage"
            value={data.mileage}
            onChange={handleDataChange}
          />
          <OutlinedInput
            name="fuelConsumption"
            fullWidth
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
          />
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
                  <Checkbox value="bluetooth" onChange={handleCheckboxChange} />
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
                  <Checkbox value="gps" onChange={handleCheckboxChange} />
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
                  <Checkbox value="camera" onChange={handleCheckboxChange} />
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
                  <Checkbox value="sunRoof" onChange={handleCheckboxChange} />
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
                  <Checkbox value="childLock" onChange={handleCheckboxChange} />
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
                  <Checkbox value="childSeat" onChange={handleCheckboxChange} />
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
                  <Checkbox value="dvd" onChange={handleCheckboxChange} />
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
                  <Checkbox value="usb" onChange={handleCheckboxChange} />
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
                  setData((prevData) => ({
                    ...prevData,
                    images: {
                      ...prevData.images,
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
                  setData((prevData) => ({
                    ...prevData,
                    images: {
                      ...prevData.images,
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
                  setData((prevData) => ({
                    ...prevData,
                    images: {
                      ...prevData.images,
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
                  setData((prevData) => ({
                    ...prevData,
                    images: {
                      ...prevData.images,
                      backImage: value,
                    },
                  }))
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Details;
