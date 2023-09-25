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
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import CustomTabPanels from "../../../components/CustomTabPanels/CustomTabPanels";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import DrivingLicense from "../../../components/UploadFile/DrivingLicense";
import Provinces from "../../../components/Select/Provinces";
import { Link } from "react-router-dom";
import {
  DATE_PICKER_DISPLAY_FORMAT,
  DATE_PICKER_URI_FORMAT,
} from "../../../shared/configs/constants";
import { useSnackbar } from "../../../components/Hooks/useSnackBar";
import validator from "validator";
import { NumericFormat } from "react-number-format";
import axiosInstance from "../../../shared/configs/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setUserData,
} from "../../../components/ReduxToolkit/UserSlice";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileTabs = () => {
  const { createSnack } = useSnackbar();
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwtToken");
  const user = useSelector((state) => state.userData);
  console.log("user ", user);

  const [tab, setTab] = useState(0);
  const [fullName, setFullName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone);
  const [nationalID, setNationalId] = useState(user.nationalID);
  const [birthDay, setBirthDay] = useState(dayjs);
  const [street, setStreet] = useState(user.street);
  const [drivingLicense, setDrivingLicense] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  let province;
  let district;
  let ward;
  if (selectedOptions.length > 0) {
    province = selectedOptions[0].province;
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

      if (
        fullName &&
        birthDay &&
        phone &&
        nationalID &&
        province &&
        district &&
        ward &&
        street &&
        drivingLicense
      ) {
        formData.append("email", user.email);
        formData.append("fullName", fullName);
        formData.append("birthDay", dobFormated);
        formData.append("phone", phone);
        formData.append("nationalID", nationalID);
        formData.append("province", province);
        formData.append("district", district);
        formData.append("ward", ward);
        formData.append("street", street);
        formData.append("drivingLicense", drivingLicense);

        const token = localStorage.getItem("jwtToken");
        const response = await axiosInstance.post("/personalInfo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.isSuccess === true) {
          dispatch(setUserData(response.data.member));
          createSnack(response.data.message, { severity: "success" });
        } else {
          createSnack(response.data.message, { severity: "error" });
        }
      } else {
        createSnack("Fill out all the fields!", { severity: "error" });
      }
    } catch (error) {
      createSnack(error, { severity: "error" });
    }
  };

  const handleClickSave = async (event) => {
    event.preventDefault();

    if (password && confirmPassword && isPasswordValidRef) {
      if (password === confirmPassword) {
        const email = user.email;
        const response = await axiosInstance.post("/updatePassword", null, {
          params: {
            email,
            password,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.isSuccess === true) {
          createSnack(response.data.message, { severity: "success" });
          setPassword("");
          setConfirmPassword("");
        } else {
          createSnack(response.data.message, { severity: "error" });
        }
      } else {
        createSnack("Change password failed! Try again please", {
          severity: "error",
        });
      }
    } else {
      createSnack("Enter new password to change!", {
        severity: "warning",
      });
    }
  };

  const passwordValueOptions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: true,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10,
  };

  const [checkMessage, setCheckMessage] = useState("");

  const checkPassword = () => {
    const msg = {
      message: {},
      color: "",
    };
    const passwordPoint = validator.isStrongPassword(
      password,
      passwordValueOptions
    );
    if (passwordPoint >= 50) {
      msg.message.password = "Password is very strong.";
      msg.color = "#0ead69";
    } else if (passwordPoint < 50 && passwordPoint > 40) {
      msg.message.password = "Password is strong.";
      msg.color = "#2a9d8f";
    } else if (passwordPoint <= 40 && passwordPoint > 30) {
      msg.message.password = "Password is moderate.";
      msg.color = "#e9c46a";
    } else if (passwordPoint <= 30 && passwordPoint > 20) {
      msg.message.password = "Password is weak.";
      msg.color = "#f4a261";
    } else {
      msg.message.password = "Password is very weak.";
      msg.color = "#ae2012";
    }
    setCheckMessage(msg);
    return Object.keys(msg.message).length === 0;
  };

  const isPasswordValidRef = useRef(false);
  const MAX_FULLNAME_LENGTH = 30;
  const MAX_PHONE_LENGTH = 11;
  const MAX_NATIONALID_LENGTH = 12;
  const MAX_STREET_LENGTH = 255;

  useEffect(() => {
    isPasswordValidRef.current = checkPassword(password);
  }, [password]);

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Stack direction="row" alignItems="center">
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              <Typography
                component={Link}
                to={
                  user && user.role === "CUSTOMER"
                    ? "/homecustomer"
                    : "/homeowner"
                }
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
                My Profile
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
                          inputProps={{ maxLength: MAX_FULLNAME_LENGTH }}
                        />
                      </Box>
                      <Box>
                        <InputLabel required>Phone Number</InputLabel>
                        <NumericFormat
                          customInput={OutlinedInput}
                          fullWidth
                          value={phone}
                          required
                          onChange={(event) => setPhone(event.target.value)}
                          inputProps={{ maxLength: MAX_PHONE_LENGTH }}
                        />
                        {phone && !validator.isMobilePhone(phone) && (
                          <Typography variant="subtitle2" color="red">
                            Please enter the correct phone number!
                          </Typography>
                        )}
                      </Box>
                      <Box>
                        <InputLabel required>National ID</InputLabel>
                        <NumericFormat
                          customInput={OutlinedInput}
                          fullWidth
                          placeholder="Example: 024098010203"
                          required
                          value={nationalID}
                          onChange={(event) =>
                            setNationalId(event.target.value)
                          }
                          inputProps={{ maxLength: MAX_NATIONALID_LENGTH }}
                        />
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={2}>
                      <Box>
                        <InputLabel required>Date of birth</InputLabel>
                        <DatePicker
                          format={DATE_PICKER_DISPLAY_FORMAT}
                          sx={{ width: "100%" }}
                          value={birthDay}
                          onChange={(newDate) => setBirthDay(newDate)}
                        />
                      </Box>
                      <Box>
                        <InputLabel required>Email</InputLabel>
                        <OutlinedInput
                          fullWidth
                          placeholder="name@gmail.com"
                          disabled
                          value={user.email}
                        />
                      </Box>
                      <Box>
                        <InputLabel required>Street</InputLabel>
                        <OutlinedInput
                          fullWidth
                          placeholder="Street"
                          value={street}
                          onChange={(event) => setStreet(event.target.value)}
                          inputProps={{ maxLength: MAX_STREET_LENGTH }}
                        />
                        {street && street.length === MAX_STREET_LENGTH && (
                          <Typography variant="subtitle2" color="red">
                            Exceed maximum length of street address!
                          </Typography>
                        )}
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      {password && (
                        <Typography
                          variant="subtitle2"
                          color={checkMessage.color}
                        >
                          {checkMessage.message.password}
                        </Typography>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      sx={{ width: "50%" }}
                      variant="outlined"
                      required
                    >
                      <OutlinedInput
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
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
                      {password &&
                        confirmPassword &&
                        !validator.equals(password, confirmPassword) && (
                          <Typography variant="subtitle2" color="red">
                            Password don't match
                          </Typography>
                        )}
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
                    onClick={handleClickSave}
                  >
                    Save
                  </Button>
                </Stack>
              </CustomTabPanels>
            </CardContent>
          </Card>
        </Container>
      </Container>
    </Fragment>
  );
};

export default ProfileTabs;
