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
import React from "react";
import Provinces from "../../Select/Provinces";
import FrontOfCar from "../../UploadFile/FrontOfCar";
import RightOfCar from "../../UploadFile/RightOfCar";
import LeftOfCar from "../../UploadFile/LeftOfCar";
import BackOfCar from "../../UploadFile/BackOfCar";
import { Album, Bluetooth, Camera, GpsFixed, Living, NoStroller, SolarPower, Usb } from "@mui/icons-material";

const Details = () => {
  return (
    <Box>
      <Paper elevation={0}>
        <Stack direction="column" spacing={2}>
          <OutlinedInput fullWidth placeholder="Mileage" />
          <OutlinedInput
            fullWidth
            placeholder="Fuel Consumption (liter/100km)"
          />
          <Provinces />
          <OutlinedInput fullWidth placeholder="Street" />
          <OutlinedInput multiline fullWidth placeholder="Description of vehicle" />
        </Stack>
        <Grid container sx={{ pt: 2 }}>
          <Grid item xs={4}>
            <Stack>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>Bluetooth</Typography>
                    <Bluetooth fontSize="inherit" />
                  </Box>
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" sx={{ pr: 0.5 }}>GPS</Typography>
                    <GpsFixed fontSize="inherit"/>
                  </Box>
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ pr: 0.5 }}>Camera</Typography>
                <Camera fontSize="inherit"/>
                </Box>
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ pr: 0.5 }}>Sun roof</Typography>
                <SolarPower fontSize="inherit"/>
                </Box>
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ pr: 0.5 }}>Child lock</Typography>
                <NoStroller fontSize="inherit"/>
                </Box>
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ pr: 0.5 }}>Child seat</Typography>
                <Living fontSize="inherit"/>
                </Box>
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ pr: 0.5 }}>DVD</Typography>
                <Album fontSize="inherit"/>
                </Box>
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ pr: 0.5 }}>USB</Typography>
                <Usb fontSize="inherit"/>
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
              <FrontOfCar />
              <Typography variant="subtitle2" fontWeight={600}>
                Right image
              </Typography>
              <RightOfCar />
            </Stack>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4} sx={{ pt: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" fontWeight={600}>
                Left image
              </Typography>
              <LeftOfCar />
              <Typography variant="subtitle2" fontWeight={600}>
                Back image
              </Typography>
              <BackOfCar />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Details;
