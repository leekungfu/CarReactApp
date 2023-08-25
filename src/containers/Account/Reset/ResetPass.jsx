import { LockOpen } from "@mui/icons-material";
import {
  Button,
  Container,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import NotifyReset from "../../../components/Modals/NotifyReset";
import { useState } from "react";
import axiosInstance from "../../../shared/configs/axiosConfig";
import { useSnackbar } from "../../../components/Hooks/useSnackBar";

const ResetPass = () => {
  const [openNotifyReset, setOpenNotifyReset] = useState(false);
  const [email, setEmail] = useState("");
  const { createSnack } = useSnackbar();
  const handleClickOpenNotifyReset = async (e) => {
    e.preventDefault();
    if (email) {
      const response = await axiosInstance.post("/forgot_password", null, {
        params: {
          email,
        },
      });
      if (response.data.isSuccess === true) {
        setOpenNotifyReset(true);
      } else {
        createSnack(response.data.message);
      }
    } else {
      createSnack("Enter your correct email!", { severity: "warning" });
    }
  };

  const handleCloseNotifyReset = () => {
    setOpenNotifyReset(false);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" sx={{ mt: 10 }}>
          <Typography variant="h5" fontWeight="bold">
            Reset Password
          </Typography>
          <Typography variant="subtitle1">
            Enter the email address associated with your account, and we'll
            email you with the link to reset your password.
          </Typography>
          <OutlinedInput
            sx={{ minWidth: "40%" }}
            placeholder="Enter email address"
            size="small"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button
            sx={{ bgcolor: "white", color: "#fca311" }}
            variant="outlined"
            startIcon={<LockOpen />}
            onClick={handleClickOpenNotifyReset}
          >
            Submit
          </Button>
        </Stack>
        <NotifyReset open={openNotifyReset} onClose={handleCloseNotifyReset} />
      </Container>
    </div>
  );
};

export default ResetPass;
