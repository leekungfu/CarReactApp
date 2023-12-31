import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  Grid,
  Stack,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import React from "react";
import Preview from "../../Stepper/Steps/Preview";
import {
  ArrowForward,
  ArrowForwardIos,
  Circle,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import dayjs from "dayjs";
import Provinces from "../../Select/Provinces";
import { DatePicker } from "@mui/x-date-pickers";
import DrivingLicense from "../../UploadFile/DrivingLicense";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styled from "styled-components";
import { DATE_PICKER_URI_FORMAT } from "../../../shared/configs/constants";
import axiosInstance from "../../../shared/configs/axiosConfig";
import { setUserData } from "../../ReduxToolkit/UserSlice";
import { useSnackbar } from "../../Hooks/useSnackBar";
import { useDispatch } from "react-redux";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIos sx={{ fontSize: "1rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const BookingInformation = () => {
  const { createSnack } = useSnackbar();
  const [dateDriver, setDateDriver] = useState(dayjs());
  const userData = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  const [birthDay, setBirthDay] = useState(dayjs(user.birthDay));

  const [userState, setUserState] = useState({
    fullName: user.fullName,
    phone: user.phone,
    nationalID: user.nationalID,
    street: user.street,
    province: user.province,
    district: user.district,
    ward: user.ward,
    drivingLicense: "",
  });
  const handleUserStateChange = (event) => {
    const { name, value } = event.target;
    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  if (selectedOptions.length > 0) {
    userState.province = selectedOptions[0].province;
    userState.district = selectedOptions[0].district;
    userState.ward = selectedOptions[0].ward;
  }

  const handleSelectedOptionsChange = (options) => {
    setSelectedOptions(options);
  };

  const handleDrivingLicenseChange = (newValue) => {
    setUserState((prevState) => ({
      ...prevState,
      drivingLicense: newValue,
    }));
  };

  const dispatch = useDispatch();
  const handleClickSave = async () => {
    const token = localStorage.getItem("jwtToken");
    const formData = new FormData();
    const dobFormated = dayjs(birthDay).format(DATE_PICKER_URI_FORMAT);
    console.log(user.birthDay);
    formData.append("email", user.email);
    formData.append("fullName", userState.fullName);
    formData.append("birthDay", dobFormated);
    formData.append("phone", userState.phone);
    formData.append("nationalID", userState.nationalID);
    formData.append("province", userState.province);
    formData.append("district", userState.district);
    formData.append("ward", userState.ward);
    formData.append("street", userState.street);
    formData.append("drivingLicense", userState.drivingLicense);

    const { data: response } = await axiosInstance.post(
      "/personalInfo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.isSuccess === true) {
      dispatch(setUserData(response.member));
      createSnack(response.message, { severity: "success" });
    } else {
      createSnack(response.message, { severity: "error" });
    }
  };

  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ pb: 2, fontWeight: "bold" }}>
          Renter's information
        </Typography>
        <Grid container columnSpacing={5}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Box>
                <InputLabel required>Full Name</InputLabel>
                <OutlinedInput
                  fullWidth
                  name="fullName"
                  placeholder="Example: John Wick"
                  required
                  value={userState.fullName}
                  onChange={handleUserStateChange}
                />
              </Box>
              <Box>
                <InputLabel required>Phone Number</InputLabel>
                <OutlinedInput
                  name="phone"
                  value={userState.phone}
                  fullWidth
                  placeholder="(+84)"
                  required
                  onChange={handleUserStateChange}
                />
              </Box>
              <Box>
                <InputLabel required>National ID</InputLabel>
                <OutlinedInput
                  name="nationalID"
                  fullWidth
                  value={userState.nationalID}
                  placeholder="Example: 122318181"
                  required
                  onChange={handleUserStateChange}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Box>
                <InputLabel required>Date of birth</InputLabel>
                <DatePicker
                  sx={{ width: "100%" }}
                  format={"DD/MM/YYYY"}
                  value={birthDay}
                  onChange={(value) => {
                    setBirthDay(value);
                  }}
                />
              </Box>
              <Box>
                <InputLabel required>Email</InputLabel>
                <OutlinedInput
                  fullWidth
                  value={user.email}
                  placeholder="name@gmail.com"
                  disabled
                />
              </Box>
              <Box>
                <InputLabel required>Street</InputLabel>
                <OutlinedInput
                  name="street"
                  value={userState.street}
                  fullWidth
                  placeholder="Street"
                  onChange={handleUserStateChange}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box>
            <InputLabel required>Address</InputLabel>
            <Provinces onSelectedOptionsChange={handleSelectedOptionsChange} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
              <InputLabel required>Driving License</InputLabel>
              <DrivingLicense
                handleDrivingLicenseChange={handleDrivingLicenseChange}
              />
            </Box>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              variant="outlined"
              sx={{ alignSelf: "end", minWidth: "20%" }}
              onClick={handleClickSave}
            >
              Save
            </Button>
          </Box>
        </Stack>
        <Box sx={{ mt: 5 }}>
          <Accordion elevation={0}>
            <AccordionSummary>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Driver's information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container columnSpacing={5}>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <Box>
                      <InputLabel required>Full Name</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="Example: John Wick"
                        required
                      />
                    </Box>
                    <Box>
                      <InputLabel required>Phone Number</InputLabel>
                      <OutlinedInput fullWidth placeholder="(+84)" required />
                    </Box>
                    <Box>
                      <InputLabel required>National ID</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="Example: 122318181"
                        required
                      />
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <Box>
                      <InputLabel required>Date of birth</InputLabel>
                      <DatePicker
                        sx={{ width: "100%" }}
                        format={"DD/MM/YYYY"}
                        value={dateDriver}
                        onChange={(date) => setDateDriver(date)}
                      />
                    </Box>
                    <Box>
                      <InputLabel required>Email</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="name@gmail.com"
                        disabled
                      />
                    </Box>
                    <Box>
                      <InputLabel required>Street</InputLabel>
                      <OutlinedInput fullWidth placeholder="Street" />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box>
                  <InputLabel required>Address</InputLabel>
                  <Provinces
                    onSelectedOptionsChange={handleSelectedOptionsChange}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box>
                    <InputLabel required>Driving License</InputLabel>
                    <DrivingLicense
                      handleDrivingLicenseChange={handleDrivingLicenseChange}
                    />
                  </Box>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    variant="outlined"
                    sx={{ alignSelf: "end", minWidth: "20%" }}
                  >
                    Save
                  </Button>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </div>
  );
};

export default BookingInformation;
