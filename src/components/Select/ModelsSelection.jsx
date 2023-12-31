import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useSelector } from "react-redux";

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

const carTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Minivan",
  "Truck",
  "Crossover",
  "Wagon",
  "Electric",
  "Sports Car"
];

function getStyles(name, carTypes, theme) {
  return {
    fontWeight:
      carTypes.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ModelsSelection = (props) => {
  const { name, onTypeChange } = props;
  const theme = useTheme();
  const data = useSelector((state) => state.basic.data);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onTypeChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl>
        <Select
          displayEmpty
          value={data.model}
          onChange={handleChange}
          input={<OutlinedInput size="small" />}
          renderValue={(selected) => {
            if (!selected) {
              return <em>Type</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>--Type--</em>
          </MenuItem>
          {carTypes.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, carTypes, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ModelsSelection;
