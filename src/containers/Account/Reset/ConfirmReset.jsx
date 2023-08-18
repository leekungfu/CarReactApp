import { Lock, LockOpen, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import NotifyReset from "../../../components/Modals/NotifyReset";
import ResetSuccess from "../../../components/Modals/ResetSuccess";

const ConfirmReset = () => {
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

  const [openResetSuccess, setOpenResetSuccess] = useState(false);
  const handleClickOpenResetSuccess = () => {
    setOpenResetSuccess(true);
  };
  const handleCloseResetSuccess = () => {
    setOpenResetSuccess(false);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" sx={{ mt: 10, mb: 10 }}>
          <Typography variant="h5" fontWeight="bold">
            Reset Password
          </Typography>
          <Typography variant="subtitle1">
            Please set your new password below.
          </Typography>
          <FormControl sx={{ minWidth: "40%" }} variant="outlined" required>
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
          <Typography variant="subtitle1" fontWeight="bold">
            Use at least one letter, one number and seven characters.
          </Typography>
          <FormControl sx={{ minWidth: "40%" }} variant="outlined" required>
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
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            sx={{ bgcolor: "white", color: "#fca311" }}
            variant="outlined"
            startIcon={<LockOpen />}
            onClick={handleClickOpenResetSuccess}
          >
            Reset
          </Button>
        </Stack>
        <ResetSuccess
          open={openResetSuccess}
          onClose={handleCloseResetSuccess}
        />
      </Container>
    </div>
  );
};

export default ConfirmReset;
