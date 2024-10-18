import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { auth, provider, signInWithPopup } from "../../firebase";
import axiosInstance from "../../shared/configs/axiosConfig";
import GoogleLogin from "../GoogleLogin";
import { useSnackbar } from "../Hooks/useSnackBar";
import SignUpForm from "../SignUpForm";

function LoginForm(props) {
  const { open, onClose } = props;
  const { createSnack } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  const validate = () => {
    const msg = {};
    if (validator.isEmpty(email)) {
      msg.email = "Email is required.";
    }
    if (validator.isEmpty(password)) {
      msg.password = "Password is required.";
    }
    setValidationMsg(msg);
    return Object.keys(msg).length === 0;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogin = async (event) => {
    event.preventDefault();
    const checkInputValid = validate();
    if (checkInputValid) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await axiosInstance.post("/login", formData);

      if (response.data.isSuccess === true) {
        localStorage.setItem("jwtToken", response.data.token);
        const basicInfo = {
          fullName: response.data.member.fullName,
          email: response.data.member.email,
          phone: response.data.member.phone,
          role: response.data.member.role,
          nationalID: response.data.member.nationalID,
          street: response.data.member.street,
          birthDay: response.data.member.birthDay,
        };
        localStorage.setItem("userData", JSON.stringify(basicInfo));
        createSnack(response.data.message, { severity: "success" });
        if (response.data.member.role === "CUSTOMER") {
          window.location.href = "/homecustomer";
        } else if (response.data.member.role === "OWNER") {
          window.location.href = "/homeowner";
        }
      } else {
        createSnack(response.data.message, { severity: "error" });
      }
    } else {
      createSnack("Email or password is invalid!", { severity: "info" });
    }
  };

  const handleClickForgot = () => {
    handleClose();
    navigate("/reset");
  };

  const handleClose = () => onClose();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [openSignupForm, setOpenSignupForm] = useState(false);

  const handleClickOpenSignupForm = () => {
    setOpenSignupForm(true);
  };
  const handleCloseSignupForm = () => {
    setOpenSignupForm(false);
  };

  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("Đã đăng xuất thành công");
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi đăng xuất:", error);
  //     });
  // };

  const handleClickWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Xử lý đăng nhập thành công
        const user = result.user;
        console.log("Đăng nhập thành công:", user);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Lỗi đăng nhập:", error);
      });
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
                LOG IN USING YOUR ACCOUNT
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <FormControl
                  sx={{ mt: 3, width: "100%" }}
                  variant="outlined"
                  required
                >
                  <OutlinedInput
                    id="email"
                    value={email}
                    placeholder="Email Address"
                    startAdornment={
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    }
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  {!email && (
                    <Typography variant="subtitle2" color="red">
                      {validationMsg.email}
                    </Typography>
                  )}
                  {email && !validator.isEmail(email) && (
                    <Typography variant="subtitle2" color="red">
                      Please enter a valid email!
                    </Typography>
                  )}
                </FormControl>
                <FormControl
                  sx={{ mt: 3, width: "100%" }}
                  variant="outlined"
                  required
                >
                  <OutlinedInput
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
                  {!password && (
                    <Typography variant="subtitle2" color="red">
                      {validationMsg.password}
                    </Typography>
                  )}
                </FormControl>
                <FormControlLabel
                  sx={{ mt: 1 }}
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 2,
                    mb: 2,
                    color: "whitesmoke",
                    borderColor: "#fca311",
                    "&:hover": {
                      borderColor: "#fca311",
                    },
                  }}
                  onClick={handleClickLogin}
                  onSubmit={handleSubmit}
                >
                  Log in
                </Button>
                <GoogleLogin />
                <Stack>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{ bgcolor: "white", fontWeight: "regular" }}
                    onClick={handleClickForgot}
                  >
                    Forgot password?
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{ bgcolor: "white", fontWeight: "regular" }}
                    onClick={handleClickOpenSignupForm}
                  >
                    {"Don't you have an account? Sign Up"}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <SignUpForm open={openSignupForm} onClose={handleCloseSignupForm} />
      </Dialog>
    </div>
  );
}

LoginForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginForm;
