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

const productionYears = [];
for (let year = 2023; year >= 1950; year--) {
  productionYears.push(year);
};

function getStyles(name, years, theme) {
  return {
    fontWeight:
      years.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ProductionYearSelection = (props) => {
  const { name, onProductionYearChange } = props;
  const theme = useTheme();
  const data = useSelector((state) => state.basic.data);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onProductionYearChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl>
        <Select
          displayEmpty
          value={data.productionYear}
          onChange={handleChange}
          input={<OutlinedInput size="small" />}
          renderValue={(selected) => {
            if (!selected) {
              return <em>Production Year</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>--Production Year--</em>
          </MenuItem>
          {productionYears.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, productionYears, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ProductionYearSelection;
