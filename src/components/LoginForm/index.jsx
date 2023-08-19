import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
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
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import SignUpForm from "../SignUpForm";
import useServices from "../../hooks/useServices";
import axiosInstance from "../../shared/configs/axiosConfig";
import { STORES } from "../../shared/configs/constants";
import ManagedStore from "../../stores/ManagedStore";
import { useInjectStore } from "../../stores/StoreProvider";

function LoginForm(props) {
  const { open, onClose } = props;

  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // // const managedStore = useInjectStore({
  // //   key: STORES.MANAGER,
  // //   store: ManagedStore,
  // // });
  // const navigate = useNavigate();
  // const users = axiosInstance.get("/members");
  // const handleClickLogin = () => {
  //   try {
  //     return axiosInstance.post("/login", {
  //       email,
  //       password,
  //     }).then(
  //       if (condition) {
          
  //       }
  //     )
  //   } catch (err) {
  //     let error = "";
  //     if (err.response) {
  //       error += err.response;
  //     }
  //     console.log(error);
  //     return error;
  //   }
  // };
  const handleClickForgot = () => {
    navigate("/reset");
  };

  const handleClose = () => onClose();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [openSignupForm, setOpenSignupForm] = useState(false);

  const handleClickOpenSignupForm = () => {
    setOpenSignupForm(true);
  };
  const handleCloseSignupForm = () => {
    setOpenSignupForm(false);
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
                    color: "white",
                    borderColor: "#fca311",
                    "&:hover": {
                      borderColor: "#fca311",
                    },
                  }}
                  onClick={handleClickLogin}
                >
                  Log in
                </Button>
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
