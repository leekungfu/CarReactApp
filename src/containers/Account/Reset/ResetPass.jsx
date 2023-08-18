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

const ResetPass = () => {
  const [openNotifyReset, setOpenNotifyReset] = useState(false);
  const handleClickOpenNotifyReset = () => {
    setOpenNotifyReset(true);
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
