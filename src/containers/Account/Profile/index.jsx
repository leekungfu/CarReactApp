import {
  Commute,
  Home,
  Key,
  Lock,
  ManageAccounts,
  NavigateNext,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
  Container,
  Grid,
  Stack,
  OutlinedInput,
  InputLabel,
  Typography,
  Button,
  FormControl,
  InputAdornment,
  IconButton,
  Breadcrumbs,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import CustomTabPanels from "../../../components/CustomTabPanels/CustomTabPanels";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import DrivingLicense from "../../../components/UploadFile/DrivingLicense";
import Provinces from "../../../components/Select/Provinces";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../shared/configs/axiosConfig";
import { DATE_PICKER_DISPLAY_FORMAT, DATE_PICKER_URI_FORMAT } from "../../../shared/configs/constants";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileTabs = () => {
  const userInfo = useSelector((state) => state.backendData);

  const [tab, setTab] = useState(0);
  const [fullName, setFullName] = useState(userInfo.fullName);
  const [phone, setPhone] = useState(userInfo.phone);
  const [nationalID, setNationalId] = useState("");
  const [birthDay, setBirthDay] = useState(dayjs);
  const [street, setStreet] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  let city;
  let district;
  let ward;
  if (selectedOptions.length > 0) {
    city = selectedOptions[0].province;
    district = selectedOptions[0].district;
    ward = selectedOptions[0].ward;
  }

  const handleSelectedOptionsChange = (options) => {
    setSelectedOptions(options);
  };

  const handleDrivingLicenseChange = (newValue) => {
    setDrivingLicense(newValue);
  };

  const handleClickSaveChange = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      const dobFormated = dayjs(birthDay).format(DATE_PICKER_URI_FORMAT);
      formData.append("email", userInfo.email);
      formData.append("fullName", fullName);
      formData.append("birthDay", dobFormated);
      formData.append("phone", phone);
      formData.append("nationalID", nationalID);
      formData.append("city", city);
      formData.append("district", district);
      formData.append("ward", ward);
      formData.append("street", street);
      formData.append("drivingLicense", drivingLicense);

      const response = await axiosInstance.post("/personalInfo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Save successful");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Fragment>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Stack direction="row" alignItems="center">
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            <Typography
              component={Link}
              to="/homeowner"
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                color: "#7f7f7f !important",
                "&:hover": {
                  color: "#fca311 !important",
                },
              }}
            >
              Home
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Commute sx={{ mr: 0.5 }} fontSize="inherit" />
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ display: "flex", alignItems: "center" }}
            >
              My Cars
            </Typography>
          </Stack>
        </Breadcrumbs>
      </Container>
      <Container maxWidth="lg">
        <Card elevation={5} sx={{ mb: 10 }}>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tab} onChange={handleChange}>
                <Tab
                  sx={{ fontWeight: "bold" }}
                  icon={<ManageAccounts />}
                  label="Personal Information"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{ fontWeight: "bold" }}
                  icon={<Key />}
                  label="Security"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <CustomTabPanels value={tab} index={0}>
              <Grid container columnSpacing={5}>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <Box>
                      <InputLabel required>Full Name</InputLabel>
                      <OutlinedInput
                        fullWidth
                        value={fullName}
                        required
                        onChange={(event) => setFullName(event.target.value)}
                      />
                    </Box>
                    <Box>
                      <InputLabel required>Phone Number</InputLabel>
                      <OutlinedInput
                        fullWidth
                        value={phone}
                        required
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </Box>
                    <Box>
                      <InputLabel required>National ID</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="Example: 122318181"
                        required
                        value={nationalID}
                        onChange={(event) => setNationalId(event.target.value)}
                      />
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <Box>
                      <InputLabel required>Date of birth</InputLabel>
                      <DatePicker format={DATE_PICKER_DISPLAY_FORMAT} sx={{ width: "100%" }} value={birthDay} onChange={(newDate) => setBirthDay(newDate)} />
                    </Box>
                    <Box>
                      <InputLabel required>Email</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="name@gmail.com"
                        disabled
                        value={userInfo.email}
                      />
                    </Box>
                    <Box>
                      <InputLabel required>Street</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="Street"
                        value={street}
                        onChange={(event) => setStreet(event.target.value)}
                      />
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
                <Box>
                  <InputLabel required>Driving License</InputLabel>
                  <DrivingLicense
                  handleDrivingLicenseChange={handleDrivingLicenseChange}
                  />
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    alignSelf: "end",
                    flexGrow: 1,
                    color: "white",
                    borderColor: "#fca311",
                    "&:hover": {
                      borderColor: "#fca311",
                    },
                  }}
                  onClick={handleClickSaveChange}
                >
                  Save Change
                </Button>
              </Stack>
            </CustomTabPanels>
            <CustomTabPanels value={tab} index={1}>
              <Stack sx={{ mt: 2 }} spacing={3}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Set new password
                  </Typography>
                  <FormControl
                    sx={{ width: "50%" }}
                    variant="outlined"
                    required
                  >
                    <OutlinedInput
                      id="password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Use at least one letter, one number and seven characters.
                  </Typography>
                  <FormControl
                    sx={{ width: "50%" }}
                    variant="outlined"
                    required
                  >
                    <OutlinedInput
                      id="password"
                      placeholder="Confirm password"
                      type={showConfirmPassword ? "text" : "password"}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    width: "50%",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    borderColor: "#fca311",
                    "&:hover": {
                      borderColor: "#fca311",
                    },
                  }}
                >
                  Save
                </Button>
              </Stack>
            </CustomTabPanels>
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ProfileTabs;
