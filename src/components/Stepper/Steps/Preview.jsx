import React, { useState } from "react";
import AutoPlaySwipePreview from "../AutoPlaySwipePreview";
import { Typography, Grid, Rating, Box, Stack } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const StyleTypography = styled(Typography)`
  font-weight: bold;
`;

const Preview = (props) => {
  const { open, onClose } = props;
  const [value, setValue] = useState(3.5);
  const basicData = useSelector((state) => state.basic.data);
  const detailsData = useSelector((state) => state.details.data);
  const pricingData = useSelector((state) => state.pricing.data);

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <AutoPlaySwipePreview />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            {basicData.brand} {basicData.type} {basicData.productionYear}
          </Typography>
          <Stack direction="row" spacing={1}>
            <StyleTypography variant="subtitle1">Rating:</StyleTypography>
            <Rating defaultValue={3.5} precision={0.5} readOnly />
          </Stack>
          <StyleTypography variant="subtitle1">
            Number of rides: 0
          </StyleTypography>
          <StyleTypography variant="subtitle1">
            Price: {pricingData.basePrice} VND
          </StyleTypography>
          <StyleTypography variant="subtitle1">
            Location: {detailsData.ward}, {detailsData.district},{" "}
            {detailsData.province}
          </StyleTypography>
          <StyleTypography variant="subtitle1">
            Status:{" "}
            <span style={{ color: "#38b000", fontWeight: "bold" }}>
              Availabel
            </span>
          </StyleTypography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Preview;
