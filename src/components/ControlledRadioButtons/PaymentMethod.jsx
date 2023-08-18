import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Link,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function PaymentMethod() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ mt: 1 }}>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel
          control={<Radio value="wallet" color="primary" />}
          label="My Wallet"
        />
        <Typography variant="subtitle1" sx={{ ml: 7 }}>
          Current balance:{" "}
          <span style={{ color: "#38b000", fontWeight: "bold" }}>
            20.000.000 VND
          </span>
        </Typography>
        <FormControlLabel
          control={<Radio value="cash" color="primary" />}
          label="Cash"
        />
        <Typography variant="subtitle1" sx={{ ml: 7 }}>
          Our operator will contact you for further instruction.
        </Typography>
        <FormControlLabel
          control={<Radio value="bankTransfer" color="primary" />}
          label="Bank Transfer"
        />
        <Typography variant="subtitle1" sx={{ ml: 7 }}>
          Our operator will contact you for further instruction.
        </Typography>
      </RadioGroup>
    </FormControl>
  );
}
