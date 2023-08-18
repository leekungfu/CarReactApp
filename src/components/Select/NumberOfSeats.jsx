import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 180,
    },
  },
};

const numberOfSeats = [2, 4, 5, 7, 8, 9, 12, 15];

function getStyles(name, seats, theme) {
  return {
    fontWeight:
      seats.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NumberOfSeatsSelection = () => {
  const theme = useTheme();
  const [seat, setSeat] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSeat(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl>
        <Select
          displayEmpty
          value={seat}
          onChange={handleChange}
          input={<OutlinedInput size="small" />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Number Of Seat</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>--Number Of Seat--</em>
          </MenuItem>
          {numberOfSeats.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, numberOfSeats, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default NumberOfSeatsSelection;
