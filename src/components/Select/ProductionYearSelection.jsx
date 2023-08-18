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

const ProductionYearSelection = () => {
  const theme = useTheme();
  const [year, setYear] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setYear(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl>
        <Select
          displayEmpty
          value={year}
          onChange={handleChange}
          input={<OutlinedInput size="small" />}
          renderValue={(selected) => {
            if (selected.length === 0) {
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
