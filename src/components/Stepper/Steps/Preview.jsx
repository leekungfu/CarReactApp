import React, { useState } from "react";
import AutoPlaySwipePreview from "../AutoPlaySwipePreview";
import { Typography, Grid, Rating, Box, Stack } from "@mui/material";
import styled from "styled-components";
import PropTypes from 'prop-types';


const StyleTypography = styled(Typography)`
  font-weight: bold;
`;

const Preview = (props) => {
  const { open, onClose } = props;
  const [value, setValue] = useState(3.5);
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <AutoPlaySwipePreview />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Mercedes-Benz Pickup Truck 2008</Typography>
          <Stack direction="row" spacing={1}>
            <StyleTypography variant="subtitle1">Rating:</StyleTypography>
            <Rating defaultValue={3.5} precision={0.5} readOnly />
          </Stack>
          <StyleTypography variant="subtitle1">Number of rides: 0</StyleTypography>
          <StyleTypography variant="subtitle1">Price: 1.000.000 VND</StyleTypography>
          <StyleTypography variant="subtitle1">
            Location: Phường Ngọc Hà, Thành phố Hà Giang, Tỉnh Hà Giang
          </StyleTypography>
          <StyleTypography variant="subtitle1">
            Status: <span style={{ color: "#38b000", fontWeight: "bold" }}>Availabel</span>
          </StyleTypography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Preview;
