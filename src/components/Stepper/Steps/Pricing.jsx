import {
  Box,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React from "react";

const Pricing = () => {
  return (
    <div>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={2}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Base price:
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              Deposit:
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={2}>
            <OutlinedInput size="small" placeholder="1.000.000 VND / day" />
            <OutlinedInput size="small" placeholder="5.000.000 VND" />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ pl: 5 }}>
          <Stack direction="row" spacing={4}>
            <Typography fontWeight="bold" variant="subtitle1">Term of use:</Typography>
            <Stack>
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography variant="subtitle1">No smoking</Typography>}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography variant="subtitle1">No pet</Typography>}
              />
            </Stack>
            <Stack>
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography variant="subtitle1">No food in car</Typography>}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography variant="subtitle1">Other</Typography>}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Pricing;
