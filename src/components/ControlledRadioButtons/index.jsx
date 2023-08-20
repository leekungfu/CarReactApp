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
import PropTypes from "prop-types";

export default function ControlledRadioButtons(props) {
  const { role, setRole } = props;

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <FormControl sx={{ mt: 1 }}>
      <RadioGroup value={role} onChange={handleChange}>
        <FormControlLabel
          control={<Radio value="customer" color="primary" />}
          label="I want to rent a car"
        />
        <FormControlLabel
          control={<Radio value="owner" color="primary" />}
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
};

ControlledRadioButtons.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
}
