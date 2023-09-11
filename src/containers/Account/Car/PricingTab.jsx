import {
  Box,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import {
  carSelected,
  carUpdated,
} from "../../../components/ReduxToolkit/CarAdapter";

const PricingTab = (props) => {
  const { carId } = props;
  const car = useSelector((state) => carSelected(state, carId)).payload.cars;
  const carInfo = car.entities[carId];
  const dispatch = useDispatch();

  const [checkboxStates, setCheckboxStates] = useState({
    noSmoking: carInfo.terms.includes("noSmoking"),
    noPet: carInfo.terms.includes("noPet"),
    noFoodInCar: carInfo.terms.includes("noFoodInCar"),
    other: carInfo.terms.includes("other"),
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updateData = { ...carInfo, [name]: value };
    dispatch(carUpdated(updateData));
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const checkExisted = carInfo.terms.includes(value)
      ? carInfo.terms.filter((term) => term !== value)
      : [...carInfo.terms, value];

      const updatedStates = { ...checkboxStates };

      // Cập nhật trạng thái cho checkbox được click
      updatedStates[value] = !updatedStates[value];
  
      // Cập nhật trạng thái của tất cả các checkbox
      setCheckboxStates(updatedStates);
    const updateTerms = { ...carInfo, terms: checkExisted };
    dispatch(carUpdated(updateTerms));
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
              suffix=" VND/day"
              value={carInfo.price}
              thousandSeparator={true}
              onChange={handleInputChange}
              size="small"
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
              suffix=" VND"
              value={carInfo.deposit}
              onChange={handleInputChange}
              size="small"
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
                    checked={checkboxStates.noSmoking}
                    value="noSmoking"
                    onChange={handleCheckboxChange}
                  />
                }
                label={<Typography variant="subtitle1">No smoking</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxStates.noPet}
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
                    checked={checkboxStates.noFoodInCar}
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
                    checked={checkboxStates.other}
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
      <Stack
        direction="row"
        spacing={1.5}
        justifyContent="center"
        sx={{ mt: 5 }}
      >
        <Button
          sx={{
            border: "solid 1px",
            color: "white",
            borderColor: "#fca311",
            "&:hover": {
              borderColor: "#fca311",
            },
            width: "16%",
          }}
          variant="outlined"
        >
          Discard
        </Button>
        <Button
          sx={{
            color: "white",
            border: "solid 1px",
            borderColor: "#fca311",
            "&:hover": {
              borderColor: "#fca311",
            },
            width: "16%",
          }}
          variant="outlined"
        >
          Save
        </Button>
      </Stack>
    </div>
  );
};

export default PricingTab;
