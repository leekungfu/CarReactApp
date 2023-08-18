import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import subVn from "sub-vn";

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

function getStyles(name, items, theme) {
  return {
    fontWeight:
      items.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Provinces = () => {
  const theme = useTheme();

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);

  const provinces = subVn.getProvinces();

  const provinceArray = provinces.map((provinces) => provinces.name);

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setSelectedProvince(selectedProvince);

    const selectedProvinceData = provinces.find(
      (province) => province.name === selectedProvince
    );

    if (selectedProvinceData) {
      const districtArray = subVn
        .getDistrictsByProvinceCode(selectedProvinceData.code)
        .map((district) => district.name);
      setDistricts(districtArray);
    } else {
      setDistricts([]);
    }

    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);

    const selectedProvinceData = provinces.find(
      (province) => province.name === selectedProvince
    );

    const selectedDistrictData = subVn
      .getDistrictsByProvinceCode(selectedProvinceData.code)
      .find((district) => district.name === selectedDistrict);

    if (selectedDistrictData) {
      const wardArray = subVn
        .getWardsByDistrictCode(selectedDistrictData.code)
        .map((ward) => ward.name);
      setWards(wardArray);
    } else {
      setWards([]);
    }

    setSelectedWard(null);
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  return (
    <Box>
      <Grid container columnSpacing={3}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Select
              size="medium"
              displayEmpty
              value={selectedProvince || ""}
              onChange={handleProvinceChange}
              input={<OutlinedInput size="small" />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Province</em>;
                }
                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>--Province--</em>
              </MenuItem>
              {provinceArray.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, provinceArray, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Select
              size="medium"
              displayEmpty
              value={selectedDistrict || ""}
              onChange={handleDistrictChange}
              input={<OutlinedInput size="small" />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>District</em>;
                }
                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>--District--</em>
              </MenuItem>
              {districts.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, districts, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Select
              size="medium"
              displayEmpty
              value={selectedWard || ""}
              onChange={handleWardChange}
              input={<OutlinedInput size="small" />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Ward</em>;
                }
                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>--Ward--</em>
              </MenuItem>
              {wards.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, wards, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Provinces;
