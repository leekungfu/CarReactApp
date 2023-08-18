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
import BreadcrumbMenu from "../../../components/BreadcrumbsMenu";
import NavMenuCustomer from "../../../components/NavMenuUser";
import { Link } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileTabs = () => {
  const [tab, setTab] = useState(0);

  const [date, setDate] = useState(dayjs("2000-01-01"));

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

  return (
    <Fragment>
      <NavMenuCustomer />
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
                        value={date}
                        onChange={(date) => setDate(date)}
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
                  <Provinces />
                </Box>
                <Box>
                  <InputLabel required>Driving License</InputLabel>
                  <DrivingLicense />
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
