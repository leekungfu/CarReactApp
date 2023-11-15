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
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import NotifyReset from "../../../components/Modals/NotifyReset";
import ResetSuccess from "../../../components/Modals/ResetSuccess";
import validator from "validator";
import { useSnackbar } from "../../../components/Hooks/useSnackBar";
import axiosInstance from "../../../shared/configs/axiosConfig";
import queryString from "query-string";

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

  const { createSnack } = useSnackbar();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openResetSuccess, setOpenResetSuccess] = useState(false);
  const handleClickOpenResetSuccess = async () => {
    if (password && confirmPassword && isPasswordValidRef) {
      if (password === confirmPassword) {
        const parsed = queryString.parse(window.location.search);
        const token = parsed.token;
        const { data: response } = await axiosInstance.post(
          "/reset_password",
          null,
          {
            params: {
              token,
              password,
            },
          }
        );

        if (response.isSuccess === true) {
          setOpenResetSuccess(true);
          setPassword("");
          setConfirmPassword("");
        } else {
          createSnack(response.message, { severity: "error" });
        }
      } else {
        createSnack("Reset password failed! Try again please", {
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

  useEffect(() => {
    isPasswordValidRef.current = checkPassword(password);
  }, [password]);
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
          <FormControl sx={{ width: "50%" }} variant="outlined" required>
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
            {password && (
              <Typography variant="subtitle2" color={checkMessage.color}>
                {checkMessage.message.password}
              </Typography>
            )}
          </FormControl>
          <Typography variant="subtitle1" fontWeight="bold">
            Use at least one letter, one number and seven characters.
          </Typography>
          <FormControl sx={{ width: "50%" }} variant="outlined" required>
            <OutlinedInput
              id="confirm-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
            {password &&
              confirmPassword &&
              !validator.equals(password, confirmPassword) && (
                <Typography variant="subtitle2" color="red">
                  Password don't match
                </Typography>
              )}
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
