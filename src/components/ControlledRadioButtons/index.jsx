import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function ControlledRadioButtons() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ mt: 1 }}>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel
          control={<Radio name="role" value="customer" color="primary" />}
          label="I want to rent a car"
        />
        <FormControlLabel
          control={<Radio name="role" value="owner" color="primary" />}
          label="I am a car owner"
        />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography noWrap>
              I have read and agree with the {" "}
              <Link href="#" color="#fca311" noWrap>
                Terms & Conditions
              </Link>
            </Typography>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
