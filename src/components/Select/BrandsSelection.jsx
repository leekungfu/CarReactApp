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

const carBrands = [
    "Toyota",
    "Ford",
    "Volkswagen",
    "BMW",
    "Mercedes-Benz",
    "Honda",
    "Nissan",
    "Chevrolet",
    "Audi",
    "Hyundai",
    "Kia",
    "Subaru",
    "Porsche",
    "Jaguar",
    "Land Rover",
    "Ferrari",
    "Lamborghini",
    "McLaren",
    "Tesla",
    "Volvo"
  ];

function getStyles(name, carBrands, theme) {
  return {
    fontWeight:
      carBrands.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const BrandsSelection = () => {
  const theme = useTheme();
  const [brand, setBrand] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBrand(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl>
        <Select
          displayEmpty
          value={brand}
          onChange={handleChange}
          input={<OutlinedInput size="small" />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Brand</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="" >
            <em>--Brand--</em>
          </MenuItem>
          {carBrands.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, carBrands, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default BrandsSelection;
