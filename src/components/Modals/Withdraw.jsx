import {
  Box,
  Button,
  Divider,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useCustomHook } from "../../App";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../Hooks/useSnackBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid",
  p: 3,
  textAlign: "center",
};

const Withdraw = (props) => {
  const { open, onClose } = props;
  const [value, setValue] = useState("");
  const { createSnack } = useSnackbar();
  const { save } = useCustomHook();
  const handleClose = () => {
    onClose();
  };
  const handleClickOK = async () => {
    setValue("");
    const token = localStorage.getItem("jwtToken");
    const { data: response } = await axiosInstance.post(
      "/newTransaction",
      null,
      {
        params: {
          type: "Withdraw",
          amount: parseFloat(value.replace(/[^0-9.]/g, "")),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.isSuccess === true) {
      save(response.transaction.member);
      createSnack(response.message, { severity: "success" });
      onClose();
    }
  };
  const MAX_AMOUNT = 999999999;

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Withdraw</Typography>
          <Divider />
          <Stack spacing={1} sx={{ mt: 2 }} alignItems="center">
            <Typography sx={{ mt: 2 }} variant="body1">
              Please confirm that you will draw{" "}
              {value
                ? Number(
                    parseFloat(value.replace(/[^0-9.]/g, ""))
                  ).toLocaleString()
                : 0}{" "}
              (VND) from your wallet.
            </Typography>
            <NumericFormat
              customInput={OutlinedInput}
              thousandSeparator={true}
              size="small"
              sx={{
                mt: 2,
                width: "45%",
              }}
              isAllowed={(value) => {
                const { floatValue, formattedValue } = value;
                return floatValue <= MAX_AMOUNT || formattedValue === "";
              }}
              fullWidth
              placeholder="Amount"
              suffix=" (VND)"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </Stack>
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              sx={{
                width: "20%",
              }}
              onClick={handleClose}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              disabled={!value}
              sx={{
                width: "20%",
              }}
              onClick={handleClickOK}
              variant="outlined"
            >
              OK
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

Withdraw.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Withdraw;
