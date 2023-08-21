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
import axiosInstance from "../../shared/configs/axiosConfig";
import { useDispatch } from "react-redux";
import { setData } from "../stores/slice";

const SignUpForm = (props) => {
  const { open, onClose } = props;
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
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  const handleClickSignup = async (event) => {
    event.preventDefault();
    try {
      if (fullName && email && phone && password && role) {
        const response = await axiosInstance.post("/signup", null, {
          params: {
            fullName,
            email,
            phone,
            password,
            role,
          },
        });

        const data = await response.data;
        console.log(response.data);
        dispatch(setData(data));

        if (response.status === 200) {
          if (role === "customer") {
            navigate("/homecustomer");
          } else {
            navigate("/homeowner");
          }
        } else {
          console.log("Signup failed");
        }
      } else {
        console.log("Some fields are empty");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  // const store = useInjectStore({
  //   key: STORES.MANAGER,
  //   store: SignupStore,
  // });

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
                <FormControl
                  sx={{ mt: 3, width: "100%" }}
                  variant="outlined"
                  required
                >
                  <OutlinedInput
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
                    // value={confirmPassword}
                    // onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </FormControl>
                <ControlledRadioButtons role={role} setRole={setRole} />
                <Button
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
