import {
  Email,
  Lock,
  Password,
  Person,
  Phone,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  FormControl,
  TextField,
  Container,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Radio,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import ControlledRadioButtons from "../ControlledRadioButtons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import validator from "validator";
import { useSnackbar } from "../Hooks/useSnackBar";
import { NumericFormat } from "react-number-format";
import axiosInstance from "../../shared/configs/axiosConfig";
import { setUserData } from "../ReduxToolkit/UserSlice";

const SignUpForm = (props) => {
  const { open, onClose } = props;
  const { createSnack } = useSnackbar();
  const handleClose = () => onClose();
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
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [checkboxState, setCheckboxState] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");

  const dispatch = useDispatch();

  const handleCheckbox = (checked) => {
    setCheckboxState(checked);
  };

  const validate = () => {
    const msg = {};
    if (validator.isEmpty(email)) {
      msg.email = "Email is required.";
    }
    if (validator.isEmpty(password)) {
      msg.password = "Password is required.";
    }
    if (validator.isEmpty(phone)) {
      msg.phone = "Phone is required.";
    }
    if (validator.isEmpty(fullName)) {
      msg.fullName = "Fullname is required.";
    }
    if (validator.isEmpty(confirmPassword)) {
      msg.confirmPassword = "Confirm password is required.";
    }
    setValidationMsg(msg);
    return Object.keys(msg).length === 0;
  };

  const handleClickSignup = async (event) => {
    event.preventDefault();
    const checkInputValue = validate();
    try {
      if (checkInputValue) {
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("role", role);
        const response = await axiosInstance.post("/signup", formData);
        const data = await response.data.member;

        if (response.data.isSuccess === true) {
          createSnack(response.data.message, { severity: "success" });
          localStorage.setItem("jwtToken", response.data.token);
          // dispatch(setUserData(data));
          const basicInfo = {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            role: data.role,
            nationalID: data.nationalID,
            street: data.street,
            birthDay: data.birthDay,
            wallet: data.wallet,
          };
          localStorage.setItem("userData", JSON.stringify(basicInfo));

          if (role === "CUSTOMER") {
            window.location.href = "/homecustomer";
          } else {
            window.location.href = "/homeowner";
          }
        } else {
          createSnack(response.data.message, { severity: "error" });
        }
      } else {
        createSnack("Fields are required and valid", { severity: "error" });
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                CREATE NEW ACCOUNT
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <FormControl
                  sx={{ mt: 3, width: "100%" }}
                  variant="outlined"
                  required
                >
                  <OutlinedInput
                    id="username"
                    placeholder="Your name"
                    startAdornment={
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    }
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </FormControl>
                {!fullName && (
                  <Typography variant="subtitle2" color="red">
                    {validationMsg.fullName}
                  </Typography>
                )}
                <FormControl
                  sx={{ mt: 3, width: "100%" }}
                  variant="outlined"
                  required
                >
                  <OutlinedInput
                    id="email"
                    placeholder="Email Address"
                    startAdornment={
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    }
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormControl>
                {!email && (
                  <Typography variant="subtitle2" color="red">
                    {validationMsg.email}
                  </Typography>
                )}
                {email && !validator.isEmail(email) && (
                  <Typography variant="subtitle2" color="red">
                    Please enter valid email!
                  </Typography>
                )}
                <FormControl
                  sx={{ mt: 3, width: "100%" }}
                  variant="outlined"
                  required
                >
                  <NumericFormat
                    customInput={OutlinedInput}
                    allowLeadingZeros
                    id="phone"
                    placeholder="Phone Number"
                    startAdornment={
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    }
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </FormControl>
                {!phone && (
                  <Typography variant="subtitle2" color="red">
                    {validationMsg.phone}
                  </Typography>
                )}
                {phone && !validator.isMobilePhone(phone) && (
                  <Typography variant="subtitle2" color="red">
                    Please enter correct phone number!
                  </Typography>
                )}
                <FormControl
                  sx={{ mt: 3, width: "100%" }}
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormControl>
                {!password && (
                  <Typography variant="subtitle2" color="red">
                    {validationMsg.password}
                  </Typography>
                )}
                <FormControl
                  sx={{ mt: 3, width: "100%" }}
                  variant="outlined"
                  required
                >
                  <OutlinedInput
                    id="confirm-password"
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
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </FormControl>
                {!confirmPassword && (
                  <Typography variant="subtitle2" color="red">
                    {validationMsg.confirmPassword}
                  </Typography>
                )}
                {confirmPassword &&
                  !validator.equals(password, confirmPassword) && (
                    <Typography variant="subtitle2" color="red">
                      Password don't match
                    </Typography>
                  )}
                <ControlledRadioButtons
                  role={role}
                  setRole={setRole}
                  onCheckboxChange={handleCheckbox}
                />
                <Button
                  disabled={!checkboxState}
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 3,
                    mb: 2,
                    color: "white",
                    borderColor: "#fca311",
                    "&:hover": {
                      borderColor: "#fca311",
                    },
                  }}
                  onClick={handleClickSignup}
                >
                  Sign up
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

SignUpForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignUpForm;
