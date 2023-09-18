import {
  Box,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePricingData } from "../../ReduxToolkit/pricingSlice";
import { NumericFormat } from "react-number-format";

const Pricing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.pricing.data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updateData = { ...data, [name]: value };
    dispatch(updatePricingData(updateData));
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const checkExisted = data.terms.includes(value)
      ? data.terms.filter((term) => term !== value)
      : [...data.terms, value];

    const updateTerms = { ...data, terms: checkExisted };
    dispatch(updatePricingData(updateTerms));
  };

  const MAX_BASE_PRICE = 10000000;
  const MAX_DEPOSIT = 1000000000;

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
            <NumericFormat
              customInput={OutlinedInput}
              name="basePrice"
              value={data.basePrice}
              thousandSeparator={true}
              onChange={handleInputChange}
              size="small"
              suffix=" (VND/day)"
              placeholder="1.000.000 VND / day"
              isAllowed={(value) => {
                const { floatValue, formattedValue } = value;
                return floatValue < MAX_BASE_PRICE || formattedValue === "";
              }}
            />
            <NumericFormat
              customInput={OutlinedInput}
              thousandSeparator={true}
              name="deposit"
              value={data.deposit}
              onChange={handleInputChange}
              size="small"
              suffix=" (VND)"
              placeholder="5.000.000 VND"
              isAllowed={(value) => {
                const { floatValue, formattedValue } = value;
                return floatValue < MAX_DEPOSIT || formattedValue === "";
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ pl: 5 }}>
          <Stack direction="row" spacing={4}>
            <Typography fontWeight="bold" variant="subtitle1">
              Term of use:
            </Typography>
            <Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.terms.includes("noSmoking")}
                    value="noSmoking"
                    onChange={handleCheckboxChange}
                  />
                }
                label={<Typography variant="subtitle1">No smoking</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.terms.includes("noPet")}
                    value="noPet"
                    onChange={handleCheckboxChange}
                  />
                }
                label={<Typography variant="subtitle1">No pet</Typography>}
              />
            </Stack>
            <Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.terms.includes("noFoodInCar")}
                    value="noFoodInCar"
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Typography variant="subtitle1">No food in car</Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.terms.includes("other")}
                    value="other"
                    onChange={handleCheckboxChange}
                  />
                }
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
