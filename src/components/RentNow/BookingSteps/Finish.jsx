import { Typography } from "@mui/material";
import React from "react";

const Finish = () => {
  return (
    <div>
      <Typography variant="h6" fontWeight="bold">
        You've successfully booked Nissan Navara El 2017 from 13/02/2022 - 12:00
        PM to 23/02/2022 - 14:00 PM.
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        Your booking number is: 012345
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        Our operator will contact you with further guidance about pickup.
      </Typography>
    </div>
  );
};

export default Finish;
